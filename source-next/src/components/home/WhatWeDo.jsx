"use client";
import React from "react";
import SectionHeading from "../shared/SectionHeading";
import { Search, MessageSquare, Package, FileText } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Search,
    title: "Product Sourcing",
    desc: "We help buyers identify and source U.S. products across multiple suppliers and categories.",
  },
  {
    icon: MessageSquare,
    title: "Supplier Coordination",
    desc: "We communicate directly with U.S. suppliers on your behalf to manage pricing, availability, and order details.",
  },
  {
    icon: Package,
    title: "Order Consolidation",
    desc: "We organize multi-supplier orders and consolidate product and shipping information for efficient coordination.",
  },
  {
    icon: FileText,
    title: "Export Coordination",
    desc: "We work with freight forwarders and logistics partners to coordinate approved shipments from the U.S.",
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What We Do"
          title="Bridging U.S. Suppliers and Sri Lankan Buyers"
          description="We help businesses source U.S. products, coordinate with multiple suppliers, prepare product and order details, and work with freight partners for export coordination."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <s.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}