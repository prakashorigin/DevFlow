import ProjectCard from "./ProjectCard";
import Loader from "../common/Loader";

export default function ProjectList({ projects, loading, onSelect, onDelete }) {
  if (loading) return <Loader label="Loading projects…" />;
  if (!projects.length) return <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center text-sm text-slate-400">No projects yet. Create your first project to start planning work.</div>;
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <ProjectCard key={project._id} project={project} onSelect={onSelect} onDelete={onDelete} />)}</div>;
}
