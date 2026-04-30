"use client";
import React, { useState } from "react";
import { AlertTriangle, Info } from "lucide-react";
import PricingTierCard from "./PricingTierCard";

const DEFAULT = {
  productName: "Industrial Air Compressors",
  direction: "US→LK",
  category: "Tools & Hardware",
  supplierCount: 1,
  unitCost: 850,
  quantity: 10,
  estimatedResale: 18000,
  sourcingReviewFee: 250,
  sourcingPct: 15,
  minServiceFee: 350,
  complexityFee: 0,
  handlingFee: 350,
  docAdminFee: 200,
  freightEstimate: 1200,
  insuranceEstimate: 180,
  riskBuffer: 5,
  dutiesPlaceholder: 640,
  buyerResponsibleForDuties: true,
};

const CATEGORIES = [
  "Consumer Goods", "Tools & Hardware", "Medical / Health", "Electronics",
  "Food & Supplements", "Apparel & Textiles", "Industrial Equipment",
  "Agricultural Products", "Chemicals", "Other",
];

function Warning({ text }) {
  return (
    <div className="flex items-start gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
      <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
      <span className="text-xs text-yellow-300">{text}</span>
    </div>
  );
}

function NumField({ label, value, onChange, prefix = "$", note, small }) {
  return (
    <div>
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-slate-800 border border-slate-700 rounded-lg ${prefix ? "pl-6" : "pl-3"} pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500`}
        />
      </div>
      {note && <div className="text-xs text-slate-600 mt-1">{note}</div>}
    </div>
  );
}

export default function PricingCalculator() {
  const [d, setD] = useState(DEFAULT);
  const upd = (k, v) => setD((p) => ({ ...p, [k]: v }));

  const productCost = d.unitCost * d.quantity;
  const calcSourcingPct = productCost * (d.sourcingPct / 100);
  const sourcingFee = Math.max(calcSourcingPct, Number(d.minServiceFee));
  const usingMinimum = calcSourcingPct < Number(d.minServiceFee);
  const riskBufferAmt = (productCost + sourcingFee) * (d.riskBuffer / 100);
  const totalServiceRevenue = sourcingFee + Number(d.complexityFee) + Number(d.handlingFee) + Number(d.docAdminFee) + Number(d.sourcingReviewFee);
  const totalQuote = Number(d.sourcingReviewFee) + productCost + sourcingFee + Number(d.complexityFee) + Number(d.handlingFee) + Number(d.docAdminFee) + Number(d.freightEstimate) + Number(d.insuranceEstimate) + riskBufferAmt;
  const grossMargin = totalServiceRevenue;
  const marginPct = totalQuote > 0 ? ((grossMargin / totalQuote) * 100).toFixed(1) : "0.0";
  const marginConfidence = Number(d.freightEstimate) === 0 ? "Low — freight missing" : marginPct > 20 ? "Moderate–High" : "Low";

  const warnings = [];
  if (!d.freightEstimate || Number(d.freightEstimate) === 0) warnings.push("Freight/logistics estimate is missing. Margin confidence is low.");
  if (!d.buyerResponsibleForDuties) warnings.push("Duties/taxes not confirmed as buyer responsibility. Verify before quoting.");
  if (d.dutiesPlaceholder === 0) warnings.push("Destination duties/taxes are unknown. Show as buyer/importer responsibility.");
  if (usingMinimum) warnings.push(`Percentage fee ($${calcSourcingPct.toFixed(0)}) is below minimum ($${d.minServiceFee}). Minimum fee applies.`);
  if (productCost < 500 && totalServiceRevenue > productCost * 0.3) warnings.push("Low product value relative to sourcing workload. Consider flat minimum fee structure.");

  const suggestedTier = d.supplierCount > 2
    ? "complex"
    : ["Medical / Health", "Electronics", "Food & Supplements", "Chemicals"].includes(d.category)
    ? "restricted"
    : productCost < 1000
    ? "basic"
    : "standard";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-white text-sm">Pricing Calculator</h2>
        <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">Internal Use Only</span>
      </div>

      {/* Suggested Tier */}
      <PricingTierCard suggested={suggestedTier} />

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          {warnings.map((w, i) => <Warning key={i} text={w} />)}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-5">
          {/* Product Info */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Product & Order Info</h3>
            <div className="space-y-1">
              <div className="text-xs text-slate-400">Product Name</div>
              <input
                value={d.productName}
                onChange={(e) => upd("productName", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="text-xs text-slate-400">Trade Direction</div>
                <select value={d.direction} onChange={(e) => upd("direction", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
                  <option>US→LK</option>
                  <option>LK→US</option>
                </select>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400">Product Category</div>
                <select value={d.category} onChange={(e) => upd("category", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <NumField label="Unit Cost (USD)" value={d.unitCost} onChange={(v) => upd("unitCost", v)} />
              <NumField label="Quantity" value={d.quantity} onChange={(v) => upd("quantity", v)} prefix="" />
              <NumField label="Supplier Count" value={d.supplierCount} onChange={(v) => upd("supplierCount", v)} prefix="" />
              <NumField label="Est. Resale Value (if known)" value={d.estimatedResale} onChange={(v) => upd("estimatedResale", v)} note="Optional — for margin reference" />
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-700">
              <span className="text-slate-400">Total Product Cost</span>
              <span className="font-bold text-amber-400">${productCost.toLocaleString()}</span>
            </div>
          </div>

          {/* Service Fees */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Service Fees</h3>
            <NumField label="Initial Sourcing Review Fee" value={d.sourcingReviewFee} onChange={(v) => upd("sourcingReviewFee", v)} note="Due before research begins" />
            <div className="grid grid-cols-2 gap-3">
              <NumField label="Sourcing/Coord. %" value={d.sourcingPct} onChange={(v) => upd("sourcingPct", v)} prefix="%" note={`Standard: 15% / Complex: 18–25%`} />
              <NumField label="Minimum Service Fee" value={d.minServiceFee} onChange={(v) => upd("minServiceFee", v)} note="Greater of % fee or minimum" />
            </div>
            {usingMinimum && (
              <div className="flex items-center gap-2 text-xs text-amber-400">
                <Info className="w-3.5 h-3.5" />
                Minimum fee applies (${Number(d.minServiceFee).toLocaleString()} &gt; ${calcSourcingPct.toFixed(0)})
              </div>
            )}
            <NumField label="Multi-Supplier Complexity Fee" value={d.complexityFee} onChange={(v) => upd("complexityFee", v)} note="Add if 2+ suppliers / high coordination" />
            <NumField label="Handling / Consolidation Fee" value={d.handlingFee} onChange={(v) => upd("handlingFee", v)} />
            <NumField label="Documentation / Admin Fee" value={d.docAdminFee} onChange={(v) => upd("docAdminFee", v)} />
          </div>

          {/* Logistics */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Logistics & Risk</h3>
            <NumField label="Freight / Logistics Estimate" value={d.freightEstimate} onChange={(v) => upd("freightEstimate", v)} note="Pass-through — pending final freight quote" />
            <NumField label="Insurance Estimate" value={d.insuranceEstimate} onChange={(v) => upd("insuranceEstimate", v)} />
            <NumField label="Risk Buffer %" value={d.riskBuffer} onChange={(v) => upd("riskBuffer", v)} prefix="%" note="Applied to product cost + service fee" />
            <NumField label="Destination Duties/Taxes (placeholder)" value={d.dutiesPlaceholder} onChange={(v) => upd("dutiesPlaceholder", v)} note="Typically buyer/importer responsibility" />
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => upd("buyerResponsibleForDuties", !d.buyerResponsibleForDuties)}
                className={`w-9 h-5 rounded-full transition-colors relative ${d.buyerResponsibleForDuties ? "bg-amber-500" : "bg-slate-600"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${d.buyerResponsibleForDuties ? "left-4" : "left-0.5"}`} />
              </button>
              <span className="text-xs text-slate-300">Buyer/importer responsible for duties & taxes</span>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="space-y-4">
          {/* Quote Totals */}
          <div className="bg-slate-900 rounded-xl border border-amber-500/20 p-5">
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-4">Total Client Quote (Estimated)</h3>
            <div className="space-y-2 text-sm">
              {[
                ["Sourcing Review Fee", Number(d.sourcingReviewFee)],
                ["Product Cost", productCost],
                [`Sourcing/Coord. Fee${usingMinimum ? " (min. applied)" : ""}`, sourcingFee],
                Number(d.complexityFee) > 0 && ["Complexity Fee", Number(d.complexityFee)],
                Number(d.handlingFee) > 0 && ["Handling / Consolidation", Number(d.handlingFee)],
                Number(d.docAdminFee) > 0 && ["Documentation / Admin", Number(d.docAdminFee)],
                Number(d.freightEstimate) > 0 && ["Est. Freight (pass-through)", Number(d.freightEstimate)],
                Number(d.insuranceEstimate) > 0 && ["Est. Insurance", Number(d.insuranceEstimate)],
                riskBufferAmt > 0 && [`Risk Buffer (${d.riskBuffer}%)`, riskBufferAmt],
              ].filter(Boolean).map(([label, val]) => (
                <div key={label} className="flex justify-between text-slate-400">
                  <span className="text-xs">{label}</span>
                  <span className="text-slate-300">${Number(val).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              ))}
              <div className="border-t border-slate-700 pt-3 flex justify-between font-bold text-white">
                <span>Total Estimated Quote</span>
                <span className="text-amber-400 text-lg">${totalQuote.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
            {d.buyerResponsibleForDuties && (
              <div className="mt-3 text-xs text-slate-500 italic border-t border-slate-800 pt-3">
                Excludes: destination duties, taxes, permits, customs clearance, and storage/demurrage. Buyer/importer responsibility unless otherwise agreed in writing.
              </div>
            )}
          </div>

          {/* Internal Margin */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Internal Margin Estimate</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Gross Service Revenue</span>
                <span className="text-emerald-400">${grossMargin.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Margin % of Quote</span>
                <span className={`font-bold ${Number(marginPct) > 20 ? "text-emerald-400" : "text-yellow-400"}`}>{marginPct}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Margin Confidence</span>
                <span className={`text-xs ${marginConfidence.includes("Low") ? "text-red-400" : "text-emerald-400"}`}>{marginConfidence}</span>
              </div>
              {d.estimatedResale > 0 && (
                <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-2">
                  <span>Buyer Est. Resale Margin</span>
                  <span className="text-slate-300">${(Number(d.estimatedResale) - totalQuote).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Internal estimate only. Actual margin depends on confirmed freight, supplier invoices, duties, and final agreement terms.
            </p>
          </div>

          {/* Payment Terms */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Default Payment Schedule</h3>
            <ul className="space-y-2">
              {[
                "Sourcing review fee due before research begins",
                "Product cost due upfront before purchasing",
                "Freight/logistics deposit due before shipment coordination",
                "Final balance due before shipment release",
                "New international clients may require full prepayment",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="text-amber-500 mt-0.5 shrink-0">•</span> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Warnings Panel */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Active Warnings</h3>
            {warnings.length === 0 ? (
              <p className="text-xs text-emerald-400">No active warnings. Quote looks complete.</p>
            ) : (
              <div className="space-y-2">
                {warnings.map((w, i) => <Warning key={i} text={w} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}