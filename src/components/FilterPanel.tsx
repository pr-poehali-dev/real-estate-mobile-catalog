import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface FilterPanelProps {
  activeTab: 'long' | 'daily';
}

const FilterPanel = ({ activeTab }: FilterPanelProps) => {
  const [priceRange, setPriceRange] = useState([50000, 500000]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState('any');
  const [furnished, setFurnished] = useState('any');

  const districts = [
    'Центр', 'Арабкир', 'Аван', 'Давидашен', 
    'Эребуни', 'Канакер-Зейтун', 'Малатия-Себастия',
    'Норк-Мараш', 'Нубарашен', 'Шенгавит'
  ];

  const toggleDistrict = (district: string) => {
    setSelectedDistricts(prev => 
      prev.includes(district) 
        ? prev.filter(d => d !== district)
        : [...prev, district]
    );
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Фильтры</h3>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Сбросить
        </Button>
      </div>

      {/* Districts */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Районы</Label>
        <div className="flex flex-wrap gap-2">
          {districts.map((district) => (
            <Badge
              key={district}
              variant={selectedDistricts.includes(district) ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => toggleDistrict(district)}
            >
              {district}
              {selectedDistricts.includes(district) && (
                <Icon name="X" size={12} className="ml-1" />
              )}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Цена {activeTab === 'daily' ? '(за сутки)' : '(за месяц)'}
        </Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={activeTab === 'daily' ? 200 : 1000000}
            min={activeTab === 'daily' ? 20 : 50000}
            step={activeTab === 'daily' ? 5 : 10000}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Input 
            type="number" 
            value={priceRange[0]} 
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            className="w-24 h-8"
          />
          <span>—</span>
          <Input 
            type="number" 
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-24 h-8"
          />
          <span className="text-muted-foreground">
            {activeTab === 'daily' ? 'USD' : 'AMD'}
          </span>
        </div>
      </div>

      <Separator />

      {/* Bedrooms */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Спальни</Label>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите количество" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Любое количество</SelectItem>
            <SelectItem value="studio">Студия</SelectItem>
            <SelectItem value="1">1 спальня</SelectItem>
            <SelectItem value="2">2 спальни</SelectItem>
            <SelectItem value="3">3 спальни</SelectItem>
            <SelectItem value="4">4+ спальни</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Furnished */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Мебель</Label>
        <Select value={furnished} onValueChange={setFurnished}>
          <SelectTrigger>
            <SelectValue placeholder="Наличие мебели" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Не важно</SelectItem>
            <SelectItem value="yes">С мебелью</SelectItem>
            <SelectItem value="no">Без мебели</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Additional filters for long-term */}
      {activeTab === 'long' && (
        <>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Животные разрешены</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Дети разрешены</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Балкон/лоджия</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Парковка</Label>
              <Switch />
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Additional filters for daily */}
      {activeTab === 'daily' && (
        <>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Моментальное бронирование</Label>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Минимум ночей</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 ночь</SelectItem>
                  <SelectItem value="2">2 ночи</SelectItem>
                  <SelectItem value="3">3 ночи</SelectItem>
                  <SelectItem value="7">7 ночей</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Apply button */}
      <Button className="w-full">
        Применить фильтры
      </Button>
    </div>
  );
};

export default FilterPanel;