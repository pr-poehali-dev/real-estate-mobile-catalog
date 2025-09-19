import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const mockAnalytics = {
    totalViews: 1247,
    totalProperties: 34,
    conversions: 8.3,
    revenue: 2450000,
    topDistricts: [
      { name: 'Центр', views: 423, properties: 8 },
      { name: 'Арабкир', views: 312, properties: 12 },
      { name: 'Аван', views: 287, properties: 6 },
      { name: 'Давидашен', views: 225, properties: 8 }
    ],
    recentActivity: [
      { type: 'view', property: 'Квартира в центре', time: '5 мин назад' },
      { type: 'contact', property: 'Дом в Арабкире', time: '15 мин назад' },
      { type: 'view', property: 'Студия у моря', time: '32 мин назад' },
      { type: 'favorite', property: 'Коммерция в центре', time: '1 час назад' }
    ]
  };

  const mockProperties = [
    { id: 1, title: 'Современная квартира', status: 'active', views: 156, contacts: 8 },
    { id: 2, title: 'Уютный дом с садом', status: 'active', views: 89, contacts: 12 },
    { id: 3, title: 'Студия у моря', status: 'paused', views: 234, contacts: 3 },
    { id: 4, title: 'Офисное помещение', status: 'active', views: 67, contacts: 2 }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/">
                  <Icon name="ArrowLeft" size={16} />
                  На главную
                </a>
              </Button>
              <h1 className="text-xl font-bold text-primary">Панель управления</h1>
            </div>
            <Button>
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить объект
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="properties">Объекты</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Всего просмотров</p>
                      <p className="text-2xl font-bold">{mockAnalytics.totalViews.toLocaleString()}</p>
                    </div>
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="Eye" className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Icon name="TrendingUp" className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+12.5% за месяц</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Активных объектов</p>
                      <p className="text-2xl font-bold">{mockAnalytics.totalProperties}</p>
                    </div>
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon name="Home" className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Icon name="Plus" className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600">+3 за неделю</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Конверсия</p>
                      <p className="text-2xl font-bold">{mockAnalytics.conversions}%</p>
                    </div>
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Icon name="Target" className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Icon name="TrendingUp" className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+2.1% за месяц</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Доход</p>
                      <p className="text-2xl font-bold">{(mockAnalytics.revenue / 1000).toFixed(0)}K AMD</p>
                    </div>
                    <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Icon name="DollarSign" className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Icon name="TrendingUp" className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+8.2% за месяц</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Districts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" size={20} />
                    Популярные районы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.topDistricts.map((district, index) => (
                      <div key={district.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium">#{index + 1}</div>
                          <div>
                            <div className="font-medium">{district.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {district.properties} объектов
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{district.views}</div>
                          <div className="text-sm text-muted-foreground">просмотров</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Activity" size={20} />
                    Последняя активность
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'view' ? 'bg-blue-500' :
                          activity.type === 'contact' ? 'bg-green-500' :
                          'bg-yellow-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{activity.property}</div>
                          <div className="text-xs text-muted-foreground">
                            {activity.type === 'view' ? 'Просмотр' :
                             activity.type === 'contact' ? 'Обращение' : 'В избранное'}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Мои объекты</span>
                  <Button size="sm">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProperties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Icon name="Home" size={24} className="text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium">{property.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                              {property.status === 'active' ? 'Активно' : 'Приостановлено'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-semibold">{property.views}</div>
                          <div className="text-muted-foreground">просмотров</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{property.contacts}</div>
                          <div className="text-muted-foreground">обращений</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки аккаунта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Уведомления</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Новые просмотры объектов</span>
                      <Button variant="outline" size="sm">Включено</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Обращения клиентов</span>
                      <Button variant="outline" size="sm">Включено</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Еженедельная аналитика</span>
                      <Button variant="outline" size="sm">Включено</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Валюта по умолчанию</h3>
                  <div className="flex gap-2">
                    <Button variant="default" size="sm">AMD</Button>
                    <Button variant="outline" size="sm">USD</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;