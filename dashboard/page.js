import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserGuilds, hasAdmin } from '@/lib/discord';
import { bridge } from '@/lib/bridge';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';

export const dynamic = 'force-dynamic';

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);
  const guilds = await getUserGuilds(session.accessToken);
  const adminGuilds = guilds.filter((g) => hasAdmin(g.permissions));

  const withStatus = await Promise.all(
    adminGuilds.map(async (g) => {
      try {
        const info = await bridge.guildInfo(g.id);
        return { ...g, botPresent: true, memberCount: info.approximateMemberCount };
      } catch {
        return { ...g, botPresent: false };
      }
    })
  );

  return (
    <div className="center-screen" style={{ alignItems: 'flex-start', padding: '8vh 6vw' }}>
      <div className="hex-field" />
      <div style={{ maxWidth: 760, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 26 }}>Vos serveurs</h1>
            <p className="panel-desc" style={{ marginBottom: 0 }}>Choisissez un serveur à configurer.</p>
          </div>
          <SignOutButton />
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {withStatus.map((g) => (
            <Link key={g.id} href={g.botPresent ? `/dashboard/${g.id}` : '#'} className="guild-card" style={{ opacity: g.botPresent ? 1 : 0.5, pointerEvents: g.botPresent ? 'auto' : 'none' }}>
              <div className="guild-avatar">
                {g.icon
                  ? <img src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`} alt="" width={44} height={44} />
                  : g.name.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{g.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-faint)' }}>
                  {g.botPresent ? `${g.memberCount ?? '—'} membres` : 'Bumpify n\'est pas sur ce serveur'}
                </div>
              </div>
              {g.botPresent
                ? <span className="badge badge-success"><span className="live-dot" /> Actif</span>
                : <span className="badge badge-neutral">Bot absent</span>}
            </Link>
          ))}
          {withStatus.length === 0 && (
            <div className="card">Aucun serveur où vous êtes administrateur n'a été trouvé.</div>
          )}
        </div>
      </div>
    </div>
  );
}
