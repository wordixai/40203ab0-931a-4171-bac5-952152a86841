import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Camera } from 'lucide-react';
import { FoodEntry, MealType } from '@/types';
import { getTodayString } from '@/utils/dateHelpers';

interface AddFoodDialogProps {
  onAdd: (entry: FoodEntry) => void;
}

export const AddFoodDialog = ({ onAdd }: AddFoodDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [mealType, setMealType] = useState<MealType>('午餐');
  const [portion, setPortion] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [photo, setPhoto] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name || !calories) return;

    const entry: FoodEntry = {
      id: Date.now().toString(),
      name,
      mealType,
      portion: portion || '1份',
      nutrition: {
        calories: Number(calories),
        protein: Number(protein) || 0,
        carbs: Number(carbs) || 0,
        fat: Number(fat) || 0,
      },
      photo: photo || undefined,
      timestamp: Date.now(),
      date: getTodayString(),
    };

    onAdd(entry);

    // 重置表单
    setName('');
    setPortion('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setPhoto('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="cute" className="w-full">
          <Plus className="w-5 h-5" />
          添加食物
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>记录美食</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">食物名称 *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：番茄炒蛋"
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meal">餐次</Label>
            <Select value={mealType} onValueChange={(value) => setMealType(value as MealType)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="早餐">早餐</SelectItem>
                <SelectItem value="午餐">午餐</SelectItem>
                <SelectItem value="晚餐">晚餐</SelectItem>
                <SelectItem value="加餐">加餐</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portion">份量</Label>
            <Input
              id="portion"
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              placeholder="例如：1碗、150g"
              className="rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories">卡路里 *</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="kcal"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protein">蛋白质</Label>
              <Input
                id="protein"
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="g"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carbs">碳水化合物</Label>
              <Input
                id="carbs"
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="g"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">脂肪</Label>
              <Input
                id="fat"
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                placeholder="g"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>添加照片</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <Camera className="w-4 h-4 mr-2" />
                {photo ? '更换照片' : '拍照/上传'}
              </Button>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
            {photo && (
              <img src={photo} alt="Preview" className="w-full h-32 object-cover rounded-xl mt-2" />
            )}
          </div>

          <Button onClick={handleSubmit} className="w-full rounded-xl" size="lg" disabled={!name || !calories}>
            保存记录
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
