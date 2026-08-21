import Project from "../models/Project.js";
import { resource } from "./resourceController.js";

export default resource(Project, { name: "Project", ownerField: "owner", populate: "owner members" });
