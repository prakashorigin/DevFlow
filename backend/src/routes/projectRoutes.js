import Project from "../models/Project.js";
import { resource } from "../controllers/resourceController.js";
import { crudRouter } from "./resourceRoutes.js";
export default crudRouter(resource(Project, { name: "Project", ownerField: "owner", populate: "owner members" }));
