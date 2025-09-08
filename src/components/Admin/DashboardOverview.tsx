import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Statistic, Typography } from 'antd'
import { Megaphone, Calendar, MessageSquare, TrendingUp } from 'lucide-react'
import { supabase } from '../../config/supabase'

const { Title } = Typography

export const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState({
    announcements: 0,
    events: 0,
    testimonials: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url' || supabaseKey === 'your-supabase-anon-key') {
        console.log('Supabase not configured, using sample stats')
        setStats({
          announcements: 3,
          events: 3,
          testimonials: 3,
        })
        return
      }

      const [announcementsRes, eventsRes, testimonialsRes] = await Promise.all([
        supabase.from('announcements').select('id'),
        supabase.from('events').select('id'),
        supabase.from('testimonials').select('id')
      ])

      setStats({
        announcements: announcementsRes.data?.length || 0,
        events: eventsRes.data?.length || 0,
        testimonials: testimonialsRes.data?.length || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
      // Use sample data on error
      setStats({
        announcements: 3,
        events: 3,
        testimonials: 3,
      })
    }
  }

  const statsData = [
    {
      title: 'Total Pengumuman',
      value: stats.announcements,
      icon: <Megaphone className="w-8 h-8 text-blue-600" />,
      color: '#1890ff'
    },
    {
      title: 'Total Event',
      value: stats.events,
      icon: <Calendar className="w-8 h-8 text-green-600" />,
      color: '#52c41a'
    },
    {
      title: 'Total Testimoni',
      value: stats.testimonials,
      icon: <MessageSquare className="w-8 h-8 text-purple-600" />,
      color: '#722ed1'
    },
    {
      title: 'Total Konten',
      value: stats.announcements + stats.events + stats.testimonials,
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      color: '#fa8c16'
    }
  ]

  return (
    <div>
      <Title level={3} className="text-gray-800 mb-6">
        Selamat datang di Dashboard Admin
      </Title>
      
      <Row gutter={[24, 24]} className="mb-8">
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="hover:shadow-lg transition-shadow border-0">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color, fontSize: '2rem' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            title="Ringkasan Aktivitas"
            className="h-full border-0 shadow-sm"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Pengumuman Aktif</span>
                <span className="text-blue-600 font-semibold">{stats.announcements}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Event Mendatang</span>
                <span className="text-green-600 font-semibold">{stats.events}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">Testimoni Siswa</span>
                <span className="text-purple-600 font-semibold">{stats.testimonials}</span>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title="Panduan Cepat"
            className="h-full border-0 shadow-sm"
          >
            <div className="space-y-3 text-gray-600">
              <p>• Gunakan menu Pengumuman untuk menambah info terbaru</p>
              <p>• Upload modul pembelajaran dalam format PDF/DOC/ZIP</p>
              <p>• Tambahkan event sekolah dengan gambar menarik</p>
              <p>• Kelola testimoni alumni untuk meningkatkan kredibilitas</p>
              <p>• Semua perubahan akan langsung terlihat di website</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}