"use client"

import { useState } from "react"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Hanti</h1>
            </Link>
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Check your email
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>

              <div className="space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Didn't receive the email? Check your spam folder or try again.
                </p>

                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full"
                >
                  Try again
                </Button>

                <Link
                  href="/auth/login"
                  className="block text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Back to sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Hanti</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Forgot your password?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Reset Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset instructions"}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
