import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search Bar Skeleton */}
        <Card className="mb-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar Skeleton */}
          <div className="lg:w-80">
            <Card className="p-6">
              <Skeleton className="h-6 w-16 mb-4" />
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-4 w-20 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-px w-full" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1">
            {/* Results Header Skeleton */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-20" />
                <div className="flex items-center border rounded-md">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </div>

            {/* Properties Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Skeleton className="h-6 w-24" />
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-1" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-40 mb-3" />
                    <div className="flex items-center gap-4 mb-4">
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 flex-1" />
                      <Skeleton className="h-8 flex-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
