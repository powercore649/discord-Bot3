const ADMINISTRATOR = 0x8;

export async function getUserGuilds(accessToken) {
  const res = await fetch('https://discord.com/api/v10/users/@me/guilds', {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export function hasAdmin(permissions) {
  try {
    return (BigInt(permissions) & BigInt(ADMINISTRATOR)) === BigInt(ADMINISTRATOR);
  } catch {
    return false;
  }
}

// Vérifie que l'utilisateur connecté est bien admin du serveur demandé.
// Évite qu'un utilisateur ne modifie la config d'un serveur qui n'est pas le sien.
export async function assertGuildAdmin(accessToken, guildId) {
  const guilds = await getUserGuilds(accessToken);
  const guild = guilds.find(g => g.id === guildId);
  if (!guild || !hasAdmin(guild.permissions)) {
    const err = new Error('forbidden');
    err.status = 403;
    throw err;
  }
  return guild;
}
