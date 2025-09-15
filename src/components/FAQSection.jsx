import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronDown, FiChevronUp } = FiIcons;

const FAQSection = ({ language = 'en', overrideTitle, overrideSubtitle, overrideFaqs, ctaLanguage, slug }) => {
    const [openFAQ, setOpenFAQ] = useState(null);

    // Memoize FAQ data for better performance
    const faqData = useMemo(() => ({
        en: {
            title: "B-Maxman Royal Special Treatment – FAQs",
            subtitle: "Get answers to the most common questions about B-Maxman herbal male enhancement supplement",
            faqs: [
                {
                    question: "What is B-Maxman?",
                    answer: "B-Maxman is a 100% herbal male power supplement that naturally boosts performance, stamina and confidence.",
                    keywords: "B-Maxman, herbal supplement, male enhancement, natural performance booster"
                },
                {
                    question: "Is it safe?",
                    answer: "Yes, it contains 30+ world-famous herbal ingredients that have been tested and proven for centuries. No harmful chemicals or steroids.",
                    keywords: "safe herbal supplement, natural ingredients, no side effects, tested formula"
                },
                {
                    question: "What problems does it help with?",
                    answer: "• Premature Ejaculation (P.E)\n• Erectile Dysfunction (E.D)\n• Low Libido / Low Testosterone\n• Fatigue & Weakness\n• Confidence & Relationship Issues",
                    keywords: "premature ejaculation treatment, erectile dysfunction cure, low testosterone, male stamina, confidence booster"
                },
                {
                    question: "When will I feel the results?",
                    answer: "Most users feel improvement within 2-3 weeks. For full results, a 3-month course is recommended.",
                    keywords: "B-Maxman results timeline, how long to see results, 3 month course, male enhancement results"
                },
                {
                    question: "What is the dosage?",
                    answer: "1 capsule at night before sleep with water. Avoid cold drinks, smoking and fried food for best results.",
                    keywords: "B-Maxman dosage, how to take, capsule instructions, usage guidelines"
                },
                {
                    question: "Are there any side effects?",
                    answer: "No, it is herbal and safe. If you have any chronic medical condition, consult your doctor.",
                    keywords: "B-Maxman side effects, herbal safety, natural supplement safety, doctor consultation"
                },
                {
                    question: "What is the price?",
                    answer: "• 1 Month Pack: Rs 2,500/- (Free Delivery)\n• 2 Month Pack: Rs 4,500/- (Save Rs 500)\n• 3 Month Course: Rs 6,000/- (Save Rs 1,500 – Best Value)",
                    keywords: "B-Maxman price Pakistan, cost, free delivery, discount packages, best value"
                },
                {
                    question: "How is delivery done?",
                    answer: "Free delivery to every city in Pakistan. Same-day delivery in Karachi. Payment Cash on Delivery.",
                    keywords: "free delivery Pakistan, same day delivery Karachi, cash on delivery, COD payment"
                },
                {
                    question: "How to order?",
                    answer: "📞 Call / WhatsApp: 0332-8888935\n🌐 Website: www.tphint.com",
                    keywords: "order B-Maxman, WhatsApp order, phone order, online order Pakistan"
                },
                {
                    question: "Who is the manufacturer?",
                    answer: "This product is from The Planner Herbal International – Pakistan's trusted herbal brand.",
                    keywords: "The Planner Herbal International, trusted manufacturer, Pakistan herbal brand, authentic product"
                }
            ]
        },
        ur: {
            title: "بی میکس مین رائل اسپیشل ٹریٹمنٹ – اکثر پوچھے جانے والے سوالات",
            subtitle: "بی میکس مین جڑی بوٹیوں کے مردانہ طاقت کے سپلیمنٹ کے بارے میں عام سوالات کے جوابات حاصل کریں",
            faqs: [
                {
                    question: "B-Maxman کیا ہے؟",
                    answer: "B-Maxman ایک 100% جڑی بوٹیوں پر مبنی مردانہ طاقت کا سپلیمنٹ ہے جو قدرتی طور پر کارکردگی، برداشت اور اعتماد بڑھاتا ہے۔",
                    keywords: "بی میکس مین، جڑی بوٹیوں کا سپلیمنٹ، مردانہ طاقت، قدرتی کارکردگی"
                },
                {
                    question: "کیا یہ محفوظ ہے؟",
                    answer: "ہاں، اس میں 30+ عالمی شہرت یافتہ جڑی بوٹیاں ہیں، جو صدیوں سے آزمائی اور ثابت شدہ ہیں۔ کوئی نقصان دہ کیمیکل یا سٹیرائیڈز نہیں۔",
                    keywords: "محفوظ جڑی بوٹیوں کا سپلیمنٹ، قدرتی اجزاء، کوئی ضمنی اثرات نہیں، آزمائی ہوئی فارمولا"
                },
                {
                    question: "یہ کن مسائل میں مدد کرتا ہے؟",
                    answer: "• جلدی فارغ ہونا (P.E)\n• مردانہ کمزوری (E.D)\n• کم جنسی خواہش / کم ٹیسٹوسٹیرون\n• تھکاوٹ اور کمزوری\n• اعتماد اور رشتوں کے مسائل",
                    keywords: "جلدی فارغ ہونے کا علاج، مردانہ کمزوری کا علاج، کم ٹیسٹوسٹیرون، مردانہ برداشت، اعتماد بڑھانے والا"
                },
                {
                    question: "نتائج کب سے محسوس ہوں گے؟",
                    answer: "زیادہ تر صارفین 2-3 ہفتوں میں بہتری محسوس کرتے ہیں۔ مکمل نتائج کے لیے 3 ماہ کا کورس تجویز کیا جاتا ہے۔",
                    keywords: "بی میکس مین نتائج کا وقت، کتنے دن میں فائدہ، 3 ماہ کورس، مردانہ طاقت کے نتائج"
                },
                {
                    question: "خوراک کیا ہے؟",
                    answer: "رات کو سونے سے پہلے پانی کے ساتھ 1 کیپسول۔ بہترین نتائج کے لیے ٹھنڈے مشروبات، تمباکو نوشی اور تلی ہوئی غذا سے بچیں۔",
                    keywords: "بی میکس مین خوراک، کیسے استعمال کریں، کیپسول کی ہدایات، استعمال کے طریقے"
                },
                {
                    question: "کیا کوئی ضمنی اثرات ہیں؟",
                    answer: "نہیں، یہ جڑی بوٹیوں پر مبنی اور محفوظ ہے۔ اگر آپ کسی دائمی طبی حالت کے مریض ہیں تو اپنے ڈاکٹر سے مشورہ کریں۔",
                    keywords: "بی میکس مین ضمنی اثرات، جڑی بوٹیوں کی حفاظت، قدرتی سپلیمنٹ کی حفاظت، ڈاکٹر سے مشورہ"
                },
                {
                    question: "قیمت کیا ہے؟",
                    answer: "• 1 ماہ پیک: 2,500 روپے (مفت ڈیلیوری)\n• 2 ماہ پیک: 4,500 روپے (500 روپے کی بچت)\n• 3 ماہ کورس: 6,000 روپے (1,500 روپے کی بچت – بہترین قیمت)",
                    keywords: "بی میکس مین قیمت پاکستان، کتنے پیسے، مفت ڈیلیوری، ڈسکاؤنٹ پیکجز، بہترین قیمت"
                },
                {
                    question: "ڈیلیوری کیسے ہوگی؟",
                    answer: "پاکستان کے ہر شہر میں مفت ڈیلیوری۔ کراچی میں اسی دن ڈیلیوری۔ ادائیگی کیش آن ڈیلیوری۔",
                    keywords: "مفت ڈیلیوری پاکستان، کراچی میں اسی دن ڈیلیوری، کیش آن ڈیلیوری، COD ادائیگی"
                },
                {
                    question: "آرڈر کیسے کریں؟",
                    answer: "📞 کال / واٹس ایپ: 0332-8888935\n🌐 ویب سائٹ: www.tphint.com",
                    keywords: "بی میکس مین آرڈر، واٹس ایپ آرڈر، فون آرڈر، آن لائن آرڈر پاکستان"
                },
                {
                    question: "بنانے والا کون ہے؟",
                    answer: "یہ پروڈکٹ دی پلانر ہربل انٹرنیشنل کا ہے – پاکستان کا قابل اعتماد جڑی بوٹیوں کا برانڈ۔",
                    keywords: "دی پلانر ہربل انٹرنیشنل، قابل اعتماد بنانے والا، پاکستان جڑی بوٹیوں کا برانڈ، اصل پروڈکٹ"
                }
            ]
        }
    }), []);

    // CTA language (can be forced independent of page language)
    const effectiveCtaLang = ctaLanguage ?? language;

    const currentContent = useMemo(() => {
        const base = faqData[language];
        return {
            title: overrideTitle || base.title,
            subtitle: overrideSubtitle ?? base.subtitle,
            faqs: Array.isArray(overrideFaqs) && overrideFaqs.length > 0 ? overrideFaqs : base.faqs
        };
    }, [faqData, language, overrideTitle, overrideSubtitle, overrideFaqs]);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    // Generate structured data for SEO
    const structuredData = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": currentContent.faqs.map((faq, index) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }), [currentContent.faqs]);

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <>
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            
            <section
                className={`py-12 md:py-16 ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'bg-gradient-to-br from-black to-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} ${language === 'ur' ? 'font-urdu' : ''}`}
                dir={language === 'ur' ? 'rtl' : 'ltr'}
                aria-labelledby="faq-heading"
                role="region"
                itemScope
                itemType="https://schema.org/FAQPage"
            >
            <div className="container mx-auto px-4">
                <motion.div className="text-center mb-12" {...fadeInUp}>
                    <h2
                        id="faq-heading"
                        className={`text-3xl md:text-4xl font-bold mb-4 ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'text-yellow-400' : 'text-gray-800'}`}
                        title={language === 'en' ? "Frequently asked questions about B-Maxman Royal herbal supplement" : "بی میکس مین رائل جڑی بوٹیوں کے سپلیمنٹ کے بارے میں اکثر پوچھے جانے والے سوالات"}
                        itemProp="name"
                    >
                        {currentContent.title}
                    </h2>
                    {currentContent.subtitle && (
                        <p className={`text-lg max-w-3xl mx-auto mt-4 ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'text-yellow-300' : 'text-gray-600'}`}>
                            {currentContent.subtitle}
                        </p>
                    )}
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {currentContent.faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            itemScope
                            itemType="https://schema.org/Question"
                            itemProp="mainEntity"
                        >
                            <div className={`rounded-lg shadow-lg overflow-hidden ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'bg-gray-800 border border-yellow-400' : 'bg-white border border-gray-100'}`}>
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className={`w-full px-6 py-4 text-left flex justify-between items-center transition-colors ${language === 'ur' ? 'text-right' : ''} ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                                    aria-expanded={openFAQ === index}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <h3 
                                        className={`font-semibold text-lg ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'text-yellow-400' : 'text-gray-800'}`}
                                        itemProp="name"
                                        title={faq.keywords}
                                    >
                                        {faq.question}
                                    </h3>
                                    <SafeIcon
                                        icon={openFAQ === index ? FiChevronUp : FiChevronDown}
                                        className={`text-xl flex-shrink-0 ml-2 ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'text-yellow-400' : 'text-red-600'}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openFAQ === index && (
                                        <motion.div
                                            id={`faq-answer-${index}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div 
                                                className={`px-6 pb-4 ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'border-t border-yellow-400' : 'border-t border-gray-100'}`}
                                                itemScope
                                                itemType="https://schema.org/Answer"
                                                itemProp="acceptedAnswer"
                                            >
                                                <div 
                                                    className={`pt-4 leading-relaxed whitespace-pre-line ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'text-gray-300' : 'text-gray-700'}`}
                                                    itemProp="text"
                                                    title={faq.keywords}
                                                >
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className={`p-6 rounded-xl shadow-lg max-w-2xl mx-auto ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'bg-gray-800/80 backdrop-blur-sm border border-yellow-400' : 'bg-white/80 backdrop-blur-sm border border-red-100'}`}>
                        {/* Force direction/font for CTA independently to fix alignment */}
                        <div dir={effectiveCtaLang === 'ur' ? 'rtl' : 'ltr'} className={`${effectiveCtaLang === 'ur' ? 'font-urdu' : ''}`}>
                            <p className={`text-lg font-semibold mb-4 ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'text-yellow-400' : 'text-gray-800'}`}>
                                {effectiveCtaLang === 'en' ?
                                    "Still have questions? Contact us directly!" :
                                    "اب بھی سوالات ہیں؟ براہ راست رابطہ کریں!"
                                }
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" dir={effectiveCtaLang === 'ur' ? 'rtl' : 'ltr'}>
                            <a
                                href="tel:923328888935"
                                className={`font-bold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 ${slug === 'sultan-shahi-gold-majoon' || slug === 'sultan-shahi-gold-tila' ? 'bg-yellow-600 hover:bg-yellow-700 text-black' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                                aria-label="Call B-Maxman customer service"
                                title="Call for B-Maxman orders and queries"
                            >
                                <span>📞</span>
                                <span>0332-8888935</span>
                            </a>
                            <a
                                href="https://wa.me/923328888935"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
                                aria-label="WhatsApp B-Maxman customer service"
                                title="WhatsApp for B-Maxman orders and support"
                            >
                                <span>💬</span>
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
        </>
    );
};

export default React.memo(FAQSection);