import AppError from "../utils/AppError.js";
import { recordActivity } from "../services/activityService.js";

const accessFilter = (Model, user) => {
  if (Model.modelName === "Project") return { $or: [{ owner: user._id }, { members: user._id }] };
  if (Model.modelName === "Notification") return { recipient: user._id };
  return { $or: [{ reporter: user._id }, { assignee: user._id }] };
};

const withoutProtectedFields = (values, ownerField) => {
  const safeValues = { ...values };
  // Ownership is always assigned from the authenticated user, never from the
  // browser payload. This applies to both updates and creates.
  delete safeValues.owner;
  delete safeValues.reporter;
  delete safeValues.recipient;
  delete safeValues[ownerField];
  return safeValues;
};

export const resource = (Model, { name, ownerField = "reporter", populate = "" } = {}) => ({
  list: async (req, res, next) => {
    try {
      const filter = accessFilter(Model, req.user);
      if (req.query.status) filter.status = req.query.status;
      if (req.query.search) filter.$and = [{ $or: [{ title: new RegExp(req.query.search, "i") }, { name: new RegExp(req.query.search, "i") }] }];
      const items = await Model.find(filter).populate(populate).sort({ createdAt: -1 });
      res.json({ success: true, data: items });
    } catch (error) { next(error); }
  },
  get: async (req, res, next) => {
    try { const item = await Model.findOne({ _id: req.params.id, ...accessFilter(Model, req.user) }).populate(populate); if (!item) throw new AppError(`${name} not found`, 404); res.json({ success: true, data: item }); } catch (error) { next(error); }
  },
  create: async (req, res, next) => {
    try { const item = await Model.create({ ...withoutProtectedFields(req.body, ownerField), [ownerField]: req.user._id }); await recordActivity(req.user._id, `${name}_created`, `Created ${name.toLowerCase()} “${item.name || item.title}”`, { id: item._id }); res.status(201).json({ success: true, data: item }); } catch (error) { next(error); }
  },
  update: async (req, res, next) => {
    try { const item = await Model.findOneAndUpdate({ _id: req.params.id, ...accessFilter(Model, req.user) }, withoutProtectedFields(req.body, ownerField), { new: true, runValidators: true }).populate(populate); if (!item) throw new AppError(`${name} not found`, 404); res.json({ success: true, data: item }); } catch (error) { next(error); }
  },
  remove: async (req, res, next) => {
    try { const item = await Model.findOneAndDelete({ _id: req.params.id, ...accessFilter(Model, req.user) }); if (!item) throw new AppError(`${name} not found`, 404); res.json({ success: true, message: `${name} deleted` }); } catch (error) { next(error); }
  },
});
