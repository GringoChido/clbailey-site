import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { company } from "@/lib/products";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact Us | The C.L. Bailey Co.",
  description: "Get in touch with The C.L. Bailey Co. in Tomball, Texas. Questions about our pool tables, shuffleboards, or dealer program.",
  openGraph: {
    title: "Contact Us | C.L. Bailey & Co.",
    description:
      "Get in touch with The C.L. Bailey Co. in Tomball, Texas. Questions about our pool tables, shuffleboards, or dealer program.",
    type: "website",
  },
  alternates: {
    canonical: "https://clbailey.com/en/contact-us",
    languages: {
      en: "https://clbailey.com/en/contact-us",
      es: "https://clbailey.com/es/contact-us",
    },
  },
};

export default async function ContactPage() {
  const t = await getTranslations();

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="heading-display text-3xl md:text-4xl mb-16">
            {t("contact.title")}
          </h1>
        </ScrollReveal>

        <ScrollReveal>
          <p className="section-label mb-3">
            {t("contact.getInTouch")}
          </p>
          <div className="h-px bg-[var(--color-cloud)] mb-8" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <ScrollReveal delay={1}>
            <p className="heading-sub text-2xl mb-8">
              {t("contact.description")}
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="metadata !text-[var(--color-mid-gray)] mb-2">{t("contact.address")}</h3>
                <div className="text-[13px] text-[var(--color-body)] leading-[26px] space-y-1">
                  <p>{company.address.street}</p>
                  <p>{company.address.suite}</p>
                  <p>{company.address.city}, {company.address.state} {company.address.zip}</p>
                </div>
              </div>
              <div>
                <h3 className="metadata !text-[var(--color-mid-gray)] mb-2">{t("contact.phone")}</h3>
                <a href={`tel:${company.phone.replace(/-/g, "")}`} className="text-[13px] text-[var(--color-body)] hover:text-[var(--color-primary)] transition-colors duration-300">
                  {company.phone}
                </a>
              </div>
              <div>
                <h3 className="metadata !text-[var(--color-mid-gray)] mb-2">{t("contact.email")}</h3>
                <a href={`mailto:${company.email}`} className="text-[13px] text-[var(--color-body)] hover:text-[var(--color-primary)] transition-colors duration-300">
                  {company.email}
                </a>
              </div>
              <div>
                <h3 className="metadata !text-[var(--color-mid-gray)] mb-2">{t("contact.hours")}</h3>
                <div className="text-[13px] text-[var(--color-body)] leading-[26px] space-y-1">
                  <p>{company.hours.weekday}</p>
                  <p>{company.hours.friday}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={2}>
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block metadata !text-[var(--color-mid-gray)] mb-2">
                    {t("contact.firstName")}
                  </label>
                  <input id="first-name" type="text" className="input-modern" />
                </div>
                <div>
                  <label htmlFor="last-name" className="block metadata !text-[var(--color-mid-gray)] mb-2">
                    {t("contact.lastName")}
                  </label>
                  <input id="last-name" type="text" className="input-modern" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-email" className="block metadata !text-[var(--color-mid-gray)] mb-2">
                  {t("contact.emailField")}
                </label>
                <input id="contact-email" type="email" className="input-modern" />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block metadata !text-[var(--color-mid-gray)] mb-2">
                  {t("contact.phoneField")}
                </label>
                <input id="contact-phone" type="tel" className="input-modern" />
              </div>
              <div>
                <label htmlFor="subject" className="block metadata !text-[var(--color-mid-gray)] mb-2">
                  {t("contact.subject")}
                </label>
                <select id="subject" className="input-modern">
                  <option value="">{t("contact.selectSubject")}</option>
                  <option>{t("contact.subjectProduct")}</option>
                  <option>{t("contact.subjectDealer")}</option>
                  <option>{t("contact.subjectWarranty")}</option>
                  <option>{t("contact.subjectGeneral")}</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block metadata !text-[var(--color-mid-gray)] mb-2">
                  {t("contact.message")}
                </label>
                <textarea id="message" rows={5} className="input-modern resize-none" />
              </div>
              <button type="submit" className="btn-primary">
                {t("contact.send")}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
