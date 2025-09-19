import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import PhotoUploader from '@/components/PhotoUploader';
import Icon from '@/components/ui/icon';

interface PropertyFormData {
  title: string;
  type: 'apartment' | 'house' | 'room' | 'commercial';
  rentType: 'long' | 'daily';
  price: string;
  currency: 'AMD' | 'USD';
  location: string;
  district: string;
  bedrooms: string;
  sqm: string;
  floor: string;
  totalFloors: string;
  description: string;
  furnished: boolean;
  pets: boolean;
  kids: boolean;
  balcony: boolean;
  parking: boolean;
  bathType: 'bath' | 'shower' | 'combined' | 'separate';
  hasYard: boolean;
  houseType: 'full' | 'part';
  photos: any[];
}

const AddPropertyForm = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    type: 'apartment',
    rentType: 'long',
    price: '',
    currency: 'AMD',
    location: '',
    district: '',
    bedrooms: '',
    sqm: '',
    floor: '',
    totalFloors: '',
    description: '',
    furnished: false,
    pets: false,
    kids: false,
    balcony: false,
    parking: false,
    bathType: 'combined',
    hasYard: false,
    houseType: 'full',
    photos: []
  });

  const districts = [
    'Центр', 'Арабкир', 'Аван', 'Давидашен', 
    'Эребуни', 'Канакер-Зейтун', 'Малатия-Себастия',
    'Норк-Мараш', 'Нубарашен', 'Шенгавит'
  ];

  const handleInputChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Property data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Plus" size={20} />
            Добавить новый объект
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название объявления *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Современная квартира в центре"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Тип объекта *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Квартира</SelectItem>
                  <SelectItem value="house">Дом</SelectItem>
                  <SelectItem value="room">Комната</SelectItem>
                  <SelectItem value="commercial">Коммерция</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentType">Тип аренды *</Label>
              <Select value={formData.rentType} onValueChange={(value) => handleInputChange('rentType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">Долгосрочная</SelectItem>
                  <SelectItem value="daily">Посуточная</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">Район *</Label>
              <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите район" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Точный адрес</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="ул. Абовяна 10, кв. 25"
            />
          </div>

          <Separator />

          {/* Price and Size */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Цена *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="180000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Валюта</Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AMD">AMD</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Спальни *</Label>
              <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Количество" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Студия</SelectItem>
                  <SelectItem value="1">1 спальня</SelectItem>
                  <SelectItem value="2">2 спальни</SelectItem>
                  <SelectItem value="3">3 спальни</SelectItem>
                  <SelectItem value="4">4 спальни</SelectItem>
                  <SelectItem value="5">5+ спален</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sqm">Площадь, м² *</Label>
              <Input
                id="sqm"
                type="number"
                value={formData.sqm}
                onChange={(e) => handleInputChange('sqm', e.target.value)}
                placeholder="65"
                required
              />
            </div>
          </div>

          {/* Apartment/Room specific fields */}
          {(formData.type === 'apartment' || formData.type === 'room') && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="floor">Этаж</Label>
                  <Input
                    id="floor"
                    type="number"
                    value={formData.floor}
                    onChange={(e) => handleInputChange('floor', e.target.value)}
                    placeholder="5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalFloors">Этажность дома</Label>
                  <Input
                    id="totalFloors"
                    type="number"
                    value={formData.totalFloors}
                    onChange={(e) => handleInputChange('totalFloors', e.target.value)}
                    placeholder="9"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathType">Ванна/душ *</Label>
                  <Select value={formData.bathType} onValueChange={(value) => handleInputChange('bathType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bath">Ванна</SelectItem>
                      <SelectItem value="shower">Душ</SelectItem>
                      <SelectItem value="combined">Совмещённый санузел</SelectItem>
                      <SelectItem value="separate">Раздельный санузел</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {/* House specific fields */}
          {formData.type === 'house' && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="houseType">Тип аренды дома *</Label>
                  <Select value={formData.houseType} onValueChange={(value) => handleInputChange('houseType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Весь дом</SelectItem>
                      <SelectItem value="part">Часть дома</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasYard"
                    checked={formData.hasYard}
                    onCheckedChange={(checked) => handleInputChange('hasYard', checked)}
                  />
                  <Label htmlFor="hasYard">Есть собственный двор</Label>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Amenities */}
          <div>
            <h3 className="font-medium mb-4">Удобства и особенности</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="furnished"
                  checked={formData.furnished}
                  onCheckedChange={(checked) => handleInputChange('furnished', checked)}
                />
                <Label htmlFor="furnished">С мебелью</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="pets"
                  checked={formData.pets}
                  onCheckedChange={(checked) => handleInputChange('pets', checked)}
                />
                <Label htmlFor="pets">Можно с животными</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="kids"
                  checked={formData.kids}
                  onCheckedChange={(checked) => handleInputChange('kids', checked)}
                />
                <Label htmlFor="kids">Можно с детьми</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="balcony"
                  checked={formData.balcony}
                  onCheckedChange={(checked) => handleInputChange('balcony', checked)}
                />
                <Label htmlFor="balcony">Балкон/лоджия</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="parking"
                  checked={formData.parking}
                  onCheckedChange={(checked) => handleInputChange('parking', checked)}
                />
                <Label htmlFor="parking">Парковка</Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Описание *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Подробное описание объекта, его особенностей и преимуществ..."
              rows={4}
              required
            />
          </div>

          <Separator />

          {/* Photos */}
          <div>
            <Label className="text-base font-medium">Фотографии *</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Добавьте качественные фото объекта. Первое фото станет главным.
            </p>
            <PhotoUploader
              onFilesUploaded={(files) => handleInputChange('photos', files)}
              maxFiles={15}
            />
          </div>

          <Separator />

          {/* Submit */}
          <div className="flex items-center gap-4">
            <Button type="submit" size="lg" className="flex-1">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить объект
            </Button>
            <Button type="button" variant="outline" size="lg">
              Предварительный просмотр
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default AddPropertyForm;