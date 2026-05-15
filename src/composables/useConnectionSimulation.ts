import { onMounted, onUnmounted } from 'vue'
import { useDashboardControls } from './useDashboardControls'

export const useConnectionSimulation = () => {
  const { controls, disconnectStream, reconnectStream } = useDashboardControls()

  let intervalId: number | null = null
  let reconnectTimeout: number | null = null

  const isBrowserOnline = () => (
    typeof navigator === 'undefined' ? true : navigator.onLine
  )

  const handleOffline = () => {
    disconnectStream()
  }

  const handleOnline = () => {
    if (controls.connectionStatus === 'disconnected') {
      reconnectStream()
    }
  }

  const startSimulation = () => {
    intervalId = window.setInterval(() => {
      if (!isBrowserOnline() || controls.connectionStatus !== 'connected') return

      const shouldFail = Math.random() < 0.12

      if (!shouldFail) return

      controls.connectionStatus = 'reconnecting'

      reconnectTimeout = window.setTimeout(() => {
        reconnectTimeout = null

        if (!isBrowserOnline()) {
          controls.connectionStatus = 'disconnected'
          return
        }

        const reconnectSucceeded = Math.random() < 0.7

        if (reconnectSucceeded) {
          controls.connectionStatus = 'connected'
          return
        }

        controls.connectionStatus = 'disconnected'
      }, 2500)
    }, 18000)
  }

  onMounted(() => {
    if (!isBrowserOnline()) {
      disconnectStream()
    }

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)
    startSimulation()
  })

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
    if (reconnectTimeout) clearTimeout(reconnectTimeout)
    window.removeEventListener('offline', handleOffline)
    window.removeEventListener('online', handleOnline)
  })
}
