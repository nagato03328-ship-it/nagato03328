
import React, { useState } from 'react';
import ViewIdeaModal from './ViewIdeaModal';

const MOCK_IDEAS = [
  {
    id: 1,
    title: "AI-Powered Plant Care",
    description: "A smart sensor and app that monitors soil health and uses AI to provide custom care schedules for indoor plants.",
    votes: 1240,
    waitlist: 450,
    score: 89,
    stage: "Concept",
    category: "SaaS",
    author: "Greenthumb_dev",
    problem: "People often forget to water their plants or overwater them, leading to plant death.",
    solution: "A low-cost sensor that connects to a smartphone app, providing real-time data and AI-driven advice.",
    audience: "Urban dwellers and busy professionals who love plants but lack a green thumb.",
    comments: 156,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Eco-Friendly Delivery Shells",
    description: "Reusable, temperature-controlled packaging for food delivery that eliminates single-use plastics.",
    votes: 890,
    waitlist: 210,
    score: 74,
    stage: "Prototype",
    category: "Hardware",
    author: "SustainableLogistics",
    problem: "Food delivery generates massive amounts of plastic waste every day.",
    solution: "A circular economy model where delivery drivers collect empty shells on their next trip.",
    audience: "Eco-conscious consumers and delivery platforms looking to reduce their carbon footprint.",
    comments: 84,
    createdAt: "2024-02-10T14:30:00Z"
  },
  {
    id: 3,
    title: "Decentralized Study Groups",
    description: "A platform connecting students globally for real-time collaborative learning with blockchain-verified credentials.",
    votes: 2100,
    waitlist: 920,
    score: 92,
    stage: "Validation",
    category: "EdTech",
    author: "EduChain_Team",
    problem: "Students often feel isolated when studying online and lack a way to prove their collaborative skills.",
    solution: "A peer-to-peer learning network that rewards active participation with verifiable on-chain badges.",
    audience: "University students and lifelong learners worldwide.",
    comments: 210,
    createdAt: "2023-12-05T09:15:00Z"
  }
];

const BrowseIdeas: React.FC = () => {
  const [selectedIdea, setSelectedIdea] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [activeStage, setActiveStage] = useState('All Stages');
  const [activeSort, setActiveSort] = useState('Popularity');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStageOpen, setIsStageOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categories = ['All Categories', 'SaaS', 'Hardware', 'EdTech', 'Fintech', 'HealthTech', 'Web3'];
  const stages = ['All Stages', 'Concept', 'Prototype', 'Validation', 'MVP'];
  const sortOptions = ['Popularity', 'Recent', 'Oldest', 'Relevance'];

  const filteredIdeas = MOCK_IDEAS.filter(idea => {
    const categoryMatch = activeCategory === 'All Categories' || idea.category === activeCategory;
    const stageMatch = activeStage === 'All Stages' || idea.stage === activeStage;
    return categoryMatch && stageMatch;
  }).sort((a, b) => {
    if (activeSort === 'Popularity') return b.votes - a.votes;
    if (activeSort === 'Recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (activeSort === 'Oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (activeSort === 'Relevance') return b.score - a.score;
    return 0;
  });

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-[#020617] pt-20 pb-16 px-6 text-center border-b border-gray-800/50">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Discover ideas the world <br /> wants next
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Browse through validated product ideas, see real demand signals, and spot the ones worth building, backing, or buying.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="container mx-auto px-6 -mt-8">
        <div className="bg-[#020617]/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row justify-center items-center gap-4 shadow-2xl max-w-4xl mx-auto">
          {/* Category Filter */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsStageOpen(false);
                setIsSortOpen(false);
              }}
              className="bg-[#1e293b]/40 hover:bg-[#1e293b]/60 border border-gray-700 text-gray-300 px-6 py-2.5 rounded-full flex items-center space-x-3 transition-all min-w-[160px] justify-between"
            >
              <span className="text-sm font-bold">{activeCategory}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#0f172a] border border-gray-800 rounded-xl shadow-2xl z-50 py-2 animate-fade-in-up">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeCategory === cat ? 'text-[#00BA9D] bg-[#00BA9D]/5 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stage Filter */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsStageOpen(!isStageOpen);
                setIsCategoryOpen(false);
                setIsSortOpen(false);
              }}
              className="bg-[#1e293b]/40 hover:bg-[#1e293b]/60 border border-gray-700 text-gray-300 px-6 py-2.5 rounded-full flex items-center space-x-3 transition-all min-w-[160px] justify-between"
            >
              <span className="text-sm font-bold">{activeStage}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isStageOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isStageOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#0f172a] border border-gray-800 rounded-xl shadow-2xl z-50 py-2 animate-fade-in-up">
                {stages.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => {
                      setActiveStage(stage);
                      setIsStageOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeStage === stage ? 'text-indigo-400 bg-indigo-400/5 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsSortOpen(!isSortOpen);
                setIsCategoryOpen(false);
                setIsStageOpen(false);
              }}
              className="bg-[#1e293b]/40 hover:bg-[#1e293b]/60 border border-gray-700 text-gray-300 px-6 py-2.5 rounded-full flex items-center space-x-3 transition-all min-w-[160px] justify-between"
            >
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span className="text-sm font-bold">Sort: {activeSort}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isSortOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#0f172a] border border-gray-800 rounded-xl shadow-2xl z-50 py-2 animate-fade-in-up">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setActiveSort(option);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeSort === option ? 'text-indigo-400 bg-indigo-400/5 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ideas Grid */}
      <section className="container mx-auto px-6 py-16">
        {filteredIdeas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIdeas.map((idea) => (
              <div key={idea.id} className="bg-[#1e293b]/30 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                    {idea.stage}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-teal-400 font-bold">{idea.score}</span>
                    <span className="text-gray-500 text-[10px]">Score</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00BA9D] transition-colors">{idea.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">{idea.description}</p>
                
                <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-4 mt-auto">
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase font-bold mb-1 tracking-tighter">Votes</p>
                    <p className="text-white font-semibold">{idea.votes}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase font-bold mb-1 tracking-tighter">Waitlist</p>
                    <p className="text-white font-semibold">{idea.waitlist}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white">
                      {idea.author[0]}
                    </div>
                    <span className="text-gray-400 text-xs">{idea.author}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedIdea(idea)}
                    className="bg-gray-800/50 hover:bg-gray-700 text-gray-400 hover:text-[#00BA9D] p-2 rounded-xl transition-all border border-gray-700/50 hover:border-[#00BA9D]/30"
                    title="View Details"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#1e293b]/10 border border-dashed border-gray-800 rounded-3xl">
            <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center text-gray-500 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No ideas found</h3>
            <p className="text-gray-500">Try adjusting your filters to discover more projects.</p>
            <button 
              onClick={() => {
                setActiveCategory('All Categories');
                setActiveStage('All Stages');
              }}
              className="mt-6 text-[#00BA9D] font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </section>

      {/* View Idea Modal */}
      <ViewIdeaModal 
        isOpen={!!selectedIdea} 
        idea={selectedIdea} 
        onClose={() => setSelectedIdea(null)} 
      />
    </div>
  );
};

export default BrowseIdeas;
