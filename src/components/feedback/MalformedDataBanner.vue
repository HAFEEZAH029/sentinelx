<script setup lang="ts">
import { AlertTriangle, X } from 'lucide-vue-next'

defineProps<{
  count: number
}>()

defineEmits<{
  dismiss: []
}>()
</script>

<template>
  <div class="rounded-md border border-red-300/25 bg-red-950/50 px-4 py-3 text-red-100">
    <div class="flex items-start justify-between gap-4">
      <div class="flex gap-3">
        <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p class="font-mono text-xs font-black uppercase tracking-[0.14em]">
          Malformed data detected — {{ count }} payload rejected. Last valid dashboard state preserved.
        </p>
      </div>

      <button type="button" aria-label="Dismiss malformed data warning" @click="$emit('dismiss')">
        <X class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>