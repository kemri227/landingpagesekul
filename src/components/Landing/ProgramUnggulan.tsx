import React, { useState, useEffect } from 'react'
import { Typography, Card, Row, Col } from 'antd'
import { Lightbulb, Users, BookOpen, Globe, Award, TrendingUp } from 'lucide-react'

const { Title, Paragraph } = Typography

export const ProgramUnggulan: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('program-unggulan')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="program-unggulan" className="min-h-screen flex items-center justify-center py-24 bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-20">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
        
            <Title level={2} className="text-gray-800 mb-6 text-4xl lg:text-5xl font-bold">
              Program Unggulan: SmartTren 1445 H (2024)
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              SmartTren 1445 H adalah inovasi pendidikan di SMA Muslimin Cililin — sebuah program yang menyeimbangkan antara pendidikan formal dan kebutuhan masa kini siswa.
            </Paragraph>
          </div>
        </div>

        <div 
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <Card className="hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-3xl overflow-hidden shadow-xl group hover:-translate-y-2">
            <div className="text-center mb-12 p-8">
              <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Lightbulb className="w-14 h-14 text-white" />
              </div>
              <Title level={3} className="text-gray-800 text-3xl font-bold mb-4">
                Tujuan Program SmartTren
              </Title>
              <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
                Membentuk generasi yang siap menghadapi tantangan masa depan dengan bekal pengetahuan dan keterampilan yang komprehensif
              </Paragraph>
            </div>
            
            <div className="px-8 pb-8">
              <Row gutter={[24, 24]}>
                {[
                  {
                    title: "Pengetahuan & Soft Skills",
                    description: "Menyiapkan siswa dengan pengetahuan dan soft skills yang relevan dengan dunia yang terus berubah",
                    icon: <BookOpen className="w-6 h-6" />,
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    title: "Networking & Mentorship",
                    description: "Menghubungkan siswa dengan asatidz, praktisi, dan mentor dari berbagai bidang",
                    icon: <Users className="w-6 h-6" />,
                    color: "from-green-500 to-green-600"
                  },
                  {
                    title: "Komunitas Pembelajaran",
                    description: "Membangun komunitas pembelajaran yang kuat dan kemampuan berjejaring untuk masa depan",
                    icon: <Globe className="w-6 h-6" />,
                    color: "from-purple-500 to-purple-600"
                  },
                  {
                    title: "Kontribusi Masyarakat",
                    description: "Membentuk siswa unggul secara akademik dan dalam keterampilan hidup, siap berkontribusi positif pada masyarakat",
                    icon: <Award className="w-6 h-6" />,
                    color: "from-orange-500 to-orange-600"
                  }
                ].map((item, index) => (
                  <Col xs={24} md={12} key={index}>
                    <div 
                      className={`transform transition-all duration-700 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full group hover:-translate-y-1">
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                          <div className="text-white">
                            {item.icon}
                          </div>
                        </div>
                        
                        <Title level={4} className="text-gray-800 mb-3 text-lg font-bold">
                          {item.title}
                        </Title>
                        
                        <Paragraph className="text-gray-600 mb-0 text-base leading-relaxed">
                          {item.description}
                        </Paragraph>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              
              <div className="text-center mt-12">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full px-8 py-4 shadow-xl">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold text-lg">smamcililin.sch.id</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}