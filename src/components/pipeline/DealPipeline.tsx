import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, DollarSign, Calendar, User, Building, ArrowRight } from 'lucide-react'
import { blink } from '@/blink/client'
import { Lead, Deal } from '@/types'

interface DealPipelineProps {
  user: any
}

interface PipelineStage {
  id: string
  title: string
  color: string
  deals: Deal[]
}

export function DealPipeline({ user }: DealPipelineProps) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [formData, setFormData] = useState({
    leadId: '',
    stage: 'qualified',
    value: '',
    commissionRate: '',
    commissionAmount: '',
    expectedCloseDate: '',
    notes: ''
  })

  const stages: PipelineStage[] = [
    { id: 'qualified', title: 'Qualified', color: 'bg-blue-100 text-blue-800', deals: [] },
    { id: 'proposal_sent', title: 'Proposal Sent', color: 'bg-purple-100 text-purple-800', deals: [] },
    { id: 'negotiation', title: 'Negotiation', color: 'bg-orange-100 text-orange-800', deals: [] },
    { id: 'closed_won', title: 'Closed Won', color: 'bg-green-100 text-green-800', deals: [] },
    { id: 'closed_lost', title: 'Closed Lost', color: 'bg-red-100 text-red-800', deals: [] }
  ]

  const loadData = useCallback(async () => {
    try {
      // Load leads that can be converted to deals
      const userLeads = await blink.db.leads.list({
        where: { userId: user.id },
        orderBy: { submittedAt: 'desc' }
      })
      setLeads(userLeads)

      // Load existing deals
      const userDeals = await blink.db.deals.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
      setDeals(userDeals)
    } catch (error) {
      console.error('Error loading pipeline data:', error)
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const dealData = {
        ...formData,
        userId: user.id,
        leadId: selectedLead?.id || formData.leadId,
        businessName: selectedLead?.businessName || '',
        contactName: selectedLead?.contactName || '',
        contactEmail: selectedLead?.contactEmail || '',
        value: parseFloat(formData.value) || 0,
        commissionRate: parseFloat(formData.commissionRate) || 0,
        commissionAmount: parseFloat(formData.commissionAmount) || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      await blink.db.deals.create(dealData)

      // Update lead status if creating from lead
      if (selectedLead) {
        await blink.db.leads.update(selectedLead.id, {
          status: formData.stage,
          updatedAt: new Date().toISOString()
        })
      }

      setShowCreateDialog(false)
      setSelectedLead(null)
      setFormData({
        leadId: '',
        stage: 'qualified',
        value: '',
        commissionRate: '',
        commissionAmount: '',
        expectedCloseDate: '',
        notes: ''
      })
      loadData()
    } catch (error) {
      console.error('Error creating deal:', error)
    }
  }

  const updateDealStage = async (dealId: string, newStage: string) => {
    try {
      await blink.db.deals.update(dealId, {
        stage: newStage,
        updatedAt: new Date().toISOString()
      })
      loadData()
    } catch (error) {
      console.error('Error updating deal stage:', error)
    }
  }

  const createDealFromLead = (lead: Lead) => {
    setSelectedLead(lead)
    setFormData({
      leadId: lead.id,
      stage: 'qualified',
      value: lead.potentialMonthlyRevenue?.toString() || '',
      commissionRate: '0.05', // Default 5%
      commissionAmount: ((lead.potentialMonthlyRevenue || 0) * 0.05).toString(),
      expectedCloseDate: '',
      notes: `Deal created from lead: ${lead.businessName}`
    })
    setShowCreateDialog(true)
  }

  // Organize deals by stage
  const pipelineStages = stages.map(stage => ({
    ...stage,
    deals: deals.filter(deal => deal.stage === stage.id)
  }))

  const totalPipelineValue = deals
    .filter(deal => !['closed_won', 'closed_lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + (deal.value || 0), 0)

  const totalWonValue = deals
    .filter(deal => deal.stage === 'closed_won')
    .reduce((sum, deal) => sum + (deal.value || 0), 0)

  const conversionRate = deals.length > 0 
    ? (deals.filter(deal => deal.stage === 'closed_won').length / deals.length) * 100 
    : 0

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
          <h1 className="text-3xl font-bold text-gray-900">Deal Pipeline</h1>
          <p className="text-gray-600">Track your deals through the sales process</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gradient-bg">
              <Plus className="h-4 w-4 mr-2" />
              Create Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Deal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateDeal} className="space-y-4">
              {!selectedLead && (
                <div>
                  <Label htmlFor="leadId">Select Lead (Optional)</Label>
                  <Select value={formData.leadId} onValueChange={(value) => {
                    const lead = leads.find(l => l.id === value)
                    if (lead) {
                      setSelectedLead(lead)
                      setFormData({
                        ...formData,
                        leadId: value,
                        value: lead.potentialMonthlyRevenue?.toString() || ''
                      })
                    } else {
                      setFormData({...formData, leadId: value})
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a lead or create manually" />
                    </SelectTrigger>
                    <SelectContent>
                      {leads.filter(lead => !deals.some(deal => deal.leadId === lead.id)).map(lead => (
                        <SelectItem key={lead.id} value={lead.id}>
                          {lead.businessName} - {lead.contactName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedLead && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Creating deal from lead:</h4>
                  <p className="text-blue-700">{selectedLead.businessName} - {selectedLead.contactName}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stage">Initial Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData({...formData, stage: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="value">Deal Value ($)</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    step="0.01"
                    value={formData.commissionRate}
                    onChange={(e) => {
                      const rate = parseFloat(e.target.value) || 0
                      const value = parseFloat(formData.value) || 0
                      setFormData({
                        ...formData, 
                        commissionRate: e.target.value,
                        commissionAmount: (value * rate / 100).toString()
                      })
                    }}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="commissionAmount">Commission Amount ($)</Label>
                  <Input
                    id="commissionAmount"
                    type="number"
                    value={formData.commissionAmount}
                    onChange={(e) => setFormData({...formData, commissionAmount: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="expectedCloseDate">Expected Close Date</Label>
                  <Input
                    id="expectedCloseDate"
                    type="date"
                    value={formData.expectedCloseDate}
                    onChange={(e) => setFormData({...formData, expectedCloseDate: e.target.value})}
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
                  setShowCreateDialog(false)
                  setSelectedLead(null)
                  setFormData({
                    leadId: '',
                    stage: 'qualified',
                    value: '',
                    commissionRate: '',
                    commissionAmount: '',
                    expectedCloseDate: '',
                    notes: ''
                  })
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="gradient-bg">
                  Create Deal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPipelineValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Won Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalWonValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Closed deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Conversion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions for Leads */}
      {leads.filter(lead => !deals.some(deal => deal.leadId === lead.id) && 
                           ['qualified', 'proposal_sent'].includes(lead.status)).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Convert Leads to Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leads
                .filter(lead => !deals.some(deal => deal.leadId === lead.id) && 
                               ['qualified', 'proposal_sent'].includes(lead.status))
                .slice(0, 6)
                .map(lead => (
                  <div key={lead.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{lead.businessName}</h4>
                        <p className="text-sm text-gray-500">{lead.contactName}</p>
                        <p className="text-sm font-medium text-green-600">
                          ${lead.potentialMonthlyRevenue?.toLocaleString() || 0}/mo
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => createDealFromLead(lead)}
                        className="ml-2"
                      >
                        Create Deal
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {pipelineStages.map((stage) => (
          <Card key={stage.id} className="min-h-[400px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{stage.title}</span>
                <Badge variant="secondary">{stage.deals.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stage.deals.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No deals in this stage</p>
                </div>
              ) : (
                stage.deals.map((deal) => (
                  <div key={deal.id} className="p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm text-gray-900 line-clamp-2">
                          {deal.businessName || 'Unnamed Deal'}
                        </h4>
                        <Select 
                          value={deal.stage} 
                          onValueChange={(value) => updateDealStage(deal.id, value)}
                        >
                          <SelectTrigger className="w-8 h-8 p-0 border-none">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </SelectTrigger>
                          <SelectContent>
                            {stages.map(s => (
                              <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <User className="h-3 w-3" />
                        {deal.contactName || 'No contact'}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-600">
                          ${deal.value?.toLocaleString() || 0}
                        </span>
                        <span className="text-xs text-gray-500">
                          {deal.commissionRate}% comm.
                        </span>
                      </div>
                      
                      {deal.expectedCloseDate && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(deal.expectedCloseDate).toLocaleDateString()}
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500">
                        Created {new Date(deal.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}