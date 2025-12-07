import { FoodEntry } from '@/types';
import { formatTime } from '@/utils/dateHelpers';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface FoodCardProps {
  entry: FoodEntry;
  onDelete: (id: string) => void;
}

export const FoodCard = ({ entry, onDelete }: FoodCardProps) => {
  const getMealColor = (mealType: string) => {
    switch (mealType) {
      case '早餐':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case '午餐':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case '晚餐':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case '加餐':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-smooth border border-border animate-slide-up">
      <div className="flex items-start gap-3">
        {entry.photo && (
          <img
            src={entry.photo}
            alt={entry.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-1 rounded-lg font-medium border ${getMealColor(entry.mealType)}`}>
              {entry.mealType}
            </span>
            <span className="text-xs text-muted-foreground">{formatTime(entry.timestamp)}</span>
          </div>
          <h3 className="font-semibold text-foreground mb-2">{entry.name}</h3>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="text-primary font-bold">{entry.nutrition.calories}</span>
              <span className="text-muted-foreground text-xs ml-1">卡路里</span>
            </div>
            <div className="text-muted-foreground text-xs">
              蛋白质 {entry.nutrition.protein}g · 碳水 {entry.nutrition.carbs}g · 脂肪 {entry.nutrition.fat}g
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(entry.id)}
          className="text-muted-foreground hover:text-destructive shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
