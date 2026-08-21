import { useParams } from "react-router-dom";
import Projects from "./projects/Projects";

// Projects keeps the details modal and list in one workflow. This page remains
// available for direct links and route structure compatibility.
export default function ProjectDetails() { useParams(); return <Projects />; }
