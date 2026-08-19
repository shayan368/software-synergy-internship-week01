import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '../../lib/api';

export default function Settings() {
  const { user, fetchUser } = useAuth();
  const [loading2FA, setLoading2FA] = useState(false);
  
  // Password change state
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const toggle2FA = async () => {
    setLoading2FA(true);
    try {
      const res = await api.post('/auth/2fa/enable');
      await fetchUser();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update 2FA status');
    } finally {
      setLoading2FA(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error('New passwords do not match');
    }
    
    setLoadingPassword(true);
    try {
      const res = await api.post('/auth/change-password', {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });
      toast.success(res.data.message);
      setIsEditingPassword(false);
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Security</h2>
        <p className="text-gray-500 mt-1 text-sm">Protect access to your account</p>
      </div>

      <Card className="shadow-sm border-gray-100 overflow-hidden">
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {/* 2FA Section */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:bg-gray-50 transition-colors">
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900 text-base">Two-factor authentication</h3>
                <p className="text-sm text-gray-500">Require a second step when signing in.</p>
              </div>
              <Button 
                onClick={toggle2FA} 
                disabled={loading2FA}
                variant={user?.isTwoFactorEnabled ? "outline" : "default"}
                className={`min-w-[100px] ${!user?.isTwoFactorEnabled ? "bg-orange-500 hover:bg-orange-600" : "text-gray-700"}`}
              >
                {loading2FA ? "Updating..." : (user?.isTwoFactorEnabled ? "Disable" : "Enable")}
              </Button>
            </div>

            {/* Password Section */}
            <div className={`p-6 sm:p-8 flex flex-col gap-4 bg-white transition-colors ${!isEditingPassword ? 'hover:bg-gray-50' : ''}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900 text-base">Password</h3>
                  <p className="text-sm text-gray-500">Update your password to keep your account secure.</p>
                </div>
                {!isEditingPassword && (
                  <Button onClick={() => setIsEditingPassword(true)} variant="outline" className="text-gray-700 min-w-[100px]">
                    Change Password
                  </Button>
                )}
              </div>
              
              {isEditingPassword && (
                <form onSubmit={handlePasswordChange} className="mt-2 space-y-4 max-w-md border-t border-gray-100 pt-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Old Password</Label>
                    <Input 
                      type="password" 
                      required 
                      value={passwordForm.oldPassword}
                      onChange={e => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">New Password</Label>
                    <Input 
                      type="password" 
                      required 
                      value={passwordForm.newPassword}
                      onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      placeholder="Create a new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Confirm New Password</Label>
                    <Input 
                      type="password" 
                      required 
                      value={passwordForm.confirmPassword}
                      onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      placeholder="Confirm your new password"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={loadingPassword}>
                      {loadingPassword ? 'Saving...' : 'Save Password'}
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => {
                      setIsEditingPassword(false);
                      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
                    }} disabled={loadingPassword}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
