<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { init } from 'echarts/core'
import type { ECharts, EChartsCoreOption } from 'echarts/core'

import { useDashboardControls } from '../../composables/useDashboardControls'
import type { ChartPoint } from '../../types/dashboard'

const props = defineProps<{
  points: ChartPoint[]
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

  const threatData = visiblePoints.value.map((point) => point.threats)

  return {
    backgroundColor: 'transparent',
    animation: true,
    animationDuration: 450,
    animationEasing: 'cubicOut',
    animationDurationUpdate: 450,
    animationEasingUpdate: 'cubicOut',
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
      boundaryGap: controls.chartType === 'bar',
      axisLine: {
        show: true,
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
        show: true,
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.26)',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
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
        name: 'Threats',
        data: threatData,
        type: controls.chartType === 'area' ? 'line' : controls.chartType,
        smooth: controls.chartType !== 'bar',
        showSymbol: controls.chartType !== 'bar',
        symbolSize: 5,
        areaStyle:
          controls.chartType === 'area'
            ? {
                color: 'rgba(34, 211, 238, 0.2)',
              }
            : undefined,
        itemStyle: {
          color: '#22d3ee',
        },
        lineStyle: {
          width: 3,
          color: '#22d3ee',
        },
        barMaxWidth: 22,
      },
    ],
  }
})

const renderChart = () => {
  if (!chart) return

  chart.setOption(chartOption.value, true)
}

onMounted(async () => {
  await nextTick()

  if (!chartElement.value) return

  chart = init(chartElement.value)
  renderChart()

  resizeObserver = new ResizeObserver(() => {
    chart?.resize()
  })
  resizeObserver.observe(chartElement.value)
})

watch(chartOption, renderChart, { deep: true })

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  chart?.dispose()
  chart = null
})
</script>

<template>
  <div
    ref="chartElement"
    class="h-56 min-h-56 w-full min-w-0"
    role="img"
    aria-label="Threat activity profile chart"
  ></div>
</template>
