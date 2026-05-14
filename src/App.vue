<script setup lang="ts">
const metricSlots = ['Active Threats', 'Requests / Sec', 'Blocked Attacks', 'Average Latency']
const chartSlots = ['Network Traffic Volume', 'Attack Categories']
</script>

<template>
  <main class="min-h-screen overflow-hidden text-cyan-50">
    <section class="min-h-screen w-full overflow-hidden border border-cyan-200/10 bg-[#071111]/90 shadow-2xl shadow-black/50 ring-1 ring-white/3">
      <nav class="flex flex-col gap-4 border-b border-cyan-200/10 bg-[#071111]/95 px-5 py-4 shadow-[0_1.25rem_3rem_rgba(0,0,0,0.28)] sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div class="flex flex-wrap items-center gap-4">
          <h1 class="text-4xl font-black leading-none tracking-normal text-cyan-50 sm:text-5xl">
            SentinelX
          </h1>

          <span class="inline-flex h-8 items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-300/[0.07] px-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em] text-emerald-200 shadow-[0_0_1.5rem_rgba(52,211,153,0.12)]">
            <span class="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0.9rem_rgba(52,211,153,0.95)]"></span>
            Connected
          </span>
        </div>

        <div class="flex items-center gap-2 self-start sm:self-auto">
          <button aria-label="Pause stream" class="shell-icon-button">
            <span class="font-mono text-[0.7rem]">||</span>
          </button>
          <button aria-label="Start stream" class="shell-icon-button">
            <span class="text-[0.7rem]">▷</span>
          </button>
          <button aria-label="Toggle theme" class="shell-icon-button ml-2">
            <span class="text-base">☾</span>
          </button>
        </div>
      </nav>

      <div class="px-5 py-8 sm:px-8 lg:px-8 lg:py-10">
        <header class="mb-7 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 class="max-w-full text-4xl font-black leading-tight tracking-normal text-cyan-50 sm:text-5xl">
              System Core
            </h2>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Real-time surveillance and defensive metrics across the perimeter.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3 lg:justify-end">
            <button class="shell-secondary-button">
              <span class="font-mono text-sm">≋</span>
              Controls
            </button>
            <button class="shell-primary-button">
              <span class="text-base">ϟ</span>
              Deploy Shield
            </button>
          </div>
        </header>

        <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="slot in metricSlots"
            :key="slot"
            class="shell-panel min-h-36 p-6"
          >
            <div class="flex items-start justify-between gap-3">
              <p class="shell-kicker">{{ slot }}</p>
              <span class="shell-live-dot">Live</span>
            </div>
            <div class="mt-9 h-8 w-28 rounded-full border border-cyan-300/10 bg-cyan-300/3"></div>
            <div class="mt-4 h-3 w-36 rounded-full bg-white/4"></div>
          </article>
        </section>

        <section class="mt-5 grid gap-5 lg:grid-cols-2">
          <article
            v-for="slot in chartSlots"
            :key="slot"
            class="shell-panel min-h-72 overflow-hidden"
          >
            <div class="flex items-center justify-between border-b border-cyan-200/5 bg-white/2.5 px-6 py-5">
              <p class="shell-section-title">{{ slot }}</p>
              <span class="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-slate-300/80">Ready</span>
            </div>
            <div class="grid h-52 place-items-center px-6">
              <div class="h-px w-full bg-linear-to-r from-transparent via-cyan-300/20 to-transparent"></div>
            </div>
          </article>
        </section>

        <section class="shell-panel mt-5 min-h-64 overflow-hidden">
          <div class="flex items-center justify-between border-b border-cyan-200/5 bg-white/2.5 px-6 py-5">
            <p class="shell-section-title">Threat Activity Profile</p>
            <span class="shell-live-dot">Live Monitor</span>
          </div>
          <div class="grid min-h-48 place-items-center px-6">
            <div class="h-px w-full bg-linear-to-r from-cyan-300/10 via-cyan-300/30 to-cyan-300/10"></div>
          </div>
        </section>

        <section class="shell-panel mt-5 min-h-80 overflow-hidden">
          <div class="flex items-center justify-between border-b border-cyan-200/5 bg-white/2.5 px-6 py-6">
            <h3 class="text-2xl font-black tracking-normal text-cyan-50">Live Activity Feed</h3>
            <div class="flex gap-2 text-xl text-slate-300">
              <button aria-label="Refresh feed" class="shell-icon-button">↻</button>
              <button aria-label="Feed options" class="shell-icon-button">⋮</button>
            </div>
          </div>
          <div class="grid min-h-56 place-items-center px-6">
            <div class="h-px w-full bg-linear-to-r from-transparent via-slate-400/20 to-transparent"></div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>
