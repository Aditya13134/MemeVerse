import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Image, Heart, MessageSquare, User, Edit2 } from 'lucide-react';

interface UserProfile {
  username: string;
  bio: string;
  joinDate: string;
  avatarUrl: string;
  stats: {
    uploads: number;
    likes: number;
    comments: number;
  };
}

const dummyProfile: UserProfile = {
  username: "MemeKing42",
  bio: "Professional meme enthusiast and digital comedian. Making the internet laugh since 2020.",
  joinDate: "March 2020",
  avatarUrl: "https://source.unsplash.com/random/200x200/?avatar",
  stats: {
    uploads: 42,
    likes: 1337,
    comments: 420
  }
};

const dummyMemes = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Epic Meme ${i + 1}`,
  imageUrl: `https://source.unsplash.com/random/400x300?meme&sig=${i}`,
  likes: Math.floor(Math.random() * 1000),
  comments: Math.floor(Math.random() * 100)
}));

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'uploads' | 'liked' | 'settings'>('uploads');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(dummyProfile);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically update the profile in your backend
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <img
              src={profile.avatarUrl}
              alt={profile.username}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary-500"
            />
            <button
              className="absolute bottom-0 right-0 bg-primary-500 p-2 rounded-full text-white hover:bg-primary-600"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 size={16} />
            </button>
          </motion.div>

          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-2">{profile.username}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{profile.bio}</p>
                <p className="text-sm text-gray-500">Member since {profile.joinDate}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6 border-t dark:border-gray-700 pt-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-2xl font-bold">{profile.stats.uploads}</p>
              <p className="text-gray-600 dark:text-gray-400">Uploads</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{profile.stats.likes}</p>
              <p className="text-gray-600 dark:text-gray-400">Likes</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{profile.stats.comments}</p>
              <p className="text-gray-600 dark:text-gray-400">Comments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b dark:border-gray-700 mb-6">
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'uploads'
              ? 'border-b-2 border-primary-500 text-primary-500'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('uploads')}
        >
          <Image size={20} className="inline mr-2" />
          My Uploads
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'liked'
              ? 'border-b-2 border-primary-500 text-primary-500'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('liked')}
        >
          <Heart size={20} className="inline mr-2" />
          Liked Memes
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'settings'
              ? 'border-b-2 border-primary-500 text-primary-500'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={20} className="inline mr-2" />
          Settings
        </button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'settings' ? (
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Notifications</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    New likes on your memes
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    New comments on your memes
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Newsletter and updates
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Privacy</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Show my profile to public
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Allow others to comment on my memes
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          dummyMemes.map((meme) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={meme.imageUrl}
                alt={meme.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{meme.title}</h3>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="flex items-center">
                    <Heart size={16} className="mr-1" />
                    {meme.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare size={16} className="mr-1" />
                    {meme.comments}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;