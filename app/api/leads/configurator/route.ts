import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { geocodeZip, findNearestDealers } from "@/lib/dealers";
import { configuratorSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ interval: 60 * 1000, limit: 3 });

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { success } = limiter.check(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly.", success: false },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const result = configuratorSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || "Invalid input", success: false },
        { status: 400 }
      );
    }

    const { name, email, zip, product, size, finish } = result.data;
    const timestamp = new Date().toISOString();

    console.log("[CONFIGURATOR]", {
      timestamp,
      email: email.replace(/(.{2}).*(@.*)/, "$1***$2"),
      zip,
      product,
    });

    const coords = await geocodeZip(zip);
    const nearestDealer = coords
      ? findNearestDealers(coords.lat, coords.lng, 1)[0] ?? null
      : null;

    const promises: Promise<void>[] = [];

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      promises.push(
        resend.emails
          .send({
            from: "C.L. Bailey Leads <leads@clbailey.com>",
            to: ["info@clbailey.com"],
            subject: `New Configuration: ${product}`,
            html: `
              <h2>New Product Configuration</h2>
              <table style="border-collapse:collapse;">
                <tr><td style="padding:4px 12px 4px 0;color:#888;">Name</td><td>${escapeHtml(name)}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;color:#888;">Email</td><td>${escapeHtml(email)}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;color:#888;">ZIP</td><td>${escapeHtml(zip)}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;color:#888;">Product</td><td>${escapeHtml(product)}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;color:#888;">Size</td><td>${escapeHtml(size)}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;color:#888;">Finish</td><td>${escapeHtml(finish)}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;color:#888;">Nearest Dealer</td><td>${
                  nearestDealer
                    ? `${escapeHtml(nearestDealer.name)} (${escapeHtml(nearestDealer.city)}, ${escapeHtml(nearestDealer.state)}) - ${nearestDealer.distance} mi`
                    : "No match"
                }</td></tr>
                <tr><td style="padding:4px 12px 4px 0;color:#888;">Time</td><td>${timestamp}</td></tr>
              </table>
            `,
          })
          .then(() => {})
          .catch((err: unknown) => {
            console.error("[CONFIGURATOR] Resend error:", err);
          })
      );
    }

    const sheetsId = process.env.GOOGLE_SHEETS_ID;
    if (sheetsId) {
      promises.push(
        appendToGoogleSheets(sheetsId, [
          timestamp,
          name || "",
          email,
          zip,
          product,
          size,
          finish,
          "configurator",
        ]).catch((err) => {
          console.error("[CONFIGURATOR] Google Sheets error:", err);
        })
      );
    }

    await Promise.allSettled(promises);

    return NextResponse.json({
      success: true,
      dealer: nearestDealer
        ? {
            name: nearestDealer.name,
            city: nearestDealer.city,
            state: nearestDealer.state,
            phone: nearestDealer.phone,
          }
        : null,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body", success: false },
      { status: 400 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ─── Google Sheets helper ─── */
async function appendToGoogleSheets(sheetId: string, row: string[]) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyB64 = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !privateKeyB64) {
    console.warn("[CONFIGURATOR] Google Sheets credentials not configured");
    return;
  }

  const privateKey = Buffer.from(privateKeyB64, "base64").toString("utf-8");
  const jwt = await createJWT(email, privateKey);

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:H:append?valueInputOption=RAW`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [row],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sheets API ${res.status}: ${text}`);
  }
}

/* Minimal JWT for Google service account */
async function createJWT(
  serviceEmail: string,
  privateKey: string
): Promise<string> {
  const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const claim = btoa(
    JSON.stringify({
      iss: serviceEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );

  const signInput = `${header}.${claim}`;

  const keyData = privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "");

  const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signInput)
  );

  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)));
  const jwtToken = `${signInput}.${sig}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwtToken}`,
  });

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}
