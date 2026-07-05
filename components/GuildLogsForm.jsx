'use client';
import { useGuildMeta } from '@/components/useGuildMeta';
import { useLiveConfig } from '@/components/useLiveConfig';

const CATEGORIES = [
  { key: 'moderation', label: 'Modération (bans, mutes, warns…)' },
  { key: 'membres', label: 'Membres (arrivées, départs)' },
  { key: 'messages', label: 'Messages (suppressions, éditions)' },
  { key: 'vocal', label: 'Vocal (connexions, changements de salon)' },
];

export default function GuildLogsForm({ guildId }) {
  const meta = useGuildMeta(guildId);
  const { data, loading, error, saving, dirty, remoteUpdated, update, save, reloadFromServer } = useLiveConfig('guildlogs', guildId);

  if (loading) return <div className="card">Chargement…</div>;
  if (!data) return <div className="banner error">Impossible de charger cette section.</div>;

  const setCategory = (key, patch) => update({ [key]: { ...(data[key] || {}), ...patch } });

  return (
    <div className="card">
      <div className="panel-title">Logs</div>
      <p className="panel-desc">Activez chaque catégorie de logs et choisissez son salon de destination.</p>

      {remoteUpdated && (
        <div className="banner">
          <span>Cette configuration a changé ailleurs pendant votre modification.</span>
          <button className="btn btn-ghost btn-sm" onClick={reloadFromServer}>Recharger</button>
        </div>
      )}
      {error && <div className="banner error">{error}</div>}

      {CATEGORIES.map((cat) => {
        const val = data[cat.key] || {};
        return (
          <div key={cat.key} style={{ marginBottom: 22, paddingBottom: 18, borderBottom: '1px solid var(--border)' }}>
            <div className="toggle-row" style={{ marginBottom: val.enabled ? 12 : 0 }}>
              <label style={{ marginBottom: 0 }}>{cat.label}</label>
              <div className="switch" data-on={!!val.enabled} onClick={() => setCategory(cat.key, { enabled: !val.enabled })}>
                <div className="knob" />
              </div>
            </div>
            {val.enabled && (
              <select
                className="select input"
                value={val.channelId || ''}
                onChange={(e) => setCategory(cat.key, { channelId: e.target.value || null })}
              >
                <option value="">— Choisir un salon —</option>
                {(meta.channels || []).map((c) => <option key={c.id} value={c.id}>#{c.name}</option>)}
              </select>
            )}
          </div>
        );
      })}

      <button className="btn btn-primary" disabled={!dirty || saving} onClick={save}>
        {saving ? 'Enregistrement…' : 'Enregistrer'}
      </button>
    </div>
  );
}
