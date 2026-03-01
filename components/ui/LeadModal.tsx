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
    [name, email, zip, productName, pdfUrl],
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white p-8 data-[state=open]:animate-fade-up">
          <Dialog.Title className="heading-card text-xl mb-2">
            {t("title")}
          </Dialog.Title>
          <Dialog.Description className="text-[13px] text-[var(--color-body)] mb-8">
            {t("description", { productName })}
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="gate-name"
                className="block metadata mb-2"
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
                className="input-modern"
              />
            </div>
            <div>
              <label
                htmlFor="gate-email"
                className="block metadata mb-2"
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
                className="input-modern"
              />
            </div>
            <div>
              <label
                htmlFor="gate-zip"
                className="block metadata mb-2"
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
                className="input-modern"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary disabled:opacity-40"
            >
              {submitting ? t("submitting") : t("submit")}
            </button>
          </form>

          <p className="text-xs text-[var(--color-mid-gray)] mt-6 leading-relaxed">
            {t("disclaimer")}
          </p>

          <Dialog.Close className="absolute top-4 right-4 text-[var(--color-silver)] hover:text-[var(--color-primary)] transition-colors duration-300">
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
