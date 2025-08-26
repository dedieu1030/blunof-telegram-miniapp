import React from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  FileText, 
  Users, 
  Package, 
  User,
  Plus,
  Home
} from 'lucide-react'
import { colors, spacing, typography, shadows, transitions, safeAreas, borderRadius } from '@/styles/design-system'

export interface TabItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  badge?: number
}

const tabs: TabItem[] = [
  {
    id: 'home',
    label: 'Accueil',
    icon: <Home size={20} />,
    path: '/',
  },
  {
    id: 'invoices',
    label: 'Factures',
    icon: <FileText size={20} />,
    path: '/invoices',
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: <Users size={20} />,
    path: '/clients',
  },
  {
    id: 'items',
    label: 'Articles',
    icon: <Package size={20} />,
    path: '/items',
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: <User size={20} />,
    path: '/profile',
  },
]

export const BottomTabs: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const currentTab = tabs.find(tab => tab.path === location.pathname) || tabs[0]

  const handleTabClick = (tab: TabItem) => {
    navigate(tab.path)
  }

  return (
    <>
      {/* 🎯 Bouton d'action flottant (style Uber) */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: `calc(80px + ${safeAreas.bottom})`,
          right: spacing[4], // 16px
          zIndex: 1000,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <motion.button
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: colors.primary[500],
            border: 'none',
            boxShadow: shadows.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.neutral[50],
            cursor: 'pointer',
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: shadows.xl,
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/invoices/new')}
        >
          <Plus size={24} />
        </motion.button>
      </motion.div>

      {/* 📱 Navigation Bottom Tabs */}
      <motion.nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: colors.neutral[50],
          borderTop: `1px solid ${colors.neutral[200]}`,
          paddingTop: spacing[3], // 12px
          paddingBottom: `calc(${spacing[3]} + ${safeAreas.bottom})`, // 12px + safe area
          zIndex: 999,
        }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          maxWidth: '100%',
          paddingLeft: spacing[2], // 8px
        paddingRight: spacing[2], // 8px
        }}>
          {tabs.map((tab) => {
            const isActive = currentTab.id === tab.id
            
            return (
              <motion.button
                key={tab.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: spacing[1], // 4px
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: spacing[2], // 8px
                  borderRadius: borderRadius.md,
                  minWidth: '64px',
                  position: 'relative' as const,
                }}
                onClick={() => handleTabClick(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + tabs.indexOf(tab) * 0.05 }}
              >
                {/* 🎯 Icône */}
                <motion.div
                  style={{
                    color: isActive ? colors.primary[500] : colors.neutral[600],
                    transition: transitions.normal,
                  }}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                >
                  {tab.icon}
                </motion.div>

                {/* 🏷️ Label */}
                <motion.span
                  style={{
                    fontSize: typography.fontSize.caption,
                    fontWeight: isActive ? typography.fontWeight.medium : typography.fontWeight.regular,
                    color: isActive ? colors.primary[500] : colors.neutral[600],
                    lineHeight: typography.lineHeight.labelSmall,
                    letterSpacing: typography.letterSpacing.labelSmall,
                    textAlign: 'center' as const,
                  }}
                  animate={{
                    color: isActive ? colors.primary[500] : colors.neutral[600],
                  }}
                >
                  {tab.label}
                </motion.span>

                {/* ✨ Indicateur actif */}
                {isActive && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: spacing[1], // 4px
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: colors.primary[500],
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  />
                )}

                {/* 🔴 Badge */}
                {tab.badge && tab.badge > 0 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: spacing[1], // 4px
                      right: spacing[1], // 4px
                      minWidth: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: colors.error[500],
                      color: colors.neutral[50],
                      fontSize: typography.fontSize.caption,
                      fontWeight: typography.fontWeight.bold,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: spacing[1], // 4px
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* 🌟 Effet de brillance au hover */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${colors.primary[500]}, transparent)`,
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.nav>
    </>
  )
}

// 🎯 Hook pour gérer la navigation
export const useBottomTabs = () => {
  const location = useLocation()
  
  return {
    currentTab: tabs.find(tab => tab.path === location.pathname) || tabs[0],
    tabs,
    isActive: (path: string) => location.pathname === path,
  }
}
