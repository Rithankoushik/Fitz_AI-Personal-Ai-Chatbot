import { useState, useEffect, useRef } from 'react'
import { aiAPI, plansAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Send, Loader2, Bot, User } from 'lucide-react'

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI fitness coach. Ask me anything about nutrition, workouts, or your personalized plan!'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [plans, setPlans] = useState([])
  const [selectedPlanId, setSelectedPlanId] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    fetchPlans()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchPlans = async () => {
    try {
      const data = await plansAPI.getPlans()
      setPlans(data)
      if (data.length > 0) {
        setSelectedPlanId(data[0].id)
      }
    } catch (error) {
      // Silently fail
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await aiAPI.chat(userMessage, selectedPlanId)
      setMessages(prev => [...prev, { role: 'assistant', content: response.response }])
    } catch (error) {
      toast.error('Failed to get response')
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Bot className="w-8 h-8 mr-3 text-primary-600" />
          AI Fitness Coach
        </h1>
        <p className="text-gray-600 mt-2">
          Get personalized advice and ask questions about your fitness journey
        </p>
      </div>

      {plans.length > 0 && (
        <div className="card mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reference Plan (optional)
          </label>
          <select
            value={selectedPlanId || ''}
            onChange={(e) => setSelectedPlanId(e.target.value || null)}
            className="input-field"
          >
            <option value="">No specific plan</option>
            {plans.map(plan => (
              <option key={plan.id} value={plan.id}>
                {plan.user_inputs.goal} - {new Date(plan.created_at).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="card">
        {/* Messages Area */}
        <div className="h-[500px] overflow-y-auto mb-4 space-y-4 pr-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white ml-2'
                      : 'bg-gray-200 text-gray-600 mr-2'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 mr-2">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="px-4 py-3 rounded-lg bg-gray-100">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2 border-t pt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about fitness, nutrition, or your plan..."
            className="input-field flex-1"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="btn-primary px-6"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

