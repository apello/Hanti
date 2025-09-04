"use client"

import { Shield, Users, Star, Globe, Lock, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const trustSignals = [
  {
    icon: Shield,
    title: "Verified Agents & Properties",
    description: "All agents and properties undergo strict verification processes including KYC and listing validation",
    stats: "500+ Verified Agents"
  },
  {
    icon: Users,
    title: "Trusted Community",
    description: "Join thousands of satisfied customers who found their perfect property through Hanti",
    stats: "10,000+ Happy Customers"
  },
  {
    icon: Star,
    title: "5-Star Reviews",
    description: "Consistently high ratings from our community of buyers, sellers, and agents",
    stats: "4.8/5 Average Rating"
  },
  {
    icon: Globe,
    title: "Pan-African Coverage",
    description: "Properties available across major African cities with local expertise",
    stats: "50+ Cities Covered"
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description: "End-to-end encrypted payments with escrow protection for your peace of mind",
    stats: "100% Secure Payments"
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Award-winning platform recognized for innovation and customer service",
    stats: "Multiple Awards Won"
  }
]

export function TrustSignals() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trustSignals.map((signal) => (
        <Card key={signal.title} className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <signal.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {signal.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
              {signal.description}
            </p>

            <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
              {signal.stats}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
