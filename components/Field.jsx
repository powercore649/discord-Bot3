'use client';
import { useState } from 'react';

function Toggle({ value, onChange }) {
  return (
    <div className="switch" data-on={!!value} onClick={() => onChange(!value)}>
      <div className="knob" />
    </div>
  );
}

function TagsInput({ value = [], onChange }) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setDraft('');
  };
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        {(value || []).map((t) => (
          <span className="tag-chip" key={t}>
            {t}
            <button type="button" onClick={() => onChange(value.filter((x) => x !== t))}>✕</button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          className="input"
          placeholder="Ajouter puis Entrée"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
        />
        <button type="button" className="btn btn-ghost btn-sm" onClick={add}>Ajouter</button>
      </div>
    </div>
  );
}

export default function Field({ field, value, onChange, meta }) {
  const { type, label } = field;

  if (type === 'toggle') {
    return (
      <div className="field">
        <div className="toggle-row">
          <label style={{ marginBottom: 0 }}>{label}</label>
          <Toggle value={value} onChange={onChange} />
        </div>
      </div>
    );
  }

  if (type === 'textarea') {
    const textValue = field.list ? (Array.isArray(value) ? value.join('\n') : '') : (value || '');
    return (
      <div className="field">
        <label>{label}</label>
        <textarea
          className="input"
          value={textValue}
          onChange={(e) => onChange(field.list ? e.target.value.split('\n').filter(Boolean) : e.target.value)}
        />
      </div>
    );
  }

  if (type === 'number') {
    return (
      <div className="field">
        <label>{label}</label>
        <input className="input" type="number" value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} />
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div className="field">
        <label>{label}</label>
        <select className="select input" value={value ?? ''} onChange={(e) => onChange(field.options.every(o => typeof o === 'number') ? Number(e.target.value) : e.target.value)}>
          {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    );
  }

  if (type === 'tags') {
    return (
      <div className="field">
        <label>{label}</label>
        <TagsInput value={value} onChange={onChange} />
      </div>
    );
  }

  if (type === 'channel') {
    return (
      <div className="field">
        <label>{label}</label>
        <select className="select input" value={value || ''} onChange={(e) => onChange(e.target.value || null)}>
          <option value="">— Aucun —</option>
          {(meta?.channels || []).map((c) => <option key={c.id} value={c.id}>#{c.name}</option>)}
        </select>
      </div>
    );
  }

  if (type === 'channelList') {
    const selected = value || [];
    return (
      <div className="field">
        <label>{label}</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(meta?.channels || []).map((c) => {
            const active = selected.includes(c.id);
            return (
              <button
                type="button"
                key={c.id}
                className="tag-chip"
                style={{ background: active ? 'var(--accent-soft)' : undefined, color: active ? 'var(--accent)' : undefined, cursor: 'pointer' }}
                onClick={() => onChange(active ? selected.filter((id) => id !== c.id) : [...selected, c.id])}
              >
                #{c.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === 'role') {
    return (
      <div className="field">
        <label>{label}</label>
        <select className="select input" value={value || ''} onChange={(e) => onChange(e.target.value || null)}>
          <option value="">— Aucun —</option>
          {(meta?.roles || []).map((r) => <option key={r.id} value={r.id}>@{r.name}</option>)}
        </select>
      </div>
    );
  }

  // default: text
  return (
    <div className="field">
      <label>{label}</label>
      <input className="input" type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
