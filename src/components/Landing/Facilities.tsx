import React, { useState, useEffect } from 'react'
import { Typography, Row, Col, Card} from 'antd'
import { 
  Monitor, 
  BookOpen, 
  FlaskConical, 
  Dumbbell, 
  Palette, 
  Music,
  Wifi,
  Car,
  Building,
  Shield,
  Star
} from 'lucide-react'

const { Title, Paragraph } = Typography

const facilities = [
  {
    icon: <Monitor className="w-10 h-10" />,
    title: "Laboratorium Komputer",
    description: "Fasilitas komputer modern dengan koneksi internet cepat untuk pembelajaran IT",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100"
  },
  {
    icon: <BookOpen className="w-10 h-10" />,
    title: "Perpustakaan Digital",
    description: "Koleksi buku lengkap dan akses e-book untuk mendukung pembelajaran",
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100"
  },
  {
    icon: <FlaskConical className="w-10 h-10" />,
    title: "Lab IPA",
    description: "Laboratorium Fisika, Kimia, dan Biologi dengan peralatan lengkap",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100"
  },
  {
    icon: <Dumbbell className="w-10 h-10" />,
    title: "Fasilitas Olahraga",
    description: "Lapangan basket, voli, dan gymnasium untuk aktivitas fisik siswa",
    color: "from-orange-500 to-orange-600",
    bgColor: "from-orange-50 to-orange-100"
  },
  {
    icon: <Palette className="w-10 h-10" />,
    title: "Studio Seni",
    description: "Ruang kreativitas untuk pengembangan bakat seni dan kerajinan",
    color: "from-pink-500 to-pink-600",
    bgColor: "from-pink-50 to-pink-100"
  },
  {
    icon: <Music className="w-10 h-10" />,
    title: "Studio Musik",
    description: "Ruang berlatih musik dengan berbagai alat musik modern",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "from-indigo-50 to-indigo-100"
  },
  {
    icon: <Wifi className="w-10 h-10" />,
    title: "WiFi Sekolah",
    description: "Akses internet gratis di seluruh area sekolah untuk pembelajaran digital",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "from-cyan-50 to-cyan-100"
  },
  {
    icon: <Car className="w-10 h-10" />,
    title: "Area Parkir",
    description: "Tempat parkir yang aman dan luas untuk kendaraan siswa dan guru",
    color: "from-gray-500 to-gray-600",
    bgColor: "from-gray-50 to-gray-100"
  }
]

export const Facilities: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('fasilitas')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id="fasilitas" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-200 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
        
            <Title level={2} className="text-gray-900 mb-4 text-4xl lg:text-5xl font-extrabold">
              Fasilitas Sekolah
            </Title>
            <Paragraph className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Fasilitas lengkap dan modern untuk mendukung pembelajaran optimal serta pengembangan potensi siswa.
            </Paragraph>
          </div>
        </div>

        {/* Facilities Grid */}
        <Row gutter={[32, 32]}>
          {facilities.map((facility, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <div 
                className={`transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card 
                  className={`h-full text-center hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl bg-gradient-to-br ${facility.bgColor} shadow-lg group hover:-translate-y-2 hover:ring-2 hover:ring-offset-2 hover:ring-${facility.color.split('-')[1]}-400`}
                  bodyStyle={{ padding: '32px 24px' }}
                >
                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${facility.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                      <div className="text-white">
                        {facility.icon}
                      </div>
                    </div>
                    
                    {/* Floating dots */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-20 group-hover:opacity-40 transition" />
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white rounded-full opacity-20 group-hover:opacity-40 transition" />
                    
                    <Title level={4} className="text-gray-800 mb-3 text-lg font-bold group-hover:text-gray-900 transition-colors">
                      {facility.title}
                    </Title>
                    <Paragraph className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                      {facility.description}
                    </Paragraph>
                  </div>
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        {/* Footer Info */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 bg-white/95 backdrop-blur-md rounded-full px-10 py-5 shadow-xl border border-gray-100">
            <Building className="w-5 h-5 text-blue-500" />
            <Shield className="w-5 h-5 text-green-500" />
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700 font-medium select-none">
              Fasilitas Terakreditasi • Standar Nasional • Ramah Lingkungan
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
