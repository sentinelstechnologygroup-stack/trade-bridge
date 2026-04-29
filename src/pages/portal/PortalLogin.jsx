import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/AuthContext";
import { savePortalEvent } from "@/services/local/requestStore";

export default function PortalLogin() {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(false);
  const { loginAsPrototype } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const session = loginAsPrototype(email.trim() || "operator@tradeconnect.us");
    savePortalEvent("portal-login-placeholder", {
      email: session.email,
      remember,
      passwordSupplied: Boolean(pw),
    });
    toast.success("Prototype portal session started.");
    navigate("/portal");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
            <span className="text-slate-950 font-bold text-sm">TC</span>
          </div>
          <div>
            <div className="font-semibold text-white text-sm">TradeConnect</div>
            <div className="text-[10px] text-slate-500 tracking-widest uppercase">Operations Portal</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-amber-400" />
            <h1 className="text-lg font-bold text-white">Portal Sign In</h1>
          </div>

          <div className="mb-4 px-3 py-2 bg-amber-500/8 border border-amber-500/20 rounded-lg">
            <p className="text-xs text-amber-400">Authorized users only. Access is monitored and logged.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">Email Address</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@tradeconnect.us" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1.5">Password</label>
              <div className="relative">
                <input value={pw} onChange={(e) => setPw(e.target.value)} type={showPw ? "text" : "password"} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-3.5 h-3.5 accent-amber-500" />
                <span className="text-xs text-slate-400">Remember me</span>
              </label>
              <Link to="/portal/forgot-password" className="text-xs text-amber-400 hover:text-amber-300">Forgot password?</Link>
            </div>

            <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 rounded-lg text-sm font-bold hover:bg-amber-400 transition-colors">
              Sign In
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2 text-xs text-slate-600">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>This is a placeholder login screen. Final authentication requires backend integration.</span>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          <Link to="/" className="hover:text-slate-400 transition-colors">← Back to public site</Link>
        </p>
      </div>
    </div>
  );
}
