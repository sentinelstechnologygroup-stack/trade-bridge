import React from "react";
import {
  FileText, Brain, CheckCircle, Mail, DollarSign, Upload, Send
} from "lucide-react";

const EVENTS = [
  { id: 1, type: "Request Submitted", user: "System", timestamp: "2026-04-22 09:14", note: "Quote request received from Lanka Heavy Equip Ltd via public portal.", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/30" },
  { id: 2, type: "Feasibility Review Started", user: "T. Jayasinghe", timestamp: "2026-04-23 10:02", note: "Internal feasibility review initiated. Product category: Industrial Equipment.", icon: Brain, color: "text-violet-400", bg: "bg-violet-500/15 border-violet-500/30" },
  { id: 3, type: "AI Pre-Screen Completed", user: "System (AI)", timestamp: "2026-04-23 10:04", note: "AI recommendation: Go — 84% confidence. No regulatory restrictions flagged.", icon: Brain, color: "text-violet-400", bg: "bg-violet-500/15 border-violet-500/30" },
  { id: 4, type: "Human Decision Recorded", user: "T. Jayasinghe", timestamp: "2026-04-23 11:30", note: "Go decision confirmed. Approved for supplier outreach and pricing.", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30" },
  { id: 5, type: "Supplier Contacted", user: "Operations", timestamp: "2026-04-24 09:15", note: "Initial inquiry sent to Grainger Industrial Supply, MSC Industrial, Northern Tool.", icon: Mail, color: "text-sky-400", bg: "bg-sky-500/15 border-sky-500/30" },
  { id: 6, type: "Supplier Quote Received", user: "R. Vance (Global Industrial)", timestamp: "2026-04-25 14:47", note: "Quote received: $1,795/unit, MOQ 3, 10–14 days lead time. Export eligible confirmed.", icon: DollarSign, color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/30" },
  { id: 7, type: "Supplier Quote Received", user: "M. Holloway (Grainger)", timestamp: "2026-04-25 16:22", note: "Quote received: $1,840/unit, MOQ 5, 14–18 days. Reviewing against Global Industrial.", icon: DollarSign, color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/30" },
  { id: 8, type: "Supplier Selected", user: "T. Jayasinghe", timestamp: "2026-04-26 09:00", note: "Global Industrial selected: best price, lowest MOQ, export eligibility confirmed.", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30" },
  { id: 9, type: "Quote Builder Updated", user: "Operations", timestamp: "2026-04-26 11:15", note: "Internal pricing finalized. Sourcing fee set at 15%. Draft quote prepared.", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/30" },
  { id: 10, type: "Document Uploaded", user: "Operations", timestamp: "2026-04-27 10:30", note: "Supplier quote (Global Industrial) and product spec sheet uploaded to document library.", icon: Upload, color: "text-teal-400", bg: "bg-teal-500/15 border-teal-500/30" },
  { id: 11, type: "Quote Sent to Buyer", user: "T. Jayasinghe", timestamp: "2026-04-27 15:00", note: "Client-facing quote sent to Priya Wickramasinghe at Lanka Heavy Equip Ltd.", icon: Send, color: "text-sky-400", bg: "bg-sky-500/15 border-sky-500/30" },
];

export default function ActivityTimeline() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h2 className="font-semibold text-white text-sm mb-5">Request Activity Timeline</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800" />
        <div className="space-y-5">
          {EVENTS.map((event, i) => {
            const Icon = event.icon;
            return (
              <div key={event.id} className="flex gap-4 relative">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 z-10 bg-slate-900 ${event.bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${event.color}`} />
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <span className="text-sm font-semibold text-white">{event.type}</span>
                      <span className="text-xs text-slate-500 ml-2">by {event.user}</span>
                    </div>
                    <span className="text-xs text-slate-600 font-mono shrink-0">{event.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{event.note}</p>
                </div>
              </div>
            );
          })}
          {/* Future placeholder */}
          <div className="flex gap-4 relative opacity-40">
            <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center shrink-0 z-10 bg-slate-900">
              <div className="w-2 h-2 rounded-full bg-slate-600" />
            </div>
            <div className="flex-1 pb-1 pt-1.5">
              <span className="text-xs text-slate-600 italic">Upcoming: Buyer Approval · Payment Received · Shipment Booked · Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}