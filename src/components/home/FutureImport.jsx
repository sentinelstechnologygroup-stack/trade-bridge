import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FutureImport() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Coming Soon
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Sri Lanka → U.S. Import & Distribution
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
              We are developing U.S. distribution opportunities for selected Sri Lankan products. Retailers, distributors, and Sri Lankan producers interested in U.S. market access may contact us for review.
            </p>
          </div>
          <Link to="/import-wholesale">
            <Button variant="outline" className="font-medium gap-2 shrink-0">
              Learn More <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}