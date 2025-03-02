import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SurveyProvider } from './context/SurveyContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SurveyProvider>
      <App />
    </SurveyProvider>
  </React.StrictMode>,
)
