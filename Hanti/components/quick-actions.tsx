"use client"

import { Home, TrendingUp, DollarSign, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const quickActions = [
  {
    title: "Buy Property",
    description: "Find your dream home from verified listings",
    icon: Home,
    href: "/listings?type=buy",
    color: "bg-blue-500 hover:bg-blue-600",
    textColor: "text-blue-600"
  },
  {
    title: "Rent Property",
    description: "Browse rental properties in your preferred area",
    icon: Home,
    href: "/listings?type=rent",
    color: "bg-green-500 hover:bg-green-600",
    textColor: "text-green-600"
  },
  {
    title: "Sell Property",
    description: "List your property with verified agents",
    icon: DollarSign,
    href: "/sell",
    color: "bg-purple-500 hover:bg-purple-600",
    textColor: "text-purple-600"
  },
  {
    title: "Market Insights",
    description: "Get detailed analytics and trends",
    icon: BarChart3,
    href: "/market-insights",
    color: "bg-orange-500 hover:bg-orange-600",
    textColor: "text-orange-600"
  }
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickActions.map((action) => (
        <Card key={action.title} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <action.icon className="h-8 w-8 text-white" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {action.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              {action.description}
            </p>

            <Button
              className={`w-full ${action.color} text-white`}
              onClick={() => window.location.href = action.href}
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
