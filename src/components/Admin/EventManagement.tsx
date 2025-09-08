import React, { useState, useEffect } from 'react'
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  DatePicker, 
  Upload, 
  message, 
  Space, 
  Popconfirm,
  Typography,
  Image
} from 'antd'
import { Plus, Edit, Trash2, Upload as UploadIcon } from 'lucide-react'
import { supabase } from '../../config/supabase'
import type { UploadFile } from 'antd'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Title } = Typography

interface Event {
  id: string
  title: string
  description: string
  date: string
  image_url?: string
  created_at: string
}

export const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      message.error('Gagal mengambil data event')
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `events/${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, file)

    if (error) {
      message.error('Gagal upload gambar')
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

      const eventData = {
        title: values.title,
        description: values.description,
        date: values.date.format('YYYY-MM-DD'),
        image_url: imageUrl
      }

      if (editingId) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingId)
        
        if (error) throw error
        message.success('Event berhasil diperbarui')
      } else {
        const { error } = await supabase
          .from('events')
          .insert([eventData])
        
        if (error) throw error
        message.success('Event berhasil ditambahkan')
      }

      resetForm()
      fetchEvents()
    } catch (error) {
      message.error('Gagal menyimpan event')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      message.success('Event berhasil dihapus')
      fetchEvents()
    } catch (error) {
      message.error('Gagal menghapus event')
    }
  }

  const handleEdit = (event: Event) => {
    setEditingId(event.id)
    setModalVisible(true)
    form.setFieldsValue({
      title: event.title,
      description: event.description,
      date: dayjs(event.date)
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
      title: 'Gambar',
      dataIndex: 'image_url',
      key: 'image_url',
      width: 100,
      render: (url: string) => (
        url ? (
          <Image
            src={url}
            width={60}
            height={40}
            style={{ objectFit: 'cover', borderRadius: 4 }}
          />
        ) : (
          <div className="w-15 h-10 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">No Image</span>
          </div>
        )
      )
    },
    {
      title: 'Judul',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Deskripsi',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text.slice(0, 100) + (text.length > 100 ? '...' : '')
    },
    {
      title: 'Tanggal Event',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_: any, record: Event) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Hapus event ini?"
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
        <Title level={4} className="mb-0">Kelola Event & Kegiatan</Title>
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setModalVisible(true)}
        >
          Tambah Event
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={events}
        rowKey="id"
        loading={loading}
        className="bg-white rounded-lg shadow-sm"
      />

      <Modal
        title={editingId ? 'Edit Event' : 'Tambah Event'}
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
            name="title"
            label="Judul Event"
            rules={[{ required: true, message: 'Judul event wajib diisi!' }]}
          >
            <Input placeholder="Masukkan judul event" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Deskripsi Event"
            rules={[{ required: true, message: 'Deskripsi event wajib diisi!' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Masukkan deskripsi event"
            />
          </Form.Item>

          <Form.Item
            name="date"
            label="Tanggal Event"
            rules={[{ required: true, message: 'Tanggal event wajib diisi!' }]}
          >
            <DatePicker 
              className="w-full"
              format="DD/MM/YYYY"
              placeholder="Pilih tanggal event"
            />
          </Form.Item>

          <Form.Item
            label="Upload Gambar (Opsional)"
            help="Format yang didukung: JPG, PNG, JPEG (Maks. 5MB)"
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
                Pilih Gambar
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