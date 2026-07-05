'use client';
import { useGuildMeta } from '@/components/useGuildMeta';
import { useLiveConfig } from '@/components/useLiveConfig';
import Field from '@/components/Field';

export default function XpConfigForm({ guildId }) {
  const meta = useGuildMeta(guildId);
  const { data, loading, error, saving, dirty, remoteUpdated, update, save, reloadFromServer } = useLiveConfig('xpconfig', guildId);

  if (loading) return <div className="card">Chargement…</div>;
  if (!data) return <div className="banner error">Impossible de charger cette section.</div>;

  const levelRoles = data.levelRoles || [];
  const setLevelRole = (i, patch) => update({ levelRoles: levelRoles.map((r, idx) => (idx === i ? { ...r, ...patch } : r)) });
  const removeLevelRole = (i) => update({ levelRoles: levelRoles.filter((_, idx) => idx !== i) });
  const addLevelRole = () => update({ levelRoles: [...levelRoles, { level: 1, roleId: meta.roles?.[0]?.id || '' }] });

  return (
    <div className="card">
      <div className="panel-title">Niveaux & XP</div>
      <p className="panel-desc">Rôles de palier, salons exclus et message de montée de niveau.</p>

      {remoteUpdated && (
        <div className="banner">
          <span>Cette configuration a changé ailleurs pendant votre modification.</span>
          <button className="btn btn-ghost btn-sm" onClick={reloadFromServer}>Recharger</button>
        </div>
      )}
      {error && <div className="banner error">{error}</div>}

      <Field
        field={{ name: 'levelUpMessageTemplate', label: 'Message de montée de niveau ({user}, {level})', type: 'text' }}
        value={data.levelUpMessageTemplate}
        onChange={(v) => update({ levelUpMessageTemplate: v })}
      />
      <Field
        field={{ name: 'excludedChannels', label: 'Salons exclus du gain d\'XP', type: 'channelList' }}
        value={data.excludedChannels}
        meta={meta}
        onChange={(v) => update({ excludedChannels: v })}
      />

      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 10 }}>
        Rôles de palier
      </label>
      <table className="data-table" style={{ marginBottom: 14 }}>
        <thead><tr><th>Niveau</th><th>Rôle</th><th></th></tr></thead>
        <tbody>
          {levelRoles.map((r, i) => (
            <tr key={i}>
              <td><input className="input" type="number" value={r.level} onChange={(e) => setLevelRole(i, { level: Number(e.target.value) })} /></td>
              <td>
                <select className="select input" value={r.roleId} onChange={(e) => setLevelRole(i, { roleId: e.target.value })}>
                  {(meta.roles || []).map((role) => <option key={role.id} value={role.id}>@{role.name}</option>)}
                </select>
              </td>
              <td><button className="btn btn-danger btn-sm" onClick={() => removeLevelRole(i)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-ghost" onClick={addLevelRole}>+ Ajouter un rôle de palier</button>
        <button className="btn btn-primary" disabled={!dirty || saving} onClick={save}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  );
}
