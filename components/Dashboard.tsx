
import React, { useState } from 'react';
import BrowseIdeas from './BrowseIdeas';
import NewIdeaModal from './NewIdeaModal';
import EditIdeaModal from './EditIdeaModal';
import ViewIdeaModal from './ViewIdeaModal';
import InvestorsList from './InvestorsList';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import StatisticsModal from './StatisticsModal';

interface DashboardProps {
  userName: string;
  isDark: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
}

const USER_MOCK_IDEAS = [
  {
    id: 101,
    title: "Quantum Fitness Tracker",
    description: "A wearable device using quantum sensors to track micro-muscle movements for perfect gym form and injury prevention.",
    votes: 45,
    waitlist: 12,
    score: 62,
    stage: "Validation",
    comments: 8,
    category: "Hardware",
    problem: "Athletes struggle to maintain perfect form during high-intensity training, leading to preventable injuries.",
    solution: "Sub-millimeter muscle tracking using next-gen quantum sensors coupled with real-time haptic feedback.",
    audience: "Professional athletes and high-end gym enthusiasts."
  },
  {
    id: 102,
    title: "Solar-Powered Water Purifier",
    description: "Compact, portable water purification system designed for hikers and disaster relief zones, powered entirely by ambient sunlight.",
    votes: 128,
    waitlist: 54,
    score: 85,
    stage: "Prototype",
    comments: 24,
    category: "Sustainability",
    problem: "Lack of access to clean water in remote areas or during natural disasters.",
    solution: "A lightweight folding solar panel array that powers a high-efficiency UV and carbon filtration pump.",
    audience: "Hikers, aid organizations, and emergency responders."
  },
  {
    id: 103,
    title: "No-Code AR Menu for Restaurants",
    description: "A SaaS platform allowing local restaurants to create 3D interactive menus that customers view via a simple web link.",
    votes: 310,
    waitlist: 88,
    score: 91,
    stage: "Validation",
    comments: 42,
    category: "SaaS",
    problem: "Standard physical and QR menus are boring and don't effectively showcase high-margin dishes.",
    solution: "Easy drag-and-drop AR dish builder that customers can access on their phones without downloading an app.",
    audience: "Boutique and upscale restaurant owners."
  }
];

