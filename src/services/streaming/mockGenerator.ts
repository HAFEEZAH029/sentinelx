import type {
  AttackType,
  ChartPoint,
  DatasetKey,
  EventStatus,
  MetricSnapshot,
  Severity,
  ThreatEvent,
} from '../../types/dashboard'

const attackTypes: AttackType[] = [
  'DDoS',
  'SQL Injection',
  'Brute Force',
  'Phishing',
  'Malware',
]

const datasets: DatasetKey[] = ['threats', 'alerts']
const severities: Severity[] = ['critical', 'high', 'medium', 'low']

const statuses: EventStatus[] = ['blocked', 'investigating', 'resolved']

const countries = [
  'Germany',
  'Russia',
  'United States',
  'China',
  'Brazil',
  'Nigeria',
  'Canada',
  'India',
]

const targets = [
  'Auth Gateway',
  'Payment API',
  'Core Database',
  'CDN Edge',
  'User Service',
  'Admin Portal',
]

const randomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)]
}

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateIp = () => {
  return `${randomNumber(11, 255)}.${randomNumber(0, 255)}.${randomNumber(0, 255)}.${randomNumber(0, 255)}`
}

export const generateThreatEvent = (): ThreatEvent => {
  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    severity: randomItem(severities),
    attackType: randomItem(attackTypes),
    sourceIp: generateIp(),
    country: randomItem(countries),
    targetSystem: randomItem(targets),
    status: randomItem(statuses),
    dataset: randomItem(datasets),
  }
}

export const generateMetricSnapshot = (): MetricSnapshot => {
  return {
    activeThreats: randomNumber(12, 48),
    requestsPerSecond: randomNumber(8000, 18000),
    blockedAttacks: randomNumber(200, 1200),
    averageLatency: randomNumber(18, 70),
  }
}

export const generateChartPoint = (): ChartPoint => {
  return {
    timestamp: Date.now(),
    threats: randomNumber(10, 80),
    traffic: randomNumber(400, 1400),
    alerts: randomNumber(5, 40),
  }
}