
import React, { useState } from 'react';

interface RegistrationProps {
  onClose: () => void;
  onRegister: (name: string) => void;
  onGuest?: () => void;
  isDark: boolean;
}

const Registration: React.FC<RegistrationProps> = ({ onClose, onRegister, onGuest, isDark }) => {
  const [role, setRole] = useState<'creator' | 'investor'>('creator');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleTabChange = (newRole: 'creator' | 'investor') => {
    setRole(newRole);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful registration
    onRegister(formData.name || 'shravanmanikandan2');
  };

  const inputStyles = "w-full bg-[#1e293b] border-none text-gray-300 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#00BA9D] transition-all outline-none";
  const labelStyles = "block text-gray-400 text-sm font-medium mb-1";

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl relative p-8 animate-fade-in-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-1/2 translate-x-1/2 md:right-8 md:translate-x-0 text-[#00BA9D] hover:scale-110 transition-transform"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Join IdeaConnect</h2>

          {/* Role Switcher */}
          <div className="flex bg-[#0f172a] p-1.5 rounded-full mb-8 relative">
            <button 
              onClick={() => handleTabChange('creator')}
              className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 z-10 ${role === 'creator' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Creator
            </button>
            <button 
              onClick={() => handleTabChange('investor')}
              className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 z-10 ${role === 'investor' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Investor
            </button>
            {/* Sliding Background */}
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#334155] rounded-full transition-all duration-300 ease-out ${role === 'creator' ? 'left-1.5' : 'left-[calc(50%+1.5px)]'}`}
            />
          </div>

          {/* Form */}
          <form className="space-y-6 text-left" onSubmit={handleSubmit}>
            {/* Dynamic Name Field */}
            <div>
              <label className={labelStyles}>{role === 'creator' ? 'Full Name' : 'Company Name'}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  {role === 'creator' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                </div>
                <input 
                  type="text" 
                  className={inputStyles} 
                  placeholder={role === 'creator' ? 'John Doe' : 'Acme Inc'}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className={labelStyles}>Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input 
                  type="email" 
                  className={inputStyles} 
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className={labelStyles}>Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  className={inputStyles} 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-[#00BA9D] hover:bg-[#00a88d] text-white font-bold py-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 mt-4">
              Create Account
            </button>

            {/* Footer Links */}
            <div className="text-center mt-8 space-y-4">
              <a href="#" className="block text-[#00BA9D] text-sm hover:underline">
                Already have an account? Sign in
              </a>
              {onGuest && (
                <button 
                  onClick={(e) => { e.preventDefault(); onGuest(); }}
                  className="text-gray-500 text-xs hover:text-[#00BA9D] transition-colors"
                >
                  Or continue as guest
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
