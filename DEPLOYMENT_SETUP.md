# 🚀 Configuration Initiale du Déploiement Fly.io

## 📋 Étapes à suivre AVANT le premier push

### 1. Créer le Repository GitHub

1. Allez sur [GitHub](https://github.com)
2. Cliquez sur "New repository"
3. Nom : `blunof-telegram-miniapp`
4. Description : `Mini-app Telegram Blunof - Gestion de factures avec style Uber`
5. Public ou Private selon vos préférences
6. **NE PAS** initialiser avec README, .gitignore, ou license
7. Cliquez sur "Create repository"

### 2. Configurer le Remote Git

```bash
# Supprimer l'ancien remote
git remote remove origin

# Ajouter le bon remote (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/blunof-telegram-miniapp.git

# Vérifier
git remote -v
```

### 3. Créer les Applications Fly.io

```bash
# Connexion à Fly.io
flyctl auth login

# Application de production
flyctl apps create blunof-telegram-miniapp

# Application de staging
flyctl apps create blunof-telegram-miniapp-staging
```

### 4. Configurer les Secrets GitHub

1. Dans votre repository GitHub, allez dans `Settings > Secrets and variables > Actions`
2. Cliquez sur "New repository secret"
3. Ajoutez :
   - **Name** : `FLY_API_TOKEN`
   - **Value** : `flyctl tokens create deploy` (exécutez cette commande)

### 5. Premier Push et Déploiement

```bash
# Pousser le code
git push -u origin main

# Le déploiement se déclenchera automatiquement via GitHub Actions
```

## 🔧 Configuration Post-Déploiement

### Variables d'Environnement Fly.io

```bash
# Production
flyctl secrets set NODE_ENV=production --app blunof-telegram-miniapp
flyctl secrets set TELEGRAM_BOT_TOKEN=your_token --app blunof-telegram-miniapp

# Staging
flyctl secrets set NODE_ENV=staging --app blunof-telegram-miniapp-staging
flyctl secrets set TELEGRAM_BOT_TOKEN=your_token --app blunof-telegram-miniapp-staging
```

### Vérification du Déploiement

```bash
# Statut des applications
flyctl status --app blunof-telegram-miniapp
flyctl status --app blunof-telegram-miniapp-staging

# Logs
flyctl logs --app blunof-telegram-miniapp
flyctl logs --app blunof-telegram-miniapp-staging
```

## 🌐 URLs Finales

- **Production** : https://blunof-telegram-miniapp.fly.dev
- **Staging** : https://blunof-telegram-miniapp-staging.fly.dev

## 🚨 En Cas de Problème

### Repository non trouvé

- Vérifiez que le repository existe sur GitHub
- Vérifiez l'URL du remote : `git remote -v`

### Déploiement échoué

- Consultez les logs GitHub Actions
- Vérifiez la configuration Fly.io
- Consultez `flyctl logs`

### Health Check échoué

- Vérifiez que l'endpoint `/health` répond
- Vérifiez les variables d'environnement

## 📞 Support

- **GitHub Issues** : Pour les problèmes de code
- **Fly.io Support** : Pour les problèmes de déploiement
- **Documentation** : Consultez `FLY_DEPLOYMENT.md`
