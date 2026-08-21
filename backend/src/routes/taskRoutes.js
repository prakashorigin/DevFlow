import taskController from "../controllers/taskController.js";
import { crudRouter } from "./resourceRoutes.js";
export default crudRouter(taskController);
