import { describe, it, expect } from 'vitest'
import { generateApiKey, cn } from '../utils'

describe('utils', () => {
  describe('generateApiKey', () => {
    it('should generate API key with correct prefix', () => {
      const apiKey = generateApiKey()
      expect(apiKey).toMatch(/^sk_live_/)
    })

    it('should generate API key with correct length', () => {
      const apiKey = generateApiKey()
      // sk_live_ (8 chars) + random part (up to 26 chars)
      expect(apiKey.length).toBeGreaterThan(20)
      expect(apiKey.length).toBeLessThanOrEqual(34)
    })

    it('should generate unique API keys', () => {
      const apiKey1 = generateApiKey()
      const apiKey2 = generateApiKey()
      const apiKey3 = generateApiKey()

      expect(apiKey1).not.toBe(apiKey2)
      expect(apiKey2).not.toBe(apiKey3)
      expect(apiKey1).not.toBe(apiKey3)
    })

    it('should only contain valid characters', () => {
      const apiKey = generateApiKey()
      // Should only contain alphanumeric characters and underscore
      expect(apiKey).toMatch(/^[a-z0-9_]+$/)
    })

    it('should have consistent structure', () => {
      const apiKeys = Array.from({ length: 10 }, () => generateApiKey())

      apiKeys.forEach(key => {
        expect(key).toMatch(/^sk_live_[a-z0-9]+$/)
        expect(key.startsWith('sk_live_')).toBe(true)
      })
    })
  })

  describe('cn', () => {
    it('should merge class names correctly', () => {
      const result = cn('class1', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const isHidden = false
      const result = cn('base', isActive && 'conditional', isHidden && 'hidden')
      expect(result).toBe('base conditional')
    })

    it('should handle empty inputs', () => {
      const result = cn()
      expect(result).toBe('')
    })
  })
})
