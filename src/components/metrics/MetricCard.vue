<script setup lang="ts">
import type { Component } from 'vue'

type MetricTone = 'danger' | 'cyan' | 'success' | 'warning'

defineProps<{
  label: string
  value: string
  helper: string
  helperIcon: Component
  tone?: MetricTone
}>()

const toneClasses: Record<MetricTone, string> = {
  danger: 'text-rose-300',
  cyan: 'text-cyan-300',
  success: 'text-emerald-300',
  warning: 'text-amber-300',
}
</script>

<template>
  <article class="shell-panel min-h-34 p-5 sm:min-h-36 sm:p-6">
    <div class="flex items-start justify-between gap-3">
      <p class="shell-kicker">{{ label }}</p>
      <span class="shell-live-dot">Live</span>
    </div>

    <strong
      class="mt-7 block text-3xl font-black tracking-tight sm:mt-9 sm:text-4xl"
      :class="toneClasses[tone ?? 'cyan']"
    >
      {{ value }}
    </strong>

    <p class="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
      <component
        :is="helperIcon"
        class="h-3.5 w-3.5 shrink-0"
        :class="toneClasses[tone ?? 'cyan']"
        aria-hidden="true"
        :stroke-width="2.4"
      />
      {{ helper }}
    </p>
  </article>
</template>
