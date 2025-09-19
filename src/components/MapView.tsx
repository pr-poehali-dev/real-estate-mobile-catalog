import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import IconComponent from '@/components/ui/icon';
import 'leaflet/dist/leaflet.css';

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
  useEffect(() => {
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const createCustomIcon = (price: number, currency: string) => {
    return divIcon({
      html: `
        <div style="
          background: #2563eb; 
          color: white; 
          padding: 4px 8px; 
          border-radius: 16px; 
          font-size: 12px; 
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          border: 2px solid white;
        ">
          ${price.toLocaleString()} ${currency}
        </div>
      `,
      className: 'custom-price-marker',
      iconSize: [80, 30],
      iconAnchor: [40, 30],
    });
  };

  const defaultCenter: [number, number] = [40.1833, 44.5167];

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={property.coordinates}
            icon={createCustomIcon(property.price, property.currency)}
          >
            <Popup>
              <Card className="border-0 shadow-none">
                <CardContent className="p-3 w-64">
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
                        <IconComponent name="MapPin" size={12} className="mr-1" />
                        {property.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <div className="flex items-center">
                            <IconComponent name="Bed" size={12} className="mr-1" />
                            {property.bedrooms}
                          </div>
                          <div className="flex items-center">
                            <IconComponent name="Maximize" size={12} className="mr-1" />
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
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;