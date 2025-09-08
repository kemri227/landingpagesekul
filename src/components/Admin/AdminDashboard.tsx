import React, { useState } from 'react'
import { Layout, Menu, Button, Typography, Avatar, Dropdown } from 'antd'
import { LayoutDashboardIcon as DashboardIcon, Megaphone, Calendar, MessageSquare, LogOut, Settings, User } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { AnnouncementManagement } from './AnnouncementManagement'
import { EventManagement } from './EventManagement'
import { TestimonialManagement } from './TestimonialManagement'
import { DashboardOverview } from './DashboardOverview'

const { Header, Sider, Content } = Layout
const { Title } = Typography

export const AdminDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('dashboard')
  const { user, signOut } = useAuth()

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardIcon className="w-4 h-4" />,
      label: 'Dashboard',
    },
    {
      key: 'announcements',
      icon: <Megaphone className="w-4 h-4" />,
      label: 'Pengumuman',
    },
    {
      key: 'events',
      icon: <Calendar className="w-4 h-4" />,
      label: 'Event & Kegiatan',
    },
    {
      key: 'testimonials',
      icon: <MessageSquare className="w-4 h-4" />,
      label: 'Testimoni',
    },
  ]

  const handleSignOut = async () => {
    await signOut()
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <User className="w-4 h-4" />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <Settings className="w-4 h-4" />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogOut className="w-4 h-4" />,
      label: 'Logout',
      onClick: handleSignOut,
    },
  ]

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <DashboardOverview />
      case 'announcements':
        return <AnnouncementManagement />
      case 'events':
        return <EventManagement />
      case 'testimonials':
        return <TestimonialManagement />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        className="bg-white shadow-lg"
      >
        <div className="p-4 text-center border-b">
          <Title level={4} className="text-blue-600 mb-0">
            {collapsed ? 'SMA' : 'SMA Nusantara'}
          </Title>
          {!collapsed && (
            <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
          )}
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={({ key }) => setSelectedMenu(key)}
          className="border-0 mt-4"
        />
      </Sider>

      <Layout>
        <Header className="bg-white shadow-sm px-6 flex justify-between items-center">
          <div>
            <Title level={4} className="mb-0 text-gray-800">
              {menuItems.find(item => item.key === selectedMenu)?.label}
            </Title>
          </div>
          
          <div className="flex items-center space-x-4">
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Button type="text" className="flex items-center space-x-2">
                <Avatar size="small" className="bg-blue-500">
                  {user?.email?.charAt(0).toUpperCase()}
                </Avatar>
                <span className="hidden sm:inline text-gray-700">
                  {user?.email}
                </span>
              </Button>
            </Dropdown>
          </div>
        </Header>

        <Content className="p-6 bg-gray-50">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  )
}