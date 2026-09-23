<script setup lang="ts">
import { CirclePause, Play } from 'lucide-vue-next'
import { useDashboardControls } from '../../composables/useDashboardControls'

const { resumeStream } = useDashboardControls()
</script>

<template>
  <div class="fixed inset-0 z-40 grid place-items-center bg-[#041010]/65 px-4 backdrop-blur-sm">
    <section class="shell-panel w-full max-w-md px-6 py-8 text-center shadow-[0_0_3rem_rgba(34,211,238,0.18)]">
      <div class="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-cyan-400 text-cyan-300">
        <CirclePause class="h-7 w-7" />
      </div>

      <h2 class="mt-6 font-mono text-3xl font-black uppercase tracking-[0.18em] text-cyan-50">
        Stream Paused
      </h2>

      <button
        type="button"
        class="shell-primary-button mt-6 w-full"
        @click="resumeStream"
      >
        <Play class="h-4 w-4" />
        Resume Real-Time Monitoring
      </button>
    </section>
  </div>
</template>