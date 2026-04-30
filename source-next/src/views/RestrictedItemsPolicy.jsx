"use client";
import React from "react";
import PageHero from "../components/shared/PageHero";
import { XCircle, ShieldAlert, AlertTriangle, Info } from "lucide-react";

const NO_GO = [
  "Firearms", "Ammunition", "Explosives", "Military equipment",
  "Illegal drugs", "THC / CBD / Nicotine / Vapes", "Alcohol",
  "Counterfeit goods", "Pirated media / software",
  "Products requiring false labeling or undervaluation",
  "Any transaction involving sanctioned parties",
];

const SPECIALIST = [
  "Medical devices", "Prescription products", "Chemicals",
  "Laboratory equipment", "Agricultural products", "Drones",
  "Thermal / night vision equipment", "Encryption / network security equipment",
  "Industrial machinery (export-controlled)", "Hazardous materials",
];

const CAUTION = [
  "Electronics", "Battery-powered products", "Auto accessories",
  "Branded goods", "Cosmetics", "Packaged food", "Dietary supplements",
  "Children's products", "Machinery", "High-value items", "Fragile items",
];

function CategoryBlock({ icon: Icon, color, bg, border, title, label, items, labelColor }) {
  return (
    <div className={`rounded-xl border ${border} ${bg} p-6 mb-6`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <h2 className={`font-bold text-base ${color}`}>{title}</h2>
      </div>
      <p className={`text-xs mb-4 font-medium ${labelColor}`}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className={`text-xs px-2.5 py-1 rounded-full border font-medium ${border} ${color} bg-background/30`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function RestrictedItemsPolicy() {
  return (
    <>
      <PageHero headline="Restricted Items Policy" subheadline="Not all products can be sourced or coordinated for export. Review our product category guidelines before submitting a request." compact />
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <CategoryBlock
            icon={XCircle}
            color="text-red-600"
            bg="bg-red-50"
            border="border-red-200"
            labelColor="text-red-700"
            title="No-Go — Not Accepted for Startup-Phase Sourcing"
            label="These items are not accepted for startup-phase sourcing or export coordination."
            items={NO_GO}
          />

          <CategoryBlock
            icon={ShieldAlert}
            color="text-orange-700"
            bg="bg-orange-50"
            border="border-orange-200"
            labelColor="text-orange-700"
            title="Specialist Review Required"
            label="These items may require expert review, documentation, licenses, permits, freight restrictions review, or customs/import confirmation before any quote or sourcing action."
            items={SPECIALIST}
          />

          <CategoryBlock
            icon={AlertTriangle}
            color="text-yellow-700"
            bg="bg-yellow-50"
            border="border-yellow-200"
            labelColor="text-yellow-700"
            title="Caution / Manual Review"
            label="These items may be reviewed case by case before quoting."
            items={CAUTION}
          />

          {/* Policy Disclaimer */}
          <div className="mt-8 flex items-start gap-3 px-5 py-4 bg-muted/50 border border-border rounded-xl">
            <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              This list is not exhaustive. Product approval depends on product type, end user, destination country requirements, shipping restrictions, supplier documentation, and applicable import and export regulations. Submitting a request does not guarantee that a quote or sourcing action will be initiated. All requests are reviewed individually.
            </p>
          </div>

          <div className="mt-6 p-5 bg-accent/5 border border-accent/20 rounded-xl">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Note:</strong> Product risk screening is an internal decision-support tool. It is not a legal, customs, tax, or compliance determination. For regulated products, we strongly recommend consulting a licensed customs broker, freight forwarder, or trade compliance professional before submitting a request.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}