"use client";
import React from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CtaSection from "../components/shared/CtaSection";
import { ClipboardList, Search, Users, FileCheck, ShoppingBag, Package, Truck, Ship } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { num: 1, icon: ClipboardList, title: "Submit Product Request", desc: "Buyer provides product details, quantity, destination, and timeline." },
  { num: 2, icon: Search, title: "Feasibility Review", desc: "We review supplier availability, general sourcing fit, and logistics considerations." },
  { num: 3, icon: Users, title: "Supplier Sourcing", desc: "We contact U.S. suppliers and gather pricing and availability information." },
  { num: 4, icon: FileCheck, title: "Quote & Approval", desc: "Buyer reviews estimated product cost, fees, logistics assumptions, and payment terms." },
  { num: 5, icon: ShoppingBag, title: "Order Coordination", desc: "Approved products are purchased or coordinated according to the agreed terms." },
  { num: 6, icon: Package, title: "Shipment Preparation", desc: "Product and order details are organized for export partner review." },
  { num: 7, icon: Truck, title: "Freight Partner Coordination", desc: "Shipment is tendered to freight and logistics partners." },
  { num: 8, icon: Ship, title: "Destination Import", desc: "Sri Lankan buyer/importer clears goods and handles local duties and taxes unless otherwise agreed." },
];

const needFromYou = [
  "Product specifications or descriptions",
  "Quantity and unit details",
  "Destination city and country",
  "Desired timeline",
  "Company name and details",
  "Importer information",
  "Permit information if applicable",
];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        headline="A Clear Process for U.S. Sourcing and Export Coordination"
        subheadline="Transparency at every step — from product request to delivery."
        primaryCta="Start Your Request"
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="The Process" title="Step by Step" centered />
          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-5 items-start"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center relative">
                    <step.icon className="w-5 h-5 text-primary-foreground" />
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[10px] font-bold">
                      {step.num}
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px h-6 bg-border mx-auto mt-2" />
                  )}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Preparation" title="What We Need From You" centered />
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="space-y-3">
                {needFromYou.map((item, i) => (
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
        title="Ready to get started?"
        description="Submit your product request and we'll begin the review process."
        ctaText="Start Your Request"
      />
    </>
  );
}