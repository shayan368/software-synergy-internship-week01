import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Eye, EyeOff } from 'lucide-react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { Input } from '../../components/ui/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      
      if (res.data.requires2FA) {
        setRequires2FA(true);
        toast.success(res.data.message);
      } else {
        login(res.data.token);
        toast.success('Logged in successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login/2fa', { email, otp });
      login(res.data.token);
      toast.success('Verified and logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[2rem] font-medium tracking-tight text-gray-800 mb-2">
        {requires2FA ? 'Two-Step Verification' : 'Sign in to your account'}
      </h2>
      <p className="text-gray-400 text-sm mb-8">
        {requires2FA ? 'Enter the OTP sent to your email.' : 'Enter your credentials to continue.'}
      </p>

      {!requires2FA ? (
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-600 font-normal text-sm">Email address</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                type="email"
                required
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ali@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-600 font-normal text-sm">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded accent-orange-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-orange-500 hover:text-orange-400">
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6 py-2.5 text-md rounded-lg" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerify2FA} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-gray-600 font-normal text-sm">6-Digit Code</Label>
            <Input
              id="otp"
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              maxLength={6}
            />
          </div>
          <Button type="submit" className="w-full mt-6 py-2.5 text-md rounded-lg" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Code'}
          </Button>
          <button
            type="button"
            onClick={() => setRequires2FA(false)}
            className="w-full text-sm text-gray-500 hover:text-gray-700 mt-4"
          >
            Back to login
          </button>
        </form>
      )}

      {!requires2FA && (
        <>
          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-orange-500 hover:text-orange-400">
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
