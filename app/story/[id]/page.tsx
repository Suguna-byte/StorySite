"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import StoryPageComponent from "@/components/story-page"
import type { Story, StoryPage } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

export default function StoryViewer() {
  const params = useParams()
  const [story, setStory] = useState<Story | null>(null)
  const [pages, setPages] = useState<StoryPage[]>([])
  const [visiblePages, setVisiblePages] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`/api/stories/${params.id}`)
        const data = await response.json()
        setStory(data.story)
        setPages(data.pages)
      } catch (error) {
        console.error("Failed to fetch story:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStory()
  }, [params.id])

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const scrollTop = window.scrollY

      pages.forEach((page, index) => {
        const pageElement = document.getElementById(`page-${page.id}`)
        if (pageElement) {
          const rect = pageElement.getBoundingClientRect()
          const isVisible = rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3

          if (isVisible) {
            setVisiblePages((prev) => new Set(prev).add(page.id))
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial visibility

    return () => window.removeEventListener("scroll", handleScroll)
  }, [pages])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <motion.div
          className="text-3xl font-light text-white"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Loading story...
        </motion.div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Story not found!</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Fixed navigation */}
      <motion.div
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/95 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
      </motion.div>

      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/admin">
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
            <Home className="w-4 h-4 mr-2" />
            Admin
          </Button>
        </Link>
      </motion.div>

      {/* Story title */}
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center text-white max-w-4xl px-8">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 font-serif"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {story.title}
          </motion.h1>
          <motion.p
            className="text-xl mb-8 text-blue-200 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            by {story.author}
          </motion.p>
          <motion.div
            className="text-base text-blue-300 font-light"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Scroll to begin ↓
          </motion.div>
        </div>
      </motion.div>

      {/* Story pages */}
      {pages.map((page) => (
        <div key={page.id} id={`page-${page.id}`}>
          <StoryPageComponent page={page} isVisible={visiblePages.has(page.id)} />
        </div>
      ))}

      {/* End section */}
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center text-white">
          <motion.h2
            className="text-4xl font-bold mb-8 font-serif"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            The End
          </motion.h2>
          <motion.p
            className="text-lg mb-8 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Thank you for reading this story
          </motion.p>
          <Link href="/">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
              Discover More Stories
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
