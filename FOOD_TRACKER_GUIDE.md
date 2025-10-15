# 🍎 Food Tracker Feature Guide

## Overview

The **Food Tracker** is a comprehensive nutrition tracking system added to your Fit_AI application. It allows users to search for foods, log their daily meals, and track their nutrition goals with detailed macro calculations.

---

## 🎯 Features Implemented

### ✅ **Backend Features**
- **Food Search API** - Search for foods using nutrition database (Edamam API with fallback to mock data)
- **Food Logging** - Log foods to specific meals (Breakfast, Lunch, Snacks, Dinner)
- **Daily Tracking** - Store and retrieve daily food logs per user
- **Macro Calculation** - Automatic calculation of calories, protein, carbs, fat based on quantity
- **Data Persistence** - MongoDB storage with proper schema design

### ✅ **Frontend Features**
- **Interactive Food Search** - Real-time search with autocomplete suggestions
- **Meal Organization** - Four meal categories with individual tracking
- **Daily Summary** - Progress bars and totals for all macros
- **Quantity Control** - Flexible quantity input with real-time macro calculation
- **Date Navigation** - Track different days with date picker
- **Goal Setting** - Customizable daily nutrition goals

---

## 🏗️ Architecture

### **Backend Structure**
```
server/app/
├── models/food.py              # Food tracking data models
├── services/food_service.py    # Nutrition API integration
└── api/routes/food.py          # Food tracking endpoints
```

### **Frontend Structure**
```
client/src/
├── pages/FoodTracker.jsx       # Main food tracking page
├── components/
│   ├── FoodSearch.jsx          # Food search and logging
│   ├── FoodItemCard.jsx        # Individual food item display
│   ├── MealSection.jsx         # Meal category container
│   └── DailySummary.jsx        # Daily totals and progress
└── store/foodStore.js          # Zustand state management
```

---

## 🔗 API Endpoints

### **Food Search**
```http
GET /api/food/search?query=apple&limit=20
```
**Response:**
```json
{
  "foods": [
    {
      "name": "Apple",
      "calories": 52,
      "protein": 0.3,
      "carbs": 13.8,
      "fat": 0.2,
      "fiber": 2.4,
      "sugar": 10.4,
      "sodium": 1
    }
  ],
  "total_results": 1
}
```

### **Log Food**
```http
POST /api/food/log
```
**Request:**
```json
{
  "food_name": "Apple",
  "quantity": 150,
  "meal_type": "breakfast"
}
```

### **Get Daily Log**
```http
GET /api/food/daily?target_date=2024-01-15
```

### **Delete Food Log**
```http
DELETE /api/food/log/{log_id}?meal_type=breakfast&food_index=0
```

---

## 📊 Database Schema

### **Daily Food Log Collection**
```javascript
{
  _id: ObjectId,
  user_id: String,
  date: Date,
  meals: {
    breakfast: [FoodLogEntry],
    lunch: [FoodLogEntry],
    snacks: [FoodLogEntry],
    dinner: [FoodLogEntry]
  },
  total_macros: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  created_at: DateTime,
  updated_at: DateTime
}
```

### **Food Log Entry**
```javascript
{
  food_name: String,
  quantity: Number,        // in grams
  meal_type: String,       // "breakfast", "lunch", "snacks", "dinner"
  macros: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
    sugar: Number,
    sodium: Number
  },
  logged_at: DateTime
}
```

---

## 🚀 Setup Instructions

### **1. Backend Setup**

#### **Install Dependencies**
```bash
cd server
pip install httpx==0.25.2
```

#### **Environment Variables** (Optional)
Add to your `server/.env`:
```env
# Nutrition API (Optional - for real food data)
EDAMAM_APP_ID=your-edamam-app-id
EDAMAM_APP_KEY=your-edamam-app-key
```

**Note:** The app works with mock data if no API keys are provided.

