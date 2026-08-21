import ResourcePage from "../../components/common/ResourcePage";
export default function Tasks() { return <ResourcePage title="Tasks" subtitle="Keep delivery moving from to-do to done." endpoint="/tasks" defaultStatus="todo" fields={[{ name: "title", label: "Task title", required: true }, { name: "project", label: "Project ID", required: true }]} />; }
