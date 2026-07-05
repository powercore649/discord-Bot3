// Définit les champs affichés pour chaque section "document unique" du dashboard.
// Types de champs supportés par <ConfigForm>: toggle, text, textarea, number, select, tags, channel, role

export const SECTIONS = {
  bump: {
    key: 'server',
    title: 'Bump & Réseau',
    description: 'Salons, rôle de rappel et fiche publique de votre serveur dans le réseau inter-serveurs.',
    fields: [
      { name: 'bumpChannelId', label: 'Salon autorisé pour /bump', type: 'channel' },
      { name: 'feedChannelId', label: 'Salon qui reçoit les bumps des autres serveurs', type: 'channel' },
      { name: 'logChannelId', label: 'Salon de logs internes', type: 'channel' },
      { name: 'bumpRoleId', label: 'Rôle pingé au rappel de bump', type: 'role' },
      { name: 'description', label: 'Description publique du serveur', type: 'textarea' },
      { name: 'inviteLink', label: "Lien d'invitation affiché aux autres serveurs", type: 'text' },
      { name: 'tags', label: 'Tags (séparés par des virgules)', type: 'tags' },
      { name: 'language', label: 'Langue', type: 'select', options: ['fr', 'en', 'es', 'de'] },
      { name: 'nsfw', label: 'Serveur NSFW', type: 'toggle' },
      { name: 'reminderEnabled', label: 'Activer les rappels automatiques de bump', type: 'toggle' },
    ],
  },
  welcome: {
    key: 'welcome',
    title: "Message de bienvenue",
    description: "Message envoyé automatiquement à l'arrivée d'un nouveau membre.",
    fields: [
      { name: 'enabled', label: 'Activer les messages de bienvenue', type: 'toggle' },
      { name: 'channelId', label: 'Salon de bienvenue', type: 'channel' },
      { name: 'message', label: 'Message ({user}, {server})', type: 'textarea' },
      { name: 'backgroundUrl', label: "URL de l'image de fond (carte de bienvenue)", type: 'text' },
    ],
  },
  farewell: {
    key: 'farewell',
    title: 'Message de départ',
    description: "Message envoyé automatiquement lorsqu'un membre quitte le serveur.",
    fields: [
      { name: 'enabled', label: 'Activer les messages de départ', type: 'toggle' },
      { name: 'channelId', label: 'Salon de départ', type: 'channel' },
      { name: 'message', label: 'Message ({user})', type: 'textarea' },
    ],
  },
  automod: {
    key: 'automod',
    title: 'Auto-modération',
    description: 'Anti-spam, anti-raid, filtrage de liens et de majuscules.',
    fields: [
      { name: 'spamEnabled', label: 'Anti-spam activé', type: 'toggle' },
      { name: 'spamThreshold', label: 'Messages max avant action', type: 'number' },
      { name: 'spamWindow', label: 'Fenêtre de détection (ms)', type: 'number' },
      { name: 'spamAction', label: 'Action anti-spam', type: 'select', options: ['delete', 'mute', 'kick', 'ban'] },
      { name: 'spamMuteDuration', label: 'Durée du mute (minutes)', type: 'number' },
      { name: 'raidEnabled', label: 'Anti-raid activé', type: 'toggle' },
      { name: 'raidThreshold', label: "Arrivées max avant déclenchement", type: 'number' },
      { name: 'raidWindow', label: 'Fenêtre de détection raid (ms)', type: 'number' },
      { name: 'raidAction', label: 'Action anti-raid', type: 'select', options: ['kick', 'ban', 'lockdown'] },
      { name: 'raidAutoTrigger', label: 'Déclenchement automatique du mode raid', type: 'toggle' },
      { name: 'raidMinAccountAge', label: 'Âge minimum du compte (jours, 0 = désactivé)', type: 'number' },
      { name: 'raidAutoAction', label: 'Action automatique en mode raid', type: 'select', options: ['lock', 'kick_new', 'verify'] },
      { name: 'raidAutoDisableMin', label: 'Auto-désactivation après (minutes, 0 = désactivé)', type: 'number' },
      { name: 'linksEnabled', label: 'Filtrage des liens activé', type: 'toggle' },
      { name: 'linksWhitelist', label: 'Domaines autorisés', type: 'tags' },
      { name: 'linksAction', label: 'Action sur lien interdit', type: 'select', options: ['delete', 'warn', 'mute'] },
      { name: 'capsEnabled', label: 'Filtrage des majuscules activé', type: 'toggle' },
      { name: 'capsThreshold', label: 'Seuil de majuscules (%)', type: 'number' },
      { name: 'capsMinLength', label: 'Longueur minimale du message', type: 'number' },
      { name: 'logChannelId', label: 'Salon de logs auto-modération', type: 'channel' },
    ],
  },
  captcha: {
    key: 'captcha',
    title: 'Captcha de vérification',
    description: "Vérification anti-bot à l'arrivée d'un membre.",
    fields: [
      { name: 'enabled', label: 'Captcha activé', type: 'toggle' },
      { name: 'channelId', label: 'Salon de vérification', type: 'channel' },
      { name: 'roleBefore', label: 'Rôle avant vérification', type: 'role' },
      { name: 'roleAfter', label: 'Rôle après vérification', type: 'role' },
      { name: 'security', label: 'Type de code', type: 'select', options: ['letters', 'numbers', 'mixed', 'math'] },
      { name: 'codeLength', label: 'Longueur du code', type: 'number' },
      { name: 'attempts', label: "Tentatives autorisées", type: 'number' },
      { name: 'kickOnFail', label: 'Exclure en cas d\'échec', type: 'toggle' },
      { name: 'timeout', label: 'Délai avant expiration (minutes)', type: 'number' },
    ],
  },
  reglement: {
    key: 'reglement',
    title: 'Règlement',
    description: 'Règles du serveur et rôle attribué en cas d\'acceptation.',
    fields: [
      { name: 'rules', label: 'Règles (une par ligne)', type: 'textarea', list: true },
      { name: 'channelId', label: 'Salon du règlement', type: 'channel' },
      { name: 'acceptRoleId', label: "Rôle donné à l'acceptation", type: 'role' },
    ],
  },
  autothread: {
    key: 'autothread',
    title: 'Fils automatiques',
    description: 'Création automatique de fils de discussion sur certains salons.',
    fields: [
      { name: 'enabled', label: 'Activer les fils automatiques', type: 'toggle' },
      { name: 'threadNameTemplate', label: 'Nom du fil ({username})', type: 'text' },
      { name: 'autoArchiveDuration', label: "Archivage auto (minutes)", type: 'select', options: [60, 1440, 4320, 10080] },
      { name: 'slowmodeSeconds', label: 'Mode lent du fil (secondes)', type: 'number' },
      { name: 'onlyFirstMessagePerUser', label: 'Un seul message initial par membre', type: 'toggle' },
      { name: 'restrictRoleId', label: 'Restreindre à un rôle', type: 'role' },
      { name: 'includeChannels', label: 'Salons concernés (vide = tous)', type: 'channelList' },
      { name: 'excludeChannels', label: 'Salons exclus', type: 'channelList' },
    ],
  },
  reputationconfig: {
    key: 'reputationconfig',
    title: 'Réputation',
    description: 'Système de points de réputation entre membres.',
    fields: [
      { name: 'enabled', label: 'Système de réputation activé', type: 'toggle' },
      { name: 'cooldownHours', label: 'Cooldown entre deux votes (heures)', type: 'number' },
      { name: 'channelId', label: "Salon autorisé (vide = partout)", type: 'channel' },
    ],
  },
  leaderboardconfig: {
    key: 'leaderboardconfig',
    title: 'Classement automatique',
    description: 'Publication automatique et programmée du classement du serveur.',
    fields: [
      { name: 'channelId', label: 'Salon de publication', type: 'channel' },
      { name: 'type', label: 'Type de classement', type: 'select', options: ['coins', 'bumps', 'weekly', 'xp'] },
      { name: 'cronEnabled', label: 'Publication automatique activée', type: 'toggle' },
      { name: 'schedule', label: 'Expression cron (ex: 0 12 * * *)', type: 'text' },
    ],
  },
  premium: {
    key: 'premium',
    title: 'Premium',
    description: 'Statut premium du serveur (gratuit, activé manuellement par le propriétaire du bot).',
    fields: [
      { name: 'active', label: 'Premium actif', type: 'toggle' },
      { name: 'tier', label: 'Palier', type: 'select', options: ['standard', 'plus'] },
      { name: 'reason', label: 'Note (ex: partenaire, beta testeur)', type: 'text' },
    ],
    ownerOnly: true,
  },
};

