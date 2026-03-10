"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin-auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Image
            src="/images/brand/clb-logo.png"
            alt="The C.L. Bailey Co."
            width={180}
            height={48}
            className="h-[44px] w-auto mx-auto mb-6"
          />
          <p className="section-label mb-3">Administrative Access</p>
          <p className="text-[13px] text-[var(--color-body)] leading-[26px]">
            Internal management portal for C.L. Bailey operations.
          </p>
        </div>

        <div className="border border-[var(--color-cloud)] p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={14} className="text-[var(--color-mid-gray)]" />
            <span className="section-label">Authenticate</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-[13px] text-[var(--color-body)] mb-2"
              >
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter administrative password"
                required
                autoFocus
                className="input-modern"
              />
            </div>

            {error && (
              <p className="text-[13px] text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={!password || loading}
              className="btn-primary w-full disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {loading ? (
                "Verifying..."
              ) : (
                <>
                  Sign In
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[var(--color-mid-gray)] mt-6 leading-relaxed">
          This portal is restricted to authorized C.L. Bailey personnel.
        </p>
      </div>
    </div>
  );
}
