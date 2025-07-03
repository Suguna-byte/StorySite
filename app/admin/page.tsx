"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Story } from "@/lib/db"
import { Plus, BookOpen, Palette, Sparkles } from "lucide-react"
import Link from "next/link"

export default function AdminPanel() {
  const [stories, setStories] = useState<Story[]>([])
  const [selectedStory, setSelectedStory] = useState<number | null>(null)
  const [newStory, setNewStory] = useState({ title: "", author: "" })
  const [newPage, setNewPage] = useState({
    content: "",
    imageUrl: "",
    backgroundColor: "#F8FAFC",
    animationType: "fadeIn",
  })
  const [loading, setLoading] = useState(false)

  const animationTypes = [
    { value: "fadeIn", label: "Fade In" },
    { value: "slideInLeft", label: "Slide In Left" },
    { value: "slideInRight", label: "Slide In Right" },
    { value: "fadeInUp", label: "Fade In Up" },
    { value: "bounceIn", label: "Bounce In" },
  ]

  const backgroundColors = [
    { value: "#F8FAFC", label: "Light Gray", color: "#F8FAFC" },
    { value: "#EFF6FF", label: "Light Blue", color: "#EFF6FF" },
    { value: "#F0F9FF", label: "Sky Blue", color: "#F0F9FF" },
    { value: "#ECFDF5", label: "Light Green", color: "#ECFDF5" },
    { value: "#FFFBEB", label: "Light Amber", color: "#FFFBEB" },
    { value: "#FDF2F8", label: "Light Rose", color: "#FDF2F8" },
  ]

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch("/api/stories")
      const data = await response.json()
      setStories(data)
    } catch (error) {
      console.error("Failed to fetch stories:", error)
    }
  }

  const createStory = async () => {
    if (!newStory.title || !newStory.author) return

    setLoading(true)
    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStory),
      })

      if (response.ok) {
        setNewStory({ title: "", author: "" })
        fetchStories()
      }
    } catch (error) {
      console.error("Failed to create story:", error)
    } finally {
      setLoading(false)
    }
  }

  const addPage = async () => {
    if (!selectedStory || !newPage.content) return

    setLoading(true)
    try {
      const response = await fetch(`/api/stories/${selectedStory}/pages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageNumber: Date.now(), // Simple page numbering
          content: newPage.content,
          imageUrl: newPage.imageUrl || "/placeholder.svg?height=400&width=600",
          backgroundColor: newPage.backgroundColor,
          animationType: newPage.animationType,
        }),
      })

      if (response.ok) {
        setNewPage({
          content: "",
          imageUrl: "",
          backgroundColor: "#F8FAFC",
          animationType: "fadeIn",
        })
      }
    } catch (error) {
      console.error("Failed to add page:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-slate-800 mb-4 font-serif"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="inline-block w-8 h-8 mr-3" />
            Story Management
            <Sparkles className="inline-block w-8 h-8 ml-3" />
          </motion.h1>
          <p className="text-lg text-slate-600">Create and manage your story collection</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create New Story */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border border-slate-200 shadow-lg">
              <CardHeader className="bg-slate-100">
                <CardTitle className="flex items-center text-slate-800 font-serif">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Create New Story
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Input
                  placeholder="Story Title"
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  className="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <Input
                  placeholder="Author Name"
                  value={newStory.author}
                  onChange={(e) => setNewStory({ ...newStory, author: e.target.value })}
                  className="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <Button
                  onClick={createStory}
                  disabled={loading || !newStory.title || !newStory.author}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Story
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Add Story Page */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border border-slate-200 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-slate-800 font-serif">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Story Page
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Select onValueChange={(value) => setSelectedStory(Number.parseInt(value, 10))}>
                  <SelectTrigger className="border-2 border-pink-200">
                    <SelectValue placeholder="Select a story" />
                  </SelectTrigger>
                  <SelectContent>
                    {stories.map((story) => (
                      <SelectItem key={story.id} value={story.id.toString()}>
                        {story.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Textarea
                  placeholder="Page content..."
                  value={newPage.content}
                  onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                  className="border-2 border-pink-200 focus:border-pink-400 min-h-[100px]"
                />

                <Input
                  placeholder="Image URL (optional)"
                  value={newPage.imageUrl}
                  onChange={(e) => setNewPage({ ...newPage, imageUrl: e.target.value })}
                  className="border-2 border-pink-200 focus:border-pink-400"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-pink-800">
                      <Palette className="inline w-4 h-4 mr-1" />
                      Background Color
                    </label>
                    <Select
                      value={newPage.backgroundColor}
                      onValueChange={(value) => setNewPage({ ...newPage, backgroundColor: value })}
                    >
                      <SelectTrigger className="border-2 border-pink-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {backgroundColors.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center">
                              <div
                                className="w-4 h-4 rounded-full mr-2 border"
                                style={{ backgroundColor: color.color }}
                              />
                              {color.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-pink-800">Animation Type</label>
                    <Select
                      value={newPage.animationType}
                      onValueChange={(value) => setNewPage({ ...newPage, animationType: value })}
                    >
                      <SelectTrigger className="border-2 border-pink-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {animationTypes.map((animation) => (
                          <SelectItem key={animation.value} value={animation.value}>
                            {animation.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={addPage}
                  disabled={loading || !selectedStory || !newPage.content}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                >
                  Add Page
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Existing Stories */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800 font-serif">Story Collection</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-slate-100">
                    <CardTitle className="text-slate-800 text-lg font-serif">{story.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-slate-600 mb-4">by {story.author}</p>
                    <Link href={`/story/${story.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">View Story</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 bg-transparent"
            >
              View All Stories
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
