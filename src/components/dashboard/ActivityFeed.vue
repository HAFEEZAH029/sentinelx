<script setup lang="ts">
import { computed } from 'vue'
import { MoreVertical, RefreshCw } from 'lucide-vue-next'
import { useDashboardStream } from '../../composables/useDashboardStream'
import { useDashboardControls } from '../../composables/useDashboardControls'
import { getTimeRangeStart } from '../../utils/timeRange'


const { latestEvents } = useDashboardStream()
const { controls } = useDashboardControls()


const feedItems = computed(() =>
  latestEvents.value
    .filter((event) => {
      const matchesSeverity =
        controls.severity === 'all' || event.severity === controls.severity

      const matchesAttackType =
        controls.attackType === 'all' || event.attackType === controls.attackType

        const rangeStart = getTimeRangeStart(controls.timeRange)
        const matchesTimeRange = event.timestamp >= rangeStart

      const datasetEnabled = controls.enabledDatasets[event.dataset]

      return matchesSeverity && matchesAttackType && datasetEnabled && matchesTimeRange
    })
    .map((event) => ({
      id: event.id,
      time: new Date(event.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      severity: event.severity,
      type: event.attackType,
      source: event.sourceIp,
      target: event.targetSystem,
      status: event.status,
    })),
)

const severityClasses: Record<string, string> = {
  critical: 'border-rose-300/20 bg-rose-300/10 text-rose-200',
  high: 'border-orange-300/20 bg-orange-300/10 text-orange-200',
  medium: 'border-cyan-300/20 bg-cyan-300/10 text-cyan-200',
  low: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200',
}

const statusClasses: Record<string, string> = {
  blocked: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200',
  investigating: 'border-amber-300/20 bg-amber-300/10 text-amber-200',
  resolved: 'border-cyan-300/20 bg-cyan-300/10 text-cyan-200',
}
</script>

<template>
  <section class="shell-panel mt-5 min-h-80 overflow-hidden">
    <div class="flex items-center justify-between border-b border-cyan-200/5 bg-white/2.5 px-5 py-5 sm:px-6 sm:py-6">
      <h3 class="text-xl font-black tracking-normal text-cyan-50 sm:text-2xl">Live Activity Feed</h3>
      <div class="flex gap-2 text-xl text-slate-300">
        <button aria-label="Refresh feed" class="shell-icon-button">
          <RefreshCw class="h-4 w-4" aria-hidden="true" />
        </button>
        <button aria-label="Feed options" class="shell-icon-button">
          <MoreVertical class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div class="hidden overflow-x-auto md:block">
      <table class="w-full min-w-176 text-left">
        <thead class="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-400">
          <tr>
            <th class="px-6 py-4">Timestamp</th>
            <th class="px-6 py-4">Severity</th>
            <th class="px-6 py-4">Attack Type</th>
            <th class="px-6 py-4">Source & Target</th>
            <th class="px-6 py-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-cyan-200/5 text-sm text-slate-300">
          <tr v-for="item in feedItems" :key="item.id" class="bg-white/[0.012]">
            <td class="px-6 py-4 font-mono text-xs text-slate-400">{{ item.time }}</td>
            <td class="px-6 py-4">
              <span class="activity-pill" :class="severityClasses[item.severity]">
                {{ item.severity }}
              </span>
            </td>
            <td class="px-6 py-4 font-medium text-cyan-50">{{ item.type }}</td>
            <td class="px-6 py-4">
              <span class="block font-mono text-xs text-cyan-50">{{ item.source }} -> {{ item.target }}</span>
              <span class="text-xs text-slate-500">Monitored node / active perimeter</span>
            </td>
            <td class="px-6 py-4 text-right">
              <span class="activity-pill" :class="statusClasses[item.status]">
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="divide-y divide-cyan-200/5 md:hidden">
      <article
        v-for="item in feedItems"
        :key="`${item.id}-mobile`"
        class="grid gap-3 px-5 py-5"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="font-medium text-cyan-50">{{ item.type }}</p>
            <p class="mt-1 font-mono text-[0.65rem] text-slate-400">{{ item.time }}</p>
          </div>
          <span class="activity-pill" :class="severityClasses[item.severity]">
            {{ item.severity.toUpperCase()}}
          </span>
        </div>

        <p class="font-mono text-[0.7rem] leading-5 text-slate-400">
          {{ item.source }} -> {{ item.target }}
        </p>

        <span class="activity-pill w-fit" :class="statusClasses[item.status]">
          {{ item.status.toUpperCase() }}
        </span>
      </article>
    </div>

    <div
      v-if="feedItems.length === 0"
        class="grid min-h-44 place-items-center px-6 py-10 text-center"
    >
      <div>
        <p class="font-mono text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
          No Matching Activity
        </p>
        <p class="mt-2 max-w-sm text-sm text-slate-400">
          No events match the current filters. Adjust severity, attack type, time range, or dataset controls.
        </p>
      </div>
    </div>
    <div v-if="feedItems.length > 0" class="hidden overflow-x-auto md:block"></div>
    <div v-if="feedItems.length > 0" class="divide-y divide-cyan-200/5 md:hidden"></div>

  </section>
</template>
