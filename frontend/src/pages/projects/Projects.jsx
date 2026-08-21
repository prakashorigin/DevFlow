import { Plus } from "lucide-react";
import { useState } from "react";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import Modal from "../../components/common/Modal";
import ProjectDetails from "../../components/projects/ProjectDetails";
import ProjectForm from "../../components/projects/ProjectForm";
import ProjectList from "../../components/projects/ProjectList";
import useProjects from "../../hooks/useProjects";
import { apiMessage } from "../../utils/helpers";

export default function Projects() {
  const { projects, loading, error: loadError, addProject, removeProject } = useProjects();
  const [createOpen, setCreateOpen] = useState(false); const [selected, setSelected] = useState(null); const [actionError, setActionError] = useState("");
  const create = async (values) => { await addProject(values); setCreateOpen(false); };
  const remove = async (project) => { if (!window.confirm(`Delete “${project.name}”? This cannot be undone.`)) return; try { await removeProject(project._id); if (selected?._id === project._id) setSelected(null); } catch (err) { setActionError(apiMessage(err, "Unable to delete the project.")); } };
  return <main className="min-h-[calc(100vh-4rem)] bg-[#0b1220] p-4 text-white sm:p-6"><div className="mx-auto max-w-7xl"><header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-medium text-blue-300">WORKSPACE</p><h1 className="mt-1 text-3xl font-semibold">Projects</h1><p className="mt-2 text-slate-400">Plan, ship, and track every initiative.</p></div><Button onClick={() => setCreateOpen(true)}><Plus size={17} />New project</Button></header><div className="mt-6 space-y-4"><ErrorMessage>{actionError || loadError}</ErrorMessage><ProjectList projects={projects} loading={loading} onSelect={setSelected} onDelete={remove} /></div></div><Modal open={createOpen} title="Create project" onClose={() => setCreateOpen(false)}><ProjectForm onSave={create} onCancel={() => setCreateOpen(false)} /></Modal><Modal open={Boolean(selected)} title={selected?.name || "Project"} onClose={() => setSelected(null)}><ProjectDetails project={selected} /></Modal></main>;
}
