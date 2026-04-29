import React from "react";
import { CheckCircle, AlertTriangle, ShieldAlert, XCircle } from "lucide-react";

const RISK_CONFIG = {
  green: {
    label: "Green — Acceptable",
    icon: CheckCircle,
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  yellow: {
    label: "Yellow — Caution",
    icon: AlertTriangle,
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  },
  red: {
    label: "Red — Specialist Review",
    icon: ShieldAlert,
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
  },
  black: {
    label: "Black — No-Go",
    icon: XCircle,
    badge: "bg-slate-700 text-slate-300 border-slate-600",
  },
};

export default function ProductRiskBadge({ level, size = "sm" }) {
  const cfg = RISK_CONFIG[level];
  if (!cfg) return null;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 font-medium border rounded-full ${cfg.badge} ${size === "sm" ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5"}`}>
      <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      {cfg.label}
    </span>
  );
}