const Dashboard: React.FC<DashboardProps> = ({ userName: initialUserName, isDark, toggleTheme, onLogout }) => {
  const [userName, setUserName] = useState(initialUserName);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isNewIdeaModalOpen, setIsNewIdeaModalOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<any>(null);
  const [viewingIdea, setViewingIdea] = useState<any>(null);
  const [viewingStats, setViewingStats] = useState<any>(null);
  const [userIdeas, setUserIdeas] = useState(USER_MOCK_IDEAS);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [activeSort, setActiveSort] = useState('Recent');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categories = ['All Categories', 'SaaS', 'Hardware', 'Sustainability', 'EdTech', 'Fintech', 'HealthTech', 'Web3'];
  const sortOptions = ['Popularity', 'Recent', 'Oldest', 'Validation Score'];

  const filteredUserIdeas = userIdeas.filter(idea => {
    return activeCategory === 'All Categories' || idea.category === activeCategory;
  }).sort((a, b) => {
    if (activeSort === 'Popularity') return b.votes - a.votes;
    if (activeSort === 'Recent') return b.id - a.id; // Using ID as proxy for recent since it's Date.now()
    if (activeSort === 'Oldest') return a.id - b.id;
    if (activeSort === 'Validation Score') return b.score - a.score;
    return 0;
  });

  const navLinks = ['Browse Ideas', 'Investors', 'Dashboard'];

  // Calculate totals
  const totalVotes = userIdeas.reduce((sum, idea) => sum + idea.votes, 0);
  const totalComments = userIdeas.reduce((sum, idea) => sum + idea.comments, 0);

  const handleIdeaSubmit = (idea: any) => {
    const newIdea = {
      ...idea,
      id: Date.now(),
      votes: 0,
      waitlist: 0,
      score: 0,
      comments: 0,
      description: idea.problem ? idea.problem.substring(0, 100) + '...' : '' // Basic summary
    };
    setUserIdeas([newIdea, ...userIdeas]);
    setIsNewIdeaModalOpen(false);
  };

  const handleUpdateIdea = (updatedIdea: any) => {
    setUserIdeas(userIdeas.map(idea => idea.id === updatedIdea.id ? updatedIdea : idea));
    setEditingIdea(null);
  };

  return (
    <div className="flex-grow flex flex-col">
      {/* Dashboard Navbar */}
      <nav className="bg-[#020617] border-b border-gray-800 px-6 py-4 transition-colors duration-300 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-12">
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('Dashboard'); }} className="flex items-center text-xl font-bold text-white">
              <svg className="w-6 h-6 mr-2 text-[#00BA9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              IdeaConnect
            </a>
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => setActiveTab(link)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === link ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-white focus:outline-none"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <div className="relative group">
              <div className="flex items-center space-x-2 cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-[#00BA9D]/20 border border-[#00BA9D]/40 flex items-center justify-center text-[#00BA9D] text-xs font-bold">
                    {userName[0].toUpperCase()}
                </div>
                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{userName}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute right-0 top-full pt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto min-w-[180px]">
                <div className="bg-[#1e293b] rounded-2xl border border-gray-700 shadow-2xl overflow-hidden py-2">
                  <button 
                    onClick={() => setActiveTab('Profile')}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center space-x-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00BA9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Profile</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('Settings')}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center space-x-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00BA9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">Settings</span>
                  </button>
                  <div className="h-px bg-gray-800 my-1 mx-2" />
                  <button 
                    onClick={onLogout} 
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Conditional Main Content */}
      <main className="flex-grow transition-all duration-500">
        {activeTab === 'Dashboard' && (
          <div className="container mx-auto px-6 py-12 animate-fade-in">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome, {userName}!</h1>
                    <p className="text-gray-500">Track your validation progress and community feedback.</p>
                </div>
                <button 
                    onClick={() => setIsNewIdeaModalOpen(true)}
                    className="flex items-center space-x-2 bg-[#00BA9D] hover:bg-[#00a88d] text-white px-6 py-3 rounded-full font-bold transition-all transform active:scale-95 shadow-lg shadow-teal-500/20"
                >
                    <span className="text-xl">+</span>
                    <span>New Idea</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-[#1e293b]/30 border border-gray-800 p-6 rounded-2xl flex items-center group hover:border-[#00BA9D]/30 transition-colors">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mr-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-0.5">{userIdeas.length}</p>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">My Ideas</p>
                </div>
              </div>

              <div className="bg-[#1e293b]/30 border border-gray-800 p-6 rounded-2xl flex items-center group hover:border-[#00BA9D]/30 transition-colors">
                <div className="w-12 h-12 bg-[#00BA9D]/10 rounded-xl flex items-center justify-center text-[#00BA9D] mr-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-0.5">{totalVotes}</p>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Votes</p>
                </div>
              </div>

              <div className="bg-[#1e293b]/30 border border-gray-800 p-6 rounded-2xl flex items-center group hover:border-[#00BA9D]/30 transition-colors">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mr-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-0.5">{totalComments}</p>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Feedback</p>
                </div>
              </div>
            </div>

            {/* Ideas List */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Active Projects</h2>
                    <div className="flex items-center space-x-3">
                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button 
                              onClick={() => {
                                setIsSortOpen(!isSortOpen);
                                setIsCategoryOpen(false);
                              }}
                              className="text-xs text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 hover:border-gray-600 transition-all flex items-center space-x-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                              </svg>
                              <span>Sort: {activeSort}</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {isSortOpen && (
                              <div className="absolute top-full right-0 mt-2 w-48 bg-[#0f172a] border border-gray-800 rounded-xl shadow-2xl z-50 py-2 animate-fade-in-up">
                                {sortOptions.map((option) => (
                                  <button
                                    key={option}
                                    onClick={() => {
                                      setActiveSort(option);
                                      setIsSortOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeSort === option ? 'text-[#00BA9D] bg-[#00BA9D]/5 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            )}
                        </div>

                        {/* Category Dropdown */}
                        <div className="relative">
                            <button 
                              onClick={() => {
                                setIsCategoryOpen(!isCategoryOpen);
                                setIsSortOpen(false);
                              }}
                              className="text-xs text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 hover:border-gray-600 transition-all flex items-center space-x-2"
                            >
                              <span>{activeCategory}</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {isCategoryOpen && (
                              <div className="absolute top-full right-0 mt-2 w-48 bg-[#0f172a] border border-gray-800 rounded-xl shadow-2xl z-50 py-2 animate-fade-in-up">
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
                    </div>
                </div>

                {filteredUserIdeas.length === 0 ? (
                    <div className="text-center py-20 bg-[#1e293b]/10 rounded-3xl border-2 border-dashed border-gray-800">
                        <p className="text-gray-500 italic">No projects found in this category.</p>
                        {activeCategory !== 'All Categories' && (
                          <button 
                            onClick={() => setActiveCategory('All Categories')}
                            className="mt-4 text-[#00BA9D] text-sm font-bold hover:underline"
                          >
                            Show all projects
                          </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredUserIdeas.map((idea) => (
                            <div key={idea.id} className="bg-[#1e293b]/20 border border-gray-800 p-6 rounded-2xl hover:bg-[#1e293b]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${idea.stage === 'Validation' ? 'bg-teal-500/10 text-teal-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                                            {idea.stage}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                                            {idea.category || 'General'}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00BA9D] transition-colors">{idea.title}</h3>
                                    <p className="text-gray-400 text-sm max-w-2xl line-clamp-1">{idea.description}</p>
                                </div>

                                <div className="flex items-center space-x-12 min-w-fit">
                                    <div className="text-center">
                                        <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Votes</p>
                                        <p className="text-white font-bold">{idea.votes}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Waitlist</p>
                                        <p className="text-white font-bold">{idea.waitlist}</p>
                                    </div>
                                    <div className="text-right w-24">
                                        <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Validation</p>
                                        <div className="flex items-center justify-end space-x-2">
                                            <span className={`font-bold ${idea.score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>{idea.score}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-1000 ${idea.score >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                                                style={{ width: `${idea.score}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button 
                                          onClick={() => setViewingStats(idea)}
                                          className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-2 rounded-lg transition-colors border border-gray-700"
                                          title="View Statistics"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </button>
                                        <button 
                                          onClick={() => setViewingIdea(idea)}
                                          className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-2 rounded-lg transition-colors border border-gray-700"
                                          title="View Details"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                        <button 
                                          onClick={() => setEditingIdea(idea)}
                                          className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-2 rounded-lg transition-colors border border-gray-700"
                                          title="Edit Idea"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>
        )}

        {activeTab === 'Browse Ideas' && (
          <BrowseIdeas />
        )}

        {activeTab === 'Investors' && (
          <InvestorsList />
        )}

        {activeTab === 'Profile' && (
          <ProfilePage initialUser={{ name: userName }} onUpdate={(newName) => setUserName(newName)} />
        )}

        {activeTab === 'Settings' && (
          <SettingsPage onDeleteAccount={onLogout} />
        )}
      </main>

      {/* New Idea Modal */}
      <NewIdeaModal 
        isOpen={isNewIdeaModalOpen} 
        onClose={() => setIsNewIdeaModalOpen(false)} 
        onSubmit={handleIdeaSubmit}
      />

      {/* Edit Idea Modal */}
      <EditIdeaModal 
        isOpen={!!editingIdea} 
        idea={editingIdea}
        onClose={() => setEditingIdea(null)} 
        onSave={handleUpdateIdea}
      />

      {/* View Idea Modal */}
      <ViewIdeaModal 
        isOpen={!!viewingIdea} 
        idea={viewingIdea} 
        onClose={() => setViewingIdea(null)} 
      />

      {/* Statistics Modal */}
      <StatisticsModal 
        isOpen={!!viewingStats} 
        idea={viewingStats} 
        onClose={() => setViewingStats(null)} 
      />
    </div>
  );
};

export default Dashboard;
