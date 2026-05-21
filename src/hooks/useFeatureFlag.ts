import { useMemo } from 'react'
import { FeatureFlag, isFeatureFlagEnabled } from '@/config/featureFlags'

export function useFeatureFlag(flag: FeatureFlag) {
  return useMemo(() => isFeatureFlagEnabled(flag), [flag])
}
