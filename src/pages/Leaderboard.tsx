import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ThumbsUp, MessageSquare } from 'lucide-react';

const dummyData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Epic Meme ${i + 1}`,
  author: `Memer${i + 1}`,
  likes: Math.floor(Math.random() * 10000),
  comments: Math.floor(Math.random() * 1000),
  imageUrl: `https://source.unsplash.com/random/400x300?sig=${i}`,
})).sort((a, b) => b.likes - a.likes);

const Leaderboard = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Trophy className="text-yellow-500 mr-2" size={32} />
            Meme Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Top trending memes of all time</p>
        </motion.div>
      </div>

      <div className="space-y-4">
        {dummyData.map((meme, index) => (
          <motion.div
            key={meme.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex items-center p-4">
              <div className="flex-shrink-0 w-16 text-center">
                <span className={`text-2xl font-bold ${index < 3 ? 'text-yellow-500' : 'text-gray-500'}`}>
                  #{index + 1}
                </span>
              </div>
              <div className="flex-shrink-0 w-24 h-24">
                <img
                  src={meme.imageUrl}
                  alt={meme.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-xl font-semibold mb-1">{meme.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  by {meme.author}
                </p>
                <div className="flex space-x-4">
                  <span className="flex items-center text-gray-600 dark:text-gray-400">
                    <ThumbsUp size={16} className="mr-1" />
                    {meme.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center text-gray-600 dark:text-gray-400">
                    <MessageSquare size={16} className="mr-1" />
                    {meme.comments.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;