export const MULTI_SECTIONS = {
  autorole: {
    key: 'autorole',
    title: 'Rôles automatiques',
    description: "Rôles attribués automatiquement à l'arrivée, à un palier de niveau, après X jours ou X bumps.",
    columns: ['type', 'roleId', 'level', 'days', 'bumps', 'enabled'],
    fields: [
      { name: 'type', label: 'Déclencheur', type: 'select', options: ['join', 'level', 'time', 'bump'] },
      { name: 'roleId', label: 'Rôle à attribuer', type: 'role' },
      { name: 'level', label: 'Niveau requis (si "level")', type: 'number' },
      { name: 'days', label: 'Jours requis (si "time")', type: 'number' },
      { name: 'bumps', label: 'Bumps requis (si "bump")', type: 'number' },
      { name: 'enabled', label: 'Activé', type: 'toggle' },
    ],
  },
  faq: {
    key: 'faq',
    title: 'FAQ',
    description: 'Questions/réponses affichées via /faq.',
    columns: ['question', 'answer'],
    fields: [
      { name: 'faqId', label: 'Identifiant court', type: 'text' },
      { name: 'question', label: 'Question', type: 'text' },
      { name: 'answer', label: 'Réponse', type: 'textarea' },
    ],
  },
  automessage: {
    key: 'automessage',
    title: 'Messages automatiques',
    description: 'Messages republiés périodiquement dans un salon (annonces, règles, rappels).',
    columns: ['channelId', 'content', 'intervalH', 'active'],
    fields: [
      { name: 'channelId', label: 'Salon', type: 'channel' },
      { name: 'content', label: 'Contenu du message', type: 'textarea' },
      { name: 'intervalH', label: 'Intervalle (heures)', type: 'number' },
      { name: 'active', label: 'Actif', type: 'toggle' },
    ],
  },
};

