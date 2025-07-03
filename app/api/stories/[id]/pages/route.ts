import { type NextRequest, NextResponse } from "next/server"
import { addStoryPage } from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const storyId = Number.parseInt(params.id, 10)
    const { pageNumber, content, imageUrl, backgroundColor, animationType } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const page = await addStoryPage(
      storyId,
      pageNumber,
      content,
      imageUrl,
      backgroundColor || "#FFE4E1",
      animationType || "fadeIn",
    )

    return NextResponse.json(page)
  } catch (error) {
    return NextResponse.json({ error: "Failed to add story page" }, { status: 500 })
  }
}
