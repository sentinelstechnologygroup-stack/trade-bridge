"use client";
import React, { useState } from "react";
import { CheckCircle, AlertTriangle, ShieldAlert, XCircle, Info, Lock } from "lucide-react";

const RISK_CATEGORIES = [
  {
    id: "green",
    label: "Green — Generally Acceptable",
    color: "emerald",
    icon: CheckCircle,
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    card: "bg-emerald-500/5 border-emerald-500/20",
    header: "text-emerald-400",
    disclaimer: "Still requires supplier, pricing, destination, and logistics review.",
    items: [
      "Basic household goods",
      "Office supplies",
      "Non-regulated apparel",
      "Basic tools without batteries",
      "Non-branded general merchandise",
      "Low-risk commercial supplies",
    ],
  },
  {
    id: "yellow",
    label: "Yellow — Caution / Manual Review",
    color: "yellow",
    icon: AlertTriangle,
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    card: "bg-yellow-500/5 border-yellow-500/20",
    header: "text-yellow-400",
    disclaimer: "Requires feasibility review before quoting.",
    items: [
      "Electronics",
      "Battery-powered products",
      "Auto accessories",
      "Branded goods",
      "Cosmetics",
      "Packaged food",
      "Supplements",
      "Children's products",
      "Machinery",
      "High-value items",
      "Fragile items",
    ],
  },
  {
    id: "red",
    label: "Red — Restricted / Specialist Review Required",
    color: "red",
    icon: ShieldAlert,
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    card: "bg-red-500/5 border-red-500/20",
    header: "text-red-400",
    disclaimer: "Do not proceed without expert verification.",
    items: [
      "Medical devices",
      "Prescription products",
      "Chemicals",
      "Lab equipment",
      "Agricultural products",
      "Drones",
      "Thermal / night vision equipment",
      "Encryption / network security equipment",
      "Industrial machinery",
      "Hazardous materials",
    ],
  },
  {
    id: "black",
    label: "Black — No-Go for Startup Phase",
    color: "slate",
    icon: XCircle,
    badge: "bg-slate-700 text-slate-300 border-slate-600",
    card: "bg-slate-800/60 border-slate-700",
    header: "text-slate-300",
    disclaimer: "Do not quote or proceed.",
    items: [
      "Firearms",
      "Ammunition",
      "Explosives",
      "Military equipment",
      "Illegal drugs",
      "THC / CBD / Nicotine / Vapes",
      "Alcohol",
      "Counterfeit goods",
      "Pirated media / software",
      "Products requiring false labeling or undervaluation",
      "Any transaction involving sanctioned parties",
    ],
  },
];

const WARNING_TRIGGERS = [
  { id: "restricted_category",   label: "Restricted product category",                    severity: "red" },
  { id: "battery_electronics",   label: "Battery / electronics review needed",              severity: "yellow" },
  { id: "food_cosmetic",         label: "Food / cosmetic / supplement review needed",       severity: "yellow" },
  { id: "medical_chemical_ag",   label: "Medical / chemical / agricultural review needed",  severity: "red" },
  { id: "branded_counterfeit",   label: "Branded / counterfeit-risk review needed",         severity: "yellow" },
  { id: "missing_ior",           label: "Missing importer-of-record confirmation",          severity: "red" },
  { id: "missing_permits",       label: "Missing permit confirmation",                      severity: "red" },
  { id: "unknown_duties",        label: "Unknown duties / taxes",                           severity: "yellow" },
  { id: "unknown_hs",            label: "Unknown HS code",                                  severity: "yellow" },
  { id: "buyer_red_flag",        label: "Buyer / end-use red flag",                         severity: "red" },
  { id: "sanctions_screening",   label: "Possible sanctions / end-user screening needed",   severity: "red" },
];

