import React, { useState } from "react";
import { Search, Plus, Star, ExternalLink } from "lucide-react";

const SUPPLIERS = [
  { id: 1, name: "MedLine Industries", contact: "James Carter", email: "jcarter@medline.com", phone: "+1 800 633 5463", website: "medline.com", categories: ["Medical Supplies", "PPE"], reliability: "Good", moq: "500 units", leadTime: "10–14 days", status: "Active", notes: "Verified FDA-registered distributor. Fast response on RFQ. Good pricing on bulk PPE." },
  { id: 2, name: "Atlas Industrial Supply", contact: "Maria Gonzalez", email: "mgonzalez@atlasind.com", phone: "+1 713 555 0178", website: "atlasind.com", categories: ["Industrial Machinery", "Air Compressors"], reliability: "Preferred", moq: "1 unit", leadTime: "21–30 days", status: "Preferred", notes: "Reliable for heavy equipment. Provides full documentation package. Preferred partner for industrial sourcing." },
  { id: 3, name: "FastPack USA", contact: "Derek Nguyen", email: "derek@fastpackusa.com", phone: "+1 469 555 0234", website: "fastpackusa.com", categories: ["Packaging", "Office Supplies"], reliability: "Good", moq: "100 units", leadTime: "5–7 days", status: "Active", notes: "Quick turnaround. Good for low-complexity sourcing." },
  { id: 4, name: "TechSource Direct", contact: "Amy Lin", email: "amy@techsourcedirect.com", phone: "+1 312 555 0109", website: "techsourcedirect.com", categories: ["Electronics", "Consumer Tech"], reliability: "New", moq: "50 units", leadTime: "14–21 days", status: "Under Review", notes: "New contact. Requires vetting. Battery electronics — add to caution review queue." },
  { id: 5, name: "Delta Chemical Co.", contact: "Robert Haines", email: "rhaines@deltachem.com", phone: "+1 281 555 0066", website: "deltachem.com", categories: ["Chemicals", "Industrial Supplies"], reliability: "Watchlist", moq: "200 kg", leadTime: "30 days", status: "Under Review", notes: "Chemical products require specialist review before any order. Do not proceed without compliance check." },
];

const RELIABILITY_COLORS = { "New": "text-slate-400", "Good": "text-emerald-400", "Preferred": "text-amber-400", "Watchlist": "text-yellow-400", "Do Not Use": "text-red-400" };
const STATUS_STYLES = { "Active": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", "Preferred": "bg-amber-500/10 text-amber-400 border-amber-500/20", "Under Review": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", "Rejected": "bg-red-500/10 text-red-400 border-red-500/20", "Do Not Use": "bg-red-900/40 text-red-300 border-red-500/30" };

export default function SupplierManagement() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(SUPPLIERS[0]);
  const filtered = SUPPLIERS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.categories.some(c => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-slate-800 flex flex-col shrink-0">
        <div className="px-4 py-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-sm font-bold text-white">Supplier Management</h1>
            <button className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25"><Plus className="w-3.5 h-3.5" /></button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search suppliers..." className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500" />
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {filtered.map(s => (
            <button key={s.id} onClick={() => setSelected(s)} className={`w-full text-left px-4 py-3 border-b border-slate-800 hover:bg-slate-800 transition-colors ${selected?.id === s.id ? "bg-slate-800" : ""}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{s.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.categories.join(", ")}</div>
                  <div className={`text-xs mt-0.5 font-medium ${RELIABILITY_COLORS[s.reliability]}`}>{s.reliability}</div>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded border shrink-0 ${STATUS_STYLES[s.status]}`}>{s.status}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_STYLES[selected.status]}`}>{selected.status}</span>
                </div>
                <p className="text-slate-400 text-sm">{selected.website} · {selected.contact}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                ["Email", selected.email], ["Phone", selected.phone],
                ["MOQ", selected.moq], ["Lead Time", selected.leadTime],
              ].map(([label, value]) => (
                <div key={label} className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <div className="text-xs text-slate-500 mb-1">{label}</div>
                  <div className="text-sm text-white font-medium">{value}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 mb-4">
              <div className="text-xs text-slate-500 mb-2">Product Categories</div>
              <div className="flex flex-wrap gap-2">
                {selected.categories.map(c => (
                  <span key={c} className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">{c}</span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className={`w-3.5 h-3.5 ${RELIABILITY_COLORS[selected.reliability]}`} />
                <div className="text-xs text-slate-500">Reliability: <span className={`font-semibold ${RELIABILITY_COLORS[selected.reliability]}`}>{selected.reliability}</span></div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{selected.notes}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-700 flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5" /> Past Quotes</button>
              <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-700">Outreach History</button>
              <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-700">Selected / Rejected</button>
              <button className="px-4 py-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-lg text-xs font-medium hover:bg-amber-500/25">Edit Supplier</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}