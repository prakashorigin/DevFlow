import { CheckCircle2, FolderKanban, ListTodo, Users } from "lucide-react";
import { useEffect, useState } from "react";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import RecentProjects from "../../components/dashboard/RecentProjects";
import StatsCard from "../../components/dashboard/StatsCard";
import ErrorMessage from "../../components/common/ErrorMessage";
import Loader from "../../components/common/Loader";
import useProjects from "../../hooks/useProjects";
import useTasks from "../../hooks/useTasks";
import { getTeamMembers } from "../../services/userService";
import { apiMessage } from "../../utils/helpers";

export default function Dashboard() {
  const { projects, loading: projectsLoading, error: projectsError } = useProjects();
  const { tasks, loading: tasksLoading, error: tasksError } = useTasks();
  const [teamCount, setTeamCount] = useState(0);
  const [teamError, setTeamError] = useState("");

  useEffect(() => {
    let current = true;
    getTeamMembers()
      .then((members) => { if (current) setTeamCount(members.length); })
      .catch((error) => { if (current) setTeamError(apiMessage(error, "Unable to load the team count.")); });
    return () => { current = false; };
  }, []);

  const activities = [
    ...projects.map((project) => ({ _id: `project-${project._id}`, description: `Project “${project.name}” was created`, createdAt: project.createdAt })),
    ...tasks.map((task) => ({ _id: `task-${task._id}`, description: `Task “${task.title}” is ${task.status?.replaceAll("_", " ")}`, createdAt: task.updatedAt || task.createdAt })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  const loading = projectsLoading || tasksLoading;

  return <main className="min-h-[calc(100vh-4rem)] bg-[#0b1220] p-4 text-slate-100 sm:p-6"><div className="mx-auto max-w-7xl"><header><p className="text-sm font-medium text-blue-300">DEVFLOW WORKSPACE</p><h1 className="mt-1 text-3xl font-semibold">Good work starts here.</h1><p className="mt-2 text-slate-400">See what your team is building and keep delivery on track.</p></header><section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatsCard label="Total projects" value={projects.length} detail={`${projects.filter((project) => project.status === "active").length} active`} icon={FolderKanban} tone="blue" /><StatsCard label="Active tasks" value={tasks.filter((task) => task.status !== "completed").length} detail="Across all projects" icon={ListTodo} tone="amber" /><StatsCard label="Completed tasks" value={tasks.filter((task) => task.status === "completed").length} detail="Ready to celebrate" icon={CheckCircle2} tone="green" /><StatsCard label="Team members" value={teamCount} detail="Workspace collaborators" icon={Users} tone="violet" /></section><div className="mt-6"><ErrorMessage>{projectsError || tasksError || teamError}</ErrorMessage></div>{loading ? <Loader label="Loading your workspace…" /> : <section className="mt-6 grid gap-6 xl:grid-cols-5"><div className="xl:col-span-3"><RecentProjects projects={projects} /></div><div className="xl:col-span-2"><ActivityFeed activities={activities} /></div></section>}</div></main>;
}
