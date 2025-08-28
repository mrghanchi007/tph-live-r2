import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiSettings } = FiIcons;

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true, // Always true and cannot be changed
    analytics: false,
    marketing: false,
    preferences: false,
    thirdParty: false
  });

  useEffect(() => {
    // Check if user already consented
    const hasConsent = localStorage.getItem('cookie_consent') === 'true';
    
    if (!hasConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    // Add scroll listener for implicit consent
    const handleScroll = () => {
      if (window.scrollY > 300) {
        acceptCookies('scroll');
      }
    };
    
    if (!hasConsent) {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const acceptCookies = (method = 'click') => {
    // Save all cookie preferences
    localStorage.setItem('cookie_consent', 'true');
    localStorage.setItem('cookie_consent_method', method);
    localStorage.setItem('cookie_settings', JSON.stringify(cookieSettings));
    setShowBanner(false);
  };
  
  const acceptSelectedCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    localStorage.setItem('cookie_consent_method', 'selected');
    localStorage.setItem('cookie_settings', JSON.stringify(cookieSettings));
    setShowBanner(false);
  };
  
  const declineCookies = () => {
    // Only necessary cookies
    localStorage.setItem('cookie_consent', 'false');
    localStorage.setItem('cookie_settings', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      thirdParty: false
    }));
    setShowBanner(false);
  };

  const handleCookieToggle = (type) => {
    setCookieSettings({
      ...cookieSettings,
      [type]: !cookieSettings[type]
    });
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 p-4 md:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">Cookie Notice</h3>
                <p className="text-sm text-gray-600">
                  We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                  Some features like videos require third-party cookies from YouTube.
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="px-4 py-2 text-sm flex items-center gap-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <SafeIcon icon={FiSettings} />
                  <span>Cookie Settings</span>
                </button>
                <button 
                  onClick={declineCookies}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Decline
                </button>
                <button 
                  onClick={() => acceptCookies('click')}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Accept All Cookies
                </button>
              </div>
            </div>
            
            {showDetails && (
              <motion.div 
                className="bg-gray-50 p-4 rounded-md mt-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h4 className="font-semibold mb-3">Customize Cookie Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Necessary Cookies</p>
                      <p className="text-xs text-gray-500">Required for the website to function properly</p>
                    </div>
                    <div className="bg-gray-200 px-3 py-1 rounded text-xs">Always Active</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Analytics Cookies</p>
                      <p className="text-xs text-gray-500">Help us improve our website by collecting anonymous usage information</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={cookieSettings.analytics}
                        onChange={() => handleCookieToggle('analytics')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Third-Party Cookies (YouTube)</p>
                      <p className="text-xs text-gray-500">Allow YouTube videos to be played directly on our website</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={cookieSettings.thirdParty}
                        onChange={() => handleCookieToggle('thirdParty')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={acceptSelectedCookies}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}
            
            <button 
              onClick={declineCookies} 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <SafeIcon icon={FiX} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;