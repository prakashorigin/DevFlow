import { CalendarDays, Trash2 } from "lucide-react";
import { formatDate, statusLabel } from "../../utils/helpers";

const statusStyle = { planning: "bg-slate-700 text-slate-200", active: "bg-blue-500/15 text-blue-200", on_hold: "bg-amber-500/15 text-amber-200", completed: "bg-emerald-500/15 text-emerald-200", archived: "bg-slate-700 text-slate-400" };

export default function ProjectCard({ project, onSelect, onDelete }) {
  return <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700 hover:bg-slate-900/90">
    <div className="flex items-start justify-between gap-3"><button onClick={() => onSelect?.(project)} className="min-w-0 text-left"><h2 className="truncate font-semibold text-white hover:text-blue-300">{project.name}</h2><p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-400">{project.description || "No description yet."}</p></button><button onClick={() => onDelete?.(project)} aria-label={`Delete ${project.name}`} className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"><Trash2 size={17} /></button></div>
    <div className="mt-5 flex items-center justify-between gap-2 text-xs"><span className={`rounded-full px-2.5 py-1 font-medium ${statusStyle[project.status] || statusStyle.planning}`}>{statusLabel(project.status)}</span><span className="flex items-center gap-1 text-slate-500"><CalendarDays size={14} />{formatDate(project.dueDate)}</span></div>
  </article>;
}
