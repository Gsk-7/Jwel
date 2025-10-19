import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { User, ShoppingBag, Heart, Settings, LogOut, Eye, EyeOff, Trash2, Edit, Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

interface Address {
  id: number;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const Account = () => {
  const { user, login, logout, register, isAuthenticated } = useAuth();
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const [searchParams] = useSearchParams();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, name: 'GSK', phone: '9876543210', street: '123 Elegance Avenue', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', isDefault: true },
  ]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
    } catch (err: any) {
      const firebaseError = err.code?.split('/')[1]?.replace(/-/g, ' ') || 'An unknown error occurred';
      setError(firebaseError.charAt(0).toUpperCase() + firebaseError.slice(1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSaveAddress = (newAddressData: Omit<Address, 'id' | 'isDefault'>) => {
    if (editingAddress) {
      setAddresses(addresses.map(addr => addr.id === editingAddress.id ? { ...editingAddress, ...newAddressData } : addr));
    } else {
      const newAddress: Address = {
        id: Date.now(),
        ...newAddressData,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, newAddress]);
    }
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };
  
  const handleDeleteAddress = (id: number) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };
  
  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(addr => ({ ...addr, isDefault: addr.id === id })));
  };

  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-gold rounded-full flex items-center justify-center mx-auto mb-4"><User className="text-cream" size={32} /></div>
            <h2 className="font-heading text-3xl font-bold text-deep-plum">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="mt-2 font-body text-deep-plum/70">{isLogin ? 'Sign in to your account' : 'Join our jewelry family'}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block font-body text-sm font-medium text-deep-plum mb-2">Full Name</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required={!isLogin} className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50" placeholder="Enter your full name" />
                </div>
              )}
              <div>
                <label htmlFor="email" className="block font-body text-sm font-medium text-deep-plum mb-2">Email Address</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50" placeholder="Enter your email" />
              </div>
              <div>
                <label htmlFor="password" className="block font-body text-sm font-medium text-deep-plum mb-2">Password</label>
                <div className="relative">
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50 pr-12" placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-deep-plum">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button type="submit" disabled={isLoading} className="w-full bg-rose-gold hover:bg-rose-gold/90 text-cream py-3 px-4 rounded-full font-body font-semibold transition-colors disabled:bg-gray-400">{isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}</button>
            </form>
            <div className="mt-6 text-center">
              <button onClick={() => { setIsLogin(!isLogin); setError(null); }} className="font-body text-rose-gold hover:text-rose-gold/80 transition-colors">{isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-rose-gold rounded-full flex items-center justify-center mx-auto mb-4"><User className="text-cream" size={32} /></div>
                <h2 className="font-heading text-xl font-semibold text-deep-plum">{user?.name || 'Welcome'}</h2>
                <p className="font-body text-deep-plum/70 text-sm">{user?.email}</p>
              </div>
              <nav className="space-y-2">
                 <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === 'profile' ? 'bg-rose-gold/10 text-rose-gold' : 'text-deep-plum hover:bg-gray-50'}`}><User size={20} /><span className="font-body">Profile & Addresses</span></button>
                 <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === 'orders' ? 'bg-rose-gold/10 text-rose-gold' : 'text-deep-plum hover:bg-gray-50'}`}><ShoppingBag size={20} /><span className="font-body">Orders</span></button>
                 <button onClick={() => setActiveTab('wishlist')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === 'wishlist' ? 'bg-rose-gold/10 text-rose-gold' : 'text-deep-plum hover:bg-gray-50'}`}><Heart size={20} /><span className="font-body">Wishlist ({wishlistItems.length})</span></button>
                 <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === 'settings' ? 'bg-rose-gold/10 text-rose-gold' : 'text-deep-plum hover:bg-gray-50'}`}><Settings size={20} /><span className="font-body">Settings</span></button>
                 <button onClick={logout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left text-red-600 hover:bg-red-50"><LogOut size={20} /><span className="font-body">Sign Out</span></button>
              </nav>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {activeTab === 'profile' && (
                <div>
                  <h1 className="font-heading text-2xl font-bold text-deep-plum mb-6">Profile Information</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block font-body text-sm font-medium text-deep-plum mb-2">Full Name</label>
                      <input type="text" value={user?.name || ''} disabled className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg bg-gray-50" />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-deep-plum mb-2">Email Address</label>
                      <input type="email" value={user?.email || ''} disabled className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg bg-gray-50" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-8 mb-4">
                    <h2 className="font-heading text-xl font-bold text-deep-plum">My Addresses</h2>
                    <button onClick={() => { setEditingAddress(null); setShowAddressForm(true); }} className="flex items-center space-x-2 bg-rose-gold text-cream px-4 py-2 rounded-full font-body text-sm"><Plus size={16} /><span>Add New</span></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map(addr => (
                      <div key={addr.id} className={`p-4 rounded-lg border-2 ${addr.isDefault ? 'border-rose-gold bg-rose-gold/5' : 'border-dusty-pink/30'}`}>
                        {addr.isDefault && <span className="text-xs font-bold text-rose-gold">DEFAULT</span>}
                        <p className="font-body font-semibold text-deep-plum">{addr.name}</p>
                        <p className="font-body text-deep-plum/80 text-sm">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="font-body text-deep-plum/80 text-sm">Phone: {addr.phone}</p>
                        <div className="flex space-x-4 mt-3">
                          <button onClick={() => handleEditAddress(addr)} className="flex items-center space-x-1 text-xs font-semibold text-blue-600"><Edit size={14} /><span>EDIT</span></button>
                          <button onClick={() => handleDeleteAddress(addr.id)} className="flex items-center space-x-1 text-xs font-semibold text-red-600"><Trash2 size={14} /><span>DELETE</span></button>
                          {!addr.isDefault && <button onClick={() => handleSetDefault(addr.id)} className="text-xs font-semibold text-green-600">SET AS DEFAULT</button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
               {activeTab === 'orders' && (
                <div>
                  <h1 className="font-heading text-2xl font-bold text-deep-plum mb-6">Order History</h1>
                  <div className="text-center py-12">
                    <ShoppingBag size={64} className="text-rose-gold mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-semibold text-deep-plum mb-2">No orders yet</h3>
                    <p className="font-body text-deep-plum/70">Your order history will appear here once you make your first purchase.</p>
                  </div>
                </div>
              )}
              {activeTab === 'wishlist' && (
                <div>
                  <h1 className="font-heading text-2xl font-bold text-deep-plum mb-6">My Wishlist ({wishlistItems.length} items)</h1>
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart size={64} className="text-rose-gold mx-auto mb-4" />
                      <h3 className="font-heading text-xl font-semibold text-deep-plum mb-2">Your wishlist is empty</h3>
                      <p className="font-body text-deep-plum/70">Save items you love to your wishlist for easy access later.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map(item => (
                        <div key={item.id} className="border border-dusty-pink/20 rounded-lg p-4 flex flex-col">
                          <Link to={`/product/${item.id}`} className="flex-grow">
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="font-heading text-lg font-semibold text-deep-plum mb-2">{item.name}</h3>
                            <p className="font-body text-rose-gold font-semibold">₹{item.price.toLocaleString()}</p>
                          </Link>
                          <button onClick={() => removeFromWishlist(item.id)} className="mt-4 w-full flex items-center justify-center space-x-2 text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors">
                            <Trash2 size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'settings' && (
                <div>
                  <h1 className="font-heading text-2xl font-bold text-deep-plum mb-6">Account Settings</h1>
                  <div className="space-y-6">
                    <div className="border-b border-dusty-pink/20 pb-6">
                      <h3 className="font-heading text-lg font-semibold text-deep-plum mb-4">Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center space-x-3"><input type="checkbox" className="rounded border-gray-300" defaultChecked /><span className="font-body text-deep-plum">Email notifications</span></label>
                        <label className="flex items-center space-x-3"><input type="checkbox" className="rounded border-gray-300" defaultChecked /><span className="font-body text-deep-plum">Order updates</span></label>
                        <label className="flex items-center space-x-3"><input type="checkbox" className="rounded border-gray-300" /><span className="font-body text-deep-plum">Marketing emails</span></label>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-deep-plum mb-4">Privacy</h3>
                      <button className="text-red-600 hover:text-red-700 font-body transition-colors">Delete Account</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAddressForm && <AddressForm address={editingAddress} onSave={handleSaveAddress} onCancel={() => setShowAddressForm(false)} />}
    </div>
  );
};

const AddressForm: React.FC<{ address: Address | null, onSave: (data: Omit<Address, 'id' | 'isDefault'>) => void, onCancel: () => void }> = ({ address, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: address?.name || '',
    phone: address?.phone || '',
    street: address?.street || '',
    city: address?.city || '',
    state: address?.state || '',
    pincode: address?.pincode || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading text-xl font-bold text-deep-plum">{address ? 'Edit Address' : 'Add New Address'}</h2>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm mb-1">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-body text-sm mb-1">Phone Number</label>
              <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block font-body text-sm mb-1">Street Address</label>
            <input name="street" value={formData.street} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-body text-sm mb-1">City</label>
              <input name="city" value={formData.city} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-body text-sm mb-1">State</label>
              <input name="state" value={formData.state} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-body text-sm mb-1">Pincode</label>
              <input name="pincode" value={formData.pincode} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-full border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-full bg-rose-gold text-cream">Save Address</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;