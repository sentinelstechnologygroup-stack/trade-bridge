import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, AlertTriangle, XCircle, Clock, CheckCircle, Package, DollarSign } from "lucide-react";

const summaryCards = [
  { label: "New Requests", value: 7, icon: Package, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  { label: "Awaiting Feasibility", value: 4, icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  { label: "Pricing Needed", value: 3, icon: DollarSign, color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/20" },
  { label: "Go Recommendations", value: 5, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  { label: "Caution", value: 4, icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  { label: "No-Go", value: 2, icon: XCircle, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
  { label: "Awaiting Buyer Approval", value: 3, icon: TrendingUp, color: "text-sky-400", bg: "bg-sky-400/10 border-sky-400/20" },
  { label: "Quote Sent", value: 6, icon: TrendingUp, color: "text-pink-400", bg: "bg-pink-400/10 border-pink-400/20" },
];

const recentRequests = [
  { id: "PR-0041", product: "Industrial Air Compressors", direction: "US→LK", company: "Lanka Heavy Equip Ltd", risk: "Low", status: "Go", date: "2026-04-27" },
  { id: "PR-0040", product: "Surgical Gloves (Latex-Free)", direction: "US→LK", company: "MedSupply Colombo", risk: "Medium", status: "Caution", date: "2026-04-26" },
  { id: "PR-0039", product: "Ceylon Cinnamon Extract", direction: "LK→US", company: "Spice Routes Inc.", risk: "Low", status: "Feasibility Review", date: "2026-04-25" },
  { id: "PR-0038", product: "Power Tools (Dewalt Bundle)", direction: "US→LK", company: "ProBuild Kandy", risk: "Low", status: "Awaiting Quote", date: "2026-04-24" },
  { id: "PR-0037", product: "Lithium Battery Cells", direction: "US→LK", company: "EcoPower Lanka", risk: "High", status: "No-Go", date: "2026-04-23" },
  { id: "PR-0036", product: "Organic Moringa Powder", direction: "LK→US", company: "Green Source USA", risk: "Low", status: "Approved", date: "2026-04-22" },
  ];

const statusColors = {
  "Go": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Caution": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "No-Go": "bg-red-500/15 text-red-400 border-red-500/30",
  "Feasibility Review": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Awaiting Quote": "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "Approved": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const riskColors = {
  "Low": "text-emerald-400",
  "Medium": "text-yellow-400",
  "High": "text-red-400",
};

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Operations Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm">Real-time overview of the feasibility review pipeline.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 mb-10">
        {summaryCards.map((card) => (
          <div key={card.label} className={`rounded-xl border p-4 ${card.bg}`}>
            <card.icon className={`w-5 h-5 mb-3 ${card.color}`} />
            <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
            <div className="text-xs text-slate-400 mt-1 leading-tight">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <Link to="/portal/requests" className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400 transition-colors">
          View Requests Inbox <ArrowRight className="w-4 h-4" />
        </Link>
        <Link to="/portal/decision-queue" className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-100 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700">
          Decision Queue
        </Link>
        <Link to="/portal/compliance-review" className="flex items-center gap-2 px-4 py-2 bg-orange-500/15 border border-orange-500/30 text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-500/25 transition-colors">
          Compliance Review
        </Link>
        <Link to="/portal/pricing-feasibility" className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-100 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700">
          Pricing & Feasibility
        </Link>
        <Link to="/portal/clients" className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-100 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700">
          Clients
        </Link>
        <Link to="/portal/audit-log" className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-100 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700">
          Audit Log
        </Link>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-white text-sm">Recent Product Requests</h2>
          <Link to="/portal/requests" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Direction</th>
                <th className="px-6 py-3 text-left">Company</th>
                <th className="px-6 py-3 text-left">Risk</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req) => (
                <tr key={req.id} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">{req.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{req.product}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">{req.direction}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-xs">{req.company}</td>
                  <td className={`px-6 py-4 text-xs font-semibold ${riskColors[req.risk]}`}>{req.risk}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${statusColors[req.status] || "bg-slate-700 text-slate-300 border-slate-600"}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{req.date}</td>
                  <td className="px-6 py-4">
                    <Link to={`/portal/requests/${req.id}`} className="text-xs text-amber-400 hover:text-amber-300">View →</Link>
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