import Activity from "../models/Activity.js";

export const recordActivity = (user, type, message, metadata = {}) => Activity.create({
  user,
  type,
  message,
  metadata,
});
