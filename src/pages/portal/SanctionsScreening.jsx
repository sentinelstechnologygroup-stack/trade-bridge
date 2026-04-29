import React, { useState } from "react";
import { AlertTriangle, Shield, ShieldAlert, ShieldCheck, ShieldX, Plus, Clock } from "lucide-react";

const RISK_TRIGGERS = [
  { id: "refuses_end_user", label: "Buyer refuses to identify end user", severity: "high" },
  { id: "unrelated_payment", label: "Payment from unrelated third party", severity: "high" },
  { id: "destination_mismatch", label: "Shipment destination differs from buyer country", severity: "high" },
  { id: "unusual_routing", label: "Unusual routing request", severity: "high" },
  { id: "undervalue_mislabel", label: "Request to undervalue/mislabel goods", severity: "high" },
  { id: "dual_use", label: "Product has dual-use risk", severity: "high" },
  { id: "military_end_use", label: "Military/security end use mentioned", severity: "high" },
  { id: "screening_needed", label: "Sanctions/end-user screening needed", severity: "high" },
];

const MOCK_PARTIES = [
  {
    id: "SCR-001", name: "Dr. Nimal Perera", company: "MedSupply Colombo", country: "Sri Lanka",
    role: "Buyer", status: "No Match Placeholder", lastScreened: "2026-04-26", reviewedBy: "Ops Team",
    request: "PR-0040", triggers: [], notes: "Standard buyer — no red flags identified in initial review.",
  },
  {
    id: "SCR-002", name: "Priya Wickramasinghe", company: "Lanka Heavy Equip Ltd", country: "Sri Lanka",
    role: "Buyer", status: "Pending Review", lastScreened: "2026-04-27", reviewedBy: "—",
    request: "PR-0041", triggers: ["dual_use"], notes: "Industrial compressors — dual-use flag raised. Awaiting senior review.",
  },
  {
    id: "SCR-003", name: "Colombo Freight Ltd", company: "Colombo Freight Ltd", country: "Sri Lanka",
    role: "Freight Partner", status: "Cleared by Reviewer", lastScreened: "2026-04-20", reviewedBy: "Admin",
    request: "PR-0038", triggers: [], notes: "Reviewed and cleared. No adverse findings.",
  },
  {
    id: "SCR-004", name: "Unknown End User", company: "—", country: "Unknown",
    role: "End User", status: "Escalated", lastScreened: "2026-04-25", reviewedBy: "Pending",
    request: "PR-0042", triggers: ["refuses_end_user", "destination_mismatch"], notes: "Buyer refused to identify end user. Escalated pending senior compliance review.",
  },
];

