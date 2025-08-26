// 🎨 DESIGN SYSTEM BLUNOF - Style Uber + Règles Strictes
// Respect du système 4pt, typographie précise, couleurs Uber

export const colors = {
  // 🖤 Palette Uber
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3', // Bleu Uber principal
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  
  // ⚫ Neutres Uber
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    950: '#000000', // Noir Uber
  },
  
  // 🟢 États
  success: {
    50: '#E8F5E8',
    100: '#C8E6C9',
    500: '#4CAF50',
    600: '#388E3C',
    700: '#2E7D32',
  },
  
  warning: {
    50: '#FFF8E1',
    100: '#FFECB3',
    500: '#FF9800',
    600: '#F57C00',
    700: '#EF6C00',
  },
  
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    500: '#F44336',
    600: '#E53935',
    700: '#D32F2F',
  },
  
  // 🌟 Accents
  accent: {
    gold: '#FFD700',
    purple: '#9C27B0',
    teal: '#009688',
  }
}

export const spacing = {
  // 📏 Système 4pt strict
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  13: '52px',
  14: '56px',
  15: '60px',
  16: '64px',
  17: '68px',
  18: '72px',
  19: '76px',
  20: '80px',
} as const

export const typography = {
  // 📝 Typographie précise selon nos guides
  fontFamily: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'JetBrains Mono, "Fira Code", Consolas, monospace',
  },
  
  fontSize: {
    // Headlines 20-32pt
    h1: '32px',
    h2: '28px',
    h3: '24px',
    h4: '20px',
    
    // Body 14-16pt
    body: '16px',
    bodySmall: '14px',
    
    // Labels 12-14pt
    label: '14px',
    labelSmall: '12px',
    
    // Caption
    caption: '12px',
  },
  
  lineHeight: {
    // Headings 1.2x-1.4x
    h1: '1.2',
    h2: '1.3',
    h3: '1.3',
    h4: '1.4',
    
    // Body 1.4x-1.6x
    body: '1.5',
    bodySmall: '1.4',
    
    // Labels
    label: '1.4',
    labelSmall: '1.3',
  },
  
  letterSpacing: {
    // Petites polices +0.5% à +1%
    h1: '-0.02em', // -2%
    h2: '-0.01em', // -1%
    h3: '-0.005em', // -0.5%
    h4: '0',
    body: '0.01em', // +1%
    bodySmall: '0.005em', // +0.5%
    label: '0.005em',
    labelSmall: '0.01em',
  },
  
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }
}

export const shadows = {
  // 🌟 Ombres Uber subtiles
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  
  // Ombres colorées
  primary: '0 4px 14px 0 rgba(33, 150, 243, 0.3)',
  success: '0 4px 14px 0 rgba(76, 175, 80, 0.3)',
  error: '0 4px 14px 0 rgba(244, 67, 54, 0.3)',
}

export const borderRadius = {
  // 🔄 Rayons Uber
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
}

export const transitions = {
  // ⚡ Transitions fluides Uber
  fast: '150ms ease-in-out',
  normal: '250ms ease-in-out',
  slow: '350ms ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}

export const breakpoints = {
  // 📱 Breakpoints mobile-first
  xs: '320px',
  sm: '375px',
  md: '414px',
  lg: '768px',
  xl: '1024px',
}

export const zIndex = {
  // 📚 Z-index organisés
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070,
}

// 🎯 Layouts selon nos guides
export const layouts = {
  // Single Grid (16px padding)
  single: {
    padding: spacing[4], // 16px
    maxWidth: '100%',
  },
  
  // Dual Grid (6-12px/16px)
  dual: {
    paddingHorizontal: spacing[3], // 12px
    paddingVertical: spacing[4], // 16px
    maxWidth: '100%',
  },
  
  // Container
  container: {
    padding: spacing[4],
    maxWidth: '100%',
    margin: '0 auto',
  }
}

// 🌟 Glassmorphism Uber
export const glassmorphism = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}

// 📱 Safe Areas Telegram
export const safeAreas = {
  top: 'var(--tg-content-safe-area-inset-top, 0px)',
  right: 'var(--tg-content-safe-area-inset-right, 0px)',
  bottom: 'var(--tg-content-safe-area-inset-bottom, 0px)',
  left: 'var(--tg-content-safe-area-inset-left, 0px)',
}
