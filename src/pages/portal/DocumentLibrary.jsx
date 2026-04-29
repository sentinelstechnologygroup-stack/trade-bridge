import React, { useState } from "react";
import { FileText, Upload, Check, AlertCircle, Clock, Eye, CheckCircle, XCircle } from "lucide-react";

const DOCUMENTS = [
  // Buyer Documents
  { id: 1, name: "Product Request Form", category: "Buyer", status: "Uploaded", uploadedBy: "System", dateAdded: "2026-04-22", required: true, notes: "Original buyer submission." },
  { id: 2, name: "Buyer Purchase Order", category: "Buyer", status: "Draft", uploadedBy: "T. Jayasinghe", dateAdded: "2026-04-25", required: true, notes: "Draft PO pending buyer signature." },
  { id: 3, name: "Buyer Approval Letter", category: "Buyer", status: "Missing", uploadedBy: "—", dateAdded: "—", required: true, notes: "Awaiting buyer confirmation." },
  { id: 4, name: "Payment Confirmation", category: "Buyer", status: "Missing", uploadedBy: "—", dateAdded: "—", required: true, notes: "Due after invoice is issued." },

  // Supplier Documents
  { id: 5, name: "Supplier Quote — Global Industrial", category: "Supplier", status: "Uploaded", uploadedBy: "R. Vance (Supplier)", dateAdded: "2026-04-27", required: true, notes: "Formal quote. $1,795/unit, MOQ 3." },
  { id: 6, name: "Supplier Invoice", category: "Supplier", status: "Missing", uploadedBy: "—", dateAdded: "—", required: true, notes: "Issued upon order confirmation." },
  { id: 7, name: "Product Specification Sheet", category: "Supplier", status: "Uploaded", uploadedBy: "R. Vance (Supplier)", dateAdded: "2026-04-27", required: true, notes: "Technical datasheet included." },
  { id: 8, name: "Warranty / Spec Notes", category: "Supplier", status: "Draft", uploadedBy: "Operations", dateAdded: "2026-04-26", required: false, notes: "Summary notes from supplier call." },

  // Export / Logistics
  { id: 9, name: "Commercial Invoice", category: "Export / Logistics", status: "Draft", uploadedBy: "Operations", dateAdded: "2026-04-26", required: true, notes: "Draft prepared, pending supplier invoice." },
  { id: 10, name: "Packing List", category: "Export / Logistics", status: "Missing", uploadedBy: "—", dateAdded: "—", required: true, notes: "Prepared after shipment confirmation." },
  { id: 11, name: "Freight Quote — Maersk", category: "Export / Logistics", status: "Under Review", uploadedBy: "Operations", dateAdded: "2026-04-26", required: true, notes: "Maersk FCL estimate received. Reviewing." },
  { id: 12, name: "Bill of Lading / Air Waybill", category: "Export / Logistics", status: "Missing", uploadedBy: "—", dateAdded: "—", required: true, notes: "Issued after freight booking." },
  { id: 13, name: "Cargo Insurance Certificate", category: "Export / Logistics", status: "Missing", uploadedBy: "—", dateAdded: "—", required: false, notes: "Recommended for shipment value > $10K." },
  { id: 14, name: "Shipment Booking Confirmation", category: "Export / Logistics", status: "Missing", uploadedBy: "—", dateAdded: "—", required: true, notes: "Pending freight booking." },

  // Compliance
  { id: 15, name: "HS Code Notes", category: "Compliance", status: "Uploaded", uploadedBy: "Operations", dateAdded: "2026-04-24", required: true, notes: "HS 8414.40 confirmed. No EAR restrictions." },
  { id: 16, name: "Permit Notes (SL)", category: "Compliance", status: "Under Review", uploadedBy: "T. Jayasinghe", dateAdded: "2026-04-25", required: true, notes: "SL buyer checking import permit requirement." },
  { id: 17, name: "Restricted Item Review", category: "Compliance", status: "Approved", uploadedBy: "Operations", dateAdded: "2026-04-23", required: true, notes: "Cleared. No ITAR/EAR/OFAC restrictions." },
  { id: 18, name: "Customs Broker Notes", category: "Compliance", status: "Missing", uploadedBy: "—", dateAdded: "—", required: false, notes: "Optional. Buyer's broker to handle destination." },
  { id: 19, name: "Importer-of-Record Confirmation", category: "Compliance", status: "Approved", uploadedBy: "T. Jayasinghe", dateAdded: "2026-04-24", required: true, notes: "Lanka Heavy Equip confirmed as IOR." },
];

