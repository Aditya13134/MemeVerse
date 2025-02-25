import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Oops! This meme has ascended to another dimension.</p>
        <img
          src="https://images.unsplash.com/photo-1531928351158-2f736078e0a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="Confused cat"
          className="mx-auto rounded-lg shadow-lg mb-8"
        />
        <Link
          to="/"
          className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
        >
          Take Me Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;