import type { Permission } from './permissions'
import type { FeatureFlag } from './featureFlags'

export const routes = {
  public: {
    root: '/',
    unauthorized: '/unauthorized',
    tailwindTest: '/tailwind-test',
    joinInvite: (token?: string) => (token ? `/join/${token}` : '/join/:token')
  },
  auth: {
    root: '/auth',
    login: '/auth/login',
    register: '/auth/register',
    registerJoin: '/auth/register-join',
    registerIndependent: '/auth/register-independent',
    registerFranchise: '/auth/register-franchise',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    join: (token?: string) => (token ? `/auth/join/${token}` : '/auth/join/:token')
  },
  dashboard: {
    root: '/platform',
    organizations: '/organization',
    organizationBranches: '/organization/branches',
    branch: '/branch',
    branchOrders: '/branch/orders',
    branchMenu: '/branch/menu',
    branchKitchen: '/branch/kitchen',
    clients: '/client',
    clientSupport: '/client/support',
    settings: '/settings'
  }
}

export type RouteLayout = 'dashboard' | 'auth' | 'public'

export type RouteDefinition = {
  key: string
  path: string
  title: string
  description?: string
  layout: RouteLayout
  permissions?: Permission[]
  featureFlag?: FeatureFlag
  breadcrumbLabel?: string | ((params: Record<string, string>) => string)
  parentKey?: string
}

export const routeDefinitions: RouteDefinition[] = [
  {
    key: 'dashboard',
    path: routes.dashboard.root,
    title: 'Tableau de bord',
    description: 'Vue globale de l’activité et des indicateurs clés.',
    layout: 'dashboard',
    permissions: ['platform:analytics:read', 'orders:analytics', 'restaurant:view_analytics', 'orders:read'],
    breadcrumbLabel: 'Dashboard'
  },
  {
    key: 'organizations',
    path: routes.dashboard.organizations,
    title: 'Organisations',
    description: 'Gérez vos organisations et leurs structures.',
    layout: 'dashboard',
    permissions: ['platform:tenants:read', 'restaurant:read', 'users:read'],
    breadcrumbLabel: 'Organisations'
  },
  {
    key: 'organizationBranches',
    path: routes.dashboard.organizationBranches,
    title: 'Agences',
    description: 'Liste des agences liées à l’organisation.',
    layout: 'dashboard',
    permissions: ['restaurant:read', 'tables:read'],
    parentKey: 'organizations',
    breadcrumbLabel: 'Agences'
  },
  {
    key: 'branch',
    path: routes.dashboard.branch,
    title: 'Restaurant',
    description: 'Vue du restaurant courant et des opérations.',
    layout: 'dashboard',
    permissions: ['restaurant:read', 'tables:read', 'orders:read'],
    breadcrumbLabel: 'Restaurant'
  },
  {
    key: 'branchOrders',
    path: routes.dashboard.branchOrders,
    title: 'Commandes',
    description: 'Suivi des commandes en temps réel.',
    layout: 'dashboard',
    permissions: ['orders:read', 'orders:read_own'],
    parentKey: 'branch',
    breadcrumbLabel: 'Commandes'
  },
  {
    key: 'branchMenu',
    path: routes.dashboard.branchMenu,
    title: 'Menu',
    description: 'Gestion du menu et des catégories.',
    layout: 'dashboard',
    permissions: ['plats:read', 'categories:read'],
    parentKey: 'branch',
    breadcrumbLabel: 'Menu'
  },
  {
    key: 'branchKitchen',
    path: routes.dashboard.branchKitchen,
    title: 'Cuisine',
    description: 'Monitoring des tickets et préparation.',
    layout: 'dashboard',
    permissions: ['orders:update_status'],
    parentKey: 'branch',
    breadcrumbLabel: 'Cuisine'
  },
  {
    key: 'clients',
    path: routes.dashboard.clients,
    title: 'Clients',
    description: 'Suivi des clients et des demandes de support.',
    layout: 'dashboard',
    permissions: ['users:read', 'platform:users:read'],
    breadcrumbLabel: 'Clients'
  },
  {
    key: 'clientSupport',
    path: routes.dashboard.clientSupport,
    title: 'Support client',
    description: 'Prise en charge des demandes et tickets clients.',
    layout: 'dashboard',
    permissions: ['platform:support:impersonate', 'platform:logs:read'],
    parentKey: 'clients',
    breadcrumbLabel: 'Support'
  },
  {
    key: 'settings',
    path: routes.dashboard.settings,
    title: 'Paramètres',
    description: 'Configuration globale du système et des accès.',
    layout: 'dashboard',
    permissions: ['restaurant:update', 'users:manage_roles', 'platform:billing:update'],
    featureFlag: 'settings',
    breadcrumbLabel: 'Paramètres'
  },
  {
    key: 'authLogin',
    path: routes.auth.login,
    title: 'Connexion',
    layout: 'auth',
    breadcrumbLabel: 'Connexion'
  },
  {
    key: 'authRegister',
    path: routes.auth.register,
    title: 'Inscription',
    layout: 'auth',
    breadcrumbLabel: 'Inscription'
  },
  {
    key: 'authForgotPassword',
    path: routes.auth.forgotPassword,
    title: 'Mot de passe oublié',
    layout: 'auth',
    breadcrumbLabel: 'Mot de passe oublié'
  },
  {
    key: 'authResetPassword',
    path: routes.auth.resetPassword,
    title: 'Réinitialisation du mot de passe',
    layout: 'auth',
    breadcrumbLabel: 'Réinitialisation'
  },
  {
    key: 'authVerifyEmail',
    path: routes.auth.verifyEmail,
    title: 'Vérification par e-mail',
    layout: 'auth',
    breadcrumbLabel: 'Vérification du compte'
  },
  {
    key: 'authJoin',
    path: routes.auth.join(),
    title: 'Invitation',
    layout: 'auth',
    breadcrumbLabel: (params) => `Invitation ${params.token ?? ''}`
  },
  {
    key: 'joinInvite',
    path: routes.public.joinInvite(),
    title: 'Invitation externe',
    layout: 'public',
    breadcrumbLabel: (params) => `Invitation ${params.token ?? ''}`
  },
  {
    key: 'unauthorized',
    path: routes.public.unauthorized,
    title: 'Accès refusé',
    layout: 'public',
    breadcrumbLabel: 'Accès refusé'
  },
  {
    key: 'tailwindTest',
    path: routes.public.tailwindTest,
    title: 'Test Tailwind',
    layout: 'public',
    breadcrumbLabel: 'Test Tailwind'
  }
]

export const routeDefinitionsByKey = Object.fromEntries(routeDefinitions.map((route) => [route.key, route])) as Record<string, RouteDefinition>
