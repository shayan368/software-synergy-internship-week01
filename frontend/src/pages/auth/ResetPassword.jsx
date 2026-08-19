import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { newPassword });
      toast.success('Password has been reset successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Create new password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Back to login
        </Link>
      </div>
    </div>
  );
}
