import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { matchPath } from 'react-router-dom'
import { routeDefinitions, routeDefinitionsByKey, type RouteDefinition } from '@/config/routes'
import { routes } from '@/config/routes'

export type BreadcrumbItem = {
  label: string
  href: string
}

function buildHref(path: string, params: Record<string, string>): string {
  return Object.entries(params).reduce((resolved, [key, value]) => resolved.replace(`:${key}`, value), path)
}

function getMatchingRoute(pathname: string) {
  return routeDefinitions.find((route) => matchPath({ path: route.path, end: true }, pathname) !== null)
}

function getRouteParams(routePath: string, pathname: string): Record<string, string> {
  const match = matchPath({ path: routePath, end: true }, pathname)
  return (match?.params as Record<string, string>) ?? {}
}

function buildBreadcrumbTrail(routeKey: string, params: Record<string, string>): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = []
  let current: RouteDefinition | undefined = routeDefinitionsByKey[routeKey]

  while (current) {
    const label = typeof current.breadcrumbLabel === 'function' ? current.breadcrumbLabel(params) : current.breadcrumbLabel ?? current.title
    const href = buildHref(current.path, params)

    trail.unshift({ label, href })
    current = current.parentKey ? routeDefinitionsByKey[current.parentKey] : undefined
  }

  return trail
}

export function useBreadcrumbs() {
  const location = useLocation()

  return useMemo(() => {
    const route = getMatchingRoute(location.pathname)
    if (!route) {
      return [{ label: 'Dashboard', href: routes.dashboard.root }]
    }

    const params = getRouteParams(route.path, location.pathname)
    return buildBreadcrumbTrail(route.key, params)
  }, [location.pathname])
}
