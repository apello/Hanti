"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false) // Close mobile menu
    router.push(path)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity">
                  Hanti
                </h1>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary"
                onClick={() => handleNavigation("/listings?type=buy")}
              >
                Buy
              </Button>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary"
                onClick={() => handleNavigation("/listings?type=rent")}
              >
                Rent
              </Button>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary"
                onClick={() => handleNavigation("/sell")}
              >
                Sell
              </Button>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary"
                onClick={() => handleNavigation("/market-insights")}
              >
                Market Insights
              </Button>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation("/dashboard")}
            >
              <Heart className="h-4 w-4 mr-2" />
              Saved
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavigation("/auth/login")}
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={() => handleNavigation("/auth/signup")}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation("/listings?type=buy")}
              >
                Buy
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation("/listings?type=rent")}
              >
                Rent
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation("/sell")}
              >
                Sell
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation("/market-insights")}
              >
                Market Insights
              </Button>
              <div className="pt-4 border-t border-border mt-4">
                <Button
                  variant="outline"
                  className="w-full mb-2 bg-transparent"
                  onClick={() => handleNavigation("/auth/login")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  className="w-full"
                  onClick={() => handleNavigation("/auth/signup")}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
