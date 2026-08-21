import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import Modal from "../../components/common/Modal";
import InviteMember from "../../components/team/InviteMember";
import MemberList from "../../components/team/MemberList";
import { getTeamMembers, inviteMember } from "../../services/userService";
import { apiMessage } from "../../utils/helpers";

export default function Team() { const [members, setMembers] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [inviteOpen, setInviteOpen] = useState(false); const load = useCallback(async () => { setLoading(true); try { setMembers(await getTeamMembers()); setError(""); } catch (err) { setError(apiMessage(err, "Unable to load the team.")); } finally { setLoading(false); } }, []); useEffect(() => { load(); }, [load]); const invite = async (values) => { const member = await inviteMember(values); setMembers((current) => current.map((item) => item._id === member._id ? member : item)); setInviteOpen(false); }; return <main className="min-h-[calc(100vh-4rem)] bg-[#0b1220] p-4 text-white sm:p-6"><div className="mx-auto max-w-7xl"><header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-medium text-blue-300">COLLABORATION</p><h1 className="mt-1 text-3xl font-semibold">Team</h1><p className="mt-2 text-slate-400">People collaborating in your DevFlow workspace.</p></div><Button onClick={() => setInviteOpen(true)}><Plus size={17} />Invite member</Button></header><div className="mt-6 space-y-4"><ErrorMessage>{error}</ErrorMessage><MemberList members={members} loading={loading} /></div></div><Modal open={inviteOpen} title="Invite workspace member" onClose={() => setInviteOpen(false)}><InviteMember onInvite={invite} onCancel={() => setInviteOpen(false)} /></Modal></main>; }
