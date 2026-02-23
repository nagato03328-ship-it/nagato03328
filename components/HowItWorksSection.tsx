
import React from 'react';
import DarkCard from './DarkCard';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-slate-50 dark:bg-[#080D1D] py-16 lg:py-24 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide animate-fade-in-up">How It Works</h2>
        <p className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white max-w-4xl mx-auto mb-16 animate-fade-in-up delay-100">
          From idea to validated product in four simple steps. No coding required, just real market feedback.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <DarkCard
            numberedStep={1}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            title="Post Your Idea"
            description="Share your product concept with a structured form—problem, solution, target audience, and pricing."
            className="animate-fade-in-up"
          />
          <DarkCard
            numberedStep={2}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.808a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101m-1.721 2.868a4 4 0 00-5.656 0L4 17m3.414-2.586L11.414 10" /></svg>}
            title="Launch Validation"
            description="Generate shareable links and QR codes. Reach your target audience through social media and communities."
            className="animate-fade-in-up delay-100"
          />
          <DarkCard
            numberedStep={3}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}
            title="Get Real Signals"
            description="Collect purchase intent votes, price perception data, and actionable feedback from potential customers."
            className="animate-fade-in-up delay-200"
          />
          <DarkCard
            numberedStep={4}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.794 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.794 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.206 18 16.5 18s-3.332.477-4.5 1.253" /></svg>}
            title="Connect & Launch"
            description="With validated demand, connect with supporters, investors, and mentors ready to help you succeed."
            className="animate-fade-in-up delay-300"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
