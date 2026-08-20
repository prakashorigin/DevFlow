import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Clock3,
  GitPullRequest,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getHealth } from "../../services/healthService";

const trendData = [
  { label: "Jul 29", findings: 42, resolved: 28 },
  { label: "Aug 1", findings: 48, resolved: 34 },
  { label: "Aug 4", findings: 46, resolved: 36 },
  { label: "Aug 7", findings: 57, resolved: 40 },
  { label: "Aug 10", findings: 51, resolved: 42 },
  { label: "Aug 13", findings: 65, resolved: 49 },
  { label: "Aug 16", findings: 60, resolved: 52 },
  { label: "Aug 20", findings: 72, resolved: 61 },
];

const severityData = [
  { name: "Critical", value: 8, color: "#fb7185" },
  { name: "High", value: 24, color: "#fb923c" },
  { name: "Medium", value: 63, color: "#fbbf24" },
  { name: "Low", value: 51, color: "#60a5fa" },
];

const recentReviews = [
  {
    repository: "devflow/api-service",
    branch: "feat/user-onboarding",
    status: "Completed",
    statusStyle: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20",
    findings: 12,
    time: "12 min ago",
  },
  {
    repository: "devflow/web-client",
    branch: "fix/empty-state",
    status: "In review",
    statusStyle: "bg-blue-500/10 text-blue-300 ring-blue-400/20",
    findings: 5,
    time: "1 hr ago",
  },
  {
    repository: "devflow/worker",
    branch: "chore/queue-retry",
    status: "Completed",
    statusStyle: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20",
    findings: 3,
    time: "3 hrs ago",
  },
];

const findings = [
  {
    title: "Missing authorization check on project export",
    repository: "api-service",
    severity: "Critical",
    severityStyle: "bg-rose-500/10 text-rose-300 ring-rose-400/20",
    category: "Security",
    time: "8 min ago",
  },
  {
    title: "N+1 query in activity feed",
    repository: "web-client",
    severity: "High",
    severityStyle: "bg-orange-500/10 text-orange-300 ring-orange-400/20",
    category: "Performance",
    time: "34 min ago",
  },
  {
    title: "Unused response payload is being created",
    repository: "worker",
    severity: "Medium",
    severityStyle: "bg-amber-500/10 text-amber-200 ring-amber-400/20",
    category: "Maintainability",
    time: "1 hr ago",
  },
];

function MetricCard({ title, value, description, Icon, iconStyle, positive = true }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm shadow-black/10 transition hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
        </div>
        <span className={`rounded-xl p-2.5 ${iconStyle}`}>
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <p className={`mt-4 text-xs ${positive ? "text-emerald-300" : "text-rose-300"}`}>
        {description}
      </p>
    </article>
  );
}

