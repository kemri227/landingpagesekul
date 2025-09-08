import React, { useState, useEffect } from 'react'
import { Typography, Card, Button, List, Tag, Empty, Spin } from 'antd'
import { Download, Calendar, FileText, Bell, AlertCircle, ExternalLink } from 'lucide-react'
import { supabase } from '../../config/supabase'
import dayjs from 'dayjs'

const { Title, Paragraph } = Typography


interface Announcement {
  id: string
  title: string
  content: string
  file_url?: string | null
  created_at: string
}

// Sample data for when Supabase is not connected
const sampleAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Penerimaan Siswa Baru 2025/2026',
    content: 'Pendaftaran siswa baru telah dibuka! Dapatkan informasi lengkap tentang syarat dan prosedur pendaftaran. Jangan lewatkan kesempatan bergabung dengan SMA Nusantara untuk mengembangkan potensi akademik dan karakter.',
    file_url: null,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Modul Pembelajaran Matematika Kelas XII',
    content: 'Modul pembelajaran matematika untuk persiapan ujian nasional telah tersedia. Silakan download dan pelajari dengan baik. Modul ini mencakup semua materi penting untuk sukses dalam ujian.',
    file_url: 'https://example.com/sample.pdf',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    title: 'Libur Semester Ganjil',
    content: 'Libur semester ganjil akan dimulai tanggal 20 Desember 2024 hingga 6 Januari 2025. Selamat berlibur dan persiapkan diri untuk semester yang akan datang!',
    file_url: null,
    created_at: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '4',
    title: 'Kegiatan Ekstrakurikuler Semester Genap',
    content: 'Pendaftaran kegiatan ekstrakurikuler semester genap dibuka mulai minggu depan. Tersedia berbagai pilihan menarik untuk mengembangkan bakat dan minat siswa.',
    file_url: null,
    created_at: new Date(Date.now() - 259200000).toISOString()
  }
]

