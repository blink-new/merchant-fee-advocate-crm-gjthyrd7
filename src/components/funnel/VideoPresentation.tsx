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

interface VideoPresentationProps {
  onComplete?: () => void
}

export function VideoPresentation({ onComplete }: VideoPresentationProps) {
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

  const getSlideBackground = (slideId: number) => {
    const backgrounds = [
      'from-blue-600 via-blue-700 to-blue-800', // Slide 1
      'from-green-600 via-green-700 to-green-800', // Slide 2
      'from-purple-600 via-purple-700 to-purple-800', // Slide 3
      'from-orange-600 via-orange-700 to-orange-800', // Slide 4
      'from-teal-600 via-teal-700 to-teal-800', // Slide 5
      'from-red-600 via-red-700 to-red-800', // Slide 6
      'from-indigo-600 via-indigo-700 to-indigo-800', // Slide 7
      'from-emerald-600 via-emerald-700 to-emerald-800', // Slide 8
    ]
    return backgrounds[slideId - 1] || backgrounds[0]
  }

  const getSlideIcon = (slideId: number) => {
    switch (slideId) {
      case 6:
        return (
          <div className="text-6xl mb-6">
            <div className="bg-white/20 rounded-2xl p-6 inline-block">
              <div className="text-white font-bold">
                <div className="text-2xl">5 Referrals =</div>
                <div className="text-4xl text-green-300">$1,200/mo</div>
              </div>
            </div>
          </div>
        )
      case 7:
        return (
          <div className="text-6xl mb-6">
            <div className="bg-white/20 rounded-2xl p-6 inline-block">
              <div className="text-white font-bold space-y-2">
                <div className="flex justify-between items-center text-lg">
                  <span>10 deals:</span>
                  <span className="text-green-300">$2,400/mo</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span>20 deals:</span>
                  <span className="text-green-300">$4,800/mo</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                  <span>50 deals:</span>
                  <span className="text-green-300">$12,000/mo</span>
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
    <Card className={`overflow-hidden shadow-2xl border-4 border-blue-200 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : ''}`}>
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

        {/* Video Content */}
        <div className={`relative bg-gradient-to-br ${getSlideBackground(currentSlideData.id)} ${isFullscreen ? 'h-screen' : 'h-[400px] md:h-[500px]'} flex flex-col items-center justify-center text-white px-8`}>
          
          {/* Audio Loading Indicator */}
          {!audioLoaded && (
            <div className="absolute top-4 right-4 bg-black/50 rounded-lg px-3 py-1 text-sm">
              Loading audio...
            </div>
          )}

          {/* Slide Content */}
          <div className="text-center max-w-4xl mx-auto">
            {getSlideIcon(currentSlideData.id)}
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {currentSlideData.title}
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 max-w-3xl mx-auto">
              {currentSlideData.content}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-20 left-0 right-0 px-8">
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : index < currentSlide 
                      ? 'bg-white/60' 
                      : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Video Controls */}
        <div className="bg-gray-900 text-white p-4">
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevSlide}
                disabled={currentSlide === 0 || !audioLoaded}
                className="text-white hover:bg-white/20"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                disabled={!audioLoaded}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextSlide}
                disabled={currentSlide === slides.length - 1 || !audioLoaded}
                className="text-white hover:bg-white/20"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Center Info */}
            <div className="flex items-center gap-4 text-sm">
              <span>Slide {currentSlide + 1} of {slides.length}</span>
              <span>•</span>
              <span>{formatTime(timeRemaining)} remaining</span>
              {!audioLoaded && <span>• Loading...</span>}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMuteToggle}
                disabled={!audioLoaded}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-white/20"
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