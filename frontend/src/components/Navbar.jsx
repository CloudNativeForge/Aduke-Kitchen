import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, Phone } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - links to home */}
          <Link
            to="/"
            className="flex items-center space-x-2 group min-w-0 flex-shrink"
            onClick={() => window.scrollTo(0, 0)}
            aria-label="Aduke's Kitchen - Return to home"
          >
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold min-w-0">
              <span className="text-orange-600 group-hover:text-orange-700 transition-colors">Aduke's</span>
              <span className="text-gray-800 group-hover:text-gray-900 transition-colors"> Kitchen</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 hover:text-orange-600 relative group ${
                  location.pathname === link.path ? 'text-orange-600' : 'text-gray-700'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full ${
                    location.pathname === link.path ? 'w-full' : ''
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-orange-50 hover:text-orange-600 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-orange-50 hover:text-orange-600 transition-colors"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-orange-50 hover:text-orange-600 transition-colors relative"
              aria-label="Shopping cart (0 items)"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <a href="tel:+14374105630" aria-label="Order now by phone: +1 437 410 5630">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Order Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-200 shadow-lg" role="dialog" aria-label="Mobile navigation menu">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-orange-600'
                    : 'text-gray-700 hover:text-orange-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <a href="tel:+14374105630" className="block">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Order Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;