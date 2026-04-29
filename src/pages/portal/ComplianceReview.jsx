import React, { useState } from "react";
import { AlertTriangle, ExternalLink, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { savePortalEvent } from "@/services/local/requestStore";

const FLAGS = [
  { id: 1, product: "Surgical Gloves (PR-0040)", client: "MedSupply Colombo", riskCategory: "Medical / Chemical / Agricultural Review", flagReason: "Medical devices require SLS permit and IOR confirmation.", reviewer: "Unassigned", status: "New Flag", requiredVerification: "SLS permit, IOR confirmation letter, FDA compliance cert.", decision: "", notes: "", ref: "PR-0040" },
  { id: 2, product: "Air Compressors (PR-0041)", client: "Lanka Heavy Equip Ltd", riskCategory: "Unknown HS Code", flagReason: "HS code not confirmed. May affect duty calculation and export eligibility.", reviewer: "Ops Team", status: "Under Review", requiredVerification: "Confirm HS code with freight forwarder.", decision: "", notes: "Pending response from Atlas Industrial.", ref: "PR-0041" },
  { id: 3, product: "Electronics Bundle (PR-0038)", client: "Colombo General Traders", riskCategory: "Battery / Hazmat Review", flagReason: "Products include lithium batteries. Require hazmat shipping classification.", reviewer: "Ops Team", status: "Needs External Confirmation", requiredVerification: "Freight forwarder confirmation on hazmat classification.", decision: "", notes: "Waiting on Maersk hazmat desk.", ref: "PR-0038" },
  { id: 4, product: "Food Supplements (PR-0035)", client: "Lanka Heavy Equip Ltd", riskCategory: "Food / Cosmetic / Supplement Review", flagReason: "Dietary supplements may require SLS / health import permit.", reviewer: "Compliance Reviewer", status: "Cleared", requiredVerification: "Completed. SLS permit confirmed by buyer.", decision: "Cleared", notes: "Buyer submitted SLS permit. Approved for quoting.", ref: "PR-0035" },
  { id: 5, product: "Network Equipment (PR-0033)", client: "Gulf Trade Partners", riskCategory: "Restricted Product", flagReason: "Network encryption equipment may be subject to U.S. export controls (EAR).", reviewer: "Compliance Reviewer", status: "No-Go", requiredVerification: "Requires export license review.", decision: "No-Go", notes: "Export license not feasible for startup phase. No-Go confirmed.", ref: "PR-0033" },
];

const STATUS_STYLES = {
  "New Flag": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Under Review": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "Needs External Confirmation": "bg-orange-500/15 text-orange-400 border-orange-500/30",
  "Cleared": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "No-Go": "bg-red-500/15 text-red-400 border-red-500/30",
  "Escalated": "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export default function ComplianceReview() {
  const [selected, setSelected] = useState(FLAGS[0]);
  const [decision, setDecision] = useState("");
  const [notes, setNotes] = useState("");

  const submitDecision = () => {
    if (!decision) return;
    savePortalEvent("compliance-review-decision", {
      flagId: selected?.id,
      reference: selected?.ref,
      decision,
      notes,
      prototypeOnly: true,
    });
    toast.success("Compliance decision recorded locally.");
  };

  return (
    <div className="flex h-full">
      {/* List */}
      <div className="w-80 border-r border-slate-800 flex flex-col shrink-0">
        <div className="px-4 py-4 border-b border-slate-800">
          <h1 className="text-sm font-bold text-white mb-1">Compliance Review Queue</h1>
          <p className="text-xs text-slate-500">{FLAGS.filter(f => f.status === "New Flag" || f.status === "Under Review").length} items require attention</p>
        </div>
        <div className="overflow-y-auto flex-1">
          {FLAGS.map(f => (
            <button key={f.id} onClick={() => { setSelected(f); setDecision(""); setNotes(""); }} className={`w-full text-left px-4 py-3 border-b border-slate-800 hover:bg-slate-800 transition-colors ${selected?.id === f.id ? "bg-slate-800" : ""}`}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="text-xs font-medium text-white truncate">{f.product}</div>
                <span className={`text-xs px-1.5 py-0.5 rounded border shrink-0 ${STATUS_STYLES[f.status]}`}>{f.status}</span>
              </div>
              <div className="text-xs text-slate-500">{f.client}</div>
              <div className="text-xs text-orange-400/80 mt-0.5 truncate">{f.riskCategory}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      {selected && (
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h2 className="text-lg font-bold text-white">{selected.product}</h2>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLES[selected.status]}`}>{selected.status}</span>
                </div>
                <p className="text-slate-400 text-sm">{selected.client}</p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs hover:bg-slate-700">
                <ExternalLink className="w-3 h-3" /> Open Request
              </button>
            </div>

            {/* Flag Summary */}
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-5 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">{selected.riskCategory}</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">{selected.flagReason}</p>
              <div className="text-xs text-slate-500 mb-1">Required Verification</div>
              <p className="text-sm text-amber-300/80">{selected.requiredVerification}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-xs text-slate-500 mb-1">Assigned Reviewer</div>
                <div className="text-sm text-white">{selected.reviewer}</div>
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <div className="text-xs text-slate-500 mb-1">Audit Reference</div>
                <div className="text-sm font-mono text-slate-300">{selected.ref}</div>
              </div>
            </div>

            {selected.notes && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 mb-5">
                <div className="text-xs text-slate-500 mb-1">Internal Notes</div>
                <p className="text-sm text-slate-300">{selected.notes}</p>
              </div>
            )}

            {/* Human Decision */}
            {selected.status !== "Cleared" && selected.status !== "No-Go" && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 mb-5">
                <h3 className="text-xs font-semibold text-slate-300 mb-4 uppercase tracking-wider">Human Decision</h3>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {["Cleared", "No-Go", "Escalated", "Needs External Confirmation"].map(d => (
                    <button key={d} onClick={() => setDecision(d)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${decision === d ? STATUS_STYLES[d] : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"}`}>{d}</button>
                  ))}
                </div>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Decision notes..." rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none mb-3" />
                <button onClick={submitDecision} disabled={!decision} className="px-5 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed">Submit Decision</button>
              </div>
            )}

            {(selected.status === "Cleared" || selected.status === "No-Go") && (
              <div className={`rounded-xl border p-4 ${STATUS_STYLES[selected.status]}`}>
                <div className="flex items-center gap-2 mb-1">
                  {selected.status === "Cleared" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span className="text-sm font-semibold">Decision: {selected.decision}</span>
                </div>
                {selected.notes && <p className="text-xs mt-1 opacity-80">{selected.notes}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}