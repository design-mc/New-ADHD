import React from 'react'
import { Brain } from 'lucide-react'
import { SurveyProvider } from './context/SurveyContext'
import SurveyForm from './components/SurveyForm'

function App() {
  return (
    <SurveyProvider>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col font-sans">
        <header className="bg-white shadow-soft py-4 sticky top-0 z-10">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <a 
              href="/" 
              className="flex items-center text-primary-700 font-bold text-xl transition-colors hover:text-primary-600"
              aria-label="MindCheck Home"
            >
              <Brain className="mr-2 text-primary-600" size={24} />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600">
                MindCheck
              </span>
            </a>
          </div>
        </header>
        
        <main className="flex-grow flex items-center justify-center p-6">
          <SurveyForm />
        </main>
        
        <footer className="bg-neutral-200 py-4 text-center text-neutral-500 text-sm">
          <p>&copy; 2024 MindCheck. All rights reserved.</p>
          <nav className="mt-2">
            <a href="/privacy" className="mx-2 hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="mx-2 hover:text-primary-600 transition-colors">Terms of Service</a>
          </nav>
        </footer>
      </div>
    </SurveyProvider>
  )
}

export default App
