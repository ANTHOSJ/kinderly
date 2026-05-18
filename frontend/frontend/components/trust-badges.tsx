"use client"

import { useEffect, useRef } from "react"

const badges = [
  { name: "Forbes", icon: "Forbes" },
  { name: "TechCrunch", icon: "TC" },
  { name: "Parents Magazine", icon: "PM" },
  { name: "Good Housekeeping", icon: "GH" },
  { name: "Inc. 5000", icon: "Inc" },
  { name: "Today Show", icon: "NBC" },
]

export function TrustBadges() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollPosition += scrollSpeed
      if (scrollContainer.scrollWidth / 2 <= scrollPosition) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <section className="py-16 bg-background border-y border-border/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-10 uppercase tracking-wider">
          As Featured In
        </p>
        
        <div 
          ref={scrollRef}
          className="flex items-center gap-12 lg:gap-16 overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: 'auto' }}
        >
          {/* Double the badges for infinite scroll effect */}
          {[...badges, ...badges].map((badge, index) => (
            <div
              key={`${badge.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-12 px-6"
            >
              <span className="text-2xl font-serif font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors whitespace-nowrap">
                {badge.icon === "Forbes" ? "Forbes" : 
                 badge.icon === "TC" ? "TechCrunch" :
                 badge.icon === "PM" ? "Parents" :
                 badge.icon === "GH" ? "Good Housekeeping" :
                 badge.icon === "Inc" ? "Inc. 5000" :
                 "Today Show"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
