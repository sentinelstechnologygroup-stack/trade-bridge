import React, { useState } from "react";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

const CHECKLIST = [
  // Payment & Pricing
  { id: "review_fee_paid", label: "Sourcing Review Fee Paid", category: "Payment", required: true },
  { id: "product_cost_paid", label: "Product Cost Paid", category: "Payment", required: true },
  { id: "service_fee_approved", label: "Service Fee Approved by Buyer", category: "Payment", required: true },
  { id: "freight_approved", label: "Freight Estimate Approved", category: "Payment", required: true },
  { id: "payment_terms_accepted", label: "Buyer Payment Terms Accepted", category: "Payment", required: true },
  { id: "final_balance_paid", label: "Final Balance Paid Before Shipment Release", category: "Payment", required: true },
  // Product & Buyer
  { id: "product_approved", label: "Product Approved", category: "Product", required: true },
  { id: "buyer_confirmed", label: "Buyer Confirmed", category: "Buyer", required: true },
  { id: "supplier_quote", label: "Supplier Invoice Received", category: "Supplier", required: true },
  // Compliance
  { id: "hs_code", label: "HS Code Confirmed", category: "Compliance", required: true },
  { id: "duties_confirmed", label: "Duties / Taxes Responsibility Confirmed", category: "Compliance", required: true },
  { id: "importer_of_record", label: "Importer of Record Confirmed", category: "Compliance", required: true },
  { id: "export_review", label: "Export Review Complete", category: "Compliance", required: true },
  { id: "dest_permits", label: "Destination Permits Confirmed (if applicable)", category: "Compliance", required: false },
  // Logistics & Documentation
  { id: "freight_quote", label: "Freight Quote Received", category: "Logistics", required: true },
  { id: "cargo_insurance", label: "Cargo Insurance Reviewed", category: "Logistics", required: false },
  { id: "packing_list", label: "Packing List Prepared", category: "Documentation", required: true },
  { id: "commercial_invoice", label: "Commercial Invoice Prepared", category: "Documentation", required: true },
];

const CATEGORIES = [...new Set(CHECKLIST.map((c) => c.category))];

const categoryStyles = {
  "Payment":       { card: "bg-emerald-500/5 border-emerald-500/20", label: "text-emerald-400" },
  "Product":       { card: "bg-blue-500/10 border-blue-500/20",      label: "text-blue-400" },
  "Buyer":         { card: "bg-violet-500/10 border-violet-500/20",  label: "text-violet-400" },
  "Supplier":      { card: "bg-amber-500/10 border-amber-500/20",    label: "text-amber-400" },
  "Compliance":    { card: "bg-red-500/10 border-red-500/20",        label: "text-red-400" },
  "Documentation": { card: "bg-teal-500/10 border-teal-500/20",      label: "text-teal-400" },
  "Logistics":     { card: "bg-sky-500/10 border-sky-500/20",        label: "text-sky-400" },
};

const INITIAL = {
  review_fee_paid: false,
  product_cost_paid: false,
  service_fee_approved: false,
  freight_approved: false,
  payment_terms_accepted: false,
  final_balance_paid: false,
  product_approved: true,
  buyer_confirmed: true,
  supplier_quote: false,
  hs_code: true,
  duties_confirmed: false,
  importer_of_record: true,
  export_review: false,
  dest_permits: false,
  freight_quote: false,
  cargo_insurance: false,
  packing_list: false,
  commercial_invoice: false,
};

export default function ShipmentReadiness() {
  const [checked, setChecked] = useState(INITIAL);

  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }));
  const total = CHECKLIST.length;
  const done = CHECKLIST.filter((c) => checked[c.id]).length;
  const pct = Math.round((done / total) * 100);
  const allRequired = CHECKLIST.filter((c) => c.required).every((c) => checked[c.id]);

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Shipment Readiness Checklist</h1>
        <p className="text-slate-400 mt-1 text-sm">PR-0041 — Industrial Air Compressors — Lanka Heavy Equip Ltd</p>
      </div>

      {/* Progress */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-white">{done} / {total} items complete</span>
          <span className={`text-sm font-bold ${allRequired ? "text-emerald-400" : "text-yellow-400"}`}>
            {allRequired ? "Ready for Shipment" : "Pending Required Items"}
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${allRequired ? "bg-emerald-500" : "bg-amber-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>{pct}% complete</span>
          <span>{CHECKLIST.filter((c) => c.required && !checked[c.id]).length} required items outstanding</span>
        </div>
      </div>

      {/* Grouped Checklist */}
      <div className="space-y-4">
        {CATEGORIES.map((cat) => {
          const items = CHECKLIST.filter((c) => c.category === cat);
          const catDone = items.filter((c) => checked[c.id]).length;
          const styles = categoryStyles[cat] || { card: "bg-slate-800 border-slate-700", label: "text-slate-400" };
          return (
            <div key={cat} className={`rounded-xl border p-5 ${styles.card}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xs font-semibold uppercase tracking-wider ${styles.label}`}>{cat}</h3>
                <span className="text-xs text-slate-500">{catDone}/{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.map((item) => {
                  const isChecked = !!checked[item.id];
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => toggle(item.id)}
                    >
                      <div className={`shrink-0 transition-colors ${isChecked ? "text-emerald-400" : "text-slate-600 group-hover:text-slate-400"}`}>
                        {isChecked ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </div>
                      <span className={`text-sm transition-colors flex-1 ${isChecked ? "text-slate-400 line-through" : "text-white"}`}>
                        {item.label}
                      </span>
                      {item.required && !isChecked && (
                        <span className="text-xs text-red-400 flex items-center gap-1 shrink-0">
                          <AlertCircle className="w-3 h-3" /> Required
                        </span>
                      )}
                      {!item.required && !isChecked && (
                        <span className="text-xs text-slate-600 shrink-0">Optional</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-4 flex-wrap">
        <button
          disabled={!allRequired}
          className="px-6 py-2.5 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Mark Shipment as Ready
        </button>
        <p className="text-xs text-slate-600">All required items must be checked before confirming shipment readiness. No product will be released until final payment is confirmed.</p>
      </div>
    </div>
  );
}