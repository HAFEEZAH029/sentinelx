import { interval, map, shareReplay, throttleTime } from 'rxjs'
import {
  generateChartPoint,
  generateMetricSnapshot,
  generateThreatEvent,
} from './mockGenerator'

const generateMalformedEvent = () => ({
  id: crypto.randomUUID(),
  timestamp: Date.now(),
  severity: 'unknown',
  attackType: null,
  sourceIp: 12345,
  country: '',
  targetSystem: 'Corrupted Node',
  status: 'failed',
  dataset: 'threats',
})

export const metricsStream$ = interval(1400).pipe(
  map(() => generateMetricSnapshot()),
  shareReplay({ bufferSize: 1, refCount: true }),
)

export const threatEventsStream$ = interval(1800).pipe(
  map(() => {
    const shouldGenerateBadPayload = Math.random() < 0.08

    return shouldGenerateBadPayload
      ? generateMalformedEvent()
      : generateThreatEvent()
  }),
  shareReplay({ bufferSize: 1, refCount: true }),
)

export const chartPointsStream$ = interval(700).pipe(
  map(() => generateChartPoint()),
  throttleTime(1000),
  shareReplay({ bufferSize: 1, refCount: true }),
)