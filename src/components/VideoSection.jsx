import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlayCircle } = FiIcons;

const VideoSection = ({ videoId, title, subtitle, coverImage, videoTitle }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const heading = title || 'See B-Maxman in Action';
  const sub = subtitle || 'Watch how B-Maxman has transformed the lives of men across Pakistan';
  const poster = coverImage || 'https://i.ibb.co/XfW8gKyy/B-Maxman-Royal-Special-Treatment.png';
  const iframeTitle = videoTitle || 'B-Maxman Product Video';

  const handleLoadVideo = () => {
    setVideoLoaded(true);
    // Store user consent for YouTube cookies
    localStorage.setItem('youtube_consent', 'true');
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-red-700 to-red-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            {sub}
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-2xl">
            {!videoLoaded ? (
              <div 
                className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-xl flex flex-col items-center justify-center cursor-pointer"
                onClick={handleLoadVideo}
                style={{
                  backgroundImage: `url(${poster})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="bg-red-700/80 p-8 rounded-xl flex flex-col items-center max-w-md">
                  <SafeIcon icon={FiPlayCircle} className="text-white text-5xl mb-4" />
                  <p className="text-lg font-bold mb-2">Click to load video</p>
                  <p className="text-sm text-center">Loading the video will enable YouTube cookies. We respect your privacy.</p>
                </div>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                title={iframeTitle}
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          <div className="mt-8 bg-red-900/50 p-6 rounded-lg text-center">
            <p className="text-lg font-bold">
              Don't just take our word for it — see the real results for yourself!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;