import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { assertGuildAdmin } from '@/lib/discord';
import { bridge } from '@/lib/bridge';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import SignOutButton from '@/components/SignOutButton';

export const dynamic = 'force-dynamic';

export default async function GuildLayout({ children, params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/connexion');

  let guild;
  try {
    await assertGuildAdmin(session.accessToken, params.guildId);
    guild = await bridge.guildInfo(params.guildId);
  } catch {
    redirect('/dashboard');
  }

  return (
    <div className="app-shell">
      <div className="hex-field" />
      <Sidebar guildId={params.guildId} guildName={guild.name} />
      <div className="main-area">
        <div className="topbar">
          <span className="live-tag"><span className="live-dot" /> Synchronisé en direct avec le bot</span>
          <SignOutButton />
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
