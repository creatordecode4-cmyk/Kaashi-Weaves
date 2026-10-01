import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kaashi Weaves for orders, custom pieces, sizing help or collaborations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-x pt-10 sm:pt-14">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-4xl leading-tight text-wine sm:text-5xl">Let&apos;s talk weaves.</h1>
          <p className="mt-5 leading-relaxed text-ink/80">
            Sizing doubts, custom bridal orders or just want to see a fabric up close on video? Write to us — we
            usually reply within a day.
          </p>
          <dl className="mt-8 space-y-5 text-sm">
            <div>
              <dt className="eyebrow">Studio</dt>
              <dd className="mt-1">Chowk, Varanasi, Uttar Pradesh 221001</dd>
            </div>
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-1 break-all">{SITE.email}</dd>
            </div>
            <div>
              <dt className="eyebrow">Instagram</dt>
              <dd className="mt-1">{SITE.instagram}</dd>
            </div>
            <div>
              <dt className="eyebrow">Hours</dt>
              <dd className="mt-1">Mon – Sat, 10am – 7pm IST</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
