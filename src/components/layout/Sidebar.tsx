import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Settings,
  MessageSquare,
  X,
  GraduationCap
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isOpen: boolean
  onClose: () => void
  user?: any
}

const partnerNavigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', name: 'Referral Management', icon: FileText },
  { id: 'pipeline', name: 'Deal Pipeline', icon: TrendingUp },
  { id: 'revenue', name: 'Revenue Tracking', icon: DollarSign },
  { id: 'training', name: 'Training Center', icon: GraduationCap },
  { id: 'forum', name: 'Community Forum', icon: MessageSquare },
  { id: 'profile', name: 'Profile', icon: Users },
  { id: 'settings', name: 'Settings', icon: Settings },
]

const adminNavigation = [
  { id: 'dashboard', name: 'Admin Dashboard', icon: LayoutDashboard },
  { id: 'partners', name: 'Manage Partners', icon: Users },
  { id: 'revenue', name: 'Revenue Overview', icon: DollarSign },
  { id: 'forum', name: 'Community Forum', icon: MessageSquare },
  { id: 'settings', name: 'System Settings', icon: Settings },
]

export function Sidebar({ activeTab, onTabChange, isOpen, onClose, user }: SidebarProps) {
  const isAdmin = user?.email === 'admin@merchantfeeadvocate.com'
  const navigation = isAdmin ? adminNavigation : partnerNavigation
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <span className="text-lg font-semibold">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  activeTab === item.id && "gradient-bg text-white"
                )}
                onClick={() => {
                  onTabChange(item.id)
                  onClose()
                }}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Button>
            )
          })}
        </nav>
      </div>
    </>
  )
}