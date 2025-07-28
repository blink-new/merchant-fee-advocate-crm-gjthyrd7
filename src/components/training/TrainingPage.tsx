import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrainingVideo } from './TrainingVideo'
import { 
  Play, 
  FileText, 
  Download, 
  Clock, 
  CheckCircle, 
  BookOpen,
  Video,
  Users,
  Target,
  TrendingUp,
  DollarSign
} from 'lucide-react'

interface TrainingModule {
  id: string
  title: string
  description: string
  duration: string
  type: 'video' | 'document' | 'interactive'
  completed: boolean
  category: string
}

const trainingModules: TrainingModule[] = [
  {
    id: '1',
    title: 'Getting Started as a Referral Partner',
    description: 'Learn the basics of our referral program and how to get started earning commissions.',
    duration: '15 min',
    type: 'video',
    completed: true,
    category: 'onboarding'
  },
  {
    id: '2',
    title: 'Understanding Payment Processing',
    description: 'Deep dive into payment processing fundamentals and industry terminology.',
    duration: '25 min',
    type: 'video',
    completed: true,
    category: 'fundamentals'
  },
  {
    id: '3',
    title: 'Identifying Quality Leads',
    description: 'Learn how to identify and qualify potential merchant leads for maximum conversion.',
    duration: '20 min',
    type: 'video',
    completed: false,
    category: 'lead-generation'
  },
  {
    id: '4',
    title: 'Using the CRM Dashboard',
    description: 'Complete walkthrough of the partner portal and CRM features.',
    duration: '18 min',
    type: 'interactive',
    completed: false,
    category: 'platform'
  }
]

export const TrainingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [showTrainingVideo, setShowTrainingVideo] = useState(false)
  
  const completedModules = trainingModules.filter(module => module.completed).length
  const totalModules = trainingModules.length
  const progressPercentage = Math.round((completedModules / totalModules) * 100)

  const filteredModules = activeCategory === 'all' 
    ? trainingModules 
    : trainingModules.filter(module => module.category === activeCategory)

  const filteredResources = activeCategory === 'all'
    ? [] // Removed trainingResources
    : [] // Removed trainingResources.filter(resource => resource.category === activeCategory)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />
      case 'document': return <FileText className="h-4 w-4" />
      case 'interactive': return <Target className="h-4 w-4" />
      case 'pdf': return <FileText className="h-4 w-4" />
      case 'template': return <Download className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'onboarding': return <Users className="h-5 w-5" />
      case 'fundamentals': return <BookOpen className="h-5 w-5" />
      case 'lead-generation': return <Target className="h-5 w-5" />
      case 'platform': return <TrendingUp className="h-5 w-5" />
      case 'compensation': return <DollarSign className="h-5 w-5" />
      case 'advanced': return <TrendingUp className="h-5 w-5" />
      case 'sales-tools': return <Target className="h-5 w-5" />
      default: return <BookOpen className="h-5 w-5" />
    }
  }

  // Show training video if requested
  if (showTrainingVideo) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Training Module 1: 5-Referral Challenge</h1>
            <p className="text-gray-600 mt-2">
              Your complete guide to earning $1,200+ per month through referrals
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowTrainingVideo(false)}
          >
            Back to Training Center
          </Button>
        </div>
        
        <TrainingVideo 
          onComplete={() => {
            console.log('Training video completed!')
            // Could mark module as completed here
          }}
        />
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Ready to Start Your 5-Referral Challenge?
                </h3>
                <p className="text-green-700 mb-4">
                  Now that you've completed the training, you're ready to start earning! 
                  Use your partner dashboard to submit leads and track your progress.
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setShowTrainingVideo(false)}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training Center</h1>
          <p className="text-gray-600 mt-2">
            Master the skills you need to succeed as a referral partner and maximize your earnings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{completedModules}/{totalModules}</p>
                  <p className="text-sm text-gray-600">Modules Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{progressPercentage}%</p>
                  <p className="text-sm text-gray-600">Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2.5</p>
                  <p className="text-sm text-gray-600">Hours Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="modules">Training Modules</TabsTrigger>
          <TabsTrigger value="resources">Resources & Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('all')}
            >
              All Modules
            </Button>
            <Button
              variant={activeCategory === 'onboarding' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('onboarding')}
              className="flex items-center gap-2"
            >
              {getCategoryIcon('onboarding')}
              Onboarding
            </Button>
            <Button
              variant={activeCategory === 'fundamentals' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('fundamentals')}
              className="flex items-center gap-2"
            >
              {getCategoryIcon('fundamentals')}
              Fundamentals
            </Button>
            <Button
              variant={activeCategory === 'lead-generation' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('lead-generation')}
              className="flex items-center gap-2"
            >
              {getCategoryIcon('lead-generation')}
              Lead Generation
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <Card key={module.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(module.type)}
                      <Badge variant={module.completed ? 'default' : 'secondary'}>
                        {module.completed ? 'Completed' : 'Not Started'}
                      </Badge>
                    </div>
                    {module.completed && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{module.duration}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={() => {
                        if (module.id === '1') {
                          setShowTrainingVideo(true)
                        }
                      }}
                    >
                      <Play className="h-4 w-4" />
                      {module.completed ? 'Review' : 'Start'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Resources Coming Soon</h3>
            <p className="text-gray-600">
              Training resources and downloadable materials will be available here once you complete your purchase.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Need Help with Training?
              </h3>
              <p className="text-blue-700 mb-4">
                Our support team is here to help you succeed. If you have questions about any training module 
                or need additional resources, don't hesitate to reach out.
              </p>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}