import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get a free, fixed-fee quote from MMR Accountants. Call 020 3475 8210, email hello@mmraccountants.co.uk, or send us a message — we reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title="Contact MMR Accountants"
        subtitle="Speak to a chartered accountant who actually picks up the phone. We're here Monday to Friday and reply to every enquiry within one business day."
      />
      <Contact />
    </>
  );
}
