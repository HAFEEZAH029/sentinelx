
<script setup lang="ts">
import {
  CirclePause,
  Moon,
  Sun,
  SlidersHorizontal,
  Zap,
} from 'lucide-vue-next'
import { ref } from 'vue'

import ControlPanel from '../ui/ControlPanel.vue'
import { useDashboardControls } from '../../composables/useDashboardControls'

const isControlPanelOpen = ref(false)
const { controls, pauseStream, toggleTheme } = useDashboardControls()

</script>

<template>
  <nav
    class="flex items-center justify-between gap-3 border-b px-4 py-3 shadow-[0_1.25rem_3rem_rgba(0,0,0,0.28)] transition-colors duration-300 sm:px-6 lg:px-8"
    :class="
      controls.theme === 'light'
        ? 'border-slate-200 bg-white/90 shadow-slate-200/70'
        : 'border-cyan-200/10 bg-[#071111]/95 shadow-black/30'
    "
  >
    <div class="flex min-w-0 flex-wrap items-center gap-3 sm:gap-4">
      <h1 class="text-2xl font-black leading-none tracking-normal sm:text-4xl lg:text-5xl" :class="controls.theme === 'light' ? 'text-slate-950' : 'text-cyan-50'">
        SentinelX
      </h1>

      <span
        class="inline-flex h-6 items-center gap-2 rounded-full border px-2.5 font-mono text-[0.5rem] font-bold uppercase tracking-[0.18em] shadow-[0_0_1.5rem_rgba(52,211,153,0.12)] transition-colors duration-300 sm:h-8 sm:px-3 sm:text-[0.62rem]"
        :class="
          controls.theme === 'light'
            ? 'border-slate-950/10 bg-slate-950 text-emerald-200'
            : 'border-emerald-300/10 bg-emerald-300/[0.07] text-emerald-200'
        "
      >
        <span class="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0.9rem_rgba(52,211,153,0.95)]"></span>
        <span class="hidden sm:inline">System Secure /</span> Live
      </span>
    </div>

    <div class="flex shrink-0 items-center gap-2">
      <button
        aria-label="Pause stream"
        :disabled="controls.isPaused || controls.connectionStatus !== 'connected'"
        @click="pauseStream"
        class="shell-icon-button"
      >
        <CirclePause class="h-4 w-4" aria-hidden="true" />
      </button>

      <button
        :aria-label="
        controls.theme === 'dark'
        ? 'Switch to light mode'
        : 'Switch to dark mode'
        "
       class="shell-icon-button ml-2"
       @click="toggleTheme"
      >
        <Sun
          v-if="controls.theme === 'dark'"
          class="h-4 w-4"
          aria-hidden="true"
          />

        <Moon
          v-else
          class="h-4 w-4"
          aria-hidden="true"
        />
      </button>

    </div>
  </nav>

  <div class="px-4 pb-6 pt-6 sm:px-6 sm:pb-7 sm:pt-8 lg:px-8 lg:pt-10">
    <header class="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <h2 class="max-w-full text-3xl font-black leading-tight tracking-normal text-cyan-50 sm:text-4xl">
          System Core
        </h2>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-3 sm:text-base">
          Real-time surveillance and defensive metrics across the perimeter.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center md:justify-end">
        <button
          class="shell-secondary-button"
          type="button"
          :aria-expanded="isControlPanelOpen"
          aria-controls="dashboard-controls"
          @click="isControlPanelOpen = !isControlPanelOpen"
        >
          <SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
          Controls
        </button>
        <button class="shell-primary-button">
          <Zap class="h-4 w-4" aria-hidden="true" />
          Deploy Shield
        </button>
      </div>
    </header>

    <ControlPanel v-if="isControlPanelOpen" id="dashboard-controls" />
  </div>
</template>
