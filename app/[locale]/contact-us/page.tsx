import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { company } from "@/lib/products";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact Us | The C.L. Bailey Co.",
  description: "Get in touch with The C.L. Bailey Co. in Tomball, Texas. Questions about our pool tables, shuffleboards, or dealer program.",
};

export default async function ContactPage() {
  const t = await getTranslations();

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-medium mb-16">
            {t("contact.title")}
          </h1>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            {t("contact.getInTouch")}
          </p>
          <div className="h-px bg-gray-200 mb-8" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <ScrollReveal delay={1}>
            <p className="text-2xl font-light leading-relaxed mb-8">
              {t("contact.description")}
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{t("contact.address")}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{company.address.street}</p>
                  <p>{company.address.suite}</p>
                  <p>{company.address.city}, {company.address.state} {company.address.zip}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{t("contact.phone")}</h3>
                <a href={`tel:${company.phone.replace(/-/g, "")}`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {company.phone}
                </a>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{t("contact.email")}</h3>
                <a href={`mailto:${company.email}`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {company.email}
                </a>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{t("contact.hours")}</h3>
                <div className="text-sm text-gray-600 space-y-1">
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
                  <label htmlFor="first-name" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    {t("contact.firstName")}
                  </label>
                  <input id="first-name" type="text" className="input-modern" />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    {t("contact.lastName")}
                  </label>
                  <input id="last-name" type="text" className="input-modern" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  {t("contact.emailField")}
                </label>
                <input id="contact-email" type="email" className="input-modern" />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  {t("contact.phoneField")}
                </label>
                <input id="contact-phone" type="tel" className="input-modern" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
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
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
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
