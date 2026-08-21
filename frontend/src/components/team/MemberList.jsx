import Loader from "../common/Loader";
import MemberCard from "./MemberCard";

export default function MemberList({ members, loading }) { if (loading) return <Loader label="Loading team…" />; if (!members.length) return <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-sm text-slate-400">No members have joined the workspace yet.</div>; return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{members.map((member) => <MemberCard key={member._id} member={member} />)}</div>; }
