"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { TrustBar } from "@/components/TrustBar";
import { Overview } from "@/components/Overview";
import { Features } from "@/components/Features";
import { MasterPlan } from "@/components/MasterPlan";
import { Amenities } from "@/components/Amenities";
import { Configurations } from "@/components/Configurations";
import { LocationAdvantages } from "@/components/LocationAdvantages";
import { WhyBaruipur } from "@/components/WhyBaruipur";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { BrochureModal } from "@/components/BrochureModal";

export default function Home() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const openBrochure = () => setIsBrochureOpen(true);
  const closeBrochure = () => setIsBrochureOpen(false);

  return (
    <>
      <Header onOpenBrochure={openBrochure} />
      <main>
        <HeroSlider onOpenBrochure={openBrochure} />
        <TrustBar />
        <Overview />
        <Features />
        <MasterPlan />
        <Amenities />
        <Configurations />
        <LocationAdvantages />
        <WhyBaruipur />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <MobileStickyBar />
      <BrochureModal isOpen={isBrochureOpen} onClose={closeBrochure} />
    </>
  );
}
