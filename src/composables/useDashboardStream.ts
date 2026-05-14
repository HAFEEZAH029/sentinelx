import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { ChartPoint, MetricSnapshot, ThreatEvent } from '../types/dashboard'
import {
  chartPointsStream$,
  metricsStream$,
  threatEventsStream$,
} from '../services/streaming/dashboardStream'
import type { Subscription } from 'rxjs'

const MAX_EVENTS = 8
const MAX_CHART_POINTS = 24

export const useDashboardStream = () => {
  const metrics = ref<MetricSnapshot>({
    activeThreats: 0,
    requestsPerSecond: 0,
    blockedAttacks: 0,
    averageLatency: 0,
  })

  const events = ref<ThreatEvent[]>([])
  const chartPoints = ref<ChartPoint[]>([])
  const isLoading = ref(true)

  let subscription: Subscription | null = null

  const latestEvents = computed(() => events.value.slice(0, MAX_EVENTS))

  onMounted(() => {
    subscription = metricsStream$.subscribe((nextMetrics) => {
      metrics.value = nextMetrics
      isLoading.value = false
    })

    subscription.add(
      threatEventsStream$.subscribe((event) => {
        events.value = [event, ...events.value].slice(0, MAX_EVENTS)
      }),
    )

    subscription.add(
      chartPointsStream$.subscribe((point) => {
        chartPoints.value = [...chartPoints.value, point].slice(-MAX_CHART_POINTS)
      }),
    )
  })

  onUnmounted(() => {
    subscription?.unsubscribe()
  })

  return {
    metrics,
    latestEvents,
    chartPoints,
    isLoading,
  }
}