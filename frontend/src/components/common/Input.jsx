import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Input({ label, error, className = "", type = "text", ...props }) {
  const [visible, setVisible] = useState(false);
  const password = type === "password";
  return <label className="block text-sm font-medium text-slate-300">{label && <span>{label}</span>}<span className="relative mt-1.5 block"><input type={password && visible ? "text" : type} className={`w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-blue-400 ${password ? "pr-10" : ""} ${className}`} {...props} />{password && <button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? "Hide password" : "Show password"} className="absolute right-3 top-2.5 text-slate-400 hover:text-white">{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button>}</span>{error && <span className="mt-1 block text-xs text-rose-300">{error}</span>}</label>;
}
