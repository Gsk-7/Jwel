import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, getTotalPrice, updateQuantity, removeFromCart, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="text-rose-gold mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold text-deep-plum mb-4">
            Your cart is empty
          </h2>
          <p className="font-body text-deep-plum/70 mb-6">
            Looks like you haven't added any jewelry to your cart yet.
          </p>
          <Link
            to="/shop"
            className="bg-rose-gold hover:bg-rose-gold/90 text-cream px-6 py-3 rounded-full font-body font-medium transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Shopping</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-heading text-3xl font-bold text-deep-plum mb-8">
          Your Shopping Cart ({getTotalItems()} items)
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 border-b border-dusty-pink/20 pb-4 last:border-b-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-deep-plum">
                    {item.name}
                  </h3>
                  <p className="font-body text-rose-gold font-medium">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 border rounded-md hover:bg-gray-50">
                    <Minus size={16} />
                  </button>
                  <span className="font-body w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 border rounded-md hover:bg-gray-50">
                    <Plus size={16} />
                  </button>
                </div>
                <p className="font-body font-semibold text-lg text-deep-plum w-24 text-right">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
                <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-md">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-heading text-xl font-bold text-deep-plum mb-6">
                Order Summary
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-body">
                  <span className="text-deep-plum">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body">
                  <span className="text-deep-plum">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-semibold'}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                <div className="border-t border-dusty-pink/20 pt-3">
                  <div className="flex justify-between font-body text-lg">
                    <span className="font-semibold text-deep-plum">Total</span>
                    <span className="font-bold text-rose-gold">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <Link to="/checkout" className="w-full bg-rose-gold hover:bg-rose-gold/90 text-cream py-3 rounded-full font-body font-semibold transition-colors flex items-center justify-center space-x-2">
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;