"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Inbox, Brain,
  FileText, Settings, ChevronLeft, ChevronRight, Globe,
  Library, Ship, ListChecks,
  Building2, Truck, UserCheck, Scale, ClipboardList, Shield,
  TrendingUp, BarChart2, Bell, ShieldCheck, Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    label: "Operations",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/portal" },
      { icon: Inbox, label: "Requests Inbox", path: "/portal/requests" },
      { icon: Brain, label: "Pricing & Feasibility", path: "/portal/pricing-feasibility" },
      { icon: Users, label: "Supplier Outreach", path: "/portal/supplier-outreach" },
      { icon: FileText, label: "Quote Builder", path: "/portal/quote-builder" },
      { icon: Library, label: "Documents", path: "/portal/documents" },
      { icon: Bell, label: "Doc Reminders", path: "/portal/document-reminders" },
      { icon: Ship, label: "Shipments", path: "/portal/shipments" },
      { icon: ListChecks, label: "Tasks", path: "/portal/tasks" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: TrendingUp, label: "Profit & Margin", path: "/portal/profit-margin" },
      { icon: BarChart2, label: "Analytics & Reports", path: "/portal/analytics" },
      { icon: Building2, label: "Clients", path: "/portal/clients" },
      { icon: Truck, label: "Suppliers", path: "/portal/suppliers" },
      { icon: UserCheck, label: "Importer Profiles", path: "/portal/importer-profiles" },
    ],
  },
  {
    label: "Governance",
    items: [
      { icon: Scale, label: "Compliance Review", path: "/portal/compliance-review" },
      { icon: ShieldCheck, label: "Sanctions Screening", path: "/portal/sanctions-screening" },
      { icon: ClipboardList, label: "Audit Log", path: "/portal/audit-log" },
      { icon: Shield, label: "User Management", path: "/portal/users" },
      { icon: Settings, label: "Settings", path: "/portal/settings" },
    ],
  },
];

export default function PortalLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (path) =>
    path === "/portal"
      ? pathname === "/portal"
      : pathname.startsWith(path);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col border-r border-slate-800 transition-all duration-300 shrink-0",
        collapsed ? "w-14" : "w-56"
      )}>
        {/* Brand */}
        <div className="flex items-center gap-3 px-3 h-14 border-b border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
            <span className="text-slate-950 font-bold text-[10px]">TC</span>
          </div>
          {!collapsed && (
            <div>
              <span className="font-semibold text-xs text-white">TradeConnect</span>
              <span className="block text-[9px] text-slate-400 tracking-widest uppercase">Ops Portal</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 space-y-4 px-2 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <div className="px-2 mb-1 text-[9px] font-bold tracking-widest uppercase text-slate-600">{group.label}</div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors",
                        active
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                      )}
                    >
                      <item.icon className="w-3.5 h-3.5 shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-2 pb-3 space-y-0.5 border-t border-slate-800 pt-3">
          <Link
            href="/"
            title={collapsed ? "Public Site" : undefined}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span>Public Site</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors w-full"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}