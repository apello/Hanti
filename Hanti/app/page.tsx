import { HeroSearch } from "@/components/hero-search";
import { FeaturedProperties } from "@/components/featured-properties";
import { QuickActions } from "@/components/quick-actions";
import { TrustSignals } from "@/components/trust-signals";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Find Your Dream Home in{" "}
              <span className="text-blue-600 dark:text-blue-400">Africa</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover verified properties, connect with trusted agents, and make informed decisions with our comprehensive real estate platform.
            </p>
          </div>

          <HeroSearch />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Handpicked properties from verified agents and developers
            </p>
          </div>

          <FeaturedProperties />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Would You Like to Do?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose your path in the real estate journey
            </p>
          </div>

          <QuickActions />
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Trust Hanti?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Building trust through transparency and verification
            </p>
          </div>

          <TrustSignals />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property through Hanti
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Sign Up Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule a Visit
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
