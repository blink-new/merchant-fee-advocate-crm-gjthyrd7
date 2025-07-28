import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2 } from 'lucide-react'

interface Slide {
  id: number
  title: string
  content: string
  duration: number // in seconds
}

const slides: Slide[] = [
  {
    id: 1,
    title: "WELCOME TO THE 5-REFERRAL CHALLENGE!",
    content: "Welcome to the 5-Referral Challenge—your fast track to $1,200 or more in just 10 days. If you've ever wanted to make money just by making introductions, you're in the right place. This is simple, real, and totally doable—even if you've never done anything like this before.",
    duration: 15
  },
  {
    id: 2,
    title: "YOUR JOURNEY TO $1,200+",
    content: "Here's what we're going to cover in this short training: First, I'll show you what makes our service so valuable to business owners. Then, we'll talk about how to spot your easiest wins—people who are already primed to say yes. And finally, we'll break down how you get paid—fast and on repeat.",
    duration: 18
  },
  {
    id: 3,
    title: "LEARN - OUR EXCLUSIVE SERVICES",
    content: "Let's start with the offer. We help business owners save serious money on something they use every day: payment processing. That is the technology that runs the actual credit card charge. Most of them don't even realize how much they're losing to fees. It's literally insane. Our exclusive program can cut or eliminate those costs—without changing how they do business. That's powerful. And most people have no idea this exists.",
    duration: 25
  },
  {
    id: 4,
    title: "IDENTIFY - EASIEST WINS",
    content: "Now, who are your easiest wins? Think local gyms, auto repair shops, dentists, med spas, even tire shops. These businesses hate high processing fees—and we solve that. You're not selling. You're connecting. If you can message or text someone and say, 'Hey, I've got a way for you to save thousands a year—want me to send the info?'—you can do this.",
    duration: 20
  },
  {
    id: 5,
    title: "EARN - HOW TO GET PAID FAST",
    content: "Here's how the money works. You give your referral link to someone like Barry. Barry uses the link, gets approved, and starts saving. You? You get paid every single month that Barry stays on the program. It's as close to passive income as it gets—because once Barry's in, your job is done.",
    duration: 18
  },
  {
    id: 6,
    title: "IN TEN DAYS: $1,200+/MONTH",
    content: "Let's talk numbers. One average deal pays around $240 a month. Five simple referrals = $1,200 a month. That's $14,400 a year just from helping five people. Some of our best referrers do this in a weekend.",
    duration: 15
  },
  {
    id: 7,
    title: "CHART SLIDE - SCALING INCOME",
    content: "And if you want to scale? Take a look at this. 10 deals, 20 deals, 50... You're talking thousands a month in recurring income. That's what makes this exciting. You can start small and build fast.",
    duration: 15
  },
  {
    id: 8,
    title: "READY TO GET STARTED?",
    content: "So, are you ready to get started? Because your only job is to refer five businesses. That's it. No selling. No contracts. Just send your link, follow up, and get paid. And remember, every day you wait is a day you're leaving money on the table—and your network is out there paying fees they don't need to be paying. So let's go. Your journey to $1,200 a month starts now.",
    duration: 25
  }
]

interface TrainingVideoProps {
  onComplete?: () => void
}

