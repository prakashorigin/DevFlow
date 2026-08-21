import { useState } from "react";
import Input from "../../components/common/Input";
import { changePassword } from "../../services/userService";
import { apiMessage } from "../../utils/helpers";

function Settings() {
  const [values, setValues] = useState({ currentPassword: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [saving, setSaving] = useState(false);
  const submit = async (event) => { event.preventDefault(); setError(""); setMessage(""); if (values.password !== values.confirmPassword) { setError("New passwords do not match."); return; } setSaving(true); try { const result = await changePassword({ currentPassword: values.currentPassword, password: values.password }); setMessage(result.message); setValues({ currentPassword: "", password: "", confirmPassword: "" }); } catch (err) { setError(apiMessage(err, "Unable to change password.")); } finally { setSaving(false); } };
  return <main className="min-h-[calc(100vh-4rem)] bg-[#0b1220] p-6 text-white"><div className="max-w-2xl"><h1 className="text-3xl font-semibold">Settings</h1><p className="mt-2 text-slate-400">Manage your DevFlow account and security preferences.</p><section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-lg font-semibold">Change password</h2><form onSubmit={submit} className="mt-5 space-y-4"><Input label="Current password" type="password" value={values.currentPassword} onChange={(event) => setValues({ ...values, currentPassword: event.target.value })} autoComplete="current-password" required /><Input label="New password" type="password" value={values.password} onChange={(event) => setValues({ ...values, password: event.target.value })} autoComplete="new-password" minLength="8" required /><Input label="Confirm new password" type="password" value={values.confirmPassword} onChange={(event) => setValues({ ...values, confirmPassword: event.target.value })} autoComplete="new-password" minLength="8" required />{error && <p role="alert" className="text-sm text-rose-300">{error}</p>}{message && <p role="status" className="text-sm text-emerald-300">{message}</p>}<button disabled={saving} className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold disabled:opacity-60">{saving ? "Updating…" : "Update password"}</button></form></section></div></main>;
}

export default Settings;
