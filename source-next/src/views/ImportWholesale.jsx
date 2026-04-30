"use client";
import React from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CtaSection from "../components/shared/CtaSection";
import { Star, ShoppingBag, Palette, Package, Globe } from "lucide-react";
import { motion } from "framer-motion";

const productGroups = [
  { icon: Star, label: "Specialty Goods" },
  { icon: Palette, label: "Cultural Products" },
  { icon: ShoppingBag, label: "Consumer Products" },
  { icon: Package, label: "Handmade or Artisan Products" },
  { icon: Globe, label: "Commercially Viable Sri Lankan Products" },
];

export default function ImportWholesale() {
  return (
    <>
      <PageHero
        headline="Developing U.S. Distribution Channels for Selected Sri Lankan Products"
        subheadline="We are building import and wholesale distribution pathways to bring selected Sri Lankan products to the U.S. market."
        primaryCta="Discuss U.S. Distribution"
        primaryCtaLink="/contact"
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading
                label="Import Program"
                title="Bringing Sri Lankan Products to the U.S."
                description="The company plans to import selected Sri Lankan products into the United States for direct-to-consumer and wholesale distribution."
              />
              <div className="space-y-4 mt-8">
                {productGroups.map((pg, i) => (
                  <motion.div
                    key={pg.label}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <pg.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{pg.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h3 className="font-semibold text-foreground mb-3">For Wholesale Buyers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Retailers, distributors, and resellers may contact us to discuss future wholesale opportunities for Sri Lankan products in the U.S. market.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h3 className="font-semibold text-foreground mb-3">For Sri Lankan Producers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sri Lankan producers interested in U.S. market access may contact us for review. We evaluate products based on market fit, quality, logistics feasibility, and compliance requirements.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Interested in U.S. distribution?"
        description="Contact us to discuss wholesale or import opportunities."
        ctaText="Discuss U.S. Distribution"
        ctaLink="/contact"
      />
    </>
  );
}