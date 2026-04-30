"use client";
import React, { useState } from "react";
import { Plus, CheckCircle, Circle, Clock, XCircle, User } from "lucide-react";

const INITIAL_TASKS = [
  { id: 1, name: "Confirm buyer importer-of-record (IOR)", owner: "T. Jayasinghe", dueDate: "2026-04-28", priority: "High", status: "Complete", notes: "Confirmed via email 2026-04-24." },
  { id: 2, name: "Confirm product specifications with buyer", owner: "T. Jayasinghe", dueDate: "2026-04-27", priority: "High", status: "Complete", notes: "Air compressor spec sheet reviewed and approved." },
  { id: 3, name: "Contact supplier — Global Industrial", owner: "Operations", dueDate: "2026-04-26", priority: "High", status: "Complete", notes: "Intro call completed. Quote requested." },
  { id: 4, name: "Contact supplier — MSC Industrial", owner: "Operations", dueDate: "2026-04-29", priority: "Medium", status: "In Progress", notes: "Follow-up email sent 2026-04-26." },
  { id: 5, name: "Follow up with Grainger Industrial", owner: "Operations", dueDate: "2026-04-30", priority: "Medium", status: "Open", notes: "" },
  { id: 6, name: "Verify MOQ — all suppliers", owner: "Operations", dueDate: "2026-04-28", priority: "Medium", status: "Complete", notes: "Grainger MOQ 5. Global Industrial MOQ 3." },
  { id: 7, name: "Get freight estimate from Maersk", owner: "Operations", dueDate: "2026-05-01", priority: "High", status: "In Progress", notes: "FCL 20ft quote requested. Awaiting confirmation." },
  { id: 8, name: "Confirm duties/taxes responsibility with buyer", owner: "T. Jayasinghe", dueDate: "2026-04-29", priority: "High", status: "Waiting", notes: "Buyer confirming with Sri Lanka customs agent." },
  { id: 9, name: "Prepare commercial invoice draft", owner: "Operations", dueDate: "2026-05-03", priority: "Medium", status: "Open", notes: "" },
  { id: 10, name: "Prepare packing list", owner: "Operations", dueDate: "2026-05-05", priority: "Medium", status: "Open", notes: "" },
  { id: 11, name: "Confirm payment received — sourcing review fee", owner: "Finance", dueDate: "2026-04-25", priority: "High", status: "Complete", notes: "Payment confirmed 2026-04-23." },
  { id: 12, name: "Send quote to buyer", owner: "T. Jayasinghe", dueDate: "2026-04-30", priority: "High", status: "Open", notes: "Pending freight estimate." },
  { id: 13, name: "Book shipment upon buyer approval", owner: "Operations", dueDate: "2026-05-08", priority: "High", status: "Blocked", notes: "Blocked pending buyer payment and document upload." },
  { id: 14, name: "Upload final documents to library", owner: "Operations", dueDate: "2026-05-06", priority: "Medium", status: "Open", notes: "" },
];

