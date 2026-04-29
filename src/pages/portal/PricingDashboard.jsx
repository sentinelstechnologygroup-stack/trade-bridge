import React from "react";
import { Link } from "react-router-dom";
import {
  Package, Clock, DollarSign, CheckCircle, AlertTriangle, XCircle,
  FileText, Send, ArrowRight, TrendingUp
} from "lucide-react";

const summaryCards = [
  { label: "New Requests", value: 7, icon: Package, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  { label: "Awaiting Feasibility", value: 4, icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  { label: "Pricing Needed", value: 3, icon: DollarSign, color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/20" },
  { label: "Go Recommendations", value: 5, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  { label: "Caution", value: 4, icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  { label: "No-Go", value: 2, icon: XCircle, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
  { label: "Awaiting Buyer Approval", value: 3, icon: FileText, color: "text-sky-400", bg: "bg-sky-400/10 border-sky-400/20" },
  { label: "Quote Sent", value: 6, icon: Send, color: "text-pink-400", bg: "bg-pink-400/10 border-pink-400/20" },
];

const requests = [
  { id: "PR-0041", product: "Industrial Air Compressors", client: "Lanka Heavy Equip Ltd", direction: "US→LK", estCost: 8500, tier: "Standard Sourcing", risk: "Low", feasibility: "Go", quoteStatus: "Draft" },
  { id: "PR-0040", product: "Surgical Gloves (Latex-Free)", client: "MedSupply Colombo", direction: "US→LK", estCost: 3200, tier: "Restricted Review", risk: "Medium", feasibility: "Caution", quoteStatus: "Pending" },
  { id: "PR-0039", product: "Ceylon Cinnamon Extract", client: "Spice Routes Inc.", direction: "LK→US", estCost: 4800, tier: "Standard Sourcing", risk: "Low", feasibility: "Go", quoteStatus: "Sent" },
  { id: "PR-0038", product: "Power Tools (Dewalt Bundle)", client: "ProBuild Kandy", direction: "US→LK", estCost: 12000, tier: "Complex Multi-Supplier", risk: "Low", feasibility: "Go", quoteStatus: "Accepted" },
  { id: "PR-0037", product: "Lithium Battery Cells", client: "EcoPower Lanka", direction: "US→LK", estCost: 6000, tier: "Restricted Review", risk: "High", feasibility: "No-Go", quoteStatus: "N/A" },
  { id: "PR-0036", product: "Organic Moringa Powder", client: "Green Source USA", direction: "LK→US", estCost: 2200, tier: "Basic Sourcing", risk: "Low", feasibility: "Go", quoteStatus: "Sent" },
];

const feasibilityColors = {
  "Go": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Caution": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "No-Go": "bg-red-500/15 text-red-400 border-red-500/30",
};

const quoteColors = {
  "Draft": "bg-slate-700 text-slate-300",
  "Pending": "bg-violet-500/15 text-violet-400",
  "Sent": "bg-sky-500/15 text-sky-400",
  "Accepted": "bg-emerald-500/15 text-emerald-400",
  "N/A": "bg-slate-800 text-slate-500",
};

const tierColors = {
  "Basic Sourcing": "text-blue-400",
  "Standard Sourcing": "text-amber-400",
  "Complex Multi-Supplier": "text-orange-400",
  "Restricted Review": "text-red-400",
};

const riskColors = {
  "Low": "text-emerald-400",
  "Medium": "text-yellow-400",
  "High": "text-red-400",
};

export default function PricingDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Pricing & Feasibility Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm">Overview of sourcing requests, feasibility status, and quote pipeline.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 mb-10">
        {summaryCards.map((card) => (
          <div key={card.label} className={`rounded-xl border p-4 ${card.bg}`}>
            <card.icon className={`w-4 h-4 mb-2 ${card.color}`} />
            <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
            <div className="text-xs text-slate-400 mt-1 leading-tight">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <Link to="/portal/quote-builder" className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400 transition-colors">
          <DollarSign className="w-4 h-4" /> Open Quote Builder
        </Link>
        <Link to="/portal/decision-queue" className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-100 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700">
          Decision Queue
        </Link>
        <Link to="/portal/requests" className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-100 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700">
          Requests Inbox
        </Link>
      </div>

      {/* Requests Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-white text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" /> Recent Requests — Pricing Pipeline
          </h2>
          <Link to="/portal/requests" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="px-5 py-3 text-left">ID</th>
                <th className="px-5 py-3 text-left">Product</th>
                <th className="px-5 py-3 text-left">Client</th>
                <th className="px-5 py-3 text-left">Direction</th>
                <th className="px-5 py-3 text-right">Est. Product Cost</th>
                <th className="px-5 py-3 text-left">Pricing Tier</th>
                <th className="px-5 py-3 text-left">Risk</th>
                <th className="px-5 py-3 text-left">Feasibility</th>
                <th className="px-5 py-3 text-left">Quote Status</th>
                <th className="px-5 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-slate-400">{r.id}</td>
                  <td className="px-5 py-4 font-medium text-white text-xs">{r.product}</td>
                  <td className="px-5 py-4 text-slate-300 text-xs">{r.client}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">{r.direction}</span>
                  </td>
                  <td className="px-5 py-4 text-right text-sm font-semibold text-white">${r.estCost.toLocaleString()}</td>
                  <td className={`px-5 py-4 text-xs font-medium ${tierColors[r.tier]}`}>{r.tier}</td>
                  <td className={`px-5 py-4 text-xs font-semibold ${riskColors[r.risk]}`}>{r.risk}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${feasibilityColors[r.feasibility] || "bg-slate-700 text-slate-300 border-slate-600"}`}>
                      {r.feasibility}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${quoteColors[r.quoteStatus]}`}>
                      {r.quoteStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link to={`/portal/requests/${r.id}`} className="text-xs text-amber-400 hover:text-amber-300 whitespace-nowrap">View →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}