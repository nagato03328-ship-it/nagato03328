
import React, { useState } from 'react';
import Navbar from './components/Navbar';

console.log("APP COMPONENT LOADING...");
import HeroSection from './components/HeroSection';
import StatsGrid from './components/StatsGrid';
import HowItWorksSection from './components/HowItWorksSection';
import PowerfulFeaturesSection from './components/PowerfulFeaturesSection';
import ValidationFlowSection from './components/ValidationFlowSection';
import AnalyticsDashboardSection from './components/AnalyticsDashboardSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import PrivacyPolicy from './components/PrivacyPolicy';
import SuccessStories from './components/SuccessStories';
import Contact from './components/Contact';
import Careers from './components/Careers';
import TermsOfService from './components/TermsOfService';
import ForInvestors from './components/ForInvestors';
import SignIn from './components/SignIn';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  const [view, setView] = useState<'landing' | 'register' | 'signin' | 'dashboard' | 'privacy' | 'success-stories' | 'contact' | 'careers' | 'terms' | 'for-investors'>('landing');
  const [user, setUser] = useState<{ name: string; email?: string } | null>(null);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navigateToRegister = () => {
    setView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPrivacy = () => {
    setView('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSuccessStories = () => {
    setView('success-stories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContact = () => {
    setView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCareers = () => {
    setView('careers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTerms = () => {
    setView('terms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToForInvestors = () => {
    setView('for-investors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSignIn = () => {
    setView('signin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegister = (name: string) => {
    setUser({ name });
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignInSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGuestAccess = () => {
    setUser({ name: 'Guest' });
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminAccess = () => {
    setUser({ name: 'Admin' });
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'dashboard') {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#020617] text-gray-50' : 'bg-slate-50 text-gray-900'}`}>
        {user?.name === 'Admin' ? (
          <AdminDashboard 
            isDark={isDark} 
            toggleTheme={toggleTheme} 
            onLogout={() => { setUser(null); setView('landing'); }} 
          />
        ) : (
          <Dashboard 
            userName={user?.name || 'User'} 
            isDark={isDark} 
            toggleTheme={toggleTheme} 
            onLogout={() => { setUser(null); setView('landing'); }} 
          />
        )}
        <Footer 
          onPrivacyPolicy={navigateToPrivacy} 
          onSuccessStories={navigateToSuccessStories} 
          onContact={navigateToContact}
          onCareers={navigateToCareers}
          onTerms={navigateToTerms}
        />
      </div>
    );
  }

  if (view === 'privacy') {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080D1D] text-gray-50' : 'bg-slate-50 text-gray-900'}`}>
        <PrivacyPolicy onBack={navigateToLanding} isDark={isDark} />
        <Footer 
          onPrivacyPolicy={navigateToPrivacy} 
          onSuccessStories={navigateToSuccessStories} 
          onContact={navigateToContact}
          onCareers={navigateToCareers}
          onTerms={navigateToTerms}
        />
      </div>
    );
  }

  if (view === 'success-stories') {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080D1D] text-gray-50' : 'bg-slate-50 text-gray-900'}`}>
        <SuccessStories onBack={navigateToLanding} isDark={isDark} />
        <Footer 
          onPrivacyPolicy={navigateToPrivacy} 
          onSuccessStories={navigateToSuccessStories} 
          onContact={navigateToContact}
          onCareers={navigateToCareers}
          onTerms={navigateToTerms}
        />
      </div>
    );
  }

  if (view === 'contact') {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080D1D] text-gray-50' : 'bg-slate-50 text-gray-900'}`}>
        <Contact onBack={navigateToLanding} isDark={isDark} />
        <Footer 
          onPrivacyPolicy={navigateToPrivacy} 
          onSuccessStories={navigateToSuccessStories} 
          onContact={navigateToContact}
          onCareers={navigateToCareers}
          onTerms={navigateToTerms}
        />
      </div>
    );
  }

  if (view === 'careers') {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080D1D] text-gray-50' : 'bg-slate-50 text-gray-900'}`}>
        <Careers onBack={navigateToLanding} isDark={isDark} />
        <Footer 
          onPrivacyPolicy={navigateToPrivacy} 
          onSuccessStories={navigateToSuccessStories} 
          onContact={navigateToContact}
          onCareers={navigateToCareers}
          onTerms={navigateToTerms}
        />
      </div>
    );
  }

  if (view === 'terms') {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080D1D] text-gray-50' : 'bg-slate-50 text-gray-900'}`}>
        <TermsOfService onBack={navigateToLanding} isDark={isDark} />
        <Footer 
          onPrivacyPolicy={navigateToPrivacy} 
          onSuccessStories={navigateToSuccessStories} 
          onContact={navigateToContact}
          onCareers={navigateToCareers}
          onTerms={navigateToTerms}
        />
      </div>
    );
  }

  if (view === 'for-investors') {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080D1D] text-gray-50' : 'bg-slate-50 text-gray-900'}`}>
        <Navbar 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          onPostIdea={navigateToRegister} 
          onGuest={handleGuestAccess}
          onAdmin={handleAdminAccess}
          onForInvestors={navigateToForInvestors}
          onSignIn={navigateToSignIn}
        />
        <ForInvestors onBack={navigateToLanding} isDark={isDark} />
        <Footer 
          onPrivacyPolicy={navigateToPrivacy} 
          onSuccessStories={navigateToSuccessStories} 
          onContact={navigateToContact}
          onCareers={navigateToCareers}
          onTerms={navigateToTerms}
        />
      </div>
    );
  }

  if (view === 'signin') {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080D1D] text-gray-50' : 'bg-slate-50 text-gray-900'}`}>
        <Navbar 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          onPostIdea={navigateToRegister} 
          onGuest={handleGuestAccess}
          onAdmin={handleAdminAccess}
          onForInvestors={navigateToForInvestors}
          onSignIn={navigateToSignIn}
        />
        <SignIn 
          onBack={navigateToRegister} 
          onSuccess={handleSignInSuccess}
          isDark={isDark} 
        />
        <Footer 
          onPrivacyPolicy={navigateToPrivacy} 
          onSuccessStories={navigateToSuccessStories} 
          onContact={navigateToContact}
          onCareers={navigateToCareers}
          onTerms={navigateToTerms}
        />
      </div>
    );
  }

  if (view === 'register') {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080D1D] text-gray-50' : 'bg-slate-50 text-gray-900'}`}>
        <Registration 
          onClose={navigateToLanding} 
          onRegister={handleRegister}
          onGuest={handleGuestAccess}
          isDark={isDark} 
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080D1D] text-gray-50' : 'bg-slate-50 text-gray-900'}`}>
      <Navbar 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        onPostIdea={navigateToRegister} 
        onGuest={handleGuestAccess}
        onAdmin={handleAdminAccess}
        onForInvestors={navigateToForInvestors}
        onSignIn={navigateToSignIn}
      />
      <main className="flex-grow">
        <HeroSection 
          onGetStarted={navigateToRegister} 
          onGuest={handleGuestAccess}
        />
        <StatsGrid />
        <HowItWorksSection />
        <PowerfulFeaturesSection />
        <ValidationFlowSection />
        <AnalyticsDashboardSection />
        <CallToActionSection onGetStarted={navigateToRegister} />
      </main>
      <Footer 
        onPrivacyPolicy={navigateToPrivacy} 
        onSuccessStories={navigateToSuccessStories} 
        onContact={navigateToContact}
        onCareers={navigateToCareers}
        onTerms={navigateToTerms}
      />
    </div>
  );
};

export default App;
