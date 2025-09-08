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
  Tag
} from 'antd'
import { Plus, Edit, Trash2, Upload as UploadIcon } from 'lucide-react'
import { supabase } from '../../config/supabase'
import type { UploadFile } from 'antd'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Title } = Typography

interface Announcement {
  id: string
  title: string
  content: string
  file_url?: string
  created_at: string
}

export const AnnouncementManagement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAnnouncements(data || [])
    } catch (error) {
      message.error('Gagal mengambil data pengumuman')
    } finally {
      setLoading(false)
    }
  }

  const uploadFile = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('modules')
      .upload(fileName, file)

    if (error) {
      message.error('Gagal upload file')
      return null
    }

    const { data: { publicUrl } } = supabase.storage
      .from('modules')
      .getPublicUrl(fileName)

    return publicUrl
  }

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      let fileUrl = null
      
      if (fileList.length > 0 && fileList[0].originFileObj) {
        fileUrl = await uploadFile(fileList[0].originFileObj as File)
      }

      const announcementData = {
        title: values.title,
        content: values.content,
        file_url: fileUrl
      }

      if (editingId) {
        const { error } = await supabase
          .from('announcements')
          .update(announcementData)
          .eq('id', editingId)
        
        if (error) throw error
        message.success('Pengumuman berhasil diperbarui')
      } else {
        const { error } = await supabase
          .from('announcements')
          .insert([announcementData])
        
        if (error) throw error
        message.success('Pengumuman berhasil ditambahkan')
      }

      resetForm()
      fetchAnnouncements()
    } catch (error) {
      message.error('Gagal menyimpan pengumuman')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      message.success('Pengumuman berhasil dihapus')
      fetchAnnouncements()
    } catch (error) {
      message.error('Gagal menghapus pengumuman')
    }
  }

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id)
    setModalVisible(true)
    form.setFieldsValue({
      title: announcement.title,
      content: announcement.content
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
      title: 'Judul',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Konten',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => text.slice(0, 100) + (text.length > 100 ? '...' : '')
    },
    {
      title: 'File Modul',
      dataIndex: 'file_url',
      key: 'file_url',
      render: (url: string) => url ? <Tag color="green">Ada File</Tag> : <Tag>Tidak Ada</Tag>
    },
    {
      title: 'Tanggal',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_: any, record: Announcement) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Hapus pengumuman ini?"
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
        <Title level={4} className="mb-0">Kelola Pengumuman</Title>
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setModalVisible(true)}
        >
          Tambah Pengumuman
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={announcements}
        rowKey="id"
        loading={loading}
        className="bg-white rounded-lg shadow-sm"
      />

      <Modal
        title={editingId ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
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
            label="Judul Pengumuman"
            rules={[{ required: true, message: 'Judul wajib diisi!' }]}
          >
            <Input placeholder="Masukkan judul pengumuman" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Isi Pengumuman"
            rules={[{ required: true, message: 'Isi pengumuman wajib diisi!' }]}
          >
            <TextArea 
              rows={6} 
              placeholder="Masukkan isi pengumuman"
            />
          </Form.Item>

          <Form.Item
            label="Upload Modul (Opsional)"
            help="Format yang didukung: PDF, DOC, DOCX, ZIP (Maks. 10MB)"
          >
            <Upload
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
              accept=".pdf,.doc,.docx,.zip"
              maxCount={1}
            >
              <Button icon={<UploadIcon className="w-4 h-4" />}>
                Pilih File
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