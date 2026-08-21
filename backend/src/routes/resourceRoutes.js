import express from "express";
import { protect } from "../middleware/auth.js";

export const crudRouter = (controller) => {
  const router = express.Router();
  router.use(protect);
  router.route("/").get(controller.list).post(controller.create);
  router.route("/:id").get(controller.get).put(controller.update).delete(controller.remove);
  return router;
};
