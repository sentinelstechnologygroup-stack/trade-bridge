"use client";
import React, { useState } from "react";
import { Plus, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const PROFILES = [
  {
    id: 1, client: "MedSupply Colombo", contact: "Dr. Nimal Perera", ior: "Confirmed",
    broker: "Sri Lanka Customs Brokers Ltd — Colombo", permitStatus: "Confirmed",
    port: "Port of Colombo", dutiesAccepted: true, paymentAccepted: true,
    localReg: "Registered with NMRA as licensed medical importer. SLS certification required for medical devices.",
    riskNotes: "Verified. Low financial risk. Regulatory scrutiny high for medical category.", lastVerified: "2026-04-10",
    requiredDocs: ["Commercial Invoice", "Packing List", "FDA Certificate of Conformance", "SLS Import Permit", "Certificate of Origin"],
    readiness: { ior: true, broker: true, duties: true, permit: true, payment: true },
  },
  {
    id: 2, client: "Lanka Heavy Equip Ltd", contact: "Roshan Mendis", ior: "Needs Review",
    broker: "Not confirmed", permitStatus: "Pending Confirmation",
    port: "Port of Colombo", dutiesAccepted: false, paymentAccepted: false,
    localReg: "No confirmed local registration on file. New account.",
    riskNotes: "IOR unconfirmed. Broker not named. Duties responsibility not accepted. Do not proceed without full verification.", lastVerified: "Pending",
    requiredDocs: ["Commercial Invoice", "Packing List", "Certificate of Origin", "IOR Confirmation Letter"],
    readiness: { ior: false, broker: false, duties: false, permit: false, payment: false },
  },
];

const PERMIT_COLORS = { "Confirmed": "text-emerald-400", "Pending Confirmation": "text-yellow-400", "Missing": "text-red-400", "Not Required": "text-slate-400", "Unknown": "text-slate-500" };
const IOR_COLORS = { "Confirmed": "text-emerald-400", "Needs Review": "text-yellow-400", "Not Confirmed": "text-red-400", "Not Required": "text-slate-400" };

function ReadinessItem({ label, ok }) {
  return (
    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border ${ok ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"}`}>
      {ok ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />}
      <span className={`text-xs font-medium ${ok ? "text-emerald-300" : "text-red-300"}`}>{label}</span>
    </div>
  );
}

export default function ImporterProfiles() {
  const [selected, setSelected] = useState(PROFILES[0]);

  return (
    <div className="flex h-full">
      <div className="w-72 border-r border-slate-800 flex flex-col shrink-0">
        <div className="px-4 py-4 border-b border-slate-800">
          <h1 className="text-sm font-bold text-white mb-3">Importer Profiles</h1>
          <button className="w-full flex items-center gap-2 px-3 py-2 bg-amber-500/15 border border-amber-500/20 text-amber-400 rounded-lg text-xs font-medium hover:bg-amber-500/25"><Plus className="w-3.5 h-3.5" /> Add Profile</button>
        </div>
        <div className="overflow-y-auto flex-1">
          {PROFILES.map(p => {
            const score = Object.values(p.readiness).filter(Boolean).length;
            return (
              <button key={p.id} onClick={() => setSelected(p)} className={`w-full text-left px-4 py-3 border-b border-slate-800 hover:bg-slate-800 transition-colors ${selected?.id === p.id ? "bg-slate-800" : ""}`}>
                <div className="text-sm font-medium text-white">{p.client}</div>
                <div className="text-xs text-slate-500 mt-0.5">{p.contact}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 bg-slate-700 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${score === 5 ? "bg-emerald-500" : score >= 3 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${(score / 5) * 100}%` }} />
                  </div>
                  <span className="text-xs text-slate-500">{score}/5</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-1">{selected.client}</h2>
            <p className="text-slate-400 text-sm mb-6">{selected.contact} · {selected.port}</p>

            {/* Readiness Score */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 mb-6">
              <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-3">Importer Readiness</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <ReadinessItem label="Importer Confirmed" ok={selected.readiness.ior} />
                <ReadinessItem label="Broker Info Available" ok={selected.readiness.broker} />
                <ReadinessItem label="Duties Responsibility Accepted" ok={selected.readiness.duties} />
                <ReadinessItem label="Permit Status Confirmed" ok={selected.readiness.permit} />
                <ReadinessItem label="Payment Terms Accepted" ok={selected.readiness.payment} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-xs text-slate-500 mb-1">Importer of Record</div>
                <div className={`text-sm font-semibold ${IOR_COLORS[selected.ior]}`}>{selected.ior}</div>
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-xs text-slate-500 mb-1">Permit Status</div>
                <div className={`text-sm font-semibold ${PERMIT_COLORS[selected.permitStatus]}`}>{selected.permitStatus}</div>
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-xs text-slate-500 mb-1">Customs Broker</div>
                <div className="text-sm text-white">{selected.broker}</div>
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-xs text-slate-500 mb-1">Last Verified</div>
                <div className="text-sm text-white">{selected.lastVerified}</div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 mb-4">
              <div className="text-xs text-slate-500 mb-2">Local Registration Notes</div>
              <p className="text-sm text-slate-300 leading-relaxed">{selected.localReg}</p>
            </div>

            {selected.riskNotes && (
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                  <div className="text-xs text-yellow-400 font-semibold">Risk Notes</div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{selected.riskNotes}</p>
              </div>
            )}

            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 mb-6">
              <div className="text-xs text-slate-500 mb-2">Required Documents</div>
              <div className="flex flex-wrap gap-2">
                {selected.requiredDocs.map(d => (
                  <span key={d} className="text-xs px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-full text-slate-300">{d}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400">Edit Profile</button>
              <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs hover:bg-slate-700">View Related Requests</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}