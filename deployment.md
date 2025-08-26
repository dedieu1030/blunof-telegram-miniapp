# 🚀 Guide de Déploiement Blunof

**Guide complet pour déployer la mini-app Telegram Blunof sur différentes plateformes**

## 📋 Prérequis

### 🔧 Outils requis
- Node.js 18+
- npm ou yarn
- Git
- Docker (optionnel)
- Compte sur la plateforme de déploiement choisie

### 🔑 Variables d'environnement
Copiez `env.example` vers `.env` et configurez :
```bash
cp env.example .env
```

## 🌐 Déploiement sur Netlify

### 1️⃣ Configuration automatique
```bash
# Connectez votre repo GitHub à Netlify
# Le déploiement se fera automatiquement
```

### 2️⃣ Configuration manuelle
```bash
# Installation de Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Déploiement
npm run build
netlify deploy --prod --dir=dist
```

### 3️⃣ Configuration du site
- **Build command** : `npm run build`
- **Publish directory** : `dist`
- **Environment variables** : Configurez dans l'interface Netlify

## 📱 Déploiement sur Vercel

### 1️⃣ Configuration automatique
```bash
# Connectez votre repo GitHub à Vercel
# Le déploiement se fera automatiquement
```

### 2️⃣ Configuration manuelle
```bash
# Installation de Vercel CLI
npm install -g vercel

# Login
vercel login

# Déploiement
npm run build
vercel --prod
```

### 3️⃣ Configuration du projet
- **Framework Preset** : Vite
- **Build Command** : `npm run build`
- **Output Directory** : `dist`
- **Install Command** : `npm install`

## 🐳 Déploiement avec Docker

### 1️⃣ Build de l'image
```bash
# Build de l'image de production
docker build --target production -t blunof:latest .

# Build de l'image de développement
docker build --target development -t blunof:dev .
```

### 2️⃣ Démarrage avec Docker Compose
```bash
# Démarrage de l'application
docker-compose up -d blunof-app

# Démarrage complet avec monitoring
docker-compose --profile monitoring up -d

# Démarrage avec logging
docker-compose --profile logging up -d
```

### 3️⃣ Déploiement sur serveur
```bash
# Copier les fichiers sur votre serveur
scp -r . user@your-server:/opt/blunof

# SSH sur le serveur
ssh user@your-server

# Démarrer l'application
cd /opt/blunof
docker-compose up -d
```

## ☁️ Déploiement sur Cloudflare Pages

### 1️⃣ Configuration
- Connectez votre repo GitHub
- **Build command** : `npm run build`
- **Build output directory** : `dist`
- **Node.js version** : `18`

### 2️⃣ Variables d'environnement
Configurez dans l'interface Cloudflare :
- `NODE_VERSION`: `18`
- `NPM_VERSION`: `9`

## 🚀 Déploiement sur AWS

### 1️⃣ S3 + CloudFront
```bash
# Installation AWS CLI
pip install awscli

# Configuration
aws configure

# Build
npm run build

# Upload vers S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidation CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 2️⃣ AWS Amplify
- Connectez votre repo GitHub
- **Build settings** :
  ```yaml
  version: 1
  frontend:
    phases:
      preBuild:
        commands:
          - npm ci
      build:
        commands:
          - npm run build
    artifacts:
      baseDirectory: dist
      files:
        - '**/*'
  ```

## 🔄 Déploiement automatique avec GitHub Actions

### 1️⃣ Configuration des secrets
Dans votre repo GitHub, configurez :
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID_PRODUCTION`
- `NETLIFY_SITE_ID_STAGING`
- `VERCEL_TOKEN`
- `ORG_ID`
- `PROJECT_ID`

### 2️⃣ Workflow automatique
Le workflow se déclenche automatiquement :
- **Push sur `main`** → Déploiement production
- **Push sur `develop`** → Déploiement staging
- **Pull Request** → Tests et vérifications

## 📊 Monitoring et Observabilité

### 1️⃣ Prometheus + Grafana
```bash
# Démarrage du monitoring
docker-compose --profile monitoring up -d

# Accès aux dashboards
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3001 (admin/admin)
```

### 2️⃣ ELK Stack
```bash
# Démarrage du logging
docker-compose --profile logging up -d

# Accès aux dashboards
# Elasticsearch: http://localhost:9200
# Kibana: http://localhost:5601
```

## 🔒 Sécurité et SSL

### 1️⃣ Certificats SSL
```bash
# Génération avec Let's Encrypt
sudo certbot certonly --standalone -d yourdomain.com

# Configuration Nginx
# Voir nginx.conf pour la configuration HTTPS
```

### 2️⃣ Headers de sécurité
Les headers sont configurés automatiquement :
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📱 Configuration Telegram

### 1️⃣ Bot Father
```bash
# Créer le bot
/newbot
# Nom: Blunof
# Username: blunof_bot
```

### 2️⃣ Configuration de la mini-app
```bash
# Dans @BotFather
/mybots
# Sélectionner blunof_bot
# Bot Settings > Menu Button
# URL: https://your-domain.com
```

### 3️⃣ Test de la mini-app
```bash
# Ouvrir @blunof_bot sur Telegram
# Cliquer sur "Menu" ou "Start"
# La mini-app devrait s'ouvrir
```

## 🧪 Tests de déploiement

### 1️⃣ Tests automatisés
```bash
# Tests unitaires
npm test

# Tests d'intégration
npm run test:integration

# Tests de performance
npm run test:performance
```

### 2️⃣ Tests manuels
- ✅ Vérifier l'ouverture de la mini-app
- ✅ Tester la navigation
- ✅ Vérifier les composants
- ✅ Tester les fonctionnalités
- ✅ Vérifier la performance

## 📈 Métriques et Analytics

### 1️⃣ Métriques de base
- Temps de chargement
- Taux d'erreur
- Utilisation des ressources
- Temps de réponse

### 2️⃣ Métriques métier
- Nombre d'utilisateurs actifs
- Taux de conversion
- Temps passé dans l'app
- Fonctionnalités utilisées

## 🚨 Dépannage

### 1️⃣ Problèmes courants
- **Build échoue** : Vérifier les dépendances et la version Node.js
- **Mini-app ne s'ouvre pas** : Vérifier l'URL dans Bot Father
- **Erreurs CORS** : Vérifier la configuration des headers
- **Performance lente** : Vérifier la compression et le cache

### 2️⃣ Logs et debugging
```bash
# Logs Docker
docker-compose logs blunof-app

# Logs Nginx
docker exec blunof-app tail -f /var/log/nginx/error.log

# Logs de l'application
# Vérifier la console du navigateur
```

## 🔄 Mise à jour et maintenance

### 1️⃣ Mise à jour automatique
```bash
# Pull des dernières modifications
git pull origin main

# Rebuild et redéploiement automatique
# via GitHub Actions
```

### 2️⃣ Mise à jour manuelle
```bash
# Build
npm run build

# Redéploiement
docker-compose restart blunof-app
# ou
netlify deploy --prod --dir=dist
```

## 📚 Ressources supplémentaires

- [Documentation Telegram WebApp](https://core.telegram.org/bots/webapps)
- [Guide Vite](https://vitejs.dev/guide/)
- [Documentation React](https://react.dev/)
- [Guide Docker](https://docs.docker.com/)
- [Documentation Netlify](https://docs.netlify.com/)
- [Documentation Vercel](https://vercel.com/docs)

---

**🌟 Blunof est maintenant prêt pour la production !**

*Pour toute question ou problème, consultez la documentation ou contactez l'équipe de support.*
