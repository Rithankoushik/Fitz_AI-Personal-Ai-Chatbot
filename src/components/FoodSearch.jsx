import { useState, useEffect } from 'react'
import { useFoodStore } from '../store/foodStore'
import { foodAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Search, Plus, Loader2 } from 'lucide-react'

export default function FoodSearch({ onFoodLogged }) {
  const {
    searchQuery,
    searchResults,
    isSearching,
    selectedFood,
    quantity,
    selectedMeal,
    setSearchQuery,
    setSearchResults,
    setIsSearching,
    setSelectedFood,
    setQuantity,
    setSelectedMeal,
    getCalculatedMacros,
    resetForm,
    clearSearch
  } = useFoodStore()

  const [showResults, setShowResults] = useState(false)

  // Debounced search
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      await searchFoods()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const searchFoods = async () => {
    if (searchQuery.length < 2) return

    setIsSearching(true)
    try {
      const response = await foodAPI.searchFood(searchQuery)
      setSearchResults(response.foods)
      setShowResults(true)
    } catch (error) {
      toast.error('Failed to search foods')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleFoodSelect = (food) => {
    setSelectedFood(food)
    setShowResults(false)
  }

  const handleLogFood = async () => {
    if (!selectedFood) {
      toast.error('Please select a food item')
      return
    }

    if (quantity <= 0) {
      toast.error('Please enter a valid quantity')
      return
    }

    try {
      await foodAPI.logFood({
        food_name: selectedFood.name,
        quantity: quantity,
        meal_type: selectedMeal
      })

      toast.success(`${selectedFood.name} added to ${selectedMeal}!`)
      resetForm()
      clearSearch()
      onFoodLogged()
    } catch (error) {
      toast.error('Failed to log food item')
    }
  }

  const calculatedMacros = getCalculatedMacros()

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Add Food</h2>
      
      {/* Search */}
      <div className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for food (e.g., apple, chicken breast)"
            className="input-field pl-10"
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
          )}
        </div>

        {/* Search Results */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {searchResults.map((food, index) => (
              <button
                key={index}
                onClick={() => handleFoodSelect(food)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium">{food.name}</div>
                <div className="text-sm text-gray-600">
                  {food.calories} cal • {food.protein}g protein • {food.carbs}g carbs • {food.fat}g fat
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Food */}
      {selectedFood && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-medium text-green-800 mb-2">{selectedFood.name}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
            <div>Calories: {selectedFood.calories}/100g</div>
            <div>Protein: {selectedFood.protein}g/100g</div>
            <div>Carbs: {selectedFood.carbs}g/100g</div>
            <div>Fat: {selectedFood.fat}g/100g</div>
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity (grams)
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
          className="input-field"
          placeholder="100"
          min="1"
          step="0.1"
        />
      </div>

      {/* Meal Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meal
        </label>
        <select
          value={selectedMeal}
          onChange={(e) => setSelectedMeal(e.target.value)}
          className="input-field"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="snacks">Snacks</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      {/* Calculated Macros */}
      {calculatedMacros && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">For {quantity}g:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
            <div>Calories: {calculatedMacros.calories}</div>
            <div>Protein: {calculatedMacros.protein}g</div>
            <div>Carbs: {calculatedMacros.carbs}g</div>
            <div>Fat: {calculatedMacros.fat}g</div>
          </div>
        </div>
      )}

      {/* Add Button */}
      <button
        onClick={handleLogFood}
        disabled={!selectedFood}
        className="btn-primary w-full flex items-center justify-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add to {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}
      </button>
    </div>
  )
}
