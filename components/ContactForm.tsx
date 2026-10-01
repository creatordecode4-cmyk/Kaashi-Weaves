"use client";

import { useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/whatsapp";

const field =
  "mt-1.5 block w-full border border-wine/20 bg-transparent px-3 py-3 text-base text-ink placeholder:text-muted/60 focus:border-wine focus:outline-none";

/**
 * No backend — the form hands the message off to WhatsApp. Without
 * NEXT_PUBLIC_WHATSAPP_NUMBER (concept mode) nothing is sent.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "concept">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const msg = [
      `Hi Kaashi Weaves, I'm ${data.get("name")}.`,
      `Topic: ${data.get("topic")}`,
      "",
      String(data.get("message")),
    ].join("\n");
    const href = whatsappLink(msg);
    if (!href) {
      setStatus("concept");
      return;
    }
    window.open(href, "_blank", "noopener,noreferrer");
    setStatus("sent");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 bg-ivory-dark p-5 sm:p-8">
      <label className="block text-sm">
        Name
        <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
      </label>
      <label className="block text-sm">
        Topic
        <select name="topic" className={field} defaultValue="Order enquiry">
          <option>Order enquiry</option>
          <option>Sizing help</option>
          <option>Custom / bridal</option>
          <option>Collaboration</option>
        </select>
      </label>
      <label className="block text-sm">
        Message
        <textarea name="message" required rows={5} className={field} placeholder="How can we help?" />
      </label>
      <button type="submit" className="btn-primary w-full">Send via WhatsApp</button>
      {status !== "idle" && (
        <p role="status" className="text-center text-sm text-wine">
          {status === "sent"
            ? "Opening WhatsApp… thank you, we'll be in touch soon."
            : "This is a concept store — messages aren't sent anywhere."}
        </p>
      )}
    </form>
  );
}
