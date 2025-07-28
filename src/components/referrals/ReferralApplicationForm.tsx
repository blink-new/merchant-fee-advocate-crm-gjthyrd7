import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Upload, FileText, X, CheckCircle } from 'lucide-react'
import { blink } from '@/blink/client'

interface ReferralApplicationFormProps {
  user: any
  onSuccess?: () => void
  onCancel?: () => void
}

interface FormData {
  // Business Information
  legalBusinessName: string
  businessPhone: string
  businessEmail: string
  companyDomain: string
  businessAddress: {
    street: string
    addressLine2: string
    city: string
    state: string
    zipCode: string
  }
  dbaName: string
  monthlyRevenue: string
  industryType: string
  productsDescription: string
  
  // DBA/Shipping Address
  sameAsBusinessAddress: boolean
  dbaAddress: {
    street: string
    addressLine2: string
    city: string
    state: string
    zipCode: string
  }
  businessType: string
  ein: string
  
  // Owner Information
  ownerName: {
    first: string
    last: string
  }
  ownerAddress: {
    street: string
    addressLine2: string
    city: string
    state: string
    zipCode: string
  }
  ownerPhone: string
  ownerEmail: string
  ownerDob: string
  ownerSsn: string
  numberOfOwners: string
  ownershipPercentage: string
  
  // Banking Details
  bankName: string
  nameOnAccount: string
  routingNumber: string
  accountNumber: string
}

interface FileUploads {
  articlesOfIncorporation: File[]
  einUpload: File | null
  ownerIds: File[]
  voidedCheckOrBankLetter: File | null
  bankStatements: File[]
}