const STATUS_CONFIG = {
  "Open":        { badge: "bg-slate-700/60 text-slate-400 border-slate-600",     icon: Circle,        dot: "bg-slate-500" },
  "In Progress": { badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",      icon: Clock,         dot: "bg-blue-400" },
  "Waiting":     { badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",   icon: Clock,         dot: "bg-amber-400" },
  "Complete":    { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", icon: CheckCircle, dot: "bg-emerald-400" },
  "Blocked":     { badge: "bg-red-500/15 text-red-400 border-red-500/30",         icon: XCircle,       dot: "bg-red-400" },
};

const PRIORITY_STYLES = {
  "High":   "text-red-400",
  "Medium": "text-amber-400",
  "Low":    "text-slate-500",
};

const STATUSES = ["Open", "In Progress", "Waiting", "Complete", "Blocked"];
const PRIORITIES = ["High", "Medium", "Low"];
const OWNERS = ["Operations", "T. Jayasinghe", "Finance", "Logistics", "Compliance"];

export default function TaskManager() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ name: "", owner: "Operations", dueDate: "", priority: "Medium", status: "Open", notes: "" });

  const filtered = filter === "All" ? tasks : tasks.filter(t => t.status === filter);

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = tasks.filter(t => t.status === s).length;
    return acc;
  }, {});

  const cycleStatus = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const idx = STATUSES.indexOf(t.status);
      return { ...t, status: STATUSES[(idx + 1) % STATUSES.length] };
    }));
  };

  const addTask = () => {
    if (!newTask.name.trim()) return;
    setTasks(prev => [...prev, { ...newTask, id: Date.now() }]);
    setNewTask({ name: "", owner: "Operations", dueDate: "", priority: "Medium", status: "Open", notes: "" });
    setShowAddForm(false);
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Task & Follow-Up Manager</h1>
        <p className="text-slate-400 mt-1 text-sm">PR-0041 — Industrial Air Compressors — Lanka Heavy Equip Ltd</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {STATUSES.map((s) => {
          const cfg = STATUS_CONFIG[s];
          return (
            <div key={s} className={`rounded-xl border p-4 ${cfg.badge.replace("text-", "border-").split(" ").pop()}`} style={{}}>
              <div className={`text-2xl font-bold ${cfg.badge.split(" ")[1]}`}>{counts[s]}</div>
              <div className="text-xs text-slate-500 mt-1">{s}</div>
            </div>
          );
        })}
      </div>

      {/* Filters + Add */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {["All", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === s ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {s} {s !== "All" && `(${counts[s]})`}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="bg-slate-900 rounded-xl border border-amber-500/20 p-5 mb-5">
          <h3 className="font-semibold text-white text-sm mb-4">New Task</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="text-xs text-slate-500 mb-1 block">Task Name</label>
              <input
                value={newTask.name}
                onChange={e => setNewTask(p => ({ ...p, name: e.target.value }))}
                placeholder="Describe the task..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            {[
              { label: "Owner", field: "owner", options: OWNERS },
              { label: "Priority", field: "priority", options: PRIORITIES },
              { label: "Status", field: "status", options: STATUSES },
            ].map(({ label, field, options }) => (
              <div key={field}>
                <label className="text-xs text-slate-500 mb-1 block">{label}</label>
                <select
                  value={newTask[field]}
                  onChange={e => setNewTask(p => ({ ...p, [field]: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={e => setNewTask(p => ({ ...p, dueDate: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Notes</label>
              <input
                value={newTask.notes}
                onChange={e => setNewTask(p => ({ ...p, notes: e.target.value }))}
                placeholder="Optional notes..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addTask} className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm font-semibold hover:bg-amber-400">Save Task</button>
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-700">Cancel</button>
          </div>
        </div>
      )}

      {/* Task Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Task</th>
                <th className="px-5 py-3 text-left">Owner</th>
                <th className="px-5 py-3 text-left">Priority</th>
                <th className="px-5 py-3 text-left">Due Date</th>
                <th className="px-5 py-3 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((task) => {
                const cfg = STATUS_CONFIG[task.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={task.id} className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${task.status === "Complete" ? "opacity-60" : ""}`}>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => cycleStatus(task.id)}
                        title="Click to cycle status"
                        className={`flex items-center gap-2 text-xs px-2.5 py-1 rounded-full border font-medium transition-opacity hover:opacity-80 ${cfg.badge}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {task.status}
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-medium ${task.status === "Complete" ? "line-through text-slate-500" : "text-white"}`}>
                        {task.name}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <User className="w-3 h-3" /> {task.owner}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold ${PRIORITY_STYLES[task.priority]}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-400">{task.dueDate || "—"}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 max-w-[200px]">{task.notes || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-slate-600 mt-3">Click a status badge to cycle through statuses.</p>
    </div>
  );
}