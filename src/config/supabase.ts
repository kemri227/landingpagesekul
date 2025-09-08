import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cdhhspipiplruqyzdhnc.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkaGhzcGlwaXBscnVxeXpkaG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNDM2MjEsImV4cCI6MjA3MjgxOTYyMX0.AymW10FI2MKSfQ3o8G3QuzLLJycP2gOZqhko80-M6FM'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          file_url?: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          file_url?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          file_url?: string
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          image_url?: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          image_url?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          image_url?: string
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          message: string
          image_url?: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          message: string
          image_url?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          message?: string
          image_url?: string
          created_at?: string
        }
      }
    }
  }
}