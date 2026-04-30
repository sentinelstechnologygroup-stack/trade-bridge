"use client";
import React, { useState } from "react";
import { Plus, Shield } from "lucide-react";
import { toast } from "sonner";
import { savePortalEvent } from "@/services/local/requestStore";

const USERS = [
  { id: 1, name: "Van Rodrigo", email: "van@tradeconnect.us", role: "Owner / Admin", status: "Active", lastLogin: "2026-04-28 09:00" },
  { id: 2, name: "Amara Silva", email: "a.silva@tradeconnect.us", role: "Operations Manager", status: "Active", lastLogin: "2026-04-28 08:45" },
  { id: 3, name: "James Wu", email: "j.wu@tradeconnect.us", role: "Quote Reviewer", status: "Active", lastLogin: "2026-04-27 14:20" },
  { id: 4, name: "Priya Nair", email: "p.nair@tradeconnect.us", role: "Compliance Reviewer", status: "Active", lastLogin: "2026-04-26 11:00" },
  { id: 5, name: "David Osei", email: "d.osei@tradeconnect.us", role: "Sourcing Agent", status: "Active", lastLogin: "2026-04-25 16:30" },
  { id: 6, name: "Lena Park", email: "l.park@tradeconnect.us", role: "Document Reviewer", status: "Invited", lastLogin: "—" },
  { id: 7, name: "Tom Herrera", email: "t.herrera@tradeconnect.us", role: "Read-Only Viewer", status: "Suspended", lastLogin: "2026-04-10 09:00" },
];

const STATUS_STYLES = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Invited: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Suspended: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Disabled: "bg-slate-700 text-slate-400 border-slate-600",
};

const PERMISSIONS = [
  "View Requests", "Edit Requests", "Approve Go / Caution / No-Go",
  "Override No-Go", "Edit Pricing Rules", "Send Quote",
  "Mark Payment Received", "Upload Documents", "Approve Documents",
  "Manage Suppliers", "Manage Clients", "Manage Shipments",
  "Manage Users", "View Audit Log", "Manage Settings",
];

const ROLE_PERMISSIONS = {
  "Owner / Admin": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
  "Operations Manager": [0,1,2,5,6,7,9,10,11,13],
  "Quote Reviewer": [0,5,7,13],
  "Sourcing Agent": [0,1,7,9,13],
  "Document Reviewer": [0,7,8,13],
  "Compliance Reviewer": [0,2,3,7,8,13],
  "Read-Only Viewer": [0,13],
};

export default function UserManagement() {
  const [tab, setTab] = useState("users");

  const handleAction = (action, user) => {
    savePortalEvent(`user-management-${action}`, {
      userId: user?.id || null,
      userEmail: user?.email || null,
      prototypeOnly: true,
    });
    toast.success(`${action.replace(/-/g, " ")} recorded locally.`);
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 mt-1 text-sm">Manage portal access, roles, and permissions.</p>
        </div>
        <button onClick={() => handleAction("invite-user")} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400">
          <Plus className="w-4 h-4" /> Invite User
        </button>
      </div>

      <div className="flex gap-1 mb-6 bg-slate-900 border border-slate-800 rounded-lg p-1 w-fit">
        {["users", "permissions"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${tab === t ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" : "text-slate-400 hover:text-slate-200"}`}>{t === "permissions" ? "Role Permissions" : "Users"}</button>
        ))}
      </div>

      {tab === "users" && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {["Name", "Email", "Role", "Status", "Last Login", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {USERS.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-white">{u.name}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{u.email}</td>
                  <td className="px-4 py-3 text-xs text-slate-300">{u.role}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_STYLES[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 font-mono">{u.lastLogin}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleAction("edit-role", u)} className="text-xs text-amber-400 hover:text-amber-300">Edit Role</button>
                      {u.status === "Invited" && <button onClick={() => handleAction("resend-invite", u)} className="text-xs text-blue-400 hover:text-blue-300">Resend</button>}
                      {u.status === "Active" && <button onClick={() => handleAction("disable-user", u)} className="text-xs text-slate-500 hover:text-yellow-400">Disable</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "permissions" && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-800 flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-white">Role Permission Matrix</span>
            <span className="text-xs text-slate-500 ml-2">(Placeholder — read-only UI)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider min-w-52">Permission</th>
                  {Object.keys(ROLE_PERMISSIONS).map(role => (
                    <th key={role} className="px-3 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider min-w-24">{role.split(" / ")[0]}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {PERMISSIONS.map((perm, idx) => (
                  <tr key={perm} className="hover:bg-slate-800/30">
                    <td className="px-4 py-2.5 text-xs text-slate-300">{perm}</td>
                    {Object.entries(ROLE_PERMISSIONS).map(([role, perms]) => (
                      <td key={role} className="px-3 py-2.5 text-center">
                        {perms.includes(idx)
                          ? <span className="inline-block w-4 h-4 rounded-sm bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs leading-4">✓</span>
                          : <span className="inline-block w-4 h-4 rounded-sm bg-slate-800 border border-slate-700 text-slate-600 text-xs leading-4">—</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}