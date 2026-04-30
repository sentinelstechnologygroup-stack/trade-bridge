"use client";
import React from "react";
import { MapPin, Globe, Users, Truck, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: MapPin, label: "Houston-Based Operations" },
  { icon: Globe, label: "Sri Lanka Market Knowledge" },
  { icon: Users, label: "Supplier Coordination" },
  { icon: Truck, label: "Freight Partner Coordination" },
  { icon: Briefcase, label: "B2B Trade Support" },
];

export default function TrustStrip() {
  return (
    <section className="py-8 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground leading-tight">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}