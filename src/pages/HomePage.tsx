import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Users, 
  Package, 
  DollarSign,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { colors, spacing, typography, layouts, safeAreas } from '@/styles/design-system'

export const HomePage: React.FC = () => {
  // 📊 Données de démonstration
  const stats = [
    {
      icon: <FileText size={24} />,
      label: 'Factures générées',
      value: '127',
      change: '+12%',
      color: colors.primary[500],
    },
    {
      icon: <DollarSign size={24} />,
      label: 'Chiffre d\'affaires',
      value: '€45,230',
      change: '+8%',
      color: colors.success[500],
    },
    {
      icon: <Users size={24} />,
      label: 'Clients actifs',
      value: '89',
      change: '+5%',
      color: colors.accent.purple,
    },
    {
      icon: <Package size={24} />,
      label: 'Articles',
      value: '156',
      change: '+3%',
      color: colors.accent.teal,
    },
  ]

  const recentInvoices = [
    {
      id: 'INV-001',
      client: 'TechCorp Solutions',
      amount: '€2,450',
      status: 'paid',
      date: '2024-01-15',
    },
    {
      id: 'INV-002',
      client: 'Design Studio Pro',
      amount: '€1,890',
      status: 'pending',
      date: '2024-01-14',
    },
    {
      id: 'INV-003',
      client: 'Marketing Plus',
      amount: '€3,120',
      status: 'overdue',
      date: '2024-01-10',
    },
  ]

  const quickActions = [
    {
      icon: <FileText size={20} />,
      label: 'Nouvelle facture',
      description: 'Créer une facture en quelques clics',
      action: '/invoices/new',
      color: colors.primary[500],
    },
    {
      icon: <Users size={20} />,
      label: 'Ajouter client',
      description: 'Gérer votre base clients',
      action: '/clients/new',
      color: colors.accent.purple,
    },
    {
      icon: <Package size={20} />,
      label: 'Nouvel article',
      description: 'Créer des articles réutilisables',
      action: '/items/new',
      color: colors.accent.teal,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return colors.success[500]
      case 'pending':
        return colors.warning[500]
      case 'overdue':
        return colors.error[500]
      default:
        return colors.neutral[500]
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payée'
      case 'pending':
        return 'En attente'
      case 'overdue':
        return 'En retard'
      default:
        return 'Inconnu'
    }
  }

  return (
    <motion.div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.neutral[50]} 0%, ${colors.neutral[100]} 100%)`,
        paddingTop: `calc(${spacing[4]} + ${safeAreas.top})`, // 16px + safe area
        paddingBottom: '100px', // Espace pour les bottom tabs
        paddingLeft: layouts.single.padding,
        paddingRight: layouts.single.padding,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🎯 Header avec titre et avatar */}
      <motion.header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing[6], // 24px
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <motion.h1
            style={{
              fontSize: typography.fontSize.h1,
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral[900],
              lineHeight: typography.lineHeight.h1,
              letterSpacing: typography.letterSpacing.h1,
              margin: 0,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Bonjour ! 👋
          </motion.h1>
          <motion.p
            style={{
              fontSize: typography.fontSize.body,
              color: colors.neutral[600],
              lineHeight: typography.lineHeight.body,
              letterSpacing: typography.letterSpacing.body,
              margin: `${spacing[1]} 0 0 0`, // 4px top
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Prêt à gérer vos factures ?
          </motion.p>
        </div>

        {/* 🎭 Avatar profil */}
        <motion.div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.primary[400]}, ${colors.primary[600]})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.neutral[50],
            fontSize: typography.fontSize.h4,
            fontWeight: typography.fontWeight.bold,
            cursor: 'pointer',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          JD
        </motion.div>
      </motion.header>

      {/* 📊 Statistiques */}
      <motion.section
        style={{
          marginBottom: spacing[6], // 24px
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h2
          style={{
            fontSize: typography.fontSize.h3,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral[900],
            marginBottom: spacing[4], // 16px
          }}
        >
          Vue d'ensemble
        </motion.h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: spacing[3], // 12px
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              style={{
                background: colors.neutral[50],
                padding: spacing[4], // 16px
                borderRadius: '12px',
                border: `1px solid ${colors.neutral[200]}`,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing[2], // 8px
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2], // 8px
              }}>
                <div style={{
                  color: stat.color,
                  padding: spacing[2], // 8px
                  borderRadius: '8px',
                  background: `${stat.color}15`,
                }}>
                  {stat.icon}
                </div>
                <span style={{
                  fontSize: typography.fontSize.caption,
                  color: colors.neutral[600],
                  fontWeight: typography.fontWeight.medium,
                }}>
                  {stat.change}
                </span>
              </div>
              
              <div style={{
                fontSize: typography.fontSize.h3,
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral[900],
              }}>
                {stat.value}
              </div>
              
              <div style={{
                fontSize: typography.fontSize.label,
                color: colors.neutral[600],
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ⚡ Actions rapides */}
      <motion.section
        style={{
          marginBottom: spacing[6], // 24px
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.h2
          style={{
            fontSize: typography.fontSize.h3,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral[900],
            marginBottom: spacing[4], // 16px
          }}
        >
          Actions rapides
        </motion.h2>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3], // 12px
        }}>
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              style={{
                background: colors.neutral[50],
                padding: spacing[4], // 16px
                borderRadius: '12px',
                border: `1px solid ${colors.neutral[200]}`,
                display: 'flex',
                alignItems: 'center',
                gap: spacing[4], // 16px
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div style={{
                color: action.color,
                padding: spacing[3], // 12px
                borderRadius: '10px',
                background: `${action.color}15`,
              }}>
                {action.icon}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.neutral[900],
                  marginBottom: spacing[1], // 4px
                }}>
                  {action.label}
                </div>
                <div style={{
                  fontSize: typography.fontSize.label,
                  color: colors.neutral[600],
                }}>
                  {action.description}
                </div>
              </div>
              
              <ArrowRight size={20} color={colors.neutral[400]} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 📄 Factures récentes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <motion.div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing[4], // 16px
        }}>
          <motion.h2
            style={{
              fontSize: typography.fontSize.h3,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral[900],
              margin: 0,
            }}
          >
            Factures récentes
          </motion.h2>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = '/invoices'}
          >
            Voir tout
          </Button>
        </motion.div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3], // 12px
        }}>
          {recentInvoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              style={{
                background: colors.neutral[50],
                padding: spacing[4], // 16px
                borderRadius: '12px',
                border: `1px solid ${colors.neutral[200]}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              whileHover={{ scale: 1.01, y: -1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[3], // 12px
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: colors.primary[100],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.primary[600],
                }}>
                  <FileText size={20} />
                </div>
                
                <div>
                  <div style={{
                    fontSize: typography.fontSize.body,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.neutral[900],
                    marginBottom: spacing[1], // 4px
                  }}>
                    {invoice.client}
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.caption,
                    color: colors.neutral[600],
                  }}>
                    {invoice.id} • {invoice.date}
                  </div>
                </div>
              </div>
              
              <div style={{
                textAlign: 'right' as const,
              }}>
                <div style={{
                  fontSize: typography.fontSize.body,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.neutral[900],
                  marginBottom: spacing[1], // 4px
                }}>
                  {invoice.amount}
                </div>
                <div style={{
                  fontSize: typography.fontSize.caption,
                  color: getStatusColor(invoice.status),
                  fontWeight: typography.fontWeight.medium,
                }}>
                  {getStatusLabel(invoice.status)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
