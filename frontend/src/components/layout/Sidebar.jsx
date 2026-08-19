import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, Bell, Settings, LogOut, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile view */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900 bg-opacity-80 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-[#2d2d2d] border-r border-[#2d2d2d] transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:flex md:w-64 md:flex-col",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center px-6 mb-4 mt-2">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-bold tracking-[0.1em] text-white">SYNERGY</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto pt-2 pb-4">
          <nav className="mt-2 flex-1 space-y-2 px-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-400 hover:bg-[#3d3d3d] hover:text-white',
                    'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors'
                  )
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={cn(
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-white',
                        'mr-3 flex-shrink-0 h-5 w-5'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="p-4 mt-auto">
          <div className="bg-[#3d3d3d] rounded-xl p-3 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="group flex w-full items-center justify-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-[#4d4d4d] hover:text-white transition-colors border border-gray-500"
            >
              <LogOut className="mr-2 flex-shrink-0 h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
