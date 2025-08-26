// Configuration d'environnement pour le navigateur
export const ENV = {
  // Environnement
  NODE_ENV: import.meta.env?.MODE || 'development',

  // Variables Telegram
  TELEGRAM_BOT_TOKEN:
    import.meta.env?.VITE_TELEGRAM_BOT_TOKEN ||
    '7354979664:AAF9a6Ww9og7a4_Z6Dapkv6K9Xv-ItQ1DT8',

  // URLs
  WEBAPP_URL:
    import.meta.env?.VITE_WEBAPP_URL ||
    'https://blunof-telegram-miniapp.fly.dev',

  // Configuration de développement
  IS_DEV: import.meta.env?.DEV || false,
  IS_PROD: import.meta.env?.PROD || false,

  // API URLs
  API_BASE_URL: import.meta.env?.VITE_API_BASE_URL || 'https://api.blunof.com',

  // Autres configurations
  DEBUG: import.meta.env?.VITE_DEBUG === 'true' || false,
  LOG_LEVEL: import.meta.env?.VITE_LOG_LEVEL || 'info',
};
