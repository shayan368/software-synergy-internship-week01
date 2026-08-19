import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header setMobileMenuOpen={setMobileMenuOpen} />
        <main className="flex-1 overflow-y-auto">
          <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
