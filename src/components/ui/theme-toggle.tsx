"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="relative h-8 w-14 rounded-full border shadow-lg bg-background/80 backdrop-blur-sm border-border" />
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={cn(
          "relative h-8 w-14 rounded-full border shadow-lg transition-all duration-300",
          "bg-background/80 backdrop-blur-sm border-border",
          "hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
        aria-label="Toggle theme"
      >
        {/* Toggle Track */}
        <div className="absolute inset-0.5 rounded-full bg-muted transition-colors duration-300" />
        
        {/* Toggle Handle */}
        <div
          className={cn(
            "absolute top-0.5 h-6 w-6 rounded-full transition-all duration-300 ease-in-out",
            "bg-background border border-border shadow-sm",
            "flex items-center justify-center",
            theme === "dark" ? "translate-x-7" : "translate-x-0.5"
          )}
        >
          <Sun className="h-3 w-3 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-3 w-3 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-500" />
        </div>
        
        {/* Background Icons (subtle) */}
        <div className="absolute inset-0.5 flex items-center justify-between px-1">
          <Sun className="h-2.5 w-2.5 text-muted-foreground/50" />
          <Moon className="h-2.5 w-2.5 text-muted-foreground/50 dark:opacity-0" />
        </div>
      </button>
    </div>
  )
} 