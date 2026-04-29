import React from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CtaSection from "../components/shared/CtaSection";
import { MessageSquare, ClipboardList, Globe, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  { icon: MessageSquare, title: "Professional Buyer Communication", desc: "We handle buyer inquiries and communication, saving you time on international correspondence." },
  { icon: ClipboardList, title: "Organized Product Requests", desc: "Receive clear, structured product requests with quantities, specifications, and timeline details." },
  { icon: Globe, title: "Export-Aware Purchasing Process", desc: "Our process accounts for export logistics, helping ensure smoother order fulfillment." },
  { icon: TrendingUp, title: "Recurring International Demand", desc: "Access potential recurring orders from qualified Sri Lankan businesses and importers." },
  { icon: Users, title: "Single U.S.-Based Contact Point", desc: "Work with a Houston-based team — no need to manage international buyer communications directly." },
];

export default function ForUSSuppliers() {
  return (
    <>
      <PageHero
        headline="Connecting U.S. Suppliers With Qualified Sri Lankan Buyers"
        subheadline="We work with Sri Lankan buyers seeking U.S. products and help coordinate supplier communication and order details."
        primaryCta="Become a Supplier Partner"
        primaryCtaLink="/contact"
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Supplier Benefits"
            title="Why Partner With Us"
            description="We bring organized, qualified product requests from Sri Lankan businesses directly to your door."
            centered
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
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

      {/* Supplier Inquiry */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              label="Get Involved"
              title="Interested in Sri Lanka Market Opportunities?"
              description="U.S. suppliers interested in reaching qualified Sri Lankan buyers are welcome to contact our team. We'll discuss how we can bring your products to a growing international market."
              centered
            />
          </div>
        </div>
      </section>

      <CtaSection
        title="Join our supplier network"
        description="Contact us to discuss partnership opportunities."
        ctaText="Become a Supplier Partner"
        ctaLink="/contact"
      />
    </>
  );
}