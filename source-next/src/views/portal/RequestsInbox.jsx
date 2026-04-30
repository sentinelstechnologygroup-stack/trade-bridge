"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";

const ALL_REQUESTS = [
  { id: "PR-0041", product: "Industrial Air Compressors", category: "Tools & Hardware", direction: "US→LK", company: "Lanka Heavy Equip Ltd", destination: "Colombo", qty: "12 units", risk: "Low", status: "Go", date: "2026-04-27" },
  { id: "PR-0040", product: "Surgical Gloves (Latex-Free)", category: "Medical", direction: "US→LK", company: "MedSupply Colombo", destination: "Gampaha", qty: "50,000 units", risk: "Medium", status: "Caution", date: "2026-04-26" },
  { id: "PR-0039", product: "Ceylon Cinnamon Extract", category: "Food & Beverage", direction: "LK→US", company: "Spice Routes Inc.", destination: "Houston, TX", qty: "500 kg", risk: "Low", status: "Feasibility Review", date: "2026-04-25" },
  { id: "PR-0038", product: "Power Tools (Dewalt Bundle)", category: "Tools & Hardware", direction: "US→LK", company: "ProBuild Kandy", destination: "Kandy", qty: "30 sets", risk: "Low", status: "Awaiting Quote", date: "2026-04-24" },
  { id: "PR-0037", product: "Lithium Battery Cells", category: "Electronics", direction: "US→LK", company: "EcoPower Lanka", destination: "Colombo", qty: "2,000 units", risk: "High", status: "No-Go", date: "2026-04-23" },
  { id: "PR-0036", product: "Organic Moringa Powder", category: "Health & Wellness", direction: "LK→US", company: "Green Source USA", destination: "Miami, FL", qty: "1,000 kg", risk: "Low", status: "Approved", date: "2026-04-22" },
  { id: "PR-0035", product: "Automotive Oil Filters", category: "Automotive", direction: "US→LK", company: "AutoMark Lanka", destination: "Negombo", qty: "500 units", risk: "Low", status: "New", date: "2026-04-21" },
  { id: "PR-0034", product: "Activated Charcoal Capsules", category: "Health & Wellness", direction: "US→LK", company: "HealthPlus Pvt Ltd", destination: "Colombo", qty: "10,000 units", risk: "Medium", status: "Needs Info", date: "2026-04-20" },
  { id: "PR-0033", product: "USB-C Fast Chargers", category: "Electronics", direction: "US→LK", company: "GadgetHub LK", destination: "Colombo", qty: "1,000 units", risk: "Low", status: "Supplier Sourcing", date: "2026-04-19" },
  { id: "PR-0032", product: "Commercial Refrigerator Units", category: "Appliances", direction: "US→LK", company: "ColdChain Lanka", destination: "Galle", qty: "8 units", risk: "Medium", status: "Quote Drafting", date: "2026-04-18" },
];

const STATUS_FILTERS = ["All", "New", "Needs Info", "Feasibility Review", "Supplier Sourcing", "Quote Drafting", "Awaiting Quote", "Buyer Approval", "Approved", "No-Go", "Caution", "Go"];

const statusColors = {
  "Go": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Approved": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Caution": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "No-Go": "bg-red-500/15 text-red-400 border-red-500/30",
  "Feasibility Review": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Awaiting Quote": "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "Supplier Sourcing": "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "Quote Drafting": "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "New": "bg-slate-500/15 text-slate-300 border-slate-500/30",
  "Needs Info": "bg-orange-500/15 text-orange-400 border-orange-500/30",
  "Buyer Approval": "bg-sky-500/15 text-sky-400 border-sky-500/30",
};

const riskColors = { "Low": "text-emerald-400", "Medium": "text-yellow-400", "High": "text-red-400" };

export default function RequestsInbox() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = ALL_REQUESTS.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchSearch = !search || r.product.toLowerCase().includes(search.toLowerCase()) || r.company.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Product Requests Inbox</h1>
        <p className="text-slate-400 mt-1 text-sm">All submitted sourcing requests and their current pipeline status.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product, company, ID..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-slate-500" />
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                statusFilter === s
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="px-5 py-3 text-left">ID</th>
                <th className="px-5 py-3 text-left">Product</th>
                <th className="px-5 py-3 text-left">Direction</th>
                <th className="px-5 py-3 text-left">Buyer / Company</th>
                <th className="px-5 py-3 text-left">Destination</th>
                <th className="px-5 py-3 text-left">Qty</th>
                <th className="px-5 py-3 text-left">Risk</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Submitted</th>
                <th className="px-5 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((req) => (
                <tr key={req.id} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-slate-400">{req.id}</td>
                  <td className="px-5 py-3 font-medium text-white max-w-[180px]">
                    <div>{req.product}</div>
                    <div className="text-xs text-slate-500">{req.category}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">{req.direction}</span>
                  </td>
                  <td className="px-5 py-3 text-slate-300 text-xs">{req.company}</td>
                  <td className="px-5 py-3 text-slate-400 text-xs">{req.destination}</td>
                  <td className="px-5 py-3 text-slate-400 text-xs">{req.qty}</td>
                  <td className={`px-5 py-3 text-xs font-semibold ${riskColors[req.risk]}`}>{req.risk}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${statusColors[req.status] || "bg-slate-700 text-slate-300 border-slate-600"}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-500">{req.date}</td>
                  <td className="px-5 py-3">
                    <Link href={`/portal/requests/${req.id}`} className="text-xs text-amber-400 hover:text-amber-300 whitespace-nowrap">View →</Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="px-5 py-12 text-center text-slate-500 text-sm">No requests match the current filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}