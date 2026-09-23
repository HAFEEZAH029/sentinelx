<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

import { useDashboardControls } from '../../composables/useDashboardControls'
import type { AttackType, ChartType, Severity, TimeRange } from '../../types/dashboard'

const { controls, toggleDataset } = useDashboardControls()

const severities: Array<Severity | 'all'> = ['all', 'low', 'medium', 'high', 'critical']

const attackTypes: Array<{ label: string; value: AttackType | 'all' }> = [
  { label: 'All Types', value: 'all' },
  { label: 'Malware', value: 'Malware' },
  { label: 'Phishing', value: 'Phishing' },
  { label: 'Brute Force', value: 'Brute Force' },
  { label: 'SQLi', value: 'SQL Injection' },
  { label: 'DDoS', value: 'DDoS' },
]

const timeRanges: Array<{ label: string; value: TimeRange }> = [
  { label: 'Last 1 min', value: '1m' },
  { label: 'Last 5 mins', value: '5m' },
  { label: 'Last 1 hour', value: '1h' },
  { label: 'Real-time mode', value: 'realtime' },
]

const chartTypes: ChartType[] = ['line', 'area', 'bar']

const datasetOptions = [
  { label: 'Traffic', value: 'traffic' },
  { label: 'Threats', value: 'threats' },
  { label: 'Alerts', value: 'alerts' },
] as const
</script>

<template>
  <section class="shell-panel mt-4 overflow-hidden p-4 sm:p-5">
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <div class="control-field">
        <p class="control-label">Severity</p>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="severity in severities"
            :key="severity"
            type="button"
            class="control-chip"
            :class="controls.severity === severity ? 'control-chip-active' : 'control-chip-muted'"
            @click="controls.severity = severity"
          >
            {{ severity }}
          </button>
        </div>
      </div>

      <label class="control-field">
        <span class="control-label">Attack Type</span>
        <span class="control-select-wrap">
          <select v-model="controls.attackType" class="control-select">
            <option
              v-for="attackType in attackTypes"
              :key="attackType.value"
              :value="attackType.value"
            >
              {{ attackType.label }}
            </option>
          </select>
          <ChevronDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </span>
      </label>

      <label class="control-field">
        <span class="control-label">Time Range</span>
        <span class="control-select-wrap">
          <select v-model="controls.timeRange" class="control-select">
            <option
              v-for="timeRange in timeRanges"
              :key="timeRange.value"
              :value="timeRange.value"
            >
              {{ timeRange.label }}
            </option>
          </select>
          <ChevronDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </span>
      </label>

      <div class="control-field">
        <p class="control-label">Datasets</p>
        <div class="grid gap-1.5">
          <label
            v-for="dataset in datasetOptions"
            :key="dataset.value"
            class="inline-flex items-center gap-2 font-mono text-[0.64rem] font-bold uppercase tracking-[0.12em] text-slate-300"
          >
            <input
              type="checkbox"
              class="h-3.5 w-3.5 accent-cyan-400"
              :checked="controls.enabledDatasets[dataset.value]"
              @change="toggleDataset(dataset.value)"
            />
            {{ dataset.label }}
          </label>
        </div>
      </div>

      <div class="control-field">
        <p class="control-label">Chart Type</p>
        <div class="grid grid-cols-3 overflow-hidden rounded-sm border border-cyan-200/5 bg-white/[0.035]">
          <button
            v-for="chartType in chartTypes"
            :key="chartType"
            type="button"
            class="h-6 px-2 font-mono text-[0.54rem] font-black uppercase tracking-[0.08em] transition sm:h-7"
            :class="controls.chartType === chartType ? 'bg-cyan-100/18 text-cyan-50' : 'text-slate-500 hover:text-slate-300'"
            @click="controls.chartType = chartType"
          >
            {{ chartType }}
          </button>
        </div>
      </div>

      <div class="control-field">
        <p class="control-label">Inspection</p>
        <label class="inline-flex items-center gap-3">
          <button
            type="button"
            class="relative h-5 w-10 rounded-full border border-cyan-300/15 transition"
            :class="controls.showTooltips ? 'bg-cyan-400/80' : 'bg-white/6'"
            role="switch"
            :aria-checked="controls.showTooltips"
            @click="controls.showTooltips = !controls.showTooltips"
          >
            <span
              class="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-cyan-50 transition"
              :class="controls.showTooltips ? 'left-5' : 'left-1'"
            ></span>
          </button>
          <span class="font-mono text-[0.64rem] font-bold uppercase tracking-[0.12em] text-slate-300">
            Tooltips
          </span>
        </label>
      </div>
    </div>
  </section>
</template>
