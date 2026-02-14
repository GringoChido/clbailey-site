"use client";

import { useState, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";

interface LeadModalProps {
  productName: string;
  pdfUrl: string;
  children: React.ReactNode;
}

export default function LeadModal({
  productName,
  pdfUrl,
  children,
}: LeadModalProps) {
  const t = useTranslations("lead");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSubmitting(true);

      try {
        const res = await fetch("/api/leads/pdf-download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            zip,
            product: productName,
            pdfUrl,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Something went wrong.");
          setSubmitting(false);
          return;
        }

        // Trigger download
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = "";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setOpen(false);
        setName("");
        setEmail("");
        setZip("");
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [name, email, zip, productName, pdfUrl]
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-vellum p-10 data-[state=open]:animate-fade-up">
          <Dialog.Title className="font-serif text-2xl text-ink mb-2 tracking-tight">
            {t("title")}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-ink/40 mb-8 font-serif">
            {t("description", { productName })}
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="gate-name"
                className="block text-[10px] uppercase tracking-[0.5em] text-ink/40 mb-2 font-sans font-medium"
              >
                {t("nameLabel")}
              </label>
              <input
                id="gate-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className="w-full border-0 border-b border-estate/30 bg-transparent px-0 py-3 text-sm text-ink focus:outline-none focus:border-ink transition-colors placeholder-ink/20"
              />
            </div>
            <div>
              <label
                htmlFor="gate-email"
                className="block text-[10px] uppercase tracking-[0.5em] text-ink/40 mb-2 font-sans font-medium"
              >
                {t("emailLabel")}
              </label>
              <input
                id="gate-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="w-full border-0 border-b border-estate/30 bg-transparent px-0 py-3 text-sm text-ink focus:outline-none focus:border-ink transition-colors placeholder-ink/20"
              />
            </div>
            <div>
              <label
                htmlFor="gate-zip"
                className="block text-[10px] uppercase tracking-[0.5em] text-ink/40 mb-2 font-sans font-medium"
              >
                {t("zipLabel")}
              </label>
              <input
                id="gate-zip"
                type="text"
                required
                pattern="\d{5}"
                maxLength={5}
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                placeholder={t("zipPlaceholder")}
                className="w-full border-0 border-b border-estate/30 bg-transparent px-0 py-3 text-sm text-ink focus:outline-none focus:border-ink transition-colors placeholder-ink/20"
              />
            </div>

            {error && (
              <p className="text-sm text-red-700">{error}</p>
            )}

            {/* Heritage Button — square corners, Ink bg, Vellum text */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-ink text-vellum py-3.5 text-[10px] uppercase tracking-[0.5em] font-sans font-medium hover:bg-ink-light transition-colors disabled:opacity-40"
            >
              {submitting ? t("submitting") : t("submit")}
            </button>
          </form>

          <p className="text-xs text-ink/30 mt-6 leading-relaxed font-serif">
            {t("disclaimer")}
          </p>

          <Dialog.Close className="absolute top-4 right-4 text-ink/30 hover:text-ink transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
