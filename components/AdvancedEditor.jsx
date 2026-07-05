'use client';
import { useState, useEffect } from 'react';
import { ADVANCED_KEYS } from '@/lib/schemas';
import { useLiveConfig } from '@/components/useLiveConfig';

const MULTI_KEYS = new Set(['autorole', 'faq', 'automessage']);

function SingleKeyEditor({ guildId, dataKey }) {
  const { data, loading, error, saving, save, update, dirty } = useLiveConfig(dataKey, guildId);
  const [text, setText] = useState(null);
  const [parseError, setParseError] = useState(null);

  if (loading) return <div className="card">Chargement de « {dataKey} »…</div>;
  if (!data) return <div className="banner error">Échec du chargement de « {dataKey} »</div>;

  const displayText = text ?? JSON.stringify(data, null, 2);

  const onChangeText = (val) => {
    setText(val);
    try {
      const parsed = JSON.parse(val);
      setParseError(null);
      update(parsed);
    } catch {
      setParseError('JSON invalide — corrigez avant de sauvegarder.');
    }
  };

  return (
    <div className="card" style={{ marginBottom: 18 }}>
      <div className="panel-title" style={{ fontSize: 15 }}>{dataKey}</div>
      {error && <div className="banner error">{error}</div>}
      {parseError && <div className="banner error">{parseError}</div>}
      <textarea
        className="input mono"
        style={{ minHeight: 160 }}
        value={displayText}
        onChange={(e) => onChangeText(e.target.value)}
      />
      <div style={{ marginTop: 12 }}>
        <button className="btn btn-primary btn-sm" disabled={!dirty || saving || !!parseError} onClick={() => { save(); setText(null); }}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  );
}

function MultiKeyViewer({ guildId, dataKey }) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    let active = true;
    fetch(`/api/bridge/${dataKey}/${guildId}`)
      .then((r) => r.json())
      .then((d) => { if (active) setItems(d); })
      .catch(() => { if (active) setItems([]); });
    return () => { active = false; };
  }, [dataKey, guildId]);
  return (
    <div className="card" style={{ marginBottom: 18 }}>
      <div className="panel-title" style={{ fontSize: 15 }}>{dataKey} <span style={{ fontWeight: 400, color: 'var(--text-faint)', fontSize: 12.5 }}>(gérez les entrées depuis sa page dédiée dans le menu)</span></div>
      <pre className="mono" style={{ fontSize: 12.5, color: 'var(--text-dim)', overflowX: 'auto' }}>
        {JSON.stringify(items, null, 2)}
      </pre>
    </div>
  );
}

export default function AdvancedEditor({ guildId }) {
  return (
    <div>
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="panel-title">Éditeur avancé</div>
        <p className="panel-desc">
          Accès brut à l'intégralité des données stockées pour ce serveur — utile pour tout réglage qui n'a
          pas encore de formulaire dédié. Les modifications sont écrites directement dans la même base que
          le bot.
        </p>
      </div>
      {ADVANCED_KEYS.map((key) =>
        MULTI_KEYS.has(key)
          ? <MultiKeyViewer key={key} guildId={guildId} dataKey={key} />
          : <SingleKeyEditor key={key} guildId={guildId} dataKey={key} />
      )}
    </div>
  );
}
