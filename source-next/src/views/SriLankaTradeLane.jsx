"use client";
import React from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CtaSection from "../components/shared/CtaSection";
import { MapPin, Globe, MessageSquare, Truck, Handshake, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  { icon: MapPin, title: "Houston-Based Sourcing", desc: "Direct access to U.S. suppliers through our Houston office." },
  { icon: Globe, title: "Sri Lankan Market Familiarity", desc: "Understanding of what Sri Lankan businesses need from U.S. supply channels." },
  { icon: MessageSquare, title: "Supplier-to-Buyer Communication", desc: "Clear, professional communication bridging language and business culture gaps." },
  { icon: Truck, title: "Freight Coordination", desc: "Working with logistics partners experienced in the U.S.–Sri Lanka route." },
  { icon: Handshake, title: "Long-Term Procurement Relationships", desc: "Building reliable, recurring sourcing channels for your business." },
];

const flowSteps = [
  { label: "U.S. Suppliers", color: "bg-accent" },
  { label: "Houston Office", color: "bg-primary" },
  { label: "Freight/Export Partner", color: "bg-primary" },
  { label: "Sri Lankan Buyer/Importer", color: "bg-accent" },
];

export default function SriLankaTradeLane() {
  return (
    <>
      <PageHero
        headline="Focused Trade Support Between the U.S. and Sri Lanka"
        subheadline="A dedicated trade lane with Houston-based sourcing, supplier coordination, and freight partner management for Sri Lankan businesses."
        primaryCta="Start a Sri Lanka Trade Request"
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why This Lane Matters"
            title="Reliable Access to U.S. Supply Channels"
            description="Many Sri Lankan businesses need reliable access to U.S. suppliers, better communication, order consolidation, and professional sourcing support. We built our company around this need."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Flow Graphic */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Trade Flow" title="How Products Move" centered />
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {flowSteps.map((step, i) => (
                <React.Fragment key={step.label}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`${step.color} text-white rounded-xl px-6 py-5 text-center flex-1 w-full md:w-auto`}
                  >
                    <span className="text-sm font-semibold">{step.label}</span>
                  </motion.div>
                  {i < flowSteps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 rotate-90 md:rotate-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Start your Sri Lanka trade request"
        description="Tell us what you need sourced from the U.S."
        ctaText="Start a Trade Request"
      />
    </>
  );
}