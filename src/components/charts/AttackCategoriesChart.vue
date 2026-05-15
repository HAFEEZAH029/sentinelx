<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { init } from 'echarts/core'
import type { ECharts, EChartsCoreOption } from 'echarts/core'

import { useDashboardControls } from '../../composables/useDashboardControls'
import type { ThreatEvent } from '../../types/dashboard'

const props = defineProps<{
  events: ThreatEvent[]
  isEnabled: boolean
}>()

const { controls } = useDashboardControls()

const chartElement = ref<HTMLDivElement | null>(null)

let chart: ECharts | null = null
let resizeObserver: ResizeObserver | null = null

const chartOption = computed<EChartsCoreOption>(() => {
  const categories = [
    'Malware',
    'Phishing',
    'Brute Force',
    'DDoS',
    'SQL Injection',
  ]

  const counts = categories.map(
    (category) =>
      props.events.filter((event) => event.attackType === category).length,
  )

  return {
    backgroundColor: 'transparent',

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
      data: ['Malware', 'Phishing', 'Brute', 'DDoS', 'SQLi'],
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
        show: false,
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
        data: counts,
        type: 'bar',

        itemStyle: {
          color: '#22d3ee',
          borderRadius: [6, 6, 0, 0],
        },

        emphasis: {
          itemStyle: {
            color: '#67e8f9',
          },
        },

        barMaxWidth: 28,
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
    Enable the threats dataset to restore this chart.
  </div>

  <div
    v-else
    ref="chartElement"
    class="h-52 min-h-52 w-full min-w-0"
    role="img"
    aria-label="Attack categories chart"
  ></div>
</template>