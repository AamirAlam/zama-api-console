import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export interface FeatureFlags {
  chartV2: boolean
  modernColors: boolean
}

interface FeatureFlagsContextType {
  flags: FeatureFlags
  toggleFlag: (flag: keyof FeatureFlags) => void
  resetFlags: () => void
}

const defaultFlags: FeatureFlags = {
  chartV2: false,
  modernColors: false,
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(
  undefined
)

export function FeatureFlagsProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags)

  const toggleFlag = (flag: keyof FeatureFlags) => {
    setFlags(prev => ({
      ...prev,
      [flag]: !prev[flag],
    }))
  }

  const resetFlags = () => {
    setFlags(defaultFlags)
  }

  return (
    <FeatureFlagsContext.Provider value={{ flags, toggleFlag, resetFlags }}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext)
  if (context === undefined) {
    throw new Error(
      'useFeatureFlags must be used within a FeatureFlagsProvider'
    )
  }
  return context
}
