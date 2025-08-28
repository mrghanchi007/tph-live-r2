import React, { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';
import './App.css';
import { englishContent, urduContent } from './translations';


// Lazy-loaded components
const TestimonialSlider = lazy(() => import('./components/TestimonialSlider'));
const BeforeAfterSlider = lazy(() => import('./components/BeforeAfterSlider'));
const VideoSection = lazy(() => import('./components/VideoSection'));
const HerbalPowerSection = lazy(() => import('./components/HerbalPowerSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));

const { FiPhone, FiShoppingCart, FiCheck, FiStar, FiShield, FiTruck, FiClock, FiHeart, FiZap, FiAward, FiGlobe, FiChevronUp } = FiIcons;

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-red-200 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-red-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-red-200 rounded"></div>
          <div className="h-4 bg-red-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    quantity: '1'
  });
  const [language, setLanguage] = useState('en'); // 'en' for English, 'ur' for Urdu
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // Get current product from URL
  const { slug } = useParams();

  // Product configurations
  const productConfigs = {
    'b-maxman-royal-special-treatment': {
      title: 'B-Maxman Royal Special Treatment',
      subtitle: 'Premium herbal formula for enhanced performance and vitality',
      badge: 'BEST SELLER',
      solution: 'B-Maxman Royal Special Treatment is the ultimate solution you\'ve been looking for!',
      benefitsTitle: language === 'en' ? 'Benefits of B-Maxman Royal Special Treatment' : 'بی میکس مین رائل سپیشل ٹریٹمنٹ کے فوائد',
      i18n: {
        ur: {
          // Problems section line override (Urdu only for this product)
          solution: 'بی میکس مین رائل اسپیشل ٹریٹمنٹ وہ بہترین حل ہے جس کی آپ تلاش کر رہے تھے!'
        }
      }
    },
    'b-maxtime-super-active': {
      title: 'B-Maxtime Super Active',
      subtitle: 'Instant Power, Lasting Confidence',
      badge: 'BEST SELLER',
      solution: 'B-Maxtime Super Active is the natural solution you\'ve been looking for!',
      benefitsTitle: language === 'en' ? 'Benefits of B-Maxtime Super Active' : 'بی میکس ٹائم سپر ایکٹو کے فوائد',
      // Page hero image (only for this product)
      heroImage: 'https://i.ibb.co/HLKYt3XP/Slim-n-Shape-Herbal-Tea.png',
      // Video section cover (only for this product)
      videoCover: 'https://i.ibb.co/wFpDYw3b/B-Maxtime-Super-Active-Video.png',
      // Hero overrides (page specific)
      specialPriceAmount: '1,200 (10 Capsules)',
      features: [
        'Boost quick stamina & vitality',
        'Restore lost passion & libido',
        '100% Herbal & Safe Formula',
        'Instant results with lasting control',
        'Trusted by thousands of men'
      ],
      // Video Section headings (EN)
      videoTitle: 'See B-Maxtime Super Active in Action',
      videoSubtitle: 'Watch how B-Maxtime Super Active has transformed the lives of men across Pakistan',
      // Before & After (Real Results) - overrides
      beforeAfterTitle: 'Real Results, Real People',
      beforeAfterSubtitle: 'See the difference B-Maxtime Super Active has made in the lives of men across Pakistan.',
      beforeAfterLabels: {
        beforeTitle: 'Before B-Maxtime Super Active',
        afterTitle: 'After B-Maxtime Super Active',
        beforeDesc: 'Low stamina, poor confidence, weak performance',
        afterDesc: 'Increased energy, boosted confidence, visible performance',
        weeksPrefix: '',
        weeksSuffix: ' Weeks of Use'
      },
      beforeAfterSets: [
        {
          id: 1,
          duration: 4,
          // Using default images from component when URLs are not provided
          before: 'https://i.ibb.co/1t6zhmrX/4-weeks-of-use-Before-B-Maxtime-Super-Active.png',
          after: 'https://i.ibb.co/fVYdKZm5/4-weeks-of-use-After-B-Maxtime-Super-Active.png',
          summary: 'Before: Low stamina, poor confidence, weak performance | After: Increased energy, boosted confidence, visible performance'
        },
        {
          id: 2,
          duration: 8,
          before: 'https://i.ibb.co/sJjY6ZbM/8-weeks-of-use-Before-B-Maxtime-Super-Active.png',
          after: 'https://i.ibb.co/3y3DdwwN/8-weeks-of-use-After-B-Maxtime-Super-Active.png',
          summary: 'Before: Fatigue, lack of focus, relationship stress | After: Full vitality, strong stamina, happy lifestyle'
        }
      ],
      // Herbal Power / Ingredients (3-column custom)
      herbalSection: {
        title: 'Ingredients / Backed by Science',
        subtitle: undefined,
        showIngredients: false,
        customColumns: [
          {
            title: 'Catuba Bark',
            description: 'Brazilian aphrodisiac – boosts libido, reduces fatigue, improves mood & memory.'
          },
          {
            title: 'Damiana',
            description: 'Mayan herb – enhances blood flow, supports erection, relieves depression & nervousness.'
          },
          {
            title: 'Yohimbe Bark',
            description: 'African powerhouse – sustains erection, boosts stamina, enhances circulation & libido.'
          }
        ]
      },
      // Common Problems (EN)
      problemsTitle: 'Common Problems in Men',
      problemsSubtitle: undefined,
      problemsList: [
        'Weak erection & low stamina',
        'Premature ejaculation',
        'Erectile dysfunction (E.D)',
        'Low desire & poor performance',
        'Lack of confidence',
        'Fatigue & reduced vigor'
      ],
      // Benefits (EN) + Image for 2-column layout
      benefitsImage: '/images/B-Maxtime Super Active.png',
      benefitsList: [
        'Quick stamina & long-lasting performance',
        'Strong erections with full control',
        'Blissful, electrifying experience',
        'Improved blood circulation',
        '100% Herbal & No Side Effects',
        'Safe for Diabetic & BP Patients'
      ],
      // Dosage & Usage (EN)
      usage: {
        title: 'Dosage & Usage Instructions',
        dosage: { text: 'Take 1 capsule with warm milk 2 hours before activity.' },
        course: undefined,
        best: undefined
      },
      // Product-specific testimonials (EN; slider uses English text)
      testimonials: [
        {
          id: 1,
          name: 'Ahsan R.',
          age: 34,
          location: 'Lahore',
          rating: 5,
          text: '3 weeks me noticeable farq. Energy zyada, control behtareen. B-Maxtime Super Active ne meri confidence wapas dila di.'
        },
        {
          id: 2,
          name: 'Imran K.',
          age: 41,
          location: 'Karachi',
          rating: 5,
          text: 'Initially skeptical tha, lekin 4th week tak stamina aur mood dono improved. No side effects — highly recommend.'
        },
        {
          id: 3,
          name: 'Usman S.',
          age: 29,
          location: 'Islamabad',
          rating: 4,
          text: 'Quick boost milta hai aur lasting control bhi. Partner bhi khush — overall great experience.'
        }
      ],
      // Pricing (EN) - Affordable Packages for this product only
      pricing: {
        title: 'Affordable Packages',
        subtitle: 'Choose the pack that works best for you:',
        packages: [
          {
            title: '1 Pack (10 Capsules) – Rs. 1200',
            headerTitle: '1 Pack',
            price: 1200,
            features: [
              '10 Capsules',
              'Cash on Delivery',
              'Free Consultation'
            ]
          },
          {
            title: '2 Packs – Rs. 2000',
            headerTitle: '2 Packs',
            price: 2000,
            features: [
              '20 Capsules',
              'Cash on Delivery',
              'Free Consultation'
            ]
          },
          {
            title: '3 Packs – Rs. 3000',
            headerTitle: '3 Packs',
            price: 3000,
            features: [
              '30 Capsules',
              'Cash on Delivery',
              'Free Consultation'
            ]
          }
        ]
      },
      // FAQ (EN) — only for this product
      faqTitle: 'FAQs – B-Maxtime Super Active',
      faqSubtitle: undefined,
      faqs: [
        { question: 'What is B-Maxtime Super Active used for?', answer: 'These capsules naturally boost stamina, energy, and overall performance.' },
        { question: 'Any side effects?', answer: 'It is a 100% herbal and safe formula with no harmful side effects.' },
        { question: 'How to take it?', answer: 'Take 1–2 capsules daily with water, as per doctor’s advice or on-pack instructions.' },
        { question: 'How soon will I see results?', answer: 'With regular use, noticeable results usually appear within 3–4 weeks.' },
        { question: 'Is it suitable for all age groups?', answer: 'It is safe for adults 18 years and above.' },
        { question: 'Can I use it with other medicines?', answer: 'If you are under medical treatment, please consult your doctor before use.' },
        { question: 'Are the results permanent?', answer: 'Regular use helps naturally improve lifestyle and stamina; consistency is important to maintain results.' },
        { question: 'Is B-Maxtime Super Active available in Pakistan?', answer: 'Yes, it is available nationwide with delivery across Pakistan.' },
        { question: 'How long does one bottle last?', answer: 'One bottle contains capsules that typically last around 30 days on average.' },
        { question: 'How can I place an order?', answer: 'Click the “Order Now” button on the website or call our helpline to place your order.' }
      ],
      // Urdu translations (UR) — only for this product
      i18n: {
        ur: {
          herbalSection: {
            title: 'اجزاء / سائنسی طور پر ثابت شدہ',
            subtitle: undefined,
            customColumns: [
              {
                title: 'کاٹوبا بارک',
                description: 'برازیلی جڑی بوٹی — خواہش بڑھائے، تھکاوٹ کم کرے، موڈ اور یادداشت بہتر کرے۔'
              },
              {
                title: 'ڈیمِیانا',
                description: 'مایان جڑی بوٹی — خون کی روانی بہتر، اریکشن میں مدد، ڈپریشن اور گھبراہٹ میں کمی۔'
              },
              {
                title: 'یوہِمبے بارک',
                description: 'افریقی طاقت — مضبوط اریکشن برقرار، اسٹیمنا میں اضافہ، دورانِ خون اور خواہش بہتر۔'
              }
            ]
          },
          // Benefits (UR)
          benefitsList: [
            'فوراً اسٹیمنا اور طویل کارکردگی',
            'مضبوط اریکشن مکمل کنٹرول کے ساتھ',
            'خوشگوار اور بجلی جیسا طاقتور تجربہ',
            'خون کی روانی میں بہتری',
            '۱۰۰٪ ہربل اور بغیر کسی سائیڈ ایفیکٹس کے',
            'شوگر اور بلڈ پریشر کے مریضوں کے لیے محفوظ'
          ],
          // Pricing (UR) for this product only
          pricing: {
            title: 'سستی پیکجز',
            subtitle: 'اپنے لیے بہترین پیکج منتخب کریں:',
            packages: [
              { title: '1 پیک (10 کیپسول) – 1200 روپے', headerTitle: '1 پیک', price: 1200 },
              { title: '2 پیکس – 2000 روپے', headerTitle: '2 پیکس', price: 2000 },
              { title: '3 پیکس – 3000 روپے', headerTitle: '3 پیکس', price: 3000 }
            ]
          },
          // FAQ (UR) — only for this product
          faqTitle: 'FAQs – بی میکس ٹائم سوپر ایکٹو',
          faqSubtitle: 'بی میکس ٹائم سوپر ایکٹو کے بارے میں عام سوالات کے مستند جوابات',
          faqs: [
            { question: 'بی میکس ٹائم سوپر ایکٹو کس چیز کے لیے استعمال ہوتا ہے؟', answer: 'یہ کیپسولز اسٹیمنا، توانائی اور مجموعی کارکردگی کو قدرتی طور پر بہتر بناتے ہیں۔' },
            { question: 'کیا اس پروڈکٹ کے کوئی ضمنی اثرات ہیں؟', answer: 'یہ 100% ہربل اور محفوظ فارمولا ہے، کوئی نقصان دہ سائیڈ ایفیکٹس نہیں۔' },
            { question: 'اسے کیسے لینا چاہیے؟', answer: 'روزانہ 1–2 کیپسول پانی کے ساتھ، ڈاکٹر یا ہدایات کے مطابق استعمال کریں۔' },
            { question: 'کتنے عرصے میں نتائج نظر آتے ہیں؟', answer: 'باقاعدہ استعمال کے 3–4 ہفتوں میں نمایاں نتائج سامنے آنا شروع ہو جاتے ہیں۔' },
            { question: 'کیا یہ ہر عمر کے لیے موزوں ہے؟', answer: 'یہ 18 سال سے اوپر کے بالغ افراد کے لیے محفوظ ہے۔' },
            { question: 'اگر میں دوا استعمال کر رہا ہوں تو کیا اسے لے سکتا ہوں؟', answer: 'اگر آپ کسی طبی علاج پر ہیں تو استعمال سے پہلے اپنے ڈاکٹر سے مشورہ کریں۔' },
            { question: 'کیا یہ پروڈکٹ مستقل نتائج دیتی ہے؟', answer: 'باقاعدہ استعمال طرزِ زندگی اور اسٹیمنا کو قدرتی طور پر بہتر بناتا ہے؛ نتائج برقرار رکھنے کے لیے تسلسل ضروری ہے۔' },
            { question: 'کیا بی میکس ٹائم سوپر ایکٹو پاکستان میں دستیاب ہے؟', answer: 'جی ہاں، یہ پاکستان بھر میں ڈیلیوری کے ساتھ دستیاب ہے۔' },
            { question: 'ایک پیک کتنے دن چلتا ہے؟', answer: 'ایک پیک میں 10 کیپسول ہوتے ہیں جو استعمال کے مطابق عموماً 10 دن کے لیے کافی ہوتے ہیں۔' },
            { question: 'آرڈر کیسے کرنا ہے؟', answer: 'ویب سائٹ پر “Order Now” بٹن دبائیں یا ہیلپ لائن پر کال کر کے آرڈر کریں۔' }
          ],
          // Dosage & Usage (UR)
          usage: {
            title: 'خوراک اور استعمال کی ہدایات',
            dosage: { text: 'عمل سے 2 گھنٹے پہلے نیم گرم دودھ کے ساتھ 1 کیپسول لیں۔' },
            course: undefined,
            best: undefined
          },
          problemsTitle: 'مردوں کے عام مسائل',
          problemsSubtitle: undefined,
          problemsList: [
            'کمزور ایریکشن اور کم اسٹیمنا',
            'قبل از وقت انزال',
            'نامردی (E.D)',
            'خواہش میں کمی اور ناقص کارکردگی',
            'خود اعتمادی کی کمی',
            'تھکن اور کمزور طاقت'
          ],
          solution: 'بی میکس ٹائم سپر ایکٹو وہ قدرتی حل ہے جس کی آپ تلاش کر رہے تھے!'
        }
      }
    },
    'slim-n-shape-garcinia': {
      title: 'Slim N Shape Garcinia',
      subtitle: 'Natural weight loss solution with Garcinia Cambogia extract',
      badge: 'WEIGHT LOSS',
      solution: 'Slim N Shape Garcinia helps you achieve your weight loss goals naturally!',
      benefitsTitle: language === 'en' ? 'Benefits of Slim N Shape Garcinia' : 'سلیم این شیپ گارسنیا کے فوائد'
    },
    'slim-n-shape-garcinia-cambogia-capsules': {
      title: 'Slim n Shape Garcinia Cambogia Capsules',
      subtitle: 'Best Herbal Weight Loss Capsules in Pakistan | Natural Belly Fat Burner | Metabolism Booster for Men & Women',
      badge: 'WEIGHT LOSS',
      solution: '🔑 Slim n Shape Garcinia Cambogia is the natural solution you\'ve been looking for!',
      benefitsTitle: 'Benefits of Slim n Shape Garcinia Cambogia',
      features: [
        'Burn Belly Fat Naturally',
        'Control Appetite & Cravings',
        'Boost Energy & Metabolism'
      ],
      // Product-specific Benefits list (images are placeholders; will be updated later)
      benefitsList: [
        {
          text: '🔥 Accelerates fat burn & metabolism naturally',
          image: '/images/Slim n Shape Garcinia.png',
          alt: 'Natural belly fat burner and metabolism booster - Slim n Shape Garcinia Cambogia',
          title: 'Accelerates Natural Fat Burn & Metabolism - Slim n Shape Garcinia Cambogia',
          seoDescription: 'Herbal Garcinia Cambogia capsules that naturally accelerate fat burning and boost metabolism for safe weight loss'
        },
        {
          text: '🍽 Reduces hunger & controls cravings effectively',
          image: '/images/Slim n Shape Garcinia.png',
          alt: 'Appetite suppressant and craving control with Garcinia Cambogia',
          title: 'Reduces Hunger & Controls Cravings - Slim n Shape Garcinia Cambogia',
          seoDescription: 'Natural appetite control that helps reduce hunger and manage food cravings effectively'
        },
        {
          text: '💖 Supports healthy cholesterol & blood pressure',
          image: '/images/Slim n Shape Garcinia.png',
          alt: 'Supports healthy cholesterol and blood pressure levels',
          title: 'Supports Healthy Cholesterol & Blood Pressure',
          seoDescription: 'Garcinia Cambogia may support healthy lipid profile and blood pressure as part of a balanced lifestyle'
        },
        {
          text: '🧠 Improves focus & balances emotional eating',
          image: '/images/Slim n Shape Garcinia.png',
          alt: 'Improves focus and helps balance emotional eating habits',
          title: 'Improves Focus & Balances Emotional Eating',
          seoDescription: 'Natural support to improve focus and reduce stress-related emotional eating'
        },
        {
          text: '🦴 Boosts bone & nerve strength',
          image: '/images/Slim n Shape Garcinia.png',
          alt: 'Boosts bone and nerve strength support',
          title: 'Boosts Bone & Nerve Strength',
          seoDescription: 'Supports overall wellness that contributes to bone and nerve strength'
        },
        {
          text: '🌿 100% natural weight loss with no side effects',
          image: '/images/Slim n Shape Garcinia.png',
          alt: '100% natural herbal weight loss with no known side effects',
          title: '100% Natural Weight Loss - No Side Effects',
          seoDescription: 'Herbal, chemical-free formula designed for safe and natural weight loss'
        },
        {
          text: '✅ Helps men & women burn belly fat safely',
          image: '/images/Slim n Shape Garcinia.png',
          alt: 'Safe belly fat burner for men and women',
          title: 'Safe Belly Fat Burner for Men & Women',
          seoDescription: 'Suitable for both men and women to burn belly fat safely with natural ingredients'
        }
      ],
      benefitsImage: 'https://i.ibb.co/KpmMN1kL/Benefits-of-Slim-n-Shape-Garcinia-Cambogia.png',
      // Product-specific hero image
      heroImage: 'https://i.ibb.co/GfYCr9z9/Slim-n-Shape-Garcinia-Cambogia-Capsules.png',
      specialPriceAmount: '2,000',
      problemsTitle: 'Common Problems People Face Today',
      problemsSubtitle: 'Millions of men & women in Pakistan silently struggle with these issues — but you don’t have to:',
      problemsList: [
        'Stubborn Belly Fat',
        'Slow Metabolism',
        'Overeating & Cravings',
        'Stress-Related Eating',
        'High Appetite Levels',
        'Low Energy & Weak Digestion'
      ],
      // Video section overrides
      videoId: 'GG04kBQ_1NA',
      videoTitle: 'See Slim n Shape in Action',
      videoSubtitle: 'Watch how Slim n Shape Garcinia Cambogia has helped people across Pakistan lose weight naturally and safely.',
      videoCover: 'https://i.ibb.co/YFS4t88Y/Slim-n-Shape-Garcinia-Cambogia-Video.png',
      videoIframeTitle: 'Slim n Shape Garcinia Cambogia Video'
      ,
      // Before & After overrides (Real Results)
      beforeAfterTitle: 'Real Results, Real People',
      beforeAfterSubtitle: undefined,
      beforeAfterLabels: {
        beforeTitle: 'Before',
        afterTitle: 'After',
        beforeDesc: '',
        afterDesc: '',
        weeks: 'weeks of use',
        weeksPrefix: '📅 After ',
        weeksSuffix: ' Weeks of Use'
      },
      beforeAfterSets: [
        {
          id: 1,
          duration: 4,
          before: 'https://i.ibb.co/ZpTfzQCK/4-weeks-of-use-Before-Slim-n-Shape-Garcinia-Cambogia-Capsules.png',
          after: 'https://i.ibb.co/7DRv6vx/4-weeks-of-use-After-Slim-n-Shape-Garcinia-Cambogia-Capsules.png',
          summary: 'Reduced belly fat, controlled cravings, higher energy.'
        },
        {
          id: 2,
          duration: 8,
          before: 'https://i.ibb.co/cc2J72BT/8-weeks-of-use-Before-Slim-n-Shape-Garcinia-Cambogia-Capsules.png',
          after: 'https://i.ibb.co/bM5RDKqr/8-weeks-of-use-After-Slim-n-Shape-Garcinia-Cambogia-Capsules.png',
          summary: 'Noticeable weight loss, boosted confidence, healthier lifestyle.'
        }
      ]
      ,
      // Herbal power section overrides (Why Garcinia Works)
      herbalSection: {
        title: 'Why Garcinia Cambogia Works (Backed by Science)',
        subtitle: 'Slim n Shape is powered by Garcinia Cambogia, one of the most effective natural fat burners in the world. Its active compound Hydroxycitric Acid (HCA):',
        bullets: [
          'Blocks fat production',
          'Suppresses appetite naturally',
          'Enhances metabolism & energy',
          'Improves digestion & bowel movement',
          'Reduces stress-related eating'
        ],
        badgesLine: '🌿 100% Herbal | ✅ Scientifically Proven | 🔒 Safe & Effective',
        showIngredients: false
      }
      ,
      // Product-specific Testimonials (English-only in slider)
      testimonials: [
        {
          id: 101,
          name: 'Sara A.',
          age: 29,
          location: 'Lahore',
          rating: 5,
          text: '"I lost stubborn belly fat and felt active all day – no crash diets, no weakness!"'
        },
        {
          id: 102,
          name: 'Ali R.',
          age: 34,
          location: 'Karachi',
          rating: 5,
          text: '"My cravings reduced in just 2 weeks and I feel lighter & more energetic!"'
        },
        {
          id: 103,
          name: 'Hira K.',
          age: 31,
          location: 'Islamabad',
          rating: 5,
          text: '"Finally found a herbal solution that works without side effects."'
        }
      ]
      ,
      // Usage overrides (Dosage & Usage Instructions)
      usage: {
        title: 'Dosage & Usage Instructions',
        dosage: {
          text: '1 capsule in the morning (empty stomach). 2 capsules at night (with Slim n Shape Herbal Tea for best results)'
        },
        course: {
          text: '3 month course recommended for full results'
        },
        best: {
          text: 'Follow a light diet & moderate activity. Avoid oily & junk food'
        }
      }
      ,
      // Pricing overrides (Affordable Packages)
      pricing: {
        subtitle: 'Choose the pack that works best for you:',
        packages: [
          {
            title: '1 Month Pack – Rs. 2000',
            headerTitle: '1 Month Pack',
            price: 2000,
            features: [
              '90 Herbal Capsules',
              'Free Delivery',
              'Cash on Delivery',
              'Free Herbal Consultation'
            ]
          },
          {
            title: '2 Month Pack – Rs. 3800 (Save Rs. 200)',
            headerTitle: '2 Month Pack',
            price: 3800,
            saveAmount: 200,
            features: [
              '180 Herbal Capsules',
              'Free Delivery',
              'Cash on Delivery',
              '24/7 Support'
            ]
          },
          {
            title: '3 Month Pack – Rs. 5500 (Best Value – Save Rs. 500)',
            headerTitle: '3 Month Pack',
            price: 5500,
            saveAmount: 500,
            features: [
              '270 Herbal Capsules',
              'Free Delivery',
              'Cash on Delivery',
              'Free Herbal Consultation'
            ]
          }
        ]
      }
      ,
      // Product-specific FAQs (used by FAQSection overrides)
      faqTitle: 'Slim n Shape Garcinia Cambogia – FAQs',
      faqSubtitle: 'Get answers to the most common questions about Slim n Shape Garcinia Cambogia',
      faqs: [
        {
          question: 'Is Slim n Shape safe for men & women?',
          answer: '✅ Yes, it’s 100% herbal, safe & side-effect free. Both men and women can use it safely.'
        },
        {
          question: 'How fast can I see results?',
          answer: '📅 Visible results usually start in 3–4 weeks with regular use. Best results with a 3-month course.'
        },
        {
          question: 'Do I need to diet strictly?',
          answer: '❌ No strict crash diets are required — just follow a light balanced diet & moderate activity.'
        },
        {
          question: 'Does it help with belly fat specifically?',
          answer: '🔥 Yes, Slim n Shape is specially formulated to target stubborn belly fat and overall body fat.'
        },
        {
          question: 'Are there any side effects?',
          answer: '🌿 No. It’s made from 100% natural herbal ingredients and is clinically tested for safety.'
        },
        {
          question: 'Can people with diabetes, BP, or cholesterol issues use this?',
          answer: '👍 Yes, Garcinia Cambogia may help support healthy cholesterol & blood pressure levels, but always consult your doctor if you have medical conditions.'
        },
        {
          question: 'What age group can use Slim n Shape?',
          answer: '👨‍🦰👩‍🦱 It is recommended for adults 18 years and above. Not suitable for children.'
        },
        {
          question: 'How should I take it for best results?',
          answer: '💊 1 capsule in the morning (empty stomach) + 2 capsules at night (with Slim n Shape Herbal Tea for better results).'
        },
        {
          question: 'Can I use it with other herbal teas or medicines?',
          answer: '🌿 Yes, but if you are on strong medication or under treatment, consult your healthcare provider first.'
        },
        {
          question: 'Will I gain weight again after stopping?',
          answer: '⚡ No, as long as you maintain a balanced diet and active lifestyle, the results are long-lasting.'
        }
      ]
      ,
      // Urdu translations for this slug only
      i18n: {
        ur: {
          problemsTitle: 'لوگوں کو درپیش عام مسائل',
          problemsSubtitle: 'پاکستان میں مرد و خواتین خاموشی سے ان مسائل کا سامنا کرتے ہیں — مگر آپ کو ایسا کرنے کی ضرورت نہیں:',
          problemsList: [
            'ضدی پیٹ کی چربی',
            'سست میٹابولزم',
            'زیادہ کھانا اور خواہشات',
            'ذہنی دباؤ کی وجہ سے کھانا',
            'بھوک میں غیر معمولی اضافہ',
            'کم توانائی اور کمزور ہاضمہ'
          ],
          // Pricing (UR) - Slim n Shape Tea
          pricing: {
            title: 'سستی پیکجز',
            subtitle: 'اپنی صحت کے سفر کے لیے بہترین پیکج منتخب کریں:',
            popular: 'بہترین انتخاب',
            save: 'بچت',
            packages: [
              {
                title: '١ پیک',
                price: 999,
                features: [
                  '✔ 100 گرام ہربل ٹی',
                  '✔ فری ڈیلیوری',
                  '✔ کیش آن ڈیلیوری'
                ]
              },
              {
                title: '٢ پیک',
                price: 1999,
                features: [
                  '✔ 200 روپے کی بچت',
                  '✔ فری ڈیلیوری',
                  '✔ 24/7 سپورٹ'
                ]
              },
              {
                title: '٣ پیک — (بہترین انتخاب)',
                price: 2699,
                features: [
                  '✔ 300 روپے کی بچت',
                  '✔ فری ڈیلیوری',
                  '✔ کیش آن ڈیلیوری'
                ]
              }
            ]
          },
          herbalSection: {
            title: 'گارسنیا کمبوژیا کیوں مؤثر ہے (سائنس کی روشنی میں)',
            subtitle: 'سلیم ن شیپ گارسنیا کمبوژیا پر مبنی ہے، جو دنیا کی مؤثر قدرتی چربی گھلانے والی جڑی بوٹیوں میں سے ایک ہے۔ اس کا فعال مرکب ہائیڈروکسی سٹرک ایسڈ (HCA):',
            bullets: [
              'چربی بننے کے عمل کو روکتا ہے',
              'بھوک کو قدرتی طور پر کم کرتا ہے',
              'میٹابولزم اور توانائی میں اضافہ کرتا ہے',
              'ہاضمہ اور آنتوں کی حرکت بہتر بناتا ہے',
              'ذہنی دباؤ کی وجہ سے کھانے کی خواہش کم کرتا ہے'
            ]
          },
          benefitsTitle: 'سلیم ن شیپ گارسنیا کمبوژیا کے فوائد',
          benefitsList: [
            '🔥 قدرتی طور پر چربی گھلانے اور میٹابولزم تیز کرتا ہے',
            '🍽 بھوک کم کرے اور خواہشات پر مؤثر طریقے سے قابو پائے',
            '💖 صحت مند کولیسٹرول اور بلڈ پریشر کو سہارا دے',
            '🧠 توجہ بہتر بنائے اور جذباتی کھانے کو متوازن کرے',
            '🦴 ہڈیوں اور اعصاب کی مضبوطی میں مدد دے',
            '🌿 سو فیصد قدرتی وزن میں کمی، بغیر سائیڈ ایفیکٹس',
            '✅ مرد و خواتین کے لیے پیٹ کی چربی محفوظ طریقے سے کم کرے'
          ],
          usage: {
            title: 'خوراک اور استعمال کی ہدایات',
            dosage: { text: 'صبح خالی پیٹ 1 کیپسول، رات کو 2 کیپسول (بہتر نتائج کے لیے Slim n Shape Herbal Tea کے ساتھ)' },
            course: { text: 'مکمل نتائج کے لیے 3 ماہ کا کورس تجویز کیا جاتا ہے' },
            best: { text: 'ہلکی متوازن غذا اور معتدل سرگرمی رکھیں۔ تیل اور جنک فوڈ سے پرہیز کریں' }
          },
          faqTitle: 'اکثر پوچھے جانے والے سوالات',
          faqSubtitle: 'سلیم ن شیپ گارسنیا کمبوژیا کے بارے میں عام سوالات اور ان کے جوابات',
          faqs: [
            { question: 'کیا Slim n Shape مرد و خواتین دونوں کے لیے محفوظ ہے؟', answer: '✅ جی ہاں، یہ 100% ہربل ہے اور سائیڈ ایفیکٹس سے پاک ہے۔ مرد و خواتین دونوں باآسانی استعمال کر سکتے ہیں۔' },
            { question: 'نتائج کتنی جلدی ظاہر ہوتے ہیں؟', answer: '📅 باقاعدگی سے استعمال پر عموماً 3–4 ہفتوں میں نتائج نظر آنا شروع ہو جاتے ہیں۔ بہترین نتائج کے لیے 3 ماہ کا کورس کریں۔' },
            { question: 'کیا سخت ڈائیٹ ضروری ہے؟', answer: '❌ نہیں، کریش ڈائیٹ کی ضرورت نہیں۔ صرف ہلکی متوازن غذا اور معتدل سرگرمی کافی ہے۔' },
            { question: 'کیا یہ خاص طور پر پیٹ کی چربی پر اثر کرتا ہے؟', answer: '🔥 جی ہاں، Slim n Shape ضدی پیٹ کی چربی سمیت جسم کی مجموعی چربی کو ہدف بناتا ہے۔' },
            { question: 'کیا اس کے کوئی سائیڈ ایفیکٹس ہیں؟', answer: '🌿 نہیں۔ یہ قدرتی جڑی بوٹیوں پر مبنی ہے اور محفوظ استعمال کے لیے موزوں ہے۔' },
            { question: 'شوگر/بلڈ پریشر/کولیسٹرول والے لوگ استعمال کر سکتے ہیں؟', answer: '👍 عام طور پر موزوں ہے، مگر اگر آپ کو میڈیکل کنڈیشن ہے تو اپنے ڈاکٹر سے مشورہ ضرور کریں۔' },
            { question: 'کس عمر کے لوگ استعمال کریں؟', answer: '👨‍🦰👩‍🦱 یہ 18 سال اور اس سے زائد عمر کے بالغ افراد کے لیے تجویز کیا جاتا ہے۔' },
            { question: 'بہترین نتائج کے لیے کیسے استعمال کریں؟', answer: '💊 صبح خالی پیٹ 1 کیپسول + رات کو 2 کیپسول (Slim n Shape Herbal Tea کے ساتھ)۔ ہلکی غذا اور معتدل سرگرمی اپنائیں۔' },
            { question: 'کیا اسے دوسری ہربل چائے یا دواؤں کے ساتھ لے سکتے ہیں؟', answer: '🌿 جی ہاں، عام طور پر ممکن ہے۔ لیکن اگر آپ طاقتور ادویات استعمال کرتے ہیں تو پہلے اپنے ڈاکٹر سے مشورہ کریں۔' },
            { question: 'استعمال بند کرنے کے بعد دوبارہ وزن بڑھے گا؟', answer: '⚡ نہیں، اگر آپ متوازن غذا اور ایکٹیو لائف اسٹائل برقرار رکھیں تو نتائج دیرپا رہتے ہیں۔' }
          ]
        }
      }
    },
    'shahi-tila': {
      title: 'Shahi Tila',
      subtitle: 'Traditional herbal supplement for men\'s health and vitality',
      badge: 'TRADITIONAL',
      solution: 'Shahi Tila provides natural energy and vitality!',
      benefitsTitle: language === 'en' ? 'Benefits of Shahi Tila' : 'شاہی تلہ کے فوائد'
    },
    'sultan-majoon': {
      title: 'Sultan Majoon',
      subtitle: 'Royal herbal jam for strength and vitality',
      badge: 'ENERGY BOOST',
      solution: 'Sultan Majoon enhances your strength and stamina naturally!',
      benefitsTitle: language === 'en' ? 'Benefits of Sultan Majoon' : 'سلطان معجون کے فوائد'
    },
    'bustmax-breast-oil': {
      title: 'BustMax Breast Oil',
      subtitle: 'Natural breast enhancement and firming solution',
      badge: 'WOMEN\'S CARE',
      solution: 'BustMax Breast Oil helps enhance your natural curves!',
      benefitsTitle: language === 'en' ? 'Benefits of BustMax Breast Oil' : 'بسٹ میکس بریسٹ آئل کے فوائد'
    },
    'g-max-passion': {
      title: 'G-Max Passion',
      subtitle: 'Enhance your intimate moments naturally',
      badge: 'INTIMACY',
      solution: 'G-Max Passion helps improve your intimate life!',
      benefitsTitle: language === 'en' ? 'Benefits of G-Max Passion' : 'جی میکس پاشن کے فوائد'
    },
    'shahi-sultan-health-booster': {
      title: 'Shahi Sultan Health Booster',
      subtitle: 'To Live Life Powerfully / Actively / Strongly💪\nEnergetic • Men Power • Wellness in All Ages',
      badge: 'PREMIUM',
      solution: 'Shahi Sultan Health Booster is the ultimate solution for powerful living!',
      benefitsTitle: language === 'en' ? 'Benefits of Shahi Sultan Health Booster' : 'شاہی سلطان ہیلتھ بوسٹر کے فوائد',
      benefitsList: [
        {
          text: '✅ Ultimate Wellness – energy, stamina & immunity booster',
          image: 'https://i.ibb.co/XfkPHQ6p/Ultimate-Wellness-energy-stamina-immunity-booster.png',
          alt: 'Ultimate Wellness energy stamina immunity booster',
          title: 'Ultimate Wellness – Energy, Stamina & Immunity Booster'
        },
        {
          text: '✅ Athletic Performance – stronger muscles, faster recovery',
          image: 'https://i.ibb.co/ZRvwxPRw/Athletic-Performance-stronger-muscles-faster-recovery.png',
          alt: 'Athletic Performance stronger muscles faster recovery',
          title: 'Athletic Performance – Stronger Muscles, Faster Recovery'
        },
        {
          text: '✅ Energy & Strength Builder – fight fatigue, build power',
          image: 'https://i.ibb.co/Y7Mff1r3/Energy-Strength-Builder-fight-fatigue-build-power.png',
          alt: 'Energy Strength Builder fight fatigue build power',
          title: 'Energy & Strength Builder – Fight Fatigue, Build Power'
        },
        {
          text: '✅ Stress Relief – balanced hormones & mood lift',
          image: 'https://i.ibb.co/0Rcp6vpp/Stress-Relief-balanced-hormones-mood-lift.png',
          alt: 'Stress Relief balanced hormones mood lift',
          title: 'Stress Relief – Balanced Hormones & Mood Lift'
        },
        {
          text: '✅ Re-Young – feel youthful, confident & powerful',
          image: 'https://i.ibb.co/2bSvL4t/Re-Young-feel-youthful-confident-powerful.png',
          alt: 'Re-Young feel youthful confident powerful',
          title: 'Re-Young – Feel Youthful, Confident & Powerful'
        },
        {
          text: '✅ Enhanced Libido – natural desire & performance boost',
          image: 'https://i.ibb.co/b5SWNLWZ/Enhanced-Libido-natural-desire-performance-boost.png',
          alt: 'Enhanced Libido natural desire performance boost',
          title: 'Enhanced Libido – Natural Desire & Performance Boost'
        }
      ],
      specialPriceAmount: '9,500',
      problemsTitle: 'Common Problems',
      problemsSubtitle: undefined,
      problemsList: [
        'Low stamina & weakness',
        'Poor performance & energy drop',
        'Stress, fatigue & hormonal imbalance',
        'Age-related decline in men\'s power',
        'Slow muscle recovery & lack of fitness',
        'Low confidence & self-esteem issues'
      ],
      // Custom Ingredients (EN) — 7 items for this product only
      ingredients: [
        {
          name: 'Ginseng',
          description: 'Boosts stamina & immunity',
          image: 'https://i.ibb.co/nsXkZMQC/Ginseng.png'
        },
        {
          name: 'Ashwagandha',
          description: 'Reduces stress & enhances vitality',
          image: 'https://i.ibb.co/210D7HdN/Ashwagandha.png'
        },
        {
          name: 'Macca Root',
          description: 'Supports reproductive health & energy',
          image: 'https://i.ibb.co/JjGfBtfJ/Macca-Root.png'
        },
        {
          name: 'Saffron',
          description: 'Natural mood & performance enhancer',
          image: 'https://i.ibb.co/gLsBdgdQ/Saffron.png'
        },
        {
          name: 'Shilajit',
          description: 'Improves strength & testosterone levels',
          image: 'https://i.ibb.co/zTgrVH1k/Shilajit.png'
        },
        {
          name: 'Safed Musli',
          description: 'Boosts semen quality & fertility',
          image: 'https://i.ibb.co/4g15SC7c/Safed-Musli.png'
        },
        {
          name: 'Tribulus Terrestris',
          description: 'Supports muscle growth & endurance',
          image: 'https://i.ibb.co/LVJ2SDN/Tribulus-Terrestris.png'
        }
      ],
      // Video Section headings (EN)
      videoTitle: 'See Shahi Sultan Health Booster in Action',
      videoSubtitle: 'Real Energy, Real Confidence, Real Power',
      // Urdu translations for this product only
      i18n: {
        ur: {
          problemsTitle: 'عام مسائل',
          problemsSubtitle: 'لاکھوں مرد خاموشی سے ان مسائل کا سامنا کرتے ہیں — لیکن آپ کو ایسا کرنے کی ضرورت نہیں۔',
          problemsList: [
            'کم اسٹیمنا اور کمزوری',
            'کمزور کارکردگی اور توانائی میں کمی',
            'تناؤ، تھکاوٹ اور ہارمونل عدم توازن',
            'عمر کے ساتھ مردانہ طاقت میں کمی',
            'سست پٹھوں کی بحالی اور فٹنس کی کمی',
            'کم اعتماد اور خود اعتمادی کے مسائل'
          ],
          benefitsList: [
            {
              text: '✅ حتمی تندرستی – توانائی، اسٹیمنا اور قوت مدافعت میں اضافہ',
              image: 'https://i.ibb.co/XfkPHQ6p/Ultimate-Wellness-energy-stamina-immunity-booster.png',
              alt: 'حتمی تندرستی توانائی اسٹیمنا قوت مدافعت میں اضافہ',
              title: 'حتمی تندرستی – توانائی، اسٹیمنا اور قوت مدافعت میں اضافہ'
            },
            {
              text: '✅ کھیلوں کی کارکردگی – مضبوط پٹھے، تیز بحالی',
              image: 'https://i.ibb.co/ZRvwxPRw/Athletic-Performance-stronger-muscles-faster-recovery.png',
              alt: 'کھیلوں کی کارکردگی مضبوط پٹھے تیز بحالی',
              title: 'کھیلوں کی کارکردگی – مضبوط پٹھے، تیز بحالی'
            },
            {
              text: '✅ توانائی اور طاقت کا باعث – تھکاوٹ سے لڑیں، طاقت بنائیں',
              image: 'https://i.ibb.co/Y7Mff1r3/Energy-Strength-Builder-fight-fatigue-build-power.png',
              alt: 'توانائی اور طاقت کا باعث تھکاوٹ سے لڑیں طاقت بنائیں',
              title: 'توانائی اور طاقت کا باعث – تھکاوٹ سے لڑیں، طاقت بنائیں'
            },
            {
              text: '✅ تناؤ سے نجات – متوازن ہارمونز اور موڈ میں بہتری',
              image: 'https://i.ibb.co/0Rcp6vpp/Stress-Relief-balanced-hormones-mood-lift.png',
              alt: 'تناؤ سے نجات متوازن ہارمونز اور موڈ میں بہتری',
              title: 'تناؤ سے نجات – متوازن ہارمونز اور موڈ میں بہتری'
            },
            {
              text: '✅ دوبارہ جوان – جوان، پراعتماد اور طاقتور محسوس کریں',
              image: 'https://i.ibb.co/2bSvL4t/Re-Young-feel-youthful-confident-powerful.png',
              alt: 'دوبارہ جوان جوان پراعتماد اور طاقتور محسوس کریں',
              title: 'دوبارہ جوان – جوان، پراعتماد اور طاقتور محسوس کریں'
            },
            {
              text: '✅ بہتر جنسی خواہش – قدرتی خواہش اور کارکردگی میں اضافہ',
              image: 'https://i.ibb.co/b5SWNLWZ/Enhanced-Libido-natural-desire-performance-boost.png',
              alt: 'بہتر جنسی خواہش قدرتی خواہش اور کارکردگی میں اضافہ',
              title: 'بہتر جنسی خواہش – قدرتی خواہش اور کارکردگی میں اضافہ'
            }
          ],
          herbalSection: {
            title: 'جڑی بوٹیوں کی طاقت۔ سائنس سے ثابت شدہ۔',
            subtitle: '۳۰+ عالمی شہرت یافتہ جڑی بوٹیوں کا طاقتور امتزاج، صدیوں سے قابل اعتماد'
          },
          ingredients: [
            {
              name: 'جنسنگ',
              description: 'اسٹیمنا اور قوت مدافعت بڑھاتا ہے',
              image: 'https://i.ibb.co/nsXkZMQC/Ginseng.png'
            },
            {
              name: 'اشوگندھا',
              description: 'تناؤ کم کرتا ہے اور توانائی بڑھاتا ہے',
              image: 'https://i.ibb.co/210D7HdN/Ashwagandha.png'
            },
            {
              name: 'ماکا روٹ',
              description: 'تولیدی صحت اور توانائی کو سپورٹ کرتا ہے',
              image: 'https://i.ibb.co/JjGfBtfJ/Macca-Root.png'
            },
            {
              name: 'زعفران / کیسر',
              description: 'قدرتی موڈ اور کارکردگی بہتر بناتا ہے',
              image: 'https://i.ibb.co/gLsBdgdQ/Saffron.png'
            },
            {
              name: 'شلاجیت',
              description: 'طاقت اور ٹیسٹوسٹیرون کی سطح بہتر بناتا ہے',
              image: 'https://i.ibb.co/zTgrVH1k/Shilajit.png'
            },
            {
              name: 'سفید مصلی',
              description: 'منی کی کوالٹی اور زرخیزی بڑھاتا ہے',
              image: 'https://i.ibb.co/4g15SC7c/Safed-Musli.png'
            },
            {
              name: 'گوکھرو',
              description: 'پٹھوں کی نشوونما اور برداشت کو سپورٹ کرتا ہے',
              image: 'https://i.ibb.co/LVJ2SDN/Tribulus-Terrestris.png'
            }
          ],
          usage: {
            title: 'خوراک اور استعمال کی ہدایات',
            dosage: {
              text: 'دن میں دو بار آدھا چائے کا چمچ دودھ یا پانی کے ساتھ لیں'
            },
            course: {
              text: 'کھانے کے بعد استعمال کریں'
            },
            best: {
              text: 'بہترین نتائج کے لیے 30-90 دن تک باقاعدگی سے استعمال کریں'
            }
          },
          faqTitle: 'شاہی سلطان ہیلتھ بوسٹر – سوالات و جوابات',
          faqSubtitle: 'شاہی سلطان ہیلتھ بوسٹر سے متعلق اہم سوالات کے جوابات',
          faqs: [
            { question: 'شاہی سلطان ہیلتھ بوسٹر کس کے لیے ہے؟', answer: 'یہ خاص طور پر مردوں کی قوت، برداشت اور مجموعی طاقت کے لیے تیار کیا گیا ہے۔', keywords: 'مردانہ طاقت برداشت طاقت' },
            { question: 'کیا یہ ہربل اور محفوظ ہے؟', answer: 'جی ہاں، یہ 100% خالص جڑی بوٹیوں کا قدرتی مرکب ہے جس کے کوئی نقصان دہ مضر اثرات نہیں۔', keywords: 'ہربل محفوظ قدرتی بغیر مضر اثرات' },
            { question: 'اسے کیسے استعمال کرنا ہے؟', answer: 'روزانہ آدھا چمچ، دن میں دو بار، دودھ یا پانی کے ساتھ کھانے کے بعد لیں۔', keywords: 'خوراک آدھا چمچ دن میں دو بار کھانے کے بعد' },
            { question: 'کتنے عرصے تک استعمال کرنا چاہیے؟', answer: 'نمایاں نتائج کے لیے کم از کم 30–90 دن باقاعدگی سے استعمال کریں۔', keywords: 'مدت 30-90 دن نتائج' },
            { question: 'کیا یہ سٹیمنا اور پرفارمنس بہتر کرتا ہے؟', answer: 'بالکل، یہ سٹیمنا، منی کی صحت اور پرفارمنس کو قدرتی طور پر بہتر کرتا ہے۔', keywords: 'سٹیمنا پرفارمنس منی صحت' },
            { question: 'کیا اس سے ٹیسٹوسٹیرون میں اضافہ ہوتا ہے؟', answer: 'جی ہاں، اس کے ہربل اجزاء ٹیسٹوسٹیرون کو قدرتی طور پر بڑھانے میں مدد دیتے ہیں۔', keywords: 'ٹیسٹوسٹیرون اضافہ قدرتی' },
            { question: 'کیا اس کے کوئی سائیڈ ایفیکٹس ہیں؟', answer: 'نہیں، اگر تجویز کردہ مقدار کے مطابق استعمال کیا جائے تو کوئی نقصان نہیں۔', keywords: 'بغیر سائیڈ ایفیکٹس تجویز کردہ مقدار' },
            { question: 'کیا یہ اسٹریس اور تھکن میں مدد کرتا ہے؟', answer: 'جی ہاں، یہ فارمولہ اسٹریس کو مینیج کرنے اور تھکن کم کرنے میں مدد دیتا ہے۔', keywords: 'اسٹریس تھکن کمی' },
            { question: 'کیا یہ ورزش اور فٹنس گولز میں مددگار ہے؟', answer: 'جی بالکل، مضبوط عضلات، سلم باڈی اور تیز ریکوری میں مدد دیتا ہے۔', keywords: 'ورزش فٹنس عضلات ریکوری' },
            { question: 'کیا پاکستان میں ڈیلیوری دستیاب ہے؟', answer: 'جی ہاں، ہم پورے پاکستان میں فری ڈیلیوری فراہم کرتے ہیں۔', keywords: 'پاکستان ڈیلیوری فری پورے ملک' }
          ]
        }
      },
      // Before & After (Real Results) - overrides
      beforeAfterTitle: 'Real Results, Real Men',
      beforeAfterSubtitle: 'See the difference Shahi Sultan Health Booster has made in the lives of men across Pakistan',
      beforeAfterLabels: {
        beforeTitle: 'Before Shahi Sultan',
        afterTitle: 'After Shahi Sultan',
        beforeDesc: 'Low energy, poor confidence, marital issues',
        afterDesc: 'Renewed vigor, strong performance, happy relationship',
        weeksPrefix: '',
        weeksSuffix: ' weeks of use'
      },
      // Before & After sets (images) - specific to Shahi Sultan
      beforeAfterSets: [
        {
          id: 1,
          // 8 weeks set
          before: 'https://i.ibb.co/N6VyzpDb/8-weeks-of-use-Before-Shahi-Sultan-Health-Booster.png',
          after: 'https://i.ibb.co/HDw4BNjR/8-weeks-of-use-After-Shahi-Sultan-Health-Booster.png',
          duration: 8,
          summary: undefined
        },
        {
          id: 2,
          // 4 weeks set
          before: 'https://i.ibb.co/zV0v4JcY/4-weeks-of-use-Before-Shahi-Sultan-Health-Booster.png',
          after: 'https://i.ibb.co/Gvs3GKjY/4-weeks-of-use-After-Shahi-Sultan-Health-Booster.png',
          duration: 4,
          summary: undefined
        }
      ],
      // Hero image - specific to Shahi Sultan only
      heroImage: 'https://i.ibb.co/Ldw6wttM/Shahi-Sultan-Health-Booster.png',
      // Video section cover image - specific to Shahi Sultan only
      videoCover: 'https://i.ibb.co/Hpt0BJ92/Shahi-Sultan-Health-Booster-Video.png',
      // Ingredients Section
      ingredientsTitle: 'Herbal Power. Backed by Science.',
      ingredientsSubtitle: 'Premium natural ingredients scientifically proven to enhance male vitality and performance',
      /* eslint-disable-next-line no-dupe-keys */
      ingredients: [
        {
          name: 'Ginseng',
          description: 'Boosts stamina & immunity',
          image: 'https://i.ibb.co/nsXkZMQC/Ginseng.png'
        },
        {
          name: 'Ashwagandha',
          description: 'Reduces stress & enhances vitality',
          image: 'https://i.ibb.co/210D7HdN/Ashwagandha.png'
        },
        {
          name: 'Macca Root',
          description: 'Supports reproductive health & energy',
          image: 'https://i.ibb.co/JjGfBtfJ/Macca-Root.png'
        },
        {
          name: 'Saffron',
          description: 'Natural mood & performance enhancer',
          image: 'https://i.ibb.co/gLsBdgdQ/Saffron.png'
        },
        {
          name: 'Shilajit',
          description: 'Improves strength & testosterone levels',
          image: 'https://i.ibb.co/zTgrVH1k/Shilajit.png'
        },
        {
          name: 'Safed Musli',
          description: 'Boosts semen quality & fertility',
          image: 'https://i.ibb.co/4g15SC7c/Safed-Musli.png'
        },
        {
          name: 'Tribulus Terrestris',
          description: 'Supports muscle growth & endurance',
          image: 'https://i.ibb.co/LVJ2SDN/Tribulus-Terrestris.png'
        }
      ],
      // Product-specific testimonials (EN)
      testimonials: [
        {
          id: 1,
          name: 'Ahmed K.',
          age: 42,
          location: 'Karachi',
          rating: 5,
          text: 'After 3 weeks of using Shahi Sultan Health Booster, my energy levels and confidence have completely transformed. My wife has noticed the difference too!'
        },
        {
          id: 2,
          name: 'Fahad M.',
          age: 38,
          location: 'Lahore',
          rating: 5,
          text: 'I tried many products before, but Shahi Sultan Health Booster is the only one that actually delivered results. Highly recommended for any man over 35.'
        },
        {
          id: 3,
          name: 'Usman R.',
          age: 45,
          location: 'Islamabad',
          rating: 5,
          text: 'The natural ingredients made me feel comfortable trying it. After 2 months, I feel like I\'m in my 20s again. Thank you!'
        }
      ],
      // Dosage & Usage Instructions (EN)
      usage: {
        title: 'Dosage & Usage Instructions',
        dosage: {
          text: 'Take ½ teaspoon twice a day with milk or water'
        },
        course: {
          text: 'Use after meals'
        },
        best: {
          text: 'For best results, continue 30–90 days regularly'
        }
      },
      // Pricing (EN) - Affordable Packages for this product only
      pricing: {
        title: 'Affordable Packages / Pricing',
        subtitle: 'Choose the package that works best for you:',
        packages: [
          {
            title: '1 Pack',
            headerTitle: '1 Pack',
            price: 9500,
            features: [
              'Free delivery all over Pakistan',
              'Secure packaging & fast shipping',
              'Cash on Delivery',
              '24/7 Customer Support'
            ]
          },
          {
            title: '2 Packs',
            headerTitle: '2 Packs',
            price: 18000,
            saveAmount: 1000,
            features: [
              'Free delivery all over Pakistan',
              'Secure packaging & fast shipping',
              'Cash on Delivery',
              '24/7 Customer Support'
            ]
          },
          {
            title: '3 Packs',
            headerTitle: '3 Packs',
            price: 25000,
            saveAmount: 3500,
            features: [
              'Free delivery all over Pakistan',
              'Secure packaging & fast shipping',
              'Cash on Delivery',
              '24/7 Customer Support',
              'Best Value'
            ]
          }
        ]
      }
      ,
      // Product-specific FAQs (EN/UR)
      faqTitle: 'Shahi Sultan Health Booster – FAQs',
      faqSubtitle: 'Get answers specific to Shahi Sultan Health Booster',
      faqs: [
        { question: 'Who is Shahi Sultan Health Booster for?', answer: "Specially designed for men's vitality, stamina, and overall strength.", keywords: 'men vitality stamina strength' },
        { question: 'Is this herbal and safe?', answer: 'Yes, it is a 100% herbal, natural blend with no harmful side effects.', keywords: 'herbal safe natural no side effects' },
        { question: 'How should I take it?', answer: 'Half teaspoon, twice daily, with milk or water after meals.', keywords: 'dosage half teaspoon twice a day after meals' },
        { question: 'How long should I use it?', answer: 'Use regularly for at least 30–90 days for noticeable results.', keywords: 'duration 30-90 days results' },
        { question: 'Does it improve stamina and performance?', answer: 'Absolutely, it helps improve stamina, semen health, and performance naturally.', keywords: 'stamina performance semen health' },
        { question: 'Does it boost testosterone?', answer: 'Yes, its herbal ingredients help naturally enhance testosterone.', keywords: 'testosterone boost naturally' },
        { question: 'Any side effects?', answer: 'No, if you follow the recommended dosage there are no harmful effects.', keywords: 'no side effects recommended dosage' },
        { question: 'Does it help with stress and fatigue?', answer: 'Yes, this formula helps manage stress and reduces fatigue.', keywords: 'stress fatigue relief' },
        { question: 'Is it helpful for exercise and fitness goals?', answer: 'Yes, it supports stronger muscles, a lean body, and faster recovery.', keywords: 'exercise fitness muscles recovery' },
        { question: 'Is delivery available in Pakistan?', answer: 'Yes, we offer nationwide free delivery across Pakistan.', keywords: 'Pakistan delivery nationwide free' }
      ],
      
    },
    'malka-shahi-gold-health-booster': {
      title: 'Malka Shahi Gold Health Booster',
      subtitle: 'Premium herbal supplement for women\'s health',
      badge: 'WOMEN\'S HEALTH',
      solution: 'Malka Shahi Gold supports women\'s health naturally!',
      benefitsTitle: language === 'en' ? 'Benefits of Malka Shahi Gold' : 'ملکہ شاہی گولڈ کے فوائد'
    },
    'slim-n-shape-tea': {
      title: '☕ Slim n Shape Herbal Tea',
      subtitle: 'Weight Loss | Boosts Immunity | Stress Relief',
      badge: 'WEIGHT LOSS',
      features: [
        'Premium herbal tea blend for natural weight loss & overall wellness.',
        'Burn Fat & Control Cholesterol',
        'Relieve Stress & Boost Immunity',
        'Support Digestion & Enhance Skin Glow',
        '⭐ Trusted Herbal Formula | 🌿 100% Natural Ingredients'
      ],
      // Page images (Tea only)
      heroImage: 'https://i.ibb.co/MkjMjkb0/Slim-n-Shape-Herbal-Tea.png',
      benefitsImage: 'https://i.ibb.co/7t9NJdFz/Benefits-of-Slim-n-Shape-Herbal-Tea.jpg',
      specialPriceAmount: '999',
      // Video Section (EN)
      videoId: 'OznIF_zTue8',
      videoTitle: 'See Slim n Shape Tea in Action',
      videoSubtitle: 'Watch how Slim n Shape Herbal Tea helps men & women across Pakistan stay slim, strong, and stress-free.',
      videoCover: 'https://i.ibb.co/NgRRFB7w/Slim-n-Shape-Herbal-Tea-Video.png',
      videoIframeTitle: 'Slim n Shape Herbal Tea Video',
      // Before & After (Real Results) - overrides
      beforeAfterTitle: 'Real Results, Real People',
      beforeAfterSubtitle: 'See the difference Slim n Shape Herbal Tea has made in the lives of people across Pakistan',
      beforeAfterLabels: {
        beforeTitle: 'Before',
        afterTitle: 'After',
        beforeDesc: '',
        afterDesc: '',
        weeksPrefix: '📅 After ',
        weeksSuffix: ' Weeks of Use'
      },
      beforeAfterSets: [
        {
          id: 1,
          duration: 4,
          before: 'https://i.ibb.co/FkTjqd52/4-weeks-of-use-Before-Slim-n-Shape-Herbal-Tea.png',
          after: 'https://i.ibb.co/pvC5WsWt/4-weeks-of-use-After-Slim-n-Shape-Herbal-Tea.png',
          summary: 'Visible improvement by week 4.'
        },
        {
          id: 2,
          duration: 8,
          before: 'https://i.ibb.co/5x8xDhdV/8-weeks-of-use-Before-Slim-n-Shape-Herbal-Tea.png',
          after: 'https://i.ibb.co/h1VBC9cn/8-weeks-of-use-After-Slim-n-Shape-Herbal-Tea.png',
          summary: 'Stronger results by week 8.'
        }
      ],
      // Common Problems (EN)
      problemsTitle: 'Common Problems People Face Today',
      problemsSubtitle: 'Millions struggle with these issues — but you don’t have to:',
      problemsList: [
        'Obesity & Belly Fat',
        'Weak Immune System',
        'Stress & Anxiety',
        'High Cholesterol & BP'
      ],
      // Benefits (EN)
      benefitsTitle: 'Special Benefits of Slim n Shape Herbal Tea',
      benefitsList: [
        '✅ Effective slimming solution',
        '✅ Relieves stress and anxiety',
        '✅ Helps control blood pressure levels',
        '✅ Strengthens the immune system',
        '✅ Boosts resistance against illnesses',
        '✅ Reduces the risk of food poisoning',
        '✅ Supports bone density maintenance',
        '✅ Helps reduce obesity & cholesterol levels',
        '✅ Enhances skin glow naturally',
        '✅ Lowers high blood pressure'
      ],
      // Pricing (EN) - Affordable Packages (Slim n Shape Tea only)
      pricing: {
        title: 'Affordable Packages',
        subtitle: 'Choose the perfect package for your health journey:',
        popular: 'Best Value',
        save: 'Save',
        packages: [
          {
            title: '1 Pack',
            price: 999,
            features: [
              '✔ 100g Herbal Tea',
              '✔ Free Delivery',
              '✔ Cash on Delivery'
            ]
          },
          {
            title: '2 Packs',
            price: 1899,
            saveAmount: 99,
            features: [
              '✔ Save Rs. 99',
              '✔ Free Delivery',
              '✔ 24/7 Support'
            ]
          },
          {
            title: '3 Packs – (Best Value)',
            price: 2699,
            saveAmount: 298,
            features: [
              '✔ Save Rs. 298',
              '✔ Free Delivery',
              '✔ Cash on Delivery'
            ]
          }
        ]
      },
      // Usage (EN)
      usage: {
        title: 'Usage Directions',
        dosage: {
          title: 'How to Prepare',
          text: '• Slim n Shape tea powder – ½ teaspoon • Water – 1 cup (250 ml) • Honey – 1 teaspoon • Lemon – 6 to 8 drops'
        },
        course: {
          title: 'Method',
          text: 'Soak all ingredients together for 4–5 minutes before drinking.'
        },
        best: {
          title: 'Packaging',
          text: '100g / 3.05 oz'
        }
      },
      // Product-specific FAQs (EN)
      faqTitle: 'FAQs – Slim n Shape Herbal Tea',
      faqSubtitle: undefined,
      faqs: [
        { question: 'Is Slim n Shape Herbal Tea safe?', answer: '✅ Yes, it’s 100% natural, herbal, and safe for daily use.' },
        { question: 'Can both men & women use it?', answer: '👍 Absolutely! It’s suitable for adults of all ages.' },
        { question: 'How long before I see results?', answer: '📅 Most people see results within 2–3 weeks with regular use.' },
        { question: 'Does it have any side effects?', answer: '🌿 No, it’s caffeine-light and free of harmful chemicals.' },
        { question: 'Can it replace regular tea?', answer: '☕ Yes, you can drink it daily instead of your regular tea.' },
        { question: 'Does it really help with stress?', answer: '💆 Yes, the herbal blend relieves stress & improves sleep quality.' },
        { question: 'Can people with high BP or cholesterol take it?', answer: '✅ Yes, it may help regulate BP & cholesterol naturally.' },
        { question: 'How many cups should I take daily?', answer: '🍵 Recommended: 2 cups per day (morning & evening).' },
        { question: 'Can I use it with Slim n Shape Capsules?', answer: '🔥 Yes, combining it with Garcinia Cambogia Capsules gives faster results.' },
        { question: 'Will the results last after stopping?', answer: '⚡ Yes, with a balanced lifestyle, results are long-lasting.' }
      ],
      // Herbal Power Section (EN) - 3 Columns
      herbalSection: {
        title: 'Special Benefits of Slim n Shape Herbal Tea',
        subtitle: '🌿 Herbal Power. Backed by Science. A potent blend of world-renowned herbal ingredients, trusted for centuries, specially formulated for weight loss, stress relief & immunity boost.',
        bullets: [],
        badgesLine: '✔ 100% Natural | 🌱 Scientifically Proven | 🔒 Safe & Effective',
        showIngredients: false,
        customColumns: [
          {
            title: 'Green Tea',
            description: 'One of the healthiest beverages on the planet, rich in antioxidants & nutrients.',
            points: [
              'Supports fat loss & metabolism',
              'Improves brain function & mood',
              'Regulates cholesterol & blood pressure',
              'Prevents tooth decay & aging skin',
              'Boosts immunity & overall vitality'
            ]
          },
          {
            title: 'Cymbopogon Citratus (Lemongrass)',
            description: 'A time-tested herbal remedy with therapeutic benefits.',
            points: [
              'Relieves fevers & stomach cramps',
              'Eases gas, colic & digestive issues',
              'Helps with arthritic pain',
              'Promotes calmness & relaxation',
              'Natural detox & immunity booster'
            ]
          },
          {
            title: 'Pycnanthemum (Mountain Mint)',
            description: 'An aromatic herb with powerful medicinal properties.',
            points: [
              'Relieves indigestion, coughs & colds',
              'Treats mouth sores & gum problems',
              'Acts as antiseptic & natural tonic',
              'Supports wound healing & toothache relief',
              'Provides refreshing aroma & stress relief'
            ]
          }
        ]
      },
      // Urdu translations (UR) — only for this product
      i18n: {
        ur: {
          // FAQs (UR)
          faqTitle: 'اکثر پوچھے جانے والے سوالات – سلیم ن شیپ ہربل ٹی',
          faqSubtitle: undefined,
          faqs: [
            { question: 'کیا سلیم ن شیپ ہربل ٹی محفوظ ہے؟', answer: '✅ جی ہاں، یہ 100٪ قدرتی اور ہربل ہے اور روزانہ استعمال کے لیے محفوظ ہے۔' },
            { question: 'کیا مرد اور خواتین دونوں استعمال کر سکتے ہیں؟', answer: '👍 بالکل! یہ ہر عمر کے بالغ افراد کے لیے موزوں ہے۔' },
            { question: 'نتائج دیکھنے میں کتنا وقت لگتا ہے؟', answer: '📅 باقاعدہ استعمال کے ساتھ عموماً 2–3 ہفتوں میں نتائج نظر آنا شروع ہو جاتے ہیں۔' },
            { question: 'کیا اس کے کوئی سائیڈ ایفیکٹس ہیں؟', answer: '🌿 نہیں، یہ کیفین کم ہے اور مضر کیمیکلز سے پاک ہے۔' },
            { question: 'کیا یہ عام چائے کی جگہ لی جا سکتی ہے؟', answer: '☕ جی ہاں، آپ اسے روزانہ عام چائے کی جگہ پی سکتے ہیں۔' },
            { question: 'کیا یہ واقعی اسٹریس میں مدد دیتی ہے؟', answer: '💆 جی ہاں، اس کا ہربل مکس ذہنی دباؤ کم کرتا ہے اور نیند کے معیار کو بہتر بناتا ہے۔' },
            { question: 'ہائی بلڈ پریشر یا کولیسٹرول والے لوگ لے سکتے ہیں؟', answer: '✅ جی ہاں، یہ قدرتی طور پر بلڈ پریشر اور کولیسٹرول کو متوازن رکھنے میں مدد دے سکتی ہے۔' },
            { question: 'روزانہ کتنے کپ لینے چاہئیں؟', answer: '🍵 تجویز: روزانہ 2 کپ (صبح اور شام)۔' },
            { question: 'کیا اسے Slim n Shape Garcinia Cambogia Capsules کے ساتھ لے سکتا/سکتی ہوں؟', answer: '🔥 جی ہاں، گارسنیا کمبوژیا کیپسولز کے ساتھ لینے سے نتائج تیز ہوتے ہیں۔' },
            { question: 'استعمال بند کرنے کے بعد کیا نتائج برقرار رہیں گے؟', answer: '⚡ جی ہاں، متوازن طرزِ زندگی کے ساتھ نتائج دیرپا رہتے ہیں۔' }
          ],
          benefitsTitle: 'سلیم اَن شیپ ہربل ٹی کے خاص فوائد',
          benefitsList: [
            '✅ وزن گھٹانے میں موثر مدد',
            '✅ ذہنی دباؤ اور بے چینی میں کمی',
            '✅ بلڈ پریشر کنٹرول میں معاون',
            '✅ قوتِ مدافعت مضبوط بنائے',
            '✅ بیماریوں کے خلاف مزاحمت بڑھائے',
            '✅ فوڈ پوائزننگ کے خطرات میں کمی',
            '✅ ہڈیوں کی مضبوطی میں مددگار',
            '✅ موٹاپے اور کولیسٹرول میں کمی میں مدد',
            '✅ جلد کی قدرتی چمک میں اضافہ',
            '✅ ہائی بلڈ پریشر کم کرنے میں مدد'
          ],
          usage: {
            title: 'استعمال کا طریقہ',
            dosage: {
              title: 'تیاری کا طریقہ',
              text: '• سلیم اَن شیپ ٹی پاؤڈر – ½ چائے کا چمچ • پانی – 1 کپ (250 ملی) • شہد – 1 چائے کا چمچ • لیموں – 6 سے 8 قطرے'
            },
            course: {
              title: 'طریقہ',
              text: 'پینے سے پہلے تمام اجزاء کو 4–5 منٹ تک بھگو کر رکھیں۔'
            },
            best: {
              title: 'پیکجنگ',
              text: '100 گرام / 3.05 اونس'
            }
          },
          herbalSection: {
            title: 'سلیم اَن شیپ ہربل ٹی کے خاص فوائد',
            subtitle: '🌿 قدرتی جڑی بوٹیوں کی طاقت — سائنسی طور پر ثابت شدہ۔ عالمی شہرت یافتہ اجزاء پر مشتمل، جو وزن میں کمی، ذہنی سکون اور قوتِ مدافعت بڑھانے کے لیے خاص طور پر تیار کی گئی ہے۔',
            bullets: [],
            badgesLine: '✔ ۱۰۰٪ قدرتی | 🌱 سائنسی طور پر ثابت شدہ | 🔒 محفوظ اور مؤثر',
            customColumns: [
              {
                title: 'گرین ٹی',
                description: 'دنیا کے صحت بخش ترین مشروبات میں سے ایک، اینٹی آکسیڈنٹس اور غذائی عناصر سے بھرپور۔',
                points: [
                  'چربی گھلانے اور میٹابولزم میں مدد',
                  'دماغی کارکردگی اور موڈ بہتر بنائے',
                  'کولیسٹرول اور بلڈ پریشر کو متوازن رکھے',
                  'دانتوں کی کمزوری اور جلد کے بڑھاپے سے بچاؤ',
                  'قوتِ مدافعت اور مجموعی توانائی میں اضافہ'
                ]
              },
              {
                title: 'سائمبوپوگن سیٹریٹس (لیمون گراس)',
                description: 'قدیم روایتی جڑی بوٹی جس کے بے شمار طبی فوائد ہیں۔',
                points: [
                  'بخار اور پیٹ کے مروڑ میں آرام',
                  'گیس، قولنج اور ہاضمے کے مسائل میں کمی',
                  'جوڑوں کے درد میں معاون',
                  'ذہنی سکون اور ریلیکسیشن فراہم کرے',
                  'قدرتی ڈیٹوکس اور قوتِ مدافعت بڑھائے'
                ]
              },
              {
                title: 'پائکنینتھم (ماؤنٹین منٹ)',
                description: 'خوشبودار جڑی بوٹی جس کے طاقتور طبی فوائد ہیں۔',
                points: [
                  'بدہضمی، کھانسی اور نزلہ زکام میں آرام',
                  'منہ کے چھالوں اور مسوڑھوں کے مسائل میں مفید',
                  'قدرتی جراثیم کش اور ٹانک کے طور پر کام کرے',
                  'زخم بھرنے اور دانت درد میں مدد دے',
                  'فرحت بخش خوشبو اور ذہنی سکون فراہم کرے'
                ]
              }
            ]
          }
        }
      }
    },

  };

  // Build page content from translations + product-specific overrides
  const content = useMemo(() => {
    const base = language === 'ur' ? urduContent : englishContent;
    const product = productConfigs[slug] || {};
    const ur = product?.i18n?.ur || {};
    // Use product-specific Urdu overrides when available
    const isProductUrdu = language === 'ur' && !!product?.i18n?.ur;
    const forcePricingEnglish = slug === 'slim-n-shape-garcinia-cambogia-capsules' || slug === 'b-maxtime-super-active';

    return {
      ...base,
      hero: {
        ...base.hero,
        title: product.title || base.hero.title,
        subtitle: product.subtitle || base.hero.subtitle,
        badge: product.badge || base.hero.badge,
        features: product.features || base.hero.features,
        specialPriceAmount: product.specialPriceAmount || base.hero.specialPriceAmount || '2,500'
      },
      problems: {
        ...base.problems,
        title: isProductUrdu ? (ur?.problemsTitle || base.problems.title) : (product.problemsTitle || base.problems.title),
        subtitle: isProductUrdu ? (ur?.problemsSubtitle || base.problems.subtitle) : (product.problemsSubtitle || base.problems.subtitle),
        list: isProductUrdu ? (ur?.problemsList || base.problems.list) : (product.problemsList || base.problems.list),
        solution: isProductUrdu ? (ur?.solution || product.solution || base.problems.solution) : (product.solution || base.problems.solution)
      },
      benefits: {
        ...base.benefits,
        title: isProductUrdu ? (ur?.benefitsTitle || base.benefits.title) : (product.benefitsTitle || base.benefits.title),
        list: isProductUrdu ? (ur?.benefitsList || base.benefits.list) : (product.benefitsList || base.benefits.list)
      },
      usage: {
        ...base.usage,
        title: isProductUrdu ? (ur?.usage?.title || base.usage.title) : (product.usage?.title || base.usage.title),
        dosage: {
          ...base.usage.dosage,
          ...(isProductUrdu ? (ur?.usage?.dosage || {}) : (product.usage?.dosage || {}))
        },
        course: {
          ...base.usage.course,
          ...(isProductUrdu ? (ur?.usage?.course || {}) : (product.usage?.course || {}))
        },
        best: {
          ...base.usage.best,
          ...(isProductUrdu ? (ur?.usage?.best || {}) : (product.usage?.best || {}))
        }
      },
      pricing: forcePricingEnglish
        ? {
          ...englishContent.pricing,
          title: product.pricing?.title || englishContent.pricing.title,
          subtitle: product.pricing?.subtitle || englishContent.pricing.subtitle,
          popular: product.pricing?.popular || englishContent.pricing.popular,
          save: product.pricing?.save || englishContent.pricing.save,
          packages: product.pricing?.packages || englishContent.pricing.packages
        }
        : {
          ...base.pricing,
          title: isProductUrdu ? (ur?.pricing?.title || base.pricing.title) : (product.pricing?.title || base.pricing.title),
          subtitle: isProductUrdu ? (ur?.pricing?.subtitle || base.pricing.subtitle) : (product.pricing?.subtitle || base.pricing.subtitle),
          popular: isProductUrdu ? (ur?.pricing?.popular || base.pricing.popular) : (product.pricing?.popular || base.pricing.popular),
          save: isProductUrdu ? (ur?.pricing?.save || base.pricing.save) : (product.pricing?.save || base.pricing.save),
          packages: isProductUrdu
            ? (
              (ur?.pricing?.packages
                ? ur.pricing.packages.map((pkg, idx) => ({
                  ...pkg,
                  features: pkg.features || base?.pricing?.packages?.[idx]?.features || []
                }))
                : (product.pricing?.packages || base.pricing.packages))
            )
            : (product.pricing?.packages || base.pricing.packages)
        }

    };
  }, [language, slug]);

  useEffect(() => {
    // Update page title based on current product
    if (slug && productConfigs[slug]) {
      const productTitle = productConfigs[slug].title;
      document.title = `${productTitle} | The Planner Herbal International`;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${productTitle} - Premium herbal solution from The Planner Herbal International. 100% natural ingredients, free delivery across Pakistan.`);
      }

      // Update Open Graph title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${productTitle} | The Planner Herbal International`);
      }

      // Update Twitter title
      const twitterTitle = document.querySelector('meta[property="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', `${productTitle} | The Planner Herbal International`);
      }
    }

    // Check if cookies are accepted
    const consent = localStorage.getItem('cookie_consent') === 'true';
    setCookiesAccepted(consent);

    // Initialize language from localStorage
    const storedLang = localStorage.getItem('tph_lang');
    if (storedLang === 'en' || storedLang === 'ur') {
      setLanguage(storedLang);
    }

    // Listen for global language toggle requests
    const onToggle = () => {
      setLanguage((prev) => (prev === 'en' ? 'ur' : 'en'));
    };
    window.addEventListener('tph:toggleLanguage', onToggle);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide back to top button
      setShowScrollTop(currentScrollY > 500);

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('tph:toggleLanguage', onToggle);
    };
  }, [lastScrollY, slug]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = () => {
    // Get current product title or fallback to default
    const productTitle = productConfigs[slug]?.title || 'Product';
    const message = `I would like to order ${productTitle}.

Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
City: ${formData.city}
Quantity: ${formData.quantity} ${slug === 'slim-n-shape-tea' ? (formData.quantity === '1' ? 'Pack' : 'Packs') : (slug === 'slim-n-shape-garcinia-cambogia-capsules' ? (formData.quantity === '1' ? 'Month Pack' : 'Months Pack') : (slug === 'b-maxtime-super-active' ? (formData.quantity === '1' ? 'Pack' : 'Packs') : (slug === 'shahi-sultan-health-booster' ? (formData.quantity === '1' ? 'Pack' : 'Packs') : (formData.quantity > 1 ? 'bottles' : 'bottle'))))}
Total: Rs ${calculatePrice(formData.quantity)}/-

Please confirm my order. Thank you!`;

    const whatsappUrl = `https://wa.me/923328888935?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const calculatePrice = (quantity) => {
    const qty = parseInt(quantity);
    // Use product-specific pricing for Slim n Shape Tea page only
    if (slug === 'slim-n-shape-tea') {
      // Force EN pricing for tea
      const productPricing = productConfigs['slim-n-shape-tea']?.pricing?.packages;
      const price = productPricing?.[qty - 1]?.price;
      if (price) return price;
    }
    // Use product-specific pricing for Shahi Sultan Health Booster
    if (slug === 'shahi-sultan-health-booster') {
      const productPricing = productConfigs['shahi-sultan-health-booster']?.pricing?.packages;
      const price = productPricing?.[qty - 1]?.price;
      if (price) return price;
    }
    // Use product-specific pricing for B-Maxtime Super Active
    if (slug === 'b-maxtime-super-active') {
      if (qty === 1) return 1200;
      if (qty === 2) return 2000;
      if (qty === 3) return 3000;
      return qty * 1200;
    }
    // Default pricing (other products)
    if (qty === 1) return 2500;
    if (qty === 2) return 4500;
    if (qty === 3) return 6000;
    return qty * 2500; // fallback for other quantities
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  // Persist language changes and notify listeners
  useEffect(() => {
    try {
      localStorage.setItem('tph_lang', language);
    } catch (e) {
      // localStorage may be unavailable (e.g., privacy mode); fail gracefully
      console.warn('Unable to persist language to localStorage:', e);
    }
    window.dispatchEvent(new CustomEvent('tph:lang-changed', { detail: language }));
  }, [language]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Ahmed K.",
      age: 42,
      text: "After 3 weeks of using B-Maxman, my energy levels and confidence have completely transformed. My wife has noticed the difference too!",
      rating: 5,
      location: "Karachi"
    },
    {
      id: 2,
      name: "Fahad M.",
      age: 38,
      text: "I tried many products before, but B-Maxman is the only one that actually delivered results. Highly recommended for any man over 35.",
      rating: 5,
      location: "Lahore"
    },
    {
      id: 3,
      name: "Usman R.",
      age: 45,
      text: "The natural ingredients made me feel comfortable trying it. After 2 months, I feel like I'm in my 20s again. Thank you!",
      rating: 5,
      location: "Islamabad"
    }
  ];

  // This function determines if a section should be displayed in Urdu
  const shouldShowInUrdu = (sectionName) => {
    const urduSections = ['problems', 'ingredients', 'benefits', 'usage'];
    return language === 'ur' && urduSections.includes(sectionName);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-white to-red-50 ${shouldShowInUrdu('all') ? 'font-urdu' : ''}`}>
      <div className="flex-grow">
        {/* Header moved to Root layout */}

        {/* Hero Section - Optimized */}
        <section className="py-8 md:py-16 bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-pattern"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <motion.div className="lg:w-1/2" {...fadeInUp}>
                <div className="flex items-center space-x-2 mb-4">
                  <SafeIcon icon={FiAward} className="text-yellow-400 text-2xl" />
                  <span className="bg-yellow-400 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                    {content.hero.badge}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-yellow-400">
                  {content.hero.title}
                </h1>
                <p className="text-xl md:text-2xl mb-6 text-red-100">
                  {content.hero.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 mb-6 text-lg">
                  {content.hero.features.map((feature, index) => (
                    <span key={index} className="bg-white/20 px-4 py-2 rounded-full">{feature}</span>
                  ))}
                </div>
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon key={i} icon={FiStar} className="text-yellow-400 text-2xl fill-current" />
                  ))}
                  <span className="ml-2 text-lg">{content.hero.trusted}</span>
                </div>
                <motion.div
                  className="bg-white/10 p-6 rounded-lg border border-white/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                    {content.hero.specialPrice}: Rs {content.hero.specialPriceAmount || '2,500'}/-
                  </p>
                  <p className="text-red-100">{content.hero.delivery}</p>
                  <motion.button
                    onClick={() => document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' })}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-3 text-lg transition-colors w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SafeIcon icon={FiShoppingCart} className="text-xl" />
                    <span>Order Now</span>
                  </motion.button>
                </motion.div>
              </motion.div>

              <motion.div
                className="lg:w-1/2 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  {/* Hero graphic with abstract shapes */}
                  <div className="relative mx-auto max-w-md">
                    {/* Decorative elements */}
                    <motion.div
                      className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-30 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-400 rounded-full opacity-30 blur-xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.4, 0.3]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />

                    {/* Main content card */}
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-xl">
                      {/* Product Image */}
                      <div className="flex justify-center">
                        <img
                          src={productConfigs[slug]?.heroImage || "https://i.ibb.co/gLX3dwfM/B-Maxman-Royal-Special-Treatment.png"}
                          alt={productConfigs[slug]?.title || "B-Maxman Royal Special Treatment"}
                          className="max-w-full h-auto rounded shadow-md"
                          loading="eager"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section
          className={`py-12 md:py-16 bg-gray-50 ${shouldShowInUrdu('problems') ? 'font-urdu' : ''}`}
          dir={shouldShowInUrdu('problems') ? 'rtl' : 'ltr'}
        >
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {content.problems.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {content.problems.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.problems.list.map((problem, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiZap} className="text-red-500 text-xl flex-shrink-0" />
                    <p className="font-semibold text-gray-800">{problem}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-2xl font-bold text-red-600">{content.problems.solution}</p>
            </motion.div>
          </div>
        </section>

        {/* Video Section - Lazy Loaded with Cookie Consent */}
        <Suspense fallback={<LoadingFallback />}>
          <VideoSection
            videoId={productConfigs[slug]?.videoId || 'hakc6mR7VL4'}
            title={productConfigs[slug]?.videoTitle}
            subtitle={productConfigs[slug]?.videoSubtitle}
            coverImage={productConfigs[slug]?.videoCover}
            videoTitle={productConfigs[slug]?.videoIframeTitle}
          />
        </Suspense>

        {/* Before & After Results - Always in English - Lazy Loaded */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {productConfigs[slug]?.beforeAfterTitle || englishContent.beforeAfter.title}
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {productConfigs[slug]?.beforeAfterSubtitle || englishContent.beforeAfter.subtitle}
              </p>
            </motion.div>
            <Suspense fallback={<LoadingFallback />}>
              <BeforeAfterSlider
                sets={productConfigs[slug]?.beforeAfterSets}
                labels={productConfigs[slug]?.beforeAfterLabels}
              />
            </Suspense>
          </div>
        </section>

        {/* Shahi Sultan – Ingredients Grid (English only) */}
        {slug === 'shahi-sultan-health-booster' && (
          <section className={`py-12 md:py-16 bg-white ${language === 'ur' ? 'font-urdu' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {language === 'ur'
                    ? (productConfigs[slug]?.i18n?.ur?.herbalSection?.title || 'جڑی بوٹیوں کی طاقت۔ سائنس سے ثابت شدہ۔')
                    : '🌿 Herbal Power. Backed by Science.'}
                </h2>
              </div>
              {/* First row: 3 ingredients */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {(language === 'ur'
                  ? (productConfigs[slug]?.i18n?.ur?.ingredients || [])
                  : (productConfigs[slug]?.ingredients || [])
                ).slice(0, 3).map((ing, idx) => (
                  <div key={`sshb-ing-top-${idx}`} className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                    <img
                      src={ing.image}
                      alt={ing.name}
                      title={ing.name}
                      className="h-24 w-auto mx-auto object-contain mb-3"
                      loading="lazy"
                    />
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{ing.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{ing.description}</p>
                  </div>
                ))}
              </div>
              {/* Second row: 4 ingredients */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {(language === 'ur'
                  ? (productConfigs[slug]?.i18n?.ur?.ingredients || [])
                  : (productConfigs[slug]?.ingredients || [])
                ).slice(3, 7).map((ing, idx) => (
                  <div key={`sshb-ing-bot-${idx}`} className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                    <img
                      src={ing.image}
                      alt={ing.name}
                      title={ing.name}
                      className="h-24 w-auto mx-auto object-contain mb-3"
                      loading="lazy"
                    />
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{ing.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{ing.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Herbal Power Section - Lazy Loaded */}
        <Suspense fallback={<div className="py-10 text-center">{language === 'ur' ? 'لوڈ ہو رہا ہے…' : 'Loading…'}</div>}>
          {slug !== 'shahi-sultan-health-booster' && (
            <HerbalPowerSection
              language={language}
              title={language === 'ur' && productConfigs[slug]?.i18n?.ur?.herbalSection ? (productConfigs[slug]?.i18n?.ur?.herbalSection?.title) : (productConfigs[slug]?.herbalSection?.title)}
              subtitle={language === 'ur' && productConfigs[slug]?.i18n?.ur?.herbalSection ? (productConfigs[slug]?.i18n?.ur?.herbalSection?.subtitle) : (productConfigs[slug]?.herbalSection?.subtitle)}
              bullets={language === 'ur' && productConfigs[slug]?.i18n?.ur?.herbalSection ? (productConfigs[slug]?.i18n?.ur?.herbalSection?.bullets) : (productConfigs[slug]?.herbalSection?.bullets)}
              badgesLine={language === 'ur' && productConfigs[slug]?.i18n?.ur?.herbalSection
                ? (productConfigs[slug]?.i18n?.ur?.herbalSection?.badgesLine)
                : (productConfigs[slug]?.herbalSection?.badgesLine)}
              badgesLanguage={slug === 'slim-n-shape-garcinia-cambogia-capsules' ? 'en' : undefined}
              showIngredients={productConfigs[slug]?.herbalSection?.showIngredients}
              ingredients={undefined}
              customColumns={language === 'ur' && productConfigs[slug]?.i18n?.ur?.herbalSection ? (productConfigs[slug]?.i18n?.ur?.herbalSection?.customColumns) : (productConfigs[slug]?.herbalSection?.customColumns)}
              oneRowLayout={slug === 'b-maxman-royal-special-treatment'}
            />
          )}
        </Suspense>

        {/* Benefits Section */}
        <section
          className={`py-12 md:py-16 bg-gradient-to-r from-blue-50 to-indigo-50 ${shouldShowInUrdu('benefits') ? 'font-urdu' : ''}`}
          dir={shouldShowInUrdu('benefits') ? 'rtl' : 'ltr'}
          aria-labelledby="benefits-section"
          role="region"
        >
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                id="benefits-section"
                title={language === 'en' ? "Expected results from B-Maxman Royal herbal supplement for men" : "بی میکس مین رائل جڑی بوٹیوں کے سپلیمنٹ سے متوقع نتائج"}
              >
                {content.benefits.title}
              </h2>
            </motion.div>

            {(['slim-n-shape-garcinia-cambogia-capsules', 'slim-n-shape-tea', 'b-maxtime-super-active'].includes(slug)) ? (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                {/* Left: Image 40% */}
                <div className="md:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <img
                      src={slug === 'slim-n-shape-tea'
                        ? (productConfigs[slug]?.benefitsImage || '/images/Slim n Shape Tea.png')
                        : (productConfigs[slug]?.benefitsImage)}
                      alt={content.benefits.title}
                      title={content.benefits.title}
                      className={`w-full object-contain p-6 ${(['slim-n-shape-garcinia-cambogia-capsules', 'slim-n-shape-tea'].includes(slug)) ? 'h-[520px] md:h-[560px]' : 'h-80'}`}
                      loading="lazy"
                    />
                  </div>
                </div>
                {/* Right: Text 60% */}
                <div className="md:col-span-3">
                  <div className="space-y-4">
                    {content.benefits.list.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow border border-blue-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <div className={`flex items-start ${shouldShowInUrdu('benefits') ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                          <SafeIcon icon={FiCheck} className="text-green-600 text-xl mt-1 flex-shrink-0" />
                          <p className="text-gray-800 font-medium">
                            {typeof benefit === 'string' ? benefit : benefit.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.benefits.list.map((benefit, index) => (
                  <motion.article
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    role="article"
                    aria-labelledby={`benefit-${index}`}
                  >
                    {/* Image */}
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={benefit.image}
                        alt={benefit.alt || (typeof benefit === 'string' ? benefit : benefit.text)}
                        title={benefit.title || (typeof benefit === 'string' ? benefit : benefit.text)}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        width="400"
                        height="192"
                      />
                    </div>

                    {/* Text Content */}
                    <div className={`flex items-start ${shouldShowInUrdu('benefits') ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <SafeIcon icon={FiCheck} className="text-green-500 text-xl mt-1 flex-shrink-0" />
                      <h3
                        id={`benefit-${index}`}
                        className="font-semibold text-gray-800"
                        title={benefit.seoDescription || (typeof benefit === 'string' ? benefit : benefit.text)}
                      >
                        {typeof benefit === 'string' ? benefit : benefit.text}
                      </h3>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials - Always in English - Lazy Loaded */}
        <section className="py-12 md:py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {englishContent.testimonials.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {englishContent.testimonials.subtitle}
              </p>
            </motion.div>
            <Suspense fallback={<LoadingFallback />}>
              <TestimonialSlider testimonials={productConfigs[slug]?.testimonials || testimonials} />
            </Suspense>
          </div>
        </section>

        {/* Usage Instructions */}
        <section
          className={`py-12 md:py-16 bg-yellow-50 ${shouldShowInUrdu('usage') ? 'font-urdu' : ''}`}
          dir={shouldShowInUrdu('usage') ? 'rtl' : 'ltr'}
        >
          <div className="container mx-auto px-4">
            <motion.div className="max-w-4xl mx-auto" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
                {content.usage.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <SafeIcon icon={FiClock} className="text-4xl text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{content.usage.dosage.title}</h3>
                  {(() => {
                    const parts = String(content?.usage?.dosage?.text || '').split('•').map(s => s.trim()).filter(Boolean);
                    const isUrdu = shouldShowInUrdu('usage');
                    return (
                      <ul className={`list-disc ${isUrdu ? 'pr-5 text-right' : 'pl-5 text-left'} space-y-1`}>
                        {parts.map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    );
                  })()}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <SafeIcon icon={FiShield} className="text-4xl text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{content.usage.course.title}</h3>
                  <p className={`${shouldShowInUrdu('usage') ? 'text-right' : 'text-left'}`}>{content.usage.course.text}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <SafeIcon icon={FiHeart} className="text-4xl text-red-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{content.usage.best.title}</h3>
                  <p className={`${shouldShowInUrdu('usage') ? 'text-right' : 'text-left'}`}>{content.usage.best.text}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {content.pricing.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content.pricing.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* 1st Pack */}
              <motion.div
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-red-600 p-4 text-white text-center">
                  <h3 className="text-xl font-bold">
                    {slug === 'slim-n-shape-garcinia-cambogia-capsules'
                      ? (productConfigs[slug]?.pricing?.packages?.[0]?.headerTitle || content.pricing.packages[0].title)
                      : slug === 'b-maxtime-super-active'
                        ? (productConfigs[slug]?.pricing?.packages?.[0]?.headerTitle || '1 Pack')
                        : (productConfigs[slug]?.pricing?.packages?.[0]?.headerTitle || content.pricing.packages[0].title)}
                  </h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-4">
                    Rs {(productConfigs[slug]?.pricing?.packages?.[0]?.price?.toLocaleString?.()
                      || content?.pricing?.packages?.[0]?.price?.toLocaleString?.()
                      || '2,500')}
                    <span className="text-lg text-gray-500">/-</span>
                  </div>
                  <ul className="mb-6 text-left space-y-2">
                    {content.pricing.packages[0].features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <SafeIcon icon={FiCheck} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: feature }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* 2nd Pack */}
              <motion.div
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-red-700 p-4 text-white text-center">
                  <h3 className="text-xl font-bold">
                    {slug === 'slim-n-shape-garcinia-cambogia-capsules'
                      ? (productConfigs[slug]?.pricing?.packages?.[1]?.headerTitle || content.pricing.packages[1].title)
                      : slug === 'b-maxtime-super-active'
                        ? (productConfigs[slug]?.pricing?.packages?.[1]?.headerTitle || '2 Packs')
                        : (productConfigs[slug]?.pricing?.packages?.[1]?.headerTitle || content.pricing.packages[1].title)}
                  </h3>
                </div>
                <div className="p-6 text-center">
                  {slug === 'shahi-sultan-health-booster' ? (
                    <>
                      <div className="text-4xl font-bold text-gray-800 mb-2">
                        Rs {(productConfigs[slug]?.pricing?.packages?.[1]?.price?.toLocaleString?.()
                          || content?.pricing?.packages?.[1]?.price?.toLocaleString?.()
                          || '4,500')}
                        <span className="text-lg text-gray-500">/-</span>
                      </div>
                      {productConfigs[slug]?.pricing?.packages?.[1]?.saveAmount ? (
                        <div className="text-sm bg-green-100 text-green-800 inline-block px-2 py-1 rounded mb-4">
                          {content.pricing.save} {productConfigs[slug]?.pricing?.packages?.[1]?.saveAmount?.toLocaleString?.() || productConfigs[slug]?.pricing?.packages?.[1]?.saveAmount}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="flex justify-center items-center mb-4">
                      <div className="text-4xl font-bold text-gray-800">
                        Rs {(productConfigs[slug]?.pricing?.packages?.[1]?.price?.toLocaleString?.()
                          || content?.pricing?.packages?.[1]?.price?.toLocaleString?.()
                          || '4,500')}
                        <span className="text-lg text-gray-500">/-</span>
                      </div>
                      {slug === 'slim-n-shape-garcinia-cambogia-capsules' ? (
                        productConfigs[slug]?.pricing?.packages?.[1]?.saveAmount ? (
                          <div className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            {content.pricing.save} {productConfigs[slug]?.pricing?.packages?.[1]?.saveAmount?.toLocaleString?.() || productConfigs[slug]?.pricing?.packages?.[1]?.saveAmount}
                          </div>
                        ) : null
                      ) : slug === 'b-maxtime-super-active' ? null : (
                        <div className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          {content.pricing.save} {(productConfigs[slug]?.pricing?.packages?.[1]?.saveAmount?.toLocaleString?.()
                            || productConfigs[slug]?.pricing?.packages?.[1]?.saveAmount
                            || 500)}
                        </div>
                      )}
                    </div>
                  )}

                  <ul className="mb-6 text-left space-y-2">
                    {content.pricing.packages[1].features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <SafeIcon icon={FiCheck} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: feature }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* 3rd Pack */}
              <motion.div
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-red-100 hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-red-700 p-4 text-white text-center relative overflow-hidden">
                  <h3 className="text-xl font-bold">
                    {slug === 'slim-n-shape-garcinia-cambogia-capsules'
                      ? (productConfigs[slug]?.pricing?.packages?.[2]?.headerTitle || content.pricing.packages[2].title)
                      : slug === 'b-maxtime-super-active'
                        ? (productConfigs[slug]?.pricing?.packages?.[2]?.headerTitle || '3 Packs')
                        : (productConfigs[slug]?.pricing?.packages?.[2]?.headerTitle || content.pricing.packages[2].title)}
                  </h3>
                  {/* Optional Popular badge */}
                  <span className="absolute top-2 right-2 bg-yellow-300 text-red-800 text-xs font-bold px-2 py-1 rounded">
                    {content.pricing.popular}
                  </span>
                </div>
                <div className="p-6 text-center">
                  {slug === 'shahi-sultan-health-booster' ? (
                    <>
                      <div className="text-4xl font-bold text-gray-800 mb-2">
                        Rs {(productConfigs[slug]?.pricing?.packages?.[2]?.price?.toLocaleString?.()
                          || content?.pricing?.packages?.[2]?.price?.toLocaleString?.()
                          || '6,000')}
                        <span className="text-lg text-gray-500">/-</span>
                      </div>
                      {productConfigs[slug]?.pricing?.packages?.[2]?.saveAmount ? (
                        <div className="text-sm bg-green-100 text-green-800 inline-block px-2 py-1 rounded mb-4">
                          {content.pricing.save} {(productConfigs[slug]?.pricing?.packages?.[2]?.saveAmount?.toLocaleString?.()
                            || productConfigs[slug]?.pricing?.packages?.[2]?.saveAmount
                            || '1,500')}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="flex justify-center items-center mb-4">
                      <div className="text-4xl font-bold text-gray-800">
                        Rs {(productConfigs[slug]?.pricing?.packages?.[2]?.price?.toLocaleString?.()
                          || content?.pricing?.packages?.[2]?.price?.toLocaleString?.()
                          || '6,000')}
                        <span className="text-lg text-gray-500">/-</span>
                      </div>
                      {slug === 'slim-n-shape-garcinia-cambogia-capsules' ? (
                        productConfigs[slug]?.pricing?.packages?.[2]?.saveAmount ? (
                          <div className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            {content.pricing.save} {productConfigs[slug]?.pricing?.packages?.[2]?.saveAmount?.toLocaleString?.() || productConfigs[slug]?.pricing?.packages?.[2]?.saveAmount}
                          </div>
                        ) : null
                      ) : slug === 'b-maxtime-super-active' ? null : (
                        <div className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          {content.pricing.save} {(productConfigs[slug]?.pricing?.packages?.[2]?.saveAmount?.toLocaleString?.()
                            || productConfigs[slug]?.pricing?.packages?.[2]?.saveAmount
                            || '1,500')}
                        </div>
                      )}
                    </div>
                  )}

                  <ul className="mb-6 text-left space-y-2">
                    {content.pricing.packages[2].features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <SafeIcon icon={FiCheck} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: feature }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Lazy Loaded */}
        <Suspense fallback={<LoadingFallback />}>
          <FAQSection
            language={language}
            overrideTitle={(slug === 'slim-n-shape-garcinia-cambogia-capsules' || slug === 'slim-n-shape-tea' || slug === 'b-maxtime-super-active' || slug === 'shahi-sultan-health-booster') ? (language === 'ur' ? productConfigs[slug]?.i18n?.ur?.faqTitle : productConfigs[slug]?.faqTitle) : undefined}
            overrideSubtitle={(slug === 'slim-n-shape-garcinia-cambogia-capsules' || slug === 'slim-n-shape-tea' || slug === 'b-maxtime-super-active' || slug === 'shahi-sultan-health-booster') ? (language === 'ur' ? productConfigs[slug]?.i18n?.ur?.faqSubtitle : productConfigs[slug]?.faqSubtitle) : undefined}
            overrideFaqs={(slug === 'slim-n-shape-garcinia-cambogia-capsules' || slug === 'slim-n-shape-tea' || slug === 'b-maxtime-super-active' || slug === 'shahi-sultan-health-booster') ? (language === 'ur' ? productConfigs[slug]?.i18n?.ur?.faqs : productConfigs[slug]?.faqs) : undefined}
            ctaLanguage={(slug === 'slim-n-shape-tea' || slug === 'slim-n-shape-garcinia-cambogia-capsules') ? 'en' : undefined}
          />
        </Suspense>

        {/* Order Form */}
        <section id="order-form" className="py-12 md:py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="container mx-auto px-4">
            <motion.div className="max-w-2xl mx-auto" {...fadeInUp}>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.orderForm.title}</h2>
                <p className="text-xl text-red-100">{content.orderForm.subtitle}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <div className="grid gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">{content.orderForm.name} *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg text-gray-800 border focus:ring-2 focus:ring-yellow-400 outline-none"
                      placeholder={content.orderForm.namePlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">{content.orderForm.phone} *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg text-gray-800 border focus:ring-2 focus:ring-yellow-400 outline-none"
                      placeholder="03XX-XXXXXXX"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold mb-2">{content.orderForm.address} *</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg text-gray-800 border focus:ring-2 focus:ring-yellow-400 outline-none"
                      placeholder={content.orderForm.addressPlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold mb-2">{content.orderForm.city} *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg text-gray-800 border focus:ring-2 focus:ring-yellow-400 outline-none"
                      placeholder={content.orderForm.cityPlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-semibold mb-2">{content.orderForm.quantity}</label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg text-gray-800 border focus:ring-2 focus:ring-yellow-400 outline-none"
                    >
                      <option value="1">
                        {slug === 'slim-n-shape-tea'
                          ? `1 Pack - Rs ${productConfigs['slim-n-shape-tea']?.pricing?.packages?.[0]?.price?.toLocaleString?.() || productConfigs['slim-n-shape-tea']?.pricing?.packages?.[0]?.price}`
                          : (slug === 'slim-n-shape-garcinia-cambogia-capsules'
                            ? `1 Month Pack - Rs ${productConfigs[slug]?.pricing?.packages?.[0]?.price?.toLocaleString?.() || productConfigs[slug]?.pricing?.packages?.[0]?.price}`
                            : (slug === 'b-maxtime-super-active'
                              ? `1 Pack - Rs ${productConfigs[slug]?.pricing?.packages?.[0]?.price?.toLocaleString?.() || 1200}`
                              : (slug === 'shahi-sultan-health-booster'
                                ? `1 Pack - Rs ${productConfigs[slug]?.pricing?.packages?.[0]?.price?.toLocaleString?.() || productConfigs[slug]?.pricing?.packages?.[0]?.price}`
                                : content.orderForm.quantityOptions[0])))}
                      </option>
                      <option value="2">
                        {slug === 'slim-n-shape-tea'
                          ? `2 Packs - Rs ${productConfigs['slim-n-shape-tea']?.pricing?.packages?.[1]?.price?.toLocaleString?.() || productConfigs['slim-n-shape-tea']?.pricing?.packages?.[1]?.price}`
                          : (slug === 'slim-n-shape-garcinia-cambogia-capsules'
                            ? `2 Month Pack - Rs ${productConfigs[slug]?.pricing?.packages?.[1]?.price?.toLocaleString?.() || productConfigs[slug]?.pricing?.packages?.[1]?.price}`
                            : (slug === 'b-maxtime-super-active'
                              ? `2 Packs - Rs ${productConfigs[slug]?.pricing?.packages?.[1]?.price?.toLocaleString?.() || 2000}`
                              : (slug === 'shahi-sultan-health-booster'
                                ? `2 Packs - Rs ${productConfigs[slug]?.pricing?.packages?.[1]?.price?.toLocaleString?.() || productConfigs[slug]?.pricing?.packages?.[1]?.price}`
                                : content.orderForm.quantityOptions[1])))}
                      </option>
                      <option value="3">
                        {slug === 'slim-n-shape-tea'
                          ? `3 Packs - Rs ${productConfigs['slim-n-shape-tea']?.pricing?.packages?.[2]?.price?.toLocaleString?.() || productConfigs['slim-n-shape-tea']?.pricing?.packages?.[2]?.price}`
                          : (slug === 'slim-n-shape-garcinia-cambogia-capsules'
                            ? `3 Month Pack - Rs ${productConfigs[slug]?.pricing?.packages?.[2]?.price?.toLocaleString?.() || productConfigs[slug]?.pricing?.packages?.[2]?.price}`
                            : (slug === 'b-maxtime-super-active'
                              ? `3 Packs - Rs ${productConfigs[slug]?.pricing?.packages?.[2]?.price?.toLocaleString?.() || 3000}`
                              : (slug === 'shahi-sultan-health-booster'
                                ? `3 Packs - Rs ${productConfigs[slug]?.pricing?.packages?.[2]?.price?.toLocaleString?.() || productConfigs[slug]?.pricing?.packages?.[2]?.price}`
                                : content.orderForm.quantityOptions[2])))}
                      </option>
                    </select>
                  </div>

                  <div className="bg-yellow-400 text-red-800 p-4 rounded-lg text-center">
                    <p className="font-bold text-lg">
                      {content.orderForm.total}: Rs {calculatePrice(formData.quantity)}/-
                    </p>
                    <p className="text-sm">{content.orderForm.freeDelivery}</p>
                  </div>

                  <motion.button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 text-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SafeIcon icon={FiShoppingCart} className="text-xl" />
                    <span>{content.orderForm.orderButton}</span>
                  </motion.button>

                  <div className="text-center text-red-100">
                    <p className="flex items-center justify-center space-x-2">
                      <SafeIcon icon={FiTruck} />
                      <span>{content.orderForm.sameDayDelivery}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
            aria-label="Back to top"
          >
            <SafeIcon icon={FiChevronUp} className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;