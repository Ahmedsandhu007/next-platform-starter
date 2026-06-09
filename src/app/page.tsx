import { existsSync } from "fs";
import path from "path";
import { HeroPremium } from "@/components/HeroPremium";
import { TrustedBy } from "@/components/TrustedBy";
import { Approach } from "@/components/Approach";
import { Services } from "@/components/Services";
import { WhyChoose } from "@/components/WhyChoose";
import { Industries } from "@/components/Industries";
import { CloudAccounting } from "@/components/CloudAccounting";
import { HowWeWork } from "@/components/HowWeWork";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CtaBand } from "@/components/CtaBand";

export default function Home() {
  // If a transparent cut-out is provided at public/hero.png, the hero renders it
  // frameless on the navy (like the reference); otherwise it frames the photo.
  const cutoutSrc = existsSync(path.join(process.cwd(), "public", "hero.png")) ? "/hero.png" : null;
  return (
    <>
      <HeroPremium cutoutSrc={cutoutSrc} />
      <TrustedBy />
      <Approach />
      <Services />
      <WhyChoose />
      <Industries />
      <CloudAccounting />
      <HowWeWork />
      <Testimonials />
      <FAQ />
      <CtaBand />
    </>
  );
}
