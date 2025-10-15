import { useState, useEffect } from 'react'
import { useFoodStore } from '../store/foodStore'
import { foodAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Loader2, Calendar, Target } from 'lucide-react'
import FoodSearch from '../components/FoodSearch'
import FoodItemCard from '../components/FoodItemCard'
import MealSection from '../components/MealSection'
import DailySummary from '../components/DailySummary'

export default function FoodTracker() {
  const {
    dailyLog,
    selectedDate,
    setSelectedDate,
    setDailyLog,
    dailyGoals,
    setDailyGoals
  } = useFoodStore()
  
  const [loading, setLoading] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  // Load daily log when date changes
  useEffect(() => {
    loadDailyLog()
  }, [selectedDate])

  const loadDailyLog = async () => {
    setLoading(true)
    try {
      const log = await foodAPI.getDailyLog(selectedDate)
      setDailyLog(log)
    } catch (error) {
      toast.error('Failed to load daily food log')
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)
    setDatePickerOpen(false)
  }

  const handleFoodLogged = () => {
    // Reload the daily log to get updated data
    loadDailyLog()
  }

  const handleGoalUpdate = (newGoals) => {
    setDailyGoals(newGoals)
    toast.success('Daily goals updated!')
  }

  if (loading && !dailyLog) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              🍎 Food Tracker
            </h1>
            <p className="text-gray-600 mt-2">
              Track your daily nutrition and achieve your health goals
            </p>
          </div>
          
          {/* Date Picker */}
          <div className="relative">
            <button
              onClick={() => setDatePickerOpen(!datePickerOpen)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </button>
            
            {datePickerOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="p-3 border-0 outline-none rounded-lg"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Food Search & Add */}
        <div className="lg:col-span-1 space-y-6">
          {/* Daily Goals */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary-600" />
                Daily Goals
              </h2>
              <button
                onClick={() => {
                  const newGoals = {
                    calories: parseFloat(prompt('Calories goal:', dailyGoals.calories)) || dailyGoals.calories,
                    protein: parseFloat(prompt('Protein goal (g):', dailyGoals.protein)) || dailyGoals.protein,
                    carbs: parseFloat(prompt('Carbs goal (g):', dailyGoals.carbs)) || dailyGoals.carbs,
                    fat: parseFloat(prompt('Fat goal (g):', dailyGoals.fat)) || dailyGoals.fat
                  }
                  handleGoalUpdate(newGoals)
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Edit
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Calories:</span>
                <span className="font-medium">{dailyGoals.calories}</span>
              </div>
              <div className="flex justify-between">
                <span>Protein:</span>
                <span className="font-medium">{dailyGoals.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span>Carbs:</span>
                <span className="font-medium">{dailyGoals.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span>Fat:</span>
                <span className="font-medium">{dailyGoals.fat}g</span>
              </div>
            </div>
          </div>

          {/* Food Search */}
          <FoodSearch onFoodLogged={handleFoodLogged} />
        </div>

        {/* Right Column - Meals & Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Summary */}
          <DailySummary dailyLog={dailyLog} dailyGoals={dailyGoals} />

          {/* Meals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MealSection
              mealType="breakfast"
              meals={dailyLog?.meals?.breakfast || []}
              onFoodRemoved={loadDailyLog}
              dailyLogId={dailyLog?.id}
            />
            
            <MealSection
              mealType="lunch"
              meals={dailyLog?.meals?.lunch || []}
              onFoodRemoved={loadDailyLog}
              dailyLogId={dailyLog?.id}
            />
            
            <MealSection
              mealType="snacks"
              meals={dailyLog?.meals?.snacks || []}
              onFoodRemoved={loadDailyLog}
              dailyLogId={dailyLog?.id}
            />
            
            <MealSection
              mealType="dinner"
              meals={dailyLog?.meals?.dinner || []}
              onFoodRemoved={loadDailyLog}
              dailyLogId={dailyLog?.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
