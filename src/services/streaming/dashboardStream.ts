import { interval, map, shareReplay } from 'rxjs'
import {
  generateChartPoint,
  generateMetricSnapshot,
  generateThreatEvent,
} from './mockGenerator'

export const metricsStream$ = interval(1400).pipe(
  map(() => generateMetricSnapshot()),
  shareReplay({ bufferSize: 1, refCount: true }),
)

export const threatEventsStream$ = interval(1800).pipe(
  map(() => generateThreatEvent()),
  shareReplay({ bufferSize: 1, refCount: true }),
)

export const chartPointsStream$ = interval(1200).pipe(
  map(() => generateChartPoint()),
  shareReplay({ bufferSize: 1, refCount: true }),
)