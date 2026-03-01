import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const timestamp = new Date().toISOString();
    console.log("[NEWSLETTER]", { timestamp, email });

    // Log to Google Sheets if configured
    const sheetsId = process.env.GOOGLE_SHEETS_ID;
    const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKeyB64 = process.env.GOOGLE_PRIVATE_KEY;

    if (sheetsId && serviceEmail && privateKeyB64) {
      try {
        const privateKey = Buffer.from(privateKeyB64, "base64").toString("utf-8");
        const jwt = await createJWT(serviceEmail, privateKey);

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/Newsletter!A:B:append?valueInputOption=RAW`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [[email, timestamp]],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("[NEWSLETTER] Sheets error:", text);
        }
      } catch (err) {
        console.error("[NEWSLETTER] Sheets error:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 },
    );
  }
}

async function createJWT(
  serviceEmail: string,
  privateKey: string,
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
    }),
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
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signInput),
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
