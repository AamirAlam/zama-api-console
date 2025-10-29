import { describe, it, expect } from 'vitest'
import {
  getDaysFromTimeFilter,
  getSyntheticStats,
  getFilteredChartData,
} from '../dataUtils'

describe('dataUtils Functions', () => {
  describe('getDaysFromTimeFilter', () => {
    it('should return correct days for different time filters', () => {
      expect(getDaysFromTimeFilter('24h')).toBe(1)
      expect(getDaysFromTimeFilter('7d')).toBe(7)
      expect(getDaysFromTimeFilter('30d')).toBe(20)
      expect(getDaysFromTimeFilter('90d')).toBe(29)
    })

    it('should return default 7 days for unknown filter', () => {
      expect(getDaysFromTimeFilter('unknown')).toBe(7)
      expect(getDaysFromTimeFilter('')).toBe(7)
    })
  })

  describe('getFilteredChartData', () => {
    it('should return filtered chart data based on time period', () => {
      const result24h = getFilteredChartData('24h')
      const result7d = getFilteredChartData('7d')

      expect(Array.isArray(result24h)).toBe(true)
      expect(Array.isArray(result7d)).toBe(true)
      expect(result24h.length).toBeLessThanOrEqual(result7d.length)

      // Check data structure
      if (result24h.length > 0) {
        expect(result24h[0]).toHaveProperty('date')
        expect(result24h[0]).toHaveProperty('requests')
        expect(typeof result24h[0].requests).toBe('number')
      }
    })
  })

  describe('getSyntheticStats', () => {
    it('should calculate stats correctly', () => {
      const stats = getSyntheticStats('7d')

      expect(typeof stats.totalRequests).toBe('number')
      expect(typeof stats.totalErrors).toBe('number')
      expect(typeof stats.averageErrorRate).toBe('number')
      expect(typeof stats.averageLatency).toBe('number')

      expect(stats.totalRequests).toBeGreaterThanOrEqual(0)
      expect(stats.totalErrors).toBeGreaterThanOrEqual(0)
      expect(stats.averageErrorRate).toBeGreaterThanOrEqual(0)
      expect(stats.averageLatency).toBeGreaterThanOrEqual(0)
    })

    it('should handle different time periods', () => {
      const stats24h = getSyntheticStats('24h')
      const stats7d = getSyntheticStats('7d')

      expect(stats24h.totalRequests).toBeLessThanOrEqual(stats7d.totalRequests)
      expect(stats24h.totalErrors).toBeLessThanOrEqual(stats7d.totalErrors)
    })
  })
})
