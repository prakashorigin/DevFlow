import projectController from "../controllers/projectController.js";
import { crudRouter } from "./resourceRoutes.js";
export default crudRouter(projectController);
