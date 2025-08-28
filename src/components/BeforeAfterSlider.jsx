import React from 'react';
import { motion } from 'framer-motion';

const BeforeAfterSlider = ({ sets, labels }) => {
  // Defaults (B-Maxman) - used if no overrides provided
  const text = {
    beforeTitle: labels?.beforeTitle || "Before B-Maxman",
    afterTitle: labels?.afterTitle || "After B-Maxman",
    beforeDesc: labels?.beforeDesc || "Low energy, poor confidence, marital issues",
    afterDesc: labels?.afterDesc || "Renewed vigor, strong performance, happy relationship",
    weeks: labels?.weeks || "weeks of use",
    weeksPrefix: labels?.weeksPrefix || "",
    weeksSuffix: labels?.weeksSuffix || " weeks of use"
  };

  // Default image sets if none provided
  const beforeAfterSets = sets && sets.length > 0 ? sets : [
    {
      id: 1,
      before: "https://i.ibb.co/jkL8jMSD/4-weeks-of-use-before.png",
      after: "https://i.ibb.co/wZv0HbkQ/4-weeks-of-use-after.png",
      duration: 4,
      summary: undefined
    },
    {
      id: 2,
      before: "https://i.ibb.co/mF5hBPvS/8-weeks-of-use-before.png",
      after: "https://i.ibb.co/hFNk6zTv/8-weeks-of-use-after.png",
      duration: 8,
      summary: undefined
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {beforeAfterSets.map((set) => (
          <motion.div
            key={set.id}
            className="bg-white/10 p-4 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-4">
              <span className="text-yellow-400 font-bold">{text.weeksPrefix}{set.duration}{text.weeksSuffix}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div className="text-center">
                <div className="relative">
                  <img
                    src={set.before}
                    alt={`Before - ${set.duration} weeks`}
                    className="w-full h-60 object-cover rounded-lg mb-2 grayscale"
                    loading="lazy"
                    width="240"
                    height="240"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' text-anchor='middle' fill='%236b7280'%3EBefore Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute top-0 left-0 bg-red-700/80 px-2 py-1 rounded-br text-sm">
                    {text.beforeTitle}
                  </div>
                </div>
                <p className="text-sm text-gray-300">{text.beforeDesc}</p>
              </div>
              {/* After */}
              <div className="text-center">
                <div className="relative">
                  <img
                    src={set.after}
                    alt={`After - ${set.duration} weeks`}
                    className="w-full h-60 object-cover rounded-lg mb-2"
                    loading="lazy"
                    width="240"
                    height="240"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' fill='%23dcfce7'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' text-anchor='middle' fill='%2316a34a'%3EAfter Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute top-0 left-0 bg-green-600/80 px-2 py-1 rounded-br text-sm">
                    {text.afterTitle}
                  </div>
                </div>
                <p className="text-sm text-gray-300">{text.afterDesc}</p>
              </div>
            </div>
            {set.summary && (
              <div className="mt-3 text-center text-sm text-gray-100 bg-black/20 rounded p-2">
                {set.summary}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BeforeAfterSlider;