import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-deep-plum text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-rose-gold rounded-full flex items-center justify-center">
                <span className="text-cream font-bold text-sm">J</span>
              </div>
              <span className="font-heading text-xl font-semibold">Jewelia</span>
            </div>
            <p className="font-body text-sm text-cream/80">
              Exquisite jewelry crafted with love and precision. Each piece tells a unique story of elegance and sophistication.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream/60 hover:text-rose-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-cream/60 hover:text-rose-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-cream/60 hover:text-rose-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="font-body space-y-2">
              <li><Link to="/shop" className="text-cream/80 hover:text-rose-gold transition-colors">Shop All</Link></li>
              <li><Link to="/shop?category=rings" className="text-cream/80 hover:text-rose-gold transition-colors">Rings</Link></li>
              <li><Link to="/shop?category=necklaces" className="text-cream/80 hover:text-rose-gold transition-colors">Necklaces</Link></li>
              <li><Link to="/shop?category=earrings" className="text-cream/80 hover:text-rose-gold transition-colors">Earrings</Link></li>
              <li><Link to="/shop?category=bracelets" className="text-cream/80 hover:text-rose-gold transition-colors">Bracelets</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Customer Care</h3>
            <ul className="font-body space-y-2">
              <li><Link to="/contact" className="text-cream/80 hover:text-rose-gold transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-cream/80 hover:text-rose-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-cream/80 hover:text-rose-gold transition-colors">Care Instructions</a></li>
              <li><a href="#" className="text-cream/80 hover:text-rose-gold transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-cream/80 hover:text-rose-gold transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="font-body space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-rose-gold" />
                <span className="text-cream/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-rose-gold" />
                <span className="text-cream/80">hello@jewelia.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-rose-gold" />
                <span className="text-cream/80">123 Jewelry St, NYC</span>
              </div>
              <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full transition-colors">
                <MessageCircle size={16} />
                <span>WhatsApp Chat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-cream/20 mt-8 pt-8">
          <div className="flex flex-wrap justify-center items-center space-x-8 mb-6">
            <div className="flex items-center space-x-2 text-cream/60">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-body text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2 text-cream/60">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">↩</span>
              </div>
              <span className="font-body text-sm">Free Returns</span>
            </div>
            <div className="flex items-center space-x-2 text-cream/60">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">★</span>
              </div>
              <span className="font-body text-sm">Lifetime Warranty</span>
            </div>
          </div>
          <div className="text-center font-body text-cream/60 text-sm">
            © 2024 Jewelia. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;