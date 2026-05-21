export enum FeatureFlag {
  SETTINGS = 'settings',
  PREMIUM_ANALYTICS = 'premium_analytics',
  QR_CODES = 'qr_codes',
  WORKSPACES = 'workspaces'
}

export type FeatureFlagConfig = {
  label: string
  description: string
  enabled: boolean
  premium?: boolean
}

export const featureFlagConfig: Record<FeatureFlag, FeatureFlagConfig> = {
  [FeatureFlag.SETTINGS]: {
    label: 'Paramètres avancés',
    description: 'Activation des pages de configuration et des paramètres de boutique.',
    enabled: true,
    premium: true
  },
  [FeatureFlag.PREMIUM_ANALYTICS]: {
    label: 'Analytics premium',
    description: 'Affiche les widgets et rapports analytiques avancés.',
    enabled: true,
    premium: true
  },
  [FeatureFlag.QR_CODES]: {
    label: 'QR Codes avancés',
    description: 'Active la gestion étendue des QR codes et des campagnes.',
    enabled: true
  },
  [FeatureFlag.WORKSPACES]: {
    label: 'Workspaces',
    description: 'Améliore la navigation multi-tenant avec sélection de workspace.',
    enabled: true
  }
}

export function isFeatureFlagEnabled(flag: FeatureFlag): boolean {
  return featureFlagConfig[flag]?.enabled ?? false
}

export function getFeatureFlagLabel(flag: FeatureFlag): string {
  return featureFlagConfig[flag]?.label ?? flag
}
