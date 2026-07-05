'use client';
import { useEffect, useState } from 'react';

export function useGuildMeta(guildId) {
  const [meta, setMeta] = useState({ channels: [], roles: [] });
  useEffect(() => {
    let active = true;
    fetch(`/api/guild/${guildId}/meta`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => { if (active && !data.error) setMeta(data); })
      .catch(() => {});
    return () => { active = false; };
  }, [guildId]);
  return meta;
}
