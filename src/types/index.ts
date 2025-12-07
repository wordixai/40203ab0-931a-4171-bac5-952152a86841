export type MealType = '早餐' | '午餐' | '晚餐' | '加餐';

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface FoodEntry {
  id: string;
  name: string;
  mealType: MealType;
  portion: string;
  nutrition: Nutrition;
  photo?: string;
  timestamp: number;
  date: string; // YYYY-MM-DD格式
}

export interface DailyGoal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface UserProfile {
  dailyGoal: DailyGoal;
  preferences: string[];
}
