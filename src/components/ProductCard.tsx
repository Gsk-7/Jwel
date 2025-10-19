import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock?: boolean;
  stockCount?: number;
  isOnSale?: boolean;
  isBestSeller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden animate-fadeIn">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 space-y-1">
        {!product.inStock && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </span>
        )}
        {product.isOnSale && (
          <span className="bg-rose-gold text-cream px-2 py-1 rounded-full text-xs font-medium">
            Sale
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-deep-plum text-cream px-2 py-1 rounded-full text-xs font-medium">
            Best Seller
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
      >
        <Heart
          size={18}
          className={`${
            isInWishlist(product.id)
              ? 'text-rose-gold fill-rose-gold'
              : 'text-gray-600'
          } transition-colors`}
        />
      </button>

      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gray-50 relative">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              !product.inStock ? 'grayscale opacity-75' : ''
            }`}
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <span className="bg-white text-deep-plum px-3 py-1 rounded-full font-body font-semibold text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-heading text-lg font-medium text-deep-plum mb-2 group-hover:text-rose-gold transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-body text-sm text-gray-600">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="font-body text-xl font-semibold text-deep-plum">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-body text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2 px-4 rounded-full font-body font-medium transition-all duration-300 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 ${
              product.inStock
                ? 'bg-rose-gold hover:bg-rose-gold/90 text-cream'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={18} />
            <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;