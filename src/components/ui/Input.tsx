import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { colors, spacing, typography, borderRadius, transitions } from '@/styles/design-system'

export interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'filled'
  error?: string
  success?: boolean
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  helperText?: string
  className?: string
  name?: string
  id?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeholder,
  value = '',
  onChange,
  onBlur,
  onFocus,
  type = 'text',
  size = 'md',
  variant = 'default',
  error,
  success = false,
  disabled = false,
  required = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  helperText,
  className = '',
  name,
  id,
}, ref) => {
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

  // 🎨 Variants selon le style Uber
  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return {
          background: colors.neutral[50],
          border: `1px solid ${colors.neutral[200]}`,
          color: colors.neutral[900],
          '&:focus': {
            borderColor: colors.primary[500],
            boxShadow: `0 0 0 3px ${colors.primary[100]}`,
          },
          '&:hover': {
            borderColor: colors.neutral[300],
          },
        }
      case 'outline':
        return {
          background: 'transparent',
          border: `2px solid ${colors.neutral[300]}`,
          color: colors.neutral[900],
          '&:focus': {
            borderColor: colors.primary[500],
            boxShadow: `0 0 0 3px ${colors.primary[100]}`,
          },
          '&:hover': {
            borderColor: colors.neutral[400],
          },
        }
      case 'filled':
        return {
          background: colors.neutral[100],
          border: 'none',
          color: colors.neutral[900],
          '&:focus': {
            background: colors.neutral[50],
            boxShadow: `0 0 0 3px ${colors.primary[100]}`,
          },
          '&:hover': {
            background: colors.neutral[200],
          },
        }
      default:
        return {}
    }
  }

  // 🚨 États d'erreur et de succès
  const getStateStyles = () => {
    if (error) {
      return {
        borderColor: colors.error[500],
        boxShadow: `0 0 0 3px ${colors.error[100]}`,
        '&:focus': {
          borderColor: colors.error[600],
          boxShadow: `0 0 0 3px ${colors.error[100]}`,
        },
      }
    }
    if (success) {
      return {
        borderColor: colors.success[500],
        boxShadow: `0 0 0 3px ${colors.success[100]}`,
        '&:focus': {
          borderColor: colors.success[600],
          boxShadow: `0 0 0 3px ${colors.success[100]}`,
        },
      }
    }
    return {}
  }

  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2], // 8px
    width: fullWidth ? '100%' : 'auto',
    position: 'relative' as const,
    transition: transitions.normal,
    outline: 'none',
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...getStateStyles(),
  }

  const disabledStyles = disabled ? {
    opacity: 0.5,
    cursor: 'not-allowed',
    background: colors.neutral[100],
  } : {}

  const inputStyles = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontSize: 'inherit',
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.body,
    letterSpacing: typography.letterSpacing.body,
    color: 'inherit',
    '&::placeholder': {
      color: colors.neutral[400],
    },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <motion.div
      style={{
        width: fullWidth ? '100%' : 'auto',
      }}
      className={`blunof-input ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* 🏷️ Label */}
      {label && (
        <motion.label
          htmlFor={id || name}
          style={{
            display: 'block',
            marginBottom: spacing[1], // 4px
            fontSize: typography.fontSize.label,
            fontWeight: typography.fontWeight.medium,
            color: colors.neutral[700],
            lineHeight: typography.lineHeight.label,
            letterSpacing: typography.letterSpacing.label,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {label}
          {required && (
            <span style={{ color: colors.error[500], marginLeft: spacing[1] }}>
              *
            </span>
          )}
        </motion.label>
      )}

      {/* 🎯 Container de l'input */}
      <motion.div
        style={{
          ...baseStyles,
          ...disabledStyles,
        }}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.1 }}
      >
        {/* Icône gauche */}
        {icon && iconPosition === 'left' && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            color: colors.neutral[500],
            fontSize: '18px',
          }}>
            {icon}
          </span>
        )}

        {/* Input principal */}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          name={name}
          id={id || name}
          style={inputStyles}
        />

        {/* Icône droite */}
        {icon && iconPosition === 'right' && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            color: colors.neutral[500],
            fontSize: '18px',
          }}>
            {icon}
          </span>
        )}

        {/* 🟢 Indicateur de succès */}
        {success && (
          <motion.div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: colors.success[500],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <span style={{
              color: colors.neutral[50],
              fontSize: '10px',
              fontWeight: 'bold',
            }}>
              ✓
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* 📝 Texte d'aide et erreurs */}
      {(helperText || error) && (
        <motion.div
          style={{
            marginTop: spacing[1], // 4px
            fontSize: typography.fontSize.caption,
            lineHeight: typography.lineHeight.labelSmall,
            letterSpacing: typography.letterSpacing.labelSmall,
            color: error ? colors.error[600] : colors.neutral[600],
          }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {error || helperText}
        </motion.div>
      )}
    </motion.div>
  )
})

Input.displayName = 'Input'
