import { reactive } from 'vue'

import type { DashboardControls } from '../types/dashboard'

const controls = reactive<DashboardControls>({
  severity: 'all',
  attackType: 'all',
  timeRange: 'realtime',
  chartType: 'line',
  enabledDatasets: {
    traffic: true,
    threats: true,
    alerts: true,
  },
  showTooltips: true,
})

export const useDashboardControls = () => {
  const toggleDataset = (dataset: keyof DashboardControls['enabledDatasets']) => {
    controls.enabledDatasets[dataset] = !controls.enabledDatasets[dataset]
  }

  return {
    controls,
    toggleDataset,
  }
}
