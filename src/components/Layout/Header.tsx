import React from 'react'
import { Layout, Button, Drawer } from 'antd'
import { Menu as MenuOutlined, GraduationCapIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

const { Header: AntHeader } = Layout

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')
  const [isScrolled, setIsScrolled] = useState(false)

  const menuItems = [
    { key: 'beranda', label: 'Beranda' },
    { key: 'visi-misi', label: 'Visi Misi' },
    { key: 'program-unggulan', label: 'Program' },
    { key: 'fasilitas', label: 'Fasilitas' },
    { key: 'pengumuman', label: 'Pengumuman' },
    { key: 'kegiatan', label: 'Kegiatan' },
    { key: 'testimoni', label: 'Testimoni' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)

      // Update active section based on scroll position
      const sections = menuItems.map(item => item.key)
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      <AntHeader 
        className={`fixed w-full z-50 px-4 lg:px-6 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white shadow-lg border-b border-gray-100' 
            : 'bg-white/95'
        }`}
        style={{
          background: isScrolled 
            ? '#ffffff'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: isScrolled ? '1px solid #f1f5f9' : '1px solid rgba(229, 231, 235, 0.3)'
        }}
      >
        <div className="max-w-full mx-auto flex items-center justify-between h-18 lg:h-24 px-4 lg:px-8 py-3">
          {/* Enhanced Logo Section */}
          <div 
            className="flex items-center space-x-3 lg:space-x-4 cursor-pointer group flex-shrink-0"
            onClick={() => scrollToSection('beranda')}
          >
            <div className="relative">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 p-3">
                <GraduationCapIcon className="w-7 h-7 lg:w-9 lg:h-9 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 hidden sm:block">
                SMA Muslimin Cililin
              </span>
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 sm:hidden">
                SMA MC
              </span>
              <span className="text-xs lg:text-sm text-gray-600 font-medium hidden sm:block -mt-1">Terakreditasi A</span>
            </div>
          </div>

          {/* Enhanced Desktop Menu */}
          <div className="hidden xl:block flex-1 max-w-4xl mx-8">
            <div className="flex items-center justify-center space-x-3">
              {menuItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`navbar-menu-item ${
                    activeSection === item.key ? 'active' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Mobile/Tablet Menu */}
          <div className="hidden lg:block xl:hidden flex-1 max-w-2xl mx-6">
            <div className="flex items-center justify-center space-x-2">
              {menuItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`navbar-menu-item text-xs px-3 py-2 ${
                    activeSection === item.key ? 'active' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
            <Button
              type="primary"
              size="large"
              className="hidden lg:block border-0 rounded-lg px-6 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform bg-blue-600 hover:bg-blue-700 h-auto"
              onClick={() => scrollToSection('pengumuman')}
            >
              Info Pendaftaran
            </Button>
            
            <Button
              type="text"
              icon={<MenuOutlined className="text-xl lg:text-2xl" />}
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden hover:bg-gray-100 rounded-lg p-3 transition-all duration-300 h-auto"
            />
          </div>
        </div>
      </AntHeader>

      <Drawer
        title={
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCapIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800">Menu</span>
          </div>
        }
        placement="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
        width={280}
      >
        <div className="space-y-2">
          {menuItems.map(item => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.key)}
              className={`navbar-mobile-menu-item ${
                activeSection === item.key ? 'active' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="pt-4 border-t border-gray-200 mt-6">
            <Button
              type="primary"
              block
              size="large"
              className="bg-blue-600 hover:bg-blue-700 border-0 rounded-lg h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => {
                scrollToSection('pengumuman')
                setMobileMenuOpen(false)
              }}
            >
              Info Pendaftaran
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}