"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, Loader2, Sparkles, Handshake, Star, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

// Match your Backend Schema
interface Review {
  _id: string;
  reviewerName: string;
  reviewerTitle: string;
  reviewText: string;
  rating: number;
  avatar?: string;
}

export default function Reviews() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })

  // Data fetching states
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formData, setFormData] = useState({
    reviewerName: "",
    reviewerEmail: "",
    reviewerTitle: "",
    reviewText: "",
    rating: 5,
  })

  // Fetch approved reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reviews')
        const result = await response.json()

        if (result.success) {
          setReviews(result.data)
        } else {
          setError(result.message || "Failed to load reviews")
        }
      } catch (err) {
        setError("Could not connect to the server")
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const result = await response.json()

      if (result.success) {
        setFormSuccess(true)
        // Reset form
        setFormData({ reviewerName: "", reviewerEmail: "", reviewerTitle: "", reviewText: "", rating: 5 })
      }
    } catch (err) {
      console.error("Failed to submit review", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Duplicate reviews array to create a seamless infinite loop
  const marqueeReviews = [...reviews, ...reviews, ...reviews]

  const hasReviews = reviews.length > 0

  const content = isLoading ? (
    <div className="py-12 flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
    </div>
  ) : error ? (
    <div className="py-12 flex items-center justify-center">
      <p className="text-red-500">{error}</p>
    </div>
  ) : hasReviews ? (
    <div className="relative flex overflow-x-hidden w-full group py-4">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6 px-3 cursor-grab active:cursor-grabbing w-max"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {marqueeReviews.map((review, index) => (
          <Card key={`${review._id}-${index}`} className="w-[350px] md:w-[400px] shrink-0 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 relative overflow-hidden">
            <CardContent className="p-6">
              <div className="absolute top-4 right-4 text-4xl font-black text-muted/10 pointer-events-none font-space-grotesk z-0">
                {String((index % reviews.length) + 1).padStart(2, '0')}
              </div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <Quote className="w-6 h-6 text-purple-500/30 transition-colors" />
                <div className="flex gap-1">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <blockquote className="text-muted-foreground mb-6 leading-relaxed text-sm line-clamp-4 relative z-10">
                "{review.reviewText}"
              </blockquote>

              <div className="flex items-center gap-3 relative z-10">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.reviewerName} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold text-sm">
                    {review.reviewerName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="font-semibold text-sm">{review.reviewerName}</div>
                  <div className="text-xs text-muted-foreground">
                    {review.reviewerTitle}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  ) : (
    <div className="text-center text-muted-foreground py-12">
      No reviews yet. Be the first to leave one!
    </div>
  )

  return (
    <section id="reviews" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent pointer-events-none" />

      <div className="max-w-full z-10 mx-auto" ref={ref}>
        {/* Header with Dedicated Add Review Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 px-4"
        >
          <div className="flex justify-center mb-4">
            <Sparkles className="w-10 h-10 text-yellow-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-space-grotesk mb-6">What People Say</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Here's what friends, colleagues, and clients have to say about working with me and using my products.
          </p>

          {/* DEDICATED LEAVE A REVIEW MODAL */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25 rounded-full px-8 py-6 text-md font-medium">
                <Plus className="w-5 h-5 mr-2" />
                Leave a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Leave a Review</DialogTitle>
                <DialogDescription>
                  Share your experience working with me. Your review will be publicly visible on my portfolio once approved.
                </DialogDescription>
              </DialogHeader>

              {formSuccess ? (
                <div className="py-6 text-center text-emerald-500 flex flex-col items-center gap-2">
                  <Sparkles className="w-12 h-12" />
                  <p className="text-lg font-medium">Thank you for your feedback!</p>
                  <p className="text-sm text-muted-foreground">Your review has been sent and is pending approval.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" required placeholder="John Doe" value={formData.reviewerName} onChange={(e) => setFormData({...formData, reviewerName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-xs text-muted-foreground">(Private)</span></Label>
                      <Input id="email" type="email" required placeholder="john@company.com" value={formData.reviewerEmail} onChange={(e) => setFormData({...formData, reviewerEmail: e.target.value})} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Your Role / Company</Label>
                    <Input id="title" required placeholder="Product Manager at TechCorp" value={formData.reviewerTitle} onChange={(e) => setFormData({...formData, reviewerTitle: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review">Review</Label>
                    <Textarea id="review" required placeholder="What was it like working together?" className="min-h-[100px]" value={formData.reviewText} onChange={(e) => setFormData({...formData, reviewText: e.target.value})} />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Submit Review
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>

        {content}

        {/* Call to Action (Now just a simple scroll/link to Contact) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16 px-4"
        >
          <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
            <span className="text-lg font-medium">Ready to start a project?</span>
            <Handshake className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}