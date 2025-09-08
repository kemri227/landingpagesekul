import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography } from 'antd'
import { Award, Users, BookOpen, Star, TrendingUp, Globe, Heart, Shield, Sparkles } from 'lucide-react'

const { Title, Paragraph } = Typography

const stats = [
  { 
    icon: <Award className="w-8 h-8" />, 
    title: "25+", 
    desc: "Penghargaan Prestasi", 
    color: "from-amber-400 via-yellow-500 to-orange-500", 
    bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
    iconColor: "text-white",
    shadowColor: "shadow-amber-200"
  },
  { 
    icon: <Users className="w-8 h-8" />, 
    title: "2000+", 
    desc: "Alumni Sukses", 
    color: "from-blue-500 via-indigo-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconColor: "text-white",
    shadowColor: "shadow-blue-200"
  },
  { 
    icon: <BookOpen className="w-8 h-8" />, 
    title: "50+", 
    desc: "Guru Profesional", 
    color: "from-emerald-400 via-teal-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    iconColor: "text-white",
    shadowColor: "shadow-emerald-200"
  },
  { 
    icon: <Star className="w-8 h-8" />, 
    title: "98%", 
    desc: "Tingkat Kelulusan", 
    color: "from-violet-500 via-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    iconColor: "text-white",
    shadowColor: "shadow-violet-200"
  },
  { 
    icon: <TrendingUp className="w-8 h-8" />, 
    title: "15+", 
    desc: "Program Unggulan", 
    color: "from-rose-400 via-pink-500 to-fuchsia-500",
    bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
    iconColor: "text-white",
    shadowColor: "shadow-rose-200"
  },
  { 
    icon: <Globe className="w-8 h-8" />, 
    title: "100%", 
    desc: "Akses Digital", 
    color: "from-cyan-400 via-sky-500 to-blue-500",
    bgColor: "bg-gradient-to-br from-cyan-50 to-sky-50",
    iconColor: "text-white",
    shadowColor: "shadow-cyan-200"
  },
]

export const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<string[]>(stats.map(() => '0'))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate numbers
          stats.forEach((stat, index) => {
            const target = parseInt(stat.title.replace(/[^\d]/g, ''))
            const suffix = stat.title.replace(/[\d]/g, '')
            let current = 0
            const increment = target / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setAnimatedValues(prev => {
                const newValues = [...prev]
                newValues[index] = Math.floor(current) + suffix
                return newValues
              })
            }, 40)
          })
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('stats-section')
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
    <section id="stats-section" className="relative pt-20 pb-32 bg-gradient-to-b from-slate-50 via-white to-gray-50 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse-slow animation-delay-3000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse-slow animation-delay-6000"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 mb-6 shadow-lg">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700 tracking-wide">PENCAPAIAN TERBUKTI</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          
          <Title 
            level={1} 
            className="text-gray-900 mb-6 text-5xl lg:text-6xl font-black leading-tight tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #3730a3 50%, #1e293b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Prestasi & Keunggulan
          </Title>
          
          <Paragraph className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Dedikasi kami dalam memberikan pendidikan berkualitas telah membuahkan hasil yang membanggakan dan diakui secara nasional.
          </Paragraph>
        </div>

        {/* Enhanced Stats Grid */}
        <Row gutter={[32, 32]} justify="center" className="mb-16">
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={8} xl={4} key={index}>
              <div 
                className={`transform transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-16 opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card 
                  className={`relative group text-center h-full border-0 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${stat.bgColor}`}
                  bodyStyle={{ padding: '2rem' }}
                >
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-flow"></div>
                  
                  <div className="relative z-10">
                    {/* Enhanced Icon Container */}
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${stat.shadowColor}`}>
                        {/* Icon Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500`}></div>
                        <div className={`relative ${stat.iconColor} transform group-hover:scale-110 transition-transform duration-300`}>
                          {stat.icon}
                        </div>
                      </div>
                      
                      {/* Floating Sparkles */}
                      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
                      </div>
                    </div>
                    
                    {/* Animated Number */}
                    <Title 
                      level={2} 
                      className="!text-gray-900 !mb-3 text-4xl font-black group-hover:text-gray-800 transition-colors duration-300"
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {isVisible ? animatedValues[index] : stat.title}
                    </Title>
                    
                    <Paragraph className="!text-gray-600 text-lg font-semibold group-hover:text-gray-700 transition-colors duration-300 !mb-0">
                      {stat.desc}
                    </Paragraph>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        {/* Enhanced Achievement Badge */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center space-x-4 bg-white/90 backdrop-blur-lg border-2 border-gray-100 rounded-2xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
            {/* Animated Heart */}
            <div className="relative">
              <Heart className="w-6 h-6 text-red-500 animate-pulse" />
              <div className="absolute inset-0 w-6 h-6 text-red-500 animate-ping opacity-20"></div>
            </div>
            
            {/* Badge Content */}
            <div className="flex items-center space-x-2 text-gray-800 font-bold text-lg">
              <span>Terakreditasi</span>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg">
                A
              </div>
            </div>
            
            <div className="w-px h-6 bg-gray-300"></div>
            
            <span className="text-gray-700 font-semibold">Berstandar Nasional</span>
            
            <div className="w-px h-6 bg-gray-300"></div>
            
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-semibold">ISO 9001:2015</span>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .animate-pulse-slow {
            animation: pulseSlow 4s ease-in-out infinite alternate;
          }
          
          @keyframes pulseSlow {
            0% { transform: scale(1) rotate(0deg); opacity: 0.3; }
            100% { transform: scale(1.1) rotate(3deg); opacity: 0.6; }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-5px); }
            75% { transform: translateY(-30px) translateX(15px); }
          }

          .animate-border-flow {
            animation: borderFlow 2s linear infinite;
          }
          
          @keyframes borderFlow {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          .animate-spin-slow {
            animation: spin 3s linear infinite;
          }

          .animation-delay-3000 {
            animation-delay: 3s;
          }
          .animation-delay-6000 {
            animation-delay: 6s;
          }

          /* Enhanced hover effects */
          .group:hover .animate-spin-slow {
            animation-duration: 1s;
          }

          /* Custom shadows */
          .shadow-amber-200 {
            box-shadow: 0 10px 25px -5px rgba(251, 191, 36, 0.3);
          }
          .shadow-blue-200 {
            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
          }
          .shadow-emerald-200 {
            box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3);
          }
          .shadow-violet-200 {
            box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.3);
          }
          .shadow-rose-200 {
            box-shadow: 0 10px 25px -5px rgba(244, 63, 94, 0.3);
          }
          .shadow-cyan-200 {
            box-shadow: 0 10px 25px -5px rgba(34, 211, 238, 0.3);
          }

          /* Smooth transitions */
          * {
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
        `
      }} />
    </section>
  )
}