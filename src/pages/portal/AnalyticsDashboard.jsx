import React, { useState } from "react";
import { Info, Download, AlertTriangle, ShieldAlert, BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";

// ── Mock Data ──────────────────────────────────────────────
const PIPELINE_DATA = [
  { stage: "New", count: 14 },
  { stage: "Feasibility", count: 9 },
  { stage: "Sourcing", count: 6 },
  { stage: "Quote Builder", count: 5 },
  { stage: "Buyer Approval", count: 4 },
  { stage: "Docs Pending", count: 3 },
  { stage: "Shipment Ready", count: 2 },
  { stage: "In Transit", count: 1 },
  { stage: "Closed", count: 8 },
  { stage: "No-Go", count: 3 },
];

const MONTHLY_REVENUE = [
  { month: "Nov", revenue: 2100 },
  { month: "Dec", revenue: 3400 },
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5100 },
  { month: "Mar", revenue: 6800 },
  { month: "Apr", revenue: 7200 },
];

const BY_CATEGORY = [
  { category: "Medical", value: 5800 },
  { category: "Industrial", value: 4200 },
  { category: "Consumer", value: 3100 },
  { category: "Electronics", value: 2900 },
  { category: "Tools", value: 2450 },
];

const PIE_COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6"];

const TOP_CLIENTS = [
  { client: "Lanka Heavy Equip Ltd", quotes: 3, value: "$54,650", status: "Active" },
  { client: "MedSupply Colombo", quotes: 2, value: "$12,800", status: "Active" },
  { client: "Lanka Tools Co", quotes: 2, value: "$24,555", status: "Active" },
  { client: "Colombo Electronics", quotes: 1, value: "$14,390", status: "Active" },
  { client: "Agri Lanka Ltd", quotes: 1, value: "TBD", status: "Pending" },
];

const SUPPLIERS = [
  { name: "Grainger Industrial Supply", response: "2 days", quotes: 4, selected: 3, status: "Preferred" },
  { name: "US Medical Distributors", response: "4 days", quotes: 2, selected: 1, status: "Active" },
  { name: "Harbor Freight Tools", response: "3 days", quotes: 3, selected: 2, status: "Preferred" },
  { name: "Osram Americas", response: "6 days", quotes: 1, selected: 0, status: "Watchlist" },
  { name: "AgriSupply Inc.", response: "7 days", quotes: 1, selected: 0, status: "Pending" },
];

const COMPLIANCE_DATA = [
  { label: "Open Compliance Flags", value: 4, color: "text-orange-400" },
  { label: "Restricted Item Reviews", value: 3, color: "text-yellow-400" },
  { label: "Sanctions Screening Placeholders", value: 2, color: "text-red-400" },
  { label: "Unknown HS Code Flags", value: 5, color: "text-orange-400" },
  { label: "Missing IOR Confirmation", value: 3, color: "text-yellow-400" },
  { label: "No-Go Decisions", value: 2, color: "text-red-400" },
  { label: "Override Attempts", value: 1, color: "text-red-400" },
];

const SHIPMENT_STAGES = [
  { stage: "Not Booked", count: 3 },
  { stage: "Awaiting Freight Quote", count: 4 },
  { stage: "Booked", count: 2 },
  { stage: "In Transit", count: 1 },
  { stage: "At Destination", count: 0 },
  { stage: "Customs Clearance", count: 1 },
  { stage: "Delivered", count: 5 },
  { stage: "Delayed", count: 1 },
];

const DOC_STATUS = [
  { label: "Documents Complete", value: 8, color: "#10b981" },
  { label: "Missing Documents", value: 5, color: "#ef4444" },
  { label: "Overdue", value: 3, color: "#f97316" },
  { label: "Under Review", value: 2, color: "#3b82f6" },
];

