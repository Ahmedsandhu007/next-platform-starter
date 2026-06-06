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
  return (
    <>
      <HeroPremium />
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
