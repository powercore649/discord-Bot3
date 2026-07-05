// Ce module ne doit JAMAIS être importé depuis un composant client :
// il porte le secret partagé avec l'API pont du VPS.

const BRIDGE_URL = process.env.BRIDGE_URL;
const BRIDGE_SECRET = process.env.BRIDGE_SECRET;

async function bridgeFetch(path, options = {}) {
  if (!BRIDGE_URL || !BRIDGE_SECRET) {
    throw new Error('BRIDGE_URL / BRIDGE_SECRET non configurés côté serveur Vercel');
  }
  const res = await fetch(`${BRIDGE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BRIDGE_SECRET}`,
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const err = new Error((data && data.error) || `bridge_error_${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const bridge = {
  guildInfo: (guildId) => bridgeFetch(`/api/guilds/${guildId}`),
  channels:  (guildId) => bridgeFetch(`/api/guilds/${guildId}/channels`),
  roles:     (guildId) => bridgeFetch(`/api/guilds/${guildId}/roles`),
  getConfig: (key, guildId) => bridgeFetch(`/api/config/${key}/${guildId}`),
  putConfig: (key, guildId, body) => bridgeFetch(`/api/config/${key}/${guildId}`, { method: 'PUT', body: JSON.stringify(body) }),
  postConfig: (key, guildId, body) => bridgeFetch(`/api/config/${key}/${guildId}`, { method: 'POST', body: JSON.stringify(body) }),
  deleteConfig: (key, guildId, id) => bridgeFetch(`/api/config/${key}/${guildId}/${id}`, { method: 'DELETE' }),
};
