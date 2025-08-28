import React from 'react';
import { motion } from 'framer-motion';

const HerbalPowerSection = ({ language = 'en', title, subtitle, bullets = [], badgesLine, badgesLanguage, showIngredients = true, customColumns, ingredients, oneRowLayout = false }) => {

  const herbalIngredients = {
    en: [
      {
        name: "Saffron / Kesar",
        description: "Natural testosterone booster",
        image: "/images/Sarffron.png",
        alt: "Sarffron herbal supplement for natural testosterone boosting and male vitality",
        seoDescription: "Premium Sarffron extract known for boosting natural testosterone levels and enhancing male performance"
      },
      {
        name: "Maca Root",
        description: "Improves fertility & energy",
        image: "/images/Maca Root.png",
        alt: "Maca Root superfood for fertility enhancement and natural energy boost",
        seoDescription: "Organic Maca Root powder that naturally improves fertility, energy levels and overall vitality"
      },
      {
        name: "Ashwagandha",
        description: "Reduces stress, boosts strength",
        image: "/images/Ashwagandha.png",
        alt: "Ashwagandha adaptogenic herb for stress reduction and strength enhancement",
        seoDescription: "Pure Ashwagandha extract that reduces cortisol stress levels while boosting physical strength"
      },
      {
        name: "Safed Musli",
        description: "Enhances performance",
        image: "/images/Safed Musli.png",
        alt: "Safed Musli ayurvedic herb for performance enhancement and stamina",
        seoDescription: "Traditional Safed Musli root extract for enhanced physical performance and endurance"
      },
      {
        name: "Shilajit",
        description: "Ultimate strength & stamina",
        image: "/images/Shilajit.png",
        alt: "Pure Shilajit mineral supplement for ultimate strength and stamina boost",
        seoDescription: "Himalayan Shilajit resin rich in fulvic acid for maximum strength, stamina and energy"
      },
      {
        name: "Korean Red Ginseng",
        description: "Physical & mental endurance",
        image: "/images/Korean Red Ginseng.png",
        alt: "Korean Red Ginseng root for physical and mental endurance enhancement",
        seoDescription: "Premium Korean Red Ginseng extract for improved physical stamina and mental clarity"
      }
    ],
    ur: [
      {
        name: "زعفران / کیسر",
        description: "قدرتی ٹیسٹوسٹیرون بوسٹر",
        image: "/images/Sarffron.png",
        alt: "Sarffron herbal supplement for natural testosterone boosting and male vitality",
        seoDescription: "Premium Sarffron extract known for boosting natural testosterone levels and enhancing male performance"
      },
      {
        name: "ماکا روٹ",
        description: "زرخیزی اور توانائی بہتر بناتا ہے",
        image: "/images/Maca Root.png",
        alt: "Maca Root superfood for fertility enhancement and natural energy boost",
        seoDescription: "Organic Maca Root powder that naturally improves fertility, energy levels and overall vitality"
      },
      {
        name: "اشوگندھا",
        description: "تناؤ کم کرتا ہے، طاقت بڑھاتا ہے",
        image: "/images/Ashwagandha.png",
        alt: "Ashwagandha adaptogenic herb for stress reduction and strength enhancement",
        seoDescription: "Pure Ashwagandha extract that reduces cortisol stress levels while boosting physical strength"
      },
      {
        name: "سفید مصلی",
        description: "کارکردگی بہتر بناتا ہے",
        image: "/images/Safed Musli.png",
        alt: "Safed Musli ayurvedic herb for performance enhancement and stamina",
        seoDescription: "Traditional Safed Musli root extract for enhanced physical performance and endurance"
      },
      {
        name: "شلاجیت",
        description: "حتمی طاقت اور برداشت",
        image: "/images/Shilajit.png",
        alt: "Pure Shilajit mineral supplement for ultimate strength and stamina boost",
        seoDescription: "Himalayan Shilajit resin rich in fulvic acid for maximum strength, stamina and energy"
      },
      {
        name: "کوریائی سرخ جنسنگ",
        description: "جسمانی اور ذہنی برداشت",
        image: "/images/Korean Red Ginseng.png",
        alt: "Korean Red Ginseng root for physical and mental endurance enhancement",
        seoDescription: "Premium Korean Red Ginseng extract for improved physical stamina and mental clarity"
      }
    ]
  };

  const content = {
    en: {
      title: "🌿 Herbal Power. Backed by Science.",
      subtitle: "A potent blend of 30+ world-renowned herbal ingredients, trusted for centuries",
      natural: "🌿 100% Natural • ⚗️ Scientifically Proven • 🛡️ Safe & Effective",
      quality: "Each ingredient is carefully selected and tested for maximum potency"
    },
    ur: {
      title: "🌿 جڑی بوٹیوں کی طاقت۔ سائنس سے ثابت شدہ۔",
      subtitle: "۳۰+ عالمی شہرت یافتہ جڑی بوٹیوں کا طاقتور امتزاج، صدیوں سے قابل اعتماد",
      natural: "🌿 ۱۰۰٪ قدرتی • ⚗️ سائنسی طور پر ثابت شدہ • 🛡️ محفوظ اور مؤثر",
      quality: "ہر جزو کو احتیاط سے منتخب کیا گیا ہے اور زیادہ سے زیادہ طاقت کے لیے ٹیسٹ کیا گیا ہے"
    }
  };

  // ... (rest of the code remains the same)

  const currentContent = content[language];
  // Use custom ingredients if provided, otherwise use default herbal ingredients
  const currentIngredients = ingredients || herbalIngredients[language];
  const effectiveBadgesLang = badgesLanguage ?? language;
  const badgesContent = content[effectiveBadgesLang];

  // ... (rest of the code remains the same)

  return (
    <section
      className={`py-12 md:py-16 bg-gradient-to-br from-green-50 to-emerald-50 ${language === 'ur' ? 'font-urdu' : ''}`}
      aria-labelledby="herbal-power-heading"
      role="region"
      dir={language === 'ur' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="herbal-power-heading"
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            title="Natural herbal supplements backed by scientific research"
          >
            {title
              ? title
              : language === 'en'
                ? (
                  <>🌿 Herbal Power. <span className="text-green-600">Backed by Science.</span></>
                )
                : (
                  <>🌿 جڑی بوٹیوں کی طاقت۔ <span className="text-green-600">سائنس سے ثابت شدہ۔</span></>
                )}
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            title="Premium herbal formula combining traditional wisdom with modern science"
          >
            {subtitle || currentContent.subtitle}
          </p>
        </motion.header>

        {/* Science-backed bullet points (optional) */}
        {Array.isArray(bullets) && bullets.length > 0 && (
          <motion.ul
            className="max-w-3xl mx-auto mb-10 grid gap-3 text-gray-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            role="list"
          >
            {bullets.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-white/80 border border-green-100 rounded-lg p-3"
              >
                <span aria-hidden className="text-green-600 text-xl leading-none">✔</span>
                <span className="text-base">{point}</span>
              </li>
            ))}
          </motion.ul>
        )}

        {/* Custom 3-column content (if provided) */}
        {Array.isArray(customColumns) && customColumns.length > 0 && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {customColumns.map((col, idx) => (
                <motion.article
                  key={idx}
                  className="bg-white border border-green-100 rounded-xl p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <h3 className="text-lg font-bold text-green-700 mb-2">{col.title}</h3>
                  {col.description && (
                    <p className="text-gray-700 mb-4">{col.description}</p>
                  )}
                  {Array.isArray(col.points) && col.points.length > 0 && (
                    <ul className="space-y-2 text-gray-800">
                      {col.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✅</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients Grid (optional; hidden when customColumns provided) */}
        {showIngredients && (!customColumns || customColumns.length === 0) && (
          <div className="flex flex-col items-center">
            {oneRowLayout ? (
              // Single-row layout (6 columns on md+)
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 max-w-7xl mx-auto">
                {currentIngredients.map((ingredient, index) => (
                  <motion.article
                    key={index}
                    className="flex flex-col items-center text-center group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    role="article"
                    aria-labelledby={`ingredient-${index}`}
                  >
                    {/* Round Image Container with 2px red border */}
                    <div className="relative mx-auto mb-4 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                      <div className="w-full h-full rounded-full border-2 border-red-500 bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden">
                        <img
                          src={ingredient.image}
                          alt={ingredient.alt}
                          title={ingredient.seoDescription}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width="128"
                          height="128"
                        />
                      </div>
                      {/* Decorative glow */}
                      <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:opacity-20 transition-opacity blur-lg"></div>
                    </div>

                    {/* Text Content - Centered below image */}
                    <div className="space-y-2 max-w-[120px] md:max-w-[140px]">
                      <h3
                        id={`ingredient-${index}`}
                        className="font-bold text-sm md:text-base text-gray-800 group-hover:text-green-600 transition-colors leading-tight"
                        title={`${ingredient.name} - ${ingredient.seoDescription}`}
                      >
                        {ingredient.name}
                      </h3>
                      <p
                        className="text-xs md:text-sm text-gray-600 leading-relaxed"
                        title={ingredient.seoDescription}
                      >
                        {ingredient.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {/* First row - 3 ingredients */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                  {currentIngredients.slice(0, 3).map((ingredient, index) => (
                    <motion.article
                      key={index}
                      className="flex flex-col items-center text-center group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      role="article"
                      aria-labelledby={`ingredient-${index}`}
                    >
                      {/* Round Image Container with 2px red border */}
                      <div className="relative mx-auto mb-4 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                        <div className="w-full h-full rounded-full border-2 border-red-500 bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden">
                          <img
                            src={ingredient.image}
                            alt={ingredient.alt}
                            title={ingredient.seoDescription}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            width="128"
                            height="128"
                          />
                        </div>
                        {/* Decorative glow */}
                        <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:opacity-20 transition-opacity blur-lg"></div>
                      </div>

                      {/* Text Content - Centered below image */}
                      <div className="space-y-2 max-w-[120px] md:max-w-[140px]">
                        <h3
                          id={`ingredient-${index}`}
                          className="font-bold text-sm md:text-base text-gray-800 group-hover:text-green-600 transition-colors leading-tight"
                          title={`${ingredient.name} - ${ingredient.seoDescription}`}
                        >
                          {ingredient.name}
                        </h3>
                        <p
                          className="text-xs md:text-sm text-gray-600 leading-relaxed"
                          title={ingredient.seoDescription}
                        >
                          {ingredient.description}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Second row - 4 ingredients */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
                  {currentIngredients.slice(3).map((ingredient, index) => (
                    <motion.article
                      key={index + 3}
                      className="flex flex-col items-center text-center group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      role="article"
                      aria-labelledby={`ingredient-${index + 3}`}
                    >
                      {/* Round Image Container with 2px red border */}
                      <div className="relative mx-auto mb-4 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                        <div className="w-full h-full rounded-full border-2 border-red-500 bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden">
                          <img
                            src={ingredient.image}
                            alt={ingredient.alt}
                            title={ingredient.seoDescription}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            width="128"
                            height="128"
                          />
                        </div>
                        {/* Decorative glow */}
                        <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:opacity-20 transition-opacity blur-lg"></div>
                      </div>

                      {/* Text Content - Centered below image */}
                      <div className="space-y-2 max-w-[120px] md:max-w-[140px]">
                        <h3
                          id={`ingredient-${index + 3}`}
                          className="font-bold text-sm md:text-base text-gray-800 group-hover:text-green-600 transition-colors leading-tight"
                          title={`${ingredient.name} - ${ingredient.seoDescription}`}
                        >
                          {ingredient.name}
                        </h3>
                        <p
                          className="text-xs md:text-sm text-gray-600 leading-relaxed"
                          title={ingredient.seoDescription}
                        >
                          {ingredient.description}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.aside
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          role="complementary"
          aria-label="Product quality assurance"
        >
          <div
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-2xl mx-auto border border-green-100"
            title="Quality assurance for herbal supplements"
          >
            <div dir={effectiveBadgesLang === 'ur' ? 'rtl' : 'ltr'} className={`${effectiveBadgesLang === 'ur' ? 'font-urdu' : ''}`}>
              <p
                className="text-lg md:text-xl font-semibold text-gray-800 mb-2"
                title="100% natural scientifically proven safe and effective herbal supplements"
              >
                {badgesLine || badgesContent.natural}
              </p>
              <p
                className="text-green-600 font-medium"
                title="Premium quality herbal ingredients tested for maximum potency and effectiveness"
              >
                {badgesContent.quality}
              </p>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default HerbalPowerSection;