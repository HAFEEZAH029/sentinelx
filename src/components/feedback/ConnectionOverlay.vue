<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'
</script>

<template>
  <div class="fixed inset-0 z-40 bg-[#041010]/70 px-4 backdrop-blur-sm">
    <div class="mx-auto flex min-h-screen max-w-7xl items-start justify-center pt-36 sm:pt-44">
      <section class="shell-panel w-full max-w-xl px-6 py-8 text-center">
        <LoaderCircle class="mx-auto h-12 w-12 animate-spin text-cyan-300" />

        <h2 class="mt-6 font-mono text-sm font-black uppercase tracking-[0.22em] text-cyan-50">
          Attempting to re-establish secure uplink...
        </h2>

        <p class="mt-3 text-sm text-slate-400">
          Retry attempt 3 of 5. Next attempt in 2s.
        </p>

        <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button class="shell-secondary-button" type="button">
            View System Logs
          </button>

          <button class="shell-secondary-button" type="button">
            Manual Override
          </button>
        </div>
      </section>
    </div>
  </div>
</template>