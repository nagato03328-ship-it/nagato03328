
import React from 'react';

const AnalyticsDashboardSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-[#121B35] py-16 lg:py-24 transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Dashboard Mockup */}
        <div className="relative p-8 bg-slate-50 dark:bg-[#182137] rounded-lg border border-gray-100 dark:border-transparent shadow-lg dark:shadow-xl animate-fade-in-left">
          <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
            Analytics Dashboard
          </div>
          <div className="flex items-center justify-between mb-6 pt-8">
            <div className="text-left">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Validation Score</p>
              <p className="text-gray-900 dark:text-white text-4xl font-bold">78 <span className="text-green-600 dark:text-green-500 text-xl">+12</span></p>
            </div>
            <div className="text-green-700 bg-green-100 dark:text-green-500 dark:bg-green-500/20 px-4 py-2 rounded-full font-semibold">
              Strong
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
              <p className="text-green-600 dark:text-green-500 text-2xl font-bold">68%</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Yes</p>
            </div>
            <div>
              <p className="text-yellow-600 dark:text-yellow-500 text-2xl font-bold">22%</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Maybe</p>
            </div>
            <div>
              <p className="text-red-600 dark:text-red-500 text-2xl font-bold">10%</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">No</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Interest Over Time <span className="float-right text-xs">Last 7 days</span></p>
            <div className="flex h-20 items-end space-x-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-indigo-600 dark:bg-indigo-500 rounded-sm w-1/7 transition-all duration-300"
                  style={{ height: `${30 + i * 10}%` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-gray-900 dark:text-white text-lg font-bold">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Votes</p>
              <p>342</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Waitlist</p>
              <p>89</p>
            </div>
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="lg:pl-8 animate-fade-in-right">
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide">Analytics Dashboard</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
            Data That <span className="text-indigo-600 dark:text-indigo-400">Actually Helps</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            No more guessing. See exactly who wants your product, why they want it, and what would make
            them buy. Plus AI-powered suggestions to improve your idea.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Real-time validation score based on purchase intent
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Audience segmentation by demographics and interests
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Price sensitivity analysis with optimal pricing hints
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Feedback clustering to spot common patterns
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Coach tips suggesting next steps based on your data
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboardSection;
