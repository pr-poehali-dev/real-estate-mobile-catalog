import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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

interface PropertyCardProps {
  property: Property;
  currency: 'AMD' | 'USD';
}

const PropertyCard = ({ property, currency }: PropertyCardProps) => {
  const getTypeLabel = (type: string) => {
    const labels = {
      apartment: 'Квартира',
      house: 'Дом',
      room: 'Комната',
      commercial: 'Коммерция'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const formatPrice = (price: number, originalCurrency: 'AMD' | 'USD', displayCurrency: 'AMD' | 'USD') => {
    if (originalCurrency === displayCurrency) {
      return `${price.toLocaleString()} ${displayCurrency}`;
    }
    
    const exchangeRate = 385;
    const convertedPrice = originalCurrency === 'USD' 
      ? Math.round(price * exchangeRate)
      : Math.round(price / exchangeRate);
    
    return `${convertedPrice.toLocaleString()} ${displayCurrency}`;
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-black">
            {getTypeLabel(property.type)}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
            <Icon name="Heart" size={16} />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 mb-1">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <Icon name="MapPin" size={14} className="mr-1" />
              {property.location}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Icon name="Bed" size={14} className="mr-1" />
                {property.bedrooms}
              </div>
              <div className="flex items-center">
                <Icon name="Maximize" size={14} className="mr-1" />
                {property.sqm} м²
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(property.price, property.currency, currency)}
              </span>
              {property.rentType === 'daily' && (
                <span className="text-muted-foreground text-sm ml-1">/сутки</span>
              )}
              {property.rentType === 'long' && (
                <span className="text-muted-foreground text-sm ml-1">/месяц</span>
              )}
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Подробнее
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;