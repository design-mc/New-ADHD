import { ReactNode } from 'react'

export interface Question {
  id: number
  text: string
  options: string[]
  scores: {
    ADHD: number[]
    ADD: number[]
    Anxiety: number[]
    Depression: number[]
    Autism: number[]
  }
  insights?: {
    ADHD?: string
    ADD?: string
    Anxiety?: string
    Depression?: string
    Autism?: string
  }
}

export interface SurveyQuestion {
  id: number
  text: string
  options: string[]
  scores: {
    ADHD: number[]
    ADD: number[]
    Anxiety: number[]
    Depression: number[]
    Autism: number[]
  }
  insights?: {
    ADHD?: string
    ADD?: string
    Anxiety?: string
    Depression?: string
    Autism?: string
  }
}

export interface SurveyAnswers {
  [questionId: number]: number
}

export interface ResultDetail {
  riskLevel: 'Low' | 'Medium' | 'High'
  score: number
  insights: string[]
}

export interface DetailedResults {
  ADHD?: ResultDetail
  ADD?: ResultDetail
  Anxiety?: ResultDetail
  Depression?: ResultDetail
  Autism?: ResultDetail
}

export interface SurveyContextType {
  currentQuestionIndex: number
  answers: SurveyAnswers
  showResults: boolean
  results: DetailedResults
  goToNextQuestion: () => void
  goToPreviousQuestion: () => void
  handleAnswerChange: (questionId: number, answerIndex: number) => void
  submitSurvey: () => void
}

export interface ResultsProps {
  results: DetailedResults
}

// Memoization helper for performance optimization
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>()
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)!
    }
    
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}
