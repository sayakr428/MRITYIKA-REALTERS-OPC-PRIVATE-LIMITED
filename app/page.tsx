"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { TrustBar } from "@/components/TrustBar";

// Dynamically load heavy components below the fold for fast initial paint
const Overview = dynamic(() => import("@/components/Overview").then((m) => m.Overview));
const Features = dynamic(() => import("@/components/Features").then((m) => m.Features));
const MasterPlan = dynamic(() => import("@/components/MasterPlan").then((m) => m.MasterPlan));
const Amenities = dynamic(() => import("@/components/Amenities").then((m) => m.Amenities));
const Configurations = dynamic(() => import("@/components/Configurations").then((m) => m.Configurations));
const LocationAdvantages = dynamic(() => import("@/components/LocationAdvantages").then((m) => m.LocationAdvantages));
const WhyBaruipur = dynamic(() => import("@/components/WhyBaruipur").then((m) => m.WhyBaruipur));
const FAQ = dynamic(() => import("@/components/FAQ").then((m) => m.FAQ));
const CTASection = dynamic(() => import("@/components/CTASection").then((m) => m.CTASection));
const Footer = dynamic(() => import("@/components/Footer").then((m) => m.Footer));
const MobileStickyBar = dynamic(() => import("@/components/MobileStickyBar").then((m) => m.MobileStickyBar));
const BrochureModal = dynamic(() => import("@/components/BrochureModal").then((m) => m.BrochureModal), { ssr: false });

export default function Home() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

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
      {isBrochureOpen && <BrochureModal isOpen={isBrochureOpen} onClose={closeBrochure} />}
    </>
  );
}
