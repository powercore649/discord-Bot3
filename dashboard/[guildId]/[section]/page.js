import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SectionRouter from '@/components/SectionRouter';

export default async function SectionPage({ params }) {
  const session = await getServerSession(authOptions);
  const ownerIds = (process.env.OWNER_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const isOwner = ownerIds.includes(session?.discordId);

  return <SectionRouter guildId={params.guildId} section={params.section} isOwner={isOwner} />;
}
