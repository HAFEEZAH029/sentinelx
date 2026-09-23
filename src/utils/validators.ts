import type { ThreatEvent } from '../types/dashboard'

const severities = ['critical', 'high', 'medium', 'low']
const attackTypes = ['DDoS', 'SQL Injection', 'Brute Force', 'Phishing', 'Malware']
const statuses = ['blocked', 'investigating', 'resolved']
const datasets = ['threats', 'alerts']

export const isValidThreatEvent = (event: unknown): event is ThreatEvent => {
  if (!event || typeof event !== 'object') return false

  const candidate = event as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.timestamp === 'number' &&
    severities.includes(candidate.severity as string) &&
    attackTypes.includes(candidate.attackType as string) &&
    typeof candidate.sourceIp === 'string' &&
    typeof candidate.country === 'string' &&
    typeof candidate.targetSystem === 'string' &&
    statuses.includes(candidate.status as string) &&
    datasets.includes(candidate.dataset as string)
  )
}