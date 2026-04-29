import React from "react";
import SectionHeading from "../shared/SectionHeading";
import { Building2, Factory, ShoppingBag, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const audiences = [
  {
    icon: Building2,
    title: "Sri Lankan Businesses",
    desc: "Retailers, distributors, and commercial operators seeking reliable U.S. sourcing channels.",
  },
  {
    icon: Factory,
    title: "U.S. Suppliers",
    desc: "Manufacturers and distributors looking to reach qualified international buyers.",
  },
  {
    icon: ShoppingBag,
    title: "Wholesale Buyers",
    desc: "Businesses seeking bulk U.S. products for distribution in Sri Lanka and the region.",
  },
  {
    icon: Handshake,
    title: "Trade Partners",
    desc: "Freight forwarders, logistics providers, and trade consultants seeking collaboration.",
  },
];

export default function WhoWeHelp() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Who We Help"
          title="Serving Businesses on Both Sides of the Trade"
          centered
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-card rounded-xl border border-border p-8 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-5">
                <a.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}