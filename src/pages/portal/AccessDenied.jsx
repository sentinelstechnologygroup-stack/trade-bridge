import React from "react";
import { Link } from "react-router-dom";
import { ShieldOff, LayoutDashboard, Mail } from "lucide-react";

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <ShieldOff className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-slate-400 mb-2">You do not have permission to view this section of the portal.</p>
        <p className="text-slate-500 text-sm mb-8">If you believe you should have access, please contact your portal administrator to request the appropriate role or permissions.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/portal" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400">
            <LayoutDashboard className="w-4 h-4" /> Return to Dashboard
          </Link>
          <Link to="/contact" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700">
            <Mail className="w-4 h-4" /> Contact Admin
          </Link>
        </div>
      </div>
    </div>
  );
}