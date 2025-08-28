import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS, CATEGORY_LIST } from '../common/products';
import { 
  FiShoppingCart, 
  FiCheck, 
  FiChevronRight, 
  FiArrowLeft, 
  FiTruck, 
  FiShield 
} from 'react-icons/fi';

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  // Find product by slug using consistent slugify function
  const findProductBySlug = (slug) => {
    for (const category in PRODUCTS) {
      const product = PRODUCTS[category].find(
        p => slug === p.name.toLowerCase().trim().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      );
      if (product) return { ...product, category };
    }
    return null;
  };

  const product = findProductBySlug(slug);
  const category = product ? CATEGORY_LIST.find(cat => cat.slug === product.category) : null;

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | The Planner Herbal International`;
      window.scrollTo(0, 0);
    } else {
      document.title = 'Product Not Found | The Planner Herbal International';
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            <FiArrowLeft className="mr-2" /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <Link to="/" className="text-gray-700 hover:text-red-600">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <FiChevronRight className="text-gray-400 mx-2" />
                <Link to="/shop" className="text-gray-700 hover:text-red-600">
                  Shop
                </Link>
              </li>
              {category && (
                <li className="flex items-center">
                  <FiChevronRight className="text-gray-400 mx-2" />
                  <Link to={`/shop/${category.slug}`} className="text-gray-700 hover:text-red-600">
                    {category.label}
                  </Link>
                </li>
              )}
              <li aria-current="page" className="flex items-center">
                <FiChevronRight className="text-gray-400 mx-2" />
                <span className="text-gray-500">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-6">
              {/* Product Gallery */}
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto max-h-[500px] object-contain mx-auto"
                    onError={(e) => {
                      e.target.src = './images/placeholder-product.png';
                    }}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="py-2">
                {category && (
                  <Link 
                    to={`/shop/${category.slug}`}
                    className="inline-block text-red-600 hover:text-red-700 text-sm font-medium mb-3"
                  >
                    {category.label}
                  </Link>
                )}
                
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">(24 reviews)</span>
                </div>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">Rs {product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-gray-400 line-through">
                      Rs {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                <div className="text-gray-700 mb-6">
                  <p className="text-lg font-medium text-gray-800 mb-2">{product.description.split('\n')[0]}</p>
                  {product.description.split('\n').slice(1).map((line, index) => (
                    <p key={index} className="text-gray-600 mt-1">{line}</p>
                  ))}
                </div>
                
                <div className="space-y-4 mb-8">
                  <h3 className="font-semibold text-gray-900">Key Benefits:</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <button 
                      className="px-4 py-2 text-xl text-gray-600 hover:bg-gray-100"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                    <button 
                      className="px-4 py-2 text-xl text-gray-600 hover:bg-gray-100"
                      onClick={() => setQuantity(prev => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center">
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FiTruck className="mr-2 text-gray-500" />
                    <span>Free shipping on all orders over Rs. 2,000</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiShield className="mr-2 text-gray-500" />
                    <span>100% Authentic Products</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Description */}
            <div className="border-t border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
              <div className="prose max-w-none text-gray-700">
                <p>{product.fullDescription?.overview || 'Our products are made with the finest natural ingredients and are free from harmful chemicals. Each batch is carefully crafted to ensure maximum potency and effectiveness.'}</p>
                <p className="mt-4 font-medium">Key Features:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {product.fullDescription?.keyFeatures?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  )) || [
                    <li key="1">۳۰+ عالمی شہرت یافتہ جڑی بوٹیوں کا طاقتور امتزاج</li>,
                    <li key="2">صدیوں سے قابل اعتماد</li>,
                    <li key="3">Enhances male vitality and performance</li>
                  ]}
                </ul>
                <h3 className="text-lg font-semibold mt-6 mb-2">How to Use</h3>
                <p>
                  {product.fullDescription?.howToUse || 'Take 1-2 tablets daily with water, preferably with meals. For best results, use consistently as part of your daily routine. Results may vary based on individual body types and metabolism.'}
                </p>
                <h3 className="text-lg font-semibold mt-6 mb-2">Ingredients</h3>
                <p>
                  {product.fullDescription?.ingredients || 'Made with 100% natural herbs and extracts. Free from artificial colors, flavors, and preservatives. Always read the label before use.'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {PRODUCTS[product.category]
                .filter(p => p.name !== product.name)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link 
                    key={relatedProduct.name}
                    to={`/product/${relatedProduct.name.toLowerCase().trim().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                    className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.target.src = './images/placeholder-product.png';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-red-600 font-semibold">
                        Rs {relatedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
