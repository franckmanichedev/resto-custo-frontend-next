export type RouteBreadcrumb = { label: string; href: string }

export type RouteMeta = {
  title: string
  description?: string
  breadcrumbs: RouteBreadcrumb[]
  permissions?: string[]
  layout?: 'dashboard' | 'auth' | 'public'
  featureFlag?: string
  seo?: {
    title: string
    description: string
  }
}

export const routeMetaMap: Record<string, RouteMeta> = {
  '/platform': {
    title: 'Tableau de bord',
    description: 'Vue globale de l’activité et des indicateurs clés.',
    breadcrumbs: [{ label: 'Dashboard', href: '/platform' }],
    permissions: ['platform:analytics:read', 'orders:analytics', 'restaurant:view_analytics', 'orders:read'],
    layout: 'dashboard',
    seo: { title: 'Tableau de bord', description: 'Tableau de bord multisite du SaaS' }
  },
  '/organization': {
    title: 'Organisations',
    description: 'Gérez vos organisations et leurs structures.',
    breadcrumbs: [{ label: 'Organisations', href: '/organization' }],
    permissions: ['platform:tenants:read', 'restaurant:read', 'users:read'],
    layout: 'dashboard'
  },
  '/organization/branches': {
    title: 'Agences',
    description: 'Liste des agences liées à l’organisation.',
    breadcrumbs: [
      { label: 'Organisations', href: '/organization' },
      { label: 'Agences', href: '/organization/branches' }
    ],
    permissions: ['restaurant:read', 'tables:read'],
    layout: 'dashboard'
  },
  '/branch': {
    title: 'Restaurant',
    description: 'Vue du restaurant courant et des opérations.',
    breadcrumbs: [{ label: 'Restaurant', href: '/branch' }],
    permissions: ['restaurant:read', 'tables:read', 'orders:read'],
    layout: 'dashboard'
  },
  '/client': {
    title: 'Clients',
    description: 'Suivi des clients et des demandes de support.',
    breadcrumbs: [{ label: 'Clients', href: '/client' }],
    permissions: ['users:read', 'platform:users:read'],
    layout: 'dashboard'
  },
  '/client/support': {
    title: 'Support client',
    description: 'Prise en charge des demandes et tickets clients.',
    breadcrumbs: [
      { label: 'Clients', href: '/client' },
      { label: 'Support', href: '/client/support' }
    ],
    permissions: ['platform:support:impersonate', 'platform:logs:read'],
    layout: 'dashboard'
  },
  '/settings': {
    title: 'Paramètres',
    description: 'Configuration globale du système et des accès.',
    breadcrumbs: [{ label: 'Paramètres', href: '/settings' }],
    permissions: ['restaurant:update', 'users:manage_roles', 'platform:billing:update'],
    layout: 'dashboard'
  }
}

export function getRouteMeta(pathname: string): RouteMeta {
  if (routeMetaMap[pathname]) return routeMetaMap[pathname]

  const fallback = routeMetaMap['/platform']
  return {
    ...fallback,
    title: 'Tableau de bord',
    breadcrumbs: [{ label: 'Dashboard', href: '/platform' }]
  }
}
