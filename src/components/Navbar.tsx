import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    closeMobileMenu();
    navigate('/account');
  };
  
  const closeMobileMenu = () => setIsMenuOpen(false);

  // Link for the Heart icon now points directly to the wishlist tab
  const wishlistLink = "/account?tab=wishlist";

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-dusty-pink/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-rose-gold rounded-full flex items-center justify-center">
              <span className="text-cream font-bold text-sm">J</span>
            </div>
            <span className="font-heading text-xl font-semibold text-deep-plum">Jewelia</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-body text-deep-plum hover:text-rose-gold transition-colors">Home</Link>
            <Link to="/shop" className="font-body text-deep-plum hover:text-rose-gold transition-colors">Collections</Link>
            <Link to="/about" className="font-body text-deep-plum hover:text-rose-gold transition-colors">About</Link>
            <Link to="/contact" className="font-body text-deep-plum hover:text-rose-gold transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Toggle search" className="p-2 text-deep-plum hover:text-rose-gold transition-colors"><Search size={20} /></button>
            <button onClick={() => navigate('/account')} aria-label="Account" className="p-2 text-deep-plum hover:text-rose-gold transition-colors"><User size={20} /></button>
            <Link to={wishlistLink} aria-label="Wishlist" className="p-2 text-deep-plum hover:text-rose-gold transition-colors relative">
              <Heart size={20} />
              {wishlistItems.length > 0 && (<span className="absolute -top-1 -right-1 bg-rose-gold text-cream text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlistItems.length}</span>)}
            </Link>
            <Link to="/cart" aria-label="Shopping cart" className="p-2 text-deep-plum hover:text-rose-gold transition-colors relative">
              <ShoppingBag size={20} />
              {getTotalItems() > 0 && (<span className="absolute -top-1 -right-1 bg-rose-gold text-cream text-xs rounded-full w-5 h-5 flex items-center justify-center">{getTotalItems()}</span>)}
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu" className="md:hidden p-2 text-deep-plum hover:text-rose-gold transition-colors">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>

        {isSearchOpen && (
          <div className="py-4 border-t border-dusty-pink/20 animate-slideUp">
            <div className="relative"><input type="text" placeholder="Search jewelry..." className="w-full px-4 py-2 pl-10 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50 bg-white" /><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /></div>
          </div>
        )}

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-dusty-pink/20 animate-slideUp">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={closeMobileMenu} className="font-body text-deep-plum hover:text-rose-gold transition-colors">Home</Link>
              <Link to="/shop" onClick={closeMobileMenu} className="font-body text-deep-plum hover:text-rose-gold transition-colors">Collections</Link>
              <Link to="/about" onClick={closeMobileMenu} className="font-body text-deep-plum hover:text-rose-gold transition-colors">About</Link>
              <Link to="/contact" onClick={closeMobileMenu} className="font-body text-deep-plum hover:text-rose-gold transition-colors">Contact</Link>
              <div className="flex items-center space-x-4 pt-4 border-t border-dusty-pink/20">
                <button onClick={handleAuthClick} className="p-2 text-deep-plum hover:text-rose-gold transition-colors"><User size={20} /></button>
                <Link to={wishlistLink} onClick={closeMobileMenu} className="p-2 text-deep-plum hover:text-rose-gold transition-colors relative">
                  <Heart size={20} />
                  {wishlistItems.length > 0 && (<span className="absolute -top-1 -right-1 bg-rose-gold text-cream text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlistItems.length}</span>)}
                </Link>
                <Link to="/cart" onClick={closeMobileMenu} className="p-2 text-deep-plum hover:text-rose-gold transition-colors relative">
                  <ShoppingBag size={20} />
                  {getTotalItems() > 0 && (<span className="absolute -top-1 -right-1 bg-rose-gold text-cream text-xs rounded-full w-5 h-5 flex items-center justify-center">{getTotalItems()}</span>)}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;