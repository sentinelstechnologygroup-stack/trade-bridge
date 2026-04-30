"use client";
import React from "react";
import Link from "next/link";
import SectionHeading from "../shared/SectionHeading";
import { ShoppingCart, Briefcase, Wrench, Home, Car, Shirt, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { icon: ShoppingCart, label: "Consumer Goods" },
  { icon: Briefcase, label: "Business Supplies" },
  { icon: Wrench, label: "Tools & Hardware" },
  { icon: Home, label: "Household Products" },
  { icon: Car, label: "Automotive Accessories" },
  { icon: Shirt, label: "Apparel & Textiles" },
  { icon: Star, label: "Special-Order Sourcing" },
];

export default function ProductCategoriesPreview() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Product Categories"
          title="What We Can Help Source"
          description="We review each product request individually across a wide range of U.S. product categories."
          centered
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-card rounded-xl border border-border p-5 flex items-center gap-3 hover:shadow-md hover:border-accent/20 transition-all cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                <cat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{cat.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/product-categories">
            <Button variant="outline" className="gap-2 font-medium">
              View All Categories <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}