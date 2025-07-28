import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Filter, 
  Eye, 
  Users, 
  TrendingUp, 
  DollarSign, 
  FileText,
  Phone,
  Mail,
  Building,
  Calendar,
  Download,
  ExternalLink,
  Plus
} from 'lucide-react'
import { blink } from '@/blink/client'
import { AddPartnerForm } from './AddPartnerForm'

interface Partner {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  companyName?: string
  status: string
  commissionRate: number
  createdAt: string
  updatedAt: string
}

interface PartnerProfile {
  id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  commissionRate: number
  status: string
  notes?: string
  legalBusinessName?: string
  dbaName?: string
  businessPhone?: string
  businessEmail?: string
  businessStreet?: string
  businessAddressLine2?: string
  businessCity?: string
  businessState?: string
  businessZipCode?: string
  ein?: string
  businessType?: string
  industryType?: string
  bankName?: string
  accountHolderName?: string
  routingNumber?: string
  accountNumber?: string
  w9Urls?: string
  voidedCheckUrls?: string
  ownerIdsUrls?: string
  createdAt: string
  updatedAt: string
}

interface Lead {
  id: string
  userId: string
  partnerId: string
  businessName: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  businessType?: string
  monthlyVolume?: number
  currentProcessor?: string
  status: string
  notes?: string
  potentialMonthlyRevenue?: number
  estimatedMonthlyRevenue?: number
  submittedAt: string
  updatedAt: string
}

interface ReferralApplication {
  id: string
  userId: string
  submittedAt: string
  status: string
  legalBusinessName: string
  businessPhone: string
  businessEmail: string
  companyDomain?: string
  businessStreet: string
  businessAddressLine2?: string
  businessCity: string
  businessState: string
  businessZipCode: string
  dbaName?: string
  monthlyRevenue?: string
  industryType?: string
  productsDescription?: string
  businessType: string
  ein: string
  ownerFirstName: string
  ownerLastName: string
  ownerStreet: string
  ownerAddressLine2?: string
  ownerCity: string
  ownerState: string
  ownerZipCode: string
  ownerPhone: string
  ownerEmail: string
  ownerDob: string
  ownerSsn: string
  numberOfOwners: string
  ownershipPercentage: string
  bankName: string
  nameOnAccount: string
  routingNumber: string
  accountNumber: string
  articlesOfIncorporationUrls?: string
  einUploadUrl?: string
  ownerIdsUrls?: string
  voidedCheckBankLetterUrl?: string
  bankStatementsUrls?: string
  submittedBy: string
  createdAt: string
  updatedAt: string
}

interface PartnerManagementProps {
  user: any
}

