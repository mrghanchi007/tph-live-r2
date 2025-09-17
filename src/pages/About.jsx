import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { PRODUCTS } from '../common/products';
import SEOHead from '../components/SEOHead';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

const About = () => {
  return (
    <div className="relative">
      {/* SEO Head */}
      <SEOHead 
        title="About Us – TPH Live | Pakistan's Leading Herbal Products Company"
        description="Discover TPH Live's 20+ year journey in providing authentic herbal products across Pakistan. Quality natural ingredients, customer satisfaction & trusted since 2002."
        keywords="About TPH Live, herbal products manufacturer Pakistan, natural supplements company, The Planner Herbal International, herbal medicine company Pakistan"
        image="https://tphlive.com/images/About%20TPH%20International.png"
        url="https://tphlive.com/about"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "TPH Live - The Planner Herbal International",
            "foundingDate": "2002",
            "description": "Pakistan's leading herbal products company providing natural health solutions since 2002.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "PK"
            }
          }
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-4xl">
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold mb-4">
              About Us – The Planner Herbal International (TPH Int.)
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-red-50 max-w-3xl">
              Welcome to The Planner Herbal International (TPH Int.). Since 2002, we have been dedicated to delivering the highest
              quality natural products to meet our customers’ health and nutritional needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              TPH Int. is a manufacturer, packager, and distributor of premium natural health and nutritional products. We proudly cater
              to both large-scale OEM clients and individual customers, ensuring quality, innovation, and service excellence.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img
              src="/images/About TPH International.png"
              alt="TPH International Facility"
              className="rounded-xl shadow-lg w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <motion.div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-hidden" variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="h-40 mb-4 overflow-hidden rounded-lg">
              <img 
                src="/images/Our Mission.png" 
                alt="Our Mission" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-700">
              To improve public health by offering an unrivaled and innovative portfolio of natural health products.
            </p>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-hidden" variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="h-40 mb-4 overflow-hidden rounded-lg">
              <img 
                src="/images/Our Vision.png" 
                alt="Our Vision" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
            <p className="text-gray-700">
              To be Pakistan's most valuable natural health producer and distributor, setting benchmarks for quality and affordability in international markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[ 
              {
                text: 'Provide a rewarding and safe workplace for our employees.',
                image: '/images/Our Values 1.png'
              },
              {
                text: 'Operate with integrity, transparency, and mutual respect.',
                image: '/images/Our Values 2.png'
              },
              {
                text: 'Commit to operational excellence and strong collaboration.',
                image: '/images/Our Values 3.png'
              },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 overflow-hidden" 
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="h-40 mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={item.image} 
                    alt={`Value ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <motion.img
            src="/images/Why Choose TPH Int.png"
            alt="Why Choose TPH International"
            className="rounded-xl shadow-lg w-full object-cover order-last md:order-first"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            loading="lazy"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose TPH Int.?</h3>
            <ul className="space-y-3 text-gray-800">
              {[
                'Highest quality health and nutritional products.',
                'Sales and marketing support to boost your business.',
                'Friendly customer service with rapid response.',
                'Flexible order options for your convenience.',
                'Custom packaging and labeling tailored to your needs.',
              ].map((item, i) => (
                <motion.li key={i} className="flex items-start gap-3" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                  <span className="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-red-600" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Products & Categories */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Products & Categories</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* MEN */}
            <Link to="/shop/men">
              <motion.div 
                initial={{ opacity: 0, y: 12 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.4 }} 
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow h-full"
              >
                <img
                  src="/images/MEN.png"
                  alt="Men's wellness products"
                  className="w-full h-36 md:h-40 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
                <h4 className="text-xl font-semibold text-gray-900 mb-3">MEN</h4>
                <ul className="space-y-2 text-gray-800">
                  {PRODUCTS.men.map((product, i) => (
                    <li key={i} className="flex items-start group">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2"></span>
                      <span className="group-hover:text-red-600 transition-colors">{product.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-red-600 font-medium flex items-center">
                  View All Products <FiArrowRight className="ml-1" />
                </div>
              </motion.div>
            </Link>

            {/* WOMEN */}
            <Link to="/shop/women">
              <motion.div 
                initial={{ opacity: 0, y: 12 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.4, delay: 0.05 }} 
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow h-full"
              >
                <img
                  src="/images/WOMEN.png"
                  alt="Women's wellness products"
                  className="w-full h-36 md:h-40 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
                <h4 className="text-xl font-semibold text-gray-900 mb-3">WOMEN</h4>
                <ul className="space-y-2 text-gray-800">
                  {PRODUCTS.women.map((product, i) => (
                    <li key={i} className="flex items-start group">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2"></span>
                      <span className="group-hover:text-red-600 transition-colors">{product.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-red-600 font-medium flex items-center">
                  View All Products <FiArrowRight className="ml-1" />
                </div>
              </motion.div>
            </Link>

            {/* WEIGHT LOSE */}
            <Link to="/shop/weight-lose">
              <motion.div 
                initial={{ opacity: 0, y: 12 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.4, delay: 0.1 }} 
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow h-full"
              >
                <img
                  src="/images/WEIGHT LOSE.png"
                  alt="Weight management products"
                  className="w-full h-36 md:h-40 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
                <h4 className="text-xl font-semibold text-gray-900 mb-3">WEIGHT LOSE</h4>
                <ul className="space-y-2 text-gray-800">
                  {PRODUCTS['weight-lose'].map((product, i) => (
                    <li key={i} className="flex items-start group">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2"></span>
                      <span className="group-hover:text-red-600 transition-colors">{product.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-red-600 font-medium flex items-center">
                  View All Products <FiArrowRight className="ml-1" />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-white mb-6">Quality Assurance</h3>

          {/* Image Row */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              '/images/Quality Assurance 1.png',
              '/images/Quality Assurance 2.png',
              '/images/Quality Assurance 3.png',
            ].map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Quality image ${i + 1}`}
                className="w-full h-40 md:h-48 object-cover rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                loading="lazy"
              />
            ))}
          </div>

          {/* Points */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'We use natural ingredients of the highest grade in all supplements.',
              'Every production step follows strict safety and quality standards.',
              'Our Just-In-Time manufacturing helps control production costs, passing the savings to our customers.',
            ].map((t, i) => (
              <motion.div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                <p className="text-gray-100">{t}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OEM & Private Label Services */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">OEM & Private Label Services</h3>
          <p className="text-gray-700 max-w-3xl mb-6">We provide one-stop, hassle-free OEM services, including:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Private Label',
              'Contract Manufacturing',
              'Custom Packaging',
              'Label Design',
            ].map((s, i) => (
              <motion.div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                <span className="font-semibold text-gray-900">{s}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[
              'Manufacture to customer’s specifications.',
              'Packaging with your own brand label.',
              'Assistance with design and branding.',
              'Use of GMP-certified facilities for all products.',
            ].map((a, i) => (
              <motion.div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                <span className="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-red-600" />
                <p className="text-gray-800">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-12 md:py-16 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute -top-10 right-10 w-40 h-40 bg-red-500/20 rounded-full blur-2xl" />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-2xl font-bold mb-3">Our Commitment</h3>
              <p className="text-gray-100">
                With technical expertise, R&D capabilities, and dedicated customer service, we ensure products that exceed expectations.
                Whether you need ready-to-sell products or custom manufacturing, TPH Int. is your trusted partner in the natural health industry.
              </p>
            </motion.div>
            <motion.img
              src="https://images.unsplash.com/photo-1582719366769-3b10d8ebf0d2?q=80&w=1400&auto=format&fit=crop"
              alt="Commitment to Excellence"
              className="rounded-xl shadow-lg w-full object-cover"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
