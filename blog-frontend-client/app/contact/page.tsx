import type { Metadata } from "next";
import ContactForm from "./contact-form";


export const metadata: Metadata = {
  title: "Contact Me | My Blog",
  description: "Get in touch with me via email. I'd love to hear from you.",
  openGraph: {
    title: "Contact Me | My Blog",
    description: "Send a message through email and connect.",
    url: "https://yourdomain.com/contact",
    siteName: "My Blog",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <ContactForm />
  );
}
