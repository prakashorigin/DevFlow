import Task from "../models/Task.js";
import { resource } from "./resourceController.js";

export default resource(Task, { name: "Task", populate: "project reporter assignee" });
