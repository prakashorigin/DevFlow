import AppError from "../utils/AppError.js";
import { recordActivity } from "../services/activityService.js";

const accessibleQuery = (req, key) => ({ $or: [{ owner: req.user._id }, { members: req.user._id }, { reporter: req.user._id }, { assignee: req.user._id }, { recipient: req.user._id }], ...key ? { [key]: req.params.id } : {} });

export const resource = (Model, { name, ownerField = "reporter", populate = "" } = {}) => ({
  list: async (req, res, next) => {
    try {
      const filter = Model.modelName === "Project" ? { $or: [{ owner: req.user._id }, { members: req.user._id }] } : Model.modelName === "Notification" ? { recipient: req.user._id } : { $or: [{ reporter: req.user._id }, { assignee: req.user._id }] };
      if (req.query.status) filter.status = req.query.status;
      if (req.query.search) filter.$and = [{ $or: [{ title: new RegExp(req.query.search, "i") }, { name: new RegExp(req.query.search, "i") }] }];
      const items = await Model.find(filter).populate(populate).sort({ createdAt: -1 });
      res.json({ success: true, data: items });
    } catch (error) { next(error); }
  },
  get: async (req, res, next) => {
    try { const item = await Model.findById(req.params.id).populate(populate); if (!item) throw new AppError(`${name} not found`, 404); res.json({ success: true, data: item }); } catch (error) { next(error); }
  },
  create: async (req, res, next) => {
    try { const item = await Model.create({ ...req.body, [ownerField]: req.user._id }); await recordActivity(req.user._id, `${name}_created`, `Created ${name.toLowerCase()} “${item.name || item.title}”`, { id: item._id }); res.status(201).json({ success: true, data: item }); } catch (error) { next(error); }
  },
  update: async (req, res, next) => {
    try { const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate(populate); if (!item) throw new AppError(`${name} not found`, 404); res.json({ success: true, data: item }); } catch (error) { next(error); }
  },
  remove: async (req, res, next) => {
    try { const item = await Model.findByIdAndDelete(req.params.id); if (!item) throw new AppError(`${name} not found`, 404); res.json({ success: true, message: `${name} deleted` }); } catch (error) { next(error); }
  },
});
