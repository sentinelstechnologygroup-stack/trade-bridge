"use client";
import React, { useState } from "react";
import { TrendingDown, AlertTriangle, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const SUMMARY_CARDS = [
  { label: "Est. Gross Service Revenue", value: "$18,450", sub: "Sample data — 12 quotes", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { label: "Product Cost Under Management", value: "$124,200", sub: "Estimated pass-through", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Average Service Fee %", value: "14.8%", sub: "Across active quotes", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { label: "Avg. Margin Confidence", value: "Moderate", sub: "6 of 12 quotes", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  { label: "Quotes Awaiting Approval", value: "4", sub: "Buyer approval pending", color: "text-slate-300", bg: "bg-slate-800 border-slate-700" },
  { label: "Low-Margin Warnings", value: "3", sub: "Below minimum fee", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  { label: "High-Risk Quotes", value: "2", sub: "Red / escalated flags", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { label: "Open Quotes Value", value: "$87,500", sub: "Est. total quote value", color: "text-slate-300", bg: "bg-slate-800 border-slate-700" },
];

const BY_STATUS = [
  { status: "Draft", revenue: 3200 },
  { status: "Sent", revenue: 6400 },
  { status: "Approved", revenue: 7200 },
  { status: "Declined", revenue: 1650 },
];

const BY_CATEGORY = [
  { category: "Medical", revenue: 5800 },
  { category: "Industrial", revenue: 4200 },
  { category: "Consumer", revenue: 3100 },
  { category: "Electronics", revenue: 2900 },
  { category: "Tools", revenue: 2450 },
];

const BY_TIER = [
  { tier: "Standard (15%)", value: 8200 },
  { tier: "Complex (18–25%)", value: 5900 },
  { tier: "Basic (10–12%)", value: 4350 },
];

const PIE_COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6"];

const QUOTE_TABLE = [
  { id: "Q-0041", client: "Lanka Heavy Equip", product: "Air Compressors", cost: "$42,000", fee: "$7,350", freight: "$3,200", risk: "$2,100", total: "$54,650", revenue: "$7,350", confidence: "Moderate", status: "Sent", warnings: ["missing_freight"] },
  { id: "Q-0040", client: "MedSupply Colombo", product: "Surgical Gloves", cost: "$9,000", fee: "$1,350", freight: "TBD", risk: "$450", total: "TBD", revenue: "$1,350", confidence: "Low", status: "Draft", warnings: ["low_margin", "missing_freight"] },
  { id: "Q-0038", client: "Lanka Tools Co", product: "Power Tools Set", cost: "$18,500", fee: "$3,330", freight: "$1,800", risk: "$925", total: "$24,555", revenue: "$3,330", confidence: "High", status: "Approved", warnings: [] },
  { id: "Q-0037", client: "Colombo Electronics", product: "LED Lighting", cost: "$11,200", fee: "$1,680", freight: "$950", risk: "$560", total: "$14,390", revenue: "$1,680", confidence: "Moderate", status: "Approved", warnings: [] },
  { id: "Q-0035", client: "Agri Lanka Ltd", product: "Farm Equipment", cost: "$22,000", fee: "$3,300", freight: "TBD", risk: "$1,100", total: "TBD", revenue: "$3,300", confidence: "Low", status: "Draft", warnings: ["missing_freight", "low_margin"] },
  { id: "Q-0033", client: "Lanka Pharma", product: "Lab Supplies", cost: "$8,400", fee: "$840", freight: "$620", risk: "$420", total: "$10,280", revenue: "$840", confidence: "Low", status: "Draft", warnings: ["low_margin", "below_minimum"] },
];

const WARNING_LABELS = {
  low_margin: { label: "Low Margin Confidence", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  missing_freight: { label: "Freight Estimate Missing", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  below_minimum: { label: "Below Minimum Fee", color: "text-red-400 bg-red-500/10 border-red-500/20" },
};

const STATUS_COLORS = {
  Draft: "bg-slate-700 text-slate-300 border-slate-600",
  Sent: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Declined: "bg-red-500/15 text-red-400 border-red-500/30",
};

const CONFIDENCE_COLORS = {
  High: "text-emerald-400",
  Moderate: "text-yellow-400",
  Low: "text-red-400",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs">
        <p className="text-slate-400 mb-1">{label}</p>
        <p className="text-amber-400 font-semibold">${payload[0].value.toLocaleString()}</p>
        <p className="text-slate-500 mt-0.5">Estimated service revenue</p>
      </div>
    );
  }
  return null;
};

export default function ProfitMarginDashboard() {
  const [view, setView] = useState("overview");

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Estimated Profit & Margin Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm">Internal management view of estimated service revenue, quote margin, and profitability indicators.</p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-6">
        <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-300 leading-relaxed">
          <span className="font-semibold">Estimates only — </span>
          Profit and margin figures are estimates only and depend on final supplier pricing, logistics costs, payment fees, duties/taxes responsibility, and confirmed buyer approval. This dashboard uses sample/placeholder data.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {SUMMARY_CARDS.map(c => (
          <div key={c.label} className={`rounded-xl border p-4 ${c.bg}`}>
            <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
            <div className="text-xs text-white mt-1 font-medium leading-tight">{c.label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        {/* By Status */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Est. Revenue by Quote Status</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={BY_STATUS} barSize={28}>
              <XAxis dataKey="status" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By Category */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Est. Margin by Product Category</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={BY_CATEGORY} layout="vertical" barSize={18}>
              <XAxis type="number" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By Pricing Tier */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Service Fee Revenue by Tier</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={BY_TIER} dataKey="value" nameKey="tier" cx="50%" cy="50%" outerRadius={70} paddingAngle={3} label={false}>
                {BY_TIER.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Est. Revenue"]} contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 11 }} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quote Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-white text-sm">Quote Margin Detail</h2>
          <span className="text-xs text-slate-500">Sample data — not verified figures</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="px-4 py-3 text-left">Quote</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Product Cost</th>
                <th className="px-4 py-3 text-left">Service Fee</th>
                <th className="px-4 py-3 text-left">Freight Est.</th>
                <th className="px-4 py-3 text-left">Risk Buffer</th>
                <th className="px-4 py-3 text-left">Total Quote</th>
                <th className="px-4 py-3 text-left">Margin Conf.</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Warnings</th>
              </tr>
            </thead>
            <tbody>
              {QUOTE_TABLE.map(q => (
                <tr key={q.id} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-400">{q.id}</td>
                  <td className="px-4 py-3 text-white">{q.client}</td>
                  <td className="px-4 py-3 text-slate-300">{q.cost}</td>
                  <td className="px-4 py-3 text-amber-400 font-semibold">{q.fee}</td>
                  <td className="px-4 py-3 text-slate-300">{q.freight}</td>
                  <td className="px-4 py-3 text-slate-300">{q.risk}</td>
                  <td className="px-4 py-3 font-semibold text-white">{q.total}</td>
                  <td className={`px-4 py-3 font-semibold ${CONFIDENCE_COLORS[q.confidence]}`}>{q.confidence}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[q.status]}`}>{q.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {q.warnings.map(w => (
                        <span key={w} className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${WARNING_LABELS[w]?.color}`}>
                          {WARNING_LABELS[w]?.label}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low-margin warnings */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <TrendingDown className="w-3.5 h-3.5 text-red-400" /> Low-Margin & High-Workload Warnings
        </h3>
        <div className="space-y-2">
          {[
            "Q-0040 — Surgical Gloves — Low margin confidence. Freight estimate missing.",
            "Q-0035 — Farm Equipment — Freight estimate TBD. Margin not confirmable.",
            "Q-0033 — Lab Supplies — Estimated fee $840 may be below minimum service fee of $350.",
          ].map((w, i) => (
            <div key={i} className="flex items-start gap-3 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-300">{w}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}