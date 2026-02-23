
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AdminDashboardProps {
  isDark: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
}

const MOCK_USERS = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Creator", status: "Active", joined: "2024-01-10" },
  { id: 2, name: "Sarah Smith", email: "sarah@invest.com", role: "Investor", status: "Active", joined: "2024-01-15" },
  { id: 3, name: "Mike Ross", email: "mike@startup.io", role: "Creator", status: "Pending", joined: "2024-02-01" },
  { id: 4, name: "Emma Wilson", email: "emma@vc.com", role: "Investor", status: "Suspended", joined: "2023-12-20" },
];

const MOCK_PENDING_IDEAS = [
  { 
    id: 1, 
    title: "AI Waste Sorter", 
    author: "EcoWarrior", 
    category: "Sustainability", 
    submitted: "2024-02-18",
    description: "An automated waste sorting system using computer vision to separate recyclables from landfill waste in real-time.",
    problem: "Manual waste sorting is inefficient, expensive, and prone to human error, leading to high contamination rates in recycling streams.",
    solution: "A low-cost camera and AI module that can be retrofitted to existing conveyor belts to identify and sort materials with 98% accuracy.",
    targetAudience: "Municipal recycling facilities and large-scale waste management companies.",
    pricing: "$15,000 per unit + $200/month for software updates."
  },
  { 
    id: 2, 
    title: "Neural Link for Pets", 
    author: "PetTech", 
    category: "Hardware", 
    submitted: "2024-02-19",
    description: "A non-invasive wearable that translates pet brainwaves into basic human emotions and needs displayed on a mobile app.",
    problem: "Pet owners often struggle to understand their pets' specific needs or emotional states, leading to stress for both the animal and the owner.",
    solution: "A comfortable collar with EEG sensors that uses machine learning to decode neural patterns into 'Hungry', 'Playful', 'Anxious', etc.",
    targetAudience: "Tech-savvy pet owners and animal behavioral researchers.",
    pricing: "$299 for the collar + optional premium subscription."
  },
  { 
    id: 3, 
    title: "DeFi for Kids", 
    author: "FinKid", 
    category: "Fintech", 
    submitted: "2024-02-20",
    description: "A gamified decentralized finance education platform that allows children to learn about saving, investing, and interest using a safe, parent-controlled stablecoin environment.",
    problem: "Traditional financial education is boring and fails to prepare children for the modern digital economy and blockchain-based finance.",
    solution: "An interactive app where kids earn 'FinCoins' for chores, which they can then 'stake' in virtual pools to see how compound interest works.",
    targetAudience: "Parents with children aged 8-15 who want to instill financial literacy.",
    pricing: "Free for basic features, $5/month for family premium plan."
  },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isDark, toggleTheme, onLogout }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  // Edit User State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // View Idea State
  const [isViewIdeaModalOpen, setIsViewIdeaModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<any>(null);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      setBroadcastMessage('');
      setTimeout(() => {
        setShowSuccess(false);
        setIsBroadcastModalOpen(false);
      }, 2000);
    }, 1500);
  };

  const generateReport = () => {
    setIsGeneratingReport(true);
    
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('IdeaConnect - User Management Report', 14, 22);
      
      // Add date
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
      
      // Add stats summary
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text('Summary Stats:', 14, 45);
      doc.setFontSize(10);
      doc.text(`Total Users: ${MOCK_USERS.length}`, 14, 52);
      doc.text(`Active Ideas: 452`, 14, 58);
      doc.text(`Total Investments: $2.4M`, 14, 64);

      // Add user table
      const tableColumn = ["ID", "Name", "Email", "Role", "Status", "Joined"];
      const tableRows = MOCK_USERS.map(user => [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.joined
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 75,
        theme: 'striped',
        headStyles: { fillColor: [79, 70, 229] }, // Indigo-600
      });

      // Save the PDF
      doc.save(`ideaconnect-user-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleEditClick = (user: any) => {
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateSuccess(true);
      
      // In a real app, we would update the MOCK_USERS array here
      // For this demo, we'll just show the success message
      
      setTimeout(() => {
        setUpdateSuccess(false);
        setIsEditModalOpen(false);
        setEditingUser(null);
      }, 1500);
    }, 1000);
  };

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  const stats = [
    { label: "Total Users", value: "1,284", change: "+12%", icon: "👥", color: "text-blue-400" },
    { label: "Active Ideas", value: "452", change: "+5%", icon: "💡", color: "text-yellow-400" },
    { label: "Total Investments", value: "$2.4M", change: "+18%", icon: "💰", color: "text-green-400" },
    { label: "Pending Approvals", value: "12", change: "-2", icon: "⏳", color: "text-purple-400" },
  ];

  return (
    <div className="flex-grow flex flex-col bg-[#020617]">
      {/* Admin Navbar */}
      <nav className="bg-[#020617] border-b border-gray-800 px-6 py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-12">
            <div className="flex items-center text-xl font-bold text-white">
              <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              IdeaConnect <span className="ml-2 px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] uppercase tracking-widest rounded border border-indigo-500/20">Admin</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['Overview', 'Users', 'Moderation'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={toggleTheme} className="p-2 text-gray-400 hover:text-white">
              {isDark ? "☀️" : "🌙"}
            </button>
            <button onClick={onLogout} className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        {activeTab === 'Overview' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-8">System Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#1e293b]/20 border border-gray-800 p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#1e293b]/10 border border-gray-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                <div className="space-y-6">
                  {[
                    { user: "Sarah Smith", action: "invested $50k in", target: "Solar Purifier", time: "2 mins ago" },
                    { user: "Mike Ross", action: "submitted new idea", target: "DeFi for Kids", time: "15 mins ago" },
                    { user: "System", action: "flagged potential spam in", target: "Crypto Scam", time: "1 hour ago" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500" />
                      <div>
                        <p className="text-sm text-gray-300">
                          <span className="font-bold text-white">{activity.user}</span> {activity.action} <span className="text-indigo-400 font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1e293b]/10 border border-gray-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={generateReport}
                    disabled={isGeneratingReport}
                    className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 font-bold hover:bg-indigo-500/20 transition-all text-sm flex items-center justify-center disabled:opacity-50"
                  >
                    {isGeneratingReport ? (
                      <svg className="animate-spin h-4 w-4 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : "Generate Report"}
                  </button>
                  <button 
                    onClick={() => setIsBroadcastModalOpen(true)}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 font-bold hover:bg-green-500/20 transition-all text-sm"
                  >
                    Broadcast Message
                  </button>
                  <button className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400 font-bold hover:bg-purple-500/20 transition-all text-sm">
                    System Audit
                  </button>
                  <button className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-bold hover:bg-red-500/20 transition-all text-sm">
                    Maintenance Mode
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Users' && (
          <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h1 className="text-3xl font-bold text-white">User Management</h1>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-10 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {userSearchQuery && (
                    <button 
                      onClick={() => setUserSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl font-bold transition-all w-full sm:w-auto">
                  + Add User
                </button>
              </div>
            </div>
            
            <div className="bg-[#1e293b]/10 border border-gray-800 rounded-3xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-800/20">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">User</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Role</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Joined</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-white">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${user.role === 'Investor' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                            user.status === 'Active' ? 'bg-teal-500/10 text-teal-400' : 
                            user.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">{user.joined}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleEditClick(user)}
                            className="text-gray-400 hover:text-white mr-4 text-xs font-bold"
                          >
                            Edit
                          </button>
                          <button className="text-red-400 hover:text-red-300 text-xs font-bold mr-4">Ban</button>
                          <button 
                            onClick={() => {
                              if(window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
                                alert(`${user.name} has been deleted.`);
                              }
                            }}
                            className="text-red-600 hover:text-red-500 text-xs font-bold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center text-gray-500 italic">
                        No users found matching "{userSearchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Moderation' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-8">Idea Moderation</h1>
            <div className="grid grid-cols-1 gap-4">
              {MOCK_PENDING_IDEAS.map((idea) => (
                <div key={idea.id} className="bg-[#1e293b]/20 border border-gray-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{idea.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>By <span className="text-indigo-400 font-medium">{idea.author}</span></span>
                      <span>•</span>
                      <span>{idea.category}</span>
                      <span>•</span>
                      <span>Submitted {idea.submitted}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-lg transition-all">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-all">
                      Reject
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedIdea(idea);
                        setIsViewIdeaModalOpen(true);
                      }}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold rounded-lg transition-all"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Broadcast Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !isSending && setIsBroadcastModalOpen(false)} />
          <div className="relative bg-[#0f172a] border border-gray-800 w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Broadcast Message</h2>
                <button 
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {showSuccess ? (
                <div className="py-12 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">Your broadcast has been delivered to all users.</p>
                </div>
              ) : (
                <form onSubmit={handleBroadcast}>
                  <p className="text-gray-400 text-sm mb-4">
                    This message will be sent as a global notification to all active users on the platform.
                  </p>
                  <textarea
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Enter your message here..."
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors h-40 resize-none mb-6"
                    required
                  />
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsBroadcastModalOpen(false)}
                      className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-white/5 transition-all"
                      disabled={isSending}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSending || !broadcastMessage.trim()}
                      className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-50 text-white hover:text-indigo-900 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSending ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : "Send Broadcast"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !isUpdating && setIsEditModalOpen(false)} />
          <div className="relative bg-[#0f172a] border border-gray-800 w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Edit User</h2>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {updateSuccess ? (
                <div className="py-12 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">User Updated!</h3>
                  <p className="text-gray-400">The user details have been successfully saved.</p>
                </div>
              ) : (
                <form onSubmit={handleUpdateUser} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Role</label>
                      <select
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                      >
                        <option value="Creator">Creator</option>
                        <option value="Investor">Investor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Status</label>
                      <select
                        value={editingUser.status}
                        onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-white/5 transition-all"
                      disabled={isUpdating}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-50 text-white hover:text-indigo-900 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isUpdating ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View Idea Modal */}
      {isViewIdeaModalOpen && selectedIdea && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsViewIdeaModalOpen(false)} />
          <div className="relative bg-[#0f172a] border border-gray-800 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-indigo-500/20 mb-2 inline-block">
                    {selectedIdea.category}
                  </span>
                  <h2 className="text-3xl font-bold text-white">{selectedIdea.title}</h2>
                  <p className="text-gray-500 text-sm">Submitted by <span className="text-indigo-400 font-medium">{selectedIdea.author}</span> on {selectedIdea.submitted}</p>
                </div>
                <button 
                  onClick={() => setIsViewIdeaModalOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedIdea.description}</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-3">The Problem</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{selectedIdea.problem}</p>
                  </section>
                  <section>
                    <h3 className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">The Solution</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{selectedIdea.solution}</p>
                  </section>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Target Audience</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{selectedIdea.targetAudience}</p>
                  </section>
                  <section>
                    <h3 className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">Pricing Model</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{selectedIdea.pricing}</p>
                  </section>
                </div>

                <div className="flex space-x-4 pt-6 border-t border-gray-800">
                  <button
                    onClick={() => {
                      alert(`Idea "${selectedIdea.title}" has been approved.`);
                      setIsViewIdeaModalOpen(false);
                    }}
                    className="flex-1 py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-green-500/20"
                  >
                    Approve Idea
                  </button>
                  <button
                    onClick={() => {
                      const reason = window.prompt("Reason for rejection:");
                      if (reason !== null) {
                        alert(`Idea rejected. Reason: ${reason}`);
                        setIsViewIdeaModalOpen(false);
                      }
                    }}
                    className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-500/20"
                  >
                    Reject Idea
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
