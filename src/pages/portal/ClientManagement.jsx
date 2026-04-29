import React, { useState } from "react";
import { Search, Plus, ExternalLink } from "lucide-react";

const CLIENTS = [
  { id: 1, company: "MedSupply Colombo", contact: "Dr. Nimal Perera", country: "Sri Lanka", email: "nimal@medsupply.lk", phone: "+94 77 123 4567", type: "Sri Lanka Buyer", ior: "Confirmed", payment: "Good Standing", activeRequests: 2, lastContacted: "2026-04-25", status: "Active", riskNotes: "Registered medical importer. SLS permit required for medical goods." },
  { id: 2, company: "Lanka Heavy Equip Ltd", contact: "Roshan Mendis", country: "Sri Lanka", email: "roshan@lankaheavy.lk", phone: "+94 11 456 7890", type: "Sri Lanka Buyer", ior: "Needs Review", payment: "Deposit Required", activeRequests: 1, lastContacted: "2026-04-20", status: "Active", riskNotes: "New account. Requesting large industrial equipment. Verify IOR and payment terms before quoting." },
  { id: 3, company: "Gulf Trade Partners", contact: "Ahmed Al-Rashid", country: "UAE", email: "ahmed@gulftrade.ae", phone: "+971 50 987 6543", type: "Trade Partner", ior: "Not Required", payment: "Good Standing", activeRequests: 0, lastContacted: "2026-03-10", status: "Active", riskNotes: "Referral partner. Review before new trade lane expansion." },
  { id: 4, company: "Nexus Wholesale USA", contact: "Sarah Kim", country: "United States", email: "sarah@nexuswholesale.com", phone: "+1 713 555 0182", type: "U.S. Wholesale Buyer", ior: "Not Required", payment: "Good Standing", activeRequests: 0, lastContacted: "2026-02-28", status: "Active", riskNotes: "" },
  { id: 5, company: "Colombo General Traders", contact: "Priya Jayasuriya", country: "Sri Lanka", email: "priya@cgt.lk", phone: "+94 77 321 0987", type: "Sri Lanka Buyer", ior: "Not Confirmed", payment: "Prepayment Required", activeRequests: 1, lastContacted: "2026-04-15", status: "Active", riskNotes: "Has not confirmed importer status. Require IOR confirmation and prepayment before any order." },
];

const IOR_COLORS = { "Confirmed": "text-emerald-400", "Not Confirmed": "text-red-400", "Not Required": "text-slate-400", "Needs Review": "text-yellow-400" };
const PAYMENT_COLORS = { "Good Standing": "text-emerald-400", "Deposit Required": "text-yellow-400", "Prepayment Required": "text-orange-400", "Past Due": "text-red-400", "Hold": "text-red-500" };
const STATUS_COLORS = { "Active": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", "Suspended": "bg-red-500/10 text-red-400 border-red-500/20", "Inactive": "bg-slate-700 text-slate-400 border-slate-600" };

export default function ClientManagement() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(CLIENTS[0]);
  const filtered = CLIENTS.filter(c =>
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full">
      {/* List Panel */}
      <div className="w-80 border-r border-slate-800 flex flex-col shrink-0">
        <div className="px-4 py-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-sm font-bold text-white">Client Management</h1>
            <button className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25"><Plus className="w-3.5 h-3.5" /></button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..." className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500" />
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {filtered.map(c => (
            <button key={c.id} onClick={() => setSelected(c)} className={`w-full text-left px-4 py-3 border-b border-slate-800 hover:bg-slate-800 transition-colors ${selected?.id === c.id ? "bg-slate-800" : ""}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{c.company}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{c.contact} · {c.country}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{c.type}</div>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded border shrink-0 ${STATUS_COLORS[c.status]}`}>{c.status}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-white">{selected.company}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[selected.status]}`}>{selected.status}</span>
                </div>
                <p className="text-slate-400 text-sm">{selected.type} · {selected.country}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                ["Contact", selected.contact], ["Email", selected.email],
                ["Phone / WhatsApp", selected.phone], ["Buyer Type", selected.type],
                ["Last Contacted", selected.lastContacted], ["Active Requests", selected.activeRequests],
              ].map(([label, value]) => (
                <div key={label} className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <div className="text-xs text-slate-500 mb-1">{label}</div>
                  <div className="text-sm text-white font-medium">{value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-xs text-slate-500 mb-1">Importer-of-Record Status</div>
                <div className={`text-sm font-semibold ${IOR_COLORS[selected.ior]}`}>{selected.ior}</div>
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-xs text-slate-500 mb-1">Payment Status</div>
                <div className={`text-sm font-semibold ${PAYMENT_COLORS[selected.payment]}`}>{selected.payment}</div>
              </div>
            </div>

            {selected.riskNotes && (
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 mb-6">
                <div className="text-xs text-yellow-400 font-semibold mb-1">Risk Notes</div>
                <p className="text-sm text-slate-300 leading-relaxed">{selected.riskNotes}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-700 flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5" /> Active Requests</button>
              <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-700">Past Quotes</button>
              <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-700">Importer Profile</button>
              <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-700">Payment Notes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}