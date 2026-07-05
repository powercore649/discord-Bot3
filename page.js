import Link from 'next/link';

const FEATURES = [
  { icon: '⛯', title: 'Réseau de bumps', desc: "Diffusez votre serveur toutes les 2h dans le réseau inter-serveurs, avec streaks, coins et rappels automatiques." },
  { icon: '⚔', title: 'Guerre de territoires', desc: 'Chaque bump attaque une zone de la carte. 30 zones, 3 raretés, classement des empires en direct.' },
  { icon: '🛡', title: 'Modération avancée', desc: 'Anti-spam, anti-raid, strikes gradués, mode raid automatique et logs détaillés par catégorie.' },
  { icon: '📈', title: 'Niveaux & XP', desc: 'Cartes de rang générées en canvas, rôles de palier, multiplicateurs par salon ou par rôle.' },
  { icon: '💰', title: 'Économie complète', desc: 'Pêche, boutique, travail, casino, classement — une économie interne configurable de A à Z.' },
  { icon: '💎', title: 'Premium gratuit', desc: 'Un palier premium activé manuellement par vous, sans jamais bloquer les fonctionnalités de base.' },
];

export default function HomePage() {
  return (
    <div className="landing">
      <div className="hex-field" />
      <nav className="nav-public">
        <div className="brand">
          <span className="brand-mark">B</span> Bumpify
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Link href="/dashboard" className="btn btn-ghost btn-sm">Dashboard</Link>
        </div>
      </nav>

      <header className="hero">
        <div>
          <div className="eyebrow"><span className="live-dot" /> Synchronisation en temps réel avec votre bot</div>
          <h1>Le centre de commandement de <span>votre réseau</span> de serveurs.</h1>
          <p className="lead">
            Configurez chaque système de Bumpify — bump, modération, XP, économie, territoires — depuis
            un panneau unique. Chaque changement est écrit directement dans la base de données du bot :
            aucun redémarrage, aucun délai.
          </p>
          <div className="hero-actions">
            <Link href="/dashboard" className="btn btn-primary">Ouvrir le dashboard</Link>
            <a href="#fonctionnalites" className="btn btn-ghost">Voir les fonctionnalités</a>
          </div>
        </div>

        <div className="map-card">
          <div className="map-row">
            <span className="mono" style={{ color: 'var(--text-dim)', fontSize: 13 }}>Zone Nord-07</span>
            <span className="badge badge-success">Contrôlée</span>
          </div>
          <div className="map-row">
            <span className="mono" style={{ color: 'var(--text-dim)', fontSize: 13 }}>Zone Est-14</span>
            <span className="badge badge-warn">En conflit</span>
          </div>
          <div className="map-row">
            <span className="mono" style={{ color: 'var(--text-dim)', fontSize: 13 }}>Dernier bump</span>
            <span className="mono" style={{ fontSize: 13 }}>il y a 4 min</span>
          </div>
          <div className="map-row">
            <span className="mono" style={{ color: 'var(--text-dim)', fontSize: 13 }}>Streak actuel</span>
            <span className="mono" style={{ fontSize: 13 }}>12 jours</span>
          </div>
          <div className="map-row">
            <span className="mono" style={{ color: 'var(--text-dim)', fontSize: 13 }}>État du pont API</span>
            <span className="badge badge-success"><span className="live-dot" /> En ligne</span>
          </div>
        </div>
      </header>

      <section className="section-pub" id="fonctionnalites">
        <h2>Tous les systèmes du bot, au même endroit.</h2>
        <p className="sub">
          91 commandes, des dizaines de modules — le dashboard couvre les réglages essentiels avec des
          formulaires dédiés, et un éditeur avancé pour absolument tout le reste.
        </p>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="icon-tag">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-pub">
        <span>Bumpify — panneau de configuration non-officiel auto-hébergé</span>
        <span className="mono">v2</span>
      </footer>
    </div>
  );
}
