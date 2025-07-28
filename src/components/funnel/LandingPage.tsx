import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, DollarSign, TrendingUp, Users, Star, ArrowRight, Clock, Shield, Award, Zap } from 'lucide-react'
import { ImprovedVSL } from './ImprovedVSL'

interface LandingPageProps {
  onGetStarted: () => void
  onSignIn?: () => void
}

export function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const [spotsRemaining, setSpotsRemaining] = useState(7)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 32
  })
  const [showFloatingBar, setShowFloatingBar] = useState(false)

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simulate spots being taken
  useEffect(() => {
    const spotTimer = setInterval(() => {
      setSpotsRemaining(prev => {
        if (prev > 3) {
          return Math.max(3, prev - 1)
        }
        return prev
      })
    }, 45000) // Reduce spots every 45 seconds

    return () => clearInterval(spotTimer)
  }, [])

  // Show floating urgency bar after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingBar(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const benefits = [
    "Earn 30-50% recurring commission on every deal",
    "No experience required - we provide full training",
    "Work from anywhere with flexible schedule",
    "Unlimited earning potential",
    "Full support and marketing materials provided",
    "Build true residual income that grows monthly"
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Partner since 2023",
      quote: "I've earned over $15,000 in monthly residuals in just 8 months. This program changed my life!",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Top Performer",
      quote: "The training and support are incredible. I went from zero to $8K/month in 6 months.",
      rating: 5
    },
    {
      name: "Jennifer Chen",
      role: "Regional Partner",
      quote: "Finally found a business model that actually works. The residual income keeps growing!",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header - ClickFunnels Style */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FIc4nFxpkp1eEscNnZWvYLRYS71K2%2FMFALogoArrow2__caeb4938.png?alt=media&token=77f8136b-d804-410c-aeb5-a99e96cba2fa" 
              alt="MFA Logo" 
              className="h-8 sm:h-12 w-auto"
            />
            <div className="text-lg sm:text-xl font-bold text-gray-800">
              <span className="hidden sm:inline">Merchant Fee Advocate</span>
              <span className="sm:hidden">MFA</span>
            </div>
          </div>
          {onSignIn && (
            <Button onClick={onSignIn} variant="ghost" className="text-gray-600 hover:text-gray-800 text-sm sm:text-base">
              Partner Login
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section - Above the Fold with VSL */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 animate-pulse">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">LIMITED TIME: Only {spotsRemaining} Spots Left - Expires in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
              <span className="sm:hidden">{spotsRemaining} Spots - {timeLeft.hours}h {timeLeft.minutes}m</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Welcome to the <span className="text-blue-600">5 Referral Challenge</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-2 max-w-4xl mx-auto px-4">
              Discover How Our Partners Are Building <span className="font-bold text-green-600">$10K-$50K Monthly Residual Income</span> 
            </p>
            <p className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto px-4">
              By Simply Referring Businesses to Our Payment Processing Services (No Experience Required!)
            </p>
          </div>

          {/* VSL Video - Improved Conversational Version */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
            <ImprovedVSL onComplete={() => {
              // Scroll to CTA when video completes
              const ctaElement = document.getElementById('primary-cta')
              if (ctaElement) {
                ctaElement.scrollIntoView({ behavior: 'smooth' })
              }
            }} />
          </div>

          {/* Primary CTA - Prominent Below Video */}
          <div id="primary-cta" className="text-center px-4">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl md:text-2xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <span className="hidden sm:inline">YES! I Want to Start the 5 Referral Challenge</span>
              <span className="sm:hidden">Start 5 Referral Challenge</span>
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <div className="mt-4 space-y-1">
              <p className="text-xs sm:text-sm text-gray-600">
                ✓ No upfront costs ✓ Full training included ✓ Start earning within 30 days
              </p>
              <p className="text-xs text-red-600 font-semibold">
                ⚠️ Only {spotsRemaining} spots available this month - {25 - spotsRemaining} already taken
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join 500+ Partners Already Earning Residual Income
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Real results from real people in the program
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center mb-12 sm:mb-16">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <DollarSign className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 text-green-600" />
              <div className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">$2.5M+</div>
              <p className="text-xs sm:text-base text-gray-600">Total Partner Earnings</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <Users className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 text-blue-600" />
              <div className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">500+</div>
              <p className="text-xs sm:text-base text-gray-600">Active Partners</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 text-purple-600" />
              <div className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">45%</div>
              <p className="text-xs sm:text-base text-gray-600">Average Commission Rate</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <Star className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 text-yellow-500" />
              <div className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">4.9/5</div>
              <p className="text-xs sm:text-base text-gray-600">Partner Satisfaction</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 sm:mb-6 italic text-base sm:text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You Get When You Join Today
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Everything you need to start earning residual income immediately
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <p className="text-gray-700 font-medium text-base sm:text-lg leading-relaxed">{benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Urgency Bar */}
      {showFloatingBar && (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-white z-50 shadow-lg animate-slide-down">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 animate-pulse" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-bold text-sm sm:text-base">⚠️ LIMITED TIME:</span>
                <span className="text-sm sm:text-base">Only {spotsRemaining} spots left - Expires in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={onGetStarted}
                size="sm"
                className="bg-white text-red-600 hover:bg-gray-100 font-bold px-4 py-2 text-sm"
              >
                Claim Spot
              </Button>
              <button 
                onClick={() => setShowFloatingBar(false)}
                className="text-white hover:text-gray-200 text-xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Start Your 5 Referral Challenge?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-green-100">
            Join the next group of partners building 6-figure residual income
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">Step 1</div>
                <p className="text-green-100 text-sm sm:text-base">Complete Your Application</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">Step 2</div>
                <p className="text-green-100 text-sm sm:text-base">Get Your Training & Tools</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">Step 3</div>
                <p className="text-green-100 text-sm sm:text-base">Start Earning Residuals</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-green-700 hover:bg-gray-100 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl md:text-2xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <span className="hidden sm:inline">Start My 5 Referral Challenge Now</span>
            <span className="sm:hidden">Start Challenge Now</span>
            <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          
          <div className="mt-4 sm:mt-6 space-y-2">
            <p className="text-green-200 text-sm sm:text-base">
              ✓ 30-day money-back guarantee ✓ No hidden fees ✓ Full support included
            </p>
            <p className="text-xs sm:text-sm text-green-300 font-semibold">
              🔥 Limited Time: Only {spotsRemaining} spots remaining this month
            </p>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FIc4nFxpkp1eEscNnZWvYLRYS71K2%2FMFALogoArrow2__caeb4938.png?alt=media&token=77f8136b-d804-410c-aeb5-a99e96cba2fa" 
              alt="MFA Logo" 
              className="h-8 sm:h-10 w-auto"
            />
            <div className="text-base sm:text-lg font-bold text-white">
              <span className="hidden sm:inline">Merchant Fee Advocate</span>
              <span className="sm:hidden">MFA</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm">
            &copy; 2024 Merchant Fee Advocate. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </div>
  )
}