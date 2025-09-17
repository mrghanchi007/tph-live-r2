import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORY_LIST, PRODUCTS, slugifyProduct } from '../common/products';
import SEOHead from '../components/SEOHead';

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Flatten all products with category info
  const allProducts = useMemo(() => {
    const items = [];
    Object.entries(PRODUCTS).forEach(([cat, list]) => {
      list.forEach(p => items.push({ ...p, category: cat }));
    });
    return items;
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return allProducts;
    return allProducts.filter(p => p.category === selectedCategory);
  }, [selectedCategory, allProducts]);
  return (
    <>
      {/* SEO Head */}
      <SEOHead 
        title="Shop Herbal Products Online | TPH Live Pakistan"
        description="Browse our complete range of herbal products for men's health, women's wellness & weight management. Authentic natural supplements with free delivery across Pakistan."
        keywords="buy herbal products online Pakistan, natural supplements shop, men's health products, women's wellness products, weight management supplements, TPH Live shop"
        image="https://i.ibb.co/LDHXRX81/fav.png"
        url="https://tphlive.com/shop"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Herbal Products Shop",
          "description": "Complete range of herbal products for health and wellness",
          "url": "https://tphlive.com/shop"
        }}
      />
      <SEOHead 
        title="Shop Herbal Products Online Pakistan | TPH Live Store"
        description="Shop authentic herbal products online in Pakistan. Wide range of natural supplements for men, women & weight loss. Cash on delivery available nationwide."
        keywords="buy herbal products online Pakistan, herbal supplements shop, natural medicine store, online herbal store"
        image="https://tphlive.com/images/tph-live-logo.png"
        url="https://tphlive.com/shop"
      />
      {/* Hero Header (match About hero) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl">
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-5xl font-extrabold mb-4">
              Shop – The Planner Herbal International (TPH Int.)
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="text-lg md:text-xl text-red-50 max-w-3xl">
              Choose from our authentic product range. Quality you can trust, since 2002.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {CATEGORY_LIST.map((c, i) => (
              <motion.div
                key={c.slug}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group relative bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <Link to={`/shop/${c.slug}`} className="block hover:no-underline">
                  <div className="aspect-[4/3] bg-white flex items-center justify-center p-6">
                    <img
                      src={c.image}
                      alt={`${c.label} category cover`}
                      title={`${c.label} | The Planner Herbal International`}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const current = e.currentTarget.src;
                        if (current.endsWith('.png')) {
                          e.currentTarget.src = current.replace(/\.png$/, '.jpg');
                        } else if (current.endsWith('.jpg')) {
                          e.currentTarget.src = '/images/placeholder-product.png';
                        }
                      }}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 leading-snug tracking-wide">{c.label}</h3>
                  </div>
                </Link>
                <div className="px-4 pb-5 text-center">
                  <Link
                    to={`/shop/${c.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md shadow-sm transition-colors"
                    aria-label={`View ${c.label} products`}
                  >
                    View Products <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            <div className="flex items-center gap-3">
              <label htmlFor="categoryFilter" className="text-sm text-gray-600">Sort by category:</label>
              <select
                id="categoryFilter"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All</option>
                {CATEGORY_LIST.map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p, i) => (
              <motion.div
                key={`${p.name}-${i}`}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="group relative bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <Link to={`/product/${slugifyProduct(p.name)}`} className="block hover:no-underline">
                  <div className="aspect-[4/3] bg-white flex items-center justify-center p-6">
                    <img
                      src={p.image}
                      alt={p.name}
                      title={p.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const current = e.currentTarget.src;
                        if (current.endsWith('.png')) {
                          e.currentTarget.src = current.replace(/\.png$/, '.jpg');
                        } else if (current.endsWith('.jpg')) {
                          e.currentTarget.src = '/images/placeholder-product.png';
                        }
                      }}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 leading-snug tracking-wide line-clamp-2">{p.name}</h3>
                    <p className="text-red-600 font-semibold mt-1">Rs {Number(p.price).toLocaleString()}</p>
                    <div className="mt-3">
                      <Link
                        to={`/product/${slugifyProduct(p.name)}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md shadow-sm transition-colors"
                        aria-label={`View ${p.name}`}
                      >
                        View Product <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Shop;
