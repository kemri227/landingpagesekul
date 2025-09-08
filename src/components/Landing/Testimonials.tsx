import React, { useState, useEffect } from 'react'
import { Typography, Card, Carousel, Empty, Spin, Avatar, Rate } from 'antd'
import { Quote, Award } from 'lucide-react'
import { supabase } from '../../config/supabase'

const { Title, Paragraph } = Typography

interface Testimonial {
  id: string
  name: string
  message: string
  image_url?: string
  created_at: string
}

// Sample data for when Supabase is not connected
const sampleTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Andi Pratama',
    message: 'SMA Nusantara memberikan pendidikan terbaik yang mempersiapkan saya untuk kuliah di universitas ternama. Guru-gurunya sangat berpengalaman dan fasilitas sekolahnya lengkap.',
    image_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Sari Dewi',
    message: 'Tiga tahun di SMA Nusantara adalah pengalaman terbaik dalam hidup saya. Selain akademik yang kuat, sekolah ini juga mengembangkan karakter dan kepemimpinan siswa.',
    image_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    name: 'Budi Santoso',
    message: 'Berkat bimbingan guru-guru SMA Nusantara, saya berhasil meraih juara olimpiade sains tingkat nasional. Sekolah ini benar-benar mendukung prestasi siswa.',
    image_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
]
export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url' || supabaseKey === 'your-supabase-anon-key') {
        console.log('Supabase not configured, using sample data')
        setTestimonials(sampleTestimonials)
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        setTestimonials(sampleTestimonials)
      } else {
        setTestimonials(data && data.length > 0 ? data : sampleTestimonials)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setTestimonials(sampleTestimonials)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="testimoni" className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
 
          
          <Title level={2} className="text-gray-800 mb-6 text-4xl lg:text-5xl font-bold">
           Cerita dari Alumni
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cerita sukses alumni yang membanggakan SMA Muslimin Cililin
          </Paragraph>
        </div>

        <Spin spinning={loading}>
          {testimonials.length === 0 && !loading ? (
            <Empty 
              description="Belum ada testimoni"
              className="py-12"
            />
          ) : testimonials.length > 0 && (
            <Carousel
              autoplay
              effect="fade"
              dots={{
                className: 'testimonial-dots'
              }}
              className="testimonial-carousel"
            >
              {testimonials.map((testimonial, _) => (
                <div key={testimonial.id}>
                  <div className="px-4">
                    <Card className="max-w-5xl mx-auto text-center border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
                      <div className="py-12 px-8">
                        {/* Quote Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                          <Quote className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Testimonial Text */}
                        <div className="relative mb-10">
                          <Paragraph className="text-xl text-gray-700 mb-0 leading-relaxed italic px-4 font-medium">
                            "{testimonial.message}"
                          </Paragraph>
                          
                          {/* Decorative Elements */}
                          <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-100 rounded-full opacity-50"></div>
                          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-100 rounded-full opacity-50"></div>
                        </div>
                        
                        {/* Author Info */}
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                          <Avatar
                            size={80}
                            src={testimonial.image_url}
                            className="border-4 border-white shadow-xl"
                          >
                            {testimonial.name.charAt(0)}
                          </Avatar>
                          <div className="text-center sm:text-left">
                            <Title level={4} className="text-gray-800 mb-2 text-xl font-bold">
                              {testimonial.name}
                            </Title>
                            <Paragraph className="text-gray-600 text-base mb-3 font-medium">
                              Alumni SMA Muslimin Cililin
                            </Paragraph>
                            <div className="flex items-center justify-center sm:justify-start space-x-1">
                              <Rate disabled defaultValue={5} className="text-yellow-400 text-lg" />
                              <span className="text-gray-500 text-sm ml-2 font-medium">(5.0)</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Achievement Badge */}
                        <div className="mt-8">
                          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-6 py-3 shadow-lg">
                            <Award className="w-4 h-4" />
                            <span className="font-semibold text-sm">Alumni Berprestasi</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </Spin>
      </div>
    </section>
  )
}