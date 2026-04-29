import React from "react";
import SectionHeading from "../shared/SectionHeading";
import { Shield, Globe, MessageCircle, ClipboardCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { icon: Shield, title: "U.S.-Based Sourcing Support", desc: "A physical Houston presence for direct supplier engagement and accountability." },
  { icon: Globe, title: "Sri Lankan Market Knowledge", desc: "Direct understanding of what Sri Lankan businesses need from U.S. supply channels." },
  { icon: MessageCircle, title: "Better Communication", desc: "Clear communication between suppliers and buyers, eliminating delays and confusion." },
  { icon: ClipboardCheck, title: "Professional Order Coordination", desc: "Organized product requests, multi-supplier coordination, and documentation support." },
  { icon: TrendingUp, title: "Scalable Trade Lane Support", desc: "Built to grow with your sourcing needs, from single requests to recurring procurement." },
];

export default function WhyWorkWithUs() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              label="Why Work With Us"
              title="A Trusted Bridge for U.S.–Sri Lanka Trade"
            />
            <div className="space-y-6">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <r.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{r.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-2xl p-8 text-primary-foreground"
          >
            <div className="space-y-8">
              <div>
                <span className="text-accent text-sm font-semibold uppercase tracking-wider">Our Commitment</span>
                <h3 className="font-display text-2xl font-bold mt-2">Transparency at Every Step</h3>
                <p className="text-primary-foreground/70 mt-3 text-sm leading-relaxed">
                  We believe in clear communication, honest assessments, and setting proper expectations. Not every product can be sourced or exported — and we'll tell you upfront.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Supplier Networks", value: "U.S.-Wide" },
                  { label: "Trade Focus", value: "US ↔ LK" },
                  { label: "Base", value: "Houston, TX" },
                  { label: "Support", value: "End-to-End" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className="text-accent font-bold text-lg">{stat.value}</span>
                    <span className="block text-xs text-primary-foreground/50 mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}