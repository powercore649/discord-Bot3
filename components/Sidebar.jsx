'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_GROUPS } from '@/lib/schemas';

export default function Sidebar({ guildId, guildName }) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">B</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Bumpify</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>{guildName}</div>
        </div>
      </div>

      <Link href={`/dashboard/${guildId}`} className={`nav-link ${pathname === `/dashboard/${guildId}` ? 'active' : ''}`}>
        Vue d'ensemble
      </Link>
      <Link href="/dashboard" className="nav-link" style={{ marginBottom: 12 }}>
        ← Changer de serveur
      </Link>

      {NAV_GROUPS.map((group) => (
        <div className="nav-group" key={group.label}>
          <div className="nav-group-label">{group.label}</div>
          {group.items.map((item) => {
            const href = `/dashboard/${guildId}/${item.section}`;
            return (
              <Link key={item.section} href={href} className={`nav-link ${pathname === href ? 'active' : ''}`}>
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
