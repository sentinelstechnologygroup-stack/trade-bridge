"use client";
import React from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CtaSection from "../components/shared/CtaSection";
import { Search, MessageSquare, DollarSign, Package, ClipboardCheck, Truck, FileCheck, Building2, Store, ShoppingBag, Briefcase, Settings, Users } from "lucide-react";
import { motion } from "framer-motion";

const includes = [
  { icon: ClipboardCheck, label: "Product request review" },
  { icon: Search, label: "Supplier identification" },
  { icon: MessageSquare, label: "Supplier communication" },
  { icon: DollarSign, label: "Pricing and availability checks" },
  { icon: Package, label: "Order coordination" },
  { icon: Truck, label: "Consolidation planning" },
  { icon: FileCheck, label: "Export partner coordination" },
];

const clients = [
  { icon: Store, label: "Retailers" },
  { icon: Building2, label: "Distributors" },
  { icon: Briefcase, label: "Business owners" },
  { icon: ShoppingBag, label: "Specialty buyers" },
  { icon: Settings, label: "Commercial operators" },
  { icon: Users, label: "Sri Lankan companies seeking reliable U.S. supply channels" },
];

const clientProvides = [
  "Product name or category",
  "Quantity",
  "Preferred brands/specifications",
  "Destination",
  "Timeline",
  "Importer information",
  "Permit status if applicable",
];

export default function USProductSourcing() {
  return (
    <>
      <PageHero
        headline="Source U.S. Products for Your Sri Lankan Business"
        subheadline="Professional product sourcing, supplier coordination, and procurement support from U.S. manufacturers and distributors."
        primaryCta="Submit a Product Request"
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading label="Service Details" title="What This Service Includes" />
              <div className="space-y-4">
                {includes.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading label="Ideal Clients" title="Who This Is For" />
              <div className="space-y-4">
                {clients.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                      <c.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{c.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Getting Started"
            title="What Clients Should Provide"
            description="To help us review your request efficiently, please prepare the following information."
            centered
          />
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="space-y-3">
                {clientProvides.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-accent">{i + 1}</span>
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to source U.S. products?"
        ctaText="Submit a Product Request"
      />
    </>
  );
}