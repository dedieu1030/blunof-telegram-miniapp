import React from 'react'
import { motion } from 'framer-motion'
import { colors, spacing, typography, borderRadius, shadows, transitions } from '@/styles/design-system'

export interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  padding = 'md',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  style = {},
}) => {
  // 📏 Tailles selon le système 4pt
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          borderRadius: borderRadius.sm,
        }
      case 'md':
        return {
          borderRadius: borderRadius.md,
        }
      case 'lg':
        return {
          borderRadius: borderRadius.lg,
        }
      default:
        return {}
    }
  }

  // 🎨 Variants selon le style Uber
  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return {
          background: colors.neutral[50],
          border: `1px solid ${colors.neutral[200]}`,
          boxShadow: shadows.sm,
        }
      case 'elevated':
        return {
          background: colors.neutral[50],
          border: 'none',
          boxShadow: shadows.lg,
        }
      case 'outlined':
        return {
          background: 'transparent',
          border: `2px solid ${colors.neutral[300]}`,
          boxShadow: 'none',
        }
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }
      default:
        return {}
    }
  }

  // 📦 Padding selon le système 4pt
  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return { padding: '0px' }
      case 'sm':
        return { padding: spacing[3] } // 12px
      case 'md':
        return { padding: spacing[4] } // 16px
      case 'lg':
        return { padding: spacing[6] } // 24px
      default:
        return { padding: spacing[4] }
    }
  }

  const baseStyles = {
    position: 'relative' as const,
    overflow: 'hidden',
    transition: transitions.normal,
    cursor: onClick && !disabled ? 'pointer' : 'default',
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...getPaddingStyles(),
  }

  const disabledStyles = disabled ? {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none' as const,
  } : {}

  const loadingStyles = loading ? {
    cursor: 'wait',
    pointerEvents: 'none' as const,
  } : {}

  // Styles interactifs gérés par Framer Motion

  return (
    <motion.div
      style={{
        ...baseStyles,
        ...disabledStyles,
        ...loadingStyles,
        ...style,
      }}
      className={`blunof-card ${className}`}
      onClick={onClick && !disabled && !loading ? onClick : undefined}
      whileHover={onClick && !disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={onClick && !disabled && !loading ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 🌟 Loading Overlay */}
      {loading && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            style={{
              width: '32px',
              height: '32px',
              border: `3px solid ${colors.neutral[200]}`,
              borderTop: `3px solid ${colors.primary[500]}`,
              borderRadius: '50%',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}

      {/* 🎯 Contenu de la carte */}
      <div style={{
        position: 'relative',
        zIndex: 0,
        opacity: loading ? 0.3 : 1,
        transition: transitions.fast,
      }}>
        {children}
      </div>

      {/* ✨ Effet de brillance au hover */}
      {onClick && !disabled && !loading && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            zIndex: 2,
          }}
          whileHover={{
            left: '100%',
            transition: { duration: 0.6, ease: 'easeInOut' },
          }}
        />
      )}
    </motion.div>
  )
}

// 🎯 Composants Card spécialisés
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.div
    style={{
      marginBottom: spacing[4], // 16px
      paddingBottom: spacing[3], // 12px
      borderBottom: `1px solid ${colors.neutral[200]}`,
    }}
    className={`blunof-card-header ${className}`}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
  >
    {children}
  </motion.div>
)

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.h3
    style={{
      fontSize: typography.fontSize.h4,
      fontWeight: typography.fontWeight.semibold,
      color: colors.neutral[900],
      lineHeight: typography.lineHeight.h4,
      letterSpacing: typography.letterSpacing.h4,
      margin: 0,
    }}
    className={`blunof-card-title ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    {children}
  </motion.h3>
)

export const CardSubtitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.p
    style={{
      fontSize: typography.fontSize.bodySmall,
      color: colors.neutral[600],
      lineHeight: typography.lineHeight.bodySmall,
      letterSpacing: typography.letterSpacing.bodySmall,
      margin: `${spacing[1]} 0 0 0`, // 4px top
    }}
    className={`blunof-card-subtitle ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    {children}
  </motion.p>
)

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.div
    className={`blunof-card-content ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
  >
    {children}
  </motion.div>
)

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.div
    style={{
      marginTop: spacing[4], // 16px
      paddingTop: spacing[3], // 12px
      borderTop: `1px solid ${colors.neutral[200]}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing[3], // 12px
    }}
    className={`blunof-card-footer ${className}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    {children}
  </motion.div>
)
