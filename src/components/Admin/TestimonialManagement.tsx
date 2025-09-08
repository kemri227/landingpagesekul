import React, { useState, useEffect } from 'react'
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Upload, 
  message, 
  Space, 
  Popconfirm,
  Typography,
  Avatar
} from 'antd'
import { Plus, Edit, Trash2, Upload as UploadIcon } from 'lucide-react'
import { supabase } from '../../config/supabase'
import type { UploadFile } from 'antd'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Title } = Typography

interface Testimonial {
  id: string
  name: string
  message: string
  image_url?: string
  created_at: string
}

export const TestimonialManagement: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      message.error('Gagal mengambil data testimoni')
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `testimonials/${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, file)

    if (error) {
      message.error('Gagal upload foto')
      return null
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)

    return publicUrl
  }

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      let imageUrl = null
      
      if (fileList.length > 0 && fileList[0].originFileObj) {
        imageUrl = await uploadImage(fileList[0].originFileObj as File)
      }

      const testimonialData = {
        name: values.name,
        message: values.message,
        image_url: imageUrl
      }

      if (editingId) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', editingId)
        
        if (error) throw error
        message.success('Testimoni berhasil diperbarui')
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([testimonialData])
        
        if (error) throw error
        message.success('Testimoni berhasil ditambahkan')
      }

      resetForm()
      fetchTestimonials()
    } catch (error) {
      message.error('Gagal menyimpan testimoni')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      message.success('Testimoni berhasil dihapus')
      fetchTestimonials()
    } catch (error) {
      message.error('Gagal menghapus testimoni')
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setModalVisible(true)
    form.setFieldsValue({
      name: testimonial.name,
      message: testimonial.message
    })
  }

  const resetForm = () => {
    setModalVisible(false)
    setEditingId(null)
    setFileList([])
    form.resetFields()
  }

  const columns = [
    {
      title: 'Foto',
      dataIndex: 'image_url',
      key: 'image_url',
      width: 80,
      render: (url: string, record: Testimonial) => (
        <Avatar
          size={50}
          src={url}
          className="border-2 border-gray-200"
        >
          {record.name.charAt(0)}
        </Avatar>
      )
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Testimoni',
      dataIndex: 'message',
      key: 'message',
      render: (text: string) => text.slice(0, 100) + (text.length > 100 ? '...' : '')
    },
    {
      title: 'Tanggal',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_: any, record: Testimonial) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Hapus testimoni ini?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button
              danger
              size="small"
              icon={<Trash2 className="w-4 h-4" />}
            />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="mb-0">Kelola Testimoni</Title>
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setModalVisible(true)}
        >
          Tambah Testimoni
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={testimonials}
        rowKey="id"
        loading={loading}
        className="bg-white rounded-lg shadow-sm"
      />

      <Modal
        title={editingId ? 'Edit Testimoni' : 'Tambah Testimoni'}
        open={modalVisible}
        onCancel={resetForm}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-6"
        >
          <Form.Item
            name="name"
            label="Nama Alumni"
            rules={[{ required: true, message: 'Nama alumni wajib diisi!' }]}
          >
            <Input placeholder="Masukkan nama alumni" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Testimoni"
            rules={[{ required: true, message: 'Testimoni wajib diisi!' }]}
          >
            <TextArea 
              rows={5} 
              placeholder="Masukkan testimoni alumni"
            />
          </Form.Item>

          <Form.Item
            label="Upload Foto (Opsional)"
            help="Format yang didukung: JPG, PNG, JPEG (Maks. 2MB)"
          >
            <Upload
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
              accept="image/*"
              maxCount={1}
              listType="picture"
            >
              <Button icon={<UploadIcon className="w-4 h-4" />}>
                Pilih Foto
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button onClick={resetForm}>
                Batal
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingId ? 'Update' : 'Simpan'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}