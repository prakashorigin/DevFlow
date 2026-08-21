import TaskCard from "./TaskCard";
import Loader from "../common/Loader";

export default function TaskList({ tasks, loading, onStatusChange, onDelete }) { if (loading) return <Loader label="Loading tasks…" />; if (!tasks.length) return <p className="rounded-xl border border-dashed border-slate-700 p-6 text-center text-sm text-slate-400">No tasks in this column.</p>; return <div className="space-y-3">{tasks.map((task) => <TaskCard key={task._id} task={task} onStatusChange={onStatusChange} onDelete={onDelete} />)}</div>; }
