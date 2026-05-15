import { reactive } from 'vue'

import type { DashboardControls } from '../types/dashboard'

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
    controls.isPaused = false
  }

  return {
    controls,
    toggleDataset,
    pauseStream,
    resumeStream,
  }
}