const CATEGORIES = ["All", "Buyer", "Supplier", "Export / Logistics", "Compliance"];

const STATUS_STYLES = {
  "Missing":      { badge: "bg-red-500/15 text-red-400 border-red-500/30",     icon: XCircle,     iconColor: "text-red-400" },
  "Draft":        { badge: "bg-slate-600/40 text-slate-400 border-slate-600",   icon: FileText,    iconColor: "text-slate-400" },
  "Uploaded":     { badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",   icon: Upload,      iconColor: "text-blue-400" },
  "Under Review": { badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",icon: Clock,       iconColor: "text-amber-400" },
  "Approved":     { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", icon: CheckCircle, iconColor: "text-emerald-400" },
  "Not Required": { badge: "bg-slate-700 text-slate-500 border-slate-700",      icon: Check,       iconColor: "text-slate-500" },
};

const CATEGORY_COLORS = {
  "Buyer":              "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Supplier":           "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Export / Logistics": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Compliance":         "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function DocumentLibrary() {
  const [catFilter, setCatFilter] = useState("All");

  const filtered = catFilter === "All" ? DOCUMENTS : DOCUMENTS.filter(d => d.category === catFilter);

  const required = DOCUMENTS.filter(d => d.required);
  const complete = required.filter(d => d.status === "Uploaded" || d.status === "Approved");
  const missing = required.filter(d => d.status === "Missing");
  const underReview = DOCUMENTS.filter(d => d.status === "Under Review");

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Trade Document Library</h1>
        <p className="text-slate-400 mt-1 text-sm">PR-0041 — Industrial Air Compressors — Lanka Heavy Equip Ltd</p>
      </div>

      {/* Completeness Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Complete</span>
          </div>
          <div className="text-3xl font-bold text-emerald-400">{complete.length}<span className="text-base text-emerald-600">/{required.length}</span></div>
          <div className="text-xs text-slate-500 mt-1">Required documents uploaded or approved</div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5">
            <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${(complete.length / required.length) * 100}%` }} />
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Missing</span>
          </div>
          <div className="text-3xl font-bold text-red-400">{missing.length}</div>
          <div className="text-xs text-slate-500 mt-1">Required documents not yet uploaded</div>
          <div className="mt-3 space-y-1">
            {missing.slice(0, 3).map(d => (
              <div key={d.id} className="text-xs text-red-400/70 truncate">• {d.name}</div>
            ))}
            {missing.length > 3 && <div className="text-xs text-slate-600">+{missing.length - 3} more</div>}
          </div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Under Review</span>
          </div>
          <div className="text-3xl font-bold text-amber-400">{underReview.length}</div>
          <div className="text-xs text-slate-500 mt-1">Documents currently being reviewed</div>
          <div className="mt-3 space-y-1">
            {underReview.map(d => (
              <div key={d.id} className="text-xs text-amber-400/70 truncate">• {d.name}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                catFilter === c ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      {/* Document Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="px-5 py-3 text-left">Document</th>
                <th className="px-5 py-3 text-left">Category</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Required</th>
                <th className="px-5 py-3 text-left">Uploaded By</th>
                <th className="px-5 py-3 text-left">Date Added</th>
                <th className="px-5 py-3 text-left">Notes</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => {
                const s = STATUS_STYLES[doc.status] || STATUS_STYLES["Missing"];
                const StatusIcon = s.icon;
                return (
                  <tr key={doc.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-4 h-4 shrink-0 ${s.iconColor}`} />
                        <span className="font-medium text-white text-sm">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[doc.category]}`}>
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${s.badge}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium ${doc.required ? "text-red-400" : "text-slate-600"}`}>
                        {doc.required ? "Required" : "Optional"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-400">{doc.uploadedBy}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">{doc.dateAdded}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-400 max-w-[180px]">{doc.notes}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {(doc.status === "Uploaded" || doc.status === "Approved" || doc.status === "Draft") && (
                          <button className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
                            <Eye className="w-3 h-3" /> View
                          </button>
                        )}
                        {doc.status !== "Approved" && (
                          <button className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300">
                            <Upload className="w-3 h-3" /> {doc.status === "Missing" ? "Upload" : "Replace"}
                          </button>
                        )}
                        {(doc.status === "Uploaded" || doc.status === "Under Review") && (
                          <button className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
                            <Check className="w-3 h-3" /> Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}