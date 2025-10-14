import { useState, useEffect } from 'react'
import { plansAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Loader2, FileText, Trash2, Calendar } from 'lucide-react'

export default function Plans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const data = await plansAPI.getPlans()
      setPlans(data)
      if (data.length > 0 && !selectedPlan) {
        setSelectedPlan(data[0])
      }
    } catch (error) {
      toast.error('Failed to load plans')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePlan = async (planId) => {
    if (!confirm('Are you sure you want to delete this plan?')) return

    try {
      await plansAPI.deletePlan(planId)
      toast.success('Plan deleted')
      setPlans(plans.filter(p => p.id !== planId))
      if (selectedPlan?.id === planId) {
        setSelectedPlan(plans[0])
      }
    } catch (error) {
      toast.error('Failed to delete plan')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Plans Yet</h2>
        <p className="text-gray-500 mb-6">
          Generate your first personalized fitness plan from the dashboard
        </p>
        <a href="/dashboard" className="btn-primary inline-block">
          Create Your First Plan
        </a>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <FileText className="w-8 h-8 mr-3 text-primary-600" />
          My Fitness Plans
        </h1>
        <p className="text-gray-600 mt-2">View and manage your personalized plans</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plans List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Your Plans ({plans.length})</h2>
            <div className="space-y-2">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedPlan?.id === plan.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {plan.user_inputs.goal}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(plan.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeletePlan(plan.id)
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    {plan.classifier_label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plan Details */}
        <div className="lg:col-span-2">
          {selectedPlan && (
            <div className="card">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedPlan.user_inputs.goal}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                    {selectedPlan.classifier_label}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {selectedPlan.user_inputs.activity_level}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Age:</span>
                    <span className="ml-2 font-medium">{selectedPlan.user_inputs.age}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Sex:</span>
                    <span className="ml-2 font-medium">{selectedPlan.user_inputs.sex}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Weight:</span>
                    <span className="ml-2 font-medium">{selectedPlan.user_inputs.weight} kg</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Height:</span>
                    <span className="ml-2 font-medium">{selectedPlan.user_inputs.height_cm} cm</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Your Personalized Plan</h3>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                    {selectedPlan.plan_text}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

