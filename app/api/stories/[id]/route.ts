import { type NextRequest, NextResponse } from "next/server"
import { getStoryWithPages } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const storyId = Number.parseInt(params.id, 10)
    const result = await getStoryWithPages(storyId)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch story" }, { status: 500 })
  }
}
