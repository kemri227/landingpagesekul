import React, { useState, useEffect } from 'react'
import { Typography, Card, List, Tag, Empty, Spin, Badge, Button } from 'antd'
import { Calendar, MapPin, Users, Clock, Star, ArrowRight, Sparkles, Trophy, Heart, TreePine } from 'lucide-react'
import { supabase } from '../../config/supabase'
import dayjs from 'dayjs'

const { Title, Paragraph } = Typography

interface Event {
  id: string
  title: string
  description: string
  date: string
  image_url?: string
  created_at: string
}

// Enhanced sample data for when Supabase is not connected
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Festival Seni dan Budaya 2025',
    description: 'Acara tahunan yang menampilkan berbagai pertunjukan seni dari siswa-siswi SMA Nusantara. Mulai dari tari tradisional, musik modern, hingga pameran karya seni rupa yang memukau. Mari rayakan keberagaman budaya Indonesia!',
    date: '2025-03-15',
    image_url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Olimpiade Sains Nasional 2025',
    description: 'Kompetisi sains tingkat nasional untuk siswa SMA terbaik. Bidang yang dilombakan meliputi Matematika, Fisika, Kimia, dan Biologi. Kesempatan emas untuk meraih prestasi nasional!',
    date: '2025-04-20',
    image_url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    title: 'Bakti Sosial Lingkungan Hijau',
    description: 'Kegiatan membersihkan lingkungan sekitar sekolah dan penanaman pohon untuk menjaga kelestarian alam. Bersama-sama membangun lingkungan yang lebih hijau dan berkelanjutan.',
    date: '2025-02-28',
    image_url: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '4',
    title: 'Workshop Teknologi Digital',
    description: 'Pelatihan intensif tentang teknologi terkini termasuk coding, robotika, dan AI. Mempersiapkan siswa untuk menghadapi era digital dengan percaya diri.',
    date: '2025-05-10',
    image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: '5',
    title: 'Turnamen Olahraga Antar Sekolah',
    description: 'Kompetisi olahraga bergengsi yang mempertemukan sekolah-sekolah terbaik. Cabang yang dilombakan: basket, voli, sepak bola, dan badminton.',
    date: '2025-06-05',
    image_url: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: '6',
    title: 'Career Day & University Fair',
    description: 'Pameran perguruan tinggi dan seminar karir untuk membantu siswa merencanakan masa depan. Hadiri sesi dengan profesional dari berbagai bidang.',
    date: '2025-07-15',
    image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: new Date(Date.now() - 432000000).toISOString()
  }
]

