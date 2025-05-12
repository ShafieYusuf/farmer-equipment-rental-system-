import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Tractor, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Tractor size={28} className="text-green-500" />
              <span className="text-xl font-bold">FarmRent</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering modern farmers with access to premium agricultural equipment through our innovative rental platform.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-green-700 transition-colors duration-300 p-2 rounded-full"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-green-700 transition-colors duration-300 p-2 rounded-full"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-green-700 transition-colors duration-300 p-2 rounded-full"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-green-700 transition-colors duration-300 p-2 rounded-full"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/equipment" className="text-gray-400 hover:text-green-500 transition-colors duration-300 flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  Equipment Catalog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-500 transition-colors duration-300 flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-green-500 transition-colors duration-300 flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-green-500 transition-colors duration-300 flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  Login
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-green-500 transition-colors duration-300 flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  Farming Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Equipment Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Equipment Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/equipment?category=tractors" className="text-gray-400 hover:text-green-500 transition-colors duration-300 flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  Tractors
                </Link>
              </li>
              <li>
                <Link to="/equipment?category=harvesters" className="text-gray-400 hover:text-green-500 transition-colors duration-300 flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  Harvesters
                </Link>
              </li>
              <li>
                <Link to="/equipment?category=seeders" className="text-gray-400 hover:text-green-500 transition-colors duration-300 flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  Seeders
                </Link>
              </li>
              <li>
                <Link to="/equipment?category=irrigation" className="text-gray-400 hover:text-green-500 transition-colors duration-300 flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  Irrigation Systems
                </Link>
              </li>
              <li>
                <Link to="/equipment?category=drones" className="text-gray-400 hover:text-green-500 transition-colors duration-300 flex items-center">
                  <ArrowRight size={16} className="mr-2" />
                  Agricultural Drones
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Farmland Road<br />
                  Agriville, CA 94107<br />
                  United States
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-green-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@farmrent.com" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                  info@farmrent.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-6">
              Stay updated with the latest equipment additions and farming tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
                required
              />
              <button 
                type="submit" 
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} FarmRent. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-green-500 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-green-500 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/faq" className="text-gray-500 hover:text-green-500 transition-colors duration-300">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 