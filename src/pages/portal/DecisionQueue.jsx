import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const QUEUE = [
  { id: "PR-0041", product: "Industrial Air Compressors", company: "Lanka Heavy Equip Ltd", direction: "US→LK", aiRec: "Go", confidence: 88, reviewed: false },
  { id: "PR-0040", product: "Surgical Gloves (Latex-Free)", company: "MedSupply Colombo", direction: "US→LK", aiRec: "Caution", confidence: 72, reviewed: false },
  { id: "PR-0039", product: "Ceylon Cinnamon Extract", company: "Spice Routes Inc.", direction: "LK→US", aiRec: "Go", confidence: 91, reviewed: false },
  { id: "PR-0038", product: "Power Tools (Dewalt Bundle)", company: "ProBuild Kandy", direction: "US→LK", aiRec: "Go", confidence: 85, reviewed: true, finalDecision: "Go" },
  { id: "PR-0037", product: "Lithium Battery Cells", company: "EcoPower Lanka", direction: "US→LK", aiRec: "No-Go", confidence: 94, reviewed: true, finalDecision: "No-Go", reason: "Regulated dangerous goods — requires special certification not available." },
];

const recIcon = { "Go": CheckCircle, "Caution": AlertTriangle, "No-Go": XCircle };
const recColors = {
  "Go": "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  "Caution": "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  "No-Go": "text-red-400 bg-red-500/10 border-red-500/30",
};

export default function DecisionQueue() {
  const [decisions, setDecisions] = useState({});
  const [reasons, setReasons] = useState({});

  const setDecision = (id, val) => setDecisions((d) => ({ ...d, [id]: val }));
  const setReason = (id, val) => setReasons((r) => ({ ...r, [id]: val }));

  const pending = QUEUE.filter((q) => !q.reviewed);
  const completed = QUEUE.filter((q) => q.reviewed);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Go / Caution / No-Go Decision Queue</h1>
        <p className="text-slate-400 mt-1 text-sm">Review AI-assisted recommendations and make final human decisions before proceeding.</p>
      </div>

      {/* Pending */}
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Awaiting Human Review ({pending.length})</h2>
      <div className="space-y-4 mb-10">
        {pending.map((item) => {
          const Icon = recIcon[item.aiRec];
          const d = decisions[item.id];
          return (
            <div key={item.id} className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs text-slate-500">{item.id}</span>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">{item.direction}</span>
                  </div>
                  <h3 className="font-semibold text-white text-lg">{item.product}</h3>
                  <p className="text-sm text-slate-400">{item.company}</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${recColors[item.aiRec]}`}>
                  <Icon className="w-4 h-4" />
                  <div>
                    <div className="text-xs opacity-60">AI Recommendation</div>
                    <div className="font-bold text-sm">{item.aiRec}</div>
                    <div className="text-xs opacity-60">{item.confidence}% confidence</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {["Go", "Caution", "No-Go"].map((dec) => (
                  <button
                    key={dec}
                    onClick={() => setDecision(item.id, dec)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                      d === dec
                        ? dec === "Go" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                          : dec === "Caution" ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                          : "bg-red-500/20 border-red-500 text-red-400"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    {dec}
                  </button>
                ))}
                <Link to={`/portal/requests/${item.id}/feasibility`} className="ml-auto px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-sm hover:bg-blue-500/20 transition-colors">
                  Full Review →
                </Link>
              </div>

              {(d === "Caution" || d === "No-Go") && (
                <textarea
                  value={reasons[item.id] || ""}
                  onChange={(e) => setReason(item.id, e.target.value)}
                  placeholder="Reason / verification required before proceeding..."
                  rows={2}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none mb-3"
                />
              )}

              {d && (
                <button className="px-5 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400">
                  Confirm Decision: {d}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Completed */}
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Completed ({completed.length})</h2>
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <th className="px-5 py-3 text-left">ID</th>
              <th className="px-5 py-3 text-left">Product</th>
              <th className="px-5 py-3 text-left">AI Rec</th>
              <th className="px-5 py-3 text-left">Final Decision</th>
              <th className="px-5 py-3 text-left">Reason</th>
            </tr>
          </thead>
          <tbody>
            {completed.map((item) => {
              const Icon = recIcon[item.finalDecision];
              return (
                <tr key={item.id} className="border-b border-slate-800/50">
                  <td className="px-5 py-3 font-mono text-xs text-slate-400">{item.id}</td>
                  <td className="px-5 py-3 text-white text-sm">{item.product}</td>
                  <td className={`px-5 py-3 text-xs font-semibold ${
                    item.aiRec === "Go" ? "text-emerald-400" : item.aiRec === "Caution" ? "text-yellow-400" : "text-red-400"
                  }`}>{item.aiRec}</td>
                  <td className="px-5 py-3">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${
                      item.finalDecision === "Go" ? "text-emerald-400" : item.finalDecision === "Caution" ? "text-yellow-400" : "text-red-400"
                    }`}>
                      {Icon && <Icon className="w-3.5 h-3.5" />} {item.finalDecision}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-400 max-w-xs">{item.reason || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}