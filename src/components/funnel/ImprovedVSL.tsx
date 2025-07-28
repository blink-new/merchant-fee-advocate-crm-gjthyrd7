import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface ImprovedVSLProps {
  onComplete?: () => void
}

export function ImprovedVSL({ onComplete }: ImprovedVSLProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // More conversational, humanistic script with natural pauses
  const script = [
    {
      text: "Hey there! Thanks for watching this video...",
      duration: 3000,
      slide: {
        title: "Welcome to the 5 Referral Challenge",
        subtitle: "A Simple System for Building Residual Income",
        background: "bg-gradient-to-br from-blue-600 to-purple-700"
      }
    },
    {
      text: "Look, I know you're probably skeptical... and honestly? You should be.",
      duration: 4000,
      slide: {
        title: "I Get It - You're Skeptical",
        subtitle: "You've probably seen a lot of 'opportunities' before",
        background: "bg-gradient-to-br from-gray-700 to-gray-900"
      }
    },
    {
      text: "There's a lot of noise out there about making money online... most of it is just hype.",
      duration: 4500,
      slide: {
        title: "Most 'Opportunities' Are Just Hype",
        subtitle: "But this is different - and I'll show you why",
        background: "bg-gradient-to-br from-red-600 to-red-800"
      }
    },
    {
      text: "But what I'm about to share with you... it's not some get-rich-quick scheme.",
      duration: 4000,
      slide: {
        title: "This Isn't Get-Rich-Quick",
        subtitle: "It's a real business model with real results",
        background: "bg-gradient-to-br from-green-600 to-green-800"
      }
    },
    {
      text: "It's a real business model that's helping regular people... people just like you... build serious residual income.",
      duration: 5500,
      slide: {
        title: "Real People, Real Results",
        subtitle: "Building $10K-$50K Monthly Residual Income",
        background: "bg-gradient-to-br from-blue-600 to-indigo-700"
      }
    },
    {
      text: "My name is with Merchant Fee Advocate... and for the past few years, we've been quietly building something special.",
      duration: 5000,
      slide: {
        title: "About Merchant Fee Advocate",
        subtitle: "Quietly building something special for years",
        background: "bg-gradient-to-br from-purple-600 to-purple-800"
      }
    },
    {
      text: "See, every business... and I mean EVERY business... needs payment processing to accept credit cards.",
      duration: 5000,
      slide: {
        title: "Every Business Needs This",
        subtitle: "Payment processing is essential for all businesses",
        background: "bg-gradient-to-br from-orange-600 to-red-700"
      }
    },
    {
      text: "But here's the thing most people don't know... most businesses are overpaying for this service.",
      duration: 4500,
      slide: {
        title: "Most Businesses Are Overpaying",
        subtitle: "They don't know they can save thousands per year",
        background: "bg-gradient-to-br from-yellow-600 to-orange-700"
      }
    },
    {
      text: "We help them save money... sometimes thousands of dollars per year... and they love us for it.",
      duration: 5000,
      slide: {
        title: "We Help Them Save Thousands",
        subtitle: "Businesses love us for reducing their costs",
        background: "bg-gradient-to-br from-green-600 to-teal-700"
      }
    },
    {
      text: "Now here's where it gets interesting for you...",
      duration: 3500,
      slide: {
        title: "Here's Where You Come In",
        subtitle: "This is where it gets interesting...",
        background: "bg-gradient-to-br from-indigo-600 to-purple-700"
      }
    },
    {
      text: "When you refer a business to us... and we help them save money... we share our revenue with you.",
      duration: 5500,
      slide: {
        title: "We Share Our Revenue With You",
        subtitle: "Every business you refer = monthly residual income",
        background: "bg-gradient-to-br from-green-600 to-emerald-700"
      }
    },
    {
      text: "Not just once... but every single month... for as long as they're our client.",
      duration: 4500,
      slide: {
        title: "Every Single Month",
        subtitle: "Residual income that keeps growing",
        background: "bg-gradient-to-br from-blue-600 to-cyan-700"
      }
    },
    {
      text: "Think about that for a second... one referral could pay you for years.",
      duration: 4000,
      slide: {
        title: "One Referral = Years of Income",
        subtitle: "The power of true residual income",
        background: "bg-gradient-to-br from-purple-600 to-pink-700"
      }
    },
    {
      text: "Sarah from Texas referred just 12 businesses last year... she's now earning over fifteen thousand dollars per month.",
      duration: 6000,
      slide: {
        title: "Sarah: 12 Referrals = $15K/Month",
        subtitle: "Real partner, real results from Texas",
        background: "bg-gradient-to-br from-teal-600 to-green-700"
      }
    },
    {
      text: "Mike in Florida started with us eight months ago... he's already at eight thousand per month and growing.",
      duration: 5500,
      slide: {
        title: "Mike: $8K/Month in 8 Months",
        subtitle: "Started from zero, now building wealth",
        background: "bg-gradient-to-br from-orange-600 to-yellow-700"
      }
    },
    {
      text: "Now, you might be thinking... 'This sounds great, but I don't know anything about payment processing.'",
      duration: 5000,
      slide: {
        title: "\"I Don't Know Payment Processing\"",
        subtitle: "That's exactly what most of our top partners said",
        background: "bg-gradient-to-br from-gray-600 to-gray-800"
      }
    },
    {
      text: "And you know what? Neither did they when they started.",
      duration: 3500,
      slide: {
        title: "Neither Did They",
        subtitle: "Experience is NOT required",
        background: "bg-gradient-to-br from-red-600 to-pink-700"
      }
    },
    {
      text: "That's the beauty of this system... you don't need to be an expert. We handle all the technical stuff.",
      duration: 5000,
      slide: {
        title: "We Handle the Technical Stuff",
        subtitle: "You just make the introduction",
        background: "bg-gradient-to-br from-blue-600 to-indigo-700"
      }
    },
    {
      text: "Your job is simple... find businesses that accept credit cards... and introduce them to us.",
      duration: 5000,
      slide: {
        title: "Your Job Is Simple",
        subtitle: "Find businesses → Make introductions → Earn residuals",
        background: "bg-gradient-to-br from-green-600 to-teal-700"
      }
    },
    {
      text: "We do the analysis... we do the presentation... we handle the setup... you get paid.",
      duration: 5000,
      slide: {
        title: "We Do Everything Else",
        subtitle: "Analysis → Presentation → Setup → You Get Paid",
        background: "bg-gradient-to-br from-purple-600 to-indigo-700"
      }
    },
    {
      text: "Now, I'm not going to lie to you... this isn't passive income on day one.",
      duration: 4500,
      slide: {
        title: "This Isn't Passive on Day One",
        subtitle: "But it becomes more passive over time",
        background: "bg-gradient-to-br from-orange-600 to-red-700"
      }
    },
    {
      text: "You'll need to put in some work upfront... but once you build your portfolio of referrals... that's when the magic happens.",
      duration: 6000,
      slide: {
        title: "Build Your Portfolio",
        subtitle: "Then the magic happens - true residual income",
        background: "bg-gradient-to-br from-yellow-600 to-orange-700"
      }
    },
    {
      text: "Imagine waking up every morning... checking your phone... and seeing money that came in while you were sleeping.",
      duration: 6000,
      slide: {
        title: "Money While You Sleep",
        subtitle: "The dream of true financial freedom",
        background: "bg-gradient-to-br from-indigo-600 to-purple-700"
      }
    },
    {
      text: "That's what residual income feels like... and it's what our partners experience every single day.",
      duration: 5000,
      slide: {
        title: "What Our Partners Experience",
        subtitle: "Every single day - true residual income",
        background: "bg-gradient-to-br from-green-600 to-emerald-700"
      }
    },
    {
      text: "So here's what I want to do... I want to challenge you to refer just five businesses in the next 90 days.",
      duration: 6000,
      slide: {
        title: "The 5 Referral Challenge",
        subtitle: "Just 5 businesses in 90 days",
        background: "bg-gradient-to-br from-blue-600 to-cyan-700"
      }
    },
    {
      text: "That's it... just five. If you can't find five businesses that accept credit cards in 90 days... then this probably isn't for you.",
      duration: 6500,
      slide: {
        title: "Just Five Businesses",
        subtitle: "If you can't find 5, this isn't for you",
        background: "bg-gradient-to-br from-red-600 to-orange-700"
      }
    },
    {
      text: "But if you can... and I believe you can... you could be looking at your first thousand dollars in monthly residuals within 6 months.",
      duration: 6500,
      slide: {
        title: "$1,000+ Monthly in 6 Months",
        subtitle: "From just 5 referrals - and that's conservative",
        background: "bg-gradient-to-br from-green-600 to-teal-700"
      }
    },
    {
      text: "And that's just the beginning... because once you see how this works... you'll want to refer more.",
      duration: 5500,
      slide: {
        title: "That's Just the Beginning",
        subtitle: "Once you see how it works, you'll want more",
        background: "bg-gradient-to-br from-purple-600 to-pink-700"
      }
    },
    {
      text: "Now, I have to be honest with you... we can't take everyone.",
      duration: 4000,
      slide: {
        title: "We Can't Take Everyone",
        subtitle: "This opportunity has limitations",
        background: "bg-gradient-to-br from-gray-600 to-gray-800"
      }
    },
    {
      text: "We're only looking for 25 new partners this month... and we're already more than halfway there.",
      duration: 5000,
      slide: {
        title: "Only 25 New Partners This Month",
        subtitle: "Already more than halfway there",
        background: "bg-gradient-to-br from-red-600 to-red-800"
      }
    },
    {
      text: "So if this sounds interesting to you... if you're ready to take control of your financial future... click the button below.",
      duration: 6000,
      slide: {
        title: "Ready to Take Control?",
        subtitle: "Click the button below to get started",
        background: "bg-gradient-to-br from-green-600 to-emerald-700"
      }
    },
    {
      text: "Fill out the quick application... and let's see if you're a good fit for our program.",
      duration: 4500,
      slide: {
        title: "Fill Out the Application",
        subtitle: "Let's see if you're a good fit",
        background: "bg-gradient-to-br from-blue-600 to-indigo-700"
      }
    },
    {
      text: "Remember... this isn't about selling anything... it's about helping businesses save money and building your own residual income in the process.",
      duration: 7000,
      slide: {
        title: "Help Businesses Save Money",
        subtitle: "Build your residual income in the process",
        background: "bg-gradient-to-br from-teal-600 to-green-700"
      }
    },
    {
      text: "Thanks for watching... and I hope to welcome you to our partner family soon.",
      duration: 4000,
      slide: {
        title: "Welcome to Our Partner Family",
        subtitle: "Thanks for watching - let's get started!",
        background: "bg-gradient-to-br from-purple-600 to-indigo-700"
      }
    }
  ]

  const playSlideSequence = () => {
    let currentIndex = 0
    
    const playNextSlide = () => {
      if (currentIndex < script.length) {
        setCurrentSlide(currentIndex)
        
        timeoutRef.current = setTimeout(() => {
          currentIndex++
          playNextSlide()
        }, script[currentIndex].duration)
      } else {
        setIsPlaying(false)
        onComplete?.()
      }
    }
    
    playNextSlide()
  }

  const handlePlay = async () => {
    setShowVideo(true)
    setIsPlaying(true)
    
    // Generate speech for the entire script
    try {
      // For now, we'll simulate the audio timing
      // In a real implementation, you'd generate actual speech audio
      playSlideSequence()
    } catch (error) {
      console.error('Error generating speech:', error)
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (!showVideo) {
    return (
      <Card className="overflow-hidden shadow-2xl border-0 rounded-2xl">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800">
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-white cursor-pointer group"
              onClick={handlePlay}
            >
              <div className="text-center space-y-4 px-4">
                <h3 className="text-2xl sm:text-4xl font-bold">
                  Watch This 7-Minute Video
                </h3>
                <p className="text-lg sm:text-2xl text-yellow-300 font-bold">
                  To Discover The 5 Referral System
                </p>
                <p className="text-base sm:text-xl">
                  That's Helping Our Partners Earn
                </p>
                <p className="text-xl sm:text-3xl text-green-400 font-bold">
                  $10K-$50K Monthly Residuals
                </p>
                
                <div className="mt-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/90 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <Play className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 ml-1" />
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <p className="text-lg sm:text-xl font-bold">
                    ▶️ CLICK TO WATCH NOW (7 mins)
                  </p>
                  <p className="text-sm sm:text-base text-yellow-300">
                    ⚠️ Limited Time: Only 25 Partner Spots Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentSlideData = script[currentSlide]

  return (
    <Card className="overflow-hidden shadow-2xl border-0 rounded-2xl">
      <CardContent className="p-0">
        <div className={`relative aspect-video ${currentSlideData.slide.background} flex items-center justify-center text-white`}>
          {/* Slide Content */}
          <div className="text-center space-y-6 px-8 max-w-4xl">
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
              {currentSlideData.slide.title}
            </h2>
            <p className="text-lg sm:text-2xl text-white/90 leading-relaxed">
              {currentSlideData.slide.subtitle}
            </p>
            
            {/* Current narration text */}
            <div className="mt-8 bg-black/20 backdrop-blur-sm rounded-xl p-6">
              <p className="text-base sm:text-lg italic text-white/95 leading-relaxed">
                "{currentSlideData.text}"
              </p>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <Button
              onClick={isPlaying ? handlePause : handlePlay}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-0"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              onClick={toggleMute}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-0"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / script.length) * 100}%` }}
            />
          </div>

          {/* Slide Counter */}
          <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-sm text-white">
              {currentSlide + 1} / {script.length}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}