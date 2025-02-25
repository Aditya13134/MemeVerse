import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Heart, MessageSquare, Share2, Bookmark, SlidersHorizontal } from 'lucide-react';

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

// Generate dummy data for demonstration
const generateMemes = (count: number): Meme[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Epic Meme ${i + 1}`,
    imageUrl: `https://source.unsplash.com/random/800x600?meme&sig=${i}`,
    author: `Memer${i + 1}`,
    authorAvatar: `https://source.unsplash.com/random/100x100?avatar&sig=${i}`,
    likes: Math.floor(Math.random() * 10000),
    comments: Math.floor(Math.random() * 1000),
    timeAgo: ['2 minutes', '5 minutes', '15 minutes', '30 minutes', '1 hour', '2 hours', '3 hours', '4 hours'][i % 8],
    category: ['Funny', 'Gaming', 'Animals', 'Sports', 'Movies', 'Tech', 'Food', 'Art'][i % 8]
  }));
};

const Explorer = () => {
  const [memes, setMemes] = useState<Meme[]>(generateMemes(24));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'funny', 'gaming', 'animals', 'sports', 'movies', 'tech', 'food', 'art'];

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

  const filteredMemes = memes
    .filter(meme => 
      (meme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       meme.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === 'all' || meme.category.toLowerCase() === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return b.likes - a.likes;
      }
      return 0; // Keep original order for 'latest'
    });

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search memes or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-lg border dark:border-gray-700 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Filter size={20} />
              <span className="hidden md:inline">Filters</span>
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular')}
              className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4"
            >
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full capitalize ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white'
                        : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Meme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredMemes.map((meme, index) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
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

      {/* No Results */}
      {filteredMemes.length === 0 && (
        <div className="text-center py-12">
          <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No memes found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters to find what you're looking for
          </p>
        </div>
      )}
    </div>
  );
};

export default Explorer;