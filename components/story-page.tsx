"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { StoryPage } from "@/lib/db"

interface StoryPageProps {
  page: StoryPage
  isVisible: boolean
}

const animationVariants = {
  slideInLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  },
  bounceIn: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        bounce: 0.4,
      },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  },
}

export default function StoryPageComponent({ page, isVisible }: StoryPageProps) {
  const animation = animationVariants[page.animation_type as keyof typeof animationVariants] || animationVariants.fadeIn

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
      style={{ backgroundColor: page.background_color }}
    >
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-6 h-6 bg-blue-300/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-indigo-300/30 rounded-full"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-8 h-8 bg-slate-300/30 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={animation}
      >
        {page.image_url && (
          <motion.div className="mb-8" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Image
              src={page.image_url || "/placeholder.svg?height=400&width=600"}
              alt={`Story page ${page.page_number}`}
              width={600}
              height={400}
              className="rounded-2xl shadow-xl mx-auto border border-slate-200"
              unoptimized
            />
          </motion.div>
        )}

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl font-light text-slate-800 leading-relaxed font-serif max-w-4xl"
          style={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
          }}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {page.content}
        </motion.p>

        <motion.div
          className="mt-8 text-base text-slate-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Page {page.page_number}
        </motion.div>
      </motion.div>
    </div>
  )
}
