import { ENV } from './env';

// Configuration Telegram pour Blunof
export const TELEGRAM_CONFIG = {
  // Token du bot (sera remplacé par les variables d'environnement)
  BOT_TOKEN: ENV.TELEGRAM_BOT_TOKEN,

  // Nom du bot
  BOT_NAME: 'Blunof',

  // Username du bot
  BOT_USERNAME: '@blunof_bot',

  // URL de l'application
  WEBAPP_URL: ENV.IS_PROD
    ? 'https://blunof-telegram-miniapp.fly.dev'
    : 'https://blunof-telegram-miniapp-staging.fly.dev',

  // Configuration WebApp
  WEBAPP_CONFIG: {
    // Titre de l'application
    title: 'Blunof - Gestion de factures',

    // Description
    description: 'Générez et gérez vos factures facilement',

    // Version
    version: '1.0.0',

    // Langue par défaut
    defaultLanguage: 'fr',

    // Thème par défaut
    defaultTheme: 'light',

    // Couleurs de l'application
    colors: {
      primary: '#2196F3',
      secondary: '#1976D2',
      accent: '#64B5F6',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#212121',
      textSecondary: '#757575',
    },
  },

  // Commandes du bot
  COMMANDS: [
    { command: 'start', description: 'Démarrer Blunof' },
    { command: 'help', description: 'Aide et support' },
    { command: 'invoice', description: 'Créer une facture' },
    { command: 'clients', description: 'Gérer les clients' },
    { command: 'items', description: 'Gérer les articles' },
    { command: 'history', description: 'Historique des factures' },
    { command: 'settings', description: 'Paramètres' },
  ],

  // Messages par défaut
  MESSAGES: {
    welcome:
      '🎉 Bienvenue sur Blunof ! Votre assistant de gestion de factures.',
    help:
      '📚 Voici comment utiliser Blunof :\n\n' +
      '• /invoice - Créer une facture\n' +
      '• /clients - Gérer vos clients\n' +
      '• /items - Gérer vos articles\n' +
      "• /history - Voir l'historique\n" +
      "• /settings - Configurer l'app",
    error: "❌ Une erreur s'est produite. Veuillez réessayer.",
    notFound: '🔍 Aucun résultat trouvé.',
    loading: '⏳ Chargement en cours...',
  },
};

// Types pour TypeScript
export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    receiver: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      type: string;
    };
    chat: {
      id: number;
      type: string;
      title?: string;
      username?: string;
    };
    chat_type: string;
    chat_instance: string;
    start_param?: string;
    can_send_after: number;
    auth_date: number;
    hash: string;
  };
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  BackButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
    onClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    setText: (text: string) => void;
    setParams: (params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }) => void;
  };
  HapticFeedback: {
    impactOccurred: (
      style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
    ) => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  isVersionAtLeast: (version: string) => boolean;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  onEvent: (eventType: string, eventHandler: () => void) => void;
  offEvent: (eventType: string, eventHandler: () => void) => void;
  sendData: (data: string) => void;
  switchInlineQuery: (query: string, choose_chat_types?: string[]) => void;
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
  openTelegramLink: (url: string) => void;
  openInvoice: (url: string, callback?: (status: string) => void) => void;
  showPopup: (
    params: {
      title?: string;
      message: string;
      buttons?: Array<{
        id?: string;
        type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
        text: string;
      }>;
    },
    callback?: (buttonId: string) => void
  ) => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (
    message: string,
    callback?: (confirmed: boolean) => void
  ) => void;
  showScanQrPopup: (
    params: { text?: string },
    callback?: (data: string) => void
  ) => void;
  closeScanQrPopup: () => void;
  readTextFromClipboard: (callback?: (data: string | null) => void) => void;
  requestWriteAccess: (callback?: (access: boolean) => void) => void;
  requestContact: (callback?: (contact: boolean) => void) => void;
  invokeCustomMethod: (
    method: string,
    params?: unknown,
    callback?: (result: unknown) => void
  ) => void;
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
}

// Déclaration globale pour TypeScript
declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}
