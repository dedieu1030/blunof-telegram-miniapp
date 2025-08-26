# 🌟 Dockerfile Blunof - Mini-App Telegram
# Multi-stage build pour optimiser la taille

# 🚀 Stage 1: Build
FROM node:18-alpine AS builder

# 📁 Définir le répertoire de travail
WORKDIR /app

# 📦 Copier les fichiers de dépendances
COPY package*.json ./

# 🔧 Installer les dépendances
RUN npm ci --only=production

# 📁 Copier le code source
COPY . .

# 🔨 Build de production
RUN npm run build

# 🌐 Stage 2: Production avec Nginx
FROM nginx:alpine AS production

# 📱 Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# 🔧 Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# 🔒 Copier les certificats SSL (optionnel)
# COPY ssl/ /etc/nginx/ssl/

# 📊 Exposer le port 80
EXPOSE 80

# 🔒 Exposer le port 443 pour HTTPS (optionnel)
# EXPOSE 443

# 🎯 Démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]

# 🧪 Stage 3: Tests (optionnel)
FROM node:18-alpine AS test

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# 🧪 Exécuter les tests
RUN npm test

# 📊 Stage 4: Développement
FROM node:18-alpine AS development

WORKDIR /app

# 📦 Installer toutes les dépendances (dev inclus)
COPY package*.json ./
RUN npm ci

# 📁 Copier le code source
COPY . .

# 📱 Exposer le port de développement
EXPOSE 3000

# 🚀 Commande de développement
CMD ["npm", "run", "dev"]