export const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url' || supabaseKey === 'your-supabase-anon-key') {
        console.log('Supabase not configured, using sample data')
        setEvents(sampleEvents)
        setLoading(false)
        return
      }
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        setEvents(sampleEvents)
      } else {
        setEvents(data && data.length > 0 ? data : sampleEvents)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      setEvents(sampleEvents)
    } finally {
      setLoading(false)
    }
  }

  const getEventIcon = (title: string) => {
    if (title.toLowerCase().includes('seni') || title.toLowerCase().includes('budaya')) return <Sparkles className="w-5 h-5 text-white" />
    if (title.toLowerCase().includes('olimpiade') || title.toLowerCase().includes('kompetisi')) return <Trophy className="w-5 h-5 text-white" />
    if (title.toLowerCase().includes('bakti') || title.toLowerCase().includes('sosial')) return <Heart className="w-5 h-5 text-white" />
    if (title.toLowerCase().includes('teknologi') || title.toLowerCase().includes('digital')) return <Star className="w-5 h-5 text-white" />
    if (title.toLowerCase().includes('olahraga') || title.toLowerCase().includes('turnamen')) return <Trophy className="w-5 h-5 text-white" />
    if (title.toLowerCase().includes('career') || title.toLowerCase().includes('university')) return <Star className="w-5 h-5 text-white" />
    return <Calendar className="w-5 h-5 text-white" />
  }

  const getEventCategory = (title: string) => {
    if (title.toLowerCase().includes('seni') || title.toLowerCase().includes('budaya')) return { name: 'Seni & Budaya', color: '#ec4899' }
    if (title.toLowerCase().includes('olimpiade') || title.toLowerCase().includes('kompetisi')) return { name: 'Kompetisi', color: '#f59e0b' }
    if (title.toLowerCase().includes('bakti') || title.toLowerCase().includes('sosial')) return { name: 'Sosial', color: '#10b981' }
    if (title.toLowerCase().includes('teknologi') || title.toLowerCase().includes('digital')) return { name: 'Teknologi', color: '#3b82f6' }
    if (title.toLowerCase().includes('olahraga') || title.toLowerCase().includes('turnamen')) return { name: 'Olahraga', color: '#ef4444' }
    if (title.toLowerCase().includes('career') || title.toLowerCase().includes('university')) return { name: 'Karir', color: '#8b5cf6' }
    return { name: 'Event', color: '#6b7280' }
  }

  const getCardGradient = (index: number) => {
    const gradients = [
      'from-pink-50 via-white to-rose-50',
      'from-yellow-50 via-white to-orange-50',
      'from-green-50 via-white to-emerald-50',
      'from-blue-50 via-white to-cyan-50',
      'from-red-50 via-white to-pink-50',
      'from-purple-50 via-white to-violet-50'
    ]
    return gradients[index % gradients.length]
  }

  const getIconGradient = (index: number) => {
    const gradients = [
      'from-pink-500 to-rose-600',
      'from-yellow-500 to-orange-600',
      'from-green-500 to-emerald-600',
      'from-blue-500 to-cyan-600',
      'from-red-500 to-pink-600',
      'from-purple-500 to-violet-600'
    ]
    return gradients[index % gradients.length]
  }

  const isUpcoming = (date: string) => {
    return dayjs(date).isAfter(dayjs())
  }

  const getTimeFromNow = (date: string) => {
    const eventDate = dayjs(date)
    const now = dayjs()
    
    if (eventDate.isAfter(now)) {
      const diff = eventDate.diff(now, 'days')
      if (diff === 0) return 'Hari ini'
      if (diff === 1) return 'Besok'
      if (diff < 7) return `${diff} hari lagi`
      if (diff < 30) return `${Math.ceil(diff / 7)} minggu lagi`
      return `${Math.ceil(diff / 30)} bulan lagi`
    } else {
      return 'Telah berlalu'
    }
  }

  return (
    <section id="kegiatan" className="py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-orange-400 to-red-600 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-emerald-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 border-2 border-blue-300 rotate-45 animate-spin opacity-40" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 border-2 border-purple-300 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-2/3 right-1/3 w-5 h-5 bg-orange-300 rotate-12 animate-bounce delay-300 opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-pink-300 rounded-full animate-ping opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="relative">
          
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur opacity-30 animate-pulse"></div>
            </div>
          </div>
          
          <Title level={2} className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-emerald-800 to-blue-800 mb-8 text-4xl lg:text-6xl font-black tracking-tight">
            Kegiatan & Event
          </Title>
          
          <Paragraph className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Bergabunglah dalam berbagai kegiatan spektakuler untuk mengembangkan potensi dan kreativitas tanpa batas
          </Paragraph>
        </div>

        <Spin spinning={loading} size="large">
          {events.length === 0 && !loading ? (
            <div className="text-center py-20">
              <Empty 
                description={
                  <span className="text-gray-500 text-lg font-medium">
                    Belum ada kegiatan yang dijadwalkan
                  </span>
                }
                className="py-12"
              />
            </div>
          ) : (
            <List
              grid={{ 
                gutter: [40, 40],
                xs: 1,
                sm: 1,
                md: 2,
                lg: 3,
              }}
              dataSource={events}
              renderItem={(event, index) => {
                const category = getEventCategory(event.title)
                const upcoming = isUpcoming(event.date)
                const timeFromNow = getTimeFromNow(event.date)
                
                return (
                  <List.Item>
                    <div 
                      className="transform transition-all duration-700 opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_forwards]"
                      style={{ 
                        animationDelay: `${index * 150}ms`
                      }}
                    >
                      <Card
                        className={`h-full hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl overflow-hidden shadow-lg group hover:-translate-y-3 hover:scale-[1.02] bg-gradient-to-br ${getCardGradient(index)} backdrop-blur-sm relative`}
                        cover={
                          event.image_url ? (
                            <div className="h-64 overflow-hidden relative">
                              <img
                                alt={event.title}
                                src={event.image_url}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
                              
                              {/* Top badges */}
                              <div className="absolute top-4 left-4 flex gap-2">
                                <Tag 
                                  className="px-3 py-1 rounded-full font-bold text-xs shadow-lg border-0"
                                  style={{
                                    backgroundColor: category.color,
                                    color: 'white'
                                  }}
                                >
                                  {category.name}
                                </Tag>
                                {upcoming && (
                                  <Tag 
                                    className="px-3 py-1 rounded-full font-bold text-xs shadow-lg border-0 animate-pulse"
                                    style={{
                                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                      color: 'white'
                                    }}
                                  >
                                    🔥 {timeFromNow}
                                  </Tag>
                                )}
                              </div>

                              {/* Icon overlay */}
                              <div className="absolute top-4 right-4">
                                <div className={`w-12 h-12 bg-gradient-to-br ${getIconGradient(index)} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                                  {getEventIcon(event.title)}
                                </div>
                              </div>

                              {/* Shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-all duration-1000"></div>
                            </div>
                          ) : (
                            <div className={`h-64 bg-gradient-to-br ${getCardGradient(index)} flex items-center justify-center relative overflow-hidden`}>
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                              <div className={`w-20 h-20 bg-gradient-to-br ${getIconGradient(index)} rounded-3xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                                {getEventIcon(event.title)}
                              </div>
                              
                              <div className="absolute top-4 left-4">
                                <Tag 
                                  className="px-3 py-1 rounded-full font-bold text-xs shadow-lg border-0"
                                  style={{
                                    backgroundColor: category.color,
                                    color: 'white'
                                  }}
                                >
                                  {category.name}
                                </Tag>
                              </div>
                            </div>
                          )
                        }
                      >
                        <div className="p-6 relative z-10">
                          <Title level={4} className="text-gray-800 mb-4 text-xl font-bold group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                            {event.title}
                          </Title>
                          
                          <Paragraph 
                            className="text-gray-600 mb-6 text-base leading-relaxed font-medium line-clamp-3"
                            ellipsis={{ rows: 3, expandable: false }}
                          >
                            {event.description}
                          </Paragraph>
                          
                          {/* Event details */}
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-3 text-emerald-500" />
                              <span className="font-semibold">
                                {dayjs(event.date).format('dddd, DD MMMM YYYY')}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="w-4 h-4 mr-3 text-blue-500" />
                              <span className="font-medium">
                                {timeFromNow}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="w-4 h-4 mr-3 text-purple-500" />
                              <span className="font-medium">Siswa & Guru</span>
                            </div>
                          </div>

                          {/* Action button */}
                          <Button
                            type="primary"
                            icon={<ArrowRight className="w-4 h-4" />}
                            className={`w-full bg-gradient-to-r ${getIconGradient(index)} border-0 rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-12`}
                          >
                            <span className="ml-1">Detail Event</span>
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </List.Item>
                )
              }}
            />
          )}
        </Spin>
      </div>
      
    </section>
  )
}