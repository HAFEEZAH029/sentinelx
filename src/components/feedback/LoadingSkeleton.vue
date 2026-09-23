<template>
  <div
    class="animate-pulse space-y-5"
    aria-label="Loading dashboard"
    role="status"
  >
    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="index in 4"
        :key="index"
        class="shell-panel h-36 bg-white/2 p-5"
      >
        <div class="h-3 w-14 rounded bg-white/5"></div>
        <div class="mt-10 h-10 w-32 rounded bg-white/5"></div>
        <div class="mt-4 h-3 w-24 rounded bg-white/5"></div>
      </div>
    </section>

    <section class="grid gap-5 lg:grid-cols-2">
      <div class="shell-panel h-72 bg-white/2 p-5">
        <div class="h-3 w-40 rounded bg-white/5"></div>

        <div class="mt-8 flex h-48 items-end gap-3">
          <div
            v-for="index in 8"
            :key="index"
            class="w-full rounded-t-md bg-white/5"
            :style="{ height: `${40 + (index % 4) * 28}px` }"
          ></div>
        </div>
      </div>

      <div class="shell-panel h-72 bg-white/2 p-5">
        <div class="h-3 w-32 rounded bg-white/5"></div>

        <div class="mt-8 space-y-5">
          <div
            v-for="index in 5"
            :key="index"
            class="space-y-3"
          >
            <div class="h-3 w-full rounded bg-white/5"></div>
            <div class="h-3 w-3/4 rounded bg-white/5"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="shell-panel h-80 bg-white/2 p-5">
      <div class="h-3 w-44 rounded bg-white/5"></div>

      <div class="mt-8 h-56 rounded bg-white/4"></div>
    </section>
  </div>
</template>