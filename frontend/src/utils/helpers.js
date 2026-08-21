import { STATUS_LABELS } from "./constants";

export const statusLabel = (value) => STATUS_LABELS[value] || String(value || "Not set").replaceAll("_", " ");

export const initials = (name = "?") => name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

export const formatDate = (value) => value ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value)) : "No due date";

export const apiMessage = (error, fallback = "Something went wrong. Please try again.") => error?.userMessage || error?.response?.data?.message || fallback;
