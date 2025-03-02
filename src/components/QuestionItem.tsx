import React from 'react'
import { Question } from '../types'

interface QuestionItemProps {
  question: Question
  questionIndex: number
  selectedAnswer: number | undefined
  onAnswerChange: (answerIndex: number) => void
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  questionIndex,
  selectedAnswer,
  onAnswerChange
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4 text-neutral-800">
        {questionIndex + 1}. {question.text}
      </h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div 
            key={index}
            onClick={() => onAnswerChange(index)}
            className={`
              p-4 rounded-lg cursor-pointer transition-all duration-200
              border-2 
              ${selectedAnswer === index 
                ? 'border-primary-500 bg-primary-50 shadow-md' 
                : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'}
            `}
          >
            <div className="flex items-center">
              <div 
                className={`
                  w-5 h-5 rounded-full mr-3 flex items-center justify-center
                  border-2 transition-colors
                  ${selectedAnswer === index 
                    ? 'border-primary-500 bg-primary-500' 
                    : 'border-neutral-300 bg-white'}
                `}
              >
                {selectedAnswer === index && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className={`${selectedAnswer === index ? 'font-medium text-primary-900' : 'text-neutral-700'}`}>
                {option}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionItem
