"use client";

import { useState } from "react";
import {
  Building2,
  User,
  MapPin,
  KeyRound,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface Props {
  onComplete: () => void;
}

type Step = 1 | 2 | 3 | 4 | 5;

const steps = [
  { num: 1 as Step, label: "Company", icon: Building2 },
  { num: 2 as Step, label: "Contact", icon: User },
  { num: 3 as Step, label: "Territory", icon: MapPin },
  { num: 4 as Step, label: "Access", icon: KeyRound },
  { num: 5 as Step, label: "Review", icon: CheckCircle2 },
];

interface FormData {
  companyName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactRole: string;
  territory: string;
  tier: string;
  deliveryPreference: string;
  portalPassword: string;
  enableNotifications: boolean;
  enableWeeklyReport: boolean;
}

const initialForm: FormData = {
  companyName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  website: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  contactRole: "",
  territory: "",
  tier: "bronze",
  deliveryPreference: "freight",
  portalPassword: "",
  enableNotifications: true,
  enableWeeklyReport: true,
};

export default function OnboardingPanel({ onComplete }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-2 border-emerald-500 flex items-center justify-center mb-6">
          <CheckCircle2 size={32} className="text-emerald-500" />
        </div>
        <h2 className="heading-display text-[24px] mb-3">Dealer Created Successfully</h2>
        <p className="text-[13px] text-[var(--color-body)] text-center max-w-md leading-[26px]">
          {form.companyName} has been added to the dealer network. A welcome email with portal credentials has been sent to {form.contactEmail}.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="section-label mb-2">Administration</p>
        <h1 className="heading-display text-[28px]">Onboard New Dealer</h1>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-0 mb-10 bg-white border border-[var(--color-cloud)]">
        {steps.map(({ num, label, icon: Icon }) => {
          const isActive = step === num;
          const isComplete = step > num;
          return (
            <button
              key={num}
              onClick={() => num < step && setStep(num)}
              disabled={num > step}
              className={`flex-1 flex items-center justify-center gap-2 py-4 border-b-2 transition-all
                ${isActive
                  ? "border-[var(--color-primary)] bg-[var(--color-whisper)]"
                  : isComplete
                  ? "border-emerald-500 bg-white"
                  : "border-transparent bg-white"
                }
                ${num > step ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <div
                className={`w-6 h-6 flex items-center justify-center text-[11px] ${
                  isComplete
                    ? "bg-emerald-500 text-white"
                    : isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-cloud)] text-[var(--color-mid-gray)]"
                }`}
              >
                {isComplete ? <CheckCircle2 size={12} /> : num}
              </div>
              <span className="text-[11px] uppercase tracking-[1.5px] font-[var(--font-raleway)] text-[var(--color-primary)] hidden sm:inline">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Form content */}
      <div className="bg-white border border-[var(--color-cloud)] p-8 max-w-2xl">
        {step === 1 && (
          <div className="space-y-5">
            <p className="section-label mb-4">Company Information</p>
            <Field label="Company Name" value={form.companyName} onChange={(v) => update("companyName", v)} placeholder="e.g. Premium Billiards" />
            <Field label="Street Address" value={form.address} onChange={(v) => update("address", v)} placeholder="123 Main Street" />
            <div className="grid grid-cols-3 gap-4">
              <Field label="City" value={form.city} onChange={(v) => update("city", v)} placeholder="Houston" />
              <Field label="State" value={form.state} onChange={(v) => update("state", v)} placeholder="TX" />
              <Field label="ZIP Code" value={form.zip} onChange={(v) => update("zip", v)} placeholder="77001" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} placeholder="281-555-0100" />
              <Field label="Website (optional)" value={form.website} onChange={(v) => update("website", v)} placeholder="https://" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <p className="section-label mb-4">Primary Contact</p>
            <Field label="Full Name" value={form.contactName} onChange={(v) => update("contactName", v)} placeholder="Jane Smith" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Email" value={form.contactEmail} onChange={(v) => update("contactEmail", v)} placeholder="jane@example.com" type="email" />
              <Field label="Phone" value={form.contactPhone} onChange={(v) => update("contactPhone", v)} placeholder="281-555-0101" />
            </div>
            <Field label="Role / Title" value={form.contactRole} onChange={(v) => update("contactRole", v)} placeholder="e.g. Owner, Sales Manager" />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <p className="section-label mb-4">Territory & Classification</p>
            <div>
              <label className="block text-[13px] text-[var(--color-body)] mb-2">Territory</label>
              <select
                value={form.territory}
                onChange={(e) => update("territory", e.target.value)}
                className="input-modern w-full"
              >
                <option value="">Select territory...</option>
                <option value="Houston Metro">Houston Metro</option>
                <option value="DFW Metro">DFW Metro</option>
                <option value="Central Texas">Central Texas</option>
                <option value="Upper Midwest">Upper Midwest</option>
                <option value="Southwest">Southwest</option>
                <option value="Northeast">Northeast</option>
                <option value="Southeast">Southeast</option>
                <option value="West Coast">West Coast</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] text-[var(--color-body)] mb-2">Initial Tier</label>
              <div className="grid grid-cols-4 gap-3">
                {(["bronze", "silver", "gold", "platinum"] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => update("tier", tier)}
                    className={`py-3 text-center text-[11px] uppercase tracking-[1.5px] border transition-colors ${
                      form.tier === tier
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                        : "border-[var(--color-cloud)] text-[var(--color-body)] hover:border-[var(--color-silver)]"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[13px] text-[var(--color-body)] mb-2">Delivery Preference</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "freight", label: "Freight Carrier" },
                  { value: "white_glove", label: "White Glove" },
                  { value: "pickup", label: "Warehouse Pickup" },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => update("deliveryPreference", value)}
                    className={`py-3 text-center text-[11px] uppercase tracking-[1.5px] border transition-colors ${
                      form.deliveryPreference === value
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                        : "border-[var(--color-cloud)] text-[var(--color-body)] hover:border-[var(--color-silver)]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <p className="section-label mb-4">Portal Access & Notifications</p>
            <Field
              label="Portal Password"
              value={form.portalPassword}
              onChange={(v) => update("portalPassword", v)}
              placeholder="Set dealer portal password"
              type="password"
            />
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.enableNotifications}
                  onChange={(e) => update("enableNotifications", e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-primary)]"
                />
                <span className="text-[13px] text-[var(--color-body)]">Enable order and lead notifications via email</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.enableWeeklyReport}
                  onChange={(e) => update("enableWeeklyReport", e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-primary)]"
                />
                <span className="text-[13px] text-[var(--color-body)]">Send weekly performance digest</span>
              </label>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <p className="section-label mb-4">Review & Confirm</p>

            <ReviewSection title="Company">
              <ReviewItem label="Name" value={form.companyName} />
              <ReviewItem label="Address" value={`${form.address}, ${form.city}, ${form.state} ${form.zip}`} />
              <ReviewItem label="Phone" value={form.phone} />
              {form.website && <ReviewItem label="Website" value={form.website} />}
            </ReviewSection>

            <ReviewSection title="Contact">
              <ReviewItem label="Name" value={form.contactName} />
              <ReviewItem label="Email" value={form.contactEmail} />
              <ReviewItem label="Phone" value={form.contactPhone} />
              <ReviewItem label="Role" value={form.contactRole} />
            </ReviewSection>

            <ReviewSection title="Territory & Tier">
              <ReviewItem label="Territory" value={form.territory} />
              <ReviewItem label="Tier" value={form.tier.charAt(0).toUpperCase() + form.tier.slice(1)} />
              <ReviewItem label="Delivery" value={form.deliveryPreference.replace("_", " ")} />
            </ReviewSection>

            <ReviewSection title="Access">
              <ReviewItem label="Notifications" value={form.enableNotifications ? "Enabled" : "Disabled"} />
              <ReviewItem label="Weekly Report" value={form.enableWeeklyReport ? "Enabled" : "Disabled"} />
            </ReviewSection>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--color-cloud)]">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as Step)}
              className="btn-outline flex items-center gap-2 text-[12px]"
            >
              <ArrowLeft size={14} /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep((step + 1) as Step)}
              className="btn-primary flex items-center gap-2 text-[12px]"
            >
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-primary flex items-center gap-2 text-[12px] bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
            >
              <CheckCircle2 size={14} /> Create Dealer Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[13px] text-[var(--color-body)] mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-modern w-full"
      />
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-[var(--color-cloud)] p-4">
      <p className="text-[10px] uppercase tracking-[2px] text-[var(--color-mid-gray)] font-[var(--font-raleway)] mb-3">
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[12px] text-[var(--color-mid-gray)]">{label}</span>
      <span className="text-[13px] text-[var(--color-primary)] text-right">{value || "-"}</span>
    </div>
  );
}
