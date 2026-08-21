import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthShell, Field } from "./Login";
import { useAuth } from "../../context/AuthContext";
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("password") !== form.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const values = Object.fromEntries(form);
      delete values.confirmPassword;
      const result = await register(values);
      setMessage(`${result.message}${result.data?.verificationCode ? ` Development code: ${result.data.verificationCode}` : ""}`);
      window.setTimeout(() => navigate("/login"), 1300);
    } catch (err) {
      setError(err.userMessage || err.response?.data?.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  const visibilityButton = (visible, onClick, label) => (
    <button type="button" onClick={onClick} aria-label={label} className="rounded p-0.5 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
      {visible ? <EyeOff size={17} /> : <Eye size={17} />}
    </button>
  );

  return <AuthShell title="Create your account" subtitle="Start building with your team in DevFlow.">
    <form onSubmit={submit} className="space-y-3">
      <Field label="Full name" name="name" autoComplete="name" required />
      <Field label="Username" name="username" autoComplete="username" pattern="[A-Za-z0-9_]{3,30}" title="Use 3–30 letters, numbers, or underscores." required />
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <Field label="Phone number" name="phone" type="tel" autoComplete="tel" />
      <Field label="Password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength="8" action={visibilityButton(showPassword, () => setShowPassword((visible) => !visible), showPassword ? "Hide password" : "Show password")} required />
      <Field label="Confirm password" name="confirmPassword" type={showConfirmation ? "text" : "password"} autoComplete="new-password" minLength="8" action={visibilityButton(showConfirmation, () => setShowConfirmation((visible) => !visible), showConfirmation ? "Hide confirmation password" : "Show confirmation password")} required />
      {error && <p role="alert" className="rounded-lg bg-rose-500/10 p-3 text-sm text-rose-300">{error}</p>}
      {message && <p role="status" className="rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</p>}
      <button disabled={loading} className="w-full rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Creating account..." : "Create account"}</button>
    </form>
    <p className="mt-5 text-center text-sm text-slate-400">Already have an account? <Link to="/login" className="text-blue-300 hover:text-blue-200">Sign in</Link></p>
  </AuthShell>;
}
