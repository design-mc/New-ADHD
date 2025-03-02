import React, { useState } from 'react'
import { 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Zap,
  BookOpen,
  RefreshCw,
  Mail,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Brain,
  ArrowRight
} from 'lucide-react'
import { ResultsProps } from '../types'

const riskStyleMap = {
  Low: {
    containerClass: 'bg-success-50 border-success-200',
    gradientClass: 'bg-gradient-success',
    textClass: 'text-success-700',
    iconClass: 'text-success-500',
    insightBg: 'bg-white/70'
  },
  Medium: {
    containerClass: 'bg-warning-50 border-warning-200',
    gradientClass: 'bg-gradient-warning',
    textClass: 'text-warning-700',
    iconClass: 'text-warning-500',
    insightBg: 'bg-white/70'
  },
  High: {
    containerClass: 'bg-danger-50 border-danger-200',
    gradientClass: 'bg-gradient-danger',
    textClass: 'text-danger-700',
    iconClass: 'text-danger-500',
    insightBg: 'bg-white/70'
  }
}

const riskDescriptions = {
  Low: 'Your results suggest minimal risk. Continue maintaining your current strategies.',
  Medium: 'Your results indicate potential areas of concern. Consider professional guidance.',
  High: 'Your results suggest significant challenges. We strongly recommend seeking professional support.'
}