const SAVED_REPORTS = [
  { name: "Monthly Operations Summary", desc: "Full pipeline, quote, and revenue overview.", generated: "2026-04-01", owner: "Admin" },
  { name: "Quote Approval Report", desc: "Quote status, approval rate, and value breakdown.", generated: "2026-04-15", owner: "Ops Team" },
  { name: "Supplier Response Report", desc: "Supplier response times, selected rate, and watchlist.", generated: "2026-04-10", owner: "Admin" },
  { name: "Missing Documents Report", desc: "All requests with missing or overdue documents.", generated: "2026-04-20", owner: "Ops Team" },
  { name: "Compliance Flags Report", desc: "Open compliance flags, risk triggers, and no-go decisions.", generated: "2026-04-22", owner: "Admin" },
  { name: "Estimated Revenue Report", desc: "Service fee revenue estimates by status and category.", generated: "2026-04-25", owner: "Admin" },
  { name: "Shipment Status Report", desc: "All shipments by stage, freight status, and exceptions.", generated: "2026-04-20", owner: "Ops Team" },
  { name: "Client Activity Report", desc: "Active clients, top buyers, and IOR confirmation status.", generated: "2026-04-18", owner: "Admin" },
];

const INSIGHTS = [
  { text: "3 quotes are below the minimum service fee threshold.", level: "high" },
  { text: "5 requests are missing importer-of-record confirmation.", level: "high" },
  { text: "2 suppliers have not responded within 5 business days.", level: "medium" },
  { text: "4 shipments are missing required documents.", level: "high" },
  { text: "1 request has a possible sanctions/end-user screening flag.", level: "high" },
  { text: "Average time to quote increased compared to last month.", level: "medium" },
  { text: "Quote approval rate is 67% — 2 quotes pending buyer response.", level: "medium" },
  { text: "3 product requests still require HS code confirmation.", level: "medium" },
];

const TABS = ["Overview", "Requests", "Quotes", "Revenue Estimates", "Suppliers", "Clients", "Documents", "Shipments", "Compliance"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs">
        <p className="text-slate-400 mb-1">{label}</p>
        <p className="text-amber-400 font-semibold">{typeof payload[0].value === 'number' && payload[0].value > 100 ? `$${payload[0].value.toLocaleString()}` : payload[0].value}</p>
      </div>
    );
  }
  return null;
};

