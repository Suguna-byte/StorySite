"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Story } from "@/lib/db"
import { BookOpen, Sparkles, Star, Settings } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("/api/stories")
        const data = await response.json()
        setStories(data)
      } catch (error) {
        console.error("Failed to fetch stories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <motion.div
          className="text-3xl font-light text-white text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          Loading stories...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating elements */}
        <motion.div
          className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 right-20 w-12 h-12 bg-blue-400/20 rounded-full"
          animate={{
            y: [0, 20, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-indigo-400/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-white mb-6 font-serif"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="inline-block w-16 h-16 mr-4" />
              StoryVerse
              <Star className="inline-block w-16 h-16 ml-4" />
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Immersive storytelling experiences with elegant scroll-based narratives
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link href="/admin">
                <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-4 shadow-lg">
                  <Settings className="w-5 h-5 mr-2" />
                  Create Stories
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stories Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-slate-800 mb-4 font-serif">Discover Stories</h2>
          <p className="text-lg text-slate-600">Choose from our collection of immersive narratives</p>
        </motion.div>

        {stories.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <BookOpen className="w-24 h-24 mx-auto text-purple-400 mb-6" />
            <h3 className="text-2xl font-bold text-purple-600 mb-4">No stories yet!</h3>
            <p className="text-purple-500 mb-6">Create your first magical story to get started.</p>
            <Link href="/admin">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Create First Story
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, 1, -1, 0],
                  transition: { duration: 0.3 },
                }}
              >
                <Link href={`/story/${story.id}`}>
                  <Card className="border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white hover:bg-slate-50">
                    <CardHeader className="bg-gradient-to-r from-slate-100 to-blue-100">
                      <CardTitle className="text-slate-800 text-xl flex items-center font-serif">
                        <BookOpen className="w-5 h-5 mr-2" />
                        {story.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-slate-600 mb-4 text-base">by {story.author}</p>
                      <p className="text-slate-400 text-sm mb-4">
                        Created {new Date(story.created_at).toLocaleDateString()}
                      </p>
                      <motion.div
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-center font-medium"
                        whileHover={{ scale: 1.02 }}
                      >
                        Begin Reading →
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <motion.footer
        className="bg-slate-900 text-white py-12 mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-light">Crafted for storytellers and readers</p>
          <p className="text-slate-400 mt-2">Professional storytelling platform</p>
        </div>
      </motion.footer>
    </div>
  )
}
