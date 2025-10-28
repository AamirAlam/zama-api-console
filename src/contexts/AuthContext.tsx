import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthToken {
  access_token: string
  token_type: string
  expires_in: number
  expires_at: number
  user: User
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_KEY = 'zama_auth_token'

// Mock OIDC-style token generation
const generateMockToken = (): AuthToken => {
  const now = Date.now()
  const expiresIn = 3600 // 1 hour in seconds
  const expiresAt = now + expiresIn * 1000

  return {
    access_token: `mock_token_${Math.random().toString(36).substr(2, 9)}_${now}`,
    token_type: 'Bearer',
    expires_in: expiresIn,
    expires_at: expiresAt,
    user: {
      id: 'guest_user',
      email: 'guest@zama.ai',
      name: 'Guest User',
    },
  }
}

const isTokenValid = (token: AuthToken): boolean => {
  return Date.now() < token.expires_at
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    const checkExistingAuth = () => {
      try {
        const storedToken: string | null = localStorage.getItem(TOKEN_KEY)
        if (storedToken) {
          const token = JSON.parse(storedToken) as AuthToken
          if (isTokenValid(token)) {
            setUser(token.user)
          } else {
            // Token expired, remove it
            localStorage.removeItem(TOKEN_KEY)
          }
        }
      } catch (error) {
        console.error('Error checking existing auth:', error)
        localStorage.removeItem(TOKEN_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    checkExistingAuth()
  }, [])

  const login = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const token = generateMockToken()
      localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
      setUser(token.user)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = (): void => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
