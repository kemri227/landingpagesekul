import React from 'react'
import { Layout, Row, Col, Typography, Space, Button } from 'antd'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, GraduationCap, ArrowUp, Award, Users, BookOpen } from 'lucide-react'

const { Footer: AntFooter } = Layout
const { Title, Text } = Typography

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AntFooter className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-500 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Row gutter={[48, 48]}>
          <Col xs={24} sm={12} lg={8}>
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <Title level={3} className="text-white mb-4 text-2xl font-bold">SMA Muslimin Cililin</Title>
            </div>
            <Text className="text-gray-300 block mb-8 text-lg leading-relaxed">
              Sekolah menengah atas yang berkomitmen memberikan pendidikan berkualitas
              untuk membentuk generasi yang unggul dan berkarakter.
            </Text>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <Text className="text-white text-sm font-semibold">Terakreditasi A</Text>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <Text className="text-white text-sm font-semibold">2000+ Alumni</Text>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <Text className="text-white text-sm font-semibold">50+ Guru</Text>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Title level={4} className="text-white mb-8 text-xl font-semibold">Kontak Kami</Title>
            <Space direction="vertical" size="large" className="w-full">
              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <Text className="text-white text-base font-semibold block mb-1">Alamat</Text>
                  <Text className="text-gray-300 text-sm leading-relaxed">
                    Jl. Pendidikan No. 123, Cililin<br />
                    Bandung Barat, Jawa Barat 40562
                  </Text>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <Text className="text-white text-base font-semibold block mb-1">Telepon</Text>
                  <Text className="text-gray-300 text-sm">+62 269 40273</Text>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <Text className="text-white text-base font-semibold block mb-1">Email</Text>
                  <Text className="text-gray-300 text-sm">cililinsmam@gmail.com</Text>
                </div>
              </div>
            </Space>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Title level={4} className="text-white mb-8 text-xl font-semibold">Media Sosial</Title>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-500 cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center hover:bg-pink-500 cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center hover:bg-sky-500 cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                  <Twitter className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="mt-8">
                <Button
                  type="primary"
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700 border-0 rounded-xl px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    const element = document.getElementById('pengumuman')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  Info Pendaftaran
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <div className="border-t border-gray-700 mt-16 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <Text className="text-gray-400 text-base">
              © 2025 SMA Muslimin Cililin. All rights reserved.
            </Text>
            
            <Button
              type="text"
              icon={<ArrowUp className="w-5 h-5" />}
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg px-4 py-2 transition-all duration-300"
            >
              Kembali ke Atas
            </Button>
          </div>
        </div>
      </div>
    </AntFooter>
  )
}