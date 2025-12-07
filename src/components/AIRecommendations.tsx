import { Nutrition } from '@/types';
import { Sparkles } from 'lucide-react';

interface AIRecommendationsProps {
  todayNutrition: Nutrition;
  dailyGoal: Nutrition;
}

export const AIRecommendations = ({ todayNutrition, dailyGoal }: AIRecommendationsProps) => {
  const remaining = {
    calories: dailyGoal.calories - todayNutrition.calories,
    protein: dailyGoal.protein - todayNutrition.protein,
    carbs: dailyGoal.carbs - todayNutrition.carbs,
    fat: dailyGoal.fat - todayNutrition.fat,
  };

  const generateRecommendations = () => {
    const recommendations: string[] = [];

    if (remaining.calories > 500) {
      recommendations.push('今天还有较多热量空间，可以享受一顿丰盛的晚餐！');
    } else if (remaining.calories > 0) {
      recommendations.push('今天热量摄入适中，建议选择清淡的晚餐。');
    } else {
      recommendations.push('今天已达到热量目标，建议选择低卡食物或增加运动。');
    }

    if (remaining.protein > 20) {
      recommendations.push('🥩 蛋白质还需补充，推荐：鸡胸肉、鱼类、豆腐');
    }

    if (remaining.carbs < 0) {
      recommendations.push('🥗 碳水摄入较多，晚餐可以多吃蔬菜和瘦肉');
    }

    if (todayNutrition.protein / todayNutrition.calories < 0.15 && todayNutrition.calories > 500) {
      recommendations.push('💪 蛋白质比例偏低，建议增加优质蛋白摄入');
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();
  const suggestedFoods = [
    { name: '烤鸡胸肉配蔬菜沙拉', calories: 350, protein: 45, emoji: '🥗' },
    { name: '三文鱼配糙米饭', calories: 450, protein: 35, emoji: '🍱' },
    { name: '豆腐蔬菜汤', calories: 200, protein: 15, emoji: '🍲' },
    { name: '牛油果吐司配水煮蛋', calories: 320, protein: 18, emoji: '🥑' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">AI 智能推荐</h2>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-muted/50 rounded-xl p-3 text-sm text-foreground animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {rec}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
        <h3 className="font-semibold text-foreground mb-4">推荐食物</h3>
        <div className="grid grid-cols-1 gap-3">
          {suggestedFoods.map((food, index) => (
            <div
              key={index}
              className="bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-smooth cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{food.emoji}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{food.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {food.calories} 卡路里 · {food.protein}g 蛋白质
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
