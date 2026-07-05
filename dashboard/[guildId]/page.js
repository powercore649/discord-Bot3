import { bridge } from '@/lib/bridge';

export const dynamic = 'force-dynamic';

export default async function OverviewPage({ params }) {
  const { guildId } = params;
  const [server, premium, guild] = await Promise.all([
    bridge.getConfig('server', guildId),
    bridge.getConfig('premium', guildId),
    bridge.guildInfo(guildId),
  ]);

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 6 }}>Vue d'ensemble</h1>
      <p className="panel-desc">État actuel de {guild.name}, lu en direct depuis la base de données du bot.</p>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="num">{server.bumpCount ?? 0}</div>
          <div className="label">Bumps totaux</div>
        </div>
        <div className="stat-card">
          <div className="num">{server.bumpStreak ?? 0}</div>
          <div className="label">Streak actuel (jours)</div>
        </div>
        <div className="stat-card">
          <div className="num">{guild.approximateMemberCount ?? '—'}</div>
          <div className="label">Membres</div>
        </div>
        <div className="stat-card">
          <div className="num">{server.totalCoinsEarned ?? 0}</div>
          <div className="label">Coins générés</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="panel-title">Réseau de bump</div>
          <p className="panel-desc">
            Dernier bump : {server.lastBump ? new Date(server.lastBump).toLocaleString('fr-FR') : 'jamais'}
            <br />Rappels automatiques : {server.reminderEnabled ? 'activés' : 'désactivés'}
          </p>
        </div>
        <div className="card">
          <div className="panel-title">Premium</div>
          <p className="panel-desc">
            Statut : <strong style={{ color: premium.active ? 'var(--success)' : 'var(--text-dim)' }}>{premium.active ? 'Actif' : 'Inactif'}</strong>
            {premium.active && <><br />Palier : {premium.tier}</>}
          </p>
        </div>
      </div>
    </div>
  );
}
