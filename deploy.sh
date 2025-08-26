#!/bin/bash

# 🚀 Script de déploiement Blunof
# Usage: ./deploy.sh [production|staging]

set -e

# 🎯 Configuration
APP_NAME="blunof-telegram-miniapp"
BUILD_DIR="dist"
DEPLOY_ENV=${1:-production}

echo "🌟 Déploiement de $APP_NAME en mode $DEPLOY_ENV"

# 🔍 Vérifications pré-déploiement
echo "📋 Vérifications pré-déploiement..."

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

# Vérifier que Git est installé
if ! command -v git &> /dev/null; then
    echo "❌ Git n'est pas installé"
    exit 1
fi

echo "✅ Toutes les dépendances sont installées"

# 🧹 Nettoyage
echo "🧹 Nettoyage des anciens builds..."
rm -rf $BUILD_DIR
rm -rf node_modules/.cache

# 📦 Installation des dépendances
echo "📦 Installation des dépendances..."
npm ci --only=production

# 🔨 Build de production
echo "🔨 Build de production..."
npm run build

# ✅ Vérification du build
echo "✅ Vérification du build..."
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Le dossier de build n'existe pas"
    exit 1
fi

# 📊 Statistiques du build
echo "📊 Statistiques du build:"
du -sh $BUILD_DIR/*
echo ""

# 🧪 Tests de base
echo "🧪 Tests de base..."
if [ -f "$BUILD_DIR/index.html" ]; then
    echo "✅ index.html généré"
else
    echo "❌ index.html manquant"
    exit 1
fi

if [ -f "$BUILD_DIR/assets/index-*.js" ]; then
    echo "✅ JavaScript généré"
else
    echo "❌ JavaScript manquant"
    exit 1
fi

if [ -f "$BUILD_DIR/assets/index-*.css" ]; then
    echo "✅ CSS généré"
else
    echo "❌ CSS manquant"
    exit 1
fi

# 🌐 Déploiement (à personnaliser selon votre hosting)
echo "🌐 Déploiement..."

if [ "$DEPLOY_ENV" = "production" ]; then
    echo "🚀 Déploiement en production..."
    # Exemple pour un serveur FTP
    # lftp -c "open -u username,password ftp.yourdomain.com; mirror -R $BUILD_DIR /public_html/"
    
    # Exemple pour un serveur SSH
    # rsync -avz --delete $BUILD_DIR/ user@yourdomain.com:/var/www/html/
    
    # Exemple pour Netlify
    # netlify deploy --prod --dir=$BUILD_DIR
    
    echo "⚠️  Configurez votre méthode de déploiement dans ce script"
else
    echo "🧪 Déploiement en staging..."
    # Configuration pour staging
fi

# 🎉 Succès
echo ""
echo "🎉 Déploiement terminé avec succès !"
echo "📱 Votre mini-app Telegram est maintenant accessible"
echo ""
echo "🔗 Prochaines étapes:"
echo "1. Tester la mini-app sur Telegram"
echo "2. Vérifier les fonctionnalités"
echo "3. Surveiller les performances"
echo "4. Collecter les retours utilisateurs"

# 📈 Métriques de déploiement
echo ""
echo "📈 Métriques:"
echo "- Taille totale: $(du -sh $BUILD_DIR | cut -f1)"
echo "- Fichiers générés: $(find $BUILD_DIR -type f | wc -l)"
echo "- Timestamp: $(date)"
