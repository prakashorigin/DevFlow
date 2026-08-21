import Task from "../models/Task.js";
import { resource } from "../controllers/resourceController.js";
import { crudRouter } from "./resourceRoutes.js";
export default crudRouter(resource(Task, { name: "Task", populate: "project reporter assignee" }));
