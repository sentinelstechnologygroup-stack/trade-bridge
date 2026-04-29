import React, { useState } from "react";
import { Search, AlertCircle, Info, AlertTriangle } from "lucide-react";

const EVENTS = [
  { ts: "2026-04-28 09:14", user: "ops@tradeconnect.us", type: "Feasibility Status Changed", ref: "PR-0040", notes: "Status changed from New to Caution. AI pre-screen: 72% confidence.", risk: "Warning" },
  { ts: "2026-04-28 08:52", user: "system", type: "AI-Assisted Pre-Screen Completed", ref: "PR-0040", notes: "Automated pre-screen flagged: Medical category, missing IOR, unknown HS code.", risk: "Warning" },
  { ts: "2026-04-27 16:30", user: "ops@tradeconnect.us", type: "Request Created", ref: "PR-0041", notes: "New sourcing request submitted by Lanka Heavy Equip Ltd.", risk: "Info" },
  { ts: "2026-04-27 14:05", user: "quotes@tradeconnect.us", type: "Quote Saved", ref: "PR-0039", notes: "Draft quote saved. Total estimate: $18,400.", risk: "Info" },
  { ts: "2026-04-27 11:22", user: "compliance@tradeconnect.us", type: "No-Go Override Attempted", ref: "PR-0033", notes: "No-Go override requested for network equipment. Senior approval required.", risk: "Critical" },
  { ts: "2026-04-26 17:45", user: "docs@tradeconnect.us", type: "Document Uploaded", ref: "PR-0040", notes: "spec_sheet_gloves.pdf uploaded.", risk: "Info" },
  { ts: "2026-04-26 15:10", user: "compliance@tradeconnect.us", type: "Human Decision Recorded", ref: "PR-0035", notes: "Compliance cleared for food supplements. SLS permit confirmed.", risk: "Info" },
  { ts: "2026-04-26 13:00", user: "ops@tradeconnect.us", type: "Supplier Selected", ref: "PR-0039", notes: "Atlas Industrial Supply selected for air compressor quote.", risk: "Info" },
  { ts: "2026-04-25 10:30", user: "admin@tradeconnect.us", type: "User Role Changed", ref: "—", notes: "User j.silva@tradeconnect.us role updated from Sourcing Agent to Quote Reviewer.", risk: "Warning" },
  { ts: "2026-04-24 09:15", user: "quotes@tradeconnect.us", type: "Quote Sent", ref: "PR-0037", notes: "Final quote sent to Colombo General Traders.", risk: "Info" },
  { ts: "2026-04-23 14:40", user: "ops@tradeconnect.us", type: "Shipment Status Updated", ref: "SHP-004", notes: "Shipment SHP-004 marked as In Transit.", risk: "Info" },
  { ts: "2026-04-22 11:00", user: "admin@tradeconnect.us", type: "Settings Changed", ref: "—", notes: "Default sourcing fee updated from 12% to 15%.", risk: "Warning" },
  { ts: "2026-04-21 16:05", user: "docs@tradeconnect.us", type: "Document Approved", ref: "PR-0036", notes: "Packing list approved for shipment SHP-003.", risk: "Info" },
  { ts: "2026-04-20 09:50", user: "quotes@tradeconnect.us", type: "Payment Marked Received", ref: "PR-0034", notes: "Product cost deposit confirmed for Lanka Heavy Equip order.", risk: "Info" },
];

const RISK_STYLES = {
  Info: { bg: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: Info },
  Warning: { bg: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: AlertTriangle },
  Critical: { bg: "bg-red-500/10 text-red-400 border-red-500/20", icon: AlertCircle },
};

const EVENT_TYPES = [...new Set(EVENTS.map(e => e.type))];

export default function AuditLog() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = EVENTS.filter(e => {
    const matchSearch = e.ref.toLowerCase().includes(search.toLowerCase()) || e.user.toLowerCase().includes(search.toLowerCase()) || e.notes.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === "All" || e.risk === riskFilter;
    const matchType = typeFilter === "All" || e.type === typeFilter;
    return matchSearch && matchRisk && matchType;
  });

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Audit Log</h1>
        <p className="text-slate-400 mt-1 text-sm">System event history. All entries are read-only and permanent.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by user, reference, or notes..." className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500" />
        </div>
        <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500">
          <option value="All">All Risk Levels</option>
          <option>Info</option>
          <option>Warning</option>
          <option>Critical</option>
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500 max-w-48">
          <option value="All">All Event Types</option>
          {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[["Critical", "bg-red-500/10 border-red-500/20 text-red-400"], ["Warning", "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"], ["Info", "bg-blue-500/10 border-blue-500/20 text-blue-400"]].map(([level, style]) => (
          <div key={level} className={`rounded-xl border p-4 ${style}`}>
            <div className="text-2xl font-bold">{EVENTS.filter(e => e.risk === level).length}</div>
            <div className="text-xs mt-0.5 font-medium">{level} Events</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              {["Timestamp", "User", "Event Type", "Reference", "Risk", "Notes"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((e, i) => {
              const style = RISK_STYLES[e.risk];
              const Icon = style.icon;
              return (
                <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-slate-400 whitespace-nowrap">{e.ts}</td>
                  <td className="px-4 py-3 text-xs text-slate-300 whitespace-nowrap">{e.user}</td>
                  <td className="px-4 py-3 text-xs text-white font-medium">{e.type}</td>
                  <td className="px-4 py-3 text-xs font-mono text-amber-400">{e.ref}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${style.bg}`}>
                      <Icon className="w-3 h-3" />{e.risk}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400 max-w-xs">{e.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-6 py-10 text-center text-slate-500 text-sm">No events match current filters.</div>
        )}
      </div>
    </div>
  );
}