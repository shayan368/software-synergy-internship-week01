import { Outlet } from "react-router-dom";
import { Layers, CheckCircle2 } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex font-sans">
      <div className="hidden lg:flex lg:w-[45%] bg-[#333333] flex-col p-12 text-white justify-between">
        <div>
          <div className="flex items-center gap-3 mb-24">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-bold tracking-[0.1em]">SOFTWARE SYNERGY</span>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-semibold leading-tight mb-4">
              Welcome to the Software Synergy Portal.
            </h1>
            <p className="text-gray-400 mb-10 text-lg">
              Experience seamless management, advanced analytics, and powerful administrative tools built for modern teams.
            </p>
            
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-sm">Secure, session-persistent authentication</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-sm">Admin dashboard with live insights</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-sm">Full profile and notification control</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-gray-500 text-xs">
          © 2026 Software Synergy. All rights reserved.
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-[#f4f4f5]">
        <div className="mx-auto w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
