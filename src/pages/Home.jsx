import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTruck, FiAward, FiShield, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { PRODUCTS, slugifyProduct } from '../common/products';
import { FaLeaf, FaIndustry, FaBoxes, FaHandshake } from 'react-icons/fa';
import SEOHead from '../components/SEOHead';

const Home = () => {

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Get featured products (first 3 from each category)
  const featuredProducts = [
    ...PRODUCTS.men.slice(0, 1),
    ...PRODUCTS.women.slice(0, 1),
    ...PRODUCTS['weight-lose'].slice(0, 1)
  ].map(product => ({
    ...product,
    slug: slugifyProduct(product.name)
  }));

  const categories = [
    { 
      name: "Men's Wellness", 
      slug: "men", 
      image: "/images/MEN.png",
      description: 'Premium herbal supplements for men\'s health and vitality'
    },
    { 
      name: "Women's Wellness", 
      slug: "women", 
      image: "/images/WOMEN.png",
      description: 'Natural wellness products for women\'s health'
    },
    { 
      name: "Weight Management", 
      slug: "weight-lose", 
      image: "/images/WEIGHT LOSE.png",
      description: 'Herbal solutions for healthy weight management'
    }
  ];

  const features = [
    { icon: <FaLeaf className="w-8 h-8 mb-3 text-red-600" />, title: "Premium Quality Ingredients" },
    { icon: <FaIndustry className="w-8 h-8 mb-3 text-red-600" />, title: "GMP Certified Facility" },
    { icon: <FaBoxes className="w-8 h-8 mb-3 text-red-600" />, title: "Custom Packaging & Private Label" },
    { icon: <FaHandshake className="w-8 h-8 mb-3 text-red-600" />, title: "OEM Services for Businesses" }
  ];

  return (
    <div className="bg-white">
      {/* SEO Head */}
      <SEOHead type="page" slug="home" />
      {/* 1️⃣ Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white to-red-50 opacity-90"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              {/* Animated Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                {['100% Natural', 'GMP Certified', 'Herbal Remedies'].map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-full"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Natural Health &<br />
                <span className="text-red-600">Nutritional Products</span><br />
                <span className="text-2xl md:text-3xl text-gray-600">Since 2002</span>
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-100 to-yellow-100 rounded-2xl transform rotate-1 -z-10"></div>
                <img 
                  src="/images/About TPH International.png" 
                  alt="Herbal Products" 
                  className="w-full h-auto rounded-xl shadow-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=Herbal+Products';
                  }}
                />
                
                {/* Floating Badge */}
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: -5 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200"
                >
                  <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-full mr-2">
                      <FiAward className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Trusted Since</p>
                      <p className="font-bold text-gray-900">2002</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Bottom CTA */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Premium Herbal Supplements for Men, Women & Weight Management
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link 
                to="/shop" 
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Shop Now
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-white hover:bg-gray-50 text-red-600 border-2 border-red-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get a Quote
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              {[
                { icon: <FiTruck className="w-6 h-6" />, text: "Free Delivery" },
                { icon: <FaLeaf className="w-6 h-6" />, text: "100% Natural" },
                { icon: <FiShield className="w-6 h-6" />, text: "GMP Certified" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700">
                  <div className="bg-red-100 p-2 rounded-full text-red-600">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Sellers</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full"
              >
                <div className="h-64 overflow-hidden bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/600x600?text=${product.name.replace(/\s+/g, '+')}`;
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="mt-auto">
                    <p className="text-red-600 font-bold text-lg mb-4">PKR {product.price.toLocaleString()}</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        to={`/product/${product.slug}`}
                        className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        View Details
                      </Link>
                      <a 
                        href={`https://wa.me/923328888935?text=I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <FaWhatsapp className="text-lg" />
                        Order Now
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ Why Choose TPH Int. */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TPH Int.</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-4">{feature.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4️⃣ About TPH Int. */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/About TPH International.png" 
                  alt="TPH International" 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x600?text=TPH+International';
                  }}
                />
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About TPH International</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Since 2002, The Planner Herbal International has been at the forefront of producing premium herbal health products. 
                We cater not only to individual wellness needs but also provide comprehensive OEM solutions for businesses 
                looking to launch their own line of herbal supplements.
              </p>
              <Link 
                to="/about" 
                className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                Read More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5️⃣ Product Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Product Categories</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div 
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-8">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/600x400?text=${category.name.replace(/\s+/g, '+')}`;
                    }}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <Link 
                    to={`/shop/${category.slug}`}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    Explore {category.name.split(' ')[0]}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ Quality Assurance */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <FiShield className="w-12 h-12 text-green-600 mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed">
              "We follow strict quality standards at every step – from ingredient sourcing to final packaging."
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7️⃣ CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the TPH Difference?</h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're looking for premium herbal supplements or want to start your own brand, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/shop" 
                className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
