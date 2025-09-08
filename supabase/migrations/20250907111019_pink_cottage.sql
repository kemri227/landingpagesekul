/*
  # Create School Management Schema

  1. New Tables
    - `announcements`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required)
      - `file_url` (text, optional) - link to uploaded module files
      - `created_at` (timestamp)
    
    - `events`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `date` (date, required)
      - `image_url` (text, optional) - link to event images
      - `created_at` (timestamp)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `message` (text, required)
      - `image_url` (text, optional) - link to profile photos
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (for landing page)
    - Add policies for authenticated users to manage content (admin)

  3. Storage
    - Create storage buckets for modules and images
    - Set appropriate policies for file access
*/

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  file_url text,
  created_at timestamptz DEFAULT now()
);

-- Create events table  
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (landing page)
CREATE POLICY "Allow public read access for announcements"
  ON announcements
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access for events"
  ON events
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access for testimonials"
  ON testimonials
  FOR SELECT
  TO anon
  USING (true);

-- Create policies for authenticated users (admin access)
CREATE POLICY "Allow authenticated users to manage announcements"
  ON announcements
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage events"
  ON events
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('modules', 'modules', true),
  ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Allow authenticated users to upload modules"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'modules');

CREATE POLICY "Allow authenticated users to upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow public access to view modules"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'modules');

CREATE POLICY "Allow public access to view images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'images');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS announcements_created_at_idx ON announcements(created_at DESC);
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date DESC);
CREATE INDEX IF NOT EXISTS events_created_at_idx ON events(created_at DESC);
CREATE INDEX IF NOT EXISTS testimonials_created_at_idx ON testimonials(created_at DESC);