export const SECURITY_CONFIG = {
  MAX_QUESTIONS: 10,
  MAX_ANSWER_INDEX: 10,
  TIMEOUT_MS: 30000, // 30 seconds max survey time
  RATE_LIMIT: {
    MAX_SUBMISSIONS: 3,
    WINDOW_MS: 60 * 60 * 1000 // 1 hour
  }
}

export const RISK_THRESHOLDS = {
  Low: 15,
  Medium: 30,
  High: 50,
}

export const CONDITION_WEIGHTS = {
  ADHD: 1.2,
  ADD: 1.1,
  Anxiety: 1.3,
  Depression: 1.2,
  Autism: 1.1
}

// Custom sanitization function without external library
export function sanitizeInput<T>(input: T): T {
  if (typeof input === 'string') {
    // Basic HTML tag removal and XSS prevention
    return input
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;') as T
  }
  
  if (typeof input === 'number') {
    return Math.max(0, Math.min(input, SECURITY_CONFIG.MAX_ANSWER_INDEX)) as T
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput) as T
  }
  
  if (typeof input === 'object' && input !== null) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        sanitizeInput(key), 
        sanitizeInput(value)
      ])
    ) as T
  }
  
  return input
}

export function validateSubmission(
  submissionCount: number, 
  lastSubmissionTime: number | null
): boolean {
  const now = Date.now()
  
  if (lastSubmissionTime && 
      now - lastSubmissionTime < SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS) {
    return submissionCount < SECURITY_CONFIG.RATE_LIMIT.MAX_SUBMISSIONS
  }
  
  return true
}