export function PartnerManagement({ user }: PartnerManagementProps) {
  const [partners, setPartners] = useState<Partner[]>([])
  const [partnerProfiles, setPartnerProfiles] = useState<PartnerProfile[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [referralApplications, setReferralApplications] = useState<ReferralApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [selectedPartnerProfile, setSelectedPartnerProfile] = useState<PartnerProfile | null>(null)
  const [selectedDeal, setSelectedDeal] = useState<(Lead | ReferralApplication) | null>(null)
  const [dealType, setDealType] = useState<'lead' | 'application'>('lead')
  const [showPartnerDialog, setShowPartnerDialog] = useState(false)
  const [showDealDialog, setShowDealDialog] = useState(false)
  const [showAddPartnerForm, setShowAddPartnerForm] = useState(false)

  const loadData = async () => {
    try {
      // Load all partners
      const allPartners = await blink.db.users.list({
        where: { role: 'partner' },
        orderBy: { createdAt: 'desc' }
      })
      setPartners(allPartners)

      // Load all partner profiles with detailed information
      try {
        const allPartnerProfiles = await blink.db['partner_profiles'].list({
          orderBy: { createdAt: 'desc' }
        })
        setPartnerProfiles(allPartnerProfiles)
      } catch (error) {
        console.error('Error loading partner profiles:', error)
        setPartnerProfiles([])
      }

      // Load all leads
      const allLeads = await blink.db.leads.list({
        orderBy: { submittedAt: 'desc' }
      })
      setLeads(allLeads)

      // Load all referral applications
      const allApplications = await blink.db.referralApplications.list({
        orderBy: { submittedAt: 'desc' }
      })
      setReferralApplications(allApplications)

    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getPartnerLeads = (partnerId: string) => {
    return leads.filter(lead => lead.userId === partnerId)
  }

  const getPartnerApplications = (partnerId: string) => {
    return referralApplications.filter(app => app.userId === partnerId)
  }

  const getPartnerStats = (partnerId: string) => {
    const partnerLeads = getPartnerLeads(partnerId)
    const partnerApplications = getPartnerApplications(partnerId)
    
    const totalDeals = partnerLeads.length + partnerApplications.length
    const closedWonLeads = partnerLeads.filter(lead => lead.status === 'closed_won').length
    const approvedApplications = partnerApplications.filter(app => app.status === 'approved').length
    const totalClosedWon = closedWonLeads + approvedApplications
    
    const potentialRevenue = partnerLeads.reduce((sum, lead) => sum + (lead.potentialMonthlyRevenue || 0), 0)
    const estimatedRevenue = partnerLeads.reduce((sum, lead) => sum + (lead.estimatedMonthlyRevenue || 0), 0)

    return {
      totalDeals,
      totalClosedWon,
      potentialRevenue,
      estimatedRevenue
    }
  }

  const filteredPartners = partners.filter(partner => {
    const fullName = `${partner.firstName} ${partner.lastName}`.toLowerCase()
    const email = partner.email.toLowerCase()
    const company = partner.companyName?.toLowerCase() || ''
    const search = searchTerm.toLowerCase()
    
    return fullName.includes(search) || email.includes(search) || company.includes(search)
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-purple-100 text-purple-800'
      case 'qualified': return 'bg-indigo-100 text-indigo-800'
      case 'proposal_sent': return 'bg-orange-100 text-orange-800'
      case 'closed_won': return 'bg-green-100 text-green-800'
      case 'closed_lost': return 'bg-red-100 text-red-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'under_review': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const openPartnerDetails = (partner: Partner) => {
    setSelectedPartner(partner)
    // Find the corresponding partner profile
    const profile = partnerProfiles.find(p => p.userId === partner.id)
    setSelectedPartnerProfile(profile || null)
    setShowPartnerDialog(true)
  }

  const openDealDetails = (deal: Lead | ReferralApplication, type: 'lead' | 'application') => {
    setSelectedDeal(deal)
    setDealType(type)
    setShowDealDialog(true)
  }

  const downloadDocument = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const parseFileUrls = (urlString?: string): string[] => {
    if (!urlString) return []
    try {
      return JSON.parse(urlString)
    } catch {
      return urlString.split(',').filter(url => url.trim())
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Management</h1>
          <p className="text-gray-600 mt-1">Manage referral partners and track their deals</p>
        </div>
        <Button onClick={() => setShowAddPartnerForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Partners</p>
                <p className="text-2xl font-bold text-gray-900">{partners.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Partners</p>
                <p className="text-2xl font-bold text-gray-900">
                  {partners.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Deals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {leads.length + referralApplications.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Potential Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(leads.reduce((sum, lead) => sum + (lead.potentialMonthlyRevenue || 0), 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search partners by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Partners Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Partners ({filteredPartners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Partner</th>
                  <th className="text-left p-3">Contact</th>
                  <th className="text-left p-3">Company</th>
                  <th className="text-left p-3">Deals</th>
                  <th className="text-left p-3">Closed Won</th>
                  <th className="text-left p-3">Potential Revenue</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Joined</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartners.map((partner) => {
                  const stats = getPartnerStats(partner.id)
                  return (
                    <tr key={partner.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-gray-900">
                            {partner.firstName} {partner.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{partner.email}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          {partner.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-3 w-3" />
                              {partner.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-3 w-3" />
                            {partner.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{partner.companyName || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-medium">{stats.totalDeals}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-green-600">{stats.totalClosedWon}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-purple-600">
                          {formatCurrency(stats.potentialRevenue)}
                        </span>
                      </td>
                      <td className="p-3">
                        <Badge className={getStatusColor(partner.status)}>
                          {partner.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-gray-600">
                          {formatDate(partner.createdAt)}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openPartnerDetails(partner)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filteredPartners.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No partners found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms' : 'No partners have been added yet'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Partner Details Dialog */}
      <Dialog open={showPartnerDialog} onOpenChange={setShowPartnerDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Partner Details: {selectedPartner?.firstName} {selectedPartner?.lastName}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPartner && (
            <div className="space-y-6">
              {/* Partner Info with Tabs */}
              <Card>
                <CardHeader>
                  <CardTitle>Partner Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList>
                      <TabsTrigger value="personal">Personal Info</TabsTrigger>
                      <TabsTrigger value="business">Business Info</TabsTrigger>
                      <TabsTrigger value="banking">Banking Info</TabsTrigger>
                      <TabsTrigger value="documents">Documents</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Name</p>
                          <p className="text-lg">{selectedPartnerProfile?.firstName || selectedPartner.firstName} {selectedPartnerProfile?.lastName || selectedPartner.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Email</p>
                          <p className="text-lg">{selectedPartnerProfile?.email || selectedPartner.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Phone</p>
                          <p className="text-lg">{selectedPartnerProfile?.phone || selectedPartner.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Commission Rate</p>
                          <p className="text-lg">{((selectedPartnerProfile?.commissionRate || selectedPartner.commissionRate) * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Status</p>
                          <Badge className={getStatusColor(selectedPartnerProfile?.status || selectedPartner.status)}>
                            {(selectedPartnerProfile?.status || selectedPartner.status).toUpperCase()}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Joined</p>
                          <p className="text-lg">{formatDate(selectedPartner.createdAt)}</p>
                        </div>
                      </div>
                      {selectedPartnerProfile?.notes && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-600">Notes</p>
                          <p className="text-lg mt-1">{selectedPartnerProfile.notes}</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="business" className="space-y-4">
                      {selectedPartnerProfile ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Legal Business Name</p>
                            <p className="text-lg">{selectedPartnerProfile.legalBusinessName || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">DBA Name</p>
                            <p className="text-lg">{selectedPartnerProfile.dbaName || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Business Phone</p>
                            <p className="text-lg">{selectedPartnerProfile.businessPhone || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Business Email</p>
                            <p className="text-lg">{selectedPartnerProfile.businessEmail || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">EIN</p>
                            <p className="text-lg">{selectedPartnerProfile.ein || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Business Type</p>
                            <p className="text-lg">{selectedPartnerProfile.businessType || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Industry Type</p>
                            <p className="text-lg">{selectedPartnerProfile.industryType || 'N/A'}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-8">No detailed business information available</p>
                      )}
                      
                      {selectedPartnerProfile && (selectedPartnerProfile.businessStreet || selectedPartnerProfile.businessCity) && (
                        <div className="mt-6">
                          <p className="text-sm font-medium text-gray-600">Business Address</p>
                          <p className="text-lg mt-1">
                            {selectedPartnerProfile.businessStreet}
                            {selectedPartnerProfile.businessAddressLine2 && `, ${selectedPartnerProfile.businessAddressLine2}`}
                            <br />
                            {selectedPartnerProfile.businessCity}, {selectedPartnerProfile.businessState} {selectedPartnerProfile.businessZipCode}
                          </p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="banking" className="space-y-4">
                      {selectedPartnerProfile ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Bank Name</p>
                            <p className="text-lg">{selectedPartnerProfile.bankName || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Account Holder Name</p>
                            <p className="text-lg">{selectedPartnerProfile.accountHolderName || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Routing Number</p>
                            <p className="text-lg">{selectedPartnerProfile.routingNumber ? `****${selectedPartnerProfile.routingNumber.slice(-4)}` : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Account Number</p>
                            <p className="text-lg">{selectedPartnerProfile.accountNumber ? `****${selectedPartnerProfile.accountNumber.slice(-4)}` : 'N/A'}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-8">No banking information available</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="documents" className="space-y-4">
                      {selectedPartnerProfile ? (
                        <div className="space-y-6">
                          {/* W-9 Documents */}
                          <div>
                            <h4 className="font-medium mb-2">W-9 Forms</h4>
                            <div className="space-y-2">
                              {parseFileUrls(selectedPartnerProfile.w9Urls).length > 0 ? (
                                parseFileUrls(selectedPartnerProfile.w9Urls).map((url, index) => (
                                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">W-9 Form {index + 1}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => window.open(url, '_blank')}
                                      >
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => downloadDocument(url, `w9-${index + 1}.pdf`)}
                                      >
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500 text-sm">No W-9 forms uploaded</p>
                              )}
                            </div>
                          </div>

                          {/* Voided Check Documents */}
                          <div>
                            <h4 className="font-medium mb-2">Voided Checks</h4>
                            <div className="space-y-2">
                              {parseFileUrls(selectedPartnerProfile.voidedCheckUrls).length > 0 ? (
                                parseFileUrls(selectedPartnerProfile.voidedCheckUrls).map((url, index) => (
                                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">Voided Check {index + 1}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => window.open(url, '_blank')}
                                      >
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => downloadDocument(url, `voided-check-${index + 1}.pdf`)}
                                      >
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500 text-sm">No voided checks uploaded</p>
                              )}
                            </div>
                          </div>

                          {/* Owner ID Documents */}
                          <div>
                            <h4 className="font-medium mb-2">Owner IDs</h4>
                            <div className="space-y-2">
                              {parseFileUrls(selectedPartnerProfile.ownerIdsUrls).length > 0 ? (
                                parseFileUrls(selectedPartnerProfile.ownerIdsUrls).map((url, index) => (
                                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">Owner ID {index + 1}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => window.open(url, '_blank')}
                                      >
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => downloadDocument(url, `owner-id-${index + 1}.pdf`)}
                                      >
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500 text-sm">No owner IDs uploaded</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-8">No documents available</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Partner's Deals */}
              <Card>
                <CardHeader>
                  <CardTitle>Partner's Deals & Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="leads" className="w-full">
                    <TabsList>
                      <TabsTrigger value="leads">Quick Leads ({getPartnerLeads(selectedPartner.id).length})</TabsTrigger>
                      <TabsTrigger value="applications">Full Applications ({getPartnerApplications(selectedPartner.id).length})</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="leads" className="space-y-4">
                      {getPartnerLeads(selectedPartner.id).length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No quick leads submitted</p>
                      ) : (
                        <div className="space-y-3">
                          {getPartnerLeads(selectedPartner.id).map((lead) => (
                            <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium">{lead.businessName}</h4>
                                  <p className="text-sm text-gray-600">{lead.contactName} • {lead.contactEmail}</p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <span className="text-sm">Volume: {formatCurrency(lead.monthlyVolume || 0)}</span>
                                    <span className="text-sm">Potential: {formatCurrency(lead.potentialMonthlyRevenue || 0)}/mo</span>
                                    <Badge className={getStatusColor(lead.status)}>
                                      {lead.status.replace('_', ' ').toUpperCase()}
                                    </Badge>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openDealDetails(lead, 'lead')}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="applications" className="space-y-4">
                      {getPartnerApplications(selectedPartner.id).length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No full applications submitted</p>
                      ) : (
                        <div className="space-y-3">
                          {getPartnerApplications(selectedPartner.id).map((app) => (
                            <div key={app.id} className="border rounded-lg p-4 hover:bg-gray-50">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium">{app.legalBusinessName}</h4>
                                  <p className="text-sm text-gray-600">{app.ownerFirstName} {app.ownerLastName} • {app.businessEmail}</p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <span className="text-sm">Industry: {app.industryType || 'N/A'}</span>
                                    <span className="text-sm">Revenue: {formatCurrency(parseFloat(app.monthlyRevenue || '0'))}/mo</span>
                                    <Badge className={getStatusColor(app.status)}>
                                      {app.status.replace('_', ' ').toUpperCase()}
                                    </Badge>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openDealDetails(app, 'application')}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Deal Details Dialog */}
      <Dialog open={showDealDialog} onOpenChange={setShowDealDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dealType === 'lead' ? 'Quick Lead Details' : 'Full Application Details'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedDeal && (
            <div className="space-y-6">
              {dealType === 'lead' ? (
                // Quick Lead Details
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Business Name</p>
                          <p className="text-lg">{(selectedDeal as Lead).businessName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Contact Name</p>
                          <p className="text-lg">{(selectedDeal as Lead).contactName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Contact Email</p>
                          <p className="text-lg">{(selectedDeal as Lead).contactEmail}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Contact Phone</p>
                          <p className="text-lg">{(selectedDeal as Lead).contactPhone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Business Type</p>
                          <p className="text-lg">{(selectedDeal as Lead).businessType || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Current Processor</p>
                          <p className="text-lg">{(selectedDeal as Lead).currentProcessor || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Monthly Volume</p>
                          <p className="text-lg">{formatCurrency((selectedDeal as Lead).monthlyVolume || 0)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Potential Monthly Revenue</p>
                          <p className="text-lg text-green-600">{formatCurrency((selectedDeal as Lead).potentialMonthlyRevenue || 0)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Status</p>
                          <Badge className={getStatusColor((selectedDeal as Lead).status)}>
                            {(selectedDeal as Lead).status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Submitted</p>
                          <p className="text-lg">{formatDate((selectedDeal as Lead).submittedAt)}</p>
                        </div>
                      </div>
                      {(selectedDeal as Lead).notes && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-600">Notes</p>
                          <p className="text-lg mt-1">{(selectedDeal as Lead).notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                // Full Application Details
                <div className="space-y-4">
                  <Tabs defaultValue="business" className="w-full">
                    <TabsList>
                      <TabsTrigger value="business">Business Info</TabsTrigger>
                      <TabsTrigger value="owner">Owner Info</TabsTrigger>
                      <TabsTrigger value="banking">Banking</TabsTrigger>
                      <TabsTrigger value="documents">Documents</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="business">
                      <Card>
                        <CardHeader>
                          <CardTitle>Business Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Legal Business Name</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).legalBusinessName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">DBA Name</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).dbaName || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Business Phone</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).businessPhone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Business Email</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).businessEmail}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Company Domain</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).companyDomain || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Business Type</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).businessType}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Industry Type</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).industryType || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                              <p className="text-lg">{formatCurrency(parseFloat((selectedDeal as ReferralApplication).monthlyRevenue || '0'))}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">EIN</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).ein}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Status</p>
                              <Badge className={getStatusColor((selectedDeal as ReferralApplication).status)}>
                                {(selectedDeal as ReferralApplication).status.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <p className="text-sm font-medium text-gray-600">Business Address</p>
                            <p className="text-lg mt-1">
                              {(selectedDeal as ReferralApplication).businessStreet}
                              {(selectedDeal as ReferralApplication).businessAddressLine2 && `, ${(selectedDeal as ReferralApplication).businessAddressLine2}`}
                              <br />
                              {(selectedDeal as ReferralApplication).businessCity}, {(selectedDeal as ReferralApplication).businessState} {(selectedDeal as ReferralApplication).businessZipCode}
                            </p>
                          </div>
                          
                          {(selectedDeal as ReferralApplication).productsDescription && (
                            <div className="mt-6">
                              <p className="text-sm font-medium text-gray-600">Products Description</p>
                              <p className="text-lg mt-1">{(selectedDeal as ReferralApplication).productsDescription}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="owner">
                      <Card>
                        <CardHeader>
                          <CardTitle>Owner Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Owner Name</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).ownerFirstName} {(selectedDeal as ReferralApplication).ownerLastName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Owner Phone</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).ownerPhone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Owner Email</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).ownerEmail}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Date of Birth</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).ownerDob}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">SSN</p>
                              <p className="text-lg">***-**-{(selectedDeal as ReferralApplication).ownerSsn.slice(-4)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Number of Owners</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).numberOfOwners}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Ownership Percentage</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).ownershipPercentage}%</p>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <p className="text-sm font-medium text-gray-600">Owner Address</p>
                            <p className="text-lg mt-1">
                              {(selectedDeal as ReferralApplication).ownerStreet}
                              {(selectedDeal as ReferralApplication).ownerAddressLine2 && `, ${(selectedDeal as ReferralApplication).ownerAddressLine2}`}
                              <br />
                              {(selectedDeal as ReferralApplication).ownerCity}, {(selectedDeal as ReferralApplication).ownerState} {(selectedDeal as ReferralApplication).ownerZipCode}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="banking">
                      <Card>
                        <CardHeader>
                          <CardTitle>Banking Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Bank Name</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).bankName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Name on Account</p>
                              <p className="text-lg">{(selectedDeal as ReferralApplication).nameOnAccount}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Routing Number</p>
                              <p className="text-lg">****{(selectedDeal as ReferralApplication).routingNumber.slice(-4)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Account Number</p>
                              <p className="text-lg">****{(selectedDeal as ReferralApplication).accountNumber.slice(-4)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="documents">
                      <Card>
                        <CardHeader>
                          <CardTitle>Uploaded Documents</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {/* Articles of Incorporation */}
                            <div>
                              <h4 className="font-medium mb-2">Articles of Incorporation</h4>
                              <div className="space-y-2">
                                {parseFileUrls((selectedDeal as ReferralApplication).articlesOfIncorporationUrls).map((url, index) => (
                                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">Articles of Incorporation {index + 1}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => window.open(url, '_blank')}
                                      >
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => downloadDocument(url, `articles-${index + 1}.pdf`)}
                                      >
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* EIN Upload */}
                            {(selectedDeal as ReferralApplication).einUploadUrl && (
                              <div>
                                <h4 className="font-medium mb-2">EIN Letter</h4>
                                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">EIN Letter</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => window.open((selectedDeal as ReferralApplication).einUploadUrl!, '_blank')}
                                    >
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      View
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => downloadDocument((selectedDeal as ReferralApplication).einUploadUrl!, 'ein-letter.pdf')}
                                    >
                                      <Download className="h-3 w-3 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Owner IDs */}
                            <div>
                              <h4 className="font-medium mb-2">Owner IDs</h4>
                              <div className="space-y-2">
                                {parseFileUrls((selectedDeal as ReferralApplication).ownerIdsUrls).map((url, index) => (
                                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">Owner ID {index + 1}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => window.open(url, '_blank')}
                                      >
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => downloadDocument(url, `owner-id-${index + 1}.pdf`)}
                                      >
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Voided Check/Bank Letter */}
                            {(selectedDeal as ReferralApplication).voidedCheckBankLetterUrl && (
                              <div>
                                <h4 className="font-medium mb-2">Voided Check / Bank Letter</h4>
                                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">Voided Check / Bank Letter</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => window.open((selectedDeal as ReferralApplication).voidedCheckBankLetterUrl!, '_blank')}
                                    >
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      View
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => downloadDocument((selectedDeal as ReferralApplication).voidedCheckBankLetterUrl!, 'voided-check.pdf')}
                                    >
                                      <Download className="h-3 w-3 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Bank Statements */}
                            <div>
                              <h4 className="font-medium mb-2">Bank Statements</h4>
                              <div className="space-y-2">
                                {parseFileUrls((selectedDeal as ReferralApplication).bankStatementsUrls).map((url, index) => (
                                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">Bank Statement {index + 1}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => window.open(url, '_blank')}
                                      >
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => downloadDocument(url, `bank-statement-${index + 1}.pdf`)}
                                      >
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Partner Form */}
      <AddPartnerForm
        open={showAddPartnerForm}
        onOpenChange={setShowAddPartnerForm}
        onPartnerAdded={loadData}
      />
    </div>
  )
}