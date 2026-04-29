import React from "react";
import { ShieldAlert } from "lucide-react";

export default function ComplianceDisclaimerCard() {
  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-amber-500/8 border border-amber-500/20 rounded-xl">
      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
      <p className="text-xs text-amber-300/80 leading-relaxed">
        <span className="font-semibold text-amber-400">Compliance Notice: </span>
        Product risk screening is an internal decision-support tool only. It is not a legal, customs, tax, or compliance determination.
        Final approval may require confirmation from a freight forwarder, customs broker, compliance professional, or legal advisor.
      </p>
    </div>
  );
}