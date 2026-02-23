
import React, { useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  role: string;
  company?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
}

interface ProfilePageProps {
  initialUser: { name: string };
  onUpdate: (name: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ initialUser, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: initialUser.name,
    email: `${initialUser.name.toLowerCase().replace(' ', '.')}@example.com`,
    bio: "Passionate entrepreneur looking to validate the next big thing in technology. I love building products that make a difference.",
    location: "San Francisco, CA",
    role: "Founder & Product Designer",
    company: "IdeaConnect Labs",
    website: "https://ideaconnect.app",
    twitter: "@ideaconnect",
    linkedin: "linkedin.com/in/ideaconnect"
  });

  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(tempProfile);
    onUpdate(tempProfile.name);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const inputStyles = "w-full bg-[#1e293b]/50 border border-gray-700 text-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#00BA9D] focus:border-transparent transition-all outline-none placeholder:text-gray-500";
  const labelStyles = "block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2";

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">My Profile</h1>
          <p className="text-gray-400">Manage your public presence and personal information.</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-[#00BA9D] hover:bg-[#00a88d] text-white px-8 py-3 rounded-full font-bold transition-all transform active:scale-95 shadow-lg shadow-teal-500/20 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleCancel}
              className="px-6 py-3 rounded-full text-gray-400 hover:text-white font-bold transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="bg-[#00BA9D] hover:bg-[#00a88d] text-white px-8 py-3 rounded-full font-bold transition-all transform active:scale-95 shadow-lg shadow-teal-500/20"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="space-y-6">
          <div className="bg-[#1e293b]/20 border border-gray-800 rounded-3xl p-8 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00BA9D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-700 flex items-center justify-center text-4xl font-bold text-white shadow-2xl mx-auto mb-6 group-hover:scale-105 transition-transform">
                {profile.name[0].toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
              <p className="text-[#00BA9D] text-sm font-bold uppercase tracking-widest mb-4">{profile.role}</p>
              <div className="flex items-center justify-center text-gray-500 text-sm mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profile.location}
              </div>
              
              <div className="flex justify-center space-x-4">
                <a href="#" className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#1e293b]/20 border border-gray-800 rounded-3xl p-8">
            <h4 className={labelStyles}>Account Stats</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Member Since</span>
                <span className="text-white text-sm font-medium">Feb 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Ideas Validated</span>
                <span className="text-white text-sm font-medium">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Community Rank</span>
                <span className="text-[#00BA9D] text-sm font-bold">Rising Star</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-2">
          <div className="bg-[#1e293b]/20 border border-gray-800 rounded-3xl p-8 sm:p-10">
            <div className="space-y-8">
              {/* Basic Info Section */}
              <section>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-[#00BA9D] rounded-full mr-3" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyles}>Full Name</label>
                    <input 
                      type="text" 
                      className={inputStyles}
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Email Address</label>
                    <input 
                      type="email" 
                      className={inputStyles}
                      value={tempProfile.email}
                      onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Current Role</label>
                    <input 
                      type="text" 
                      className={inputStyles}
                      value={tempProfile.role}
                      onChange={(e) => setTempProfile({...tempProfile, role: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Location</label>
                    <input 
                      type="text" 
                      className={inputStyles}
                      value={tempProfile.location}
                      onChange={(e) => setTempProfile({...tempProfile, location: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </section>

              {/* Bio Section */}
              <section>
                <label className={labelStyles}>Professional Bio</label>
                <textarea 
                  rows={4}
                  className={inputStyles}
                  value={tempProfile.bio}
                  onChange={(e) => setTempProfile({...tempProfile, bio: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Tell the community about yourself..."
                />
              </section>

              {/* Online Presence Section */}
              <section>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3" />
                  Online Presence
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyles}>Website</label>
                    <input 
                      type="text" 
                      className={inputStyles}
                      value={tempProfile.website}
                      onChange={(e) => setTempProfile({...tempProfile, website: e.target.value})}
                      disabled={!isEditing}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Twitter</label>
                    <input 
                      type="text" 
                      className={inputStyles}
                      value={tempProfile.twitter}
                      onChange={(e) => setTempProfile({...tempProfile, twitter: e.target.value})}
                      disabled={!isEditing}
                      placeholder="@username"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