export const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url' || supabaseKey === 'your-supabase-anon-key') {
        console.log('Supabase not configured, using sample data')
        setAnnouncements(sampleAnnouncements)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        setAnnouncements(sampleAnnouncements)
      } else {
        setAnnouncements(data && data.length > 0 ? data : sampleAnnouncements)
      }
    } catch (error) {
      console.error('Error fetching announcements:', error)
      setAnnouncements(sampleAnnouncements)
      setError('Menggunakan data contoh. Silakan hubungkan ke Supabase untuk data real.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (fileUrl: string, title: string) => {
    if (fileUrl && fileUrl !== 'https://example.com/sample.pdf') {
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = `${title}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      alert('File contoh tidak dapat diunduh. Silakan hubungkan ke Supabase dan upload file asli.')
    }
  }

  const getAnnouncementIcon = (title: string, hasFile: boolean) => {
    if (hasFile) return <FileText className="w-5 h-5 text-white" />
    if (title.toLowerCase().includes('siswa baru')) return <Bell className="w-5 h-5 text-white" />
    if (title.toLowerCase().includes('libur')) return <Calendar className="w-5 h-5 text-white" />
    return <Bell className="w-5 h-5 text-white" />
  }

  const getCardGradient = (index: number) => {
    const gradients = [
      'from-blue-50 via-white to-indigo-50',
      'from-green-50 via-white to-emerald-50', 
      'from-purple-50 via-white to-violet-50',
      'from-orange-50 via-white to-amber-50',
      'from-rose-50 via-white to-pink-50',
      'from-cyan-50 via-white to-teal-50'
    ]
    return gradients[index % gradients.length]
  }

  const getIconGradient = (index: number) => {
    const gradients = [
      'from-blue-500 to-indigo-600',
      'from-green-500 to-emerald-600',
      'from-purple-500 to-violet-600', 
      'from-orange-500 to-amber-600',
      'from-rose-500 to-pink-600',
      'from-cyan-500 to-teal-600'
    ]
    return gradients[index % gradients.length]
  }

  return (
    <section id="pengumuman" className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-400 to-red-600 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-8 h-8 border-2 border-blue-300 rotate-45 animate-bounce opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-purple-300 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-10 h-10 border-2 border-green-300 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-2/3 right-1/4 w-7 h-7 bg-orange-300 rotate-12 animate-bounce delay-300 opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="relative">
            
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 animate-pulse"></div>
            </div>
          </div>
          
          <Title level={2} className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 mb-8 text-4xl lg:text-6xl font-black tracking-tight">
            Pengumuman Terbaru
          </Title>
          
          <Paragraph className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Selalu update dengan informasi terkini dan penting untuk seluruh warga sekolah
          </Paragraph>
          
          {error && (
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-2xl shadow-lg backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <Paragraph className="text-yellow-800 mb-0 font-medium text-lg">
                  {error}
                </Paragraph>
              </div>
            </div>
          )}
        </div>

        <Spin spinning={loading} size="large">
          {announcements.length === 0 && !loading ? (
            <div className="text-center py-20">
              <Empty 
                description={
                  <span className="text-gray-500 text-lg font-medium">
                    Belum ada pengumuman terbaru
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
                lg: 2,
                xl: 3,
              }}
              dataSource={announcements}
              renderItem={(announcement, index) => (
                <List.Item>
                  <div 
                    className="transform transition-all duration-700 opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_forwards]"
                    style={{ 
                      animationDelay: `${index * 150}ms`
                    }}
                  >
                    <Card
                      className={`h-full hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl bg-gradient-to-br ${getCardGradient(index)} shadow-lg group hover:-translate-y-3 hover:scale-[1.02] backdrop-blur-sm relative overflow-hidden`}
                      actions={announcement.file_url ? [
                        <Button
                          type="primary"
                          icon={<Download className="w-4 h-4" />}
                          onClick={() => handleDownload(announcement.file_url!, announcement.title)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-6 py-2 h-12"
                        >
                          <span className="ml-1">Download Modul</span>
                        </Button>
                      ] : [
                        <Button
                          type="default"
                          icon={<ExternalLink className="w-4 h-4" />}
                          className="border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 px-6 py-2 h-12"
                        >
                          <span className="ml-1">Baca Selengkapnya</span>
                        </Button>
                      ]}
                    >
                      {/* Card shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-all duration-700"></div>
                      
                      <div className="mb-6 relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-14 h-14 bg-gradient-to-br ${getIconGradient(index)} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                            {getAnnouncementIcon(announcement.title, !!announcement.file_url)}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Tag 
                              color="blue" 
                              className="px-4 py-2 rounded-full font-bold text-sm w-fit border-0 shadow-md"
                              style={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                color: 'white'
                              }}
                            >
                              Pengumuman
                            </Tag>
                            {announcement.file_url && (
                              <Tag 
                                color="green" 
                                className="px-3 py-1 rounded-full font-semibold text-xs w-fit border-0 shadow-md"
                                style={{
                                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                  color: 'white'
                                }}
                              >
                                📎 File Tersedia
                              </Tag>
                            )}
                          </div>
                        </div>
                        
                        <Title level={4} className="text-gray-800 mb-6 text-xl font-bold group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                          {announcement.title}
                        </Title>
                      </div>
                      
                      <Paragraph 
                        className="text-gray-600 mb-8 text-base leading-relaxed font-medium line-clamp-4"
                        ellipsis={{ rows: 4, expandable: false }}
                      >
                        {announcement.content}
                      </Paragraph>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 shadow-inner">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="font-semibold">
                            {dayjs(announcement.created_at).format('DD MMMM YYYY')}
                          </span>
                        </div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      </div>
                    </Card>
                  </div>
                </List.Item>
              )}
            />
          )}
        </Spin>
      </div>
      
    </section>
  )
}