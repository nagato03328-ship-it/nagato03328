
import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabaseClient';

interface ViewIdeaModalProps {
  isOpen: boolean;
  idea: any;
  onClose: () => void;
  onViewProfile?: (userId: string) => void;
  user?: { id: string; name: string; email?: string } | null;
}

const ViewIdeaModal: React.FC<ViewIdeaModalProps> = ({ isOpen, idea, onClose, onViewProfile, user }) => {
  const [userVote, setUserVote] = useState<string | null>(null);
  const [voting, setVoting] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    description: ''
  });

  const [localVotes, setLocalVotes] = useState(0);

  useEffect(() => {
    if (idea) {
      setEditData({
        title: idea.title || '',
        description: idea.description || ''
      });
      setLocalVotes(idea.votes || 0);
    }
  }, [idea]);

  const isAuthor = user && idea && (user.id === idea.user_id);

  const handleSaveIdea = async () => {
    if (!isSupabaseConfigured() || !idea?.id) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('ideas')
        .update({
          title: editData.title,
          description: editData.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', idea.id);

      if (error) throw error;
      
      // Update local idea object if needed, or just close/refresh
      // For now, we'll just exit editing mode
      setIsEditing(false);
      // We might want to trigger a refresh in the parent, but for now let's just update local state
      idea.title = editData.title;
      idea.description = editData.description;
      
      alert('Idea updated successfully!');
    } catch (err) {
      console.error('Error updating idea:', err);
      alert('Failed to update idea.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen && idea?.id) {
      fetchComments();
      fetchUserVote();
    }
  }, [isOpen, idea?.id, user?.id]);

  const fetchUserVote = async () => {
    if (!isSupabaseConfigured() || !idea?.id || !user || user.id === 'guest') return;

    try {
      const { data, error } = await supabase
        .from('idea_votes')
        .select('*')
        .eq('idea_id', idea.id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        if (data.yes_vote) setUserVote('yes');
        else if (data.maybe_vote) setUserVote('maybe');
        else if (data.no_vote) setUserVote('no');
      } else {
        setUserVote(null);
      }
    } catch (err) {
      console.error('Error fetching user vote:', err);
    }
  };

  const handleVote = async (type: 'yes' | 'maybe' | 'no') => {
    if (!user || user.id === 'guest') {
      alert('Please sign in to vote.');
      return;
    }

    if (!isSupabaseConfigured()) {
      setUserVote(type);
      return;
    }

    setVoting(true);
    try {
      const voteData = {
        idea_id: idea.id,
        user_id: user.id,
        yes_vote: type === 'yes',
        maybe_vote: type === 'maybe',
        no_vote: type === 'no',
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('idea_votes')
        .upsert(voteData, { onConflict: 'idea_id,user_id' });

      if (error) throw error;
      
      if (!userVote) {
        idea.votes = (idea.votes || 0) + 1;
        setLocalVotes(prev => prev + 1);
      }
      
      setUserVote(type);
    } catch (err) {
      console.error('Error recording vote:', err);
      alert('Failed to record vote. Please try again.');
    } finally {
      setVoting(false);
    }
  };

  const fetchComments = async () => {
    if (!isSupabaseConfigured() || !idea?.id) return;

    // Skip fetching for mock ideas (numeric IDs)
    if (typeof idea.id === 'number' || (typeof idea.id === 'string' && !idea.id.includes('-'))) {
      setComments([]);
      return;
    }

    setLoadingComments(true);
    try {
      // Try to fetch comments with profiles. 
      // If the join fails due to schema constraints, we'll fall back to a two-step fetch.
      const { data, error } = await supabase
        .from('idea_comments')
        .select('*, author:profiles(full_name, company_name, profile_type)')
        .eq('idea_id', idea.id)
        .order('created_at', { ascending: true });

      if (error) {
        // Fallback: Fetch comments first
        const { data: commentsData, error: commentsError } = await supabase
          .from('idea_comments')
          .select('*')
          .eq('idea_id', idea.id)
          .order('created_at', { ascending: true });
          
        if (commentsError) throw commentsError;
        
        if (!commentsData || commentsData.length === 0) {
          setComments([]);
          return;
        }
        
        // Then fetch profiles for these users
        const userIds = [...new Set(commentsData.map(c => c.user_id))];
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('user_id, full_name, company_name, profile_type')
          .in('user_id', userIds);
          
        if (profilesError) throw profilesError;
        
        const profilesMap = (profilesData || []).reduce((acc: any, p) => {
          acc[p.user_id] = p;
          return acc;
        }, {});
        
        const mappedComments = commentsData.map(comment => ({
          ...comment,
          author_name: profilesMap[comment.user_id] 
            ? (profilesMap[comment.user_id].profile_type === 'personal' ? profilesMap[comment.user_id].full_name : profilesMap[comment.user_id].company_name) 
            : 'Anonymous'
        }));
        
        setComments(mappedComments);
      } else {
        const mappedComments = (data || []).map(comment => ({
          ...comment,
          author_name: comment.author ? (comment.author.profile_type === 'personal' ? comment.author.full_name : comment.author.company_name) : 'Anonymous'
        }));
        
        setComments(mappedComments);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || user.id === 'guest') return;

    if (!isSupabaseConfigured()) {
      // Mock local addition if no DB
      const mockComment = {
        id: Date.now().toString(),
        content: newComment,
        author_name: user.name,
        created_at: new Date().toISOString()
      };
      setComments([...comments, mockComment]);
      setNewComment('');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('idea_comments')
        .insert([{
          idea_id: idea.id,
          user_id: user.id,
          content: newComment
        }]);

      if (error) throw error;
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(true); // Wait, should be false
      setSubmitting(false);
    }
  };

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
                    {idea.stage.charAt(0).toUpperCase() + idea.stage.slice(1)}
                  </span>
                  <span className="bg-teal-500/10 text-teal-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-teal-500/20">
                    {idea.category || 'General'}
                  </span>
                  <div className="flex items-center space-x-2 ml-auto sm:ml-0">
                    <button 
                      onClick={() => idea.user_id && onViewProfile?.(idea.user_id)}
                      className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                      disabled={!idea.user_id || !onViewProfile}
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-[10px] text-gray-400 font-bold">
                        {idea.author ? idea.author[0].toUpperCase() : 'U'}
                      </div>
                      <span className="text-gray-500 text-xs font-medium hover:text-white transition-colors">
                        {idea.author || 'Community Member'}
                      </span>
                    </button>
                  </div>
                  {isAuthor && !isEditing && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="ml-auto text-[#00BA9D] text-xs font-bold hover:underline"
                    >
                      Edit Idea
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <input 
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                    className="w-full bg-[#1e293b]/50 border border-[#00BA9D] text-white text-3xl sm:text-4xl font-bold rounded-xl px-4 py-2 outline-none"
                  />
                ) : (
                  <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{idea.title}</h2>
                )}
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
                  Description
                </h4>
                {isEditing ? (
                  <textarea 
                    value={editData.description}
                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                    className="w-full bg-[#1e293b]/50 border border-[#00BA9D] text-gray-300 text-lg leading-relaxed font-light rounded-xl px-4 py-3 outline-none min-h-[200px] resize-none"
                  />
                ) : (
                  <p className="text-gray-300 text-lg leading-relaxed font-light">
                    {idea.description}
                  </p>
                )}
              </section>

              <section>
                <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center">
                  <span className="w-8 h-px bg-gray-800 mr-3" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(idea.tags) ? (
                    idea.tags.map((tag: string) => (
                      <span key={tag} className="bg-gray-800/50 text-gray-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gray-700">
                        {tag}
                      </span>
                    ))
                  ) : idea.tags ? (
                    idea.tags.split(',').map((tag: string) => (
                      <span key={tag} className="bg-gray-800/50 text-gray-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gray-700">
                        {tag.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-xs italic">No tags provided.</span>
                  )}
                </div>
              </section>

              {idea.seeking_investment && (
                <section className="bg-indigo-500/5 border border-indigo-500/10 rounded-3xl p-6 animate-fade-in">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Seeking Investment</h4>
                      <p className="text-gray-500 text-xs">This founder is looking for financial backing.</p>
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-gray-400 text-sm">Target:</span>
                    <span className="text-2xl font-bold text-white">{idea.investment_amount || 'Contact for details'}</span>
                  </div>
                </section>
              )}
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
                  <p className="text-xl font-bold text-white">{localVotes}</p>
                </div>
                <div className="bg-[#1e293b]/10 border border-gray-800/50 p-4 rounded-2xl text-center">
                  <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Waitlist</p>
                  <p className="text-xl font-bold text-white">{idea.waitlist}</p>
                </div>
              </div>

              <div className="bg-[#1e293b]/20 border border-gray-800/50 p-5 rounded-2xl">
                <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4 text-center">Would you use this?</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleVote('yes')}
                    disabled={voting}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${userVote === 'yes' ? 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/20' : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-green-400 hover:border-green-500/30'} ${voting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => handleVote('maybe')}
                    disabled={voting}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${userVote === 'maybe' ? 'bg-yellow-500 border-yellow-400 text-white shadow-lg shadow-yellow-500/20' : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-yellow-400 hover:border-yellow-500/30'} ${voting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Maybe
                  </button>
                  <button 
                    onClick={() => handleVote('no')}
                    disabled={voting}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${userVote === 'no' ? 'bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/20' : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-500/30'} ${voting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center">
                    <span className="w-8 h-px bg-gray-800 mr-3" />
                    Community Feedback
                  </h4>
                  <span className="text-gray-500 text-[10px] font-bold">{comments.length} Comments</span>
                </div>

                {/* Comment List */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {loadingComments ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#00BA9D] mx-auto"></div>
                    </div>
                  ) : comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id} className="bg-[#1e293b]/10 border border-gray-800/50 p-4 rounded-2xl animate-fade-in">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-[8px] text-white font-bold">
                              {comment.author_name[0].toUpperCase()}
                            </div>
                            <span className="text-white text-xs font-bold">{comment.author_name}</span>
                          </div>
                          <span className="text-gray-600 text-[9px]">{new Date(comment.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-xs italic text-center py-4">No feedback yet. Be the first to share your thoughts!</p>
                  )}
                </div>

                {/* Comment Input */}
                {user && user.id !== 'guest' ? (
                  <form onSubmit={handleCommentSubmit} className="space-y-3">
                    <div className="relative">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your feedback or ask a question..."
                        className="w-full bg-[#1e293b]/30 border border-gray-800 text-gray-300 text-sm rounded-2xl p-4 focus:ring-2 focus:ring-[#00BA9D]/50 focus:border-[#00BA9D] outline-none transition-all resize-none min-h-[100px]"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={submitting || !newComment.trim()}
                        className="bg-[#00BA9D] hover:bg-[#00a88d] text-white px-8 py-2.5 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {submitting ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                        <span>Post Comment</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-[#1e293b]/10 border border-dashed border-gray-800 p-6 rounded-2xl text-center group">
                    <p className="text-gray-500 text-sm mb-4">Sign in to share your thoughts with the community.</p>
                    <button 
                      className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-2 rounded-xl text-xs font-bold transition-all border border-gray-700"
                      onClick={() => alert('Please sign in to post comments.')}
                    >
                      Sign in to Comment
                    </button>
                  </div>
                )}
              </section>

              <div className="bg-[#00BA9D]/5 border border-[#00BA9D]/20 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#00BA9D]/10 rounded-lg flex items-center justify-center text-[#00BA9D]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <span className="text-gray-400 text-xs font-medium">Feedback</span>
                </div>
                <span className="text-white font-bold">{comments.length}</span>
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
            <button 
              onClick={isEditing ? handleSaveIdea : (isAuthor ? () => setIsEditing(true) : () => alert('Idea saved to your interests!'))}
              disabled={submitting}
              className="flex-1 sm:flex-none bg-[#00BA9D] hover:bg-[#00a88d] text-white px-10 py-3 rounded-full font-bold transition-all transform active:scale-95 shadow-xl shadow-teal-500/20 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : (isEditing ? 'Save' : 'Save')}
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
