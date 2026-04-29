import React, { useState } from "react";
import { XCircle, Lock, AlertTriangle, ShieldAlert } from "lucide-react";

export default function NoGoOverridePanel({ productName, reason, onClose }) {
  const [overrideRequested, setOverrideRequested] = useState(false);
  const [overrideReason, setOverrideReason] = useState("");
  const [complianceNote, setComplianceNote] = useState("");
  const [seniorApproval, setSeniorApproval] = useState("");

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
      {/* Header */}
      <div className="flex items-start gap-3 mb-5">
        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-red-400 text-sm">No-Go — Black Category Product</div>
          <div className="text-xs text-slate-400 mt-1">{productName}</div>
          {reason && <div className="text-xs text-red-400/70 mt-1">Reason: {reason}</div>}
        </div>
      </div>

      <div className="px-4 py-3 bg-slate-900 rounded-lg border border-slate-800 mb-5">
        <p className="text-xs text-slate-400 leading-relaxed">
          This product is classified as <span className="text-red-400 font-semibold">No-Go</span> under current product risk rules.
          Do not quote, source, or proceed. Human override is <span className="text-red-400 font-semibold">disabled by default</span>.
          Senior approval and a written compliance note are required to request an override review.
        </p>
      </div>

      {/* Override Status */}
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-4 h-4 text-slate-500" />
        <span className="text-xs text-slate-500 font-medium">Override: <span className="text-red-400">Disabled by Default</span></span>
      </div>

      {!overrideRequested ? (
        <button
          onClick={() => setOverrideRequested(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs font-medium hover:bg-slate-700 hover:text-slate-200 transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Request Senior Override Review
        </button>
      ) : (
        <div className="space-y-4 border-t border-slate-800 pt-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs text-amber-400">Override request initiated. All fields required. Entry will be permanently logged.</span>
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1">Senior Approver Name / ID</label>
            <input
              value={seniorApproval}
              onChange={e => setSeniorApproval(e.target.value)}
              placeholder="Name of senior approver authorizing this review..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1">Override Reason <span className="text-red-400">*</span></label>
            <textarea
              value={overrideReason}
              onChange={e => setOverrideReason(e.target.value)}
              placeholder="Provide a specific, documented reason why this product should be reconsidered..."
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 block mb-1">Compliance Note <span className="text-red-400">*</span></label>
            <textarea
              value={complianceNote}
              onChange={e => setComplianceNote(e.target.value)}
              placeholder="Attach compliance documentation reference, legal advisor note, or customs broker confirmation..."
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              disabled={!overrideReason.trim() || !complianceNote.trim() || !seniorApproval.trim()}
              className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit for Senior Review
            </button>
            <button
              onClick={() => setOverrideRequested(false)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs hover:bg-slate-700"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-slate-600">This request will be logged with timestamp, operator record, and all entered details.</p>
        </div>
      )}
    </div>
  );
}