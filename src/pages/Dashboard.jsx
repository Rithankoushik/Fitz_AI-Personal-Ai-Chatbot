import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { aiAPI, plansAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Upload, Loader2, Dumbbell } from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [classifierLabel, setClassifierLabel] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    sex: 'Male',
    weight: 70,
    height_cm: 170,
    activity_level: 'Moderately active',
    goal: 'Lose fat / get lean',
    diet_prefs: ''
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image must be less than 10MB')
        return
      }
      
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setClassifierLabel(null)
    }
  }

  const handleClassifyImage = async () => {
    if (!imageFile) {
      toast.error('Please upload an image first')
      return
    }

    setLoading(true)
    try {
      const result = await aiAPI.classifyImage(imageFile)
      setClassifierLabel(result.classifier_label)
      toast.success(`Body type: ${result.classifier_label}`)
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Classification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGeneratePlan = async () => {
    if (!imageFile) {
      toast.error('Please upload an image first')
      return
    }

    setLoading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('file', imageFile)
      formDataToSend.append('name', formData.name)
      formDataToSend.append('age', formData.age)
      formDataToSend.append('sex', formData.sex)
      formDataToSend.append('weight', formData.weight)
      formDataToSend.append('height_cm', formData.height_cm)
      formDataToSend.append('activity_level', formData.activity_level)
      formDataToSend.append('goal', formData.goal)
      if (formData.diet_prefs) {
        formDataToSend.append('diet_prefs', formData.diet_prefs)
      }

      const result = await aiAPI.generatePlan(formDataToSend)
      
      // Save plan to database
      await plansAPI.createPlan({
        user_inputs: result.user_inputs,
        classifier_label: result.classifier_label,
        plan_text: result.plan_text
      })

      toast.success('Plan generated successfully!')
      
      // Navigate to plans page
      navigate('/plans')
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to generate plan')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Dumbbell className="w-8 h-8 mr-3 text-primary-600" />
          Generate Your Personalized Plan
        </h1>
        <p className="text-gray-600 mt-2">
          Upload your photo and enter your details to get a custom fitness and nutrition plan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Upload Your Photo</h2>
          
          <div className="mb-4">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-400 transition-colors">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (MAX. 10MB)</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {imageFile && (
            <button
              onClick={handleClassifyImage}
              disabled={loading}
              className="btn-secondary w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                  Classifying...
                </>
              ) : (
                'Classify Body Type'
              )}
            </button>
          )}

          {classifierLabel && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                Body Type Classified: <span className="font-bold">{classifierLabel}</span>
              </p>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Your Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name (optional)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="input-field"
                  min="10"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sex
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other / Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="input-field"
                  min="20"
                  max="300"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height_cm"
                  value={formData.height_cm}
                  onChange={handleInputChange}
                  className="input-field"
                  min="100"
                  max="250"
                  step="0.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Level
              </label>
              <select
                name="activity_level"
                value={formData.activity_level}
                onChange={handleInputChange}
                className="input-field"
              >
                <option>Sedentary</option>
                <option>Lightly active</option>
                <option>Moderately active</option>
                <option>Active</option>
                <option>Very active</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Goal
              </label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                className="input-field"
              >
                <option>Gain weight / muscle</option>
                <option>Maintain</option>
                <option>Lose fat / get lean</option>
                <option>Improve performance / athletic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diet Preferences (optional)
              </label>
              <input
                type="text"
                name="diet_prefs"
                value={formData.diet_prefs}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g. vegetarian, low carb, high protein"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generate Plan Button */}
      <div className="mt-6">
        <button
          onClick={handleGeneratePlan}
          disabled={loading || !imageFile}
          className="btn-primary w-full py-4 text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
              Generating Your Personalized Plan...
            </>
          ) : (
            'Generate Personalized Plan 🚀'
          )}
        </button>
      </div>
    </div>
  )
}

