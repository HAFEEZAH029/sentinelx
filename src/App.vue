<script setup lang="ts">
import {
  Activity,
  BarChart3,
} from 'lucide-vue-next'

import ActivityFeed from './components/dashboard/ActivityFeed.vue'
import DashboardHeader from './components/layout/DashboardHeader.vue'
import MetricsGrid from './components/metrics/MetricsGrid.vue'
import { useDashboardStream } from './composables/useDashboardStream'
import ThreatChart from './components/charts/ThreatChart.vue'
import { useDashboardControls } from './composables/useDashboardControls'
import TrafficChart from './components/charts/TrafficChart.vue'
import AttackCategoriesChart from './components/charts/AttackCategoriesChart.vue'
import PauseOverlay from './components/feedback/PauseOverlay.vue'
import { getTimeRangeStart } from './utils/timeRange'
import { computed } from 'vue'
import LoadingSkeleton from './components/feedback/LoadingSkeleton.vue'
import ConnectionOverlay from './components/feedback/ConnectionOverlay.vue'
import DisconnectedBanner from './components/feedback/DisconnectedBanner.vue'
import MalformedDataBanner from './components/feedback/MalformedDataBanner.vue'
import { useConnectionSimulation } from './composables/useConnectionSimulation'



/**const attackTypes: AttackType[] = [
  'Malware',
  'Phishing',
  'Brute Force',
  'DDoS',
  'SQL Injection',
]**/

const { controls } = useDashboardControls()

const chartSlots = ['Network Traffic Volume', 'Attack Categories']


const { chartPoints, latestEvents, isLoading, malformedCount, hasMalformedData } = useDashboardStream()

const visibleChartPoints = computed(() => {
  const rangeStart = getTimeRangeStart(controls.timeRange)

  return chartPoints.value.filter((point) => point.timestamp >= rangeStart)
})

useConnectionSimulation()

</script>

<template>
  <ConnectionOverlay v-if="controls.connectionStatus === 'reconnecting'" />
  <main class="min-h-screen overflow-hidden bg-[#d9d9d9] text-cyan-50 transition-colors duration-300" :class="controls.theme === 'light' ? 'theme-light bg-slate-100' : 'bg-[#d9d9d9]'">
    <section
      class="mx-auto min-h-screen w-full max-w-464 overflow-hidden border border-cyan-200/10 bg-[#071111]/95 shadow-2xl shadow-black/50 ring-1 ring-white/3 transition-colors duration-300"
      :class="
        controls.theme === 'light'
        ? 'border-slate-200 bg-slate-50 text-slate-950 shadow-slate-300/40 ring-slate-200'
        : 'border-cyan-200/10 bg-[#071111]/95 text-cyan-50 shadow-black/50 ring-white/3'
     "
    >
      <DashboardHeader />

      <DisconnectedBanner v-if="controls.connectionStatus === 'disconnected'" />

      <div v-if="isLoading" class="px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">
        <LoadingSkeleton />
      </div>

     <div
      v-else
      class="px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10"
     >

      <div class="px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10"
      :class="controls.connectionStatus === 'disconnected' ? 'pointer-events-none opacity-45 blur-[1px]' : ''"
      >

        <MalformedDataBanner
          v-if="hasMalformedData"
          :count="malformedCount"
          class="mb-5"
          @dismiss="hasMalformedData = false"
        />

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
              <TrafficChart
                v-if="slot === 'Network Traffic Volume'"
                :points="visibleChartPoints"
                :is-enabled="controls.enabledDatasets.traffic"
              />

              <AttackCategoriesChart
                v-else
                :events="latestEvents"
                :is-enabled="controls.enabledDatasets.threats"
              />
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
            <ThreatChart
              :points="visibleChartPoints"
              :is-enabled="controls.enabledDatasets.threats"
            />
          </div>
        </section>

        <ActivityFeed />
      </div>

     </div>

     <div
        v-if="controls.connectionStatus === 'disconnected'"
        class="fixed bottom-6 right-6 z-40 rounded-lg border border-slate-500/20 bg-slate-800/90 px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-slate-200 shadow-xl"
     >
        Last synchronized: {{ new Date().toLocaleTimeString() }}
     </div>

    </section>


    <PauseOverlay v-if="controls.isPaused" />
  </main>
</template>
