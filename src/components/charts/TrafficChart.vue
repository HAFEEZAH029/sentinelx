<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { init } from 'echarts/core'
import type { ECharts, EChartsCoreOption } from 'echarts/core'

import { useDashboardControls } from '../../composables/useDashboardControls'
import type { ChartPoint } from '../../types/dashboard'

const props = defineProps<{
  points: ChartPoint[]
  isEnabled: boolean
}>()

const { controls } = useDashboardControls()

const chartElement = ref<HTMLDivElement | null>(null)
let chart: ECharts | null = null
let resizeObserver: ResizeObserver | null = null

const fallbackPoints: ChartPoint[] = [
  { timestamp: Date.now() - 60000, threats: 18, traffic: 420, alerts: 8 },
  { timestamp: Date.now() - 48000, threats: 31, traffic: 520, alerts: 12 },
  { timestamp: Date.now() - 36000, threats: 24, traffic: 610, alerts: 10 },
  { timestamp: Date.now() - 24000, threats: 46, traffic: 780, alerts: 18 },
  { timestamp: Date.now() - 12000, threats: 38, traffic: 690, alerts: 14 },
  { timestamp: Date.now(), threats: 55, traffic: 880, alerts: 22 },
]

const visiblePoints = computed(() => (props.points.length ? props.points : fallbackPoints))

const chartOption = computed<EChartsCoreOption>(() => {
  const timestamps = visiblePoints.value.map((point) =>
    new Date(point.timestamp).toLocaleTimeString([], {
      minute: '2-digit',
      second: '2-digit',
    }),
  )

  const trafficData = visiblePoints.value.map((point) => point.traffic)

  return {
    backgroundColor: 'transparent',
    animation: true,
    animationDurationUpdate: 450,
    tooltip: {
      show: controls.showTooltips,
      trigger: 'axis',
      backgroundColor: 'rgba(7, 17, 17, 0.92)',
      borderColor: 'rgba(34, 211, 238, 0.24)',
      textStyle: {
        color: '#e2e8f0',
        fontSize: 11,
      },
    },
    grid: {
      left: 18,
      right: 16,
      top: 16,
      bottom: 28,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: timestamps,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.26)',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 10,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.26)',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.08)',
        },
      },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 10,
      },
    },
    series: [
      {
        name: 'Traffic',
        data: trafficData,
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: {
          color: 'rgba(34, 211, 238, 0.18)',
        },
        itemStyle: {
          color: '#22d3ee',
        },
        lineStyle: {
          width: 3,
          color: '#22d3ee',
        },
      },
    ],
  }
})

const renderChart = () => {
  if (!chart) return
  chart.setOption(chartOption.value, true)
}

const ensureChart = async () => {
  await nextTick()

  if (!props.isEnabled || !chartElement.value) return

  if (chart) {
    renderChart()
    chart.resize()
    return
  }

  chart = init(chartElement.value)
  renderChart()

  resizeObserver = new ResizeObserver(() => {
    chart?.resize()
  })

  resizeObserver.observe(chartElement.value)
}

const destroyChart = () => {
  resizeObserver?.disconnect()
  resizeObserver = null
  chart?.dispose()
  chart = null
}

onMounted(() => {
  ensureChart()
})

watch(chartOption, renderChart, { deep: true })

watch(
  () => props.isEnabled,
  (isEnabled) => {
    if (isEnabled) {
      ensureChart()
      return
    }

    destroyChart()
  },
)

onBeforeUnmount(() => {
  destroyChart()
})
</script>

<template>
  <div
    v-if="!isEnabled"
    class="grid h-52 place-items-center text-center text-sm text-slate-400"
  >
    Enable the traffic dataset to restore this chart.
  </div>

  <div
    v-else
    ref="chartElement"
    class="h-52 min-h-52 w-full min-w-0"
    role="img"
    aria-label="Network traffic volume chart"
  ></div>
</template>