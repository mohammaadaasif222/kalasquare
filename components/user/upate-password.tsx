import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-user';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle, X } from 'lucide-react';

interface UpdatePasswordProps {
  userId: string;
}

export default function UpdatePassword({ userId }: UpdatePasswordProps) {
  const { updatePasw, isLoading, error, message } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [validationError, setValidationError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (message) {
      setShowSuccess(true);
      setFormData({
        newPassword: '',
        confirmPassword: ''
      });
      
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setIsOpen(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
    
        newPassword: '',
        confirmPassword: ''
      });
      setValidationError('');
      setShowSuccess(false);
      setShowPasswords({
        current: false,
        new: false,
        confirm: false
      });
    }
  }, [isOpen]);

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters long');
      return false;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      setValidationError('Password must contain at least one lowercase letter');
      return false;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setValidationError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!/(?=.*\d)/.test(password)) {
      setValidationError('Password must contain at least one number');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setValidationError('');



    if (!validatePassword(formData.newPassword)) {
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError('New passwords do not match');
      return;
    }



    await updatePasw(userId, formData.newPassword);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
      >
        <Lock className="w-4 h-4" />
        Update Password
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/10 bg-opacity-10 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Update Password</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition"
              disabled={isLoading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-4">
            {showSuccess && message && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-green-800 text-sm">{message}</p>
              </div>
            )}

            {(error || validationError) && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-800 text-sm">{error || validationError}</p>
              </div>
            )}

            <div className="space-y-4">
        
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showPasswords.new ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Contains at least one number</li>
                  <li>• Different from current password</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
            <button
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
              className="flex-1 py-2.5 px-4 bg-white hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 font-medium border border-gray-300 rounded-lg transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Updating...
                </span>
              ) : (
                'Update Password'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}