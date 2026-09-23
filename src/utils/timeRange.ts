import type { TimeRange } from '../types/dashboard'

export const getTimeRangeStart = (timeRange: TimeRange) => {
  const now = Date.now()

  switch (timeRange) {
    case '1m':
      return now - 60_000
    case '5m':
      return now - 5 * 60_000
    case '1h':
      return now - 60 * 60_000
    case 'realtime':
      return now - 60_000
    default:
      return now - 60_000
  }
}