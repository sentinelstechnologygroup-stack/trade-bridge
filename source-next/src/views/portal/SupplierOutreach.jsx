"use client";
import React, { useState } from "react";
import { Mail, Phone, Globe, Plus, Calendar, Copy, Check } from "lucide-react";

const SUPPLIERS = [
  {
    id: "SUP-001", name: "Grainger Industrial Supply", contact: "Mark Holloway", email: "mark.holloway@grainger.com",
    phone: "+1 847-535-1000", website: "grainger.com", product: "Industrial Air Compressors",
    status: "Quote Received", lastContacted: "2026-04-25", nextFollowUp: "2026-04-30",
    quoteReceived: true, unitPrice: 1840.00, moq: 5, leadTime: "14–18 days",
    availability: "In Stock", notes: "Best price so far. Needs net-30 terms.",
  },
  {
    id: "SUP-002", name: "MSC Industrial Direct", contact: "Sandra Park", email: "spark@mscdirect.com",
    phone: "+1 800-645-7270", website: "mscdirect.com", product: "Industrial Air Compressors",
    status: "Follow-Up Needed", lastContacted: "2026-04-22", nextFollowUp: "2026-04-29",
    quoteReceived: false, unitPrice: null, moq: 10, leadTime: "21 days",
    availability: "Limited", notes: "Waiting on formal quote. High MOQ concern.",
  },
  {
    id: "SUP-003", name: "Northern Tool + Equipment", contact: "James Holt", email: "jholt@northerntool.com",
    phone: "+1 651-438-9000", website: "northerntool.com", product: "Industrial Air Compressors",
    status: "Contacted", lastContacted: "2026-04-26", nextFollowUp: "2026-05-02",
    quoteReceived: false, unitPrice: null, moq: null, leadTime: null,
    availability: "Unknown", notes: "Intro email sent. No response yet.",
  },
  {
    id: "SUP-004", name: "Harbor Freight Tools", contact: "—", email: "wholesale@harborfreight.com",
    phone: "+1 800-444-3353", website: "harborfreight.com", product: "Industrial Air Compressors",
    status: "Rejected", lastContacted: "2026-04-20", nextFollowUp: null,
    quoteReceived: false, unitPrice: null, moq: null, leadTime: null,
    availability: "N/A", notes: "Does not support international export orders.",
  },
  {
    id: "SUP-005", name: "Global Industrial Company", contact: "Rita Vance", email: "rita.vance@globalindustrial.com",
    phone: "+1 888-978-7759", website: "globalindustrial.com", product: "Industrial Air Compressors",
    status: "Selected Supplier", lastContacted: "2026-04-27", nextFollowUp: "2026-05-01",
    quoteReceived: true, unitPrice: 1795.00, moq: 3, leadTime: "10–14 days",
    availability: "In Stock", notes: "Confirmed export eligibility. Selected pending buyer approval.",
  },
];

