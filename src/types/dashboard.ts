export type Severity = 'critical' | 'high' | 'medium' | 'low'

export type AttackType =
  | 'DDoS'
  | 'SQL Injection'
  | 'Brute Force'
  | 'Phishing'
  | 'Malware'

export type EventStatus = 'blocked' | 'investigating' | 'resolved'

export type DatasetKey = 'traffic' | 'threats' | 'alerts'
export type ControlDatasetKey = DatasetKey

export type TimeRange = '1m' | '5m' | '1h' | 'realtime'

export type ChartType = 'line' | 'area' | 'bar'

export interface DashboardControls {
  severity: Severity | 'all'
  attackType: AttackType | 'all'
  timeRange: TimeRange
  chartType: ChartType
  connectionStatus: ConnectionStatus
  enabledDatasets: Record<ControlDatasetKey, boolean>
  showTooltips: boolean
  isPaused: boolean
  theme: 'dark' | 'light'
}

export type ConnectionStatus =
  | 'connected'
  | 'reconnecting'
  | 'disconnected'
  | 'degraded'

export interface ThreatEvent {
  id: string
  timestamp: number
  severity: Severity
  attackType: AttackType
  sourceIp: string
  country: string
  targetSystem: string
  status: EventStatus
  dataset: DatasetKey
}

export interface MetricSnapshot {
  activeThreats: number
  requestsPerSecond: number
  blockedAttacks: number
  averageLatency: number
}

export interface ChartPoint {
  timestamp: number
  threats: number
  traffic: number
  alerts: number
}
