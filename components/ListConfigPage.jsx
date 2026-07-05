'use client';
import { useEffect, useState } from 'react';
import Field from '@/components/Field';
import { useGuildMeta } from '@/components/useGuildMeta';

export default function ListConfigPage({ guildId, section }) {
  const meta = useGuildMeta(guildId);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState({});
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    const res = await fetch(`/api/bridge/${section.key}/${guildId}`, { cache: 'no-store' });
    const json = await res.json();
    if (res.ok) setItems(json);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section.key, guildId]);

  const create = async () => {
    setCreating(true);
    setError(null);
    try {
      const res = await fetch(`/api/bridge/${section.key}/${guildId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Échec de la création');
      setDraft({});
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const remove = async (id) => {
    await fetch(`/api/bridge/${section.key}/${guildId}/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="panel-title">{section.title}</div>
        <p className="panel-desc">{section.description}</p>

        {error && <div className="banner error">{error}</div>}

        {section.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={draft[field.name]}
            meta={meta}
            onChange={(v) => setDraft((d) => ({ ...d, [field.name]: v }))}
          />
        ))}
        <button className="btn btn-primary" disabled={creating} onClick={create}>
          {creating ? 'Ajout…' : 'Ajouter'}
        </button>
      </div>

      <div className="card">
        <div className="panel-title" style={{ fontSize: 15 }}>Entrées existantes</div>
        {loading ? (
          <p className="panel-desc">Chargement…</p>
        ) : items.length === 0 ? (
          <p className="panel-desc">Aucune entrée pour le moment.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                {section.columns.map((c) => <th key={c}>{c}</th>)}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it._id}>
                  {section.columns.map((c) => (
                    <td key={c}>{typeof it[c] === 'boolean' ? (it[c] ? 'Oui' : 'Non') : String(it[c] ?? '—')}</td>
                  ))}
                  <td><button className="btn btn-danger btn-sm" onClick={() => remove(it._id)}>Supprimer</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
