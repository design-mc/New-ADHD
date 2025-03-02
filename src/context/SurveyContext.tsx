import React, { 
  createContext, 
  useState, 
  useContext, 
  useMemo, 
  useCallback 
} from 'react'
import { 
  SurveyContextType, 
  SurveyAnswers, 
  DetailedResults 
} from '../types'
import surveyQuestions from '../data/surveyQuestions.json'
import { 
  sanitizeInput, 
  RISK_THRESHOLDS, 
  CONDITION_WEIGHTS 
} from '../utils/security'

// Create the context with a default value
const SurveyContext = createContext<SurveyContextType | undefined>(undefined)

// Provider component
export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<SurveyAnswers>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<DetailedResults>({})

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }, [currentQuestionIndex])

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }, [currentQuestionIndex])

  const handleAnswerChange = useCallback((questionId: number, answerIndex: number) => {
    const sanitizedAnswerIndex = sanitizeInput(answerIndex)
    setAnswers(prev => ({
      ...prev,
      [questionId]: sanitizedAnswerIndex
    }))
  }, [])

  const calculateConditionScore = useCallback((condition: string) => {
    return Object.entries(answers).reduce((total, [questionId, answerIndex]) => {
      const question = surveyQuestions.find(q => q.id === Number(questionId))
      if (question && question.scores[condition]) {
        const score = question.scores[condition][answerIndex] || 0
        return total + (score * (CONDITION_WEIGHTS[condition] || 1))
      }
      return total
    }, 0)
  }, [answers])

  const determineRiskLevel = useCallback((score: number) => {
    if (score <= RISK_THRESHOLDS.Low) return 'Low'
    if (score <= RISK_THRESHOLDS.Medium) return 'Medium'
    return 'High'
  }, [])

  const submitSurvey = useCallback(() => {
    const conditions = ['ADHD', 'ADD', 'Anxiety', 'Depression', 'Autism']
    
    const detailedResults: DetailedResults = conditions.reduce((acc, condition) => {
      const score = calculateConditionScore(condition)
      const riskLevel = determineRiskLevel(score)
      
      const insights = surveyQuestions
        .filter(q => 
          q.insights && q.insights[condition] && 
          answers[q.id] !== undefined && 
          q.scores[condition][answers[q.id]] > 0
        )
        .map(q => q.insights[condition] || '')
        .filter(Boolean)

      acc[condition] = {
        score,
        riskLevel,
        insights
      }

      return acc
    }, {} as DetailedResults)

    setResults(detailedResults)
    setShowResults(true)
  }, [answers, calculateConditionScore, determineRiskLevel])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    currentQuestionIndex,
    answers,
    showResults,
    results,
    goToNextQuestion,
    goToPreviousQuestion,
    handleAnswerChange,
    submitSurvey
  }), [
    currentQuestionIndex, 
    answers, 
    showResults, 
    results,
    goToNextQuestion,
    goToPreviousQuestion,
    handleAnswerChange,
    submitSurvey
  ])

  return (
    <SurveyContext.Provider value={contextValue}>
      {children}
    </SurveyContext.Provider>
  )
}

// Custom hook to use the survey context
export const useSurvey = () => {
  const context = useContext(SurveyContext)
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider')
  }
  return context
}
