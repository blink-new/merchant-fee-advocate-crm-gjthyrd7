import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleLegalClick = (page: string) => {
    onNavigate(page);
  };

  return (
    <footer className="bg-slate-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FIc4nFxpkp1eEscNnZWvYLRYS71K2%2FMFALogoArrow2__caeb4938.png?alt=media&token=77f8136b-d804-410c-aeb5-a99e96cba2fa" 
                alt="MFA Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-semibold">Merchant Fee Advocate</span>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              Empowering referral partners to build residual income through our comprehensive 
              CRM platform for payment processing services.
            </p>
            <div className="text-slate-400 text-sm">
              <p>© {currentYear} Merchant Fee Advocate. All rights reserved.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('leads')}
                  className="hover:text-white transition-colors"
                >
                  Lead Management
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pipeline')}
                  className="hover:text-white transition-colors"
                >
                  Deal Pipeline
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('revenue')}
                  className="hover:text-white transition-colors"
                >
                  Revenue Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a 
                  href="https://merchantfeeadvocate.com/blog" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="https://merchantfeeadvocate.com/resources" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Training Materials
                </a>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('training')}
                  className="hover:text-white transition-colors"
                >
                  Partner Training
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('forum')}
                  className="hover:text-white transition-colors"
                >
                  Community Forum
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Privacy</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button 
                  onClick={() => handleLegalClick('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLegalClick('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLegalClick('cookies')}
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLegalClick('dmca')}
                  className="hover:text-white transition-colors"
                >
                  DMCA Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLegalClick('acceptable-use')}
                  className="hover:text-white transition-colors"
                >
                  Acceptable Use Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLegalClick('data-processing')}
                  className="hover:text-white transition-colors"
                >
                  Data Processing Agreement
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              <p>Built for referral partners, by payment processing experts.</p>
            </div>
            <div className="flex space-x-6 text-slate-400 text-sm">
              <button 
                onClick={() => handleLegalClick('terms')}
                className="hover:text-white transition-colors"
              >
                Terms
              </button>
              <button 
                onClick={() => handleLegalClick('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy
              </button>
              <button 
                onClick={() => handleLegalClick('cookies')}
                className="hover:text-white transition-colors"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};