"use client";
import React from "react";
import Link from "next/link";
import PageHero from "../components/shared/PageHero";
import CtaSection from "../components/shared/CtaSection";
import { Search, MessageSquare, Package, ClipboardList, Truck, FileText, Users, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Search, title: "U.S. Product Sourcing", desc: "We identify and source products from U.S. suppliers based on your specific requirements, brands, and specifications.", link: "/us-product-sourcing" },
  { icon: MessageSquare, title: "Supplier Communication", desc: "Direct engagement with U.S. suppliers on pricing, availability, minimum orders, and product specifications.", link: "/us-product-sourcing" },
  { icon: Package, title: "Multi-Supplier Order Coordination", desc: "Managing and organizing orders across multiple U.S. suppliers into a cohesive procurement workflow.", link: "/us-product-sourcing" },
  { icon: ClipboardList, title: "Product Request Review", desc: "Feasibility assessment of product requests including supplier availability and general sourcing considerations.", link: "/how-it-works" },
  { icon: Truck, title: "Export Logistics Coordination", desc: "We coordinate with freight forwarders and logistics partners to support approved shipments from the U.S.", link: "/export-coordination" },
  { icon: FileText, title: "Shipment Documentation Support", desc: "Support for commercial invoices, packing lists, and export documentation where applicable.", link: "/export-coordination" },
  { icon: Users, title: "Sri Lanka Buyer Support", desc: "Dedicated trade support for Sri Lankan businesses navigating U.S. sourcing and procurement.", link: "/for-sri-lanka-buyers" },
  { icon: ShoppingBag, title: "U.S. Import & Wholesale Distribution", desc: "Developing U.S. distribution channels for selected Sri Lankan products through wholesale and retail partnerships.", link: "/import-wholesale" },
];

export default function Services() {
  return (
    <>
      <PageHero
        headline="Our Trade Services"
        subheadline="Comprehensive sourcing, coordination, and export support services for the U.S.–Sri Lanka trade lane."
        primaryCta="Request a Sourcing Quote"
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link href={s.link} className="block h-full">
                  <div className="group bg-card rounded-xl border border-border p-6 h-full hover:shadow-lg hover:border-accent/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                      <s.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pricing Approach Note */}
          <div className="mt-12 bg-card rounded-xl border border-border p-8">
            <div className="max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">Pricing Approach</span>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">How Pricing Works</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Pricing is quote-based and depends on product type, supplier count, order size, sourcing complexity, documentation needs, and logistics requirements. Most projects include a sourcing review fee, a sourcing/coordination fee, and pass-through logistics costs. Destination duties, taxes, permits, and customs clearance are typically the responsibility of the buyer/importer unless otherwise agreed in writing.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Sourcing Review Fee", desc: "Due before research begins. Covers initial feasibility and supplier identification." },
                  { label: "Sourcing & Coordination Fee", desc: "Based on product cost, complexity, and supplier count. Final fee confirmed in your quote." },
                  { label: "Pass-Through Logistics", desc: "Freight and insurance estimates are passed through at cost. Final logistics quotes are confirmed before shipment." },
                  { label: "Buyer/Importer Responsibility", desc: "Destination duties, taxes, permits, and customs clearance are typically the buyer/importer's responsibility." },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/60 mt-6 italic border-t border-border pt-4">
                All pricing is quote-based and subject to supplier availability, export eligibility, and destination import requirements. Submitting a request does not guarantee a specific price, delivery date, or regulatory clearance.
              </p>
            </div>
          </div>

          <div className="mt-6 p-5 bg-muted/50 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed text-center">
              Services are subject to product availability, export eligibility, import requirements, and logistics feasibility. All requests are reviewed individually.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to get started?"
        description="Submit a sourcing request and we'll review your requirements."
        ctaText="Request a Sourcing Quote"
      />
    </>
  );
}