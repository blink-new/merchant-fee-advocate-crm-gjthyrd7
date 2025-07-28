import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, Lock, CreditCard, Shield } from 'lucide-react'
import { blink } from '@/blink/client'

interface CheckoutPageProps {
  onPurchaseComplete: (userEmail: string) => void
  onBack: () => void
}

export function CheckoutPage({ onPurchaseComplete, onBack }: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const packageFeatures = [
    "Complete Partner Training Program",
    "Marketing Materials & Scripts",
    "Lead Generation System",
    "CRM Access & Deal Tracking",
    "30-50% Recurring Commissions",
    "Dedicated Support Team",
    "Monthly Partner Webinars",
    "Lifetime Access to Updates"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePurchase = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      // Create user record
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      await blink.db.users.create({
        id: userId,
        email: formData.email,
        role: 'partner',
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        companyName: formData.companyName || null,
        status: 'pending',
        commissionRate: 0.35 // Default 35% commission
      })

      // Create purchase record
      await blink.db.purchases.create({
        id: `purchase_${Date.now()}`,
        userId: userId,
        email: formData.email,
        amount: 497.00,
        status: 'completed' // In real implementation, this would be 'pending' until Stripe confirms
      })

      // Create document signature records
      await blink.db.documentSignatures.create({
        id: `sig_${Date.now()}_agreement`,
        userId: userId,
        documentType: 'referral_agreement',
        status: 'pending'
      })

      await blink.db.documentSignatures.create({
        id: `sig_${Date.now()}_schedule`,
        userId: userId,
        documentType: 'schedule_a',
        status: 'pending'
      })

      onPurchaseComplete(formData.email)
    } catch (error) {
      console.error('Purchase error:', error)
      alert('There was an error processing your purchase. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FIc4nFxpkp1eEscNnZWvYLRYS71K2%2FMFALogoArrow__7eb7fa98.png?alt=media&token=c4b310b7-777d-4f3a-8c82-0c75b6936191" 
              alt="MFA Logo" 
              className="h-10 w-auto"
            />
          </div>
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        </div>
      </header>

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Join The 5 Referral Challenge
            </h1>
            <p className="text-xl text-gray-600">
              Complete your enrollment and start building your residual income today
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-green-600" />
                    Partner Program Package
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span>Partner Program Access</span>
                      <span className="font-semibold">$497</span>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">What's Included:</h4>
                      <div className="space-y-2">
                        {packageFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total</span>
                        <span className="text-green-600">$497</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        One-time payment • Lifetime access • 30-day money-back guarantee
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Lock className="h-4 w-4" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>Money-Back Guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    Complete Your Enrollment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="companyName">Company Name (Optional)</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                  </div>

                  <div className="border-t pt-6">
                    <Button
                      onClick={handlePurchase}
                      disabled={loading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Processing...
                        </div>
                      ) : (
                        'Complete Enrollment - $497'
                      )}
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center mt-4">
                      By completing your enrollment, you agree to our Terms of Service and Privacy Policy.
                      You will receive access to the partner portal and training materials immediately after purchase.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}