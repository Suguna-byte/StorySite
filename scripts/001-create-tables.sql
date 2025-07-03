-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create story_pages table for individual pages/scenes
CREATE TABLE IF NOT EXISTS story_pages (
  id SERIAL PRIMARY KEY,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  background_color VARCHAR(7) DEFAULT '#FFE4E1',
  animation_type VARCHAR(50) DEFAULT 'fadeIn'
);

-- Insert sample story
INSERT INTO stories (title, author) VALUES 
('The Magic Forest Adventure', 'Story Teller');

-- Insert sample story pages
INSERT INTO story_pages (story_id, page_number, content, image_url, background_color, animation_type) VALUES 
(1, 1, 'Once upon a time, in a magical forest filled with talking animals and glowing flowers...', '/placeholder.svg?height=400&width=600', '#FFE4E1', 'slideInLeft'),
(1, 2, 'A brave little rabbit named Rosie discovered a mysterious golden key hidden under an old oak tree.', '/placeholder.svg?height=400&width=600', '#E1F5FE', 'slideInRight'),
(1, 3, 'The key opened a secret door that led to a world where dreams come true and adventures never end!', '/placeholder.svg?height=400&width=600', '#F3E5F5', 'fadeInUp'),
(1, 4, 'And they all lived happily ever after, with new friends and magical memories to last forever.', '/placeholder.svg?height=400&width=600', '#E8F5E8', 'bounceIn');
