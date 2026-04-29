import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary text-primary-foreground">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      <div className="absolute top-0 right-0 w-2/5 h-full bg-gradient-to-l from-accent/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium text-accent tracking-wide">Houston, TX — Sri Lanka Trade Lane</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
              U.S. Product Sourcing & Export Coordination for{" "}
              <span className="text-accent">Sri Lankan Businesses</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-primary-foreground/70 leading-relaxed max-w-xl">
              A Houston-based trade partner helping Sri Lankan companies source products from U.S. suppliers and coordinate approved shipments through trusted logistics partners.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/request-quote">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-7 h-13 text-base gap-2 shadow-lg shadow-accent/20">
                  Request a Sourcing Quote <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-medium px-7 h-13 text-base">
                  How It Works
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right side — abstract visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-3xl" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
                {/* Trade Route Visualization */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold text-sm">US</span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-accent/40 via-accent/20 to-accent/40 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full animate-pulse" />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold text-sm">LK</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {["Sourcing", "Coordination", "Documentation", "Logistics"].map((item) => (
                      <div key={item} className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <div className="w-8 h-1 bg-accent/40 rounded mb-2" />
                        <span className="text-xs text-primary-foreground/60">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-primary-foreground/60">Trade Activity</span>
                      <span className="text-xs text-accent">Active</span>
                    </div>
                    <div className="flex gap-1 items-end h-12">
                      {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-accent/30 rounded-sm"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}