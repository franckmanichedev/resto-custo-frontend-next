# FETCHOUN Routing System

## Objectif

Ce guide décrit l’architecture de routage et de navigation de FETCHOUN. Le système est conçu pour être:

- scalable pour un SaaS multi-tenant
- basé sur des routes configurées et des métadonnées
- compatible avec les rôles, permissions, tenants et feature flags
- optimisé pour le lazy loading et les layouts séparés
- prêt pour les breadcrumbs automatiques et la navigation dynamique

## Structure des fichiers

- `src/config/routes.ts` — constantes de routes, groupes et définitions metadata
- `src/config/navigation.ts` — navigation dynamique, items, icônes, badges, nested routes
- `src/config/permissions.ts` — rôles, permissions, helpers ACL
- `src/config/featureFlags.ts` — flags de fonctionnalité et configuration premium
- `src/hooks/useFeatureFlag.ts` — hook d’accès aux feature flags
- `src/hooks/useBreadcrumbs.ts` — génération automatique des breadcrumbs
- `src/app/router/layouts/DashboardLayout.tsx` — layout dashboard
- `src/app/router/layouts/PublicLayout.tsx` — layout public
- `src/app/router/guards/*` — route guards auth/guest/role/permission/tenant

## Architecture des routes

### Routes déclarées

Les routes sont définies dans `src/config/routes.ts` avec:

- `path` statique et dynamique
- `title` et `description`
- `layout` (`dashboard`, `auth`, `public`)
- `permissions`
- `featureFlag`
- `breadcrumbLabel`
- `parentKey` pour les routes imbriquées

### Exemple de route

```ts
{
  key: 'branchOrders',
  path: routes.dashboard.branchOrders,
  title: 'Commandes',
  description: 'Suivi des commandes en temps réel.',
  layout: 'dashboard',
  permissions: ['orders:read', 'orders:read_own'],
  parentKey: 'branch',
  breadcrumbLabel: 'Commandes'
}
```

### Groupes de routes

Les routes sont organisées par groupe:

- `public` — pages publiques et pages d’erreur
- `auth` — pages de login / registre / verification
- `dashboard` — pages protégées du SaaS

## Navigation dynamique

### Définition

`src/config/navigation.ts` contient une liste d’items de navigation avec:

- `id`, `label`, `path`
- `icon` Lucide
- `permissions` et `featureFlag`
- `badge` et `children`

### Exemple

```ts
{
  id: 'branch',
  label: 'Restaurant',
  path: routes.dashboard.branch,
  icon: ShoppingBag,
  permissions: ['restaurant:read', 'tables:read', 'orders:read'],
  children: [
    { id: 'branch.orders', label: 'Commandes', path: routes.dashboard.branchOrders, icon: CreditCard, permissions: ['orders:read', 'orders:read_own'], badge: '9' }
  ]
}
```

### Filtrage

La fonction `filterNavigationByPermissions()` dans `src/config/permissions.ts`:

- cache les routes non autorisées
- prend en compte les feature flags
- garde la structure imbriquée

## Guards de routage

### `ProtectedRoute`

- redirige les non-authentifiés vers `/auth/login`
- redirige les utilisateurs en email non vérifié vers `/auth/verify-email`
- gère le fallback de chargement

### `GuestRoute`

- bloque les pages auth pour les utilisateurs connectés
- redirige vers `routes.dashboard.root`
- autorise les chemins de verification même si l’email n’est pas vérifié

### `RoleGuard`

- vérifie la présence d’un rôle dans la liste autorisée
- redirige vers `/unauthorized`

### `PermissionGuard`

- vérifie les permissions du tenant depuis `useTenant()`
- redirige vers `/unauthorized`

### `TenantGuard`

- protège les routes nécessitant un tenant et/ou une branche
- permet de garantir que `organizationId` et `branchId` sont présents

## Breadcrumbs automatiques

### `useBreadcrumbs`

Le hook `src/hooks/useBreadcrumbs.ts` transforme le `pathname` actuel en une liste de breadcrumbs:

- route match via `matchPath`
- résolution des paramètres dynamiques
- génération de labels basés sur `breadcrumbLabel`
- remontée des parents `parentKey`

### Exemple

Pour `/branch/orders`:

- Dashboard / Restaurant / Commandes

## Layout system

### `DashboardLayout`

Utilise `DashboardShell` pour assurer:

- la sidebar responsive
- le topbar
- le rendu `Outlet`
- l’intégration des breadcrumbs

### `PublicLayout`

Encapsule les pages publiques avec un conteneur `PageContainer` et un style global propre.

## Feature flags

Chaque feature flag est déclarée dans `src/config/featureFlags.ts`.

- `FeatureFlag.SETTINGS`
- `FeatureFlag.PREMIUM_ANALYTICS`
- `FeatureFlag.QR_CODES`
- `FeatureFlag.WORKSPACES`

Le hook `useFeatureFlag()` expose un accès memoized.

## Bonnes pratiques

- Utiliser `routes` constants plutôt que des chemins hardcodés
- Déclarer les permissions dans `routeDefinitions`
- Définir les breadcrumbs dès le route metadata
- Appeler `filterNavigationByPermissions()` dans la sidebar
- Garder les layouts séparés pour le code splitting
- Ne pas embriquer les guards dans le composant métier
