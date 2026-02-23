
import React, { useState } from 'react';

interface NewIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (idea: any) => void;
}

const NewIdeaModal: React.FC<NewIdeaModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'SaaS',
    stage: 'Concept',
    problem: '',
    solution: '',
    audience: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const inputStyles = "w-full bg-[#1e293b]/50 border border-gray-700 text-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#00BA9D] focus:border-transparent transition-all outline-none placeholder:text-gray-500";
  const labelStyles = "block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-[#111827] border border-gray-800 rounded-3xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Share Your Vision</h2>
            <p className="text-gray-500 text-sm">Fill in the details to start your validation journey.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          <form id="new-idea-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyles}>Idea Title</label>
                <input 
                  type="text" 
                  className={inputStyles} 
                  placeholder="e.g. AI Plant Care Assistant"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className={labelStyles}>Category</label>
                <select 
                  className={inputStyles}
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="SaaS">SaaS</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="EdTech">EdTech</option>
                  <option value="Fintech">Fintech</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="Web3">Web3</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelStyles}>Validation Stage</label>
              <div className="flex bg-[#0f172a] p-1 rounded-xl">
                {['Concept', 'Prototype', 'Validation'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({...formData, stage: s})}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.stage === s ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelStyles}>The Problem</label>
              <textarea 
                rows={3}
                className={inputStyles} 
                placeholder="What pain point are you solving?"
                value={formData.problem}
                onChange={(e) => setFormData({...formData, problem: e.target.value})}
                required
              />
            </div>

            <div>
              <label className={labelStyles}>Your Solution</label>
              <textarea 
                rows={3}
                className={inputStyles} 
                placeholder="How does your product work?"
                value={formData.solution}
                onChange={(e) => setFormData({...formData, solution: e.target.value})}
                required
              />
            </div>

            <div>
              <label className={labelStyles}>Target Audience</label>
              <input 
                type="text" 
                className={inputStyles} 
                placeholder="e.g. Urban plant owners aged 25-40"
                value={formData.audience}
                onChange={(e) => setFormData({...formData, audience: e.target.value})}
                required
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-[#0f172a]/50 flex justify-end space-x-4">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 text-gray-400 font-bold hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="new-idea-form"
            className="bg-[#00BA9D] hover:bg-[#00a88d] text-white px-8 py-2.5 rounded-full font-bold shadow-lg shadow-teal-500/20 transform active:scale-95 transition-all"
          >
            Publish to Community
          </button>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
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

export default NewIdeaModal;
