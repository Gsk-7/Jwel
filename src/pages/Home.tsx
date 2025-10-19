import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.isBestSeller).slice(0, 4);
  const saleProducts = products.filter(p => p.isOnSale).slice(0, 4);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-dusty-pink/30 to-cream overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1454227/pexels-photo-1454227.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-deep-plum mb-6 animate-slideUp">
            Exquisite Jewelry
            <span className="block text-rose-gold">Crafted with Love</span>
          </h1>
          <p className="font-body text-lg sm:text-xl text-deep-plum/80 mb-8 max-w-2xl mx-auto animate-slideUp">
            Discover our curated collection of timeless pieces that celebrate life's precious moments. Each jewelry piece is crafted with passion and attention to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp">
            <Link
              to="/shop"
              className="bg-rose-gold hover:bg-rose-gold/90 text-cream px-8 py-4 rounded-full font-body font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg transform hover:-translate-y-1"
            >
              <span>Shop Collection</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/about"
              className="border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-cream px-8 py-4 rounded-full font-body font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Collection Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-deep-plum mb-4">
            Shop by Collection
          </h2>
          <p className="font-body text-lg text-deep-plum/70 max-w-2xl mx-auto">
            Explore our carefully curated collections designed for every style and occasion.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Women's Collection", image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400', collection: 'women' },
            { name: "Men's Collection", image: 'https://images.pexels.com/photos/1464230/pexels-photo-1464230.jpeg?auto=compress&cs=tinysrgb&w=400', collection: 'men' },
            { name: 'Kids Collection', image: 'https://images.pexels.com/photos/7697474/pexels-photo-7697474.jpeg?auto=compress&cs=tinysrgb&w=400', collection: 'kids' },
            { name: 'Unisex Collection', image: 'https://images.pexels.com/photos/3205737/pexels-photo-3205737.jpeg?auto=compress&cs=tinysrgb&w=400', collection: 'unisex' },
          ].map((category, index) => (
            <Link
              key={category.name}
              to={`/shop/${category.collection}`}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-gray-100 hover:shadow-xl transition-all duration-300 animate-scaleIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-plum/60 to-transparent flex items-end">
                <h3 className="font-heading text-xl font-semibold text-cream p-6">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-deep-plum mb-4">
            Best Sellers
          </h2>
          <p className="font-body text-lg text-deep-plum/70">
            Our most loved pieces, chosen by our customers
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 bg-rose-gold hover:bg-rose-gold/90 text-cream px-6 py-3 rounded-full font-body font-medium transition-all duration-300 hover:shadow-lg"
          >
            <span>View All Products</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Sale Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dusty-pink/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-deep-plum mb-4">
              Limited Time Sale
            </h2>
            <p className="font-body text-lg text-deep-plum/70">
              Don't miss out on these exclusive offers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Shield className="text-rose-gold" size={32} />, title: 'Lifetime Warranty', description: 'All our jewelry comes with comprehensive lifetime warranty' },
            { icon: <Truck className="text-rose-gold" size={32} />, title: 'Free Shipping', description: 'Complimentary shipping on all orders above ₹2,000' },
            { icon: <RefreshCw className="text-rose-gold" size={32} />, title: 'Easy Returns', description: '30-day hassle-free returns and exchanges' },
            { icon: <Star className="text-rose-gold" size={32} />, title: 'Premium Quality', description: 'Certified precious metals and authenticated gemstones' }
          ].map((feature, index) => (
            <div key={feature.title} className="text-center space-y-4 animate-slideUp" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="font-heading text-xl font-semibold text-deep-plum">{feature.title}</h3>
              <p className="font-body text-deep-plum/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-deep-plum">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-cream mb-4">Stay in Touch</h2>
          <p className="font-body text-lg text-cream/80 mb-8">Subscribe to our newsletter for exclusive offers and jewelry care tips</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-rose-gold" />
            <button className="bg-rose-gold hover:bg-rose-gold/90 text-cream px-6 py-3 rounded-full font-body font-medium transition-colors">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;