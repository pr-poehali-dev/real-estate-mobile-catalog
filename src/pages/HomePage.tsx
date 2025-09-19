import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import PropertyCard from '@/components/PropertyCard';
import FilterPanel from '@/components/FilterPanel';
import MapView from '@/components/MapView';

interface Property {
  id: string;
  title: string;
  price: number;
  currency: 'AMD' | 'USD';
  location: string;
  bedrooms: number;
  sqm: number;
  images: string[];
  type: 'apartment' | 'house' | 'room' | 'commercial';
  rentType: 'long' | 'daily';
  coordinates: [number, number];
}

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Современная квартира в центре',
    price: 180000,
    currency: 'AMD',
    location: 'Центр, Ереван',
    bedrooms: 2,
    sqm: 65,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
    type: 'apartment',
    rentType: 'long',
    coordinates: [40.1833, 44.5167]
  },
  {
    id: '2',
    title: 'Уютный дом с садом',
    price: 350,
    currency: 'USD',
    location: 'Арабкир, Ереван',
    bedrooms: 3,
    sqm: 120,
    images: ['https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400'],
    type: 'house',
    rentType: 'long',
    coordinates: [40.2000, 44.5333]
  },
  {
    id: '3',
    title: 'Студия у моря',
    price: 45,
    currency: 'USD',
    location: 'Батуми',
    bedrooms: 1,
    sqm: 35,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'],
    type: 'apartment',
    rentType: 'daily',
    coordinates: [41.6168, 41.6367]
  }
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'long' | 'daily'>('long');
  const [currency, setCurrency] = useState<'AMD' | 'USD'>('AMD');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filteredProperties = mockProperties.filter(
    property => property.rentType === activeTab
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-primary">RealEstate</h1>
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-1">
                <Button
                  variant={currency === 'AMD' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrency('AMD')}
                >
                  AMD
                </Button>
                <Button
                  variant={currency === 'USD' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrency('USD')}
                >
                  USD
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex-1 max-w-md hidden md:block">
                <div className="relative">
                  <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Поиск по адресу или району..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button variant="outline" size="sm" asChild>
                <a href="/admin">
                  <Icon name="Settings" size={16} />
                  <span className="hidden md:inline ml-2">Админ</span>
                </a>
              </Button>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Поиск по адресу или району..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'long' | 'daily')} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="long">Долгосрочная аренда</TabsTrigger>
              <TabsTrigger value="daily">Посуточно</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Icon name="Filter" size={16} />
                    Фильтры
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <FilterPanel activeTab={activeTab} />
                </SheetContent>
              </Sheet>
              
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <Icon name="List" size={16} />
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <Icon name="Map" size={16} />
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="long" className="space-y-0">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Найдено:</span>
                <Badge variant="secondary">{filteredProperties.length} объектов</Badge>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Показать {filteredProperties.length}
              </Button>
            </div>
            
            {viewMode === 'list' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} currency={currency} />
                ))}
              </div>
            ) : (
              <div className="h-[600px] rounded-lg overflow-hidden">
                <MapView properties={filteredProperties} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="daily" className="space-y-0">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Найдено:</span>
                <Badge variant="secondary">{filteredProperties.length} объектов</Badge>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Показать {filteredProperties.length}
              </Button>
            </div>
            
            {viewMode === 'list' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} currency={currency} />
                ))}
              </div>
            ) : (
              <div className="h-[600px] rounded-lg overflow-hidden">
                <MapView properties={filteredProperties} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;