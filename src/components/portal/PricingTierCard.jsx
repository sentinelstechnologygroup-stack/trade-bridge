import React from "react";
import { CheckCircle } from "lucide-react";

const TIERS = {
  basic: {
    name: "Basic Sourcing",
    desc: "Simple product request, one supplier, low complexity.",
    model: "$150–$250 minimum or 10%–12%",
    color: "border-blue-500/30 bg-blue-500/5",
    badge: "bg-blue-500/15 text-blue-400",
    label: "Basic",
  },
  standard: {
    name: "Standard Sourcing + Export Coordination",
    desc: "Normal sourcing/export request with standard documentation.",
    model: "$250–$500 minimum or 15%",
    color: "border-amber-500/30 bg-amber-500/5",
    badge: "bg-amber-500/15 text-amber-400",
    label: "Standard",
  },
  complex: {
    name: "Complex / Multi-Supplier Sourcing",
    desc: "Multiple vendors, product substitutions, consolidation, higher communication burden.",
    model: "$500–$1,000 minimum or 18%–25%",
    color: "border-orange-500/30 bg-orange-500/5",
    badge: "bg-orange-500/15 text-orange-400",
    label: "Complex",
  },
  restricted: {
    name: "Restricted / High-Risk Product Review",
    desc: "Food, supplements, cosmetics, electronics with batteries, chemicals, medical-adjacent or regulated goods.",
    model: "Quoted separately — typically $500–$1,500 review fee + separate sourcing/export fee",
    color: "border-red-500/30 bg-red-500/5",
    badge: "bg-red-500/15 text-red-400",
    label: "Restricted",
  },
};

export default function PricingTierCard({ suggested = "standard" }) {
  const tier = TIERS[suggested];
  if (!tier) return null;

  return (
    <div className={`rounded-xl border p-5 ${tier.color}`}>
      <div className="flex items-center gap-3 mb-3">
        <CheckCircle className="w-4 h-4 text-current opacity-70 shrink-0" />
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-white">{tier.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tier.badge}`}>
              Recommended Tier
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{tier.desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500">Typical pricing model:</span>
        <span className="text-xs font-semibold text-white">{tier.model}</span>
      </div>
      <p className="text-xs text-slate-600 mt-2">Pricing is quote-based and subject to final confirmation. Not a guaranteed price.</p>
    </div>
  );
}