// 🌟 Service Worker Blunof - PWA
// Version: 1.0.0

const CACHE_NAME = 'blunof-v1.0.0';
const STATIC_CACHE = 'blunof-static-v1.0.0';
const DYNAMIC_CACHE = 'blunof-dynamic-v1.0.0';

// 📱 Fichiers à mettre en cache statique
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png'
];

// 🎯 Installation du service worker
self.addEventListener('install', (event) => {
  console.log('🌟 Service Worker Blunof installé');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Cache statique ouvert');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Fichiers statiques mis en cache');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Erreur lors de l\'installation:', error);
      })
  );
});

// 🔄 Activation du service worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker Blunof activé');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Suppression de l\'ancien cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Anciens caches supprimés');
        return self.clients.claim();
      })
  );
});

// 📡 Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 🎯 Stratégie de cache selon le type de ressource
  if (request.method === 'GET') {
    // 📱 Ressources statiques (CSS, JS, images)
    if (isStaticResource(request)) {
      event.respondWith(cacheFirst(request));
    }
    // 🌐 Requêtes API
    else if (isApiRequest(request)) {
      event.respondWith(networkFirst(request));
    }
    // 📄 Pages HTML
    else if (isHtmlRequest(request)) {
      event.respondWith(networkFirst(request));
    }
    // 🔄 Autres ressources
    else {
      event.respondWith(networkFirst(request));
    }
  }
});

// 🎯 Stratégie Cache First pour les ressources statiques
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Erreur cache first:', error);
    return new Response('Erreur de chargement', { status: 500 });
  }
}

// 🌐 Stratégie Network First pour les données dynamiques
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🌐 Tentative de récupération depuis le cache...');
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 📱 Fallback pour les pages HTML
    if (isHtmlRequest(request)) {
      return caches.match('/');
    }
    
    return new Response('Erreur de connexion', { status: 503 });
  }
}

// 🔍 Vérification du type de ressource
function isStaticResource(request) {
  const url = new URL(request.url);
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2'];
  
  return staticExtensions.some(ext => url.pathname.endsWith(ext));
}

function isApiRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || url.hostname.includes('api.');
}

function isHtmlRequest(request) {
  const url = new URL(request.url);
  return url.pathname.endsWith('.html') || url.pathname === '/' || !url.pathname.includes('.');
}

// 🔔 Gestion des messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// 📊 Synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Synchronisation en arrière-plan');
    event.waitUntil(backgroundSync());
  }
});

async function backgroundSync() {
  try {
    // 🔄 Synchronisation des données en arrière-plan
    console.log('📡 Synchronisation des données...');
    
    // Ici vous pouvez ajouter la logique de synchronisation
    // Par exemple, synchroniser les factures créées hors ligne
    
  } catch (error) {
    console.error('❌ Erreur de synchronisation:', error);
  }
}

// 🚨 Gestion des erreurs
self.addEventListener('error', (event) => {
  console.error('❌ Erreur du Service Worker:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Promesse rejetée non gérée:', event.reason);
});

console.log('🌟 Service Worker Blunof chargé et prêt');
