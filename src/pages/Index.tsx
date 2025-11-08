import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const mockPosts = [
  {
    id: 1,
    platform: 'VK',
    author: 'Алексей Смирнов',
    avatar: 'AS',
    content: 'Только что запустил новый проект! Делюсь впечатлениями и первыми результатами 🚀',
    likes: 234,
    comments: 45,
    time: '2 часа назад',
    platformColor: 'bg-[#0077FF]'
  },
  {
    id: 2,
    platform: 'Telegram',
    author: 'Мария Петрова',
    avatar: 'МП',
    content: 'Интересная статья о развитии блогинга в 2025 году. Рекомендую к прочтению всем контент-мейкерам!',
    likes: 567,
    comments: 89,
    time: '5 часов назад',
    platformColor: 'bg-[#0088cc]'
  },
  {
    id: 3,
    platform: 'Twitter',
    author: 'Дмитрий Иванов',
    avatar: 'ДИ',
    content: 'Новые возможности для стримеров! Скоро расскажу подробнее на своём канале 🎮',
    likes: 892,
    comments: 123,
    time: '1 день назад',
    platformColor: 'bg-[#1DA1F2]'
  }
];

const mockStreams = [
  {
    id: 1,
    platform: 'Twitch',
    title: 'Прохождение новой игры',
    viewers: 1234,
    isLive: true,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop'
  },
  {
    id: 2,
    platform: 'YouTube',
    title: 'Обучающий стрим по программированию',
    viewers: 567,
    isLive: true,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop'
  }
];

const mockStats = [
  { label: 'Всего постов', value: '1,234', icon: 'FileText', change: '+12%' },
  { label: 'Просмотров', value: '45.6K', icon: 'Eye', change: '+23%' },
  { label: 'Лайков', value: '8.9K', icon: 'Heart', change: '+18%' },
  { label: 'Подписчиков', value: '2,345', icon: 'Users', change: '+8%' }
];

