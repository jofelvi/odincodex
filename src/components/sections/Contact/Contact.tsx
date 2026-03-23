"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { SECTION_IDS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { useI18n } from "@/i18n";

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = formRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Connect to API route / email service
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: "", email: "", company: "", projectType: "", message: "" });
  };

  const inputClasses =
    "w-full border-b border-[var(--border-subtle)] bg-transparent py-3 font-body text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent-cyan";

  return (
    <section id={SECTION_IDS.contact} style={{ width: "100%" }} className="relative py-32">
      {/* Background blob */}
      <div className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-accent-cyan/5 blur-[200px]" />

      <div className="section-container">
        <SectionHeading
          title={t("contact.heading")}
          subtitle={t("contact.subtitle")}
          gradient
        />

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left side */}
          <div className="flex flex-col justify-center">
            <p className="mb-8 text-lg leading-relaxed text-text-secondary">
              {t("contact.intro")}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent-cyan/20 bg-accent-cyan/5">
                  <span className="text-sm text-accent-cyan">@</span>
                </div>
                <span className="text-text-secondary">hello@odincodex.com</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <div
              data-animate
              className="anim-field-up"
              style={{ transitionDelay: "0ms" }}
            >
              <input
                type="text"
                placeholder={t("contact.placeholderName")}
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={inputClasses}
              />
            </div>

            <div
              data-animate
              className="anim-field-up"
              style={{ transitionDelay: "100ms" }}
            >
              <input
                type="email"
                placeholder={t("contact.placeholderEmail")}
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={inputClasses}
              />
            </div>

            <div
              data-animate
              className="anim-field-up"
              style={{ transitionDelay: "200ms" }}
            >
              <input
                type="text"
                placeholder={t("contact.placeholderCompany")}
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className={inputClasses}
              />
            </div>

            <div
              data-animate
              className="anim-field-up"
              style={{ transitionDelay: "300ms" }}
            >
              <select
                value={formData.projectType}
                onChange={(e) =>
                  setFormData({ ...formData, projectType: e.target.value })
                }
                className={`${inputClasses} ${
                  formData.projectType === "" ? "text-text-muted" : ""
                }`}
              >
                <option value="" disabled>
                  {t("contact.placeholderProjectType")}
                </option>
                <option value="web-app">{t("contact.optionWebApp")}</option>
                <option value="mobile-app">{t("contact.optionMobileApp")}</option>
                <option value="design">{t("contact.optionDesign")}</option>
                <option value="branding">{t("contact.optionBranding")}</option>
                <option value="ai-automation">{t("contact.optionAiAutomation")}</option>
                <option value="consulting">{t("contact.optionConsulting")}</option>
                <option value="other">{t("contact.optionOther")}</option>
              </select>
            </div>

            <div
              data-animate
              className="anim-field-up"
              style={{ transitionDelay: "400ms" }}
            >
              <textarea
                placeholder={t("contact.placeholderMessage")}
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={`${inputClasses} resize-none`}
              />
            </div>

            <div
              data-animate
              className="anim-field-up"
              style={{ transitionDelay: "500ms" }}
            >
              {isSubmitted ? (
                <div className="rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 p-4 text-center text-accent-cyan">
                  {t("contact.successMessage")}
                </div>
              ) : (
                <Button type="submit" variant="primary" size="large">
                  {t("contact.sendMessage")}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