export function TrainingVideo({ onComplete }: TrainingVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(slides[0]?.duration || 0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  const totalDuration = slides.reduce((acc, slide) => acc + slide.duration, 0)
  const currentSlideData = slides[currentSlide]

  // Initialize audio
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.addEventListener('loadeddata', () => {
        setAudioLoaded(true)
      })
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false)
        onComplete?.()
      })

      // Load the audio
      audio.load()
    }

    return () => {
      if (audio) {
        audio.removeEventListener('loadeddata', () => {})
        audio.removeEventListener('ended', () => {})
      }
    }
  }, [onComplete])

  // Sync slides with audio playback
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (isPlaying && currentSlideData && audioRef.current) {
      const audio = audioRef.current
      
      intervalRef.current = setInterval(() => {
        const currentTime = audio.currentTime
        const slideDuration = currentSlideData.duration
        
        // Calculate which slide should be showing based on audio time
        let cumulativeTime = 0
        let targetSlide = 0
        
        for (let i = 0; i < slides.length; i++) {
          if (currentTime >= cumulativeTime && currentTime < cumulativeTime + slides[i].duration) {
            targetSlide = i
            break
          }
          cumulativeTime += slides[i].duration
        }

        // Update slide if needed
        if (targetSlide !== currentSlide) {
          setCurrentSlide(targetSlide)
        }

        // Calculate progress within current slide
        const slideStartTime = slides.slice(0, targetSlide).reduce((acc, slide) => acc + slide.duration, 0)
        const timeInSlide = currentTime - slideStartTime
        const slideProgress = Math.min((timeInSlide / slides[targetSlide].duration) * 100, 100)
        
        setProgress(slideProgress)
        setTimeRemaining(Math.ceil(slides[targetSlide].duration - timeInSlide))

        // Check if audio ended
        if (audio.ended) {
          setIsPlaying(false)
          setProgress(100)
          onComplete?.()
        }
      }, 100) // Update more frequently for smoother sync
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, currentSlide, currentSlideData, onComplete])

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio || !audioLoaded) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(console.error)
    }
    setIsPlaying(!isPlaying)
  }

  const handlePrevSlide = () => {
    if (currentSlide > 0 && audioRef.current) {
      const targetSlide = currentSlide - 1
      const slideStartTime = slides.slice(0, targetSlide).reduce((acc, slide) => acc + slide.duration, 0)
      audioRef.current.currentTime = slideStartTime
      setCurrentSlide(targetSlide)
      setProgress(0)
      setTimeRemaining(slides[targetSlide]?.duration || 0)
    }
  }

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1 && audioRef.current) {
      const targetSlide = currentSlide + 1
      const slideStartTime = slides.slice(0, targetSlide).reduce((acc, slide) => acc + slide.duration, 0)
      audioRef.current.currentTime = slideStartTime
      setCurrentSlide(targetSlide)
      setProgress(0)
      setTimeRemaining(slides[targetSlide]?.duration || 0)
    }
  }

  const handleSlideClick = (index: number) => {
    if (audioRef.current) {
      const slideStartTime = slides.slice(0, index).reduce((acc, slide) => acc + slide.duration, 0)
      audioRef.current.currentTime = slideStartTime
      setCurrentSlide(index)
      setProgress(0)
      setTimeRemaining(slides[index]?.duration || 0)
    }
  }

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Updated styling to match your video's professional look
  const getSlideBackground = (slideId: number) => {
    // Clean, professional gradients inspired by your video style
    const backgrounds = [
      'from-slate-800 via-slate-900 to-black', // Professional dark
      'from-blue-900 via-slate-800 to-black', // Corporate blue
      'from-gray-800 via-gray-900 to-black', // Neutral professional
      'from-indigo-900 via-slate-800 to-black', // Deep professional
      'from-slate-700 via-slate-800 to-black', // Clean corporate
      'from-green-900 via-slate-800 to-black', // Success theme
      'from-purple-900 via-slate-800 to-black', // Premium feel
      'from-emerald-900 via-slate-800 to-black', // Final call-to-action
    ]
    return backgrounds[slideId - 1] || backgrounds[0]
  }

  const getSlideIcon = (slideId: number) => {
    switch (slideId) {
      case 6:
        return (
          <div className="text-6xl mb-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 inline-block shadow-2xl">
              <div className="text-white font-bold">
                <div className="text-3xl mb-2 text-gray-300">5 Referrals =</div>
                <div className="text-5xl text-green-400 font-black">$1,200/mo</div>
              </div>
            </div>
          </div>
        )
      case 7:
        return (
          <div className="text-6xl mb-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 inline-block shadow-2xl">
              <div className="text-white font-bold space-y-3">
                <div className="flex justify-between items-center text-xl">
                  <span className="text-gray-300">10 deals:</span>
                  <span className="text-green-400 font-black">$2,400/mo</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                  <span className="text-gray-300">20 deals:</span>
                  <span className="text-green-400 font-black">$4,800/mo</span>
                </div>
                <div className="flex justify-between items-center text-2xl">
                  <span className="text-gray-300">50 deals:</span>
                  <span className="text-green-400 font-black">$12,000/mo</span>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (!currentSlideData) return null

  return (
    <Card className={`overflow-hidden shadow-2xl border-2 border-gray-200 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : ''}`}>
      <CardContent className="p-0">
        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          preload="auto"
          muted={isMuted}
        >
          <source src="/voiceover.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* Video Content - Professional styling to match your video */}
        <div className={`relative bg-gradient-to-br ${getSlideBackground(currentSlideData.id)} ${isFullscreen ? 'h-screen' : 'h-[400px] md:h-[500px]'} flex flex-col items-center justify-center text-white px-8`}>
          
          {/* Audio Loading Indicator */}
          {!audioLoaded && (
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-sm border border-white/20">
              Loading audio...
            </div>
          )}

          {/* Professional Slide Content */}
          <div className="text-center max-w-5xl mx-auto">
            {getSlideIcon(currentSlideData.id)}
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight text-white drop-shadow-lg">
              {currentSlideData.title}
            </h2>
            
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-200 max-w-4xl mx-auto font-medium">
              {currentSlideData.content}
            </p>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="absolute bottom-24 left-0 right-0 px-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-white/30">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-full transition-all duration-300 ease-linear shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Enhanced Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideClick(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                  index === currentSlide 
                    ? 'bg-white border-white scale-125 shadow-lg' 
                    : index < currentSlide 
                      ? 'bg-white/70 border-white/70 shadow-md' 
                      : 'bg-white/30 border-white/50 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Video Controls */}
        <div className="bg-black text-white p-6 border-t border-gray-800">
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevSlide}
                disabled={currentSlide === 0 || !audioLoaded}
                className="text-white hover:bg-white/20 border border-white/20 hover:border-white/40"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={handlePlayPause}
                disabled={!audioLoaded}
                className="text-white hover:bg-white/20 border border-white/20 hover:border-white/40"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextSlide}
                disabled={currentSlide === slides.length - 1 || !audioLoaded}
                className="text-white hover:bg-white/20 border border-white/20 hover:border-white/40"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Center Info */}
            <div className="flex items-center gap-6 text-sm font-medium">
              <span className="text-gray-300">Slide {currentSlide + 1} of {slides.length}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">{formatTime(timeRemaining)} remaining</span>
              {!audioLoaded && <span className="text-yellow-400">• Loading...</span>}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMuteToggle}
                disabled={!audioLoaded}
                className="text-white hover:bg-white/20 border border-white/20 hover:border-white/40"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-white/20 border border-white/20 hover:border-white/40"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}