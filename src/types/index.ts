export interface User {
  id: string
  email: string
  role: 'admin' | 'partner'
  firstName?: string
  lastName?: string
  phone?: string
  companyName?: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  updatedAt: string
}

export interface ReferralPartner {
  id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  companyName?: string
  commissionRate: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface Lead {
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
  status: 'submitted' | 'contacted' | 'qualified' | 'proposal_sent' | 'closed_won' | 'closed_lost'
  notes?: string
  potentialMonthlyRevenue: number
  estimatedMonthlyRevenue: number
  submittedAt: string
  updatedAt: string
}

export interface Deal {
  id: string
  leadId: string
  userId: string
  partnerId: string
  stage: 'in_progress' | 'closed_won' | 'closed_lost'
  value: number
  monthlyRevenue: number
  commissionAmount: number
  closeDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface RevenueTracking {
  id: string
  dealId: string
  partnerId: string
  userId: string
  monthYear: string
  revenueAmount: number
  commissionAmount: number
  status: 'pending' | 'paid' | 'cancelled'
  createdAt: string
}

export interface DashboardStats {
  totalReferrals: number
  activeProjects: number
  estimatedMonthlyResiduals: number
  potentialNewMonthlyResiduals: number
  closedWon: number
  closedLost: number
  conversionRate: number
}

export interface ReferralApplication {
  id: string
  userId: string
  submittedAt: string
  status: 'submitted' | 'under_review' | 'approved' | 'rejected'
  formData: {
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
    bankName: string
    nameOnAccount: string
    routingNumber: string
    accountNumber: string
  }
  uploadedFiles: {
    articlesOfIncorporation?: string[]
    einUpload?: string[]
    ownerIds?: string[]
    voidedCheckOrBankLetter?: string[]
    bankStatements?: string[]
  }
  submittedBy: string
  createdAt: string
  updatedAt: string
}