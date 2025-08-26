// 🌟 Setup des tests d'intégration Blunof
// Configuration spécifique pour les tests d'intégration

import { setupIntegrationTest } from './setupTests'

// 📱 Configuration des tests d'intégration
beforeAll(() => {
  // 🔧 Configuration spécifique pour l'intégration
  console.log('🧪 Configuration des tests d\'intégration Blunof')
})

// 🎯 Setup global pour les tests d'intégration
const integrationSetup = setupIntegrationTest()

// 📊 Configuration des mocks avancés
beforeEach(() => {
  // 🎭 Mocks spécifiques aux tests d'intégration
  integrationSetup.mockTelegramWebApp({
    // 📱 Configuration réaliste pour les tests d'intégration
    colorScheme: 'light',
    platform: 'ios',
    viewportHeight: 800,
    viewportStableHeight: 800,
    themeParams: {
      bg_color: '#ffffff',
      text_color: '#000000',
      hint_color: '#999999',
      link_color: '#2481cc',
      button_color: '#2481cc',
      button_text_color: '#ffffff',
    },
  })
})

// 🔍 Configuration des timeouts pour les tests d'intégration
jest.setTimeout(30000)

// 📱 Configuration des tests d'intégration
export const integrationTestConfig = {
  // 🎯 Timeouts
  timeout: 30000,
  
  // 📊 Retry des tests échoués
  retries: 2,
  
  // 🔄 Configuration des mocks
  mocks: integrationSetup,
  
  // 📱 Configuration Telegram
  telegram: {
    user: integrationSetup.createMockUser(),
    chat: integrationSetup.createMockChat(),
  },
  
  // 🎨 Configuration du thème
  theme: {
    light: {
      background: '#ffffff',
      text: '#000000',
      primary: '#2196F3',
    },
    dark: {
      background: '#1a1a1a',
      text: '#ffffff',
      primary: '#64b5f6',
    },
  },
}

// 🎯 Helpers spécifiques aux tests d'intégration
export const waitForElement = async (selector: string, timeout = 5000) => {
  const startTime = Date.now()
  
  while (Date.now() - startTime < timeout) {
    const element = document.querySelector(selector)
    if (element) {
      return element
    }
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  throw new Error(`Element ${selector} not found within ${timeout}ms`)
}

export const waitForCondition = async (condition: () => boolean, timeout = 5000) => {
  const startTime = Date.now()
  
  while (Date.now() - startTime < timeout) {
    if (condition()) {
      return true
    }
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  throw new Error(`Condition not met within ${timeout}ms`)
}

// 📱 Simulation des interactions utilisateur
export const simulateUserInteraction = {
  // 👆 Tap/Touch
  tap: async (element: Element) => {
    element.dispatchEvent(new Event('touchstart', { bubbles: true }))
    element.dispatchEvent(new Event('touchend', { bubbles: true }))
    element.dispatchEvent(new Event('click', { bubbles: true }))
  },
  
  // ⌨️ Input
  type: async (element: HTMLInputElement, text: string) => {
    element.focus()
    element.value = text
    element.dispatchEvent(new Event('input', { bubbles: true }))
    element.dispatchEvent(new Event('change', { bubbles: true }))
  },
  
  // 🔄 Swipe
  swipe: async (element: Element, direction: 'left' | 'right' | 'up' | 'down') => {
    const touchStart = new TouchEvent('touchstart', {
      bubbles: true,
      touches: [new Touch({ identifier: 1, target: element, clientX: 0, clientY: 0 })],
    })
    
    const touchEnd = new TouchEvent('touchend', {
      bubbles: true,
      touches: [],
    })
    
    element.dispatchEvent(touchStart)
    element.dispatchEvent(touchEnd)
  },
}

// 📊 Configuration des tests de performance
export const performanceTestConfig = {
  // 🎯 Métriques à mesurer
  metrics: [
    'First Contentful Paint',
    'Largest Contentful Paint',
    'First Input Delay',
    'Cumulative Layout Shift',
  ],
  
  // 📱 Seuils de performance
  thresholds: {
    'First Contentful Paint': 2000,
    'Largest Contentful Paint': 4000,
    'First Input Delay': 100,
    'Cumulative Layout Shift': 0.1,
  },
}

// 🔒 Configuration des tests de sécurité
export const securityTestConfig = {
  // 🚨 Tests de sécurité à effectuer
  tests: [
    'XSS Prevention',
    'CSRF Protection',
    'Content Security Policy',
    'Secure Headers',
  ],
  
  // 📱 Headers de sécurité attendus
  expectedHeaders: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
}

// 🌐 Configuration des tests d'accessibilité
export const accessibilityTestConfig = {
  // ♿ Tests d'accessibilité
  rules: [
    'color-contrast',
    'button-name',
    'form-field-multiple-labels',
    'heading-order',
    'image-alt',
    'label',
    'link-name',
    'list',
    'listitem',
    'region',
  ],
  
  // 📱 Niveau de conformité
  level: 'AA',
}

// 📱 Configuration des tests de responsive
export const responsiveTestConfig = {
  // 📱 Breakpoints à tester
  breakpoints: [
    { width: 320, height: 568, name: 'Mobile Small' },
    { width: 375, height: 667, name: 'Mobile Medium' },
    { width: 414, height: 896, name: 'Mobile Large' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1024, height: 768, name: 'Desktop Small' },
    { width: 1440, height: 900, name: 'Desktop Large' },
  ],
  
  // 🎯 Orientation à tester
  orientations: ['portrait', 'landscape'],
}

// 🎯 Configuration finale
export default {
  integrationTestConfig,
  waitForElement,
  waitForCondition,
  simulateUserInteraction,
  performanceTestConfig,
  securityTestConfig,
  accessibilityTestConfig,
  responsiveTestConfig,
}
