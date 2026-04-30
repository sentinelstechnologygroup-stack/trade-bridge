"use client";
import React from "react";
import { AlertTriangle, Settings, Truck, DollarSign, ShieldAlert, Info, ArrowRight } from "lucide-react";
import Link from "next/link";

const NOGO_CATEGORIES = [
  "Lithium batteries (unregulated)", "Firearms & ammunition", "Controlled substances",
  "Counterfeit goods", "Unapproved pharmaceuticals", "Radioactive materials",
];
const HUMAN_REVIEW_CATEGORIES = [
  "Medical devices & supplies", "Food & supplements", "Chemicals",
  "Electronics with battery", "Textiles (high-value)", "Agricultural products",
  "Cosmetics & personal care", "Medical-adjacent products",
];
const FREIGHT_PARTNERS = [
  "Maersk Line", "MSC (Mediterranean Shipping)", "DHL Express Freight",
  "FedEx Trade Networks", "Flexport (pending)",
];

function SettingsSection({ icon: SectionIcon, title, children }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-800">
        <SectionIcon className="w-4 h-4 text-amber-400" />
        <h2 className="font-semibold text-white text-sm">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function CategoryBadge({ text, color }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${color}`}>{text}</span>
  );
}

function EditableNumber({ label, value, onChange, prefix = "$", note }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
      <div>
        <div className="text-sm text-slate-300">{label}</div>
        {note && <div className="text-xs text-slate-600 mt-0.5">{note}</div>}
      </div>
      <div className="relative w-32">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">{prefix}</span>}
        <input
          type="text"
          defaultValue={value}
          className={`w-full bg-slate-800 border border-slate-700 rounded-lg ${prefix ? "pl-6" : "pl-3"} pr-3 py-1.5 text-sm text-amber-400 font-mono text-right focus:outline-none focus:border-amber-500`}
        />
      </div>
    </div>
  );
}

export default function PortalSettings() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings & Pricing Rules</h1>
        <p className="text-slate-400 mt-1 text-sm">Default configuration for the pricing calculator and feasibility workflow.</p>
        <div className="mt-3 mb-1 flex items-center gap-3">
        <Link href="/portal/risk-rules" className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 hover:text-white transition-colors">
          <ShieldAlert className="w-4 h-4 text-red-400" /> View Product Risk Rules <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg w-fit">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-amber-400">Placeholder UI — pricing rules will be enforced by the production backend rule engine.</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Default Pricing Fees */}
        <SettingsSection icon={DollarSign} title="Default Service Fees">
          <div className="space-y-3 text-sm">
            <EditableNumber label="Sourcing Review Fee" value="250" note="Due before research begins" />
            <EditableNumber label="Standard Sourcing Fee %" value="15" prefix="%" note="Applied to product cost" />
            <EditableNumber label="Standard Minimum Service Fee" value="350" note="Greater of % or minimum" />
            <EditableNumber label="Complex/Multi-Supplier Fee %" value="18–25" prefix="%" note="For 2+ suppliers or high complexity" />
            <EditableNumber label="Complex Minimum Fee" value="500" note="Multi-supplier minimum" />
            <EditableNumber label="Handling / Consolidation Fee" value="350" />
            <EditableNumber label="Documentation / Admin Fee" value="200" />
            <EditableNumber label="Default Risk Buffer %" value="5" prefix="%" note="Applied to product cost + service fee" />
          </div>
        </SettingsSection>

        {/* Restricted Review Fees */}
        <SettingsSection icon={ShieldAlert} title="Restricted Product Review Fees">
          <div className="space-y-3 text-sm">
            <div className="px-3 py-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
              <p className="text-xs text-red-400 leading-relaxed">Restricted/high-risk products require a separate review fee before any sourcing or export work begins. This fee is in addition to the standard sourcing fee.</p>
            </div>
            <EditableNumber label="Restricted Review Fee (min)" value="500" note="Applies to regulated product categories" />
            <EditableNumber label="Restricted Review Fee (max)" value="1500" note="Higher for complex regulatory review" />
            <div className="border-b border-slate-800 pb-3">
              <div className="text-sm text-slate-300 mb-2">Review fee trigger categories</div>
              <div className="flex flex-wrap gap-1.5">
                {["Food / Supplements", "Cosmetics", "Medical devices", "Chemicals", "Electronics w/ battery", "Agricultural"].map((c) => (
                  <span key={c} className="text-xs px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">{c}</span>
                ))}
              </div>
            </div>
            <EditableNumber label="Basic Sourcing Min. Fee" value="150" note="Simple, single supplier, low complexity" />
            <EditableNumber label="Basic Sourcing Max. Fee" value="250" note="Or 10–12% of product cost" />
          </div>
        </SettingsSection>

        {/* Risk Thresholds */}
        <SettingsSection icon={AlertTriangle} title="Risk & Feasibility Thresholds">
          <div className="space-y-3 text-sm">
            <EditableNumber label="Auto-Flag Regulatory Risk Threshold" value="Medium" prefix="" note="At this level or above, flag for human review" />
            <EditableNumber label="Auto No-Go Confidence Threshold" value="< 60" prefix="%" note="Below this, auto-recommend No-Go" />
            <EditableNumber label="Human Review Required: Margin Threshold" value="< 20" prefix="%" note="Flag if estimated margin is below this" />
            <EditableNumber label="Low Value / High Labor Warning" value="500" note="Warn if product cost is below this" />
            <EditableNumber label="Maximum Acceptable Shipping Risk" value="Medium" prefix="" />
          </div>
          <div className="mt-4 flex items-start gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-400">AI-assisted feasibility recommendations require human review before any Go/Caution/No-Go decision is finalized.</p>
          </div>
        </SettingsSection>

        {/* No-Go Product Categories */}
        <SettingsSection icon={ShieldAlert} title="No-Go Product Categories">
          <div className="flex flex-wrap gap-2 mb-4">
            {NOGO_CATEGORIES.map((c) => (
              <CategoryBadge key={c} text={c} color="bg-red-500/10 text-red-400 border-red-500/20" />
            ))}
          </div>
          <button className="text-xs text-amber-400 hover:text-amber-300">+ Add Category</button>
        </SettingsSection>

        {/* Human Review Categories */}
        <SettingsSection icon={Settings} title="Required Human Review Categories">
          <div className="flex flex-wrap gap-2 mb-4">
            {HUMAN_REVIEW_CATEGORIES.map((c) => (
              <CategoryBadge key={c} text={c} color="bg-yellow-500/10 text-yellow-400 border-yellow-500/20" />
            ))}
          </div>
          <button className="text-xs text-amber-400 hover:text-amber-300">+ Add Category</button>
        </SettingsSection>

        {/* Payment Terms Defaults */}
        <SettingsSection icon={DollarSign} title="Default Payment Terms">
          <div className="space-y-3">
            {[
              "Sourcing review fee due before research begins.",
              "Product cost due upfront before purchasing.",
              "Freight/logistics deposit due before shipment coordination.",
              "Final balance due before shipment release or final logistics booking.",
              "New international clients may require full prepayment.",
              "No product will be purchased until funds have cleared.",
            ].map((term, i) => (
              <div key={i} className="flex items-start gap-3 pb-2 border-b border-slate-800">
                <span className="text-amber-500 mt-0.5 text-sm shrink-0">{i + 1}.</span>
                <input
                  defaultValue={term}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            ))}
          </div>
        </SettingsSection>

        {/* Freight Partners */}
        <SettingsSection icon={Truck} title="Preferred Freight Partners">
          <div className="space-y-2 mb-4">
            {FREIGHT_PARTNERS.map((p, i) => (
              <div key={p} className="flex items-center justify-between text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-300">{p}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${i === 4 ? "bg-slate-700 text-slate-500" : "bg-emerald-500/10 text-emerald-400"}`}>
                  {i === 4 ? "Pending" : "Active"}
                </span>
              </div>
            ))}
          </div>
          <button className="text-xs text-amber-400 hover:text-amber-300">+ Add Partner</button>
        </SettingsSection>

        {/* Warning Guardrails Config */}
        <SettingsSection icon={AlertTriangle} title="Warning Guardrail Triggers">
          <div className="space-y-2">
            {[
              ["Low product value / high labor burden", "active"],
              ["Unknown duties/taxes", "active"],
              ["Missing freight estimate", "active"],
              ["Missing buyer IOR confirmation", "active"],
              ["Restricted product category", "active"],
              ["Missing permits", "active"],
              ["No confirmed buyer", "active"],
              ["Supplier MOQ too high", "active"],
              ["Low margin confidence", "active"],
              ["Battery/electronics review needed", "active"],
              ["Food/cosmetic/supplement review needed", "active"],
            ].map(([label, status]) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-xs text-slate-400">{label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">Enabled</span>
              </div>
            ))}
          </div>
        </SettingsSection>

      </div>

      <div className="mt-6 flex gap-3">
        <button className="px-5 py-2.5 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400">
          Save Settings (Placeholder)
        </button>
        <button className="px-5 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}