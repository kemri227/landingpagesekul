import React, { useState, useEffect } from 'react'
import { Typography, Row, Col, Card } from 'antd'
import { Target, Eye, Lightbulb, Users, BookOpen, Globe } from 'lucide-react'

const { Title, Paragraph } = Typography

export const VisionMission: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('visi-misi')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const visionPoints = [
    {
      text: 'Religius – memiliki kemampuan tahfidz (Juz 30, 29, 1)',
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-100'
    },
    {
      text: 'Mandiri – sesuai nilai Profil Pelajar Pancasila',
      icon: <Users className="w-6 h-6 text-green-600" />,
      color: 'bg-green-100'
    },
    {
      text: 'Kreatif – memanfaatkan kearifan lokal di era abad 21',
      icon: <Lightbulb className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-100'
    },
    {
      text: 'Kompetitif – unggul dalam akademik dan non-akademik',
      icon: <Target className="w-6 h-6 text-orange-600" />,
      color: 'bg-orange-100'
    },
    {
      text: 'Berteknologi – mahir Microsoft Office, multimedia, dan programming',
      icon: <Globe className="w-6 h-6 text-pink-600" />,
      color: 'bg-pink-100'
    }
  ]

  const missionPoints = [
    {
      text: 'Membentuk peserta didik yang beriman dan bertakwa kepada Tuhan YME',
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-100'
    },
    {
      text: 'Membentuk peserta didik yang berakhlak mulia dan berkarakter kuat',
      icon: <Users className="w-6 h-6 text-green-600" />,
      color: 'bg-green-100'
    },
    {
      text: 'Mengembangkan life skill melalui kegiatan intrakurikuler, kokurikuler, dan ekstrakurikuler',
      icon: <Lightbulb className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-100'
    },
    {
      text: 'Mengembangkan kecakapan abad 21 untuk menghadapi era globalisasi',
      icon: <Target className="w-6 h-6 text-orange-600" />,
      color: 'bg-orange-100'
    },
    {
      text: 'Mengajarkan kemampuan kolaborasi, komunikasi, berpikir kritis, dan kreatif',
      icon: <Globe className="w-6 h-6 text-pink-600" />,
      color: 'bg-pink-100'
    }
  ]

  return (
    <section
      id="visi-misi"
      className="py-20 bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <Title
          level={1}
          className={`mb-6 text-4xl font-extrabold tracking-tight ${
            isVisible ? 'animate-fade-in-down' : 'opacity-0'
          }`}
        >
          Visi & Misi
        </Title>
        <Paragraph
          className={`text-gray-600 max-w-3xl mx-auto mb-16 text-lg leading-relaxed ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          Komitmen kami dalam mencerdaskan bangsa dan membentuk karakter generasi penerus yang{' '}
          <span className="font-bold text-blue-600">unggul</span>,{' '}
          <span className="font-bold text-emerald-600">berintegritas</span>, dan{' '}
          <span className="font-bold text-purple-600">berdaya saing global</span>.
        </Paragraph>

        <Row gutter={[32, 32]}>
          <Col xs={24} lg={12}>
            <Card className="h-full border-0 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
              <Title level={2} className="text-gray-800 mb-6 text-2xl font-bold text-center">
                VISI
              </Title>
              <div className="space-y-5">
                {visionPoints.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 text-left"
                  >
                    <div
                      className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center shadow-sm`}
                    >
                      {item.icon}
                    </div>
                    <Paragraph className="text-gray-700 text-base leading-relaxed">
                      {item.text}
                    </Paragraph>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card className="h-full border-0 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
              <Title level={2} className="text-gray-800 mb-6 text-2xl font-bold text-center">
                MISI
              </Title>
              <div className="space-y-5">
                {missionPoints.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 text-left"
                  >
                    <div
                      className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center shadow-sm`}
                    >
                      {item.icon}
                    </div>
                    <Paragraph className="text-gray-700 text-base leading-relaxed">
                      {item.text}
                    </Paragraph>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  )
}
