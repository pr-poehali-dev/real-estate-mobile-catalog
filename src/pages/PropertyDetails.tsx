import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const PropertyDetails = () => {
  const { id } = useParams();

  const mockProperty = {
    id: '1',
    title: 'Современная квартира в центре Еревана',
    price: 180000,
    currency: 'AMD' as const,
    location: 'Центр, Ереван',
    bedrooms: 2,
    sqm: 65,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800'
    ],
    type: 'apartment' as const,
    rentType: 'long' as const,
    coordinates: [40.1833, 44.5167] as [number, number],
    description: 'Прекрасная современная квартира в самом центре Еревана. Полностью меблирована, с евроремонтом. Рядом остановки общественного транспорта, магазины, рестораны.',
    amenities: ['Wi-Fi', 'Кондиционер', 'Стиральная машина', 'Холодильник', 'Телевизор', 'Парковка'],
    floor: 5,
    totalFloors: 9,
    furnished: true,
    pets: false,
    deposit: 1
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <Icon name="ArrowLeft" size={16} />
              Назад
            </Button>
            <h1 className="text-xl font-bold text-primary">Детали объекта</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <img 
                    src={mockProperty.images[0]} 
                    alt="Main"
                    className="w-full h-64 md:h-80 object-cover rounded-tl-lg rounded-bl-lg md:rounded-bl-lg"
                  />
                  <div className="grid grid-rows-2 gap-2">
                    <img 
                      src={mockProperty.images[1]} 
                      alt="Interior 1"
                      className="w-full h-32 md:h-40 object-cover rounded-tr-lg"
                    />
                    <img 
                      src={mockProperty.images[2]} 
                      alt="Interior 2"
                      className="w-full h-32 md:h-40 object-cover rounded-br-lg"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <Button variant="outline" size="sm">
                    <Icon name="Image" size={16} className="mr-2" />
                    Показать все фото ({mockProperty.images.length})
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Property Info */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-2xl font-bold mb-2">{mockProperty.title}</h1>
                        <div className="flex items-center text-muted-foreground">
                          <Icon name="MapPin" size={16} className="mr-2" />
                          {mockProperty.location}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="Heart" size={16} />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Квартира</Badge>
                      <Badge variant="secondary">Долгосрочная аренда</Badge>
                      {mockProperty.furnished && <Badge variant="secondary">С мебелью</Badge>}
                    </div>
                  </div>

                  <Separator />

                  {/* Key Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Icon name="Bed" size={24} className="mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{mockProperty.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">спальни</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Icon name="Maximize" size={24} className="mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{mockProperty.sqm}</div>
                      <div className="text-sm text-muted-foreground">м²</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Icon name="Building" size={24} className="mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{mockProperty.floor}</div>
                      <div className="text-sm text-muted-foreground">из {mockProperty.totalFloors} этажей</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Icon name="Calendar" size={24} className="mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{mockProperty.deposit}</div>
                      <div className="text-sm text-muted-foreground">месяц залог</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-3">Описание</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {mockProperty.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Amenities */}
                  <div>
                    <h3 className="font-semibold mb-3">Удобства</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {mockProperty.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          <Icon name="Check" size={16} className="text-secondary mr-2" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {mockProperty.price.toLocaleString()} {mockProperty.currency}
                    </div>
                    <div className="text-muted-foreground">в месяц</div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Залог:</span>
                      <span>{(mockProperty.price * mockProperty.deposit).toLocaleString()} {mockProperty.currency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Коммуналка:</span>
                      <span>Отдельно</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Icon name="Phone" size={16} className="mr-2" />
                      Связаться с владельцем
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Написать сообщение
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    <Icon name="Shield" size={12} className="inline mr-1" />
                    Безопасная сделка через платформу
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Контактная информация</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Арам Петросян</div>
                      <div className="text-sm text-muted-foreground">Собственник</div>
                      <div className="text-sm text-muted-foreground">На платформе с 2023</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Star" size={14} className="text-yellow-500" />
                      <span>4.8 (12 отзывов)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={14} className="text-muted-foreground" />
                      <span>Обычно отвечает в течение часа</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;