"use client";
import React from "react";
import HeroSection from "../components/home/HeroSection";
import TrustStrip from "../components/home/TrustStrip";
import WhatWeDo from "../components/home/WhatWeDo";
import WhoWeHelp from "../components/home/WhoWeHelp";
import ProcessOverview from "../components/home/ProcessOverview";
import ProductCategoriesPreview from "../components/home/ProductCategoriesPreview";
import WhyWorkWithUs from "../components/home/WhyWorkWithUs";
import FutureImport from "../components/home/FutureImport";
import CtaSection from "../components/shared/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <WhatWeDo />
      <WhoWeHelp />
      <ProcessOverview />
      <ProductCategoriesPreview />
      <WhyWorkWithUs />
      <FutureImport />
      <CtaSection
        title="Have a product request?"
        description="Start with a sourcing quote and our team will review your requirements."
        ctaText="Request a Sourcing Quote"
      />
    </>
  );
}