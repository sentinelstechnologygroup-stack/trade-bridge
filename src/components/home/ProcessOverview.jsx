import React from "react";
import SectionHeading from "../shared/SectionHeading";
import { ClipboardList, Search, FileCheck, PackageCheck, Ship } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { num: 1, icon: ClipboardList, title: "Submit Product Request", desc: "Provide product details, quantity, destination, and timeline." },
  { num: 2, icon: Search, title: "Supplier Review & Sourcing", desc: "We research suppliers and gather pricing and availability." },
  { num: 3, icon: FileCheck, title: "Quote & Order Approval", desc: "Review costs, fees, logistics assumptions, and approve the order." },
  { num: 4, icon: PackageCheck, title: "Consolidation & Export Coordination", desc: "Orders are organized and coordinated with freight partners." },
  { num: 5, icon: Ship, title: "Importer Receives Goods", desc: "Sri Lankan buyer/importer clears goods at destination." },
];

export default function ProcessOverview() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="U.S. → Sri Lanka"
          title="How the Process Works"
          description="A clear, professional workflow from product request to delivery."
          centered
        />
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-12 left-0 right-0 h-px bg-border hidden lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold z-20">
                  {step.num}
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}