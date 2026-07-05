'use client';
import { useLiveConfig } from '@/components/useLiveConfig';

export default function WarnThresholdsForm({ guildId }) {
  const { data, loading, error, saving, dirty, remoteUpdated, update, save, reloadFromServer } = useLiveConfig('warnthresholds', guildId);

  if (loading) return <div className="card">Chargement…</div>;
  if (!data) return <div className="banner error">Impossible de charger cette section.</div>;

  const thresholds = data.thresholds || [];

  const setRow = (i, patch) => {
    const next = thresholds.map((row, idx) => (idx === i ? { ...row, ...patch } : row));
    update({ thresholds: next });
  };
  const removeRow = (i) => update({ thresholds: thresholds.filter((_, idx) => idx !== i) });
  const addRow = () => update({ thresholds: [...thresholds, { count: thresholds.length + 1, action: 'mute', duration: 60 }] });

  return (
    <div className="card">
      <div className="panel-title">Seuils de sanctions automatiques</div>
      <p className="panel-desc">Action déclenchée automatiquement selon le nombre d'avertissements cumulés.</p>

      {remoteUpdated && (
        <div className="banner">
          <span>Cette configuration a changé ailleurs pendant votre modification.</span>
          <button className="btn btn-ghost btn-sm" onClick={reloadFromServer}>Recharger</button>
        </div>
      )}
      {error && <div className="banner error">{error}</div>}

      <table className="data-table" style={{ marginBottom: 18 }}>
        <thead>
          <tr><th>Nombre de warns</th><th>Action</th><th>Durée (min, si mute)</th><th></th></tr>
        </thead>
        <tbody>
          {thresholds.map((row, i) => (
            <tr key={i}>
              <td><input className="input" type="number" value={row.count} onChange={(e) => setRow(i, { count: Number(e.target.value) })} /></td>
              <td>
                <select className="select input" value={row.action} onChange={(e) => setRow(i, { action: e.target.value })}>
                  <option value="mute">mute</option>
                  <option value="kick">kick</option>
                  <option value="ban">ban</option>
                </select>
              </td>
              <td><input className="input" type="number" value={row.duration || 0} onChange={(e) => setRow(i, { duration: Number(e.target.value) })} /></td>
              <td><button className="btn btn-danger btn-sm" onClick={() => removeRow(i)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-ghost" onClick={addRow}>+ Ajouter un seuil</button>
        <button className="btn btn-primary" disabled={!dirty || saving} onClick={save}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  );
}
