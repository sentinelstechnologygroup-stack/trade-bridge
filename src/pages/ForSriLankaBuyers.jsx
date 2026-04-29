import React from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CtaSection from "../components/shared/CtaSection";
import { AlertCircle, CheckCircle, Shield } from "lucide-react";
import { motion } from "framer-motion";

const painPoints = [
  "Difficulty reaching U.S. suppliers",
  "Supplier communication delays",
  "Minimum order quantity confusion",
  "Multiple supplier coordination challenges",
  "Unclear export process",
  "Need for reliable U.S.-side support",
];

const solutions = [
  "U.S.-based coordination from our Houston office",
  "Direct supplier communication on your behalf",
  "Professional product sourcing across categories",
  "Multi-supplier order organization",
  "Export partner coordination",
];

const responsibilities = [
  "Act as importer of record unless otherwise agreed",
  "Confirm destination import requirements",
  "Handle duties, taxes, permits, and customs clearance",
  "Approve products and payment terms before order placement",
];

export default function ForSriLankaBuyers() {
  return (
    <>
      <PageHero
        headline="U.S. Sourcing Support for Sri Lankan Businesses"
        subheadline="Reliable product sourcing, supplier coordination, and export support — managed from Houston for your Sri Lankan business."
        primaryCta="Request a Sourcing Quote"
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Pain Points */}
            <div>
              <SectionHeading label="Challenges" title="Common Pain Points" />
              <div className="space-y-4">
                {painPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    </div>
                    <span className="text-sm text-foreground">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <SectionHeading label="Our Support" title="How We Help" />
              <div className="space-y-4">
                {solutions.map((sol, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm text-foreground">{sol}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer Responsibilities */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg text-foreground">Buyer Responsibilities</h3>
              </div>
              <div className="space-y-3">
                {responsibilities.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to source from the U.S.?"
        ctaText="Request a Sourcing Quote"
      />
    </>
  );
}