const SEVERITY_STYLES = {
  red:    "bg-red-500/10 text-red-400 border-red-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

function RiskCategoryCard({ cat }) {
  const [expanded, setExpanded] = useState(true);
  const Icon = cat.icon;
  return (
    <div className={`rounded-xl border ${cat.card} overflow-hidden`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${cat.header}`} />
          <span className={`font-semibold text-sm ${cat.header}`}>{cat.label}</span>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${cat.badge}`}>
          {cat.items.length} items
        </span>
      </button>
      {expanded && (
        <div className="px-6 pb-5">
          <div className="flex flex-wrap gap-2 mb-4">
            {cat.items.map((item) => (
              <span key={item} className={`text-xs px-2.5 py-1 rounded-full border ${cat.badge}`}>
                {item}
              </span>
            ))}
            <button className={`text-xs px-2.5 py-1 rounded-full border border-dashed opacity-50 hover:opacity-80 ${cat.badge}`}>
              + Add
            </button>
          </div>
          <div className={`flex items-start gap-2 px-3 py-2 rounded-lg bg-slate-900/50 border ${cat.card}`}>
            <Info className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${cat.header}`} />
            <p className={`text-xs leading-relaxed ${cat.header} opacity-80`}>{cat.disclaimer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductRiskRules() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Product Risk Rules</h1>
        <p className="text-slate-400 mt-1 text-sm">Internal decision-support configuration for product screening, feasibility routing, and No-Go enforcement.</p>
      </div>

      {/* Compliance Disclaimer */}
      <div className="mb-8 px-5 py-4 bg-amber-500/8 border border-amber-500/25 rounded-xl flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Compliance Disclaimer</div>
          <p className="text-xs text-amber-300/80 leading-relaxed">
            Product risk screening is an internal decision-support tool only. It is not a legal, customs, tax, or compliance determination.
            Final approval may require confirmation from a freight forwarder, customs broker, compliance professional, or legal advisor.
          </p>
        </div>
      </div>

      {/* Risk Category Cards */}
      <div className="space-y-4 mb-10">
        <h2 className="text-sm font-semibold text-white mb-3">Product Risk Categories</h2>
        {RISK_CATEGORIES.map((cat) => (
          <RiskCategoryCard key={cat.id} cat={cat} />
        ))}
      </div>

      {/* Warning Triggers */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8">
        <h2 className="font-semibold text-white text-sm mb-1">Warning Trigger Configuration</h2>
        <p className="text-xs text-slate-500 mb-5">These triggers surface as active warnings on Product Requests, Feasibility Review, Quote Builder, and Shipment Readiness screens.</p>
        <div className="space-y-2">
          {WARNING_TRIGGERS.map((w) => (
            <div key={w.id} className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${w.severity === "red" ? "bg-red-400" : "bg-yellow-400"}`} />
                <span className="text-sm text-slate-300">{w.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${SEVERITY_STYLES[w.severity]}`}>
                  {w.severity === "red" ? "Red Flag" : "Caution"}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Enabled</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No-Go Override Flow */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-4 h-4 text-red-400" />
          <h2 className="font-semibold text-white text-sm">No-Go Override Policy</h2>
        </div>
        <p className="text-xs text-slate-500 mb-5">When a product is classified as Black / No-Go, the following rules apply. Human override is disabled by default and requires senior approval.</p>
        <div className="space-y-3">
          {[
            ["Override Enabled by Default", "No — Disabled"],
            ["Senior Approval Required", "Yes — Required before override"],
            ["Override Reason Field", "Required"],
            ["Compliance Note Required", "Yes — Must be attached"],
            ["Audit Log Entry", "Auto-generated on override attempt"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">
              <span className="text-sm text-slate-400">{label}</span>
              <span className={`text-xs font-semibold ${value.startsWith("No") ? "text-red-400" : value.startsWith("Yes") ? "text-amber-400" : "text-slate-300"}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 px-4 py-3 bg-red-500/8 border border-red-500/20 rounded-lg">
          <p className="text-xs text-red-400/80 leading-relaxed">
            No-Go products must not be quoted, sourced, or shipped without documented senior approval, a written compliance note, and — where applicable — legal or customs advisor confirmation. Override audit entries are permanent.
          </p>
        </div>
      </div>
    </div>
  );
}