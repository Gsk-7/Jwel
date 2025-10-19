import React, { useState, useMemo } from 'react'; // Corrected from 'Rect'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useProducts, Product } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const allCategories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const allStyles = useMemo(() => [...new Set(products.map(p => p.style))], [products]);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    originalPrice: 0,
    image: '',
    category: allCategories[0] || '',
    style: allStyles[0] || '',
    collection: 'women' as 'men' | 'women' | 'kids' | 'unisex',
    description: '',
    stockCount: 0,
    images: ['']
  });
  
  if (!user || user.email !== 'admin@jewelia.com') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-deep-plum mb-4">
            Access Denied
          </h2>
          <p className="font-body text-deep-plum/70">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Omit<Product, 'id' | 'rating' | 'reviews'> = {
      ...formData,
      isOnSale: formData.originalPrice > 0 && formData.originalPrice > formData.price,
      isBestSeller: false,
      inStock: formData.stockCount > 0,
      images: formData.images.filter(img => img.trim() !== '')
    };
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '', price: 0, originalPrice: 0, image: '', category: allCategories[0] || '',
      style: allStyles[0] || '', collection: 'women', description: '', stockCount: 0, images: ['']
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      image: product.image,
      category: product.category,
      style: product.style,
      collection: product.collection,
      description: product.description,
      stockCount: product.stockCount,
      images: product.images.length > 0 ? product.images : ['']
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const addImageField = () => setFormData({ ...formData, images: [...formData.images, ''] });

  const updateImageField = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages, image: index === 0 ? value : formData.image });
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-deep-plum">Admin Panel</h1>
          <button onClick={() => setShowAddForm(true)} className="bg-rose-gold hover:bg-rose-gold/90 text-cream px-6 py-3 rounded-full font-body font-medium transition-colors flex items-center space-x-2">
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-2xl font-bold text-deep-plum">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-body text-sm font-medium text-deep-plum mb-2">Product Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm font-medium text-deep-plum mb-2">Price (₹)</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50" />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-deep-plum mb-2">Original Price (₹)</label>
                    <input type="number" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm font-medium text-deep-plum mb-2">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50">
                      {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-deep-plum mb-2">Style</label>
                    <select value={formData.style} onChange={(e) => setFormData({ ...formData, style: e.target.value })} className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50">
                       {allStyles.map(style => <option key={style} value={style}>{style}</option>)}
                    </select>
                  </div>
                </div>
                 <div>
                    <label className="block font-body text-sm font-medium text-deep-plum mb-2">Collection</label>
                    <select value={formData.collection} onChange={(e) => setFormData({ ...formData, collection: e.target.value as any })} className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50">
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="kids">Kids</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>
                <div>
                  <label className="block font-body text-sm font-medium text-deep-plum mb-2">Stock Count</label>
                  <input type="number" value={formData.stockCount} onChange={(e) => setFormData({ ...formData, stockCount: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50" />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-deep-plum mb-2">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={3} className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50 resize-none" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block font-body text-sm font-medium text-deep-plum">Product Images (URLs)</label>
                    <button type="button" onClick={addImageField} className="text-rose-gold hover:text-rose-gold/80 text-sm">+ Add Image</button>
                  </div>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input type="url" value={image} onChange={(e) => updateImageField(index, e.target.value)} placeholder="https://example.com/image.jpg" required className="flex-1 px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50" />
                      {formData.images.length > 1 && (
                        <button type="button" onClick={() => removeImageField(index)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg">
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4 pt-4">
                  <button type="submit" className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-cream py-3 rounded-lg font-body font-medium transition-colors flex items-center justify-center space-x-2">
                    <Save size={20} />
                    <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
                  </button>
                  <button type="button" onClick={resetForm} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-body font-medium hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dusty-pink/20">
                <tr>
                  <th className="px-6 py-4 text-left font-body font-semibold text-deep-plum">Image</th>
                  <th className="px-6 py-4 text-left font-body font-semibold text-deep-plum">Name</th>
                  <th className="px-6 py-4 text-left font-body font-semibold text-deep-plum">Price</th>
                  <th className="px-6 py-4 text-left font-body font-semibold text-deep-plum">Collection</th>
                  <th className="px-6 py-4 text-left font-body font-semibold text-deep-plum">Stock</th>
                  <th className="px-6 py-4 text-left font-body font-semibold text-deep-plum">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-dusty-pink/10">
                    <td className="px-6 py-4"><img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" /></td>
                    <td className="px-6 py-4"><div><p className="font-body font-medium text-deep-plum">{product.name}</p><p className="font-body text-sm text-deep-plum/70">{product.category}</p></div></td>
                    <td className="px-6 py-4"><div><p className="font-body font-semibold text-deep-plum">₹{product.price.toLocaleString()}</p>{product.originalPrice && (<p className="font-body text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</p>)}</div></td>
                    <td className="px-6 py-4"><span className="bg-rose-gold/10 text-rose-gold px-2 py-1 rounded-full text-sm font-medium capitalize">{product.collection}</span></td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-sm font-medium ${product.stockCount > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{product.stockCount > 0 ? `${product.stockCount} in stock` : 'Out of stock'}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;