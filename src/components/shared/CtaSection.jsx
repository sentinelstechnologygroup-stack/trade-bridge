import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CtaSection({ title, description, ctaText, ctaLink }) {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">{description}</p>
        )}
        <div className="mt-8">
          <Link to={ctaLink || "/request-quote"}>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 gap-2">
              {ctaText || "Request a Sourcing Quote"} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}