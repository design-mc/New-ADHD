import React from 'react'
import { Brain, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import { useSurvey } from '../context/SurveyContext'
import QuestionItem from './QuestionItem'
import Results from './Results'
import surveyQuestions from '../data/surveyQuestions.json'

const SurveyForm: React.FC = () => {
  const {
    currentQuestionIndex,
    answers,
    showResults,
    results,
    goToNextQuestion,
    goToPreviousQuestion,
    handleAnswerChange,
    submitSurvey
  } = useSurvey()

  const currentQuestion = surveyQuestions[currentQuestionIndex]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    submitSurvey()
  }

  if (showResults) {
    return <Results results={results} />
  }

  const progressPercentage = ((currentQuestionIndex + 1) / surveyQuestions.length) * 100

  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-neutral-100">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-full mb-4">
            <Brain className="text-primary-600 animate-pulse-slow" size={48} />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600">
            Mental Health Self-Assessment
          </h1>
          <p className="text-neutral-500 mt-2">
            Answer each question thoughtfully for accurate results
          </p>
        </header>

        <div className="mb-8">
          <div className="flex justify-between text-xs text-neutral-500 mb-1">
            <span>Question {currentQuestionIndex + 1} of {surveyQuestions.length}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={currentQuestionIndex + 1}
              aria-valuemin={1}
              aria-valuemax={surveyQuestions.length}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="animate-enter">
          <QuestionItem
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            selectedAnswer={answers[currentQuestion.id]}
            onAnswerChange={(answerIndex) => 
              handleAnswerChange(currentQuestion.id, answerIndex)
            }
          />

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="btn btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={20} />
              Previous
            </button>

            {currentQuestionIndex === surveyQuestions.length - 1 ? (
              <button
                type="submit"
                disabled={answers[currentQuestion.id] === undefined}
                className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={20} />
                Submit Survey
              </button>
            ) : (
              <button
                type="button"
                onClick={goToNextQuestion}
                disabled={answers[currentQuestion.id] === undefined}
                className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default SurveyForm
