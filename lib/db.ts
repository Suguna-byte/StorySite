import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface Story {
  id: number
  title: string
  author: string
  created_at: string
}

export interface StoryPage {
  id: number
  story_id: number
  page_number: number
  content: string
  image_url: string | null
  background_color: string
  animation_type: string
}

export async function getStories(): Promise<Story[]> {
  const stories = await sql`SELECT * FROM stories ORDER BY created_at DESC`
  return stories as Story[]
}

export async function getStoryWithPages(storyId: number): Promise<{
  story: Story
  pages: StoryPage[]
}> {
  const [story] = await sql`SELECT * FROM stories WHERE id = ${storyId}`
  const pages = await sql`
    SELECT * FROM story_pages 
    WHERE story_id = ${storyId} 
    ORDER BY page_number ASC
  `

  return {
    story: story as Story,
    pages: pages as StoryPage[],
  }
}

export async function createStory(title: string, author: string): Promise<Story> {
  const [story] = await sql`
    INSERT INTO stories (title, author) 
    VALUES (${title}, ${author}) 
    RETURNING *
  `
  return story as Story
}

export async function addStoryPage(
  storyId: number,
  pageNumber: number,
  content: string,
  imageUrl: string | null,
  backgroundColor: string,
  animationType: string,
): Promise<StoryPage> {
  const [page] = await sql`
    INSERT INTO story_pages (story_id, page_number, content, image_url, background_color, animation_type)
    VALUES (${storyId}, ${pageNumber}, ${content}, ${imageUrl}, ${backgroundColor}, ${animationType})
    RETURNING *
  `
  return page as StoryPage
}
