import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, User, Eye, EyeOff } from 'lucide-react';
import api from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { Input } from '../../components/ui/Input';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password });
      toast.success(res.data.message || 'Registration successful. Check email.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[2rem] font-medium tracking-tight text-gray-800 mb-2">
        Create an account
      </h2>
      <p className="text-gray-400 text-sm mb-8">
        Enter your details to get started.
      </p>

      <form onSubmit={handleRegister} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-600 font-normal text-sm">Full Name</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="name"
              type="text"
              required
              className="pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Muhammad Ali"
            />
          </div>
        </div>

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
              placeholder="Create a password"
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

        <Button type="submit" className="w-full mt-6 py-2.5 text-md rounded-lg" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-orange-500 hover:text-orange-400">
          Sign in
        </Link>
      </div>
    </div>
  );
}
