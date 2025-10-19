import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ArrowLeft, Truck, Shield, RefreshCw, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = products.find(p => p.id === parseInt(id || '0'));
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-deep-plum mb-4">Product not found</h2>
          <Link to="/shop" className="text-rose-gold hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in ${product.name} (₹${product.price.toLocaleString()}). Can you help me with more details?`;
    window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };
  return (
    <div className="min-h-screen bg-cream animate-fadeIn">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-dusty-pink/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 font-body text-sm text-deep-plum/70">
            <Link to="/" className="hover:text-rose-gold">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-rose-gold">Shop</Link>
            <span>/</span>
            <span className="text-deep-plum">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/shop"
          className="inline-flex items-center space-x-2 text-deep-plum hover:text-rose-gold transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="font-body">Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-rose-gold' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex space-x-2">
              {!product.inStock && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
              {product.isOnSale && (
                <span className="bg-rose-gold text-cream px-3 py-1 rounded-full text-sm font-medium">
                  Sale
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-deep-plum text-cream px-3 py-1 rounded-full text-sm font-medium">
                  Best Seller
                </span>
              )}
            </div>

            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-deep-plum mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-body text-deep-plum">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="font-body text-3xl font-bold text-deep-plum">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-body text-xl text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock && product.stockCount > 0
                    ? product.stockCount > 5
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock && product.stockCount > 0
                    ? product.stockCount > 5
                      ? 'In Stock'
                      : `Only ${product.stockCount} left`
                    : 'Out of Stock'
                  }
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-heading text-lg font-semibold text-deep-plum mb-2">
                Description
              </h3>
              <p className="font-body text-deep-plum/80">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            {product.category === 'rings' && (
              <div>
                <h3 className="font-heading text-lg font-semibold text-deep-plum mb-3">
                  Size
                </h3>
                <div className="flex space-x-2">
                  {['5', '6', '7', '8', '9'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-rose-gold bg-rose-gold/10 text-rose-gold'
                          : 'border-gray-300 hover:border-rose-gold'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            {product.inStock && (
              <div>
              <h3 className="font-heading text-lg font-semibold text-deep-plum mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-rose-gold transition-colors"
                >
                  -
                </button>
                <span className="font-body text-lg font-medium w-12 text-center">
                  {quantity}
                </span>
                <button
                    onClick={() => setQuantity(Math.min(product.stockCount || 1, quantity + 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-rose-gold transition-colors"
                >
                  +
                </button>
              </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 px-6 rounded-full font-body font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  product.inStock
                    ? 'bg-rose-gold hover:bg-rose-gold/90 text-cream hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingBag size={20} />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
              <button
                onClick={handleWishlistToggle}
                className="p-4 border-2 border-rose-gold rounded-full hover:bg-rose-gold/10 transition-colors"
              >
                <Heart
                  size={24}
                  className={`${
                    isInWishlist(product.id)
                      ? 'text-rose-gold fill-rose-gold'
                      : 'text-rose-gold'
                  }`}
                />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-dusty-pink/20">
              <div className="flex items-center space-x-3">
                <Truck className="text-rose-gold" size={20} />
                <span className="font-body text-sm text-deep-plum">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="text-rose-gold" size={20} />
                <span className="font-body text-sm text-deep-plum">Lifetime Warranty</span>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="text-rose-gold" size={20} />
                <span className="font-body text-sm text-deep-plum">Easy Returns</span>
              </div>
            </div>

            {/* WhatsApp Chat */}
            <button 
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full font-body font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-deep-plum mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;