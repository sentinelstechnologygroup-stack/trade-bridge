import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PageHero({ headline, subheadline, primaryCta, primaryCtaLink, secondaryCta, secondaryCtaLink, compact = false }) {
  return (
    <section className={`relative overflow-hidden ${compact ? 'pt-28 pb-16' : 'pt-32 pb-20'} bg-primary text-primary-foreground`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={compact ? "max-w-3xl" : "max-w-4xl"}
        >
          <h1 className={`font-display font-bold leading-tight ${compact ? 'text-3xl md:text-4xl' : 'text-3xl md:text-5xl lg:text-6xl'}`}>
            {headline}
          </h1>
          {subheadline && (
            <p className={`mt-5 text-primary-foreground/70 leading-relaxed ${compact ? 'text-base md:text-lg max-w-2xl' : 'text-lg md:text-xl max-w-3xl'}`}>
              {subheadline}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-4 mt-8">
              {primaryCta && (
                <Link to={primaryCtaLink || "/request-quote"}>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6 h-12 text-sm gap-2">
                    {primaryCta} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              {secondaryCta && (
                <Link to={secondaryCtaLink || "/how-it-works"}>
                  <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-medium px-6 h-12 text-sm">
                    {secondaryCta}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}