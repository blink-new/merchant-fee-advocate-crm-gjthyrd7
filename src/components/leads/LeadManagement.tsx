import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Search, Filter, Eye, Edit, Trash2, Phone, Mail, Building, FileText } from 'lucide-react'
import { blink } from '@/blink/client'
import { Lead } from '@/types'
import { ReferralApplicationForm } from '../referrals/ReferralApplicationForm'

interface LeadManagementProps {
  user: any
}

export function LeadManagement({ user }: LeadManagementProps) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showReferralForm, setShowReferralForm] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    businessType: '',
    currentProcessor: '',
    monthlyVolume: '',
    averageTicket: '',
    notes: '',
    potentialMonthlyRevenue: ''
  })

  const loadLeads = useCallback(async () => {
    try {
      const userLeads = await blink.db.leads.list({
        where: { userId: user.id },
        orderBy: { submittedAt: 'desc' }
      })
      setLeads(userLeads)
    } catch (error) {
      console.error('Error loading leads:', error)
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    loadLeads()
  }, [loadLeads])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const leadData = {
        ...formData,
        userId: user.id,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        monthlyVolume: parseFloat(formData.monthlyVolume) || 0,
        averageTicket: parseFloat(formData.averageTicket) || 0,
        potentialMonthlyRevenue: parseFloat(formData.potentialMonthlyRevenue) || 0
      }

      if (editingLead) {
        await blink.db.leads.update(editingLead.id, {
          ...leadData,
          updatedAt: new Date().toISOString()
        })
      } else {
        await blink.db.leads.create(leadData)
      }

      setShowAddDialog(false)
      setEditingLead(null)
      setFormData({
        businessName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        businessType: '',
        currentProcessor: '',
        monthlyVolume: '',
        averageTicket: '',
        notes: '',
        potentialMonthlyRevenue: ''
      })
      loadLeads()
    } catch (error) {
      console.error('Error saving lead:', error)
    }
  }

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead)
    setFormData({
      businessName: lead.businessName || '',
      contactName: lead.contactName || '',
      contactEmail: lead.contactEmail || '',
      contactPhone: lead.contactPhone || '',
      businessType: lead.businessType || '',
      currentProcessor: lead.currentProcessor || '',
      monthlyVolume: lead.monthlyVolume?.toString() || '',
      averageTicket: lead.averageTicket?.toString() || '',
      notes: lead.notes || '',
      potentialMonthlyRevenue: lead.potentialMonthlyRevenue?.toString() || ''
    })
    setShowAddDialog(true)
  }

  const handleDelete = async (leadId: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        await blink.db.leads.delete(leadId)
        loadLeads()
      } catch (error) {
        console.error('Error deleting lead:', error)
      }
    }
  }

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      await blink.db.leads.update(leadId, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      })
      loadLeads()
    } catch (error) {
      console.error('Error updating lead status:', error)
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contactEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'qualified': return 'bg-purple-100 text-purple-800'
      case 'proposal_sent': return 'bg-orange-100 text-orange-800'
      case 'closed_won': return 'bg-green-100 text-green-800'
      case 'closed_lost': return 'bg-red-100 text-red-800'
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Referral Management</h1>
          <p className="text-gray-600">Submit and track your business referrals</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setShowReferralForm(true)}
            className="gradient-bg"
          >
            <FileText className="h-4 w-4 mr-2" />
            Complete Referral Application
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Quick Lead Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingLead ? 'Edit Referral' : 'Submit New Referral'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="service">Service Business</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currentProcessor">Current Processor</Label>
                  <Input
                    id="currentProcessor"
                    value={formData.currentProcessor}
                    onChange={(e) => setFormData({...formData, currentProcessor: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyVolume">Monthly Volume ($)</Label>
                  <Input
                    id="monthlyVolume"
                    type="number"
                    value={formData.monthlyVolume}
                    onChange={(e) => setFormData({...formData, monthlyVolume: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="averageTicket">Average Ticket ($)</Label>
                  <Input
                    id="averageTicket"
                    type="number"
                    value={formData.averageTicket}
                    onChange={(e) => setFormData({...formData, averageTicket: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="potentialMonthlyRevenue">Potential Monthly Revenue ($)</Label>
                  <Input
                    id="potentialMonthlyRevenue"
                    type="number"
                    value={formData.potentialMonthlyRevenue}
                    onChange={(e) => setFormData({...formData, potentialMonthlyRevenue: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => {
                  setShowAddDialog(false)
                  setEditingLead(null)
                  setFormData({
                    businessName: '',
                    contactName: '',
                    contactEmail: '',
                    contactPhone: '',
                    businessType: '',
                    currentProcessor: '',
                    monthlyVolume: '',
                    averageTicket: '',
                    notes: '',
                    potentialMonthlyRevenue: ''
                  })
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="gradient-bg">
                  {editingLead ? 'Update Referral' : 'Submit Referral'}
                </Button>
              </div>
            </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Referral Application Form Modal */}
      {showReferralForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
            <ReferralApplicationForm
              user={user}
              onSuccess={() => {
                setShowReferralForm(false)
                loadLeads()
              }}
              onCancel={() => setShowReferralForm(false)}
            />
          </div>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search referrals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                  <SelectItem value="closed_won">Closed Won</SelectItem>
                  <SelectItem value="closed_lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referrals ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start by submitting your first business referral'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button onClick={() => setShowAddDialog(true)} className="gradient-bg">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Your First Referral
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Business</th>
                    <th className="text-left p-3">Contact</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Monthly Volume</th>
                    <th className="text-left p-3">Potential Revenue</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Submitted</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-gray-900">{lead.businessName}</p>
                          {lead.currentProcessor && (
                            <p className="text-sm text-gray-500">Current: {lead.currentProcessor}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{lead.contactName}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Mail className="h-3 w-3" />
                            {lead.contactEmail}
                          </div>
                          {lead.contactPhone && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Phone className="h-3 w-3" />
                              {lead.contactPhone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="capitalize">{lead.businessType || '-'}</span>
                      </td>
                      <td className="p-3">
                        ${lead.monthlyVolume?.toLocaleString() || 0}
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-green-600">
                          ${lead.potentialMonthlyRevenue?.toLocaleString() || 0}/mo
                        </span>
                      </td>
                      <td className="p-3">
                        <Select value={lead.status} onValueChange={(value) => updateLeadStatus(lead.id, value)}>
                          <SelectTrigger className="w-auto">
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status?.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="submitted">Submitted</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                            <SelectItem value="closed_won">Closed Won</SelectItem>
                            <SelectItem value="closed_lost">Closed Lost</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-3">
                        {new Date(lead.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(lead)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(lead.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}