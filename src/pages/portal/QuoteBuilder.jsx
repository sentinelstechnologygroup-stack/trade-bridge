import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import PricingCalculator from "../../components/portal/PricingCalculator";
import QuotePreview from "../../components/portal/QuotePreview";
import WarningBadges from "../../components/portal/WarningBadges";
import ComplianceDisclaimerCard from "../../components/portal/ComplianceDisclaimerCard";
import ProductRiskBadge from "../../components/portal/ProductRiskBadge";
import { toast } from "sonner";
import { savePortalEvent } from "@/services/local/requestStore";

const TABS = ["Calculator", "Client Details", "Quote Preview"];

const CLIENT = {
  name: "Lanka Heavy Equip Ltd",
  contact: "Priya Wickramasinghe",
  email: "priya@lankaheavy.lk",
  phone: "+94 77 123 4567",
  country: "Sri Lanka",
  city: "Colombo",
  isNewClient: false,
  iorConfirmed: true,
  paymentHistory: "No prior transactions",
};

export default function QuoteBuilder() {
  const [tab, setTab] = useState("Calculator");
  const [showInternalNotes, setShowInternalNotes] = useState(true);
  const [notes, setNotes] = useState("Standard sourcing job. Buyer has confirmed as IOR. Freight quote pending from Maersk.");
  const [quoteStatus, setQuoteStatus] = useState("Draft");

  const activeWarnings = ["missing_freight", "low_margin"];

  const handleQuoteAction = (action) => {
    savePortalEvent(`quote-builder-${action}`, {
      quoteStatus,
      tab,
      notes,
      prototypeOnly: true,
    });
    toast.success(action === "save-draft" ? "Quote draft saved locally." : "Buyer send action recorded as a placeholder.");
  };

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/portal/requests/PR-0041" className="flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Request
        </Link>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-white">Quote Builder</h1>
            <ProductRiskBadge level="yellow" />
          </div>
          <p className="text-slate-400 mt-1 text-sm">PR-0041 — Industrial Air Compressors — Lanka Heavy Equip Ltd</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500">Status:</div>
          <select
            value={quoteStatus}
            onChange={(e) => setQuoteStatus(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
          >
            {["Draft", "Pending Review", "Sent to Buyer", "Accepted", "Rejected"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button onClick={() => handleQuoteAction("save-draft")} className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400">
            Save Draft
          </button>
          <button onClick={() => handleQuoteAction("send-to-buyer")} className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700">
            Send to Buyer
          </button>
        </div>
      </div>

      {/* Active Warnings Banner */}
      <div className="space-y-3">
        <WarningBadges activeWarnings={activeWarnings} />
        <ComplianceDisclaimerCard />
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2 mt-4">
        {[
          { label: "View Client", path: "/portal/clients" },
          { label: "Supplier Quotes", path: "/portal/supplier-outreach" },
          { label: "Documents", path: "/portal/documents" },
          { label: "Compliance Flags", path: "/portal/compliance-review" },
          { label: "Audit Log", path: "/portal/audit-log" },
        ].map(l => (
          <Link key={l.path} to={l.path} className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs hover:bg-slate-700 hover:text-slate-200 transition-colors">{l.label}</Link>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mt-6 mb-6 bg-slate-900 rounded-xl p-1 border border-slate-800 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab: Calculator */}
      {tab === "Calculator" && (
        <PricingCalculator />
      )}

      {/* Tab: Client Details */}
      {tab === "Client Details" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-4">
            <h2 className="font-semibold text-white text-sm border-b border-slate-800 pb-3">Client Information</h2>
            {[
              ["Company Name", CLIENT.name],
              ["Contact Person", CLIENT.contact],
              ["Email", CLIENT.email],
              ["Phone", CLIENT.phone],
              ["Country", CLIENT.country],
              ["City", CLIENT.city],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-xs text-slate-500 mb-1">{label}</div>
                <input defaultValue={value}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-4">
              <h2 className="font-semibold text-white text-sm border-b border-slate-800 pb-3">Trade & Compliance</h2>
              <div className="space-y-3">
                {[
                  ["New Client?", CLIENT.isNewClient ? "Yes — prepayment required" : "No — existing relationship"],
                  ["IOR Confirmed?", CLIENT.iorConfirmed ? "Yes — confirmed importer of record" : "Not confirmed"],
                  ["Payment History", CLIENT.paymentHistory],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-slate-800">
                    <span className="text-xs text-slate-400">{label}</span>
                    <span className={`text-xs font-medium ${
                      value.includes("Yes") || value.includes("confirmed") ? "text-emerald-400" : "text-yellow-400"
                    }`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-white text-sm">Internal Notes</h2>
                <button onClick={() => setShowInternalNotes(!showInternalNotes)} className="text-slate-500 hover:text-slate-300">
                  {showInternalNotes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {showInternalNotes && (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  placeholder="Internal notes — not shown in client-facing quote..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              )}
              <p className="text-xs text-slate-600 mt-2">Internal notes are not visible in the client-facing quote preview.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Quote Preview */}
      {tab === "Quote Preview" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <span className="text-xs text-amber-400">This is the client-facing quote preview. Internal risk logic, margin data, and operator notes are not shown below.</span>
          </div>
          <QuotePreview />
        </div>
      )}
    </div>
  );
}