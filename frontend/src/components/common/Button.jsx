export default function Button({ children, className = "", type = "button", variant = "primary", ...props }) {
  const styles = {
    primary: "bg-blue-500 text-white hover:bg-blue-400",
    secondary: "border border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-600 hover:bg-slate-800",
    danger: "bg-rose-500/15 text-rose-200 hover:bg-rose-500/25",
  };
  return <button type={type} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`} {...props}>{children}</button>;
}
