import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-lg font-bold">MemeVerse</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Share and enjoy the best memes on the internet
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com" className="hover:text-blue-500">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" className="hover:text-blue-500">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} MemeVerse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;