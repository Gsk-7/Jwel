import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Address {
  id: number;
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john@example.com',
      addressLine1: '123 Main Street',
      addressLine2: 'Apartment 4B',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      isDefault: true
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const address: Address = {
      id: addresses.length + 1,
      ...newAddress,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, address]);
    setNewAddress({
      name: '',
      phone: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: ''
    });
    setShowAddressForm(false);
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    clearCart();
    // Here you would typically navigate to a success page
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-deep-plum mb-4">
            Your cart is empty
          </h2>
          <Link
            to="/shop"
            className="bg-rose-gold hover:bg-rose-gold/90 text-cream px-6 py-3 rounded-full font-body font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 2000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/cart"
          className="inline-flex items-center space-x-2 text-deep-plum hover:text-rose-gold transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="font-body">Back to Cart</span>
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-semibold ${
                    currentStep >= step
                      ? 'bg-rose-gold text-cream'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-rose-gold' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-heading text-2xl font-bold text-deep-plum mb-6">
                  Delivery Address
                </h2>

                <div className="space-y-4 mb-6">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedAddress === address.id
                          ? 'border-rose-gold bg-rose-gold/5'
                          : 'border-gray-200 hover:border-rose-gold/50'
                      }`}
                      onClick={() => setSelectedAddress(address.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-body font-semibold text-deep-plum">
                              {address.name}
                            </h3>
                            {address.isDefault && (
                              <span className="bg-rose-gold text-cream px-2 py-1 rounded-full text-xs">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="font-body text-deep-plum/70 text-sm mb-1">
                            {address.addressLine1}, {address.addressLine2}
                          </p>
                          <p className="font-body text-deep-plum/70 text-sm mb-1">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="font-body text-deep-plum/70 text-sm">
                            Phone: {address.phone}
                          </p>
                        </div>
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === address.id}
                          onChange={() => setSelectedAddress(address.id)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {!showAddressForm ? (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="w-full border-2 border-dashed border-rose-gold text-rose-gold py-4 rounded-lg font-body font-medium hover:bg-rose-gold/5 transition-colors"
                  >
                    + Add New Address
                  </button>
                ) : (
                  <form onSubmit={handleAddAddress} className="space-y-4 border-2 border-rose-gold rounded-lg p-4">
                    <h3 className="font-heading text-lg font-semibold text-deep-plum mb-4">
                      Add New Address
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        required
                        className="px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        required
                        className="px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={newAddress.email}
                      onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50"
                    />
                    <input
                      type="text"
                      placeholder="Address Line 1"
                      value={newAddress.addressLine1}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50"
                    />
                    <input
                      type="text"
                      placeholder="Address Line 2 (Optional)"
                      value={newAddress.addressLine2}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                      className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        required
                        className="px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        required
                        className="px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50"
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        required
                        className="px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-cream py-3 rounded-lg font-body font-medium transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-body font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedAddress}
                  className="w-full mt-6 bg-rose-gold hover:bg-rose-gold/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-cream py-4 rounded-full font-body font-semibold text-lg transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-heading text-2xl font-bold text-deep-plum mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4 mb-6">
                  {/* ... Payment options */}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 border border-rose-gold text-rose-gold py-4 rounded-full font-body font-semibold text-lg hover:bg-rose-gold/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    disabled={!paymentMethod}
                    className="flex-1 bg-rose-gold hover:bg-rose-gold/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-cream py-4 rounded-full font-body font-semibold text-lg transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                 <h2 className="font-heading text-2xl font-bold text-deep-plum mb-6">
                  Review Your Order
                </h2>
                {/* ... Review details */}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-heading text-xl font-bold text-deep-plum mb-6">
                Order Summary
              </h3>
              {/* ... Order summary details */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;