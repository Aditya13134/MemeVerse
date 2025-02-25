import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Share2, Bookmark, TrendingUp, Clock, Siren as Fire } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { RootState } from '../store';

interface Meme {
  id: number;
  title: string;
  imageUrl: string;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  timeAgo: string;
  category: string;
}

const recentMemes: Meme[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Epic Meme ${i + 1}`,
  imageUrl: `https://source.unsplash.com/random/800x600?meme&sig=${i}`,
  author: `Memer${i + 1}`,
  authorAvatar: `https://source.unsplash.com/random/100x100?avatar&sig=${i}`,
  likes: Math.floor(Math.random() * 5000),
  comments: Math.floor(Math.random() * 500),
  timeAgo: ['2 minutes', '5 minutes', '15 minutes', '30 minutes', '1 hour', '2 hours', '3 hours', '4 hours'][i],
  category: ['Funny', 'Gaming', 'Animals', 'Sports', 'Movies', 'Tech', 'Food', 'Art'][i]
}));

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const { trending, status } = useSelector((state: RootState) => state.memes);

  const handleLike = (id: number) => {
    setLiked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSave = (id: number) => {
    setSaved(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const categories = ['all', 'funny', 'gaming', 'animals', 'sports', 'movies', 'tech'];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome to MemeVerse
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Your daily source of laughter and internet culture. Join our community of meme enthusiasts!
          </motion.p>
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link 
              to="/upload"
              className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
            >
              Start Creating
            </Link>
            <Link
              to="/explore"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Explore Memes
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full capitalize whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Recent Uploads */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="text-primary-500" />
            Recent Uploads
          </h2>
          <Link to="/explore" className="text-primary-500 hover:text-primary-600 font-medium">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {recentMemes.map((meme, index) => (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={meme.imageUrl}
                    alt={meme.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {meme.category}
                  </span>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={meme.authorAvatar}
                      alt={meme.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{meme.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{meme.timeAgo} ago</p>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-3">{meme.title}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleLike(meme.id)}
                        className={`flex items-center gap-1 ${
                          liked.has(meme.id) ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <Heart size={18} fill={liked.has(meme.id) ? 'currentColor' : 'none'} />
                        {meme.likes + (liked.has(meme.id) ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <MessageSquare size={18} />
                        {meme.comments}
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                        <Share2 size={18} />
                      </button>
                      <button
                        onClick={() => handleSave(meme.id)}
                        className={saved.has(meme.id) ? 'text-primary-500' : 'text-gray-600 dark:text-gray-400'}
                      >
                        <Bookmark size={18} fill={saved.has(meme.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Trending Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-primary-500" />
            Trending Now
          </h2>
          <Link to="/explore" className="text-primary-500 hover:text-primary-600 font-medium">
            See More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {status === 'loading' ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            </div>
          ) : (
            trending.slice(0, 6).map((meme) => (
              <motion.div
                key={meme.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img src={meme.url} alt={meme.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{meme.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Fire className="text-orange-500" size={18} />
                      {meme.likes || 0} likes
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <MessageSquare size={18} />
                      {meme.comments?.length || 0}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;