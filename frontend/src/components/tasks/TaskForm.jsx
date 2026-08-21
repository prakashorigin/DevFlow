import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { PRIORITIES } from "../../utils/constants";
import { apiMessage } from "../../utils/helpers";

export default function TaskForm({ projects, onSave, onCancel }) {
  const [values, setValues] = useState({ title: "", description: "", project: projects[0]?._id || "", priority: "medium", dueDate: "" });
  const [saving, setSaving] = useState(false); const [error, setError] = useState("");
  const change = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => { event.preventDefault(); setSaving(true); setError(""); try { await onSave({ ...values, dueDate: values.dueDate || undefined }); } catch (err) { setError(apiMessage(err, "Unable to create the task.")); } finally { setSaving(false); } };
  return <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2"><Input label="Task title" name="title" value={values.title} onChange={change} required autoFocus /><label className="text-sm font-medium text-slate-300">Project<select name="project" value={values.project} onChange={change} required className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-blue-400">{projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}</select></label><label className="sm:col-span-2 text-sm font-medium text-slate-300">Description<textarea name="description" rows="3" value={values.description} onChange={change} className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-blue-400" /></label><label className="text-sm font-medium text-slate-300">Priority<select name="priority" value={values.priority} onChange={change} className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 capitalize text-white outline-none focus:border-blue-400">{PRIORITIES.map((priority) => <option key={priority} value={priority}>{priority}</option>)}</select></label><Input label="Due date" name="dueDate" type="date" value={values.dueDate} onChange={change} />{error && <p className="sm:col-span-2 text-sm text-rose-300">{error}</p>}<div className="flex justify-end gap-3 sm:col-span-2"><Button variant="secondary" onClick={onCancel}>Cancel</Button><Button type="submit" disabled={saving || !projects.length}>{saving ? "Creating…" : "Create task"}</Button></div></form>;
}
