import TaskList from "./TaskList";
import { TASK_STATUSES } from "../../utils/constants";
import { statusLabel } from "../../utils/helpers";

export default function TaskBoard({ tasks, loading, onStatusChange, onDelete }) { return <div className="grid gap-4 xl:grid-cols-4">{TASK_STATUSES.map((status) => <section key={status} className="min-w-0 rounded-2xl bg-slate-950/45 p-3"><header className="mb-3 flex items-center justify-between px-1"><h2 className="font-medium text-slate-200">{statusLabel(status)}</h2><span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">{tasks.filter((task) => task.status === status).length}</span></header><TaskList tasks={tasks.filter((task) => task.status === status)} loading={loading} onStatusChange={onStatusChange} onDelete={onDelete} /></section>)}</div>; }
