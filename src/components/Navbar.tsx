import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun, Image, Trophy, Upload, User } from 'lucide-react';
import { toggleTheme } from '../store/themeSlice';
import type { RootState } from '../store';

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Image className="w-8 h-8" />
            <span className="text-xl font-bold">MemeVerse</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/explore" className="hover:text-blue-500 flex items-center space-x-1">
              <Image className="w-5 h-5" />
              <span>Explore</span>
            </Link>
            <Link to="/upload" className="hover:text-blue-500 flex items-center space-x-1">
              <Upload className="w-5 h-5" />
              <span>Upload</span>
            </Link>
            <Link to="/leaderboard" className="hover:text-blue-500 flex items-center space-x-1">
              <Trophy className="w-5 h-5" />
              <span>Leaderboard</span>
            </Link>
            <Link to="/profile" className="hover:text-blue-500 flex items-center space-x-1">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;