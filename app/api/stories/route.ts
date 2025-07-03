import { type NextRequest, NextResponse } from "next/server"
import { getStories, createStory } from "@/lib/db"

export async function GET() {
  try {
    const stories = await getStories()
    return NextResponse.json(stories)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, author } = await request.json()

    if (!title || !author) {
      return NextResponse.json({ error: "Title and author are required" }, { status: 400 })
    }

    const story = await createStory(title, author)
    return NextResponse.json(story)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
  }
}