const recommendationsByRisk = {
  Low: [
    'Continue with your current self-care practices',
    'Maintain regular sleep patterns and physical activity',
    'Practice mindfulness and stress management techniques',
    'Stay connected with your support network'
  ],
  Medium: [
    'Consider speaking with a mental health professional',
    'Increase self-care activities and stress management',
    'Establish a regular routine for sleep and exercise',
    'Reach out to trusted friends or family for support'
  ],
  High: [
    'We strongly recommend consulting with a mental health professional',
    'Consider reaching out to a crisis helpline if needed',
    'Prioritize self-care and stress reduction techniques',
    'Share your concerns with trusted individuals in your support network'
  ]
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  const [emailAddress, setEmailAddress] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [expandedCondition, setExpandedCondition] = useState<string | null>(null)

  const renderRiskIcon = (risk: string) => {
    const styles = riskStyleMap[risk as keyof typeof riskStyleMap]
    
    switch (risk) {
      case 'Low':
        return <CheckCircle className={styles.iconClass} size={36} />
      case 'Medium':
        return <Info className={styles.iconClass} size={36} />
      case 'High':
        return <AlertTriangle className={styles.iconClass} size={36} />
      default:
        return null
    }
  }

  const getOverallRiskLevel = () => {
    if (Object.values(results).some(r => r.riskLevel === 'High')) return 'High'
    if (Object.values(results).some(r => r.riskLevel === 'Medium')) return 'Medium'
    return 'Low'
  }

  const overallRisk = getOverallRiskLevel()
  const overallStyles = riskStyleMap[overallRisk as keyof typeof riskStyleMap]

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would connect to a backend service
    // For now, we'll simulate sending an email
    setTimeout(() => {
      setEmailSent(true)
      setTimeout(() => {
        setShowEmailForm(false)
        setEmailAddress('')
        setEmailSent(false)
      }, 3000)
    }, 1000)
  }

  const toggleConditionDetails = (condition: string) => {
    if (expandedCondition === condition) {
      setExpandedCondition(null)
    } else {
      setExpandedCondition(condition)
    }
  }

  const formatDate = () => {
    const now = new Date()
    return now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
        <div className={`${overallStyles.gradientClass} text-white p-8 text-center`}>
          <h2 className="text-3xl font-bold mb-2">
            Your Assessment Results
          </h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Based on your responses, we've analyzed your mental health across multiple dimensions
          </p>
          <div className="mt-4 text-sm text-white/70">
            Assessment Date: {formatDate()}
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Summary and Overall Risk */}
            <div>
              <div className={`${overallStyles.containerClass} rounded-xl p-6 border mb-8`}>
                <div className="flex items-center gap-4 mb-4">
                  {renderRiskIcon(overallRisk)}
                  <div>
                    <h3 className="text-xl font-bold">Overall Assessment</h3>
                    <div className={`inline-block px-3 py-1 rounded-full ${overallStyles.textClass} bg-white/50 text-sm font-medium mt-1`}>
                      {overallRisk} Risk Level
                    </div>
                  </div>
                </div>
                
                <p className="text-neutral-700 mb-4">
                  {riskDescriptions[overallRisk as keyof typeof riskDescriptions]}
                </p>
                
                <div className="bg-white/70 rounded-lg p-4">
                  <h4 className="flex items-center gap-2 font-semibold mb-3">
                    <BookOpen size={18} className={overallStyles.textClass} /> 
                    <span>Recommendations</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    {recommendationsByRisk[overallRisk as keyof typeof recommendationsByRisk].map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ArrowRight size={14} className="mt-1 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Share Results Section */}
              <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
                <h3 className="text-xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                  <Share2 size={20} className="text-primary-600" />
                  Share Your Results
                </h3>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => setShowEmailForm(!showEmailForm)}
                    className="btn btn-primary flex items-center justify-center gap-2"
                  >
                    <Mail size={18} />
                    Send Results via Email
                  </button>
                  
                  <button className="btn btn-secondary flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download as PDF
                  </button>
                </div>
                
                {showEmailForm && (
                  <div className="mt-4 bg-white rounded-lg p-4 border border-primary-100 animate-fade-in">
                    <h4 className="font-medium text-primary-800 mb-2">
                      Email Your Results
                    </h4>
                    
                    {emailSent ? (
                      <div className="text-success-600 bg-success-50 p-3 rounded-lg flex items-center gap-2">
                        <CheckCircle size={18} />
                        <span>Results sent successfully!</span>
                      </div>
                    ) : (
                      <form onSubmit={handleSendEmail} className="space-y-3">
                        <div>
                          <input
                            type="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            placeholder="Enter email address"
                            required
                            className="input-field"
                          />
                        </div>
                        <button 
                          type="submit" 
                          className="w-full btn btn-primary"
                        >
                          Send
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Detailed Results */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain size={20} className="text-primary-600" />
                <span>Detailed Assessment</span>
              </h3>
              
              <div className="space-y-4">
                {Object.entries(results).map(([condition, { riskLevel, score, insights }]) => {
                  const styles = riskStyleMap[riskLevel as keyof typeof riskStyleMap]
                  const isExpanded = expandedCondition === condition
                  
                  return (
                    <div 
                      key={condition} 
                      className={`
                        rounded-xl shadow-soft 
                        transition-all duration-300
                        ${styles.containerClass} border
                      `}
                    >
                      <div 
                        className="p-4 cursor-pointer"
                        onClick={() => toggleConditionDetails(condition)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {renderRiskIcon(riskLevel)}
                            <div>
                              <h4 className="font-semibold">{condition}</h4>
                              <div className={`inline-block px-2 py-0.5 rounded-full ${styles.textClass} bg-white/50 text-xs font-medium mt-1`}>
                                {riskLevel} Risk
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="text-sm text-neutral-500">
                              Score: {score}/50
                            </div>
                            {isExpanded ? (
                              <ChevronUp size={20} className="text-neutral-400" />
                            ) : (
                              <ChevronDown size={20} className="text-neutral-400" />
                            )}
                          </div>
                        </div>
                        
                        <div className="w-full bg-neutral-200 h-2 rounded-full mt-3">
                          <div 
                            className={`h-full rounded-full ${styles.gradientClass}`}
                            style={{ width: `${(score / 50) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className={`${styles.insightBg} p-4 border-t ${styles.containerClass} animate-fade-in`}>
                          <h5 className="flex items-center gap-2 font-semibold mb-3">
                            <Zap size={16} className={styles.textClass} /> Key Insights
                          </h5>
                          <ul className="space-y-2 text-sm text-neutral-700">
                            {insights.map((insight, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <ArrowRight size={14} className="mt-1 flex-shrink-0" />
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Take Assessment Again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results
