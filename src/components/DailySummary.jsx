export default function DailySummary({ dailyLog, dailyGoals }) {
  const totalMacros = dailyLog?.total_macros || { calories: 0, protein: 0, carbs: 0, fat: 0 }

  const getProgressPercentage = (current, goal) => {
    if (goal === 0) return 0
    return Math.min(Math.round((current / goal) * 100), 100)
  }

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-red-500'
    if (percentage >= 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const progressData = [
    {
      name: 'Calories',
      current: Math.round(totalMacros.calories),
      goal: dailyGoals.calories,
      unit: 'cal',
      color: 'bg-blue-500'
    },
    {
      name: 'Protein',
      current: Math.round(totalMacros.protein * 10) / 10,
      goal: dailyGoals.protein,
      unit: 'g',
      color: 'bg-green-500'
    },
    {
      name: 'Carbs',
      current: Math.round(totalMacros.carbs * 10) / 10,
      goal: dailyGoals.carbs,
      unit: 'g',
      color: 'bg-yellow-500'
    },
    {
      name: 'Fat',
      current: Math.round(totalMacros.fat * 10) / 10,
      goal: dailyGoals.fat,
      unit: 'g',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Daily Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progressData.map((item) => {
          const percentage = getProgressPercentage(item.current, item.goal)
          const progressColor = getProgressColor(percentage)
          
          return (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {item.name}
                </span>
                <span className="text-sm text-gray-600">
                  {item.current} / {item.goal} {item.unit}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${item.color}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              
              <div className="text-xs text-gray-500 text-right">
                {percentage}% of goal
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(totalMacros.calories)}
            </div>
            <div className="text-sm text-gray-600">Total Calories</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(totalMacros.protein * 10) / 10}g
            </div>
            <div className="text-sm text-gray-600">Protein</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {Math.round(totalMacros.carbs * 10) / 10}g
            </div>
            <div className="text-sm text-gray-600">Carbs</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(totalMacros.fat * 10) / 10}g
            </div>
            <div className="text-sm text-gray-600">Fat</div>
          </div>
        </div>
      </div>

      {/* Remaining */}
      {totalMacros.calories > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <strong>Remaining:</strong> {Math.round(dailyGoals.calories - totalMacros.calories)} calories
          </div>
        </div>
      )}
    </div>
  )
}
