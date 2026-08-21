import Issue from "../models/Issue.js";
import { resource } from "../controllers/resourceController.js";
import { crudRouter } from "./resourceRoutes.js";
export default crudRouter(resource(Issue, { name: "Issue", populate: "project reporter assignee" }));
