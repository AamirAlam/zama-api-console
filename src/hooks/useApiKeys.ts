import { generateApiKey } from '@/lib/utils'
import { useState, useEffect } from 'react'

export interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed?: string
  status: 'active' | 'revoked'
}

const API_KEYS_STORAGE_KEY = 'apiKeys'

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOperating, setIsOperating] = useState(false)

  useEffect(() => {
    const loadApiKeys = () => {
      try {
        const stored = localStorage.getItem(API_KEYS_STORAGE_KEY)

        if (stored) {
          const parsed = JSON.parse(stored) as ApiKey[]
          if (parsed && Array.isArray(parsed)) {
            setApiKeys(parsed)
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading API keys:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadApiKeys()
  }, [])

  // update api keys in local storage when apiKeys changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(apiKeys))
    }
  }, [apiKeys, isLoading])

  // create new api key
  const createApiKey = async (name: string): Promise<ApiKey> => {
    if (!name.trim()) {
      throw new Error('API key name is required')
    }

    setIsOperating(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const newKey: ApiKey = {
        id: Date.now().toString(),
        name: name.trim(),
        key: generateApiKey(),
        created: new Date().toISOString().split('T')[0],
        status: 'active',
      }

      setApiKeys(prev => [...prev, newKey])
      return newKey
    } finally {
      setIsOperating(false)
    }
  }

  const regenerateKey = async (id: string): Promise<void> => {
    setIsOperating(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1200))

      setApiKeys(prev =>
        prev.map(key =>
          key.id === id
            ? {
                ...key,
                key: generateApiKey(),
                created: new Date().toISOString().split('T')[0],
              }
            : key
        )
      )
    } finally {
      setIsOperating(false)
    }
  }

  const revokeKey = async (id: string): Promise<void> => {
    setIsOperating(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 800))

      setApiKeys(prev =>
        prev.map(key =>
          key.id === id ? { ...key, status: 'revoked' as const } : key
        )
      )
    } finally {
      setIsOperating(false)
    }
  }

  const deleteKey = async (id: string): Promise<void> => {
    setIsOperating(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 600))

      setApiKeys(prev => prev.filter(key => key.id !== id))
    } finally {
      setIsOperating(false)
    }
  }

  const getApiKey = (id: string): ApiKey | undefined => {
    return apiKeys.find(key => key.id === id)
  }

  const getActiveApiKeys = (): ApiKey[] => {
    return apiKeys.filter(key => key.status === 'active')
  }

  const getRevokedApiKeys = (): ApiKey[] => {
    return apiKeys.filter(key => key.status === 'revoked')
  }

  return {
    apiKeys,
    isLoading,
    isOperating,
    createApiKey,
    regenerateKey,
    revokeKey,
    deleteKey,
    getApiKey,
    getActiveApiKeys,
    getRevokedApiKeys,
  }
}
