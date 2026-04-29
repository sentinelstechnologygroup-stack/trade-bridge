import React from "react";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

const ALL_WARNINGS = [
  { id: "low_value",           label: "Low Product Value / High Labor Burden",              severity: "medium" },
  { id: "unknown_duties",      label: "Unknown Duties / Taxes",                             severity: "high" },
  { id: "unknown_hs",          label: "Unknown HS Code",                                    severity: "high" },
  { id: "missing_freight",     label: "Missing Freight Estimate",                           severity: "high" },
  { id: "missing_ior",         label: "Missing Importer-of-Record Confirmation",            severity: "high" },
  { id: "restricted_category", label: "Restricted Product Category",                        severity: "high" },
  { id: "missing_permits",     label: "Missing Permit Confirmation",                        severity: "high" },
  { id: "no_confirmed_buyer",  label: "No Confirmed Buyer",                                 severity: "medium" },
  { id: "supplier_moq",        label: "Supplier MOQ Too High",                              severity: "medium" },
  { id: "low_margin",          label: "Low Margin Confidence",                              severity: "medium" },
  { id: "fragility_risk",      label: "High Damage / Fragility Risk",                       severity: "medium" },
  { id: "battery_review",      label: "Battery / Electronics Review Needed",                severity: "high" },
  { id: "food_review",         label: "Food / Cosmetic / Supplement Review Needed",         severity: "high" },
  { id: "medical_chemical_ag", label: "Medical / Chemical / Agricultural Review Needed",    severity: "high" },
  { id: "branded_counterfeit", label: "Branded / Counterfeit-Risk Review Needed",           severity: "medium" },
  { id: "buyer_red_flag",      label: "Buyer / End-Use Red Flag",                           severity: "high" },
  { id: "sanctions_screening", label: "Possible Sanctions / End-User Screening Needed",     severity: "high" },
];

const severityStyles = {
  high: { bg: "bg-red-500/10 border-red-500/20 text-red-400", icon: AlertCircle },
  medium: { bg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400", icon: AlertTriangle },
  low: { bg: "bg-blue-500/10 border-blue-500/20 text-blue-400", icon: Info },
};

export default function WarningBadges({ activeWarnings = [] }) {
  const active = ALL_WARNINGS.filter((w) => activeWarnings.includes(w.id));

  if (active.length === 0) return null;

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
      <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
        Active Warnings & Guardrails
      </h3>
      <div className="flex flex-wrap gap-2">
        {active.map((w) => {
          const style = severityStyles[w.severity];
          const Icon = style.icon;
          return (
            <div key={w.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${style.bg}`}>
              <Icon className="w-3 h-3 shrink-0" />
              {w.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}