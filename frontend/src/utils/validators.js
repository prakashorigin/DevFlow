export const isValidUsername = (value) => /^[A-Za-z0-9_]{3,30}$/.test(value || "");
export const isStrongPassword = (value) => typeof value === "string" && value.length >= 8;
export const isValidEmail = (value) => /^\S+@\S+\.\S+$/.test(value || "");

export function validateRegistration(values) {
  if (!values.name?.trim()) return "Your full name is required.";
  if (!isValidUsername(values.username)) return "Username must be 3–30 letters, numbers, or underscores.";
  if (!isValidEmail(values.email)) return "Enter a valid email address.";
  if (!isStrongPassword(values.password)) return "Password must be at least 8 characters.";
  if (values.password !== values.confirmPassword) return "Passwords do not match.";
  return "";
}
