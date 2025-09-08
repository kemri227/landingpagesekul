import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { AuthProvider } from './contexts/AuthContext'
import { LandingPage } from './pages/LandingPage'
import { AdminLogin } from './components/Admin/AdminLogin'
import { AdminDashboard } from './components/Admin/AdminDashboard'
import { ProtectedRoute } from './components/ProtectedRoute'

const theme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
    colorBgContainer: '#ffffff',
  },
}

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App