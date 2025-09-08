# School Landing Page & Admin Panel

Modern school landing page with dynamic content management system built with React.js, Ant Design, and Supabase.

## 🌟 Features

### Landing Page (Public)
- **Hero Section**: Carousel with school information and statistics
- **Vision & Mission**: Static content with beautiful card layouts
- **Facilities**: Grid display of school facilities
- **Announcements**: Dynamic announcements with file downloads
- **Events**: Dynamic events with images and dates
- **Testimonials**: Carousel of student/alumni testimonials
- **Responsive Design**: Mobile-first approach

### Admin Panel (Protected)
- **Authentication**: Email/password login with Supabase Auth
- **Dashboard**: Overview with statistics and quick actions
- **Content Management**:
  - Announcements with file upload (PDF/DOC/ZIP)
  - Events with image upload
  - Testimonials with photo upload
- **File Management**: Supabase Storage integration

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: Ant Design + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Date Handling**: Day.js

## 📦 Installation

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Setup Supabase**:
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Create `.env` file:
     ```env
     VITE_SUPABASE_URL=your-supabase-project-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

3. **Database Setup**:
   - Run the migration file in Supabase SQL editor
   - Create an admin user in Supabase Authentication
   - Set up storage buckets: `modules` and `images`

4. **Development**:
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

### Tables
- **announcements**: id, title, content, file_url, created_at
- **events**: id, title, description, date, image_url, created_at  
- **testimonials**: id, name, message, image_url, created_at

### Storage Buckets
- **modules**: For learning materials (PDF/DOC/ZIP)
- **images**: For event photos and testimonial pictures

## 🔐 Authentication

Admin access requires:
1. Create user in Supabase Authentication → Users
2. Use email/password to login via `/admin`
3. Access dashboard at `/admin/dashboard`

## 🎨 Design Features

- **Modern UI**: Clean, professional design with Ant Design
- **Responsive**: Mobile-first responsive design
- **Animations**: Smooth transitions and hover effects
- **Color Scheme**: Blue (#1890ff) primary with complementary colors
- **Typography**: Hierarchical text with proper spacing
- **Cards**: Consistent card-based layouts
- **Loading States**: Proper loading indicators

## 📱 Routes

- `/` - Landing page
- `/admin` - Admin login
- `/admin/dashboard` - Admin dashboard (protected)

## 🔧 Configuration

### Supabase Setup
1. Enable Row Level Security on all tables
2. Create storage buckets with public access
3. Set up proper policies for public read and authenticated write

### File Upload
- **Modules**: PDF, DOC, DOCX, ZIP (max 10MB)
- **Images**: JPG, PNG, JPEG (max 5MB)
- **Testimonial Photos**: JPG, PNG, JPEG (max 2MB)

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Supabase)
- Already hosted - no additional setup needed
- Free tier supports the application requirements

## 📊 Features Overview

### Content Management
- **CRUD Operations**: Full create, read, update, delete
- **File Upload**: Direct upload to Supabase Storage
- **Real-time Updates**: Changes reflect immediately on landing page
- **Rich Content**: Support for formatted text and media

### User Experience
- **Fast Loading**: Optimized queries and caching
- **Mobile Friendly**: Responsive design for all devices
- **Accessible**: Following accessibility best practices
- **SEO Ready**: Proper meta tags and semantic HTML

## 🛡️ Security

- **Row Level Security**: Enabled on all tables
- **Authentication**: Supabase Auth with email/password
- **File Security**: Controlled access to uploaded files
- **Input Validation**: Form validation on both client and server

## 📈 Performance

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Proper image sizing and formats
- **Caching**: Efficient data caching strategies
- **Bundle Optimization**: Tree shaking and code splitting

This system provides a complete solution for school websites with easy content management and professional presentation.# landingpagesekul
