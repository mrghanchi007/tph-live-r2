import React from 'react';
import { FiPhone, FiGlobe } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4">
            <img 
              src="https://i.ibb.co/mVFdjH9M/footer-logo.png" 
              alt="The Planner Herbal International"
              className="h-12"
            />
          </div>
          
          {/* Contact Information */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold mb-2">The Planner Herbal International (TPH Int.)</h3>
            <div className="flex items-center justify-center space-x-4">
              <a 
                href="tel:03328888935" 
                className="flex items-center text-blue-300 hover:text-white"
              >
                <FiPhone className="mr-1" /> 0332-8888935
              </a>
              <a 
                href="https://www.tphint.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-300 hover:text-white"
              >
                <FiGlobe className="mr-1" /> www.tphint.com
              </a>
            </div>
          </div>

          {/* Copyright and Credits */}
          <div className="text-center text-sm text-gray-300">
            <p className="mb-1">© 2025 The Planner Herbal International (TPH Int.) | All rights reserved.</p>
            <p>
              Domain + Hosting + Design = 
              <a 
                href="https://www.account4web.ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline ml-1"
              >
                Account4Web Inc.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
