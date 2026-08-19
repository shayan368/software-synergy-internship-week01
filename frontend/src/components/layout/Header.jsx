import { Menu, Search, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';

export default function Header({ setMobileMenuOpen }) {
  const { user } = useAuth();

  return (
    <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 md:hidden"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800 hidden md:block">Dashboard</h1>
        
        <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">

          <div className="relative hidden sm:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <Input
              type="text"
              className="pl-10 border-transparent bg-gray-50 focus:border-[#f4d4b4] focus:bg-white"
              placeholder="Search..."
            />
          </div>

          <button type="button" className="-m-2.5 p-2.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          <div className="flex items-center gap-x-3">
            <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() || 'SA'}
            </div>
            <span className="hidden lg:flex lg:items-center">
              <span className="text-sm font-medium leading-6 text-gray-700" aria-hidden="true">
                {user?.name || 'Shayan Ahmad'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