const STATUS_CONFIG = {
  "Not Screened":           { color: "bg-slate-700 text-slate-300 border-slate-600", icon: Shield },
  "Pending Review":         { color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30", icon: Clock },
  "No Match Placeholder":   { color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", icon: ShieldCheck },
  "Possible Match Placeholder": { color: "bg-orange-500/15 text-orange-400 border-orange-500/30", icon: ShieldAlert },
  "Escalated":              { color: "bg-red-500/15 text-red-400 border-red-500/30", icon: ShieldAlert },
  "Cleared by Reviewer":    { color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", icon: ShieldCheck },
  "Blocked / Do Not Proceed": { color: "bg-red-600/20 text-red-400 border-red-600/40", icon: ShieldX },
};

const ROLES = ["Buyer", "Supplier", "Importer of Record", "End User", "Freight Partner", "Payment Party"];
const STATUSES = Object.keys(STATUS_CONFIG);

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Not Screened"];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${cfg.color}`}>
      <Icon className="w-3 h-3" />{status}
    </span>
  );
}

function PartyRow({ party, onSelect }) {
  const isBlocked = party.status === "Blocked / Do Not Proceed" || party.status === "Escalated";
  return (
    <tr
      className={`border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors cursor-pointer ${isBlocked ? "bg-red-500/5" : ""}`}
      onClick={() => onSelect(party)}
    >
      <td className="px-5 py-4 font-mono text-xs text-slate-400">{party.id}</td>
      <td className="px-5 py-4">
        <div className="text-sm text-white font-medium">{party.name}</div>
        <div className="text-xs text-slate-500">{party.company}</div>
      </td>
      <td className="px-5 py-4 text-xs text-slate-400">{party.country}</td>
      <td className="px-5 py-4 text-xs text-slate-300">{party.role}</td>
      <td className="px-5 py-4"><StatusBadge status={party.status} /></td>
      <td className="px-5 py-4 text-xs text-slate-500">{party.lastScreened}</td>
      <td className="px-5 py-4">
        {party.triggers.length > 0 && (
          <span className="text-xs text-red-400 font-medium flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />{party.triggers.length} flag{party.triggers.length > 1 ? "s" : ""}
          </span>
        )}
      </td>
      <td className="px-5 py-4 font-mono text-xs text-amber-400">{party.request}</td>
    </tr>
  );
}

function PartyDetailPanel({ party, onClose }) {
  const [status, setStatus] = useState(party.status);
  const isBlocked = status === "Blocked / Do Not Proceed" || status === "Escalated" || status === "Possible Match Placeholder";

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h2 className="font-bold text-white">{party.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{party.id} — {party.role}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-200 text-xl leading-none">×</button>
        </div>
        <div className="p-6 space-y-5">
          {isBlocked && (
            <div className="flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl">
              <ShieldX className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-300 leading-relaxed">
                This party has a flagged or escalated status. Quote, send, and ship actions should be disabled until senior compliance review clears this record.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {[
              ["Party Name", party.name], ["Company", party.company],
              ["Country", party.country], ["Role", party.role],
              ["Related Request", party.request], ["Last Screened", party.lastScreened],
              ["Reviewed By", party.reviewedBy],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-xs text-slate-500 mb-1">{label}</div>
                <div className="text-sm text-white">{value || "—"}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-xs text-slate-500 mb-2">Screening Status</div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            >
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {party.triggers.length > 0 && (
            <div>
              <div className="text-xs text-slate-500 mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3 text-red-400" /> Active Risk Triggers</div>
              <div className="space-y-1">
                {party.triggers.map(tid => {
                  const t = RISK_TRIGGERS.find(r => r.id === tid);
                  return t ? (
                    <div key={tid} className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-300">
                      <AlertTriangle className="w-3 h-3 shrink-0" />{t.label}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs text-slate-500 mb-2">Review Notes</div>
            <textarea defaultValue={party.notes} rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none" />
          </div>

          <div>
            <div className="text-xs text-slate-500 mb-2">Required Next Action</div>
            <input defaultValue="Pending senior review confirmation" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
          </div>

          <div className="flex gap-3 pt-2">
            <button className="px-5 py-2.5 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400">Save Record</button>
            <button className="px-5 py-2.5 bg-red-500/15 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/25">Escalate</button>
            <button onClick={onClose} className="px-5 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700">Close</button>
          </div>

          <p className="text-xs text-slate-600 italic border-t border-slate-800 pt-3">
            This record is logged to the Audit Log with a timestamp and operator ID on save.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SanctionsScreening() {
  const [selected, setSelected] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const blocked = MOCK_PARTIES.filter(p => p.status === "Blocked / Do Not Proceed" || p.status === "Escalated" || p.status === "Possible Match Placeholder");
  const pending = MOCK_PARTIES.filter(p => p.status === "Pending Review" || p.status === "Not Screened");
  const cleared = MOCK_PARTIES.filter(p => p.status === "Cleared by Reviewer" || p.status === "No Match Placeholder");

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Sanctions / End-User Screening</h1>
        <p className="text-slate-400 mt-1 text-sm">Track party screening status across buyers, suppliers, importers, end users, and freight partners.</p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6">
        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-300 leading-relaxed">
          <span className="font-semibold">Screening placeholder — </span>
          Screening shown in this prototype is a placeholder workflow only. Final production screening requires approved data sources, backend integration, and human compliance review. No screening result in this system constitutes a legal compliance determination.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Escalated / Blocked", value: blocked.length, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
          { label: "Pending Review", value: pending.length, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
          { label: "Cleared", value: cleared.length, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: "Total Parties", value: MOCK_PARTIES.length, color: "text-slate-300", bg: "bg-slate-800 border-slate-700" },
        ].map(c => (
          <div key={c.label} className={`rounded-xl border p-4 ${c.bg}`}>
            <div className={`text-3xl font-bold ${c.color}`}>{c.value}</div>
            <div className="text-xs text-slate-400 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Risk Triggers Reference */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 mb-6">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Risk Trigger Flags
        </h3>
        <div className="flex flex-wrap gap-2">
          {RISK_TRIGGERS.map(t => (
            <span key={t.id} className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg text-xs">{t.label}</span>
          ))}
        </div>
      </div>

      {/* Blocked Warning */}
      {blocked.length > 0 && (
        <div className="flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl mb-6">
          <ShieldX className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-xs text-red-300 leading-relaxed">
            <span className="font-semibold">{blocked.length} part{blocked.length > 1 ? "ies" : "y"} flagged as Escalated, Possible Match, or Blocked.</span> Quote, send, and ship actions should be disabled in the UI placeholder unless senior review clears the flag.
          </p>
        </div>
      )}

      {/* Party Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-white text-sm">Screened Parties</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400"
          >
            <Plus className="w-3.5 h-3.5" /> Add Party
          </button>
        </div>

        {showAddForm && (
          <div className="px-5 py-4 border-b border-slate-800 bg-slate-800/50 grid sm:grid-cols-3 gap-3">
            <input placeholder="Party Name" className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500" />
            <input placeholder="Company Name" className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500" />
            <input placeholder="Country" className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500" />
            <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
            <input placeholder="Related Request (e.g. PR-0040)" className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500" />
            <button className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400">Add Party</button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="px-5 py-3 text-left">ID</th>
                <th className="px-5 py-3 text-left">Party</th>
                <th className="px-5 py-3 text-left">Country</th>
                <th className="px-5 py-3 text-left">Role</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Last Screened</th>
                <th className="px-5 py-3 text-left">Triggers</th>
                <th className="px-5 py-3 text-left">Request</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PARTIES.map(p => <PartyRow key={p.id} party={p} onSelect={setSelected} />)}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-600 italic">
        All screening status changes are recorded in the Audit Log with timestamp and operator record. Clearing or blocking a party requires senior reviewer confirmation.
      </p>

      {selected && <PartyDetailPanel party={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}