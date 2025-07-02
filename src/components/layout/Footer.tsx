import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Free Student Union</h3>
            <div className="flex items-center mb-4">
              <img
                src="/fsu_logo.jpg"
                alt="FSU Logo"
                className="h-12 w-auto mr-3 bg-white rounded p-1"
              />
              <div className="leading-tight">
                <span className="text-lg block">FSU</span>
                <span className="text-sm block text-gray-400">Thapathali Campus</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Official body representing students of Thapathali Campus, Institute of Engineering, Nepal.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/notices" className="text-gray-400 hover:text-white transition-colors">Notices</Link>
              </li>
              <li>
                <Link to="/suggestions" className="text-gray-400 hover:text-white transition-colors">Suggestions</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Important Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://tcioe.edu.np/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Thapathali Campus</a>
              </li>
              <li>
                <a href="https://ioe.edu.np/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">IOE</a>
              </li>
              <li>
                <a href="https://tu.edu.np/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Tribhuvan University</a>
              </li>
              <li>
                <a href="https://nec.gov.np/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Nepal Engineering Council</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Thapathali, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">+977 9867355869</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">fsu@tcioe.edu.np</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Free Student Union, Thapathali Campus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;