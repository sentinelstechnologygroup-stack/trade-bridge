"use client";
import React from "react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CtaSection from "../components/shared/CtaSection";
import { FileText, Package, Truck, MessageSquare, Shield, ClipboardList, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: FileText, label: "Commercial invoice support" },
  { icon: ClipboardList, label: "Packing list support" },
  { icon: Truck, label: "Shipment coordination" },
  { icon: MessageSquare, label: "Freight partner communication" },
  { icon: Package, label: "Consolidation support" },
  { icon: Shield, label: "Cargo insurance coordination when available" },
  { icon: FileText, label: "Export documentation support where applicable" },
];

export default function ExportCoordination() {
  return (
    <>
      <PageHero
        headline="Export Coordination Through Trusted Logistics Partners"
        subheadline="We coordinate with freight forwarders and logistics providers for approved shipments, ensuring professional preparation and documentation."
        primaryCta="Discuss an Export Request"
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                label="Export Support"
                title="What We Coordinate"
                description="Our team works with licensed freight forwarders and logistics providers to support the export process for approved shipments."
              />
              <div className="space-y-4">
                {services.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <s.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-lg">Important Compliance Note</h3>
                </div>
                <div className="space-y-4 text-sm text-primary-foreground/70 leading-relaxed">
                  <p>
                    TradeConnect does not guarantee customs clearance. Destination import clearance, duties, taxes, and permits are the responsibility of the buyer/importer unless otherwise agreed in writing.
                  </p>
                  <p>
                    Freight forwarding, customs brokerage, and clearance services may be provided by licensed third-party partners where applicable.
                  </p>
                  <p>
                    Product export eligibility and import requirements vary by category, destination country, and regulatory environment.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Need export coordination support?"
        description="Discuss your shipment requirements with our team."
        ctaText="Discuss an Export Request"
      />
    </>
  );
}