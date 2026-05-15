import { reactive } from 'vue'

import type { DashboardControls } from '../types/dashboard'

let reconnectTimeout: number | null = null

const controls = reactive<DashboardControls>({
  severity: 'all',
  attackType: 'all',
  timeRange: 'realtime',
  chartType: 'line',
  connectionStatus: 'connected',
  enabledDatasets: {
    traffic: true,
    threats: true,
    alerts: true,
  },
  theme: 'dark',
  showTooltips: true,
  isPaused: false,
})

export const useDashboardControls = () => {
  const toggleDataset = (dataset: keyof DashboardControls['enabledDatasets']) => {
    controls.enabledDatasets[dataset] = !controls.enabledDatasets[dataset]
  }

  const pauseStream = () => {
    controls.isPaused = true
  }

  const resumeStream = () => {
    if (controls.connectionStatus !== 'connected') return

    controls.isPaused = false
  }

  const disconnectStream = () => {
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout)
      reconnectTimeout = null
    }

    controls.connectionStatus = 'disconnected'
  }

  const reconnectStream = () => {
    if (controls.connectionStatus === 'reconnecting') return

    controls.connectionStatus = 'reconnecting'

    reconnectTimeout = window.setTimeout(() => {
      reconnectTimeout = null

      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        controls.connectionStatus = 'disconnected'
        return
      }

      controls.connectionStatus = 'connected'
    }, 1800)
  }

  const toggleTheme = () => {
    controls.theme = controls.theme === 'dark' ? 'light' : 'dark'
  }

  return {
    controls,
    toggleTheme,
    toggleDataset,
    pauseStream,
    resumeStream,
    disconnectStream,
    reconnectStream,
  }
}
