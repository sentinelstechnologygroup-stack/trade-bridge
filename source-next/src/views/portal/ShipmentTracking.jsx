"use client";
import React, { useState } from "react";
import { AlertTriangle, CheckCircle, Clock, Info } from "lucide-react";

const SHIPMENTS = [
  {
    id: "SHP-0012",
    request: "PR-0041 — Industrial Air Compressors",
    direction: "US → LK",
    carrier: "Maersk Line",
    trackingNo: "MAEU-7842931-LK",
    origin: "Los Angeles, CA",
    destination: "Colombo, Sri Lanka",
    etd: "2026-05-12",
    eta: "2026-06-04",
    status: "Booked",
    delayed: false,
    notes: "FCL 20ft container. Booking confirmed pending final document upload.",
    timeline: ["Product approved", "Payment received", "Supplier confirmed", "Documents prepared", "Freight booked"],
    current: 4,
  },
  {
    id: "SHP-0011",
    request: "PR-0036 — Organic Moringa Powder",
    direction: "LK → US",
    carrier: "MSC (Mediterranean Shipping)",
    trackingNo: "MSCU-3301885-US",
    origin: "Colombo, Sri Lanka",
    destination: "Los Angeles, CA",
    etd: "2026-04-18",
    eta: "2026-05-10",
    status: "In Transit",
    delayed: false,
    notes: "On track. ETA May 10.",
    timeline: ["Product approved", "Payment received", "Supplier confirmed", "Documents prepared", "Freight booked", "Picked up", "In transit"],
    current: 6,
  },
  {
    id: "SHP-0010",
    request: "PR-0033 — Medical Gloves (Latex-Free)",
    direction: "US → LK",
    carrier: "DHL Express Freight",
    trackingNo: "DHL-9921004-LK",
    origin: "Chicago, IL",
    destination: "Colombo, Sri Lanka",
    etd: "2026-04-02",
    eta: "2026-04-28",
    status: "Delayed / Exception",
    delayed: true,
    notes: "Customs hold at Colombo port. Awaiting SLS permit from buyer. Expected clearance +7 days.",
    timeline: ["Product approved", "Payment received", "Supplier confirmed", "Documents prepared", "Freight booked", "Picked up", "In transit"],
    current: 6,
  },
];

const TIMELINE_STEPS = [
  "Product approved",
  "Payment received",
  "Supplier confirmed",
  "Documents prepared",
  "Freight booked",
  "Picked up",
  "In transit",
  "Arrived",
  "Delivered",
];

const STATUS_STYLES = {
  "Not Booked":               "bg-slate-700 text-slate-400 border-slate-600",
  "Awaiting Freight Quote":   "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Booked":                   "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "Documents Preparing":      "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Ready for Pickup":         "bg-sky-500/15 text-sky-400 border-sky-500/30",
  "In Transit":               "bg-blue-400/15 text-blue-300 border-blue-400/30",
  "Arrived at Destination":   "bg-teal-500/15 text-teal-400 border-teal-500/30",
  "Customs / Import Clearance": "bg-orange-500/15 text-orange-400 border-orange-500/30",
  "Delivered":                "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Closed":                   "bg-slate-600/40 text-slate-400 border-slate-600",
  "Delayed / Exception":      "bg-red-500/15 text-red-400 border-red-500/30",
};

function TimelineTracker({ steps, current, delayed }) {
  return (
    <div className="flex items-center gap-0 mt-4 overflow-x-auto pb-2">
      {TIMELINE_STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const isLast = i === TIMELINE_STEPS.length - 1;
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                done ? "bg-emerald-500 border-emerald-500" :
                active && delayed ? "bg-red-500 border-red-500" :
                active ? "bg-amber-500 border-amber-500" :
                "bg-slate-800 border-slate-700"
              }`}>
                {done ? <CheckCircle className="w-3.5 h-3.5 text-white" /> :
                 active ? <Clock className="w-3.5 h-3.5 text-white" /> :
                 <div className="w-2 h-2 rounded-full bg-slate-600" />}
              </div>
              <div className={`text-[10px] mt-1.5 text-center max-w-[72px] leading-tight ${
                done ? "text-emerald-400" : active ? (delayed ? "text-red-400" : "text-amber-400") : "text-slate-600"
              }`}>{step}</div>
            </div>
            {!isLast && (
              <div className={`h-0.5 w-8 shrink-0 mx-0 ${done ? "bg-emerald-500" : "bg-slate-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ShipmentTracking() {
  const [selected, setSelected] = useState(SHIPMENTS[0]);

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Shipment Tracking</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Shipment progress tracking for approved orders. &nbsp;
          <span className="inline-flex items-center gap-1 text-amber-400">
            <Info className="w-3 h-3" /> Tracking integration placeholder — live carrier/freight data requires future backend/API integration.
          </span>
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Shipment List */}
        <div className="space-y-3">
          {SHIPMENTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className={`w-full text-left rounded-xl border p-4 transition-all ${
                selected.id === s.id
                  ? "bg-amber-500/10 border-amber-500/30"
                  : "bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="font-mono text-xs text-slate-400">{s.id}</div>
                  <div className="font-medium text-sm text-white mt-0.5">{s.request.split("—")[1]?.trim()}</div>
                </div>
                {s.delayed && <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />}
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLES[s.status]}`}>
                {s.status}
              </span>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded">{s.direction}</span>
                <span>{s.carrier}</span>
              </div>
            </button>
          ))}
          <button className="w-full text-center py-3 rounded-xl border border-dashed border-slate-700 text-xs text-slate-600 hover:text-slate-400 hover:border-slate-600 transition-colors">
            + Add Shipment
          </button>
        </div>

        {/* Shipment Detail */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header Card */}
          <div className={`rounded-xl border p-6 ${selected.delayed ? "bg-red-500/5 border-red-500/20" : "bg-slate-900 border-slate-800"}`}>
            <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-sm text-slate-400">{selected.id}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLES[selected.status]}`}>
                    {selected.status}
                  </span>
                  {selected.delayed && (
                    <span className="flex items-center gap-1 text-xs text-red-400 font-medium">
                      <AlertTriangle className="w-3 h-3" /> Delay / Exception Flagged
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-300 mt-1">{selected.request}</div>
              </div>
              <span className="font-mono text-xs bg-slate-800 border border-slate-700 px-2 py-1 rounded text-slate-400">{selected.direction}</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ["Carrier / Partner", selected.carrier],
                ["Tracking / Booking No.", selected.trackingNo],
                ["Origin", selected.origin],
                ["Destination", selected.destination],
                ["ETD", selected.etd],
                ["ETA", selected.eta],
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                  <div className="text-sm text-white font-medium">{val}</div>
                </div>
              ))}
            </div>

            {selected.notes && (
              <div className="mt-4 px-4 py-3 bg-slate-800/60 rounded-lg text-xs text-slate-400">
                <span className="text-slate-500 font-medium">Notes: </span>{selected.notes}
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h2 className="font-semibold text-white text-sm mb-1">Shipment Progress Timeline</h2>
            <p className="text-xs text-slate-500 mb-2">Steps completed up to current status.</p>
            <div className="overflow-x-auto">
              <TimelineTracker steps={TIMELINE_STEPS} current={selected.current} delayed={selected.delayed} />
            </div>
          </div>

          {/* Statuses Reference */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="font-medium text-sm text-white mb-3">All Shipment Statuses</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(STATUS_STYLES).map(([status, cls]) => (
                <span key={status} className={`text-xs px-2.5 py-1 rounded-full border font-medium ${cls}`}>
                  {status}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}