function PanelHeader({ title, description, action }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 px-5 py-4 sm:px-6">
      <div>
        <h2 className="font-semibold text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function Dashboard() {
  const [apiStatus, setApiStatus] = useState("Checking API");
  const [period, setPeriod] = useState("30 days");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let active = true;

    const checkApi = async () => {
      try {
        const response = await getHealth();
        if (active && response.success) {
          setApiStatus("Systems operational");
        }
      } catch {
        if (active) {
          setApiStatus("API offline");
        }
      }
    };

    checkApi();

    return () => {
      active = false;
    };
  }, []);

  const refreshDashboard = () => {
    setIsRefreshing(true);
    window.setTimeout(() => setIsRefreshing(false), 650);
  };

  const apiOnline = apiStatus === "Systems operational";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0b1220] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium text-blue-300">CODE QUALITY OVERVIEW</p>
              <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className={`h-2 w-2 rounded-full ${apiOnline ? "bg-emerald-400" : apiStatus === "API offline" ? "bg-rose-400" : "animate-pulse bg-amber-400"}`} />
                {apiStatus}
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Engineering insights
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Keep review quality high, catch risk early, and see where your team is improving.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={refreshDashboard}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-[#0b1220]"
            >
              <Plus size={17} />
              New review
            </button>
          </div>
        </header>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Review summary">
          <MetricCard title="Reviews completed" value="42" description="↑ 16% from last period" Icon={GitPullRequest} iconStyle="bg-blue-500/10 text-blue-300" />
          <MetricCard title="Open findings" value="146" description="↓ 18% from last period" Icon={AlertTriangle} iconStyle="bg-amber-500/10 text-amber-300" />
          <MetricCard title="Resolved this period" value="118" description="↑ 24% from last period" Icon={CheckCircle2} iconStyle="bg-emerald-500/10 text-emerald-300" />
          <MetricCard title="Median review time" value="3h 18m" description="↓ 42 min from last period" Icon={Clock3} iconStyle="bg-violet-500/10 text-violet-300" />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-5">
          <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-sm shadow-black/10 xl:col-span-3">
            <PanelHeader
              title="Review activity"
              description="Findings identified and resolved across all repositories"
              action={
                <button type="button" onClick={() => setPeriod(period === "30 days" ? "90 days" : "30 days")} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-600 hover:text-white">
                  Last {period}<ChevronDown size={14} />
                </button>
              }
            />
            <div className="h-[300px] px-2 pb-4 pt-5 sm:px-5">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 6, right: 4, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="findingsGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#60a5fa" stopOpacity={0.32} /><stop offset="100%" stopColor="#60a5fa" stopOpacity={0} /></linearGradient>
                    <linearGradient id="resolvedGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#34d399" stopOpacity={0.18} /><stop offset="100%" stopColor="#34d399" stopOpacity={0} /></linearGradient>
                  </defs>
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} width={36} />
                  <Tooltip cursor={{ stroke: "#475569", strokeDasharray: "3 3" }} contentStyle={{ background: "#111827", border: "1px solid #334155", borderRadius: "10px", color: "#e2e8f0" }} labelStyle={{ color: "#94a3b8" }} />
                  <Area type="monotone" dataKey="findings" name="Findings" stroke="#60a5fa" strokeWidth={2.5} fill="url(#findingsGradient)" />
                  <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#34d399" strokeWidth={2.5} fill="url(#resolvedGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-800 px-5 py-3 text-xs text-slate-400 sm:px-6">
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-400" />Findings detected</span>
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />Findings resolved</span>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-sm shadow-black/10 xl:col-span-2">
            <PanelHeader title="Findings by severity" description="146 open findings" />
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-2 px-4 py-3 sm:flex-row sm:gap-5">
              <div className="h-48 w-48 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={severityData} dataKey="value" innerRadius={57} outerRadius={82} paddingAngle={3} stroke="none">
                      {severityData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Pie>
                    <text x="50%" y="47%" textAnchor="middle" fill="#f8fafc" fontSize="26" fontWeight="600">146</text>
                    <text x="50%" y="61%" textAnchor="middle" fill="#94a3b8" fontSize="11">OPEN</text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="grid w-full max-w-[240px] grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1" aria-label="Severity totals">
                {severityData.map((severity) => (
                  <li key={severity.name} className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-2 text-slate-400"><span className="h-2.5 w-2.5 rounded-full" style={{ background: severity.color }} />{severity.name}</span>
                    <strong className="font-medium text-slate-200">{severity.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-5">
          <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-sm shadow-black/10 xl:col-span-3">
            <PanelHeader title="Recent reviews" description="Latest pull-request analysis from your team" action={<button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:text-blue-200">View all <ArrowUpRight size={15} /></button>} />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="border-b border-slate-800 bg-slate-950/30 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-medium sm:px-6">Repository</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Findings</th><th className="px-5 py-3 text-right font-medium sm:px-6">Updated</th></tr></thead>
                <tbody className="divide-y divide-slate-800">
                  {recentReviews.map((review) => (
                    <tr key={`${review.repository}-${review.branch}`} className="transition hover:bg-slate-800/35">
                      <td className="px-5 py-4 sm:px-6"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/10 text-blue-300"><GitPullRequest size={17} /></span><div><p className="font-medium text-slate-200">{review.repository}</p><p className="mt-0.5 font-mono text-xs text-slate-500">{review.branch}</p></div></div></td>
                      <td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${review.statusStyle}`}>{review.status}</span></td>
                      <td className="px-4 py-4 text-slate-300">{review.findings}</td>
                      <td className="px-5 py-4 text-right text-slate-500 sm:px-6">{review.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-sm shadow-black/10 xl:col-span-2">
            <PanelHeader title="Review health" description="Signals from the last 30 days" />
            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex gap-3"><span className="mt-0.5 rounded-lg bg-emerald-500/10 p-2 text-emerald-300"><ShieldCheck size={18} /></span><div><p className="text-sm font-medium text-slate-200">Security coverage is improving</p><p className="mt-1 text-sm leading-5 text-slate-400">92% of changed files were checked against security rules.</p></div></div>
              <div className="flex gap-3"><span className="mt-0.5 rounded-lg bg-violet-500/10 p-2 text-violet-300"><Sparkles size={18} /></span><div><p className="text-sm font-medium text-slate-200">AI suggestions are being adopted</p><p className="mt-1 text-sm leading-5 text-slate-400">68% of accepted suggestions were merged within one day.</p></div></div>
              <div className="flex gap-3"><span className="mt-0.5 rounded-lg bg-amber-500/10 p-2 text-amber-300"><Activity size={18} /></span><div><p className="text-sm font-medium text-slate-200">Performance needs attention</p><p className="mt-1 text-sm leading-5 text-slate-400">Seven repeated query-pattern findings appeared this week.</p></div></div>
            </div>
          </article>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-sm shadow-black/10">
          <PanelHeader title="Priority findings" description="Highest-impact items detected in the latest reviews" action={<button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-blue-300 hover:text-blue-200">Open issues <ArrowUpRight size={15} /></button>} />
          <div className="divide-y divide-slate-800">
            {findings.map((finding) => (
              <article key={finding.title} className="flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-800/35 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex min-w-0 items-start gap-3"><span className="mt-0.5 rounded-lg bg-slate-800 p-2 text-slate-400"><CircleDot size={17} /></span><div className="min-w-0"><h3 className="truncate text-sm font-medium text-slate-200">{finding.title}</h3><p className="mt-1 text-xs text-slate-500">{finding.repository} · {finding.category} · {finding.time}</p></div></div>
                <span className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${finding.severityStyle}`}>{finding.severity}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
