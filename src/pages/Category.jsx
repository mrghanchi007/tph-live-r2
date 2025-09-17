import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORY_LIST, PRODUCTS, slugifyProduct } from '../common/products';
import SEOHead from '../components/SEOHead';

const cardVariants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const Category = () => {
  const { slug } = useParams();
  const raw = (slug || '').toString();
  // normalize: decode, strip query/hash/trailing slashes, trim spaces
  const cleaned = decodeURIComponent(raw)
    .split('?')[0]
    .split('#')[0]
    .replace(/\/+$/, '')
    .trim()
    .toLowerCase();
  const aliasMap = { 'weight-loss': 'weight-lose', 'weight lose': 'weight-lose' };
  const keysToTry = [cleaned, aliasMap[cleaned], cleaned.replace(/\s+/g, '-'), cleaned.replace(/-/g, ' ')]
    .filter(Boolean);
  const category = CATEGORY_LIST.find((c) => keysToTry.includes(c.slug.toLowerCase()));
  const items = keysToTry.map((k) => PRODUCTS[k]).find((arr) => Array.isArray(arr)) || [];

  if (!category) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* SEO Head */}
      <SEOHead 
        title={`${category.label} Herbal Products Pakistan | Natural Supplements | TPH Live`}
        description={`Premium ${category.label.toLowerCase()} herbal products in Pakistan. Natural supplements for health & wellness. Authentic products with proven results.`}
        keywords={`${category.label.toLowerCase()} herbal products Pakistan, natural ${category.label.toLowerCase()} supplements, ${category.label.toLowerCase()} health products`}
        image="https://tphlive.com/images/tph-live-logo.png"
        url={`https://tphlive.com/shop/${category.slug}`}
      />
      {/* Hero Header (match About hero) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl">
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-5xl font-extrabold mb-4">
              {category.label}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="text-lg md:text-xl text-red-50 max-w-3xl">
              Explore authentic {category.label} products.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="show" className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((p, i) => (
              <motion.div
                key={p.name}
                variants={cardVariants}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-[4/3] bg-white flex items-center justify-center p-3">
                  <img
                    src={p.image}
                    alt={`${p.name} by The Planner Herbal International`}
                    title={`${p.name} – ${category.label} | Rs ${p.price.toLocaleString()}`}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                  <h3 className="font-semibold text-gray-900 leading-snug tracking-wide">{p.name}</h3>
                  <div className="mt-2 text-red-600 font-bold">Rs {p.price.toLocaleString()}</div>
                  <Link
                    to={`/product/${slugifyProduct(p.name)}`}
                    className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md shadow-sm transition-colors"
                    aria-label={`View ${p.name}`}
                  >
                    View Product <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Category;
