import React, { useState } from "react";
import { Bell, AlertTriangle, CheckCircle2, Clock, Plus, FileText, Info, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const TEMPLATES = [
  "Missing supplier quote",
  "Missing supplier invoice",
  "Missing product specs",
  "Missing buyer approval",
  "Missing payment confirmation",
  "Missing importer-of-record confirmation",
  "Missing commercial invoice",
  "Missing packing list",
  "Missing freight quote",
  "Missing permit confirmation",
];

const RESPONSIBLE_PARTIES = ["Buyer", "Supplier", "Internal Operator", "Freight Partner", "Customs Broker"];
const REMINDER_TYPES = ["Email", "SMS", "WhatsApp", "Internal Task"];
const STATUSES = ["Not Scheduled", "Scheduled Placeholder", "Sent Placeholder", "Follow-Up Needed", "Completed", "Cancelled"];

const STATUS_CONFIG = {
  "Not Scheduled":         { color: "bg-slate-700 text-slate-300 border-slate-600", icon: Clock },
  "Scheduled Placeholder": { color: "bg-blue-500/15 text-blue-400 border-blue-500/30", icon: Clock },
  "Sent Placeholder":      { color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30", icon: Bell },
  "Follow-Up Needed":      { color: "bg-orange-500/15 text-orange-400 border-orange-500/30", icon: AlertTriangle },
  "Completed":             { color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", icon: CheckCircle2 },
  "Cancelled":             { color: "bg-slate-700 text-slate-500 border-slate-600", icon: Clock },
};

const MOCK_REMINDERS = [
  {
    id: "REM-001", request: "PR-0040", document: "Missing importer-of-record confirmation",
    party: "Buyer", type: "Email", status: "Follow-Up Needed",
    dueDate: "2026-04-30", lastReminder: "2026-04-26", nextReminder: "2026-04-29",
    notes: "Buyer has not responded. Follow up required.",
  },
  {
    id: "REM-002", request: "PR-0041", document: "Missing freight quote",
    party: "Freight Partner", type: "Internal Task", status: "Scheduled Placeholder",
    dueDate: "2026-05-02", lastReminder: "—", nextReminder: "2026-04-29",
    notes: "Waiting on Maersk quote for compressor shipment.",
  },
  {
    id: "REM-003", request: "PR-0038", document: "Missing supplier invoice",
    party: "Supplier", type: "Email", status: "Sent Placeholder",
    dueDate: "2026-04-28", lastReminder: "2026-04-26", nextReminder: "2026-04-28",
    notes: "First reminder sent. Awaiting response.",
  },
  {
    id: "REM-004", request: "PR-0035", document: "Missing product specs",
    party: "Buyer", type: "WhatsApp", status: "Not Scheduled",
    dueDate: "2026-05-05", lastReminder: "—", nextReminder: "—",
    notes: "Spec sheet not yet uploaded.",
  },
  {
    id: "REM-005", request: "PR-0033", document: "Missing permit confirmation",
    party: "Buyer", type: "Email", status: "Completed",
    dueDate: "2026-04-22", lastReminder: "2026-04-21", nextReminder: "—",
    notes: "Permit confirmed and uploaded.",
  },
];

const MISSING_DOCS_PANEL = {
  required: ["Commercial Invoice", "Packing List", "SLS Import Permit", "Importer-of-Record Confirmation", "Freight Quote", "Product Spec Sheet"],
  uploaded: ["Commercial Invoice", "Product Spec Sheet"],
  missing: ["Packing List", "SLS Import Permit", "Importer-of-Record Confirmation", "Freight Quote"],
  overdue: ["SLS Import Permit", "Importer-of-Record Confirmation"],
  underReview: [],
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Not Scheduled"];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium ${cfg.color}`}>
      <Icon className="w-3 h-3" />{status}
    </span>
  );
}

export default function DocumentReminders() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const overdue = MOCK_REMINDERS.filter(r => r.status === "Follow-Up Needed" || r.dueDate <= "2026-04-28");
  const pending = MOCK_REMINDERS.filter(r => ["Scheduled Placeholder", "Sent Placeholder", "Not Scheduled"].includes(r.status));
  const completed = MOCK_REMINDERS.filter(r => r.status === "Completed");

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Document Reminders</h1>
        <p className="text-slate-400 mt-1 text-sm">Track missing documents and manage placeholder reminder workflows.</p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6">
        <Info className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-300 leading-relaxed">
          <span className="font-semibold">Reminder automation placeholder — </span>
          Final email, SMS, or WhatsApp reminders require backend integration and human-approved message settings. No reminders are sent automatically in this prototype.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Follow-Up Needed", value: overdue.length, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
          { label: "Pending / Scheduled", value: pending.length, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
          { label: "Completed", value: completed.length, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: "Total Reminders", value: MOCK_REMINDERS.length, color: "text-slate-300", bg: "bg-slate-800 border-slate-700" },
        ].map(c => (
          <div key={c.label} className={`rounded-xl border p-4 ${c.bg}`}>
            <div className={`text-3xl font-bold ${c.color}`}>{c.value}</div>
            <div className="text-xs text-slate-400 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Missing Documents Panel */}
        <div className="lg:col-span-1 bg-slate-900 rounded-xl border border-slate-800 p-5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-amber-400" /> Missing Documents Panel
          </h3>
          <p className="text-xs text-slate-500 mb-3">PR-0040 — Surgical Gloves</p>
          <div className="space-y-3">
            {[
              { label: "Required", docs: MISSING_DOCS_PANEL.required, color: "text-slate-400" },
              { label: "Uploaded ✓", docs: MISSING_DOCS_PANEL.uploaded, color: "text-emerald-400" },
              { label: "Missing", docs: MISSING_DOCS_PANEL.missing, color: "text-red-400" },
              { label: "Overdue !", docs: MISSING_DOCS_PANEL.overdue, color: "text-orange-400" },
            ].map(group => (
              <div key={group.label}>
                <div className={`text-xs font-semibold mb-1 ${group.color}`}>{group.label}</div>
                <ul className="space-y-1">
                  {group.docs.map(d => (
                    <li key={d} className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">{d}</span>
                      {(group.label === "Missing" || group.label === "Overdue !") && (
                        <button className="text-amber-400 hover:text-amber-300 text-[10px] font-medium">+ Task</button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800">
            <Link to="/portal/documents" className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300">
              <ExternalLink className="w-3 h-3" /> Open Document Library
            </Link>
          </div>
        </div>

        {/* Reminder Templates */}
        <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-5">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-amber-400" /> Reminder Templates
          </h3>
          <div className="flex flex-wrap gap-2 mb-5">
            {TEMPLATES.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTemplate(t)}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${selectedTemplate === t ? "bg-amber-500/15 border-amber-500/30 text-amber-400" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {selectedTemplate && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <div className="text-xs font-semibold text-white mb-3">{selectedTemplate}</div>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Related Request</div>
                  <input defaultValue="PR-0040" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Responsible Party</div>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
                    {RESPONSIBLE_PARTIES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Reminder Type</div>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
                    {REMINDER_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Due Date</div>
                  <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
                </div>
              </div>
              <textarea placeholder="Reminder notes..." rows={2} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none mb-3" />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400">Schedule Reminder (Placeholder)</button>
                <button className="px-4 py-2 bg-slate-700 border border-slate-600 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-600">Create Follow-Up Task</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reminder Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-white text-sm">Active Reminders</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400"
          >
            <Plus className="w-3.5 h-3.5" /> New Reminder
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="px-5 py-3 text-left">ID</th>
                <th className="px-5 py-3 text-left">Request</th>
                <th className="px-5 py-3 text-left">Missing Document</th>
                <th className="px-5 py-3 text-left">Party</th>
                <th className="px-5 py-3 text-left">Type</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Due</th>
                <th className="px-5 py-3 text-left">Next Reminder</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_REMINDERS.map(r => (
                <tr key={r.id} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3 font-mono text-slate-400">{r.id}</td>
                  <td className="px-5 py-3 font-mono text-amber-400">{r.request}</td>
                  <td className="px-5 py-3 text-slate-300">{r.document}</td>
                  <td className="px-5 py-3 text-slate-400">{r.party}</td>
                  <td className="px-5 py-3 text-slate-400">{r.type}</td>
                  <td className="px-5 py-3"><StatusBadge status={r.status} /></td>
                  <td className={`px-5 py-3 font-medium ${r.dueDate <= "2026-04-28" && r.status !== "Completed" ? "text-red-400" : "text-slate-300"}`}>{r.dueDate}</td>
                  <td className="px-5 py-3 text-slate-400">{r.nextReminder}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button className="text-amber-400 hover:text-amber-300 text-[10px] font-medium">Edit</button>
                      <button className="text-emerald-400 hover:text-emerald-300 text-[10px] font-medium">Mark Done</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-600 italic">
        All reminder events (scheduled, sent, follow-up, completed) are recorded in the Audit Log with timestamp and operator record.
      </p>
    </div>
  );
}