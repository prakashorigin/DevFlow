import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Issue from "../models/Issue.js";
import Activity from "../models/Activity.js";

export const dashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const [projects, tasks, issues, activity] = await Promise.all([
      Project.find({ $or: [{ owner: userId }, { members: userId }] }),
      Task.find({ $or: [{ reporter: userId }, { assignee: userId }] }),
      Issue.find({ $or: [{ reporter: userId }, { assignee: userId }] }),
      Activity.find({ user: userId }).populate("user", "name avatar").sort({ createdAt: -1 }).limit(8),
    ]);
    const statusCount = (records, statuses) => Object.fromEntries(statuses.map((status) => [status, records.filter((record) => record.status === status).length]));
    res.json({ success: true, data: {
      stats: { totalProjects: projects.length, activeTasks: tasks.filter((task) => task.status !== "completed").length, completedTasks: tasks.filter((task) => task.status === "completed").length, openIssues: issues.filter((issue) => !["resolved", "closed"].includes(issue.status)).length, completionRate: tasks.length ? Math.round((tasks.filter((task) => task.status === "completed").length / tasks.length) * 100) : 0 },
      projectProgress: statusCount(projects, ["planning", "active", "on_hold", "completed"]),
      taskOverview: statusCount(tasks, ["todo", "in_progress", "in_review", "completed"]),
      issueOverview: statusCount(issues, ["open", "in_progress", "resolved", "closed"]),
      projects: projects.slice(0, 5), activity,
    } });
  } catch (error) { next(error); }
};
