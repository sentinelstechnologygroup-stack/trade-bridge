import React from "react";
import PageHero from "../components/shared/PageHero";
import CtaSection from "../components/shared/CtaSection";
import { ShoppingCart, Briefcase, Home, Wrench, Car, Shirt, Building2, Star, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { icon: ShoppingCart, title: "Consumer Goods", desc: "General consumer products including electronics accessories, personal care items, and everyday essentials." },
  { icon: Home, title: "Household Products", desc: "Home goods, kitchen supplies, storage solutions, and general household essentials." },
  { icon: Briefcase, title: "Business & Office Supplies", desc: "Office equipment, stationery, business technology accessories, and professional supplies." },
  { icon: Wrench, title: "Tools & Hardware", desc: "Hand tools, power tool accessories, fasteners, and general hardware supplies." },
  { icon: Car, title: "Automotive Accessories", desc: "Vehicle accessories, maintenance products, and automotive supplies." },
  { icon: Shirt, title: "Apparel & Textiles", desc: "Clothing, fabrics, textiles, and fashion-related products." },
  { icon: Building2, title: "Commercial Supplies", desc: "Industrial and commercial supplies for business operations." },
  { icon: Star, title: "Special-Order Sourcing", desc: "Custom or specialty product requests reviewed on a case-by-case basis." },
];

const restricted = [
  "Food & Perishables",
  "Supplements & Vitamins",
  "Cosmetics & Beauty Products",
  "Medical Products & Devices",
  "Electronics with Batteries",
  "Chemicals & Hazardous Materials",
  "Regulated Goods",
  "High-Value Goods",
];

export default function ProductCategories() {
  return (
    <>
      <PageHero
        headline="Product Categories We Can Help Source"
        subheadline="We review each product request individually across a wide range of U.S. product categories."
        primaryCta="Check Product Feasibility"
        compact
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-md hover:border-accent/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <cat.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Restricted Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Restricted / Review Required</h3>
                  <p className="text-sm text-muted-foreground">Products that may require additional review before sourcing</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {restricted.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive/40 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All product requests are subject to supplier availability, export rules, destination import requirements, and logistics feasibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Have a specific product in mind?"
        description="Submit a request and we'll review feasibility."
        ctaText="Check Product Feasibility"
      />
    </>
  );
}