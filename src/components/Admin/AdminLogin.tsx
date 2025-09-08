import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message, Spin } from 'antd'
import { User, Lock, GraduationCap } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

export const AdminLogin: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url' || supabaseKey === 'your-supabase-anon-key') {
        message.error('Supabase belum dikonfigurasi. Silakan hubungkan ke Supabase terlebih dahulu.')
        setLoading(false)
        return
      }

      const { error } = await signIn(values.email, values.password)
      
      if (error) {
        message.error(`Login gagal: ${error.message}`)
      } else {
        message.success('Login berhasil!')
        navigate('/admin/dashboard')
      }
    } catch (error) {
      message.error(`Terjadi kesalahan saat login: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <Title level={2} className="text-gray-800 mb-2">
            Admin Panel
          </Title>
          <Paragraph className="text-gray-600">
            SMA Nusantara
          </Paragraph>
        </div>

        <Spin spinning={loading}>
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Masukkan email!' },
                { type: 'email', message: 'Format email tidak valid!' }
              ]}
            >
              <Input 
                prefix={<User className="w-4 h-4 text-gray-400" />}
                placeholder="admin@smanusantara.sch.id"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Masukkan password!' }]}
            >
              <Input.Password
                prefix={<Lock className="w-4 h-4 text-gray-400" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                block
                className="bg-blue-600 hover:bg-blue-700 border-0 h-12 text-lg"
                loading={loading}
              >
                Masuk
              </Button>
            </Form.Item>
          </Form>
        </Spin>

        <div className="text-center text-sm text-gray-500 mt-6">
          <Paragraph className="text-xs">
            Hanya untuk administrator sekolah
          </Paragraph>
        </div>
      </Card>
    </div>
  )
}