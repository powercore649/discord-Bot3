'use client';
import Field from '@/components/Field';
import { useGuildMeta } from '@/components/useGuildMeta';
import { useLiveConfig } from '@/components/useLiveConfig';

export default function ConfigForm({ guildId, section }) {
  const meta = useGuildMeta(guildId);
  const { data, loading, error, saving, dirty, remoteUpdated, update, save, reloadFromServer } = useLiveConfig(section.key, guildId);

  if (loading) return <div className="card">Chargement…</div>;
  if (!data) return <div className="banner error">Impossible de charger cette section.</div>;

  return (
    <div className="card">
      <div className="panel-title">{section.title}</div>
      <p className="panel-desc">{section.description}</p>

      {remoteUpdated && (
        <div className="banner">
          <span>Cette configuration a changé ailleurs (bot ou autre admin) pendant votre modification.</span>
          <button className="btn btn-ghost btn-sm" onClick={reloadFromServer}>Recharger</button>
        </div>
      )}
      {error && <div className="banner error">{error}</div>}

      {section.fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={data[field.name]}
          meta={meta}
          onChange={(v) => update({ [field.name]: v })}
        />
      ))}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button className="btn btn-primary" disabled={!dirty || saving} onClick={save}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        {!dirty && !saving && <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>Synchronisé avec le bot</span>}
      </div>
    </div>
  );
}