function SummaryCard({ label, value, sub, color = "text-slate-300", bg = "bg-slate-800 border-slate-700" }) {
  return (
    <div className={`rounded-xl border p-4 ${bg}`}>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-white mt-1 font-medium leading-tight">{label}</div>
      {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
    </div>
  );
}

function ExportPlaceholder() {
  return (
    <div className="flex gap-2">
      {["Export CSV", "Export PDF", "Download Report"].map(label => (
        <button key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs hover:bg-slate-700 hover:text-slate-200 transition-colors">
          <Download className="w-3 h-3" />{label}
        </button>
      ))}
    </div>
  );
}

// ── Tab Panels ────────────────────────────────────────────
function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <SummaryCard label="Total Requests" value="55" sub="All time" color="text-amber-400" bg="bg-amber-500/10 border-amber-500/20" />
        <SummaryCard label="New This Month" value="14" sub="April 2026" color="text-blue-400" bg="bg-blue-500/10 border-blue-500/20" />
        <SummaryCard label="Awaiting Feasibility" value="9" color="text-yellow-400" bg="bg-yellow-500/10 border-yellow-500/20" />
        <SummaryCard label="Quotes Sent" value="12" />
        <SummaryCard label="Quote Approval Rate" value="67%" color="text-emerald-400" bg="bg-emerald-500/10 border-emerald-500/20" />
        <SummaryCard label="Est. Gross Revenue" value="$18,450" sub="Sample data" color="text-amber-400" bg="bg-amber-500/10 border-amber-500/20" />
        <SummaryCard label="Open Quote Value" value="$87,500" sub="Estimated" />
        <SummaryCard label="Avg. Service Fee %" value="14.8%" color="text-emerald-400" bg="bg-emerald-500/10 border-emerald-500/20" />
        <SummaryCard label="Missing Documents" value="5" color="text-red-400" bg="bg-red-500/10 border-red-500/20" />
        <SummaryCard label="Compliance Flags Open" value="4" color="text-orange-400" bg="bg-orange-500/10 border-orange-500/20" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Request Pipeline</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={PIPELINE_DATA} barSize={22}>
              <XAxis dataKey="stage" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Est. Revenue by Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY_REVENUE}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <BarChart2 className="w-3.5 h-3.5 text-amber-400" /> Operational Insights
        </h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {INSIGHTS.map((ins, i) => (
            <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-xs ${
              ins.level === "high" ? "bg-red-500/10 border-red-500/20 text-red-300" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-300"
            }`}>
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              {ins.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RequestsTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "New", value: "14", color: "text-amber-400" },
          { label: "Feasibility Review", value: "9", color: "text-yellow-400" },
          { label: "Supplier Sourcing", value: "6", color: "text-blue-400" },
          { label: "Quote Builder", value: "5", color: "text-blue-400" },
          { label: "Buyer Approval", value: "4", color: "text-purple-400" },
          { label: "Docs Pending", value: "3", color: "text-orange-400" },
          { label: "Shipment Ready", value: "2", color: "text-emerald-400" },
          { label: "In Transit", value: "1", color: "text-emerald-400" },
          { label: "Closed", value: "8", color: "text-slate-400" },
          { label: "No-Go", value: "3", color: "text-red-400" },
        ].map(c => <SummaryCard key={c.label} label={c.label} value={c.value} color={c.color} />)}
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Request Stage Funnel</h3>
        <div className="space-y-2">
          {PIPELINE_DATA.map((d, i) => (
            <div key={d.stage} className="flex items-center gap-3">
              <div className="w-28 text-xs text-slate-400 text-right">{d.stage}</div>
              <div className="flex-1 bg-slate-800 rounded-full h-5 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full flex items-center pl-2 transition-all"
                  style={{ width: `${Math.max((d.count / 14) * 100, 8)}%` }}
                >
                  <span className="text-slate-950 text-[10px] font-bold">{d.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuotesTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryCard label="Quotes Drafted" value="18" />
        <SummaryCard label="Quotes Sent" value="12" color="text-blue-400" bg="bg-blue-500/10 border-blue-500/20" />
        <SummaryCard label="Quotes Approved" value="8" color="text-emerald-400" bg="bg-emerald-500/10 border-emerald-500/20" />
        <SummaryCard label="Quotes Rejected" value="4" color="text-red-400" bg="bg-red-500/10 border-red-500/20" />
        <SummaryCard label="Average Quote Value" value="$18,200" color="text-amber-400" bg="bg-amber-500/10 border-amber-500/20" />
        <SummaryCard label="Average Service Fee" value="$2,460" />
        <SummaryCard label="Approval Rate" value="67%" color="text-emerald-400" bg="bg-emerald-500/10 border-emerald-500/20" />
        <SummaryCard label="Avg. Approval Time" value="4.2 days" />
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Quote Status Breakdown</h3>
        <div className="flex gap-6 flex-wrap">
          {[
            { label: "Drafted", pct: 100, color: "bg-slate-600" },
            { label: "Sent", pct: 67, color: "bg-blue-500" },
            { label: "Approved", pct: 44, color: "bg-emerald-500" },
            { label: "Rejected", pct: 22, color: "bg-red-500" },
          ].map(b => (
            <div key={b.label} className="flex-1 min-w-24">
              <div className="text-xs text-slate-500 mb-1">{b.label}</div>
              <div className="bg-slate-800 rounded-full h-2.5 mb-1">
                <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} />
              </div>
              <div className="text-xs text-slate-400">{b.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RevenueTab() {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-300 leading-relaxed">Estimated figures only — final profit depends on confirmed supplier pricing, logistics costs, payment fees, and buyer approval.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Est. Revenue by Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY_REVENUE}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Est. Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={BY_CATEGORY} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={75} paddingAngle={3}>
                {BY_CATEGORY.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Est. Revenue"]} contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 11 }} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Low-Margin / High-Risk Warnings
        </h3>
        {[
          "Q-0040 — Surgical Gloves — Low confidence, freight TBD. Cannot confirm margin.",
          "Q-0035 — Farm Equipment — Freight TBD. High regulatory complexity.",
          "Q-0033 — Lab Supplies — Fee may be below minimum. Review required.",
        ].map((w, i) => (
          <div key={i} className="flex items-start gap-2 px-3 py-2 mb-1 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-300">
            <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />{w}
          </div>
        ))}
      </div>
    </div>
  );
}

function SuppliersTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryCard label="Total Suppliers" value="12" />
        <SummaryCard label="Preferred Suppliers" value="5" color="text-emerald-400" bg="bg-emerald-500/10 border-emerald-500/20" />
        <SummaryCard label="Watchlist" value="2" color="text-red-400" bg="bg-red-500/10 border-red-500/20" />
        <SummaryCard label="Avg. Response Time" value="3.8 days" />
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800"><h2 className="font-semibold text-white text-sm">Supplier Performance</h2></div>
        <table className="w-full text-xs">
          <thead><tr className="text-slate-500 uppercase tracking-wider border-b border-slate-800">
            <th className="px-5 py-3 text-left">Supplier</th>
            <th className="px-5 py-3 text-left">Avg. Response</th>
            <th className="px-5 py-3 text-left">Quotes Received</th>
            <th className="px-5 py-3 text-left">Selected</th>
            <th className="px-5 py-3 text-left">Status</th>
          </tr></thead>
          <tbody>
            {SUPPLIERS.map(s => (
              <tr key={s.name} className="border-b border-slate-800/50 hover:bg-slate-800/40">
                <td className="px-5 py-3 text-white">{s.name}</td>
                <td className="px-5 py-3 text-slate-300">{s.response}</td>
                <td className="px-5 py-3 text-slate-300">{s.quotes}</td>
                <td className="px-5 py-3 text-slate-300">{s.selected}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${
                    s.status === "Preferred" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" :
                    s.status === "Watchlist" ? "bg-red-500/15 text-red-400 border-red-500/30" :
                    "bg-slate-700 text-slate-300 border-slate-600"
                  }`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClientsTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryCard label="Active Clients" value="8" color="text-emerald-400" bg="bg-emerald-500/10 border-emerald-500/20" />
        <SummaryCard label="New This Month" value="3" color="text-amber-400" bg="bg-amber-500/10 border-amber-500/20" />
        <SummaryCard label="Awaiting IOR" value="3" color="text-yellow-400" bg="bg-yellow-500/10 border-yellow-500/20" />
        <SummaryCard label="High-Risk Flags" value="1" color="text-red-400" bg="bg-red-500/10 border-red-500/20" />
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800"><h2 className="font-semibold text-white text-sm">Top Clients by Estimated Quote Value</h2></div>
        <table className="w-full text-xs">
          <thead><tr className="text-slate-500 uppercase tracking-wider border-b border-slate-800">
            <th className="px-5 py-3 text-left">Client</th>
            <th className="px-5 py-3 text-left">Open Quotes</th>
            <th className="px-5 py-3 text-left">Est. Quote Value</th>
            <th className="px-5 py-3 text-left">Status</th>
          </tr></thead>
          <tbody>
            {TOP_CLIENTS.map(c => (
              <tr key={c.client} className="border-b border-slate-800/50 hover:bg-slate-800/40">
                <td className="px-5 py-3 text-white">{c.client}</td>
                <td className="px-5 py-3 text-slate-300">{c.quotes}</td>
                <td className="px-5 py-3 text-amber-400 font-semibold">{c.value}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${
                    c.status === "Active" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                  }`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DocumentsTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SummaryCard label="Documents Complete" value="8" color="text-emerald-400" bg="bg-emerald-500/10 border-emerald-500/20" />
        <SummaryCard label="Missing Documents" value="5" color="text-red-400" bg="bg-red-500/10 border-red-500/20" />
        <SummaryCard label="Overdue" value="3" color="text-orange-400" bg="bg-orange-500/10 border-orange-500/20" />
        <SummaryCard label="Under Review" value="2" color="text-blue-400" bg="bg-blue-500/10 border-blue-500/20" />
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Document Status Distribution</h3>
        <div className="space-y-3">
          {DOC_STATUS.map(d => (
            <div key={d.label} className="flex items-center gap-3">
              <div className="w-36 text-xs text-slate-400">{d.label}</div>
              <div className="flex-1 bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(d.value / 18) * 100}%`, backgroundColor: d.color }} />
              </div>
              <div className="w-6 text-xs text-slate-400 text-right">{d.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShipmentsTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SHIPMENT_STAGES.map(s => (
          <SummaryCard key={s.stage} label={s.stage} value={s.count.toString()}
            color={s.count > 0 ? "text-amber-400" : "text-slate-500"}
            bg={s.count > 0 ? "bg-amber-500/10 border-amber-500/20" : "bg-slate-800 border-slate-700"} />
        ))}
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Shipment Stage Pipeline</h3>
        <div className="space-y-2">
          {SHIPMENT_STAGES.filter(s => s.count > 0).map(d => (
            <div key={d.stage} className="flex items-center gap-3">
              <div className="w-36 text-xs text-slate-400 text-right">{d.stage}</div>
              <div className="flex-1 bg-slate-800 rounded-full h-4 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full flex items-center pl-2" style={{ width: `${(d.count / 5) * 100}%` }}>
                  <span className="text-white text-[10px] font-bold">{d.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComplianceTab() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {COMPLIANCE_DATA.map(c => (
          <SummaryCard key={c.label} label={c.label} value={c.value.toString()} color={c.color} />
        ))}
      </div>
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-orange-400" /> Open Compliance Items
        </h3>
        <div className="space-y-2">
          {[
            ["PR-0040", "Surgical Gloves", "Missing SLS permit + IOR confirmation", "High"],
            ["PR-0042", "Unknown Product", "Buyer refused to identify end user — Escalated", "Critical"],
            ["PR-0038", "Power Tools", "Unknown HS code", "Medium"],
            ["PR-0035", "Farm Equipment", "Missing importer-of-record confirmation", "Medium"],
          ].map(([id, product, issue, level]) => (
            <div key={id} className="flex items-start gap-3 px-3 py-2.5 bg-slate-800 rounded-lg border border-slate-700">
              <span className="font-mono text-xs text-amber-400 mt-0.5 shrink-0">{id}</span>
              <div className="flex-1">
                <div className="text-xs text-white font-medium">{product}</div>
                <div className="text-xs text-slate-400 mt-0.5">{issue}</div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                level === "Critical" ? "bg-red-500/15 text-red-400 border-red-500/30" :
                level === "High" ? "bg-orange-500/15 text-orange-400 border-orange-500/30" :
                "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
              }`}>{level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Saved Reports ─────────────────────────────────────────
function SavedReports() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mt-8">
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="font-semibold text-white text-sm">Saved Reports</h2>
        <span className="text-xs text-slate-500">Export placeholder — final reporting exports require backend integration.</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-px bg-slate-800">
        {SAVED_REPORTS.map(r => (
          <div key={r.name} className="bg-slate-900 p-4 hover:bg-slate-800/60 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="text-sm font-semibold text-white">{r.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{r.desc}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">Last generated: {r.generated} · {r.owner}</div>
              <div className="flex gap-1.5">
                <button className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded text-[10px] hover:bg-slate-700">View</button>
                <button className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded text-[10px] hover:bg-slate-700">
                  <Download className="w-2.5 h-2.5" />Export
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
const TAB_COMPONENTS = {
  "Overview": OverviewTab,
  "Requests": RequestsTab,
  "Quotes": QuotesTab,
  "Revenue Estimates": RevenueTab,
  "Suppliers": SuppliersTab,
  "Clients": ClientsTab,
  "Documents": DocumentsTab,
  "Shipments": ShipmentsTab,
  "Compliance": ComplianceTab,
};

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  const TabComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Analytics & Reporting</h1>
        <p className="text-slate-400 mt-1 text-sm">Operational performance across requests, quotes, suppliers, clients, documents, and compliance.</p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-5">
        <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-300 leading-relaxed">
          Analytics shown in this prototype use sample or estimated data. Final reporting accuracy will depend on connected data sources, confirmed pricing, logistics costs, quote approvals, document status, shipment updates, and backend integrations.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5 bg-slate-900 border border-slate-800 rounded-xl p-3">
        {[
          { label: "Date Range", options: ["Last 30 days", "Last 90 days", "This Year", "All Time"] },
          { label: "Direction", options: ["All", "US → Sri Lanka", "Sri Lanka → US"] },
          { label: "Status", options: ["All", "New", "Review", "Quoted", "Approved", "Closed"] },
          { label: "Risk Level", options: ["All", "Low", "Medium", "High"] },
          { label: "Category", options: ["All", "Medical", "Industrial", "Electronics", "Consumer", "Tools"] },
        ].map(f => (
          <div key={f.label} className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{f.label}:</span>
            <select className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500">
              {f.options.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <ExportPlaceholder />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-900 rounded-xl p-1 border border-slate-800 flex-wrap">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === t ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <TabComponent />

      {/* Saved Reports */}
      <SavedReports />
    </div>
  );
}