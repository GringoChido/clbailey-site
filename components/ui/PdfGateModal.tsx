"use client";

import { useState, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";

interface PdfGateModalProps {
  productName: string;
  pdfUrl: string;
  children: React.ReactNode;
}

export default function PdfGateModal({
  productName,
  pdfUrl,
  children,
}: PdfGateModalProps) {
  const t = useTranslations("pdfGate");
  const [open, setOpen] = useState(false);
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
        setEmail("");
        setZip("");
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [email, zip, productName, pdfUrl]
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-brown/60 backdrop-blur-sm z-50 data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-cream p-8 shadow-2xl data-[state=open]:animate-fade-up">
          <Dialog.Title className="font-serif text-2xl mb-2">
            {t("title")}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-brown/60 mb-6">
            {t("description", { productName })}
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="gate-email"
                className="block text-xs uppercase tracking-wider text-brown/50 mb-1"
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
                className="w-full border border-brown/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-brown transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="gate-zip"
                className="block text-xs uppercase tracking-wider text-brown/50 mb-1"
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
                className="w-full border border-brown/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-brown transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brown text-cream py-3 text-sm uppercase tracking-wider hover:bg-brown-light transition-colors disabled:opacity-50"
            >
              {submitting ? t("submitting") : t("submit")}
            </button>
          </form>

          <p className="text-xs text-brown/40 mt-4 leading-relaxed">
            {t("disclaimer")}
          </p>

          <Dialog.Close className="absolute top-4 right-4 text-brown/40 hover:text-brown transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
