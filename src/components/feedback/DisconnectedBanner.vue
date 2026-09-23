<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import { useDashboardControls } from '../../composables/useDashboardControls'

const { reconnectStream } = useDashboardControls()
</script>

<template>
  <div class="sticky top-0 z-50 border-y border-red-400/30 bg-red-700/90 px-4 py-3 shadow-lg shadow-red-950/30">
    <div class="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-3">
        <AlertCircle class="h-5 w-5 text-red-100" aria-hidden="true" />

        <p class="font-mono text-xs font-black uppercase tracking-[0.18em] text-red-50">
          System Offline: Connection Lost
        </p>
      </div>

      <button
        type="button"
        class="rounded bg-red-50 px-4 py-2 font-mono text-[0.68rem] font-black uppercase tracking-[0.12em] text-red-700 transition hover:bg-white"
        @click="reconnectStream"
      >
        Reconnect
      </button>
    </div>
  </div>
</template>