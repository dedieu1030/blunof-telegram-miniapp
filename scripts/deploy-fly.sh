#!/bin/bash

# Script de déploiement Fly.io pour Blunof
set -e

echo "🚀 Déploiement Blunof sur Fly.io..."

# Vérifications préalables
if ! command -v flyctl &> /dev/null; then
    echo "❌ Flyctl n'est pas installé. Installez-le d'abord :"
    echo "curl -L https://fly.io/install.sh | sh"
    exit 1
fi

# Variables d'environnement
APP_NAME="blunof-telegram-miniapp"
STAGING_APP_NAME="blunof-telegram-miniapp-staging"
ENVIRONMENT=${1:-production}

echo "📦 Construction de l'application..."
npm run build

echo "🔍 Vérification de la construction..."
if [ ! -d "dist" ]; then
    echo "❌ Le dossier dist n'existe pas. La construction a échoué."
    exit 1
fi

# Déploiement selon l'environnement
if [ "$ENVIRONMENT" = "staging" ]; then
    echo "🔄 Déploiement en staging sur $STAGING_APP_NAME..."
    flyctl deploy --app $STAGING_APP_NAME --remote-only
    APP_NAME=$STAGING_APP_NAME
else
    echo "🚀 Déploiement en production sur $APP_NAME..."
    flyctl deploy --app $APP_NAME --remote-only
fi

echo "✅ Déploiement terminé !"
echo "🌐 URL: https://$APP_NAME.fly.dev"
echo "📊 Status: flyctl status --app $APP_NAME"
echo "📝 Logs: flyctl logs --app $APP_NAME"
