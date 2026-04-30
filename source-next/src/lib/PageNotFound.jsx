"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PageNotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-slate-300">404</h1>
          <div className="h-0.5 w-16 bg-slate-200 mx-auto" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-medium text-slate-800">Page Not Found</h2>
          <p className="text-slate-600 leading-relaxed">
            The route <span className="font-medium text-slate-700">{pathname}</span> is not available in this prototype build.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link href="/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors">
            Go Home
          </Link>
          <Link href="/portal" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-900 border border-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
            Open Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
