'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const POLL_MS = 3000;

// Charge un document de config, le rafraîchit automatiquement (sondage) pour
// refléter en quasi temps réel tout changement fait côté bot ou par un autre
// admin, et expose une fonction save() qui écrit immédiatement en base.
export function useLiveConfig(key, guildId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [remoteUpdated, setRemoteUpdated] = useState(false);
  const dirtyRef = useRef(false);
  dirtyRef.current = dirty;

  const fetchOnce = useCallback(async () => {
    try {
      const res = await fetch(`/api/bridge/${key}/${guildId}`, { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erreur de chargement');
      if (dirtyRef.current) {
        setRemoteUpdated(true);
      } else {
        setData(json);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [key, guildId]);

  useEffect(() => {
    fetchOnce();
    const interval = setInterval(fetchOnce, POLL_MS);
    return () => clearInterval(interval);
  }, [fetchOnce]);

  const update = (patch) => {
    setDirty(true);
    setData((prev) => ({ ...prev, ...patch }));
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/bridge/${key}/${guildId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Échec de la sauvegarde');
      setData(json);
      setDirty(false);
      setRemoteUpdated(false);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const reloadFromServer = () => {
    setDirty(false);
    setRemoteUpdated(false);
    fetchOnce();
  };

  return { data, loading, error, saving, dirty, remoteUpdated, update, save, reloadFromServer };
}
