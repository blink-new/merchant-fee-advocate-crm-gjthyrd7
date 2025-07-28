import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Bell, Menu, User, LogOut } from 'lucide-react'
import { blink } from '@/blink/client'

interface HeaderProps {
  user: any
  onMenuClick: () => void
  onNavigate?: (tab: string) => void
}

export function Header({ user, onMenuClick, onNavigate }: HeaderProps) {
  const [notifications] = useState(3) // Mock notification count

  const handleLogout = () => {
    // Check if it's an admin session
    const isAdminSession = localStorage.getItem('isAdminSession')
    if (isAdminSession) {
      // Clear admin session
      localStorage.removeItem('currentUser')
      localStorage.removeItem('isAdminSession')
      window.location.reload()
    } else {
      // Regular user logout through Blink
      blink.auth.logout()
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FIc4nFxpkp1eEscNnZWvYLRYS71K2%2FMFALogoArrow2__caeb4938.png?alt=media&token=77f8136b-d804-410c-aeb5-a99e96cba2fa" 
            alt="MFA Logo" 
            className="h-8 w-auto"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-gray-900">Merchant Fee Advocate</h1>
            <p className="text-sm text-gray-500">Partner Portal</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-white">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm font-medium">
                {user?.email || 'User'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => onNavigate?.('profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}