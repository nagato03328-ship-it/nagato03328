
import React, { useState } from 'react';
import Button from './Button';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onPostIdea: () => void;
  onGuest: () => void;
  onAdmin: () => void;
  onForInvestors: () => void;
  onSignIn: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme, onPostIdea, onGuest, onAdmin, onForInvestors, onSignIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#080D1D]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex items-center text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          IdeaConnect
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">How It Works</a>
          <a 
            href="#investors" 
            onClick={(e) => { e.preventDefault(); onForInvestors(); }}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            For Investors
          </a>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onGuest}
              className="text-sm font-semibold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white transition-colors px-3 py-1.5"
            >
              Guest
            </button>
            <button 
              onClick={onAdmin}
              className="text-sm font-semibold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white transition-colors px-3 py-1.5"
            >
              Admin
            </button>
            <Button variant={isDark ? "darkOutline" : "outline"} size="sm" onClick={onSignIn}>Sign In</Button>
            <Button variant={isDark ? "darkPrimary" : "primary"} size="sm" className="flex items-center" onClick={onPostIdea}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Post Your Idea
            </Button>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors focus:outline-none"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-300 focus:outline-none"
            >
                {isDark ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600 dark:text-gray-300 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#080D1D] mt-4 p-4 space-y-4 border-t border-gray-100 dark:border-gray-700">
          <a href="#how-it-works" className="block text-gray-600 dark:text-gray-300" onClick={() => setIsOpen(false)}>How It Works</a>
          <a 
            href="#investors" 
            className="block text-gray-600 dark:text-gray-300" 
            onClick={(e) => { e.preventDefault(); setIsOpen(false); onForInvestors(); }}
          >
            For Investors
          </a>
          <Button variant={isDark ? "darkOutline" : "outline"} className="w-full" onClick={() => { setIsOpen(false); onSignIn(); }}>Sign In</Button>
          <button 
              onClick={() => { setIsOpen(false); onGuest(); }}
              className="w-full py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              Guest
            </button>
          <button 
              onClick={() => { setIsOpen(false); onAdmin(); }}
              className="w-full py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              Admin
            </button>
          <Button variant={isDark ? "darkPrimary" : "primary"} className="w-full flex items-center justify-center" onClick={() => { setIsOpen(false); onPostIdea(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Post Your Idea
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
