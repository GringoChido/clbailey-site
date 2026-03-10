import { z } from "zod";

const sanitizeString = z.string().transform((val) =>
  val.replace(/[<>]/g, "").trim()
);

export const emailSchema = z
  .string()
  .email("Invalid email address")
  .max(255, "Email too long")
  .transform((val) => val.toLowerCase().trim());

export const zipSchema = z
  .string()
  .regex(/^\d{5}$/, "ZIP code must be 5 digits")
  .transform((val) => val.trim());

export const nameSchema = sanitizeString
  .pipe(z.string().max(100, "Name too long"));

export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .max(128, "Password too long");

export const leadSchema = z.object({
  name: nameSchema.optional().default(""),
  email: emailSchema,
  zip: zipSchema,
  product: sanitizeString.pipe(z.string().min(1).max(200)),
  pdfUrl: z.string().url().max(500),
});

export const configuratorSchema = z.object({
  name: nameSchema.optional().default(""),
  email: emailSchema,
  zip: zipSchema,
  product: sanitizeString.pipe(z.string().min(1).max(200)),
  size: sanitizeString.pipe(z.string().min(1).max(50)),
  finish: sanitizeString.pipe(z.string().min(1).max(100)),
});

export const newsletterSchema = z.object({
  email: emailSchema,
});

export const dealerInquirySchema = z.object({
  dealerName: sanitizeString.pipe(z.string().min(1).max(200)),
  customerName: sanitizeString.pipe(z.string().min(1).max(100)),
  customerEmail: emailSchema,
  message: sanitizeString.pipe(z.string().max(2000)).optional(),
});

export const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().max(4000, "Message too long"),
    })
  ).min(1).max(50, "Too many messages"),
});

export const quoteSchema = z.object({
  configurations: z.array(z.record(z.string(), z.unknown())).min(1).max(20),
  customerName: nameSchema,
  dealerId: sanitizeString.pipe(z.string().max(100)).optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;
export type ConfiguratorPayload = z.infer<typeof configuratorSchema>;
export type NewsletterPayload = z.infer<typeof newsletterSchema>;
export type DealerInquiryPayload = z.infer<typeof dealerInquirySchema>;
export type QuotePayload = z.infer<typeof quoteSchema>;
