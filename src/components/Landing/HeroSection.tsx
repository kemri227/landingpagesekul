import React from 'react'
import { Button, Typography, Carousel, Badge } from 'antd'
import { ArrowRight, Sparkles, Trophy } from 'lucide-react'

const { Title, Paragraph } = Typography

const heroSlides = [
  {
    title: "Selamat Datang di SMA Muslimin Cililin",
    subtitle: "Membentuk Generasi Unggul dan Berkarakter",
    description:
      "Bergabunglah dengan sekolah yang berkomitmen mencetak generasi religius, mandiri, kreatif, kompetitif, dan siap menghadapi tantangan teknologi.",
    accentColor: "blue", // Used for gradients, etc.
  },
  {
    title: "Pendidikan Berkualitas",
    subtitle: "SmartTren & Program Unggulan",
    description:
      "Mengintegrasikan pembelajaran akademik dengan pembinaan karakter Islami untuk membentuk siswa yang cerdas dan berakhlak mulia.",
    accentColor: "emerald",
  },
  {
    title: "Teknologi & Inovasi",
    subtitle: "Siap Menghadapi Era Digital",
    description:
      "Dilengkapi dengan fasilitas teknologi modern dan kurikulum yang mengintegrasikan digital literacy untuk mempersiapkan siswa menghadapi masa depan.",
    accentColor: "violet",
  },
]


export const HeroSection = () => {
  return (
    <section id="beranda" className="relative w-full h-screen overflow-hidden bg-white mb-0">
      {/* Hero Carousel - Full Screen */}
      <Carousel 
        autoplay 
        effect="fade" 
        className="w-full h-full"
        autoplaySpeed={5000}
        dots={{
          className: 'hero-dots absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20'
        }}
      >
        {heroSlides.map((item, index) => (
          <div key={index}>
            <div className="w-full h-screen flex items-center justify-center bg-white relative overflow-hidden">
              {/* Subtle Background Elements for a clean look */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse-light"></div>
                <div className="absolute bottom-1/3 right-1/4 w-52 h-52 bg-emerald-100 rounded-full blur-3xl opacity-50 animate-pulse-light delay-200"></div>
                <div className="absolute top-1/2 left-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50 animate-pulse-light delay-400"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-50 animate-pulse-light delay-600"></div>
              </div>

              {/* Sparkle Effects - more subtle */}
              <div className="absolute inset-0 overflow-hidden">
                <Sparkles className="absolute top-1/4 left-1/4 w-3 h-3 text-gray-300 opacity-60 animate-sparkle" />
                <Sparkles className="absolute top-1/3 right-1/3 w-2 h-2 text-gray-300 opacity-40 animate-sparkle delay-100" />
                <Sparkles className="absolute bottom-1/3 left-1/2 w-4 h-4 text-gray-300 opacity-50 animate-sparkle delay-200" />
                <Sparkles className="absolute bottom-1/4 right-1/4 w-3 h-3 text-gray-300 opacity-70 animate-sparkle delay-300" />
              </div>
              
              <div className="w-full h-full flex items-center justify-center px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto text-center w-full py-16"> {/* Reduced vertical padding */}
                  <div className="space-y-6 animate-fade-in-up">
                    {/* Modernized Badge */}
                    <div className="flex justify-center animate-fade-in-up">
                      <div className="relative">
                        <Badge 
                          count={
                            <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
                              <Trophy className="w-4 h-4" />
                              <span className="font-semibold text-sm">Terakreditasi A</span>
                            </div>
                          }
                          className="inline-block"
                        />
                      </div>
                    </div>
                    
                    {/* Modernized Title */}
                    <div className="space-y-3">
                      <Title 
                        level={1} 
                        className="!text-gray-900 !mb-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight animate-fade-in-up"
                        style={{
                          background: 'linear-gradient(135deg, #2c3e50 0%, #4a69bd 50%, #2c3e50 100%)', // Deeper, richer dark gradient
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.05))' // Softer shadow
                        }}
                      >
                        {item.title}
                      </Title>
                      
                      {/* Modernized Subtitle with Gradient */}
                      <Title 
                        level={3} 
                        className={`!mb-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold animate-fade-in-up`}
                        style={{
                          background: item.accentColor === 'blue' 
                            ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' // Stronger blue
                            : item.accentColor === 'emerald'
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' // Stronger emerald
                            : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', // Stronger violet
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.05))' // Softer shadow
                        }}
                      >
                        {item.subtitle}
                      </Title>
                    </div>
                    
                    {/* Modernized Description */}
                    <div className="max-w-3xl mx-auto pt-4"> {/* Added padding top */}
                      <Paragraph 
                        className="!text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed font-medium animate-fade-in-up bg-white/70 backdrop-blur-md rounded-xl px-6 py-4 shadow-sm border border-gray-100" // Softer border, less aggressive shadow
                        style={{
                          textShadow: 'none' // Remove text shadow for cleaner look
                        }}
                      >
                        {item.description}
                      </Paragraph>
                    </div>
                    
                    {/* Modernized Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up pt-6"> {/* Added padding top */}
                      <Button
                        type="primary"
                        size="large"
                        className={`group relative overflow-hidden border-0 rounded-full px-8 py-3 h-auto text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform w-full sm:w-auto ${
                          item.accentColor === 'blue' 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
                            : item.accentColor === 'emerald' 
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                            : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700'
                        }`}
                        onClick={() => {
                          const element = document.getElementById('pengumuman')
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                      >
                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        
                        <div className="relative flex items-center space-x-2">
                          <span>Lihat Pengumuman</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </Button>
                      
                      <Button
                        size="large"
                        className="group relative overflow-hidden border-2 border-gray-300 hover:border-gray-400 rounded-full px-8 py-3 h-auto text-lg font-semibold bg-white/70 backdrop-blur-md hover:bg-white/90 transition-all duration-300 hover:scale-105 transform shadow-md hover:shadow-lg w-full sm:w-auto"
                        onClick={() => {
                          const element = document.getElementById('visi-misi')
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                      >
                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        
                        <div className="relative flex items-center space-x-2">
                          <span className="text-gray-800">Pelajari Lebih Lanjut</span>
                          <div className="w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-200">
                            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>


      <style dangerouslySetInnerHTML={{
        __html: `
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px); /* Softer translateY */
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* New subtle background animation */
          .animate-pulse-light {
            animation: pulseLight 6s ease-in-out infinite alternate;
          }
          @keyframes pulseLight {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.5; }
            100% { transform: scale(1); opacity: 0.3; }
          }

          /* Sparkle animation */
          .animate-sparkle {
            animation: sparkle 1.5s ease-in-out infinite alternate;
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 0.9; transform: scale(1.2); }
          }
          
          .hero-dots .ant-carousel-dot button {
            background: rgba(255, 255, 255, 0.4); /* Softer dot background */
            border: 1px solid rgba(255, 255, 255, 0.6); /* Softer border */
            border-radius: 50%;
            width: 10px; /* Slightly smaller dots */
            height: 10px;
            transition: all 0.3s ease;
          }
          
          .hero-dots .ant-carousel-dot-active button {
            background: white;
            border-color: white;
            transform: scale(1.3); /* Slightly more pronounced active state */
          }
        `
      }} />
    </section>
  )
}