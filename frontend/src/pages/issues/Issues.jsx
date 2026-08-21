import ResourcePage from "../../components/common/ResourcePage";
export default function Issues() { return <ResourcePage title="Issues" subtitle="Capture, prioritize, and resolve delivery risks." endpoint="/issues" defaultStatus="open" fields={[{ name: "title", label: "Issue title", required: true }, { name: "project", label: "Project ID", required: true }]} />; }