export function ReferralApplicationForm({ user, onSuccess, onCancel }: ReferralApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    legalBusinessName: '',
    businessPhone: '',
    businessEmail: '',
    companyDomain: '',
    businessAddress: {
      street: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: ''
    },
    dbaName: '',
    monthlyRevenue: '',
    industryType: '',
    productsDescription: '',
    sameAsBusinessAddress: false,
    dbaAddress: {
      street: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: ''
    },
    businessType: '',
    ein: '',
    ownerName: {
      first: '',
      last: ''
    },
    ownerAddress: {
      street: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: ''
    },
    ownerPhone: '',
    ownerEmail: '',
    ownerDob: '',
    ownerSsn: '',
    numberOfOwners: '',
    ownershipPercentage: '',
    bankName: '',
    nameOnAccount: '',
    routingNumber: '',
    accountNumber: ''
  })

  const [fileUploads, setFileUploads] = useState<FileUploads>({
    articlesOfIncorporation: [],
    einUpload: null,
    ownerIds: [],
    voidedCheckOrBankLetter: null,
    bankStatements: []
  })

  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string[]}>({})

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...prev[section], [field]: value }
        : value
    }))
  }

  const handleSameAddressChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sameAsBusinessAddress: checked,
      dbaAddress: checked ? { ...prev.businessAddress } : {
        street: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: ''
      }
    }))
  }

  const handleFileUpload = async (files: FileList | null, category: keyof FileUploads, maxFiles?: number) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    
    // Check file limits
    if (maxFiles && fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`)
      return
    }

    // Check file sizes (512MB = 536,870,912 bytes)
    const maxSize = 512 * 1024 * 1024
    for (const file of fileArray) {
      if (file.size > maxSize) {
        alert(`File "${file.name}" exceeds 512MB limit`)
        return
      }
    }

    setUploading(true)
    try {
      const uploadedUrls: string[] = []
      
      for (const file of fileArray) {
        const { publicUrl } = await blink.storage.upload(
          file,
          `referral-applications/${user.id}/${category}/${Date.now()}-${file.name}`,
          { upsert: true }
        )
        uploadedUrls.push(publicUrl)
      }

      // Update file uploads state
      if (category === 'einUpload' || category === 'voidedCheckOrBankLetter') {
        setFileUploads(prev => ({
          ...prev,
          [category]: fileArray[0]
        }))
      } else {
        setFileUploads(prev => ({
          ...prev,
          [category]: [...prev[category] as File[], ...fileArray]
        }))
      }

      // Store uploaded URLs
      setUploadedFiles(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), ...uploadedUrls]
      }))

    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const removeFile = (category: keyof FileUploads, index: number) => {
    setFileUploads(prev => {
      if (category === 'einUpload' || category === 'voidedCheckOrBankLetter') {
        return { ...prev, [category]: null }
      } else {
        const files = [...prev[category] as File[]]
        files.splice(index, 1)
        return { ...prev, [category]: files }
      }
    })

    setUploadedFiles(prev => {
      const urls = [...(prev[category] || [])]
      urls.splice(index, 1)
      return { ...prev, [category]: urls }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Validate required files
      const requiredFiles = [
        'articlesOfIncorporation',
        'einUpload', 
        'ownerIds',
        'voidedCheckOrBankLetter',
        'bankStatements'
      ]

      for (const fileType of requiredFiles) {
        if (!uploadedFiles[fileType] || uploadedFiles[fileType].length === 0) {
          alert(`Please upload ${fileType.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
          setSubmitting(false)
          return
        }
      }

      // Save referral application to database
      const applicationData = {
        userId: user.id,
        submittedAt: new Date().toISOString(),
        status: 'submitted',
        formData: formData,
        uploadedFiles: uploadedFiles,
        submittedBy: user.email
      }

      await blink.db.referralApplications.create(applicationData)

      // Send email notification
      const emailContent = `
        <h2>New Referral Application Submitted</h2>
        <p><strong>Submitted by:</strong> ${user.email}</p>
        <p><strong>Business Name:</strong> ${formData.legalBusinessName}</p>
        <p><strong>Contact:</strong> ${formData.ownerName.first} ${formData.ownerName.last}</p>
        <p><strong>Email:</strong> ${formData.businessEmail}</p>
        <p><strong>Phone:</strong> ${formData.businessPhone}</p>
        <p><strong>Monthly Revenue:</strong> $${formData.monthlyRevenue}</p>
        <p><strong>Industry:</strong> ${formData.industryType}</p>
        
        <h3>Uploaded Documents:</h3>
        <ul>
          <li>Articles of Incorporation: ${uploadedFiles.articlesOfIncorporation?.length || 0} files</li>
          <li>EIN Letter: ${uploadedFiles.einUpload ? '1 file' : 'None'}</li>
          <li>Owner IDs: ${uploadedFiles.ownerIds?.length || 0} files</li>
          <li>Voided Check/Bank Letter: ${uploadedFiles.voidedCheckOrBankLetter ? '1 file' : 'None'}</li>
          <li>Bank Statements: ${uploadedFiles.bankStatements?.length || 0} files</li>
        </ul>
        
        <p>Please review this application in the admin dashboard.</p>
      `

      await blink.notifications.email({
        to: 'partners@merchantfeeadvocate.com',
        subject: `New Referral Application - ${formData.legalBusinessName}`,
        html: emailContent,
        from: 'noreply@merchantfeeadvocate.com'
      })

      alert('Application submitted successfully! You will be contacted within 24-48 hours.')
      onSuccess?.()

    } catch (error) {
      console.error('Submission error:', error)
      alert('Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const FileUploadSection = ({ 
    title, 
    category, 
    maxFiles, 
    maxSize = "512 MB", 
    description,
    required = true 
  }: {
    title: string
    category: keyof FileUploads
    maxFiles?: number
    maxSize?: string
    description: string
    required?: boolean
  }) => {
    const files = fileUploads[category]
    const fileArray = Array.isArray(files) ? files : files ? [files] : []

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {title} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            multiple={maxFiles !== 1}
            onChange={(e) => handleFileUpload(e.target.files, category, maxFiles)}
            className="hidden"
            id={`upload-${category}`}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <label htmlFor={`upload-${category}`} className="cursor-pointer">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Drop files here or <span className="text-blue-600">Select files</span></p>
            <p className="text-xs text-gray-500 mt-1">
              Max. file size: {maxSize}{maxFiles && `, Max. files: ${maxFiles}`}
            </p>
          </label>
        </div>
        <p className="text-xs text-gray-600">{description}</p>
        
        {fileArray.length > 0 && (
          <div className="space-y-2">
            {fileArray.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{file.name}</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(category, index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Referral Application</h1>
        <p className="text-gray-600">Submit a new business for payment processing.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="legalBusinessName">Legal Business Name <span className="text-red-500">*</span></Label>
                <Input
                  id="legalBusinessName"
                  value={formData.legalBusinessName}
                  onChange={(e) => handleInputChange('legalBusinessName', '', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="businessPhone">Business Phone Number <span className="text-red-500">*</span></Label>
                <Input
                  id="businessPhone"
                  value={formData.businessPhone}
                  onChange={(e) => handleInputChange('businessPhone', '', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="businessEmail">Business Email <span className="text-red-500">*</span></Label>
                <Input
                  id="businessEmail"
                  type="email"
                  value={formData.businessEmail}
                  onChange={(e) => handleInputChange('businessEmail', '', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="companyDomain">Company Domain</Label>
                <Input
                  id="companyDomain"
                  value={formData.companyDomain}
                  onChange={(e) => handleInputChange('companyDomain', '', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Business Address <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="businessStreet">Street Address</Label>
                  <Input
                    id="businessStreet"
                    value={formData.businessAddress.street}
                    onChange={(e) => handleInputChange('businessAddress', 'street', e.target.value)}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="businessAddressLine2">Address Line 2</Label>
                  <Input
                    id="businessAddressLine2"
                    value={formData.businessAddress.addressLine2}
                    onChange={(e) => handleInputChange('businessAddress', 'addressLine2', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="businessCity">City</Label>
                  <Input
                    id="businessCity"
                    value={formData.businessAddress.city}
                    onChange={(e) => handleInputChange('businessAddress', 'city', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="businessState">State / Province / Region</Label>
                  <Input
                    id="businessState"
                    value={formData.businessAddress.state}
                    onChange={(e) => handleInputChange('businessAddress', 'state', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="businessZip">ZIP / Postal Code</Label>
                  <Input
                    id="businessZip"
                    value={formData.businessAddress.zipCode}
                    onChange={(e) => handleInputChange('businessAddress', 'zipCode', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dbaName">DBA Name</Label>
                <Input
                  id="dbaName"
                  value={formData.dbaName}
                  onChange={(e) => handleInputChange('dbaName', '', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="monthlyRevenue">Monthly Revenue</Label>
                <Input
                  id="monthlyRevenue"
                  value={formData.monthlyRevenue}
                  onChange={(e) => handleInputChange('monthlyRevenue', '', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="industryType">Industry Type</Label>
                <Select value={formData.industryType} onValueChange={(value) => handleInputChange('industryType', '', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="professional-services">Professional Services</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="productsDescription">Description of products sold:</Label>
              <Textarea
                id="productsDescription"
                value={formData.productsDescription}
                onChange={(e) => handleInputChange('productsDescription', '', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* DBA/Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle>DBA / Shipping Address <span className="text-red-500">*</span></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameAsBusinessAddress"
                checked={formData.sameAsBusinessAddress}
                onCheckedChange={handleSameAddressChange}
              />
              <Label htmlFor="sameAsBusinessAddress">Same as previous</Label>
            </div>

            {!formData.sameAsBusinessAddress && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="dbaStreet">Street Address</Label>
                  <Input
                    id="dbaStreet"
                    value={formData.dbaAddress.street}
                    onChange={(e) => handleInputChange('dbaAddress', 'street', e.target.value)}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="dbaAddressLine2">Address Line 2</Label>
                  <Input
                    id="dbaAddressLine2"
                    value={formData.dbaAddress.addressLine2}
                    onChange={(e) => handleInputChange('dbaAddress', 'addressLine2', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dbaCity">City</Label>
                  <Input
                    id="dbaCity"
                    value={formData.dbaAddress.city}
                    onChange={(e) => handleInputChange('dbaAddress', 'city', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dbaState">State / Province / Region</Label>
                  <Input
                    id="dbaState"
                    value={formData.dbaAddress.state}
                    onChange={(e) => handleInputChange('dbaAddress', 'state', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dbaZip">ZIP / Postal Code</Label>
                  <Input
                    id="dbaZip"
                    value={formData.dbaAddress.zipCode}
                    onChange={(e) => handleInputChange('dbaAddress', 'zipCode', e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessType">Business Type <span className="text-red-500">*</span></Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', '', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="non-profit">Non-Profit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ein">EIN <span className="text-red-500">*</span></Label>
                <Input
                  id="ein"
                  value={formData.ein}
                  onChange={(e) => handleInputChange('ein', '', e.target.value)}
                  required
                />
              </div>
            </div>

            <FileUploadSection
              title="Articles of Incorporation"
              category="articlesOfIncorporation"
              maxFiles={5}
              description="Please Upload Articles of Incorporation"
            />

            <FileUploadSection
              title="EIN Upload"
              category="einUpload"
              maxFiles={1}
              description="Please Upload A Copy Of EIN Letter"
            />
          </CardContent>
        </Card>

        {/* Owner Information */}
        <Card>
          <CardHeader>
            <CardTitle>Owner Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base font-medium mb-3 block">Name <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerFirstName">First</Label>
                  <Input
                    id="ownerFirstName"
                    value={formData.ownerName.first}
                    onChange={(e) => handleInputChange('ownerName', 'first', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ownerLastName">Last</Label>
                  <Input
                    id="ownerLastName"
                    value={formData.ownerName.last}
                    onChange={(e) => handleInputChange('ownerName', 'last', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Address <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="ownerStreet">Street Address</Label>
                  <Input
                    id="ownerStreet"
                    value={formData.ownerAddress.street}
                    onChange={(e) => handleInputChange('ownerAddress', 'street', e.target.value)}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="ownerAddressLine2">Address Line 2</Label>
                  <Input
                    id="ownerAddressLine2"
                    value={formData.ownerAddress.addressLine2}
                    onChange={(e) => handleInputChange('ownerAddress', 'addressLine2', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="ownerCity">City</Label>
                  <Input
                    id="ownerCity"
                    value={formData.ownerAddress.city}
                    onChange={(e) => handleInputChange('ownerAddress', 'city', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ownerState">State / Province / Region</Label>
                  <Input
                    id="ownerState"
                    value={formData.ownerAddress.state}
                    onChange={(e) => handleInputChange('ownerAddress', 'state', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ownerZip">ZIP / Postal Code</Label>
                  <Input
                    id="ownerZip"
                    value={formData.ownerAddress.zipCode}
                    onChange={(e) => handleInputChange('ownerAddress', 'zipCode', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ownerPhone">Phone <span className="text-red-500">*</span></Label>
                <Input
                  id="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={(e) => handleInputChange('ownerPhone', '', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="ownerEmail">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => handleInputChange('ownerEmail', '', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="ownerDob">DOB <span className="text-red-500">*</span></Label>
                <Input
                  id="ownerDob"
                  type="date"
                  value={formData.ownerDob}
                  onChange={(e) => handleInputChange('ownerDob', '', e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">MM/DD/YYYY</p>
              </div>
              <div>
                <Label htmlFor="ownerSsn">SSN <span className="text-red-500">*</span></Label>
                <Input
                  id="ownerSsn"
                  value={formData.ownerSsn}
                  onChange={(e) => handleInputChange('ownerSsn', '', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="numberOfOwners"># of Owners <span className="text-red-500">*</span></Label>
                <Input
                  id="numberOfOwners"
                  type="number"
                  value={formData.numberOfOwners}
                  onChange={(e) => handleInputChange('numberOfOwners', '', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="ownershipPercentage">Ownership % <span className="text-red-500">*</span></Label>
                <Input
                  id="ownershipPercentage"
                  type="number"
                  value={formData.ownershipPercentage}
                  onChange={(e) => handleInputChange('ownershipPercentage', '', e.target.value)}
                  required
                />
              </div>
            </div>

            <FileUploadSection
              title="ID Upload"
              category="ownerIds"
              maxFiles={4}
              description="Please Upload an ID for Each Owner"
            />
          </CardContent>
        </Card>

        {/* Banking Details */}
        <Card>
          <CardHeader>
            <CardTitle>Banking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name <span className="text-red-500">*</span></Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', '', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nameOnAccount">Name on Account <span className="text-red-500">*</span></Label>
                <Input
                  id="nameOnAccount"
                  value={formData.nameOnAccount}
                  onChange={(e) => handleInputChange('nameOnAccount', '', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="routingNumber">Routing Number: <span className="text-red-500">*</span></Label>
                <Input
                  id="routingNumber"
                  value={formData.routingNumber}
                  onChange={(e) => handleInputChange('routingNumber', '', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number: <span className="text-red-500">*</span></Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', '', e.target.value)}
                  required
                />
              </div>
            </div>

            <FileUploadSection
              title="Voided Check or Bank Letter"
              category="voidedCheckOrBankLetter"
              maxFiles={1}
              description="Please Upload a Voided Check or Bank Letter"
            />

            <FileUploadSection
              title="Bank Statements"
              category="bankStatements"
              description="Please Upload Most Recent 3 Months of Bank Statements"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            className="gradient-bg px-8 py-3"
            disabled={submitting || uploading}
          >
            {submitting ? 'Submitting...' : uploading ? 'Uploading...' : 'Save & Continue'}
          </Button>
        </div>
      </form>
    </div>
  )
}