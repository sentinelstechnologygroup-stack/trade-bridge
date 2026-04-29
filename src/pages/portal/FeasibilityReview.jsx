import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Brain, AlertTriangle } from "lucide-react";
import ComplianceDisclaimerCard from "../../components/portal/ComplianceDisclaimerCard";
import ProductRiskBadge from "../../components/portal/ProductRiskBadge";
import WarningBadges from "../../components/portal/WarningBadges";
import NoGoOverridePanel from "../../components/portal/NoGoOverridePanel";
import { toast } from "sonner";
import { savePortalEvent } from "@/services/local/requestStore";

const AI_RESULT = {
  recommendation: "Caution",
  confidence: 72,
  profitPotential: "Moderate",
  regulatoryRisk: "Medium",
  shippingRisk: "Low",
  marketDemand: "Strong",
  supplierAvailability: "High",
  marginConfidence: "Moderate",
  missingData: ["HS Code not confirmed", "Sri Lanka SLS permit status unknown", "Importer of record not verified"],
  verificationRequired: ["Confirm FDA compliance certificate", "Verify SLS import permit", "Confirm buyer as registered medical importer", "Get freight quote before finalizing margin"],
};

const SCORING = [
  { section: "Product Demand", score: 8, risk: "Low", note: "Strong demand for medical PPE in LK private sector.", action: "Confirm recurring order potential." },
  { section: "Estimated Margin", score: 6, risk: "Medium", note: "Est. 48% gross margin before freight. May compress with logistics.", action: "Get freight quote to confirm net margin." },
  { section: "Shipping Practicality", score: 7, risk: "Low", note: "Standard carton freight. No refrigeration required.", action: "Confirm freight partner availability." },
  { section: "Regulatory Risk", score: 5, risk: "Medium", note: "Medical items require SLS permit in Sri Lanka.", action: "Verify SLS permit with buyer." },
  { section: "Import/Export Complexity", score: 5, risk: "Medium", note: "FDA compliance docs + SLS cert required.", action: "Obtain FDA compliance documentation from supplier." },
  { section: "Supplier Reliability", score: 7, risk: "Low", note: "Multiple U.S. distributors available. Need to shortlist.", action: "Contact 2–3 suppliers for quotes." },
  { section: "Buyer / Payment Risk", score: 6, risk: "Medium", note: "New buyer. No prior transaction history.", action: "Request payment terms confirmation or partial upfront." },
  { section: "Scalability", score: 8, risk: "Low", note: "Potential for recurring monthly orders if first shipment succeeds.", action: "Discuss recurring order terms with buyer." },
  { section: "Documentation Readiness", score: 4, risk: "High", note: "Missing SLS permit, importer cert, HS code.", action: "Block until buyer provides permit + IOR confirmation." },
];

const recColors = {
  "Go": "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  "Caution": "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  "No-Go": "bg-red-500/10 border-red-500/30 text-red-400",
};

const riskBadge = {
  "Low": "bg-emerald-500/15 text-emerald-400",
  "Medium": "bg-yellow-500/15 text-yellow-400",
  "High": "bg-red-500/15 text-red-400",
};

