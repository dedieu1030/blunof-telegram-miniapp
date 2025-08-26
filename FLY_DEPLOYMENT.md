# 🚀 Déploiement Fly.io pour Blunof

Ce guide explique comment déployer Blunof sur Fly.io avec déploiement automatique via GitHub Actions.

## 📋 Prérequis

1. **Compte Fly.io** : Créez un compte sur [fly.io](https://fly.io)
2. **Flyctl CLI** : Installez l'outil de ligne de commande
3. **GitHub Repository** : Connectez votre repo à Fly.io

## 🔧 Configuration Initiale

### 1. Installation de Flyctl

```bash
# macOS/Linux
curl -L https://fly.io/install.sh | sh

# Windows
iwr https://fly.io/install.ps1 -useb | iex
```

### 2. Connexion à Fly.io

```bash
flyctl auth login
```

### 3. Création des Applications

```bash
# Application de production
flyctl apps create blunof-telegram-miniapp

# Application de staging
flyctl apps create blunof-telegram-miniapp-staging
```

## 🔑 Configuration des Secrets GitHub

Ajoutez ces secrets dans votre repository GitHub (`Settings > Secrets and variables > Actions`) :

- `FLY_API_TOKEN` : Token d'API Fly.io (généré via `flyctl tokens create deploy`)

## 🚀 Déploiement Automatique

### Branches et Environnements

- **`main`** → Production (blunof-telegram-miniapp)
- **`develop`** → Staging (blunof-telegram-miniapp-staging)

### Workflow GitHub Actions

Le déploiement se déclenche automatiquement :

- À chaque push sur `main` ou `develop`
- À chaque pull request sur `main`

## 🛠️ Déploiement Manuel

### Script de Déploiement

```bash
# Déploiement en production
./scripts/deploy-fly.sh

# Déploiement en staging
./scripts/deploy-fly.sh staging
```

### Commandes Flyctl Directes

```bash
# Déploiement
flyctl deploy --app blunof-telegram-miniapp

# Vérification du statut
flyctl status --app blunof-telegram-miniapp

# Consultation des logs
flyctl logs --app blunof-telegram-miniapp

# Redémarrage
flyctl restart --app blunof-telegram-miniapp
```

## 🌐 URLs de Déploiement

- **Production** : https://blunof-telegram-miniapp.fly.dev
- **Staging** : https://blunof-telegram-miniapp-staging.fly.dev

## 📊 Monitoring

### Health Checks

- Endpoint : `/health`
- Vérification automatique toutes les 30 secondes
- Timeout : 5 secondes

### Métriques

- Port : 9091
- Endpoint : `/metrics`
- Compatible Prometheus

## 🔧 Configuration des Variables d'Environnement

```bash
# Production
flyctl secrets set NODE_ENV=production --app blunof-telegram-miniapp

# Staging
flyctl secrets set NODE_ENV=staging --app blunof-telegram-miniapp-staging
```

## 🚨 Dépannage

### Problèmes Courants

1. **Build échoué** : Vérifiez les logs GitHub Actions
2. **Déploiement échoué** : Consultez `flyctl logs`
3. **Health check échoué** : Vérifiez l'endpoint `/health`

### Commandes de Diagnostic

```bash
# Vérification de la configuration
flyctl config show --app blunof-telegram-miniapp

# Vérification des secrets
flyctl secrets list --app blunof-telegram-miniapp

# Vérification des volumes
flyctl volumes list --app blunof-telegram-miniapp
```

## 📈 Scaling

### Configuration Actuelle

- **CPU** : 1 vCPU partagé
- **RAM** : 512 MB (production) / 256 MB (staging)
- **Machines** : Auto-stop/start activé

### Modification des Ressources

```bash
# Augmentation de la RAM
flyctl scale memory 1024 --app blunof-telegram-miniapp

# Augmentation du CPU
flyctl scale count 2 --app blunof-telegram-miniapp
```

## 🔒 Sécurité

- HTTPS forcé
- Health checks automatiques
- Secrets gérés via Fly.io
- Isolation des environnements

## 📝 Notes Importantes

- Les déploiements sont automatiques via GitHub Actions
- Chaque environnement a sa propre configuration
- Les health checks garantissent la disponibilité
- Le scaling automatique optimise les coûts
