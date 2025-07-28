import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  TrendingUp,
  DollarSign,
  Target,
  Award,
  Settings,
  Camera,
  Save,
  Edit3
} from 'lucide-react'
import { blink } from '@/blink/client'
import { toast } from '@/hooks/use-toast'

interface AgentProfileProps {
  user: any
}

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  bio: string
  commissionRate: number
  status: string
  joinDate: string
  profileImage?: string
}

interface PerformanceStats {
  totalReferrals: number
  activeDeals: number
  closedWon: number
  closedLost: number
  totalEarnings: number
  monthlyEarnings: number
  conversionRate: number
  avgDealValue: number
}

export function AgentProfile({ user }: AgentProfileProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    companyName: '',
    bio: '',
    commissionRate: 0,
    status: 'active',
    joinDate: '',
    profileImage: ''
  })
  
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats>({
    totalReferrals: 0,
    activeDeals: 0,
    closedWon: 0,
    closedLost: 0,
    totalEarnings: 0,
    monthlyEarnings: 0,
    conversionRate: 0,
    avgDealValue: 0
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    dealUpdates: true,
    weeklyReports: true,
    marketingEmails: false
  })

  const loadProfileData = useCallback(async () => {
    try {
      // Load user profile data
      const userProfile = await blink.db.users.list({
        where: { id: user.id },
        limit: 1
      })
      
      if (userProfile.length > 0) {
        const profile = userProfile[0]
        setProfileData({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: profile.email || '',
          phone: profile.phone || '',
          companyName: profile.companyName || '',
          bio: profile.bio || '',
          commissionRate: profile.commissionRate || 0,
          status: profile.status || 'active',
          joinDate: profile.createdAt || '',
          profileImage: profile.profileImage || ''
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [user])

  const loadPerformanceStats = useCallback(async () => {
    try {
      // Load leads data
      const leads = await blink.db.leads.list({
        where: { userId: user.id }
      })
      
      // Load deals data
      const deals = await blink.db.deals.list({
        where: { userId: user.id }
      })
      
      // Calculate performance metrics
      const closedWon = deals.filter(deal => deal.stage === 'closed_won').length
      const closedLost = deals.filter(deal => deal.stage === 'closed_lost').length
      const totalDeals = closedWon + closedLost
      const conversionRate = totalDeals > 0 ? (closedWon / totalDeals) * 100 : 0
      
      const totalEarnings = deals
        .filter(deal => deal.stage === 'closed_won')
        .reduce((sum, deal) => sum + (deal.commissionAmount || 0), 0)
      
      const currentMonth = new Date().toISOString().slice(0, 7)
      const monthlyEarnings = deals
        .filter(deal => 
          deal.stage === 'closed_won' && 
          deal.closeDate?.startsWith(currentMonth)
        )
        .reduce((sum, deal) => sum + (deal.commissionAmount || 0), 0)
      
      const avgDealValue = closedWon > 0 ? 
        deals
          .filter(deal => deal.stage === 'closed_won')
          .reduce((sum, deal) => sum + (deal.value || 0), 0) / closedWon : 0
      
      setPerformanceStats({
        totalReferrals: leads.length,
        activeDeals: deals.filter(deal => deal.stage === 'in_progress').length,
        closedWon,
        closedLost,
        totalEarnings,
        monthlyEarnings,
        conversionRate,
        avgDealValue
      })
    } catch (error) {
      console.error('Error loading performance stats:', error)
    }
  }, [user])

  useEffect(() => {
    loadProfileData()
    loadPerformanceStats()
  }, [loadProfileData, loadPerformanceStats])

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      await blink.db.users.update(user.id, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        companyName: profileData.companyName,
        bio: profileData.bio,
        updatedAt: new Date().toISOString()
      })
      
      setIsEditing(false)
      toast({
        title: "Success",
        description: "Profile updated successfully"
      })
    } catch (error) {
      console.error('Error saving profile:', error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const { publicUrl } = await blink.storage.upload(
        file,
        `profiles/${user.id}/avatar.${file.name.split('.').pop()}`,
        { upsert: true }
      )
      
      await blink.db.users.update(user.id, {
        profileImage: publicUrl,
        updatedAt: new Date().toISOString()
      })
      
      setProfileData(prev => ({ ...prev, profileImage: publicUrl }))
      
      toast({
        title: "Success",
        description: "Profile image updated successfully"
      })
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: "Error",
        description: "Failed to upload profile image",
        variant: "destructive"
      })
    }
  }

  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`.toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileData.profileImage} />
                <AvatarFallback className="text-lg font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(profileData.status)}>
                    {profileData.status.charAt(0).toUpperCase() + profileData.status.slice(1)}
                  </Badge>
                  <Badge variant="outline">
                    {profileData.commissionRate}% Commission
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span>{profileData.companyName || 'No company'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{profileData.phone || 'No phone'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className="flex items-center gap-2"
            >
              <Edit3 className="h-4 w-4" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold">{performanceStats.totalReferrals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{performanceStats.conversionRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold">${performanceStats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">${performanceStats.monthlyEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Profile Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={profileData.companyName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, companyName: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself and your experience..."
                  rows={4}
                />
              </div>
              
              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveProfile} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Deal Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Deals</span>
                  <span className="font-semibold">{performanceStats.activeDeals}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Closed Won</span>
                  <span className="font-semibold text-green-600">{performanceStats.closedWon}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Closed Lost</span>
                  <span className="font-semibold text-red-600">{performanceStats.closedLost}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Deal Value</span>
                  <span className="font-semibold">${performanceStats.avgDealValue.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Commission Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Commission Rate</span>
                  <Badge variant="outline">{profileData.commissionRate}%</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Earned</span>
                  <span className="font-semibold text-green-600">${performanceStats.totalEarnings.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-semibold">${performanceStats.monthlyEarnings.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <Badge className={getStatusColor(profileData.status)}>
                    {profileData.status.charAt(0).toUpperCase() + profileData.status.slice(1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive updates and communications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Receive urgent updates via SMS</p>
                </div>
                <Switch
                  checked={notifications.smsNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, smsNotifications: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Deal Updates</Label>
                  <p className="text-sm text-gray-500">Get notified when deal status changes</p>
                </div>
                <Switch
                  checked={notifications.dealUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, dealUpdates: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-gray-500">Receive weekly performance summaries</p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, weeklyReports: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-gray-500">Receive promotional content and tips</p>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, marketingEmails: checked }))
                  }
                />
              </div>
              
              <div className="pt-4">
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}