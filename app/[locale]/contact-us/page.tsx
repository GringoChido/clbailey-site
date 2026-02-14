import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionLabel from "@/components/ui/SectionLabel";
import { company } from "@/lib/products";

export const metadata: Metadata = {
  title: "Contact Us | The C.L. Bailey Co.",
  description: "Get in touch with The C.L. Bailey Co. in Tomball, Texas. Questions about our pool tables, shuffleboards, or dealer program.",
};

export default async function ContactPage() {
  const t = await getTranslations();

  return (
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl lg:text-5xl mb-16 animate-fade-up">
          {t("contact.title")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <SectionLabel label={t("contact.getInTouch")} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-brown/20 pt-4">
            {/* Contact Info */}
            <div className="animate-fade-up animate-delay-2">
              <p className="font-serif text-2xl leading-relaxed mb-8">
                {t("contact.description")}
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-brown/40 mb-2">{t("contact.address")}</h3>
                  <div className="text-sm text-brown/70 space-y-1">
                    <p>{company.address.street}</p>
                    <p>{company.address.suite}</p>
                    <p>{company.address.city}, {company.address.state} {company.address.zip}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-brown/40 mb-2">{t("contact.phone")}</h3>
                  <a href={`tel:${company.phone.replace(/-/g, "")}`} className="text-sm text-brown/70 hover:text-brown transition-colors">
                    {company.phone}
                  </a>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-brown/40 mb-2">{t("contact.email")}</h3>
                  <a href={`mailto:${company.email}`} className="text-sm text-brown/70 hover:text-brown transition-colors">
                    {company.email}
                  </a>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-brown/40 mb-2">{t("contact.hours")}</h3>
                  <div className="text-sm text-brown/70 space-y-1">
                    <p>{company.hours.weekday}</p>
                    <p>{company.hours.friday}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-up animate-delay-3">
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="block text-xs uppercase tracking-widest text-brown/40 mb-2">
                      {t("contact.firstName")}
                    </label>
                    <input id="first-name" type="text" className="w-full border border-brown/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-brown transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-xs uppercase tracking-widest text-brown/40 mb-2">
                      {t("contact.lastName")}
                    </label>
                    <input id="last-name" type="text" className="w-full border border-brown/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-brown transition-colors" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs uppercase tracking-widest text-brown/40 mb-2">
                    {t("contact.emailField")}
                  </label>
                  <input id="contact-email" type="email" className="w-full border border-brown/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-brown transition-colors" />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs uppercase tracking-widest text-brown/40 mb-2">
                    {t("contact.phoneField")}
                  </label>
                  <input id="contact-phone" type="tel" className="w-full border border-brown/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-brown transition-colors" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-brown/40 mb-2">
                    {t("contact.subject")}
                  </label>
                  <select id="subject" className="w-full border border-brown/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-brown transition-colors">
                    <option value="">{t("contact.selectSubject")}</option>
                    <option>{t("contact.subjectProduct")}</option>
                    <option>{t("contact.subjectDealer")}</option>
                    <option>{t("contact.subjectWarranty")}</option>
                    <option>{t("contact.subjectGeneral")}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-brown/40 mb-2">
                    {t("contact.message")}
                  </label>
                  <textarea id="message" rows={5} className="w-full border border-brown/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-brown transition-colors resize-none" />
                </div>
                <button
                  type="submit"
                  className="bg-brown text-cream px-10 py-3.5 text-sm uppercase tracking-wider hover:bg-brown-light transition-colors"
                >
                  {t("contact.send")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