const STATUS_STYLES = {
  "Not Contacted":     "bg-slate-700 text-slate-400 border-slate-600",
  "Contacted":         "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Follow-Up Needed":  "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Quote Received":    "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "Unavailable":       "bg-orange-500/15 text-orange-400 border-orange-500/30",
  "Rejected":          "bg-red-500/15 text-red-400 border-red-500/30",
  "Selected Supplier": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const EMAIL_TEMPLATES = [
  {
    name: "Initial Supplier Inquiry",
    subject: "Product Sourcing Inquiry — [Product Name] — Export Order",
    body: `Dear [Contact Name],

My name is [Your Name] from TradeConnect LLC. We are a U.S.-based trade coordination company currently sourcing [Product Name] on behalf of a buyer in Sri Lanka.

We are looking for:
- Quantity: [Qty] units
- Delivery timeline: [Timeline]
- Destination: Colombo, Sri Lanka (export via freight forwarder)

Could you please provide:
1. Unit pricing (FOB or EXW)
2. Minimum order quantity
3. Lead time
4. Export documentation support (commercial invoice, packing list)

We look forward to your response.

Best regards,
[Your Name]
TradeConnect LLC`,
  },
  {
    name: "Follow-Up Request",
    subject: "Follow-Up: Product Sourcing Inquiry — [Product Name]",
    body: `Dear [Contact Name],

I wanted to follow up on my previous inquiry dated [Date] regarding [Product Name] for an export order to Sri Lanka.

Could you provide an update on:
- Availability for [Qty] units
- Pricing and lead time

We are moving forward with our buyer's timeline and would appreciate a response at your earliest convenience.

Thank you,
[Your Name]
TradeConnect LLC`,
  },
  {
    name: "Quote Clarification",
    subject: "Quote Clarification Request — [Product Name] — PO [ID]",
    body: `Dear [Contact Name],

Thank you for providing the quote dated [Date] for [Product Name].

We have a few clarifying questions:
1. Does the quoted price include export documentation support?
2. What are the available payment terms?
3. Is the stated MOQ of [MOQ] negotiable for a trial order?
4. Can you confirm export eligibility for shipment to Sri Lanka?

Please advise at your earliest convenience.

Best regards,
[Your Name]`,
  },
  {
    name: "Availability Confirmation",
    subject: "Availability Confirmation Request — [Product Name]",
    body: `Dear [Contact Name],

We are preparing to finalize a purchase order for [Qty] units of [Product Name] and need to confirm current stock availability before proceeding.

Please confirm:
1. Current stock levels
2. Expected lead time for [Qty] units
3. Any upcoming stock constraints or backorder risk

We appreciate your prompt response.

Best regards,
[Your Name]
TradeConnect LLC`,
  },
];

export default function SupplierOutreach() {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [copied, setCopied] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All", ...Object.keys(STATUS_STYLES)];
  const filtered = statusFilter === "All" ? SUPPLIERS : SUPPLIERS.filter(s => s.status === statusFilter);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Supplier Outreach Tracker</h1>
        <p className="text-slate-400 mt-1 text-sm">PR-0041 — Industrial Air Compressors — Lanka Heavy Equip Ltd</p>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Suppliers", value: SUPPLIERS.length, color: "text-white" },
          { label: "Quotes Received", value: SUPPLIERS.filter(s => s.quoteReceived).length, color: "text-violet-400" },
          { label: "Follow-Up Needed", value: SUPPLIERS.filter(s => s.status === "Follow-Up Needed").length, color: "text-amber-400" },
          { label: "Selected", value: SUPPLIERS.filter(s => s.status === "Selected Supplier").length, color: "text-emerald-400" },
        ].map((c) => (
          <div key={c.label} className="bg-slate-900 rounded-xl border border-slate-800 p-4">
            <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
            <div className="text-xs text-slate-500 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filter + Add */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === s ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400">
          <Plus className="w-4 h-4" /> Add Supplier
        </button>
      </div>

      {/* Supplier Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="px-4 py-3 text-left">Supplier</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Quote</th>
                <th className="px-4 py-3 text-left">Unit Price</th>
                <th className="px-4 py-3 text-left">MOQ</th>
                <th className="px-4 py-3 text-left">Lead Time</th>
                <th className="px-4 py-3 text-left">Availability</th>
                <th className="px-4 py-3 text-left">Last Contact</th>
                <th className="px-4 py-3 text-left">Next Follow-Up</th>
                <th className="px-4 py-3 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-medium text-white text-sm">{s.name}</div>
                    <a href={`https://${s.website}`} target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-amber-400 flex items-center gap-1 mt-0.5">
                      <Globe className="w-3 h-3" /> {s.website}
                    </a>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-slate-300 text-xs">{s.contact}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3 text-slate-500" />
                      <span className="text-xs text-slate-500 truncate max-w-[140px]">{s.email}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span className="text-xs text-slate-500">{s.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLES[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold ${s.quoteReceived ? "text-emerald-400" : "text-slate-600"}`}>
                      {s.quoteReceived ? "✓ Yes" : "— No"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-mono">
                    {s.unitPrice ? <span className="text-white">${s.unitPrice.toLocaleString()}</span> : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-400">{s.moq ?? "—"}</td>
                  <td className="px-4 py-4 text-xs text-slate-400">{s.leadTime ?? "—"}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-medium ${
                      s.availability === "In Stock" ? "text-emerald-400" :
                      s.availability === "Limited" ? "text-amber-400" :
                      s.availability === "N/A" ? "text-red-400" : "text-slate-500"
                    }`}>{s.availability}</span>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-500">{s.lastContacted}</td>
                  <td className="px-4 py-4">
                    {s.nextFollowUp ? (
                      <div className="flex items-center gap-1 text-xs text-amber-400">
                        <Calendar className="w-3 h-3" /> {s.nextFollowUp}
                      </div>
                    ) : <span className="text-slate-600 text-xs">—</span>}
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-400 max-w-[180px]">{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email Templates */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white text-sm">Email Template Library</h2>
            <p className="text-xs text-amber-400 mt-1">⚠ Email automation placeholder — final sending requires backend integration and human approval.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Template Selector */}
          <div className="p-4 space-y-1">
            {EMAIL_TEMPLATES.map((t, i) => (
              <button
                key={i}
                onClick={() => setSelectedTemplate(i)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedTemplate === i ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
          {/* Template Preview */}
          <div className="md:col-span-3 p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs text-slate-500 mb-1">Subject</div>
                <div className="text-sm text-white font-medium">{EMAIL_TEMPLATES[selectedTemplate].subject}</div>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap bg-slate-800 rounded-lg p-4 font-mono">
              {EMAIL_TEMPLATES[selectedTemplate].body}
            </pre>
            <div className="mt-3 flex gap-2">
              <button disabled className="px-4 py-2 bg-slate-700 text-slate-500 rounded-lg text-xs font-medium cursor-not-allowed">
                Send via Backend (Not Connected)
              </button>
              <button className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-xs font-medium">
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}