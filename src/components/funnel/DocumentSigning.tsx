import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { FileText, CheckCircle, Download, Signature } from 'lucide-react'
import { blink } from '@/blink/client'

interface DocumentSigningProps {
  userEmail: string
  onComplete: () => void
}

export function DocumentSigning({ userEmail, onComplete }: DocumentSigningProps) {
  const [user, setUser] = useState<any>(null)
  const [agreements, setAgreements] = useState({
    referralAgreement: false,
    scheduleA: false
  })
  const [signatures, setSignatures] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const loadUserData = async () => {
    try {
      const users = await blink.db.users.list({
        where: { email: userEmail }
      })
      
      if (users.length > 0) {
        setUser(users[0])
        
        // Load existing signatures
        const sigs = await blink.db.documentSignatures.list({
          where: { userId: users[0].id }
        })
        setSignatures(sigs)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [userEmail]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAgreementChange = (type: 'referralAgreement' | 'scheduleA', checked: boolean) => {
    setAgreements(prev => ({ ...prev, [type]: checked }))
  }

  const handleSignDocuments = async () => {
    if (!user || !agreements.referralAgreement || !agreements.scheduleA) return

    setLoading(true)
    try {
      // Update signature records
      for (const sig of signatures) {
        await blink.db.documentSignatures.update(sig.id, {
          status: 'signed',
          signedAt: new Date().toISOString(),
          signatureData: `Digital signature by ${user.firstName} ${user.lastName} on ${new Date().toLocaleString()}`
        })
      }

      // Update user status to active
      await blink.db.users.update(user.id, {
        status: 'active',
        updatedAt: new Date().toISOString()
      })

      onComplete()
    } catch (error) {
      console.error('Error signing documents:', error)
      alert('There was an error processing your signatures. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const canProceed = agreements.referralAgreement && agreements.scheduleA

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FIc4nFxpkp1eEscNnZWvYLRYS71K2%2FMFALogoArrow__7eb7fa98.png?alt=media&token=c4b310b7-777d-4f3a-8c82-0c75b6936191" 
              alt="MFA Logo" 
              className="h-10 w-auto"
            />
          </div>
        </div>
      </header>

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to the Partner Program!
            </h1>
            <p className="text-xl text-gray-600">
              Complete your onboarding by reviewing and signing the required documents
            </p>
          </div>

          <div className="space-y-8">
            {/* Progress Steps */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      ✓
                    </div>
                    <span className="font-medium">Payment Complete</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <span className="font-medium">Document Signing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-300 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <span className="text-gray-500">Portal Access</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document 1: Referral Agreement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  Referral Partner Agreement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  This agreement outlines the terms and conditions of our referral partnership, 
                  including commission structures, responsibilities, and legal requirements.
                </p>
                
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <a 
                      href="/documents/MFA-Referral-Agreement.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="no-underline"
                    >
                      Download & Review
                    </a>
                  </Button>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                  <Checkbox
                    id="referral-agreement"
                    checked={agreements.referralAgreement}
                    onCheckedChange={(checked) => handleAgreementChange('referralAgreement', checked as boolean)}
                  />
                  <label
                    htmlFor="referral-agreement"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read, understood, and agree to the Referral Partner Agreement
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Document 2: Schedule A */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  Schedule A - Commission Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Schedule A details the specific commission rates, payment terms, and 
                  performance metrics for your referral partnership.
                </p>
                
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <a 
                      href="/documents/MFA-Schedule-A.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="no-underline"
                    >
                      Download & Review
                    </a>
                  </Button>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                  <Checkbox
                    id="schedule-a"
                    checked={agreements.scheduleA}
                    onCheckedChange={(checked) => handleAgreementChange('scheduleA', checked as boolean)}
                  />
                  <label
                    htmlFor="schedule-a"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read, understood, and agree to Schedule A - Commission Structure
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Digital Signature */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Signature className="h-6 w-6 text-green-600" />
                  Digital Signature
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  By clicking "Sign Documents" below, you are providing your digital signature 
                  and agreeing to all terms and conditions outlined in the documents above.
                </p>

                {user && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Signatory:</strong> {user.firstName} {user.lastName}<br />
                      <strong>Email:</strong> {user.email}<br />
                      <strong>Date:</strong> {new Date().toLocaleDateString()}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleSignDocuments}
                  disabled={!canProceed || loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing Signatures...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Signature className="h-5 w-5" />
                      Sign Documents & Complete Onboarding
                    </div>
                  )}
                </Button>

                {!canProceed && (
                  <p className="text-sm text-red-600 text-center">
                    Please review and agree to both documents before proceeding
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}