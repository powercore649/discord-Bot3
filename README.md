# Bumpify Dashboard

Dashboard Next.js (App Router) à déployer sur **Vercel**. Connexion via Discord OAuth2,
un serveur = un espace de configuration, synchronisation en direct avec le bot via l'API pont.

## 1. Créer l'application Discord (OAuth2)

Sur https://discord.com/developers/applications, ouvrez l'application de Bumpify (ou créez-en
une dédiée au dashboard) :
- Onglet **OAuth2 > General** : notez `Client ID` et `Client Secret`.
- Ajoutez un **Redirect** : `https://VOTRE-PROJET.vercel.app/api/auth/callback/discord`
  (remplacez par votre vraie URL Vercel une fois le projet créé — vous pourrez modifier
  ce redirect ensuite si l'URL change).

## 2. Déployer sur Vercel

```
npm install -g vercel   # si besoin
cd bumpify-dashboard
vercel
```
Ou via le site vercel.com : "Add New Project" → importez ce dossier (ou son repo Git).

## 3. Variables d'environnement (Vercel → Project Settings → Environment Variables)

| Variable | Valeur |
|---|---|
| `DISCORD_CLIENT_ID` | depuis l'étape 1 |
| `DISCORD_CLIENT_SECRET` | depuis l'étape 1 |
| `NEXTAUTH_SECRET` | générez avec `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://votre-projet.vercel.app` |
| `BRIDGE_URL` | `http://194.62.248.55:30024` |
| `BRIDGE_SECRET` | le même secret que `DASHBOARD_API_SECRET` côté bridge |
| `OWNER_IDS` | les mêmes IDs que `OWNER_IDS` du bot (accès à l'onglet Premium) |

Après avoir ajouté les variables, redéployez (`vercel --prod` ou bouton "Redeploy").

## 4. Utilisation

- Ouvrez votre URL Vercel → page d'accueil publique.
- "Ouvrir le dashboard" → connexion Discord → liste de vos serveurs où vous êtes administrateur
  et où Bumpify est présent.
- Chaque section du menu correspond à un système du bot. Les changements sont enregistrés
  immédiatement dans MongoDB ; le bot les applique dès sa prochaine lecture (au prochain
  message/commande concerné — il n'y a pas de cache en mémoire dans le bot, donc pas de délai
  perceptible).
- La section **Avancé** permet d'éditer n'importe quelle donnée brute pour les cas non couverts
  par un formulaire dédié.

## Développement local

```
npm install
cp .env.example .env.local   # puis remplissez les valeurs
npm run dev
```
