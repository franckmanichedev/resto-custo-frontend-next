# Navigation Quickstart

## Présentation

Ce guide explique comment utiliser le système de navigation dynamique de FETCHOUN.

## 1. Importer les routes

Utilisez les constantes de `src/config/routes.ts` pour référencer les chemins.

```ts
import { routes } from '@/config/routes'

<Link to={routes.dashboard.branchOrders}>Commandes</Link>
```

## 2. Lister les items de navigation

La configuration se trouve dans `src/config/navigation.ts`.

```ts
import { navigation } from '@/config/navigation'
```

Chaque item a:

- `label`
- `path`
- `icon`
- `permissions`
- `featureFlag`
- `badge`
- `children`

## 3. Ajouter une route

1. Définissez le chemin dans `src/config/routes.ts`
2. Ajoutez la route metadata dans `routeDefinitions`
3. Ajoutez l’item dans `src/config/navigation.ts`
4. Ajoutez la route dans `src/app/router/index.tsx`

```ts
{
  key: 'branchKitchen',
  path: routes.dashboard.branchKitchen,
  title: 'Cuisine',
  description: 'Monitoring des tickets et préparation.',
  layout: 'dashboard',
  permissions: ['orders:update_status'],
  parentKey: 'branch',
  breadcrumbLabel: 'Cuisine'
}
```

## 4. Utiliser les guards

### ProtectedRoute

```tsx
<Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
  <Route path={routes.dashboard.root} element={<PlatformLayout />} />
</Route>
```

### GuestRoute

```tsx
<Route path={routes.auth.root} element={<GuestRoute><AuthLayout /></GuestRoute>}>
  <Route path="login" element={<LoginPage />} />
</Route>
```

### RoleGuard

```tsx
<RoleGuard roles={[RoleKey.ORGANIZATION_MANAGER]}>
  <ProtectedComponent />
</RoleGuard>
```

### PermissionGuard

```tsx
<PermissionGuard permissions={['restaurant:update']}>
  <AdminPanel />
</PermissionGuard>
```

### TenantGuard

```tsx
<TenantGuard requireOrganization requireBranch>
  <BranchDashboard />
</TenantGuard>
```

## 5. Générer des breadcrumbs

Le hook `useBreadcrumbs()` crée automatiquement une piste de navigation basée sur la route actuelle.

```tsx
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'

const crumbs = useBreadcrumbs()
```

## 6. Activer une feature flag

```tsx
import { useFeatureFlag } from '@/hooks/useFeatureFlag'
import { FeatureFlag } from '@/config/featureFlags'

const showSettings = useFeatureFlag(FeatureFlag.SETTINGS)
```

## 7. Exemple de sidebar dynamique

Le composant `AppSidebar` utilise:

- `filterNavigationByPermissions()`
- `navigation` config
- `SidebarItem` et `SidebarCollapse`
- support des badges et du collapsed state

## 8. Bonnes pratiques

- Ne jamais hardcoder des paths dans les composants
- Toujours utiliser `routes` et `navigation`
- Préférer les guards au rendu conditionnel dans les pages
- Conserver les layouts séparés pour la maintenance
- Déclarer les labels de breadcrumb dans les métadonnées de route
