import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { User, Mail, ShieldCheck, BadgeCheck, ShieldAlert } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  
  const initials = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() 
    : 'U';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Profile Settings</h2>
        <p className="text-gray-500 mt-1 text-sm">Manage your account details and security preferences.</p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-28 bg-orange-50 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-12 -right-12 h-40 w-40 bg-orange-100 rounded-full opacity-50 blur-2xl"></div>
          <div className="absolute top-10 left-10 h-32 w-32 bg-orange-200 rounded-full opacity-40 blur-xl"></div>
        </div>
        <div className="px-6 sm:px-8 pb-8 flex flex-col sm:flex-row sm:items-end gap-6 -mt-12 relative z-10">
          <div className="h-24 w-24 rounded-full border-4 border-white bg-orange-500 text-white flex items-center justify-center text-3xl font-bold shadow-md shrink-0">
            {initials}
          </div>
          <div className="flex-1 pb-1">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-900">{user?.name || 'Your Name'}</h3>
              {user?.isVerified && (
                <BadgeCheck className="h-6 w-6 text-orange-500" title="Verified Account" />
              )}
            </div>
            <p className="text-gray-500 text-sm mt-1">{user?.email || 'email@example.com'}</p>
          </div>
          <div className="pb-1">
            <Button variant="outline" className="text-gray-700 font-medium">Edit Profile</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-gray-400" />
              Personal Information
            </CardTitle>
            <CardDescription>Your personal details and contact info.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-1.5">Full Name</label>
              <p className="text-sm text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                {user?.name || 'N/A'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-1.5">Email Address</label>
              <div className="flex items-center gap-2.5 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                <Mail className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-900 font-medium">{user?.email || 'N/A'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-1.5">Account Status</label>
              <div className="flex items-center gap-2">
                {user?.isVerified ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Verified Account
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
                    Pending Verification
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 font-semibold flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gray-400" />
              Security
            </CardTitle>
            <CardDescription>Manage your security preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    2-Step Verification
                    {user?.isTwoFactorEnabled ? (
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                    ) : (
                        <ShieldAlert className="h-4 w-4 text-gray-400" />
                    )}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed pr-4">
                    Add an extra layer of security to your account. We'll ask for a code sent to your email during sign-in.
                  </p>
                </div>
              </div>
              
              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <span className="text-sm font-medium text-gray-900">
                  Status: <span className={user?.isTwoFactorEnabled ? "text-green-600" : "text-gray-500"}>{user?.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                </span>
                <Button variant={user?.isTwoFactorEnabled ? "outline" : "default"} className={!user?.isTwoFactorEnabled ? "bg-orange-500 hover:bg-orange-600" : ""}>
                  {user?.isTwoFactorEnabled ? 'Manage 2FA' : 'Enable 2FA'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
