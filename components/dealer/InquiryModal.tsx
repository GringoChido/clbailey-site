"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import type { Dealer } from "@/lib/dealer-types";

interface InquiryModalProps {
  dealer: Dealer | null;
  open: boolean;
  onClose: () => void;
}

interface FormData {
  model: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
}

const InquiryModal = ({ dealer, open, onClose }: InquiryModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      model: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      message: "",
    },
  });

  const handleClose = () => {
    setSubmitted(false);
    reset();
    onClose();
  };

  const onSubmit = async (data: FormData) => {
    if (!dealer) return;
    setSubmitting(true);

    try {
      const payload = {
        dealerId: dealer.id,
        dealerName: dealer.name,
        model: data.model || null,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone || null,
        message: data.message || null,
        timestamp: new Date().toISOString(),
      };

      const res = await fetch("/api/dealer-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Silently fail for stub
    } finally {
      setSubmitting(false);
    }
  };

  if (!dealer) return null;

  const inputClass =
    "w-full px-4 py-3 border border-[#e0ddd8] text-[14px] text-[#1a1a1a] placeholder:text-[#999] focus:outline-none focus:border-[#1a3a2a] transition-colors";
  const inputStyle = {
    fontFamily: "var(--font-sans)",
    fontWeight: 300,
    borderRadius: "2px",
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]" />
        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-[440px] max-h-[90vh] overflow-y-auto bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
          style={{ borderRadius: "2px" }}
        >
          {/* Header */}
          <div className="bg-[#1a3a2a] px-6 py-5">
            <Dialog.Title className="sr-only">
              Send Inquiry to {dealer.name}
            </Dialog.Title>
            <p
              className="text-[10px] tracking-[3px] uppercase text-[#c8a96e] mb-1"
              style={{ fontFamily: "var(--font-label)" }}
            >
              Send Inquiry To
            </p>
            <h3
              className="text-[20px] text-white"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              {dealer.name}
            </h3>
          </div>

          {submitted ? (
            /* Success State */
            <div className="px-6 py-12 text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-[rgba(26,58,42,0.06)]" style={{ borderRadius: "50%" }}>
                <svg className="w-6 h-6 text-[#1a3a2a]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4
                className="text-[22px] text-[#1a1a1a] mb-2"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
              >
                Inquiry Sent
              </h4>
              <p
                className="text-[14px] text-[#777] mb-8"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
              >
                {dealer.name} will be in touch within 24 hours.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-3 text-[11px] tracking-[2px] uppercase border border-[#1a3a2a] text-[#1a3a2a] hover:bg-[#1a3a2a] hover:text-white transition-all duration-300"
                style={{ fontFamily: "var(--font-label)", borderRadius: "2px" }}
              >
                Close
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
              <p
                className="text-[13px] text-[#777] mb-6 leading-relaxed"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
              >
                Let this dealer know which table you&apos;re interested in. They&apos;ll follow up with availability, pricing, and delivery details.
              </p>

              <div className="space-y-4">
                {/* Model Dropdown */}
                <div>
                  <label
                    className="block text-[10px] tracking-[2px] uppercase text-[#999] mb-1.5"
                    style={{ fontFamily: "var(--font-label)" }}
                  >
                    Model of Interest
                  </label>
                  <select
                    {...register("model")}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">Not sure yet, just browsing</option>
                    {dealer.models.map((m) => (
                      <option key={m} value={m}>
                        The {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label
                    className="block text-[10px] tracking-[2px] uppercase text-[#999] mb-1.5"
                    style={{ fontFamily: "var(--font-label)" }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    {...register("customerName", { required: true })}
                    className={`${inputClass} ${errors.customerName ? "!border-red-400" : ""}`}
                    style={inputStyle}
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-[10px] tracking-[2px] uppercase text-[#999] mb-1.5"
                    style={{ fontFamily: "var(--font-label)" }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register("customerEmail", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                    className={`${inputClass} ${errors.customerEmail ? "!border-red-400" : ""}`}
                    style={inputStyle}
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="block text-[10px] tracking-[2px] uppercase text-[#999] mb-1.5"
                    style={{ fontFamily: "var(--font-label)" }}
                  >
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    {...register("customerPhone")}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-[10px] tracking-[2px] uppercase text-[#999] mb-1.5"
                    style={{ fontFamily: "var(--font-label)" }}
                  >
                    Message (optional)
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                    placeholder="Any questions for your dealer? Room dimensions, finish preferences, timeline..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 text-[11px] tracking-[2px] uppercase border border-[#e0ddd8] text-[#777] hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all duration-300"
                  style={{ fontFamily: "var(--font-label)", borderRadius: "2px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-3 text-[11px] tracking-[2px] uppercase bg-[#1a3a2a] text-white hover:bg-[#264d38] transition-all duration-300 disabled:opacity-50"
                  style={{ fontFamily: "var(--font-label)", borderRadius: "2px" }}
                >
                  {submitting ? "Sending..." : "Send to Dealer"}
                </button>
              </div>
            </form>
          )}

          {/* Close X */}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default InquiryModal;
