import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { BottomTabs } from '@/components/navigation/BottomTabs'
import { HomePage } from '@/pages/HomePage'
import { colors } from '@/styles/design-system'

// 🚀 Intégration Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void
        expand: () => void
        close: () => void
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          show: () => void
          hide: () => void
          enable: () => void
          disable: () => void
          onClick: (callback: () => void) => void
        }
        BackButton: {
          isVisible: boolean
          show: () => void
          hide: () => void
          onClick: (callback: () => void) => void
        }
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void
          selectionChanged: () => void
        }
        themeParams: {
          bg_color?: string
          text_color?: string
          hint_color?: string
          link_color?: string
          button_color?: string
          button_text_color?: string
        }
        colorScheme: 'light' | 'dark'
        isExpanded: boolean
        viewportHeight: number
        viewportStableHeight: number
        headerColor: string
        backgroundColor: string
        isClosingConfirmationEnabled: boolean
        initData: string
        initDataUnsafe: any
        version: string
        platform: string
        sendData: (data: string) => void
        switchInlineQuery: (query: string, choose_chat_types?: string[]) => void
        openLink: (url: string, options?: { try_instant_view?: boolean }) => void
        openTelegramLink: (url: string) => void
        openInvoice: (url: string, callback?: (status: string) => void) => void
        showPopup: (params: {
          title?: string
          message: string
          buttons?: Array<{
            id?: string
            type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
            text: string
          }>
        }, callback?: (buttonId: string) => void) => void
        showAlert: (message: string, callback?: () => void) => void
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void
        showScanQrPopup: (params: {
          text?: string
        }, callback?: (data: string | null) => void) => void
        closeScanQrPopup: () => void
        readTextFromClipboard: (callback?: (data: string | null) => void) => void
        requestWriteAccess: (callback?: (access: boolean) => void) => void
        requestContact: (callback?: (contact: any) => void) => void
        invokeCustomMethod: (method: string, params?: any) => void
        isVersionAtLeast: (version: string) => boolean
        setHeaderColor: (color: string) => void
        setBackgroundColor: (color: string) => void
        enableClosingConfirmation: () => void
        disableClosingConfirmation: () => void
        onEvent: (eventType: string, eventHandler: (event: any) => void) => void
        offEvent: (eventType: string, eventHandler: (event: any) => void) => void
        sendEvent: (eventType: string, eventData?: any) => void
        requestViewport: (callback?: () => void) => void
        requestContentSafeArea: (callback?: (safeArea: {
          top: number
          right: number
          bottom: number
          left: number
        }) => void) => void
        requestContentSafeAreaChanged: (callback?: (safeArea: {
          top: number
          right: number
          bottom: number
          left: number
        }) => void) => void
      }
    }
  }
}

export const App: React.FC = () => {
  const [isTelegramReady, setIsTelegramReady] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // 🚀 Initialisation Telegram WebApp
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      
      // Prêt de l'app
      tg.ready()
      
      // Configuration initiale
      tg.expand()
      
      // Gestion du thème
      setCurrentTheme(tg.colorScheme || 'light')
      
      // Écoute des changements de thème
      tg.onEvent('themeChanged', () => {
        setCurrentTheme(tg.colorScheme || 'light')
      })
      
      // Gestion des safe areas
      tg.requestContentSafeArea((safeArea) => {
        // Mise à jour des variables CSS
        document.documentElement.style.setProperty('--tg-content-safe-area-inset-top', `${safeArea.top}px`)
        document.documentElement.style.setProperty('--tg-content-safe-area-inset-right', `${safeArea.right}px`)
        document.documentElement.style.setProperty('--tg-content-safe-area-inset-bottom', `${safeArea.bottom}px`)
        document.documentElement.style.setProperty('--tg-content-safe-area-inset-left', `${safeArea.left}px`)
      })
      
      // Écoute des changements de safe area
      tg.requestContentSafeAreaChanged((safeArea) => {
        document.documentElement.style.setProperty('--tg-content-safe-area-inset-top', `${safeArea.top}px`)
        document.documentElement.style.setProperty('--tg-content-safe-area-inset-right', `${safeArea.right}px`)
        document.documentElement.style.setProperty('--tg-content-safe-area-inset-bottom', `${safeArea.bottom}px`)
        document.documentElement.style.setProperty('--tg-content-safe-area-inset-left', `${safeArea.left}px`)
      })
      
      setIsTelegramReady(true)
    }
  }, [])

  // 🎨 Styles dynamiques selon le thème
  const appStyles = {
    minHeight: '100vh',
    background: currentTheme === 'light' ? colors.neutral[50] : colors.neutral[900],
    color: currentTheme === 'light' ? colors.neutral[900] : colors.neutral[50],
    transition: 'all 0.3s ease',
    opacity: isTelegramReady ? 1 : 0.8,
  }

  return (
    <Router>
      <motion.div
        style={appStyles}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 🎯 Routes principales */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Autres routes à ajouter */}
          </Routes>
        </AnimatePresence>

        {/* 📱 Navigation bottom tabs */}
        <BottomTabs />

        {/* 🌟 Notifications toast */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: currentTheme === 'light' ? colors.neutral[50] : colors.neutral[800],
              color: currentTheme === 'light' ? colors.neutral[900] : colors.neutral[50],
              border: `1px solid ${currentTheme === 'light' ? colors.neutral[200] : colors.neutral[700]}`,
            },
          }}
        />
      </motion.div>
    </Router>
  )
}
