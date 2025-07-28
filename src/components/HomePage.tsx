import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle, DollarSign, TrendingUp, Users, Star, Shield, Clock, Phone, Mail } from 'lucide-react'

interface HomePageProps {
  onBecomePartner: () => void
  onAgentLogin: () => void
}

export function HomePage({ onBecomePartner, onAgentLogin }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FIc4nFxpkp1eEscNnZWvYLRYS71K2%2FMFALogoArrow2__caeb4938.png?alt=media&token=77f8136b-d804-410c-aeb5-a99e96cba2fa" 
                alt="Merchant Fee Advocate" 
                className="h-12 w-auto"
              />
              <div className="text-xl font-bold text-gray-800">
                Merchant Fee Advocate
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              <Button 
                onClick={onAgentLogin}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Agent Login
              </Button>
              <Button 
                onClick={onBecomePartner}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
              >
                Become a Partner
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Reduce Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Payment Processing
                </span>
                Costs Today
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We help businesses save thousands on credit card processing fees through our 
                expert advocacy services and competitive rate negotiations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg"
                >
                  Get Free Rate Analysis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={onBecomePartner}
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg"
                >
                  Partner Opportunities
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Typical Savings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Small Business</span>
                    <span className="font-bold text-green-300">$500-2K/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Medium Business</span>
                    <span className="font-bold text-green-300">$2K-10K/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Large Enterprise</span>
                    <span className="font-bold text-green-300">$10K+/month</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-blue-400">
                  <p className="text-blue-100 text-sm">
                    * Savings based on current industry rates and our negotiated partnerships
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Payment Processing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions to reduce your payment processing costs and improve your bottom line
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="bg-blue-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rate Analysis & Negotiation</h3>
                <p className="text-gray-600 mb-6">
                  We analyze your current processing rates and negotiate better terms with processors on your behalf.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Free rate audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Competitive rate negotiation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Ongoing monitoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="bg-green-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Merchant Account Setup</h3>
                <p className="text-gray-600 mb-6">
                  Complete merchant account setup with the best processors for your business type and volume.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Fast approval process</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Best-in-class processors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Full integration support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="bg-purple-100 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ongoing Optimization</h3>
                <p className="text-gray-600 mb-6">
                  Continuous monitoring and optimization of your payment processing to ensure best rates.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Monthly rate reviews</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Performance analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Dedicated support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partner Program CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Earn Residual Income as a Referral Partner
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join our partner program and earn ongoing commissions by referring businesses 
            to our payment processing services. Build your financial independence with our proven system.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">30-50%</div>
              <p className="text-blue-200">Recurring Commission</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-blue-200">Active Partners</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$2.5M+</div>
              <p className="text-blue-200">Partner Earnings</p>
            </div>
          </div>
          <Button 
            onClick={onBecomePartner}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Learn About Partner Program
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Merchant Fee Advocate?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                With over a decade of experience in the payment processing industry, we've helped 
                thousands of businesses reduce their processing costs and improve their profitability.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Advocacy</h3>
                    <p className="text-gray-600">Our team of payment processing experts advocates for your business to secure the best possible rates.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Fast Results</h3>
                    <p className="text-gray-600">Most clients see significant savings within 30 days of working with us.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Proven Track Record</h3>
                    <p className="text-gray-600">Over $50M in processing fee savings for our clients and growing.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free Rate Analysis</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your business name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Processing Volume</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select volume range</option>
                    <option>$0 - $10K</option>
                    <option>$10K - $50K</option>
                    <option>$50K - $100K</option>
                    <option>$100K - $500K</option>
                    <option>$500K+</option>
                  </select>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 py-3">
                  Get Free Analysis
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Reduce Your Processing Costs?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contact us today for a free consultation and rate analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak with our payment processing experts</p>
                <p className="text-lg font-semibold text-blue-600">(555) 123-4567</p>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri 9AM-6PM EST</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
                <p className="text-gray-600 mb-4">Get detailed information via email</p>
                <p className="text-lg font-semibold text-green-600">info@merchantfeeadvocate.com</p>
                <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Partner Program</h3>
                <p className="text-gray-600 mb-4">Learn about earning opportunities</p>
                <Button 
                  onClick={onBecomePartner}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FIc4nFxpkp1eEscNnZWvYLRYS71K2%2FMFALogoArrow2__caeb4938.png?alt=media&token=77f8136b-d804-410c-aeb5-a99e96cba2fa" 
                  alt="Merchant Fee Advocate" 
                  className="h-10 w-auto"
                />
                <div className="text-lg font-bold text-white">
                  Merchant Fee Advocate
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering businesses and partners through innovative payment processing solutions 
                and residual income opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Rate Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Merchant Accounts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Optimization</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Partners</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" onClick={onBecomePartner} className="hover:text-white transition-colors">Partner Program</a></li>
                <li><a href="#" onClick={onAgentLogin} className="hover:text-white transition-colors">Agent Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Merchant Fee Advocate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}