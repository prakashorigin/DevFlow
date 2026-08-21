import { CalendarDays, Flag, UserRound } from "lucide-react";
import { formatDate, statusLabel } from "../../utils/helpers";

export default function ProjectDetails({ project }) {
  if (!project) return null;
  return <div className="space-y-5 text-sm"><div><p className="text-slate-400">Description</p><p className="mt-1 leading-6 text-slate-200">{project.description || "No description has been added."}</p></div><dl className="grid gap-4 sm:grid-cols-2"><div className="flex gap-2 text-slate-300"><Flag size={17} className="mt-0.5 text-blue-300" /><div><dt className="text-slate-500">Status</dt><dd className="mt-1 capitalize">{statusLabel(project.status)}</dd></div></div><div className="flex gap-2 text-slate-300"><CalendarDays size={17} className="mt-0.5 text-blue-300" /><div><dt className="text-slate-500">Due date</dt><dd className="mt-1">{formatDate(project.dueDate)}</dd></div></div><div className="flex gap-2 text-slate-300"><UserRound size={17} className="mt-0.5 text-blue-300" /><div><dt className="text-slate-500">Owner</dt><dd className="mt-1">{project.owner?.name || "You"}</dd></div></div></dl></div>;
}
