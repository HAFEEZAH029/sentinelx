<script setup lang="ts">
import {
  Activity,
  BarChart3,
  Plus,
} from 'lucide-vue-next'

import ActivityFeed from './components/dashboard/ActivityFeed.vue'
import DashboardHeader from './components/layout/DashboardHeader.vue'
import MetricsGrid from './components/metrics/MetricsGrid.vue'
import { computed } from 'vue'
import { useDashboardStream } from './composables/useDashboardStream'
import type { AttackType } from './types/dashboard'
import ThreatChart from './components/charts/ThreatChart.vue'



const attackTypes: AttackType[] = [
  'Malware',
  'Phishing',
  'Brute Force',
  'DDoS',
  'SQL Injection',
]

const chartSlots = ['Network Traffic Volume', 'Attack Categories']

const attackBars = computed(() => {
  const counts = attackTypes.map((type) => {
    const count = latestEvents.value.filter((event) => event.attackType === type).length

    return {
      label: type === 'SQL Injection' ? 'SQLi' : type === 'Brute Force' ? 'Brute' : type,
      count,
    }
  })

  const maxCount = Math.max(...counts.map((item) => item.count), 1)

  return counts.map((item) => ({
    ...item,
    height: `${Math.max((item.count / maxCount) * 100, 8)}%`,
  }))
})

const { chartPoints, latestEvents } = useDashboardStream()

/**const threatPoints = computed(() => {
  if (!chartPoints.value.length) {
    return '0,95 78,82 150,90 232,52 314,70 392,28 468,48 540,18'
  }

  const width = 540
  const height = 120
  const maxThreats = Math.max(...chartPoints.value.map((point) => point.threats), 1)

  return chartPoints.value
    .map((point, index) => {
      const x =
        chartPoints.value.length === 1
          ? 0
          : (index / (chartPoints.value.length - 1)) * width

      const y = height - (point.threats / maxThreats) * height

      return `${x},${y}`
    })
    .join(' ')
}) **/

const trafficPoints = computed(() => {
  if (!chartPoints.value.length) {
    return '0,155 72,112 132,82 192,104 252,48 320,76 382,18 446,40 520,0'
  }

  const width = 520
  const height = 170
  const maxTraffic = Math.max(...chartPoints.value.map((point) => point.traffic), 1)

  return chartPoints.value
    .map((point, index) => {
      const x =
        chartPoints.value.length === 1
          ? 0
          : (index / (chartPoints.value.length - 1)) * width

      const y = height - (point.traffic / maxTraffic) * height

      return `${x},${y}`
    })
    .join(' ')
})


</script>

<template>
  <main class="min-h-screen overflow-hidden bg-[#d9d9d9] text-cyan-50">
    <section
      class="mx-auto min-h-screen w-full max-w-464 overflow-hidden border border-cyan-200/10 bg-[#071111]/95 shadow-2xl shadow-black/50 ring-1 ring-white/3"
    >
      <DashboardHeader />

      <div class="px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">
        <MetricsGrid />

        <section class="mt-5 grid gap-5 lg:grid-cols-2">
          <article
            v-for="slot in chartSlots"
            :key="slot"
            class="shell-panel min-h-72 overflow-hidden"
          >
            <div class="flex items-center justify-between border-b border-cyan-200/5 bg-white/2.5 px-5 py-5 sm:px-6">
              <p class="shell-section-title inline-flex items-center gap-2">
                <BarChart3 class="h-4 w-4" aria-hidden="true" />
                {{ slot }}
              </p>
              <span class="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-slate-300/80">
                {{ slot === 'Network Traffic Volume' ? 'GB/s' : 'Incidents' }}
              </span>
            </div>

            <div class="h-52 px-5 py-5">
              <svg
                v-if="slot === 'Network Traffic Volume'"
                viewBox="0 0 520 170"
                class="h-full w-full overflow-visible"
                role="img"
                aria-label="Network traffic volume trend"
              >
                <defs>
                  <linearGradient id="trafficFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.54" />
                    <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.02" />
                  </linearGradient>
                </defs>
                <path :d="`M ${trafficPoints} L 520,170 L 0,170 Z`" fill="url(#trafficFill)" />
                <polyline :points="trafficPoints" fill="none" stroke="#06dff3" stroke-width="3" />
              </svg>

              <div v-else class="flex h-full items-end justify-between gap-4 px-1 sm:px-6">
                <div
                  v-for="bar in attackBars"
                  :key="bar.label"
                  class="flex h-full min-w-0 flex-1 flex-col justify-end gap-3"
                >
                  <div
                    class="rounded-t-md bg-cyan-400 shadow-[0_0_1.8rem_rgba(34,211,238,0.24)]"
                    :style="{ height: bar.height }"
                  ></div>
                  <span class="truncate text-center font-mono text-[0.58rem] text-slate-400">
                    {{ bar.label }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section class="shell-panel mt-5 min-h-64 overflow-hidden">
          <div class="flex items-center justify-between border-b border-cyan-200/5 bg-white/2.5 px-5 py-5 sm:px-6">
            <p class="shell-section-title inline-flex items-center gap-2">
              <Activity class="h-4 w-4" aria-hidden="true" />
              Threat Activity Profile
            </p>
            <span class="shell-live-dot">Live Monitor</span>
          </div>
          <div class="min-h-48 px-5 py-5">
            <p class="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-400">
              Threat activity over time
            </p>
            <ThreatChart :points="chartPoints" />
          </div>
        </section>

        <ActivityFeed />
      </div>

      <button
        aria-label="Create alert"
        class="fixed bottom-6 right-6 z-20 grid h-13 w-13 place-items-center rounded-full bg-cyan-400 text-slate-950 shadow-[0_0_2rem_rgba(34,211,238,0.55)] transition hover:scale-105 sm:h-14 sm:w-14"
      >
        <Plus class="h-6 w-6" aria-hidden="true" />
      </button>
    </section>
  </main>
</template>
