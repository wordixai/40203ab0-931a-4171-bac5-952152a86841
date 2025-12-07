import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NutritionCircle } from '@/components/NutritionCircle';
import { FoodCard } from '@/components/FoodCard';
import { AddFoodDialog } from '@/components/AddFoodDialog';
import { AIRecommendations } from '@/components/AIRecommendations';
import { storageUtils } from '@/utils/storage';
import { FoodEntry, Nutrition } from '@/types';
import { getTodayString, formatDisplayDate } from '@/utils/dateHelpers';
import { Home, Sparkles, BarChart3, Utensils } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [profile] = useState(() => storageUtils.getUserProfile() || storageUtils.getDefaultProfile());
  const [currentDate] = useState(getTodayString());

  useEffect(() => {
    loadEntries();
  }, [currentDate]);

  const loadEntries = () => {
    const todayEntries = storageUtils.getFoodEntriesByDate(currentDate);
    setEntries(todayEntries.sort((a, b) => b.timestamp - a.timestamp));
  };

  const handleAddEntry = (entry: FoodEntry) => {
    storageUtils.saveFoodEntry(entry);
    loadEntries();
    toast.success('食物记录已添加！');
  };

  const handleDeleteEntry = (id: string) => {
    storageUtils.deleteFoodEntry(id);
    loadEntries();
    toast.success('记录已删除');
  };

  const calculateTodayNutrition = (): Nutrition => {
    return entries.reduce(
      (acc, entry) => ({
        calories: acc.calories + entry.nutrition.calories,
        protein: acc.protein + entry.nutrition.protein,
        carbs: acc.carbs + entry.nutrition.carbs,
        fat: acc.fat + entry.nutrition.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const todayNutrition = calculateTodayNutrition();
  const entriesByMeal = {
    早餐: entries.filter((e) => e.mealType === '早餐'),
    午餐: entries.filter((e) => e.mealType === '午餐'),
    晚餐: entries.filter((e) => e.mealType === '晚餐'),
    加餐: entries.filter((e) => e.mealType === '加餐'),
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="gradient-warm text-primary-foreground pt-8 pb-6 px-6 rounded-b-[2rem] shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">美食记录</h1>
              <p className="text-primary-foreground/80 text-sm">{formatDisplayDate(currentDate)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-4">
        {/* Nutrition Overview */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">今日营养</h2>
          <div className="grid grid-cols-4 gap-4">
            <NutritionCircle
              label="卡路里"
              current={todayNutrition.calories}
              goal={profile.dailyGoal.calories}
              color="hsl(var(--chart-calories))"
              unit="kcal"
            />
            <NutritionCircle
              label="蛋白质"
              current={todayNutrition.protein}
              goal={profile.dailyGoal.protein}
              color="hsl(var(--chart-protein))"
              unit="g"
            />
            <NutritionCircle
              label="碳水"
              current={todayNutrition.carbs}
              goal={profile.dailyGoal.carbs}
              color="hsl(var(--chart-carbs))"
              unit="g"
            />
            <NutritionCircle
              label="脂肪"
              current={todayNutrition.fat}
              goal={profile.dailyGoal.fat}
              color="hsl(var(--chart-fat))"
              unit="g"
            />
          </div>
        </div>

        {/* Add Food Button */}
        <div className="mb-6">
          <AddFoodDialog onAdd={handleAddEntry} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl">
            <TabsTrigger value="today" className="rounded-lg">
              <Home className="w-4 h-4 mr-2" />
              今日记录
            </TabsTrigger>
            <TabsTrigger value="ai" className="rounded-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              AI推荐
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {entries.length === 0 ? (
              <div className="bg-card rounded-2xl p-12 text-center border border-border">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Utensils className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-2">还没有记录哦</p>
                <p className="text-sm text-muted-foreground">点击上方按钮开始记录您的美食吧！</p>
              </div>
            ) : (
              <>
                {(['早餐', '午餐', '晚餐', '加餐'] as const).map(
                  (mealType) =>
                    entriesByMeal[mealType].length > 0 && (
                      <div key={mealType} className="space-y-3">
                        <h3 className="text-sm font-semibold text-muted-foreground px-2">{mealType}</h3>
                        <div className="space-y-3">
                          {entriesByMeal[mealType].map((entry) => (
                            <FoodCard key={entry.id} entry={entry} onDelete={handleDeleteEntry} />
                          ))}
                        </div>
                      </div>
                    )
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="ai">
            <AIRecommendations todayNutrition={todayNutrition} dailyGoal={profile.dailyGoal} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
