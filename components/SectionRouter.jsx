'use client';
import { SECTIONS, MULTI_SECTIONS } from '@/lib/schemas';
import ConfigForm from '@/components/ConfigForm';
import ListConfigPage from '@/components/ListConfigPage';
import GuildLogsForm from '@/components/GuildLogsForm';
import WarnThresholdsForm from '@/components/WarnThresholdsForm';
import XpConfigForm from '@/components/XpConfigForm';
import AdvancedEditor from '@/components/AdvancedEditor';

export default function SectionRouter({ guildId, section, isOwner }) {
  if (section === 'advanced') return <AdvancedEditor guildId={guildId} />;
  if (section === 'guildlogs') return <GuildLogsForm guildId={guildId} />;
  if (section === 'warnthresholds') return <WarnThresholdsForm guildId={guildId} />;
  if (section === 'xpconfig') return <XpConfigForm guildId={guildId} />;

  if (MULTI_SECTIONS[section]) {
    return <ListConfigPage guildId={guildId} section={MULTI_SECTIONS[section]} />;
  }

  const schema = SECTIONS[section];
  if (!schema) {
    return <div className="banner error">Section inconnue : {section}</div>;
  }
  if (schema.ownerOnly && !isOwner) {
    return <div className="banner error">Cette section est réservée au(x) propriétaire(s) du bot.</div>;
  }
  return <ConfigForm guildId={guildId} section={schema} />;
}
