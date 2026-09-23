import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { ChartPoint, MetricSnapshot, ThreatEvent } from '../types/dashboard'
import {
  chartPointsStream$,
  metricsStream$,
  threatEventsStream$,
} from '../services/streaming/dashboardStream'
import type { Subscription } from 'rxjs'
import { useDashboardControls } from './useDashboardControls'
import { isValidThreatEvent } from '../utils/validators'


const MAX_EVENTS = 2_000
const MAX_CHART_POINTS = 3_000
const { controls } = useDashboardControls()
const malformedCount = ref(0)
const hasMalformedData = ref(false)

const shouldAcceptStreamData = () => (
  !controls.isPaused && controls.connectionStatus === 'connected'
)

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

  const latestEvents = computed(() => events.value)

  onMounted(() => {
    subscription = metricsStream$.subscribe((nextMetrics) => {
      if (!shouldAcceptStreamData()) return

      metrics.value = nextMetrics
      isLoading.value = false
    })

    subscription.add(
      threatEventsStream$.subscribe((event) => {
        if (!shouldAcceptStreamData()) return

        if (!isValidThreatEvent(event)) {
          malformedCount.value += 1
          hasMalformedData.value = true
          return
        }

        events.value = [event, ...events.value].slice(0, MAX_EVENTS)
      }),
    )

    subscription.add(
      chartPointsStream$.subscribe((point) => {
        if (!shouldAcceptStreamData()) return

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
    malformedCount,
    hasMalformedData,
  }
}
