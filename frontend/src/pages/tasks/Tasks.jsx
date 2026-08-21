import { Plus } from "lucide-react";
import { useState } from "react";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import Modal from "../../components/common/Modal";
import TaskBoard from "../../components/tasks/TaskBoard";
import TaskForm from "../../components/tasks/TaskForm";
import useProjects from "../../hooks/useProjects";
import useTasks from "../../hooks/useTasks";
import { apiMessage } from "../../utils/helpers";

export default function Tasks() { const { projects } = useProjects(); const { tasks, loading, error: loadError, addTask, saveTask, removeTask } = useTasks(); const [createOpen, setCreateOpen] = useState(false); const [actionError, setActionError] = useState(""); const create = async (values) => { await addTask(values); setCreateOpen(false); }; const changeStatus = async (id, status) => { try { await saveTask(id, { status }); } catch (err) { setActionError(apiMessage(err, "Unable to update the task.")); } }; const remove = async (id) => { if (!window.confirm("Delete this task?")) return; try { await removeTask(id); } catch (err) { setActionError(apiMessage(err, "Unable to delete the task.")); } }; return <main className="min-h-[calc(100vh-4rem)] bg-[#0b1220] p-4 text-white sm:p-6"><div className="mx-auto max-w-7xl"><header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-medium text-blue-300">DELIVERY</p><h1 className="mt-1 text-3xl font-semibold">Tasks</h1><p className="mt-2 text-slate-400">Keep delivery moving from to-do to done.</p></div><Button onClick={() => setCreateOpen(true)} disabled={!projects.length}><Plus size={17} />New task</Button></header>{!projects.length && !loading && <p className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">Create a project before adding tasks.</p>}<div className="mt-6 space-y-4"><ErrorMessage>{actionError || loadError}</ErrorMessage><TaskBoard tasks={tasks} loading={loading} onStatusChange={changeStatus} onDelete={remove} /></div></div><Modal open={createOpen} title="Create task" onClose={() => setCreateOpen(false)}><TaskForm projects={projects} onSave={create} onCancel={() => setCreateOpen(false)} /></Modal></main>; }
