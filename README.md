# 🚀 BLUNOF - Mini-App Telegram de Gestion de Factures

**Blunof** est une mini-app Telegram moderne et intuitive pour la génération et gestion de factures, conçue avec le style Uber et respectant les règles strictes de design mobile.

## ✨ Fonctionnalités Principales

### 🧾 Génération de Factures PDF
- **Assistant guidé** étape par étape
- **Numérotation automatique** des factures
- **Support multi-pays** (Canada, US, Europe)
- **Gestion des taxes** préchargées et personnalisées
- **Templates professionnels** avec logo et signature

### 👥 Gestion des Clients
- **Base clients complète** avec historique
- **Recherche avancée** par nom, TVA, email
- **Informations détaillées** (adresse, téléphone, TVA)

### 📦 Gestion des Articles
- **Catalogue d'articles** réutilisables
- **Unités de mesure** internationales
- **Prix et remises** configurables
- **Catégorisation** et tri

### 💳 Gestion des Paiements
- **Méthodes multiples** (virement, chèque, PayPal, Stripe)
- **Suivi automatique** des statuts
- **Relances automatiques** (plan avancé)
- **Historique complet** des transactions

### 🏢 Profil Entreprise
- **Configuration complète** de l'entreprise
- **Logo et signature** par défaut
- **Conditions générales** personnalisables
- **Paramètres fiscaux** par pays

## 🎨 Design & UX

### Style Uber Authentique
- **Palette de couleurs** identique à Uber
- **Composants modernes** avec glassmorphism
- **Animations fluides** et micro-interactions
- **Typographie précise** selon nos guides

### Règles de Design Strictes
- **Système 4pt** pour toutes les dimensions
- **Grilles Single/Dual** selon la complexité
- **Safe Areas** respectées pour Telegram
- **Responsive mobile-first**

## 🛠️ Technologies Utilisées

- **Frontend** : React 18 + TypeScript
- **Styling** : CSS-in-JS avec système de design
- **Animations** : Framer Motion
- **Icons** : Lucide React
- **Build** : Vite
- **PDF** : jsPDF + AutoTable
- **State** : Zustand
- **Forms** : React Hook Form

## 📱 Intégration Telegram

### WebApp API Complète
- **Safe Areas** automatiques
- **Thèmes** light/dark
- **Haptic Feedback** natif
- **Navigation** Telegram native
- **Paiements** intégrés

### Optimisations
- **Performance** mobile optimisée
- **Offline-first** avec cache intelligent
- **PWA** ready
- **SEO** optimisé

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git

### Installation
```bash
# Cloner le projet
git clone https://github.com/your-username/blunof-telegram-miniapp.git
cd blunof-telegram-miniapp

# Installer les dépendances
npm install
# ou
yarn install

# Démarrer en mode développement
npm run dev
# ou
yarn dev
```

### Build de Production
```bash
# Build optimisé
npm run build
# ou
yarn build

# Prévisualiser le build
npm run preview
# ou
yarn preview
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants de base (Button, Input, Card)
│   └── navigation/     # Navigation et routing
├── pages/              # Pages principales
├── styles/             # Système de design et variables
├── hooks/              # Hooks React personnalisés
├── stores/             # Gestion d'état Zustand
├── utils/              # Utilitaires et helpers
└── types/              # Types TypeScript
```

## 🎯 Configuration Telegram

### 1. Créer le Bot
```bash
# Via @BotFather sur Telegram
/newbot
# Nom: Blunof
# Username: blunof_bot
```

### 2. Configurer la Mini-App
```bash
# Dans @BotFather
/mybots
# Sélectionner blunof_bot
# Bot Settings > Menu Button
# URL: https://your-domain.com
```

### 3. Déployer
```bash
# Build et déployer sur votre hosting
npm run build
# Uploader le dossier dist/ sur votre serveur
```

## 🌍 Support Multi-Pays

### Pays Supportés
- **Canada** : TPS, TVQ, TVH
- **États-Unis** : Sales Tax par État
- **Europe** : TVA par pays
- **Mexique** : IVA
- **Autres** : Taxes personnalisées

### Devises
- CAD, USD, EUR, GBP
- **Conversion automatique** (optionnel)
- **Formats locaux** respectés

## 🔒 Sécurité & Conformité

### Données
- **Chiffrement** en transit et au repos
- **GDPR** compliant
- **Backup automatique** cloud
- **Audit trail** complet

### Fiscale
- **Conformité locale** par pays
- **Validation** automatique des données
- **Rapports** pour fin d'impôt
- **Archivage** légal

## 📊 Plans & Tarification

### Plan Gratuit
- **5 factures** par mois
- **Fonctionnalités de base**
- **Support communautaire**

### Plan Pro (7$/mois)
- **Factures illimitées**
- **Relances automatiques**
- **Rapports fiscaux**
- **Support prioritaire**

### Plan Enterprise
- **Multi-utilisateurs**
- **API personnalisée**
- **Support dédié**
- **Formation sur mesure**

## 🤝 Contribution

### Guidelines
- **Code style** : ESLint + Prettier
- **Commits** : Conventional Commits
- **Tests** : Jest + Testing Library
- **Documentation** : JSDoc

### Processus
1. Fork le projet
2. Créer une branche feature
3. Développer avec tests
4. Pull Request avec description
5. Review et merge

## 📞 Support

### Contact
- **Email** : support@blunof.com
- **Telegram** : @blunof_support
- **Documentation** : docs.blunof.com

### Communauté
- **Discord** : discord.gg/blunof
- **GitHub** : github.com/blunof
- **Twitter** : @blunof_app

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Telegram** pour la plateforme
- **Uber** pour l'inspiration design
- **Communauté open source** pour les outils
- **Beta testers** pour le feedback

---

**🌟 Fait avec ❤️ par l'équipe Blunof**

*Simplifiez votre gestion de factures, un clic à la fois.*
