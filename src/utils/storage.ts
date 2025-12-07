import { FoodEntry, UserProfile } from '@/types';

const STORAGE_KEYS = {
  FOOD_ENTRIES: 'foodie-tracker-entries',
  USER_PROFILE: 'foodie-tracker-profile',
};

export const storageUtils = {
  // 食物记录
  getFoodEntries(): FoodEntry[] {
    const data = localStorage.getItem(STORAGE_KEYS.FOOD_ENTRIES);
    return data ? JSON.parse(data) : [];
  },

  saveFoodEntry(entry: FoodEntry): void {
    const entries = this.getFoodEntries();
    entries.push(entry);
    localStorage.setItem(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(entries));
  },

  deleteFoodEntry(id: string): void {
    const entries = this.getFoodEntries();
    const filtered = entries.filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(filtered));
  },

  getFoodEntriesByDate(date: string): FoodEntry[] {
    return this.getFoodEntries().filter((e) => e.date === date);
  },

  // 用户配置
  getUserProfile(): UserProfile | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  },

  saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  // 获取默认目标
  getDefaultProfile(): UserProfile {
    return {
      dailyGoal: {
        calories: 2000,
        protein: 50,
        carbs: 250,
        fat: 70,
      },
      preferences: [],
    };
  },
};
