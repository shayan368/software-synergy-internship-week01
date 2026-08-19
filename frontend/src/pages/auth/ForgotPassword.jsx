import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">
        Reset your password
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Enter your email address and we will send you a link to reset your password.
      </p>

      {success ? (
        <div className="p-4 bg-green-50 text-green-700 rounded-md text-sm text-center">
          If an account exists with {email}, a password reset link has been sent.
          Please check your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>
      )}

      <div className="mt-6 text-center text-sm text-gray-600">
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Back to login
        </Link>
      </div>
    </div>
  );
}
