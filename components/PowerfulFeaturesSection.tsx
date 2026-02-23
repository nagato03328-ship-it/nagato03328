
import React from 'react';
import DarkCard from './DarkCard';

const PowerfulFeaturesSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-[#121B35] py-16 lg:py-24 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <span className="inline-flex items-center px-3 py-1 mb-6 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 uppercase tracking-wide animate-fade-in-up">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Powerful Features
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white max-w-4xl mx-auto mb-16 animate-fade-in-up delay-100">
          Everything You Need to <span className="text-indigo-600 dark:text-indigo-400">Validate & Launch</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <DarkCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.276a11.952 11.952 0 01-1.293 2.917V7l2-2h4V3H2v2l2 2v3.626c-1.895.842-3 2.583-3 4.474C1 17.561 4.582 21 9 21s8-3.439 8-7.5c0-1.891-1.105-3.632-3-4.474V13c0 2.206-1.794 4-4 4s-4-1.794-4-4V7h2V5H4v2h2v.374a4.002 4.002 0 014.002-.374C12.206 7 14 8.794 14 11v6H6v-6H4V18H2V4h10z" /></svg>}
            title="Purchase Intent Voting"
            description="Get clear Yes/Maybe/No votes that indicate real buying intent, not just likes."
            className="animate-fade-in-up"
          />
          <DarkCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}
            title="Visual Analytics Dashboard"
            description="See validation scores, price perception, audience segments, and feedback trends at a glance."
            className="animate-fade-in-up delay-100"
          />
          <DarkCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>}
            title="Actionable Feedback"
            description="Understand why people would or wouldn't buy with structured comments and clustering."
            className="animate-fade-in-up delay-200"
          />
          <DarkCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            title="Validation Score"
            description="One number that tells you how ready your idea is for market based on real signals."
            className="animate-fade-in-up delay-300"
          />
          <DarkCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 15h2v2H8l-1 2H2v-2l1-2h4zm0-6v6" /></svg>}
            title="Supporter Network"
            description="Connect with investors, mentors, and skilled collaborators once you've proven demand."
            className="animate-fade-in-up"
          />
          <DarkCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.276a11.952 11.952 0 01-1.293 2.917V7l2-2h4V3H2v2l2 2v3.626c-1.895.842-3 2.583-3 4.474C1 17.561 4.582 21 9 21s8-3.439 8-7.5c0-1.891-1.105-3.632-3-4.474V13c0 2.206-1.794 4-4 4s-4-1.794-4-4V7h2V5H4v2h2v.374a4.002 4.002 0 014.002-.374C12.206 7 14 8.794 14 11v6H6v-6H4V18H2V4h10z" /></svg>}
            title="IP Protection Options"
            description="Display patent status, control visibility, and share selectively with private links."
            className="animate-fade-in-up delay-100"
          />
          <DarkCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.5 10a2 2 0 010-4.5V4a2 2 0 012-2h10a2 2 0 012 2v.5l.5.5V11a2 2 0 01-2 2h-1.5a1.5 1.5 0 00-1.06.44l-4 4a1.5 1.5 0 01-1.06.44h-2.5a2 2 0 01-2-2V9a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2v-4.5M10 20h4" /></svg>}
            title="Regional Targeting"
            description="Filter by country, state, or city. See which regions show the most interest."
            className="animate-fade-in-up delay-200"
          />
          <DarkCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7 10h10M7 14h10" /></svg>}
            title="Campaign Tools"
            description="Generate QR codes, shareable links, and track campaign performance in real-time."
            className="animate-fade-in-up delay-300"
          />
        </div>
      </div>
    </section>
  );
};

export default PowerfulFeaturesSection;