const connectedSocials = [
  { name: 'VK', connected: true, color: 'bg-[#0077FF]' },
  { name: 'Telegram', connected: true, color: 'bg-[#0088cc]' },
  { name: 'Twitter', connected: false, color: 'bg-[#1DA1F2]' },
  { name: 'Instagram', connected: false, color: 'bg-gradient-to-br from-purple-500 to-pink-500' }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [selectedSocialToConnect, setSelectedSocialToConnect] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [createPostDialogOpen, setCreatePostDialogOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostPlatform, setNewPostPlatform] = useState('VK');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 font-body">
      <nav className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
              <Icon name="Rss" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              StreamHub
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">Я</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-6 w-full max-w-3xl mx-auto bg-white/60 backdrop-blur-sm p-1 rounded-2xl">
            <TabsTrigger value="feed" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="socials" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Share2" size={18} className="mr-2" />
              Соцсети
            </TabsTrigger>
            <TabsTrigger value="streams" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Video" size={18} className="mr-2" />
              Стримы
            </TabsTrigger>
            <TabsTrigger value="stats" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="BarChart3" size={18} className="mr-2" />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6 animate-fade-in">
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="p-6 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-none">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-2">Лента постов</h2>
                    <p className="text-muted-foreground">Все публикации из подключенных социальных сетей в одном месте</p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-primary to-secondary whitespace-nowrap"
                    onClick={() => setCreatePostDialogOpen(true)}
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать пост
                  </Button>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск по постам..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedPlatform === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPlatform('all')}
                    className={selectedPlatform === 'all' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                  >
                    <Icon name="Grid3x3" size={16} className="mr-2" />
                    Все
                  </Button>
                  <Button
                    variant={selectedPlatform === 'VK' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPlatform('VK')}
                    className={selectedPlatform === 'VK' ? 'bg-[#0077FF] hover:bg-[#0077FF]/90' : ''}
                  >
                    VK
                  </Button>
                  <Button
                    variant={selectedPlatform === 'Telegram' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPlatform('Telegram')}
                    className={selectedPlatform === 'Telegram' ? 'bg-[#0088cc] hover:bg-[#0088cc]/90' : ''}
                  >
                    Telegram
                  </Button>
                  <Button
                    variant={selectedPlatform === 'Twitter' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPlatform('Twitter')}
                    className={selectedPlatform === 'Twitter' ? 'bg-[#1DA1F2] hover:bg-[#1DA1F2]/90' : ''}
                  >
                    Twitter
                  </Button>
                </div>
              </Card>

              {mockPosts
                .filter(post => selectedPlatform === 'all' || post.platform === selectedPlatform)
                .filter(post => 
                  searchQuery === '' || 
                  post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  post.author.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((post, index) => (
                <Card 
                  key={post.id} 
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up border-none bg-white/80 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{post.author}</p>
                          <p className="text-sm text-muted-foreground">{post.time}</p>
                        </div>
                        <Badge className={`${post.platformColor} text-white border-none`}>
                          {post.platform}
                        </Badge>
                      </div>
                      <p className="text-foreground leading-relaxed">{post.content}</p>
                      <div className="flex items-center gap-6 pt-2">
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                          <Icon name="Heart" size={20} className="group-hover:scale-110 transition-transform" />
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors group">
                          <Icon name="MessageCircle" size={20} className="group-hover:scale-110 transition-transform" />
                          <span className="font-medium">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group">
                          <Icon name="Share2" size={20} className="group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="p-8 bg-gradient-to-br from-primary via-accent to-secondary text-white border-none">
                <div className="flex items-start gap-6">
                  <Avatar className="w-24 h-24 border-4 border-white/30">
                    <AvatarFallback className="bg-white/20 text-white text-3xl font-bold">Я</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-3xl font-heading font-bold mb-2">Мой профиль</h2>
                    <p className="text-white/80 mb-4">Блогер • Стример • Контент-мейкер</p>
                    <div className="flex gap-3">
                      <Button className="bg-white text-primary hover:bg-white/90">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/20">
                        <Icon name="Share2" size={16} className="mr-2" />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-none bg-white/80 backdrop-blur-sm">
                  <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                    <Icon name="Video" className="text-primary" />
                    Активные стримы
                  </h3>
                  <div className="space-y-4">
                    {mockStreams.map((stream) => (
                      <div key={stream.id} className="relative rounded-xl overflow-hidden group cursor-pointer">
                        <img src={stream.thumbnail} alt={stream.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
                          <Badge className="w-fit bg-red-500 text-white border-none mb-2 animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full mr-2" />
                            LIVE
                          </Badge>
                          <p className="text-white font-semibold mb-1">{stream.title}</p>
                          <p className="text-white/70 text-sm flex items-center gap-1">
                            <Icon name="Users" size={14} />
                            {stream.viewers} зрителей
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 border-none bg-white/80 backdrop-blur-sm">
                  <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-secondary" />
                    Статистика
                  </h3>
                  <div className="space-y-4">
                    {mockStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-transparent hover:from-primary/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Icon name={stat.icon as any} className="text-white" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-heading font-bold">{stat.value}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-none">
                          {stat.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="socials" className="animate-fade-in">
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="p-6 bg-gradient-to-br from-secondary/10 to-accent/10 border-none">
                <h2 className="text-2xl font-heading font-bold mb-2">Подключенные соцсети</h2>
                <p className="text-muted-foreground">Управляйте интеграциями с социальными сетями</p>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                {connectedSocials.map((social, index) => (
                  <Card 
                    key={index} 
                    className="p-6 border-none bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${social.color} flex items-center justify-center text-white font-heading font-bold text-lg`}>
                          {social.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold">{social.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {social.connected ? 'Подключено' : 'Не подключено'}
                          </p>
                        </div>
                      </div>
                      {social.connected ? (
                        <Badge className="bg-green-100 text-green-700 border-none">
                          <Icon name="Check" size={14} className="mr-1" />
                          Активно
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Неактивно
                        </Badge>
                      )}
                    </div>
                    <Button 
                      className={social.connected ? "w-full" : "w-full bg-gradient-to-r from-primary to-secondary"}
                      variant={social.connected ? "outline" : "default"}
                      onClick={() => {
                        if (!social.connected) {
                          setSelectedSocialToConnect(social.name);
                          setConnectDialogOpen(true);
                        }
                      }}
                    >
                      {social.connected ? 'Настроить' : 'Подключить'}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="streams" className="animate-fade-in">
            <div className="max-w-5xl mx-auto space-y-6">
              <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-none">
                <h2 className="text-2xl font-heading font-bold mb-2">Стрим-платформы</h2>
                <p className="text-muted-foreground">Интеграция с Twitch, YouTube Live и VK Live</p>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {mockStreams.map((stream, index) => (
                  <Card 
                    key={stream.id} 
                    className="overflow-hidden border-none bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative">
                      <img src={stream.thumbnail} alt={stream.title} className="w-full aspect-video object-cover" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-500 text-white border-none animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full mr-2" />
                          LIVE
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 text-white">
                        <Icon name="Users" size={14} />
                        <span className="font-semibold">{stream.viewers}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <Badge className="mb-3 bg-primary/10 text-primary border-none">{stream.platform}</Badge>
                      <h3 className="font-heading font-semibold text-lg mb-4">{stream.title}</h3>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                        <Icon name="Play" size={16} className="mr-2" />
                        Смотреть стрим
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="animate-fade-in">
            <div className="max-w-5xl mx-auto space-y-6">
              <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-none">
                <h2 className="text-2xl font-heading font-bold mb-2">Аналитика и статистика</h2>
                <p className="text-muted-foreground">Отслеживайте активность и вовлечённость аудитории</p>
              </Card>

              <div className="grid md:grid-cols-4 gap-4">
                {mockStats.map((stat, index) => (
                  <Card 
                    key={index} 
                    className="p-6 border-none bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center`}>
                        <Icon name={stat.icon as any} className="text-white" size={20} />
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-none">
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-heading font-bold">{stat.value}</p>
                  </Card>
                ))}
              </div>

              <Card className="p-8 border-none bg-white/80 backdrop-blur-sm">
                <h3 className="font-heading font-semibold text-xl mb-6">График активности</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-primary via-accent to-secondary rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer animate-slide-up"
                        style={{ 
                          height: `${height}%`,
                          animationDelay: `${index * 50}ms`
                        }}
                      />
                      <span className="text-xs text-muted-foreground">{index + 1}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-none">
                <h2 className="text-2xl font-heading font-bold mb-2">Настройки</h2>
                <p className="text-muted-foreground">Управление профилем и интеграциями</p>
              </Card>

              <Card className="p-6 border-none bg-white/80 backdrop-blur-sm">
                <h3 className="font-heading font-semibold text-lg mb-4">Модерация контента</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-semibold">Автомодерация комментариев</p>
                      <p className="text-sm text-muted-foreground">Фильтрация нежелательных сообщений</p>
                    </div>
                    <Button variant="outline" size="sm">Настроить</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-semibold">Уведомления</p>
                      <p className="text-sm text-muted-foreground">Настройка push-уведомлений</p>
                    </div>
                    <Button variant="outline" size="sm">Настроить</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-semibold">RSS-лента</p>
                      <p className="text-sm text-muted-foreground">Настройка публичной RSS-ленты</p>
                    </div>
                    <Button variant="outline" size="sm">Включить</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Подключить {selectedSocialToConnect}</DialogTitle>
            <DialogDescription>
              Введите данные для подключения вашего аккаунта {selectedSocialToConnect}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API ключ / Токен</Label>
              <Input id="api-key" placeholder="Введите ваш API ключ" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя (опционально)</Label>
              <Input id="username" placeholder="Введите имя пользователя" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-secondary"
                onClick={() => setConnectDialogOpen(false)}
              >
                <Icon name="Check" size={16} className="mr-2" />
                Подключить
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setConnectDialogOpen(false)}
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={createPostDialogOpen} onOpenChange={setCreatePostDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Создать новый пост</DialogTitle>
            <DialogDescription>
              Напишите текст и выберите платформу для публикации
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="post-content">Текст поста</Label>
              <textarea
                id="post-content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Что у вас нового?"
                className="w-full min-h-[120px] p-3 rounded-lg border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="text-xs text-muted-foreground">{newPostContent.length} символов</p>
            </div>
            <div className="space-y-2">
              <Label>Платформа для публикации</Label>
              <div className="flex gap-2 flex-wrap">
                {['VK', 'Telegram', 'Twitter', 'Instagram'].map((platform) => (
                  <Button
                    key={platform}
                    variant={newPostPlatform === platform ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewPostPlatform(platform)}
                    className={newPostPlatform === platform ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                  >
                    {platform}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-secondary"
                onClick={() => {
                  setCreatePostDialogOpen(false);
                  setNewPostContent('');
                }}
                disabled={!newPostContent.trim()}
              >
                <Icon name="Send" size={16} className="mr-2" />
                Опубликовать
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setCreatePostDialogOpen(false);
                  setNewPostContent('');
                }}
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}