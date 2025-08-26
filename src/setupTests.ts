// 🌟 Setup des tests Blunof
// Configuration globale pour Jest et Testing Library

import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'
import { vi } from 'vitest'

// 📱 Configuration Testing Library
configure({
  testIdAttribute: 'data-testid',
  asyncUtilTimeout: 5000,
})

// 🎭 Mocks globaux
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// 📱 Mock Telegram WebApp
Object.defineProperty(window, 'Telegram', {
  value: {
    WebApp: {
      ready: vi.fn(),
      expand: vi.fn(),
      close: vi.fn(),
      MainButton: {
        text: '',
        color: '',
        textColor: '',
        isVisible: false,
        isActive: false,
        show: vi.fn(),
        hide: vi.fn(),
        enable: vi.fn(),
        disable: vi.fn(),
        onClick: vi.fn(),
      },
      BackButton: {
        isVisible: false,
        show: vi.fn(),
        hide: vi.fn(),
        onClick: vi.fn(),
      },
      HapticFeedback: {
        impactOccurred: vi.fn(),
        notificationOccurred: vi.fn(),
        selectionChanged: vi.fn(),
      },
      themeParams: {},
      colorScheme: 'light',
      isExpanded: false,
      viewportHeight: 600,
      viewportStableHeight: 600,
      headerColor: '',
      backgroundColor: '',
      isClosingConfirmationEnabled: false,
      initData: '',
      initDataUnsafe: {},
      version: '6.0',
      platform: 'ios',
      sendData: vi.fn(),
      switchInlineQuery: vi.fn(),
      openLink: vi.fn(),
      openTelegramLink: vi.fn(),
      openInvoice: vi.fn(),
      showPopup: vi.fn(),
      showAlert: vi.fn(),
      showConfirm: vi.fn(),
      showScanQrPopup: vi.fn(),
      closeScanQrPopup: vi.fn(),
      readTextFromClipboard: vi.fn(),
      requestWriteAccess: vi.fn(),
      requestContact: vi.fn(),
      invokeCustomMethod: vi.fn(),
      isVersionAtLeast: vi.fn(() => true),
      setHeaderColor: vi.fn(),
      setBackgroundColor: vi.fn(),
      enableClosingConfirmation: vi.fn(),
      disableClosingConfirmation: vi.fn(),
      onEvent: vi.fn(),
      offEvent: vi.fn(),
      sendEvent: vi.fn(),
      requestViewport: vi.fn(),
      requestContentSafeArea: vi.fn((callback) => {
        callback({
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        })
      }),
      requestContentSafeAreaChanged: vi.fn(),
    },
  },
  writable: true,
})

// 🎨 Mock CSS Variables
Object.defineProperty(document.documentElement.style, 'getPropertyValue', {
  value: vi.fn((prop) => {
    const values: Record<string, string> = {
      '--tg-content-safe-area-inset-top': '0px',
      '--tg-content-safe-area-inset-right': '0px',
      '--tg-content-safe-area-inset-bottom': '0px',
      '--tg-content-safe-area-inset-left': '0px',
    }
    return values[prop] || ''
  }),
})

// 📱 Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// 🎯 Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

// 📊 Mock Performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
    getEntriesByName: vi.fn(() => []),
    clearMarks: vi.fn(),
    clearMeasures: vi.fn(),
  },
  writable: true,
})

// 🔄 Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((callback) => {
  setTimeout(callback, 0)
  return 1
})

global.cancelAnimationFrame = vi.fn()

// 📱 Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// 📱 Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true,
})

// 🎭 Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

// 🔍 Console warnings en erreurs pour les tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// 📊 Configuration des tests
beforeEach(() => {
  // 🧹 Nettoyage avant chaque test
  vi.clearAllMocks()
  localStorageMock.clear()
  sessionStorageMock.clear()
  
  // 📱 Reset des mocks Telegram
  if (window.Telegram?.WebApp) {
    Object.keys(window.Telegram.WebApp).forEach((key) => {
      const prop = window.Telegram.WebApp[key as keyof typeof window.Telegram.WebApp]
      if (typeof prop === 'function' && prop !== vi.fn()) {
        ;(window.Telegram.WebApp as any)[key] = vi.fn()
      }
    })
  }
})

// 🎯 Helpers de test
export const mockTelegramWebApp = (overrides = {}) => {
  Object.assign(window.Telegram!.WebApp, overrides)
}

export const createMockUser = (overrides = {}) => ({
  id: 123456789,
  first_name: 'John',
  last_name: 'Doe',
  username: 'johndoe',
  language_code: 'en',
  ...overrides,
})

export const createMockChat = (overrides = {}) => ({
  id: 987654321,
  type: 'private',
  title: 'Test Chat',
  username: 'testchat',
  ...overrides,
})

// 📱 Configuration des tests d'intégration
export const setupIntegrationTest = () => {
  // Configuration spécifique pour les tests d'intégration
  return {
    mockTelegramWebApp,
    createMockUser,
    createMockChat,
  }
}
