import React, { useState } from 'react'
import { X, User, Building, CreditCard, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { blink } from '../../blink/client'

interface AddPartnerFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPartnerAdded: () => void
}

interface FormData {
  // Personal
  firstName: string
  lastName: string
  email: string
  phone: string
  commissionRate: number
  status: string
  notes: string
  
  // Business
  legalBusinessName: string
  dbaName: string
  businessAddress: string
  businessCity: string
  businessState: string
  businessZip: string
  businessPhone: string
  businessEmail: string
  ein: string
  businessType: string
  industryType: string
  
  // Banking
  bankName: string
  accountHolderName: string
  routingNumber: string
  accountNumber: string
}

interface Documents {
  w9: File | null
  voidedCheck: File | null
  ownerIds: File | null
}

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Business Info', icon: Building },
  { id: 3, title: 'Banking Info', icon: CreditCard },
  { id: 4, title: 'Documents', icon: FileText }
]

export function AddPartnerForm({ open, onOpenChange, onPartnerAdded }: AddPartnerFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    commissionRate: 10,
    status: 'active',
    notes: '',
    legalBusinessName: '',
    dbaName: '',
    businessAddress: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    businessPhone: '',
    businessEmail: '',
    ein: '',
    businessType: '',
    industryType: '',
    bankName: '',
    accountHolderName: '',
    routingNumber: '',
    accountNumber: ''
  })
  
  const [documents, setDocuments] = useState<Documents>({
    w9: null,
    voidedCheck: null,
    ownerIds: null
  })

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (docType: keyof Documents, file: File | null) => {
    setDocuments(prev => ({ ...prev, [docType]: file }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email)
      case 2:
        return !!(formData.legalBusinessName && formData.businessAddress && formData.businessCity && formData.businessState)
      case 3:
        return !!(formData.bankName && formData.accountHolderName && formData.routingNumber && formData.accountNumber)
      case 4:
        return !!(documents.w9 && documents.voidedCheck)
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
      setError('')
    } else {
      setError('Please fill in all required fields before continuing.')
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    setError('')
  }

  const uploadFile = async (file: File, path: string): Promise<string> => {
    try {
      const { publicUrl } = await blink.storage.upload(file, path, { upsert: true })
      return publicUrl
    } catch (error) {
      console.error('File upload error:', error)
      throw new Error(`Failed to upload ${file.name}`)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      setError('Please complete all required fields and upload required documents.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      console.log('Starting partner creation process...')
      
      // Generate unique ID
      const partnerId = `partner_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Upload documents
      console.log('Uploading documents...')
      const documentUrls: { [key: string]: string } = {}
      
      if (documents.w9) {
        documentUrls.w9Url = await uploadFile(documents.w9, `partners/${partnerId}/w9.pdf`)
      }
      if (documents.voidedCheck) {
        documentUrls.voidedCheckUrl = await uploadFile(documents.voidedCheck, `partners/${partnerId}/voided-check.pdf`)
      }
      if (documents.ownerIds) {
        documentUrls.ownerIdsUrl = await uploadFile(documents.ownerIds, `partners/${partnerId}/owner-ids.pdf`)
      }

      console.log('Documents uploaded successfully:', documentUrls)

      // Prepare user data for creation
      console.log('Preparing user account data...')
      const userData = {
        id: partnerId,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: 'partner',
        status: formData.status,
        createdAt: new Date().toISOString()
      }

      // Create partner profile using direct table access
      console.log('Creating partner profile...')
      const profileData = {
        id: `profile_${partnerId}`,
        user_id: partnerId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        commission_rate: formData.commissionRate,
        status: formData.status,
        notes: formData.notes || null,
        legal_business_name: formData.legalBusinessName || null,
        dba_name: formData.dbaName || null,
        business_address: formData.businessAddress || null,
        business_city: formData.businessCity || null,
        business_state: formData.businessState || null,
        business_zip: formData.businessZip || null,
        business_phone: formData.businessPhone || null,
        business_email: formData.businessEmail || null,
        ein: formData.ein || null,
        business_type: formData.businessType || null,
        industry_type: formData.industryType || null,
        bank_name: formData.bankName || null,
        account_holder_name: formData.accountHolderName || null,
        routing_number: formData.routingNumber || null,
        account_number: formData.accountNumber || null,
        w9_url: documentUrls.w9Url || null,
        voided_check_url: documentUrls.voidedCheckUrl || null,
        owner_ids_url: documentUrls.ownerIdsUrl || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Use Blink SDK's built-in SQL method to avoid table mapping issues
      console.log('Attempting to create partner profile with data:', profileData)
      
      // Create the partner profile using direct SQL
      const insertSQL = `
        INSERT INTO partner_profiles (
          id, user_id, first_name, last_name, email, phone, commission_rate, status, notes,
          legal_business_name, dba_name, business_address, business_city, business_state, business_zip,
          business_phone, business_email, ein, business_type, industry_type,
          bank_name, account_holder_name, routing_number, account_number,
          w9_url, voided_check_url, owner_ids_url, created_at, updated_at
        ) VALUES (
          '${profileData.id}',
          '${profileData.user_id}',
          '${profileData.first_name}',
          '${profileData.last_name}',
          '${profileData.email}',
          ${profileData.phone ? `'${profileData.phone}'` : 'NULL'},
          ${profileData.commission_rate},
          '${profileData.status}',
          ${profileData.notes ? `'${profileData.notes}'` : 'NULL'},
          ${profileData.legal_business_name ? `'${profileData.legal_business_name}'` : 'NULL'},
          ${profileData.dba_name ? `'${profileData.dba_name}'` : 'NULL'},
          ${profileData.business_address ? `'${profileData.business_address}'` : 'NULL'},
          ${profileData.business_city ? `'${profileData.business_city}'` : 'NULL'},
          ${profileData.business_state ? `'${profileData.business_state}'` : 'NULL'},
          ${profileData.business_zip ? `'${profileData.business_zip}'` : 'NULL'},
          ${profileData.business_phone ? `'${profileData.business_phone}'` : 'NULL'},
          ${profileData.business_email ? `'${profileData.business_email}'` : 'NULL'},
          ${profileData.ein ? `'${profileData.ein}'` : 'NULL'},
          ${profileData.business_type ? `'${profileData.business_type}'` : 'NULL'},
          ${profileData.industry_type ? `'${profileData.industry_type}'` : 'NULL'},
          ${profileData.bank_name ? `'${profileData.bank_name}'` : 'NULL'},
          ${profileData.account_holder_name ? `'${profileData.account_holder_name}'` : 'NULL'},
          ${profileData.routing_number ? `'${profileData.routing_number}'` : 'NULL'},
          ${profileData.account_number ? `'${profileData.account_number}'` : 'NULL'},
          ${profileData.w9_url ? `'${profileData.w9_url}'` : 'NULL'},
          ${profileData.voided_check_url ? `'${profileData.voided_check_url}'` : 'NULL'},
          ${profileData.owner_ids_url ? `'${profileData.owner_ids_url}'` : 'NULL'},
          '${profileData.created_at}',
          '${profileData.updated_at}'
        )
      `
      
      console.log('Executing SQL:', insertSQL)
      
      // Execute using a simple approach - try the users table first to make sure that works
      console.log('Creating user first...')
      
      // Create user using the method we know works
      try {
        const userResult = await blink.db.users.create(userData)
        console.log('User created successfully:', userResult)
      } catch (userError) {
        console.error('User creation failed:', userError)
        throw new Error(`Failed to create user: ${userError.message}`)
      }
      
      // Now try to create the partner profile using a simple object approach
      console.log('Creating partner profile...')
      
      // Try using the simplest possible approach
      const simpleProfileData = {
        id: profileData.id,
        userId: profileData.user_id, // Use camelCase for Blink SDK
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        email: profileData.email,
        phone: profileData.phone,
        commissionRate: profileData.commission_rate,
        status: profileData.status,
        notes: profileData.notes,
        legalBusinessName: profileData.legal_business_name,
        dbaName: profileData.dba_name,
        businessAddress: profileData.business_address,
        businessCity: profileData.business_city,
        businessState: profileData.business_state,
        businessZip: profileData.business_zip,
        businessPhone: profileData.business_phone,
        businessEmail: profileData.business_email,
        ein: profileData.ein,
        businessType: profileData.business_type,
        industryType: profileData.industry_type,
        bankName: profileData.bank_name,
        accountHolderName: profileData.account_holder_name,
        routingNumber: profileData.routing_number,
        accountNumber: profileData.account_number,
        w9Url: profileData.w9_url,
        voidedCheckUrl: profileData.voided_check_url,
        ownerIdsUrl: profileData.owner_ids_url,
        createdAt: profileData.created_at,
        updatedAt: profileData.updated_at
      }
      
      console.log('Attempting to create partner profile with camelCase data:', simpleProfileData)
      
      // Try the simplest table access method
      const profileResult = await blink.db.partnerProfiles.create(simpleProfileData)
      console.log('Partner profile created successfully:', profileResult)

      // Success!
      alert('Partner created successfully!')
      onPartnerAdded()
      onOpenChange(false)

    } catch (error) {
      console.error('Error creating partner:', error)
      setError(`Failed to create partner: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                <Input
                  id="commissionRate"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.commissionRate}
                  onChange={(e) => updateFormData('commissionRate', parseFloat(e.target.value) || 0)}
                  placeholder="10"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => updateFormData('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                placeholder="Additional notes about this partner"
                rows={3}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="legalBusinessName">Legal Business Name *</Label>
              <Input
                id="legalBusinessName"
                value={formData.legalBusinessName}
                onChange={(e) => updateFormData('legalBusinessName', e.target.value)}
                placeholder="Enter legal business name"
              />
            </div>
            
            <div>
              <Label htmlFor="dbaName">DBA Name</Label>
              <Input
                id="dbaName"
                value={formData.dbaName}
                onChange={(e) => updateFormData('dbaName', e.target.value)}
                placeholder="Doing Business As name"
              />
            </div>
            
            <div>
              <Label htmlFor="businessAddress">Business Address *</Label>
              <Input
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) => updateFormData('businessAddress', e.target.value)}
                placeholder="Enter business address"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="businessCity">City *</Label>
                <Input
                  id="businessCity"
                  value={formData.businessCity}
                  onChange={(e) => updateFormData('businessCity', e.target.value)}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="businessState">State *</Label>
                <Input
                  id="businessState"
                  value={formData.businessState}
                  onChange={(e) => updateFormData('businessState', e.target.value)}
                  placeholder="State"
                />
              </div>
              <div>
                <Label htmlFor="businessZip">ZIP Code</Label>
                <Input
                  id="businessZip"
                  value={formData.businessZip}
                  onChange={(e) => updateFormData('businessZip', e.target.value)}
                  placeholder="ZIP"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessPhone">Business Phone</Label>
                <Input
                  id="businessPhone"
                  value={formData.businessPhone}
                  onChange={(e) => updateFormData('businessPhone', e.target.value)}
                  placeholder="Business phone"
                />
              </div>
              <div>
                <Label htmlFor="businessEmail">Business Email</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  value={formData.businessEmail}
                  onChange={(e) => updateFormData('businessEmail', e.target.value)}
                  placeholder="Business email"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ein">EIN</Label>
                <Input
                  id="ein"
                  value={formData.ein}
                  onChange={(e) => updateFormData('ein', e.target.value)}
                  placeholder="XX-XXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select value={formData.businessType} onValueChange={(value) => updateFormData('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="industryType">Industry Type</Label>
              <Input
                id="industryType"
                value={formData.industryType}
                onChange={(e) => updateFormData('industryType', e.target.value)}
                placeholder="e.g., Technology, Retail, Healthcare"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bankName">Bank Name *</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => updateFormData('bankName', e.target.value)}
                placeholder="Enter bank name"
              />
            </div>
            
            <div>
              <Label htmlFor="accountHolderName">Account Holder Name *</Label>
              <Input
                id="accountHolderName"
                value={formData.accountHolderName}
                onChange={(e) => updateFormData('accountHolderName', e.target.value)}
                placeholder="Name on the account"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="routingNumber">Routing Number *</Label>
                <Input
                  id="routingNumber"
                  value={formData.routingNumber}
                  onChange={(e) => updateFormData('routingNumber', e.target.value)}
                  placeholder="9-digit routing number"
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => updateFormData('accountNumber', e.target.value)}
                  placeholder="Account number"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="w9">W-9 Form *</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  id="w9"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange('w9', e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label htmlFor="w9" className="cursor-pointer">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Click to upload W-9 form
                    </span>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </label>
                {documents.w9 && (
                  <p className="mt-2 text-sm text-green-600">✓ {documents.w9.name}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="voidedCheck">Voided Check *</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  id="voidedCheck"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange('voidedCheck', e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label htmlFor="voidedCheck" className="cursor-pointer">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Click to upload voided check
                    </span>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </label>
                {documents.voidedCheck && (
                  <p className="mt-2 text-sm text-green-600">✓ {documents.voidedCheck.name}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="ownerIds">Owner IDs</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  id="ownerIds"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange('ownerIds', e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label htmlFor="ownerIds" className="cursor-pointer">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Click to upload owner IDs
                    </span>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </label>
                {documents.ownerIds && (
                  <p className="mt-2 text-sm text-green-600">✓ {documents.ownerIds.name}</p>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold">Add New Partner</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {currentStep} of 4</span>
              <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
            </div>
            <Progress value={(currentStep / 4) * 100} className="w-full" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2
                    ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 
                      isCompleted ? 'bg-green-600 border-green-600 text-white' : 
                      'bg-gray-100 border-gray-300 text-gray-400'}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Step Content */}
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              
              {currentStep < 4 ? (
                <Button onClick={nextStep} disabled={isSubmitting}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Partner...' : 'Create Partner'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}