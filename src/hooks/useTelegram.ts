import { useState, useEffect, useCallback } from 'react';
import { TELEGRAM_CONFIG } from '@/config/telegram';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface TelegramChat {
  id: number;
  type: string;
  title?: string;
  username?: string;
}

export interface TelegramTheme {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
}

export const useTelegram = () => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [chat, setChat] = useState<TelegramChat | null>(null);
  const [theme, setTheme] = useState<TelegramTheme | null>(null);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Initialiser l'API Telegram
  const initTelegram = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;

        // Marquer l'app comme prête
        tg.ready();

        // Configurer l'app
        tg.expand();
        tg.setHeaderColor(TELEGRAM_CONFIG.WEBAPP_CONFIG.colors.primary);
        tg.setBackgroundColor(TELEGRAM_CONFIG.WEBAPP_CONFIG.colors.background);

        // Extraire les informations
        if (tg.initDataUnsafe?.user) {
          setUser(tg.initDataUnsafe.user);
        }

        if (tg.initDataUnsafe?.chat) {
          setChat(tg.initDataUnsafe.chat);
        }

        if (tg.themeParams) {
          setTheme(tg.themeParams);
        }

        setColorScheme(tg.colorScheme);
        setIsExpanded(tg.isExpanded);
        setViewportHeight(tg.viewportHeight);

        // Écouter les changements de thème
        tg.onEvent('themeChanged', () => {
          setColorScheme(tg.colorScheme);
          setTheme(tg.themeParams);
        });

        // Écouter les changements de viewport
        tg.onEvent('viewportChanged', () => {
          setViewportHeight(tg.viewportHeight);
          setIsExpanded(tg.isExpanded);
        });

        setIsReady(true);
        setError(null);
      } else {
        setError('Telegram WebApp API non disponible');
      }
    } catch (err) {
      setError(`Erreur d'initialisation: ${err}`);
    }
  }, []);

  // Afficher une alerte
  const showAlert = useCallback((message: string) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(message);
    }
  }, []);

  // Afficher une confirmation
  const showConfirm = useCallback(
    (message: string, callback: (confirmed: boolean) => void) => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showConfirm(message, callback);
      }
    },
    []
  );

  // Afficher un popup
  const showPopup = useCallback(
    (
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
    ) => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showPopup(params, callback);
      }
    },
    []
  );

  // Fermer l'application
  const closeApp = useCallback(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    }
  }, []);

  // Envoyer des données au bot
  const sendData = useCallback((data: string) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(data);
    }
  }, []);

  // Ouvrir un lien
  const openLink = useCallback(
    (url: string, options?: { try_instant_view?: boolean }) => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.openLink(url, options);
      }
    },
    []
  );

  // Gérer le bouton principal
  const MainButton = useCallback(() => {
    if (!window.Telegram?.WebApp) return null;

    const tg = window.Telegram.WebApp.MainButton;

    return {
      show: () => tg.show(),
      hide: () => tg.hide(),
      setText: (text: string) => tg.setText(text),
      setParams: (params: {
        text?: string;
        color?: string;
        text_color?: string;
        is_active?: boolean;
        is_visible?: boolean;
      }) => tg.setParams(params),
      onClick: (callback: () => void) => tg.onClick(callback),
      enable: () => tg.enable(),
      disable: () => tg.disable(),
      showProgress: (leaveActive?: boolean) => tg.showProgress(leaveActive),
      hideProgress: () => tg.hideProgress(),
      isVisible: tg.isVisible,
      isActive: tg.isActive,
      isProgressVisible: tg.isProgressVisible,
    };
  }, []);

  // Gérer le bouton retour
  const BackButton = useCallback(() => {
    if (!window.Telegram?.WebApp) return null;

    const tg = window.Telegram.WebApp.BackButton;

    return {
      show: () => tg.show(),
      hide: () => tg.hide(),
      onClick: (callback: () => void) => tg.onClick(callback),
      isVisible: tg.isVisible,
    };
  }, []);

  // Feedback haptique
  const HapticFeedback = useCallback(() => {
    if (!window.Telegram?.WebApp) return null;

    const tg = window.Telegram.WebApp.HapticFeedback;

    return {
      impactOccurred: (
        style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
      ) => tg.impactOccurred(style),
      notificationOccurred: (type: 'error' | 'success' | 'warning') =>
        tg.notificationOccurred(type),
      selectionChanged: () => tg.selectionChanged(),
    };
  }, []);

  // Initialiser au montage du composant
  useEffect(() => {
    initTelegram();
  }, [initTelegram]);

  return {
    // État
    isReady,
    user,
    chat,
    theme,
    colorScheme,
    isExpanded,
    viewportHeight,
    error,

    // Méthodes
    initTelegram,
    showAlert,
    showConfirm,
    showPopup,
    closeApp,
    sendData,
    openLink,

    // Composants
    MainButton: MainButton(),
    BackButton: BackButton(),
    HapticFeedback: HapticFeedback(),

    // Configuration
    config: TELEGRAM_CONFIG,
  };
};
