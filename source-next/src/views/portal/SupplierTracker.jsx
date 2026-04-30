"use client";
import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const SUPPLIERS = [
  { id: 1, request: "PR-0041", product: "Industrial Air Compressors", supplier: "Ingersoll Rand Distributors (TX)", contact: "sales@ingersolltx.com", contactStatus: "Responded", unitPrice: "$1,420", moq: "5 units", leadTime: "14 days", availability: "In Stock", quoteReceived: true, notes: "Confirmed FOB Houston. Lead time 14 days." },
  { id: 2, request: "PR-0041", product: "Industrial Air Compressors", supplier: "Atlas Copco US (Houston)", contact: "info@atlascopco-hou.com", contactStatus: "Awaiting Response", unitPrice: "—", moq: "—", leadTime: "—", availability: "Unknown", quoteReceived: false, notes: "Contacted 2026-04-26. No response yet." },
  { id: 3, request: "PR-0040", product: "Surgical Gloves (Latex-Free)", supplier: "MedLine Industries (IL)", contact: "intl@medline.com", contactStatus: "Responded", unitPrice: "$0.17/unit", moq: "10,000 units", leadTime: "7 days", availability: "High Stock", quoteReceived: true, notes: "FDA compliant. SLS cert documentation available on request." },
  { id: 4, request: "PR-0038", product: "Power Tools (Dewalt Bundle)", supplier: "Home Depot Pro (TX)", contact: "pro@homedepot.com", contactStatus: "Not Contacted", unitPrice: "—", moq: "—", leadTime: "—", availability: "—", quoteReceived: false, notes: "" },
];

const contactStatusColor = {
  "Responded": "text-emerald-400",
  "Awaiting Response": "text-yellow-400",
  "Not Contacted": "text-slate-500",
};

export default function SupplierTracker() {
  const [notes, setNotes] = useState({});

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Supplier Sourcing Tracker</h1>
        <p className="text-slate-400 mt-1 text-sm">Track U.S. supplier outreach, pricing, availability, and quote status.</p>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="px-5 py-3 text-left">Request</th>
                <th className="px-5 py-3 text-left">Supplier</th>
                <th className="px-5 py-3 text-left">Contact</th>
                <th className="px-5 py-3 text-left">Contact Status</th>
                <th className="px-5 py-3 text-left">Unit Price</th>
                <th className="px-5 py-3 text-left">MOQ</th>
                <th className="px-5 py-3 text-left">Lead Time</th>
                <th className="px-5 py-3 text-left">Availability</th>
                <th className="px-5 py-3 text-left">Quote</th>
                <th className="px-5 py-3 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SUPPLIERS.map((s) => (
                <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors align-top">
                  <td className="px-5 py-4">
                    <div className="font-mono text-xs text-slate-400">{s.request}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.product}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-white font-medium">{s.supplier}</td>
                  <td className="px-5 py-4 text-xs text-slate-400">{s.contact}</td>
                  <td className={`px-5 py-4 text-xs font-semibold ${contactStatusColor[s.contactStatus]}`}>{s.contactStatus}</td>
                  <td className="px-5 py-4 text-sm text-amber-400 font-mono">{s.unitPrice}</td>
                  <td className="px-5 py-4 text-xs text-slate-300">{s.moq}</td>
                  <td className="px-5 py-4 text-xs text-slate-300">{s.leadTime}</td>
                  <td className="px-5 py-4 text-xs text-slate-300">{s.availability}</td>
                  <td className="px-5 py-4">
                    {s.quoteReceived
                      ? <span className="flex items-center gap-1 text-emerald-400 text-xs"><CheckCircle className="w-3.5 h-3.5" /> Yes</span>
                      : <span className="flex items-center gap-1 text-slate-500 text-xs"><XCircle className="w-3.5 h-3.5" /> No</span>}
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400 max-w-xs">
                    <input
                      value={notes[s.id] ?? s.notes}
                      onChange={(e) => setNotes((n) => ({ ...n, [s.id]: e.target.value }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <button className="px-5 py-2.5 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400">
          + Add Supplier Contact
        </button>
      </div>
    </div>
  );
}