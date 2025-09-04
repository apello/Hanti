"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Shield, Home, Building, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("buyer")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { email, password, userType })
  }

  const userTypes = [
    {
      id: "buyer",
      label: "Buyer",
      icon: Home,
      description: "Looking to buy property"
    },
    {
      id: "agent",
      label: "Agent",
      icon: Users,
      description: "Real estate professional"
    },
    {
      id: "developer",
      label: "Developer",
      icon: Building,
      description: "Property developer"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Hanti</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setUserType(type.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${userType === type.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                  >
                    <type.icon className="h-6 w-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                    <div className="text-xs font-medium text-gray-900 dark:text-white">
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z"
                  />
                </svg>
                Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trust Signals */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1 text-green-600" />
              <span>Secure</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1 text-blue-600" />
              <span>Verified</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1 text-purple-600" />
              <span>Trusted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
