import React from 'react';
import { Sprout, Menu, X, Globe, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <Sprout className="h-8 w-8 text-yellow-300" />
                <span className="text-xl font-bold tracking-tight">FarmBuddy</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="hover:text-yellow-200 transition">Home</Link>
              <Link to="/about" className="hover:text-yellow-200 transition">About</Link>
              <div className="flex items-center space-x-1 bg-green-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-600 transition">
                <Globe className="h-4 w-4" />
                <span>English</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="focus:outline-none">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-green-800 pb-4">
            <Link to="/" onClick={toggleMenu} className="block px-4 py-2 hover:bg-green-700">Home</Link>
            <Link to="/about" onClick={toggleMenu} className="block px-4 py-2 hover:bg-green-700">About</Link>
            <button className="w-full text-left px-4 py-2 hover:bg-green-700 flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Change Language</span>
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center sm:text-left sm:flex sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-white font-bold text-lg flex items-center gap-2 justify-center sm:justify-start">
               <Sprout className="h-5 w-5 text-yellow-500" /> FarmBuddy
            </h3>
            <p className="text-sm mt-2 max-w-xs mx-auto sm:mx-0">
              Making government subsidies simple and accessible for every Indian farmer.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p>&copy; 2024 FarmBuddy. All rights reserved.</p>
            <div className="flex space-x-4 justify-center sm:justify-end">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;