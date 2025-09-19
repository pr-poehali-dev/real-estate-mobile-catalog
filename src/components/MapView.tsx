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

interface MapViewProps {
  properties: Property[];
}

const MapView = ({ properties }: MapViewProps) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-green-50">
        {/* Simulated map grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300/50"></div>
            ))}
          </div>
        </div>
        
        {/* Streets simulation */}
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400/30"></div>
        <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-400/30"></div>
        <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-gray-400/30"></div>
        <div className="absolute top-0 bottom-0 right-1/4 w-1 bg-gray-400/30"></div>
      </div>

      {/* Property Markers */}
      {properties.map((property, index) => (
        <div
          key={property.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{
            left: `${30 + (index * 15) % 40}%`,
            top: `${25 + (index * 20) % 50}%`,
          }}
        >
          {/* Price Marker */}
          <div className="relative">
            <div className="bg-white border-2 border-primary rounded-full p-2 shadow-lg group-hover:shadow-xl transition-shadow">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
            </div>
            
            {/* Price Label */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
              {property.price.toLocaleString()} {property.currency}
            </div>
          </div>

          {/* Property Card on Hover */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Card className="w-64 shadow-xl border-2">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {property.title}
                    </h4>
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {property.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center">
                          <Icon name="Bed" size={12} className="mr-1" />
                          {property.bedrooms}
                        </div>
                        <div className="flex items-center">
                          <Icon name="Maximize" size={12} className="mr-1" />
                          {property.sqm} м²
                        </div>
                      </div>
                      <Button size="sm" className="h-6 px-2 text-xs">
                        Открыть
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button size="sm" variant="outline" className="bg-white/90 p-2">
          <Icon name="Plus" size={16} />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 p-2">
          <Icon name="Minus" size={16} />
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
        <div className="text-xs text-muted-foreground mb-2">Легенда:</div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Доступно</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-muted rounded-full"></div>
            <span>Занято</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;