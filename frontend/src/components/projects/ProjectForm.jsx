import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { PRIORITIES, PROJECT_STATUSES } from "../../utils/constants";
import { apiMessage, statusLabel } from "../../utils/helpers";

export default function ProjectForm({ project, onSave, onCancel }) {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState({ name: project?.name || "", description: project?.description || "", status: project?.status || "planning", priority: project?.priority || "medium", dueDate: project?.dueDate ? project.dueDate.slice(0, 10) : "" });
  const change = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => { event.preventDefault(); setSaving(true); setError(""); try { await onSave({ ...values, dueDate: values.dueDate || undefined }); } catch (err) { setError(apiMessage(err, "Unable to save the project.")); } finally { setSaving(false); } };
  return <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2"><Input label="Project name" name="name" value={values.name} onChange={change} required autoFocus /><label className="text-sm font-medium text-slate-300">Status<select name="status" value={values.status} onChange={change} className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-blue-400">{PROJECT_STATUSES.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}</select></label><label className="sm:col-span-2 text-sm font-medium text-slate-300">Description<textarea name="description" value={values.description} onChange={change} rows="3" className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-blue-400" /></label><label className="text-sm font-medium text-slate-300">Priority<select name="priority" value={values.priority} onChange={change} className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 capitalize text-white outline-none focus:border-blue-400">{PRIORITIES.map((priority) => <option key={priority} value={priority}>{priority}</option>)}</select></label><Input label="Due date" name="dueDate" type="date" value={values.dueDate} onChange={change} />{error && <p className="sm:col-span-2 text-sm text-rose-300">{error}</p>}<div className="flex justify-end gap-3 sm:col-span-2"><Button variant="secondary" onClick={onCancel}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? "Saving…" : project ? "Save changes" : "Create project"}</Button></div></form>;
}
