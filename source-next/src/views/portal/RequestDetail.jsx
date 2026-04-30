"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, FileText, MessageSquare, Clock, Brain } from "lucide-react";
import ActivityTimeline from "../../components/portal/ActivityTimeline";

const MOCK = {
  id: "PR-0040",
  product: "Surgical Gloves (Latex-Free)",
  category: "Medical Supplies",
  direction: "US→LK",
  company: "MedSupply Colombo",
  contactName: "Dr. Nimal Perera",
  email: "nimal@medsupply.lk",
  phone: "+94 77 123 4567",
  quantity: "50,000 units",
  unitCostEst: "$0.18",
  resalePriceEst: "$0.35",
  destination: "Gampaha, Sri Lanka",
  timeline: "45–60 days",
  status: "Caution",
  riskLevel: "Medium",
  notes: "Buyer requires FDA-compliant, ASTM D6319-certified gloves. Packaging must include Sri Lanka SLS marking.",
  specs: "ASTM D6319, FDA 510(k) compliant, powder-free, 100/box, sizes S/M/L, blue nitrile preferred.",
  uploadedFiles: ["spec_sheet_gloves.pdf", "SLS_requirements.docx"],
  internalNotes: "Need to verify SLS import permit status. Check if buyer is registered as medical importer.",
  timeline_events: [
    { date: "2026-04-26", event: "Request submitted", actor: "Buyer portal" },
    { date: "2026-04-26", event: "Auto-screened — Caution flagged", actor: "AI Pre-Screen" },
    { date: "2026-04-27", event: "Assigned to feasibility review", actor: "Ops Team" },
  ],
};

export default function RequestDetail() {
  const params = useParams();
  const id = params?.id;
  const req = MOCK;
  const [note, setNote] = useState("");

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/portal/requests" className="flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Inbox
        </Link>
        <span className="text-slate-700">|</span>
        <span className="font-mono text-xs text-slate-400">{req.id}</span>
        <span className={`ml-auto text-xs px-2 py-1 rounded-full border font-medium ${
          req.status === "Caution" ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" : "bg-slate-700 text-slate-300 border-slate-600"
        }`}>{req.status}</span>
      </div>

      <h1 className="text-2xl font-bold text-white mb-1">{req.product}</h1>
      <p className="text-slate-400 text-sm mb-8">{req.category} — <span className="font-mono text-slate-300">{req.direction}</span></p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Buyer Details */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-4">Buyer / Company</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["Company", req.company], ["Contact", req.contactName],
                ["Email", req.email], ["Phone", req.phone],
                ["Destination", req.destination], ["Timeline", req.timeline],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-xs text-slate-500 mb-1">{label}</div>
                  <div className="text-sm text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-4">Product Details</h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {[
                ["Est. Quantity", req.quantity],
                ["Est. Unit Cost", req.unitCostEst],
                ["Est. Resale Price", req.resalePriceEst],
              ].map(([label, value]) => (
                <div key={label} className="bg-slate-800 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1">{label}</div>
                  <div className="text-lg font-bold text-amber-400">{value}</div>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <div className="text-xs text-slate-500 mb-1">Notes / Request Details</div>
              <p className="text-sm text-slate-300 leading-relaxed">{req.notes}</p>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Specifications</div>
              <p className="text-sm text-slate-300 leading-relaxed">{req.specs}</p>
            </div>
          </div>

          {/* Uploaded Files */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-4">Uploaded Files</h3>
            {req.uploadedFiles.map((f) => (
              <div key={f} className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-slate-300">{f}</span>
                <button className="ml-auto text-xs text-amber-400 hover:text-amber-300">Download</button>
              </div>
            ))}
          </div>

          {/* Activity Timeline */}
          <ActivityTimeline />

          {/* Internal Notes */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Internal Notes
            </h3>
            <div className="bg-slate-800 rounded-lg p-3 mb-3">
              <p className="text-sm text-slate-300">{req.internalNotes}</p>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add an internal note..."
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
            />
            <button className="mt-2 px-4 py-1.5 bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold hover:bg-amber-400">Add Note</button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-4">Actions</h3>
            <div className="space-y-2">
              <Link href={`/portal/requests/${req.id}/feasibility`} className="flex items-center gap-2 w-full px-4 py-2.5 bg-blue-500/15 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/25 transition-colors">
                <Brain className="w-4 h-4" /> Start Feasibility Review
              </Link>
              <Link href="/portal/clients" className="flex items-center gap-2 w-full px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
                View Client
              </Link>
              <Link href="/portal/importer-profiles" className="flex items-center gap-2 w-full px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
                View Importer Profile
              </Link>
              <Link href="/portal/compliance-review" className="flex items-center gap-2 w-full px-4 py-2.5 bg-orange-500/15 border border-orange-500/30 text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-500/25 transition-colors">
                Open Compliance Review
              </Link>
              <Link href="/portal/documents" className="flex items-center gap-2 w-full px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
                View Documents
              </Link>
              <Link href="/portal/tasks" className="flex items-center gap-2 w-full px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
                View Tasks
              </Link>
            </div>
          </div>

          {/* Risk Snapshot */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-4">Risk Snapshot</h3>
            <div className="space-y-2">
              {[
                ["Risk Level", req.riskLevel, "text-yellow-400"],
                ["Trade Direction", req.direction, "text-slate-300"],
                ["AI Pre-Screen", "Caution", "text-yellow-400"],
              ].map(([label, value, color]) => (
                <div key={label} className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{label}</span>
                  <span className={`font-semibold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Status Timeline
            </h3>
            <div className="space-y-3">
              {req.timeline_events.map((ev, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                    {i < req.timeline_events.length - 1 && <div className="w-px flex-1 bg-slate-700 mt-1" />}
                  </div>
                  <div className="pb-3">
                    <div className="text-xs text-white font-medium">{ev.event}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{ev.date} · {ev.actor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}