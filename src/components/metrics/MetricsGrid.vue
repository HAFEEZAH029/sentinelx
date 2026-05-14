<script setup lang="ts">
import { Activity, CircleCheck, Clock3, TrendingUp } from 'lucide-vue-next'
import { computed } from 'vue'
import type { Component } from 'vue'

import MetricCard from './MetricCard.vue'
import { useDashboardStream } from '../../composables/useDashboardStream'

type MetricTone = 'danger' | 'cyan' | 'success' | 'warning'

interface MetricItem {
  label: string
  value: string
  helper: string
  helperIcon: Component
  tone: MetricTone
}

const { metrics, isLoading } = useDashboardStream()

const metricItems = computed<MetricItem[]>(() => [
  {
    label: 'Active Threats',
    value: isLoading.value
      ? '--'
      : metrics.value.activeThreats.toString(),
    helper: '+12% vs last hour',
    helperIcon: TrendingUp,
    tone: 'danger',
  },
  {
    label: 'Requests / Sec',
    value: isLoading.value
      ? '--'
      : `${metrics.value.requestsPerSecond.toLocaleString()}`,
    helper: 'Optimal bandwidth',
    helperIcon: CircleCheck,
    tone: 'cyan',
  },
  {
    label: 'Blocked Attacks',
    value: isLoading.value
      ? '--'
      : metrics.value.blockedAttacks.toString(),
    helper: 'Last 24 hours',
    helperIcon: Clock3,
    tone: 'cyan',
  },
  {
    label: 'Average Latency',
    value: isLoading.value
      ? '--'
      : `${metrics.value.averageLatency}ms`,
    helper: 'Global average',
    helperIcon: Activity,
    tone: 'success',
  },
])
</script>

<template>
  <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <MetricCard
      v-for="metric in metricItems"
      :key="metric.label"
      :label="metric.label"
      :value="metric.value"
      :helper="metric.helper"
      :helper-icon="metric.helperIcon"
      :tone="metric.tone"
    />
  </section>
</template>
