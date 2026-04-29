import React from "react";
import { FileText, Building, Package } from "lucide-react";

export default function QuotePreview({ quote }) {
  const {
    clientName = "Lanka Heavy Equip Ltd",
    clientCountry = "Sri Lanka",
    productName = "Industrial Air Compressors",
    productQty = 10,
    productCost = 8500,
    sourcingFee = 1275,
    handlingFee = 350,
    docFee = 200,
    freightEstimate = 1200,
    insuranceEstimate = 180,
    quoteNumber = "QT-0041",
    quoteDate = "April 28, 2026",
    validUntil = "May 28, 2026",
    paymentTerms = "Sourcing review fee due before research begins. Product cost due upfront. Freight deposit due before shipment coordination. Final balance due before shipment release.",
  } = quote || {};

  const subtotal = productCost + sourcingFee + handlingFee + docFee + freightEstimate + insuranceEstimate;

  const lineItems = [
    { label: "Product / Order: " + productName, desc: `Quantity: ${productQty} units`, amount: productCost },
    { label: "Sourcing & Coordination Service Fee", desc: "Includes supplier engagement, order management, and coordination", amount: sourcingFee },
    handlingFee > 0 && { label: "Handling / Consolidation", desc: "Order consolidation and preparation", amount: handlingFee },
    docFee > 0 && { label: "Documentation / Admin Fee", desc: "Export documentation support", amount: docFee },
    freightEstimate > 0 && { label: "Estimated Freight / Logistics", desc: "Pass-through estimate — subject to final freight quote", amount: freightEstimate },
    insuranceEstimate > 0 && { label: "Cargo Insurance Estimate", desc: "Subject to carrier confirmation", amount: insuranceEstimate },
  ].filter(Boolean);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Quote Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-7 py-6 border-b border-slate-700">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
              <span className="text-slate-950 font-bold text-sm">TC</span>
            </div>
            <div>
              <div className="font-bold text-white text-lg leading-tight">TradeConnect</div>
              <div className="text-xs text-slate-400 tracking-widest uppercase">Houston · Sri Lanka</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Trade Estimate</div>
            <div className="font-mono text-white font-bold text-lg">{quoteNumber}</div>
            <div className="text-xs text-slate-400 mt-1">Issued: {quoteDate}</div>
            <div className="text-xs text-slate-400">Valid until: {validUntil}</div>
          </div>
        </div>
      </div>

      {/* Client + Product */}
      <div className="grid sm:grid-cols-2 gap-px bg-slate-700">
        <div className="bg-slate-900 px-7 py-5">
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prepared For</span>
          </div>
          <div className="text-white font-semibold">{clientName}</div>
          <div className="text-sm text-slate-400">{clientCountry}</div>
        </div>
        <div className="bg-slate-900 px-7 py-5">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Order Summary</span>
          </div>
          <div className="text-white font-semibold">{productName}</div>
          <div className="text-sm text-slate-400">Qty: {productQty} units · Trade Direction: US → Sri Lanka</div>
        </div>
      </div>

      {/* Line Items */}
      <div className="px-7 py-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <th className="text-left pb-3">Description</th>
              <th className="text-right pb-3">Amount (USD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {lineItems.map((item, i) => (
              <tr key={i}>
                <td className="py-3.5 pr-4">
                  <div className="font-medium text-white text-xs">{item.label}</div>
                  {item.desc && <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>}
                </td>
                <td className="py-3.5 text-right font-semibold text-white whitespace-nowrap">
                  ${Number(item.amount).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-amber-500/30">
              <td className="pt-4 font-bold text-white">Total Estimated Quote</td>
              <td className="pt-4 text-right font-bold text-amber-400 text-lg">${subtotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Exclusions */}
      <div className="mx-7 mb-5 p-4 bg-slate-800/60 rounded-xl border border-slate-700">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Exclusions</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          This estimate excludes: destination duties, destination taxes, import permits, customs clearance fees, storage/demurrage, and any charges not listed above.
          Destination duties, taxes, permits, and customs clearance are the responsibility of the buyer/importer unless otherwise agreed in writing.
        </p>
      </div>

      {/* Payment Terms */}
      <div className="mx-7 mb-5 p-4 bg-slate-800/60 rounded-xl border border-slate-700">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Payment Terms</div>
        <p className="text-xs text-slate-500 leading-relaxed">{paymentTerms}</p>
        <p className="text-xs text-slate-600 mt-2">No product will be purchased until funds have cleared. All estimates are subject to supplier availability, freight confirmation, and final agreement terms.</p>
      </div>

      {/* Footer Note */}
      <div className="px-7 pb-6">
        <p className="text-xs text-slate-600 italic text-center">
          This is an estimated trade quote — not a guaranteed price, delivery commitment, or compliance determination.
          Subject to supplier availability, export eligibility, and destination import requirements.
        </p>
      </div>
    </div>
  );
}