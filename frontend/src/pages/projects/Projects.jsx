import ResourcePage from "../../components/common/ResourcePage";
export default function Projects() { return <ResourcePage title="Projects" subtitle="Plan, ship, and track every initiative." endpoint="/projects" defaultStatus="planning" fields={[{ name: "name", label: "Project name", required: true }, { name: "description", label: "Description" }]} />; }
