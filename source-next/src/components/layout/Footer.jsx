"use client";
import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Company: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Operations Portal", path: "/portal" },
  ],
  "Trade Services": [
    { label: "U.S. Product Sourcing", path: "/us-product-sourcing" },
    { label: "Export Coordination", path: "/export-coordination" },
    { label: "Sri Lanka Trade Lane", path: "/sri-lanka-trade-lane" },
    { label: "Product Categories", path: "/product-categories" },
    { label: "Restricted Items Policy", path: "/restricted-items" },
  ],
  Connect: [
    { label: "Request a Quote", path: "/request-quote" },
    { label: "Contact", path: "/contact" },
    { label: "FAQ", path: "/faq" },
    { label: "For Sri Lanka Buyers", path: "/for-sri-lanka-buyers" },
    { label: "For U.S. Suppliers", path: "/for-us-suppliers" },
  ],
  Legal: [
    { label: "Terms of Service", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Cookie Policy", path: "/cookies" },
    { label: "Accessibility", path: "/accessibility" },
    { label: "Trade Compliance", path: "/trade-compliance" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* CTA Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-semibold">
              Ready to source U.S. products?
            </h3>
            <p className="text-primary-foreground/70 mt-1">
              Start with a sourcing quote request today.
            </p>
          </div>
          <Link href="/request-quote">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6 gap-2">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">TC</span>
              </div>
              <span className="font-display font-semibold text-lg">TradeConnect</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm">
              Houston-based U.S. product sourcing, export coordination, and trade support for the Sri Lanka trade lane.
            </p>
            <div className="flex items-center gap-2 mt-6 text-sm text-primary-foreground/60">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Houston, Texas · Serving U.S. ↔ Sri Lanka trade</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-primary-foreground/40 leading-relaxed max-w-4xl">
            Product availability, export eligibility, import requirements, duties, taxes, permits, and customs clearance vary by product and destination. Freight forwarding, customs brokerage, and clearance services may be provided by licensed third-party partners where applicable. Submitting a request does not guarantee product availability, export eligibility, import approval, or final pricing.
          </p>
          <p className="text-xs text-primary-foreground/30 mt-4">
            © {new Date().getFullYear()} TradeConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}