export const ADVANCED_KEYS = [
  'server', 'welcome', 'farewell', 'autorole', 'automod', 'guildlogs', 'warnthresholds',
  'xpconfig', 'leaderboardconfig', 'captcha', 'reglement', 'autothread', 'reputationconfig',
  'premium', 'faq', 'automessage',
];

export const NAV_GROUPS = [
  {
    label: 'Bump & Réseau',
    items: [
      { section: 'bump', label: 'Configuration du bump' },
      { section: 'leaderboardconfig', label: 'Classement automatique' },
    ],
  },
  {
    label: 'Modération',
    items: [
      { section: 'automod', label: 'Auto-modération' },
      { section: 'guildlogs', label: 'Logs' },
      { section: 'warnthresholds', label: 'Seuils de sanctions' },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { section: 'welcome', label: 'Bienvenue' },
      { section: 'farewell', label: 'Départ' },
      { section: 'autorole', label: 'Rôles automatiques' },
      { section: 'captcha', label: 'Captcha' },
      { section: 'reglement', label: 'Règlement' },
      { section: 'autothread', label: 'Fils automatiques' },
    ],
  },
  {
    label: 'Économie & XP',
    items: [
      { section: 'xpconfig', label: 'Niveaux & XP' },
      { section: 'reputationconfig', label: 'Réputation' },
    ],
  },
  {
    label: 'Communauté',
    items: [
      { section: 'faq', label: 'FAQ' },
      { section: 'automessage', label: 'Messages automatiques' },
    ],
  },
  {
    label: 'Premium',
    items: [{ section: 'premium', label: 'Statut premium' }],
  },
  {
    label: 'Avancé',
    items: [{ section: 'advanced', label: 'Éditeur complet (toutes les données)' }],
  },
];