#### **Get Edamam API Keys** (Optional)
1. Go to [Edamam Developer Portal](https://developer.edamam.com/)
2. Sign up for free account
3. Create a new application
4. Get your App ID and App Key
5. Add to environment variables

### **2. Frontend Setup**

No additional dependencies needed - all components use existing libraries.

### **3. Start the Application**

```bash
# Backend
cd server
python main.py

# Frontend
cd client
npm run dev
```

---

## 🎨 User Interface

### **Navigation**
- New "Food Tracker" link in the main navigation
- Accessible at `/food-tracker`

### **Layout**
- **Left Panel:** Food search, daily goals, add food form
- **Right Panel:** Daily summary, meal sections (2x2 grid)

### **Key Components**

#### **Food Search**
- Real-time search with debounced API calls
- Dropdown results with nutrition preview
- Quantity input with live macro calculation
- Meal selection dropdown

#### **Daily Summary**
- Progress bars for all macros (calories, protein, carbs, fat)
- Color-coded progress (green → yellow → red)
- Quick stats display
- Remaining calories calculation

#### **Meal Sections**
- Four categories: Breakfast, Lunch, Snacks, Dinner
- Individual food items with macros
- Remove functionality with confirmation
- Meal totals calculation

---

## 🔧 Customization

### **Daily Goals**
Users can set custom daily nutrition goals:
- Calories
- Protein (grams)
- Carbs (grams)
- Fat (grams)

### **Meal Types**
Currently supports four meal types:
- `breakfast`
- `lunch`
- `snacks`
- `dinner`

**To add more meal types:**
1. Update `valid_meals` in `server/app/api/routes/food.py`
2. Add option to meal selector in `FoodSearch.jsx`
3. Update meal sections in `FoodTracker.jsx`

### **Nutrition Database**
- **Primary:** Edamam API (requires free API keys)
- **Fallback:** Mock database with common foods
- **Extensible:** Easy to add other nutrition APIs

---

## 📱 Mobile Responsiveness

The food tracker is fully responsive:
- **Desktop:** 3-column layout (search + summary + meals)
- **Tablet:** 2-column layout (search/summary + meals)
- **Mobile:** Single column with stacked components

---

## 🧪 Testing

### **Backend Testing**
```bash
# Test food search
curl "http://localhost:8000/api/food/search?query=apple"

# Test food logging
curl -X POST "http://localhost:8000/api/food/log" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"food_name": "Apple", "quantity": 150, "meal_type": "breakfast"}'
```

### **Frontend Testing**
1. Navigate to `/food-tracker`
2. Search for foods (try "apple", "chicken", "rice")
3. Add foods to different meals
4. Check daily summary updates
5. Test date navigation

---

## 🐛 Troubleshooting

### **Common Issues**

#### **Food Search Not Working**
- Check if backend is running
- Verify API keys (optional - mock data should work)
- Check browser network tab for errors

#### **Food Not Logging**
- Ensure user is authenticated
- Check backend logs for errors
- Verify MongoDB connection

#### **Macros Not Calculating**
- Check if food item has nutrition data
- Verify quantity is a positive number
- Check browser console for JavaScript errors

---

## 🔮 Future Enhancements

### **Potential Additions**
- **Barcode Scanner** - Scan product barcodes for instant food logging
- **Recipe Integration** - Create and log custom recipes
- **Nutrition Charts** - Weekly/monthly nutrition trends
- **Meal Planning** - Plan meals in advance
- **Food Database Import** - Import from MyFitnessPal, Cronometer
- **Photo Recognition** - AI-powered food recognition from photos
- **Social Features** - Share meals and progress with friends
- **Nutrition Insights** - AI-powered nutrition recommendations

### **API Integrations**
- **USDA Food Database** - Alternative nutrition API
- **Nutritionix API** - Restaurant and brand food data
- **Open Food Facts** - Community-driven food database

---

## 📈 Performance Considerations

### **Optimizations Implemented**
- **Debounced Search** - Reduces API calls during typing
- **Cached Results** - Zustand store caches search results
- **Efficient Queries** - MongoDB indexes on user_id and date
- **Lazy Loading** - Components load data only when needed

### **Scalability**
- **Database Indexing** - Add indexes for user_id, date fields
- **API Rate Limiting** - Implement rate limiting for food search
- **Caching** - Add Redis for frequently searched foods
- **CDN** - Serve static assets through CDN

---

## 🎉 Summary

The Food Tracker feature successfully adds comprehensive nutrition tracking to your Fit_AI application:

✅ **Complete CRUD operations** for food logging  
✅ **Real-time search** with nutrition database integration  
✅ **Intuitive UI** with progress tracking and goal setting  
✅ **Responsive design** for all device sizes  
✅ **Robust backend** with proper error handling  
✅ **Scalable architecture** for future enhancements  

Your users can now track their daily nutrition alongside their fitness plans, creating a complete health and wellness platform!

---

**Ready to test?** Navigate to `/food-tracker` in your application and start logging your first meal! 🍽️