export default function FeasibilityReview() {
  const { id } = useParams();
  const [decision, setDecision] = useState("");
  const [overrideReason, setOverrideReason] = useState("");

  const submitDecision = () => {
    savePortalEvent("feasibility-decision", {
      requestId: id || "PR-0040",
      decision,
      overrideReason,
      prototypeOnly: true,
    });
    toast.success("Feasibility decision recorded locally.");
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to={`/portal/requests/${id || "PR-0040"}`} className="flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Request
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <h1 className="text-2xl font-bold text-white">Feasibility Review</h1>
        <ProductRiskBadge level="red" />
      </div>
      <p className="text-slate-400 text-sm mb-5">PR-0040 — Surgical Gloves (Latex-Free)</p>
      <div className="mb-6 space-y-3">
        <WarningBadges activeWarnings={["restricted_category", "medical_chemical_ag", "missing_ior", "missing_permits", "unknown_hs", "unknown_duties"]} />
        <ComplianceDisclaimerCard />
      </div>

      {/* AI Pre-Screen Panel */}
      <div className={`rounded-xl border p-6 mb-8 ${recColors[AI_RESULT.recommendation]}`}>
        <div className="flex items-start gap-4 mb-4">
          <Brain className="w-6 h-6 mt-0.5 shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-bold text-lg">AI Pre-Screen Result: {AI_RESULT.recommendation}</h2>
              <span className="text-xs px-2 py-1 bg-slate-800 rounded-full text-slate-400">{AI_RESULT.confidence}% confidence</span>
            </div>
            <p className="text-xs mt-1 opacity-70">AI-assisted recommendation pending human review. Final approval requires confirmation of HS code, duties, permits, freight cost, and buyer payment terms.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          {[
            ["Profit Potential", AI_RESULT.profitPotential],
            ["Regulatory Risk", AI_RESULT.regulatoryRisk],
            ["Shipping Risk", AI_RESULT.shippingRisk],
            ["Market Demand", AI_RESULT.marketDemand],
            ["Supplier Availability", AI_RESULT.supplierAvailability],
            ["Margin Confidence", AI_RESULT.marginConfidence],
          ].map(([label, value]) => (
            <div key={label} className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs opacity-60 mb-1">{label}</div>
              <div className="text-sm font-semibold">{value}</div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider opacity-60 mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Missing Data</div>
            <ul className="space-y-1">
              {AI_RESULT.missingData.map((m) => (<li key={m} className="text-xs opacity-80">• {m}</li>))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider opacity-60 mb-2">Required Verification Steps</div>
            <ul className="space-y-1">
              {AI_RESULT.verificationRequired.map((v) => (<li key={v} className="text-xs opacity-80">• {v}</li>))}
            </ul>
          </div>
        </div>
      </div>

      {/* Scoring Sections */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-800">
          <h2 className="font-semibold text-white text-sm">Feasibility Scoring</h2>
        </div>
        <div className="divide-y divide-slate-800">
          {SCORING.map((s) => (
            <div key={s.section} className="px-6 py-4 grid sm:grid-cols-4 gap-4 items-start">
              <div>
                <div className="font-medium text-sm text-white">{s.section}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-2xl font-bold text-amber-400">{s.score}<span className="text-sm text-slate-500">/10</span></div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskBadge[s.risk]}`}>{s.risk} Risk</span>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs text-slate-400 leading-relaxed">{s.note}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Required Action</div>
                <div className="text-xs text-amber-400">{s.action}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Human Decision */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h2 className="font-semibold text-white text-sm mb-4">Human Decision</h2>
        <div className="flex gap-3 mb-5 flex-wrap">
          {["Go", "Caution", "No-Go"].map((d) => (
            <button
              key={d}
              onClick={() => setDecision(d)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                decision === d
                  ? d === "Go" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                    : d === "Caution" ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                    : "bg-red-500/20 border-red-500 text-red-400"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        {decision === "Caution" && (
          <div className="mb-4">
            <div className="text-xs text-slate-500 mb-2">Reason (required for Caution)</div>
            <textarea
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              placeholder="Describe what verification is required before proceeding..."
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>
        )}
        {decision !== "No-Go" && (
          <button
            onClick={submitDecision}
            disabled={!decision}
            className="px-6 py-2.5 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Decision
          </button>
        )}
        {decision === "No-Go" && (
          <div className="mt-4">
            <NoGoOverridePanel
              productName="Surgical Gloves (Latex-Free)"
              reason="Classified as Red — Restricted / Specialist Review Required. Medical devices require SLS permit and IOR confirmation."
            />
          </div>
        )}
        <p className="text-xs text-slate-600 mt-3">This decision will be logged with a timestamp and operator record.</p>
      </div>
    </div>
  );
}