
import React from 'react';

interface ViewIdeaModalProps {
  isOpen: boolean;
  idea: any;
  onClose: () => void;
}

const ViewIdeaModal: React.FC<ViewIdeaModalProps> = ({ isOpen, idea, onClose }) => {
  if (!isOpen || !idea) return null;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-teal-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-teal-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      <div className="relative bg-[#080D1D] border border-gray-800 w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">
        {/* Top Gradient Bar */}
        <div className={`h-1.5 w-full ${getScoreBg(idea.score)} opacity-80`} />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-800/50 flex justify-between items-start bg-[#0f172a]/30">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-500/20">
                {idea.stage}
              </span>
              <span className="bg-teal-500/10 text-teal-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-teal-500/20">
                {idea.category || 'General'}
              </span>
              <div className="flex items-center space-x-2 ml-auto sm:ml-0">
                <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-[10px] text-gray-400 font-bold">
                  {idea.author ? idea.author[0].toUpperCase() : 'U'}
                </div>
                <span className="text-gray-500 text-xs font-medium">{idea.author || 'Community Member'}</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{idea.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="ml-4 p-2 text-gray-500 hover:text-white hover:bg-gray-800/50 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Main Details */}
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center">
                  <span className="w-8 h-px bg-gray-800 mr-3" />
                  The Vision
                </h4>
                <p className="text-gray-300 text-lg leading-relaxed font-light italic">
                  "{idea.description}"
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <section>
                  <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center">
                    <span className="w-8 h-px bg-gray-800 mr-3" />
                    Problem
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {idea.problem || "No problem statement provided."}
                  </p>
                </section>
                <section>
                  <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center">
                    <span className="w-8 h-px bg-gray-800 mr-3" />
                    Solution
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {idea.solution || "No solution details provided."}
                  </p>
                </section>
              </div>

              <section>
                <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center">
                  <span className="w-8 h-px bg-gray-800 mr-3" />
                  Target Audience
                </h4>
                <div className="bg-[#1e293b]/20 border border-gray-800/50 p-4 rounded-2xl">
                  <p className="text-gray-300 text-sm">
                    {idea.audience || "General market."}
                  </p>
                </div>
              </section>
            </div>

            {/* Right Column: Stats & Validation */}
            <div className="space-y-6">
              <div className="bg-[#1e293b]/30 border border-gray-800/50 rounded-3xl p-6">
                <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-6 text-center">Validation Score</h4>
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-800"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className={getScoreColor(idea.score)}
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * idea.score) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${getScoreColor(idea.score)}`}>{idea.score}%</span>
                    <span className="text-[8px] text-gray-500 uppercase font-bold">Confidence</span>
                  </div>
                </div>
                <p className="text-gray-500 text-[10px] text-center leading-relaxed">
                  Based on community engagement, waitlist conversion, and sentiment analysis.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1e293b]/10 border border-gray-800/50 p-4 rounded-2xl text-center">
                  <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Votes</p>
                  <p className="text-xl font-bold text-white">{idea.votes}</p>
                </div>
                <div className="bg-[#1e293b]/10 border border-gray-800/50 p-4 rounded-2xl text-center">
                  <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Waitlist</p>
                  <p className="text-xl font-bold text-white">{idea.waitlist}</p>
                </div>
              </div>

              <div className="bg-[#00BA9D]/5 border border-[#00BA9D]/20 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#00BA9D]/10 rounded-lg flex items-center justify-center text-[#00BA9D]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <span className="text-gray-400 text-xs font-medium">Feedback</span>
                </div>
                <span className="text-white font-bold">{idea.comments || 0}</span>
              </div>

              <button className="w-full bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all transform active:scale-[0.98] flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Interested to Invest</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-8 bg-[#0f172a]/50 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs italic">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <button 
              onClick={onClose}
              className="flex-1 sm:flex-none px-8 py-3 rounded-full text-gray-400 hover:text-white font-bold transition-all"
            >
              Close
            </button>
            <button className="flex-1 sm:flex-none bg-[#00BA9D] hover:bg-[#00a88d] text-white px-10 py-3 rounded-full font-bold transition-all transform active:scale-95 shadow-xl shadow-teal-500/20">
              Support Idea
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
};

export default ViewIdeaModal;
