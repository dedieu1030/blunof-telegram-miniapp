import React from 'react'
import { motion } from 'framer-motion'
import { colors, spacing, typography, borderRadius, shadows, transitions } from '@/styles/design-system'

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
}) => {
  // 🎨 Variants selon le style Uber
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: colors.primary[500],
          color: colors.neutral[50],
          boxShadow: shadows.primary,
          '&:hover': {
            background: colors.primary[600],
            transform: 'translateY(-1px)',
          },
          '&:active': {
            background: colors.primary[700],
            transform: 'translateY(0)',
          },
        }
      case 'secondary':
        return {
          background: colors.neutral[100],
          color: colors.neutral[900],
          border: `1px solid ${colors.neutral[200]}`,
          '&:hover': {
            background: colors.neutral[200],
            borderColor: colors.neutral[300],
          },
        }
      case 'outline':
        return {
          background: 'transparent',
          color: colors.primary[500],
          border: `2px solid ${colors.primary[500]}`,
          '&:hover': {
            background: colors.primary[50],
            color: colors.primary[600],
          },
        }
      case 'ghost':
        return {
          background: 'transparent',
          color: colors.neutral[700],
          '&:hover': {
            background: colors.neutral[100],
            color: colors.neutral[900],
          },
        }
      case 'danger':
        return {
          background: colors.error[500],
          color: colors.neutral[50],
          boxShadow: shadows.error,
          '&:hover': {
            background: colors.error[600],
            transform: 'translateY(-1px)',
          },
        }
      default:
        return {}
    }
  }

  // 📏 Tailles selon le système 4pt
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: `${spacing[2]} ${spacing[3]}`, // 8px 12px
          fontSize: typography.fontSize.label,
          borderRadius: borderRadius.sm,
          minHeight: '32px',
        }
      case 'md':
        return {
          padding: `${spacing[3]} ${spacing[4]}`, // 12px 16px
          fontSize: typography.fontSize.body,
          borderRadius: borderRadius.md,
          minHeight: '40px',
        }
      case 'lg':
        return {
          padding: `${spacing[4]} ${spacing[5]}`, // 16px 20px
          fontSize: typography.fontSize.h4,
          borderRadius: borderRadius.lg,
          minHeight: '48px',
        }
      default:
        return {}
    }
  }

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2], // 8px
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.body,
    letterSpacing: typography.letterSpacing.body,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    transition: transitions.normal,
    width: fullWidth ? '100%' : 'auto',
    position: 'relative' as const,
    overflow: 'hidden',
    ...getVariantStyles(),
    ...getSizeStyles(),
  }

  const disabledStyles = disabled ? {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: 'none !important',
  } : {}

  const loadingStyles = loading ? {
    cursor: 'wait',
    pointerEvents: 'none' as const,
  } : {}

  return (
    <motion.button
      type={type}
      style={{
        ...baseStyles,
        ...disabledStyles,
        ...loadingStyles,
      }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`blunof-button ${className}`}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* 🌟 Loading Spinner */}
      {loading && (
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '16px',
            height: '16px',
            border: `2px solid ${colors.neutral[200]}`,
            borderTop: `2px solid ${variant === 'primary' ? colors.neutral[50] : colors.primary[500]}`,
            borderRadius: '50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* 🎯 Contenu du bouton */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
        opacity: loading ? 0 : 1,
        transition: transitions.fast,
      }}>
        {/* Icône gauche */}
        {icon && iconPosition === 'left' && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {icon}
          </span>
        )}

        {/* Texte */}
        <span>{children}</span>

        {/* Icône droite */}
        {icon && iconPosition === 'right' && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {icon}
          </span>
        )}
      </div>
    </motion.button>
  )
}
