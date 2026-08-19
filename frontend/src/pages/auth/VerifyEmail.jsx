import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('Verifying your email...');
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify/${token}`);
        setStatus('success');
        setMessage(res.data.message || 'Email verified successfully!');
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Invalid or expired verification link.');
      }
    };
    verify();
  }, [token]);

  return (
    <div className="text-center w-full">
      {status === 'loading' && (
        <div className="py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <h2 className="text-[2rem] font-medium tracking-tight text-gray-800 mt-6 mb-2">Verifying Email</h2>
          <p className="text-gray-500">{message}</p>
        </div>
      )}

      {status === 'success' && (
        <div className="py-8 space-y-6">
          <div className="mx-auto bg-green-50 w-20 h-20 flex items-center justify-center rounded-full">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <div>
            <h2 className="text-[2rem] font-medium tracking-tight text-gray-800 mb-2">Verified!</h2>
            <p className="text-gray-500">{message}</p>
          </div>
          <Link to="/login" className="block mt-8">
            <Button className="w-full py-2.5 text-md rounded-lg">Continue to Login</Button>
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="py-8 space-y-6">
          <div className="mx-auto bg-red-50 w-20 h-20 flex items-center justify-center rounded-full">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>
          <div>
            <h2 className="text-[2rem] font-medium tracking-tight text-gray-800 mb-2">Verification Failed</h2>
            <p className="text-gray-500">{message}</p>
          </div>
          <Link to="/register" className="block mt-8">
            <Button className="w-full py-2.5 text-md rounded-lg">Back to Register</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
