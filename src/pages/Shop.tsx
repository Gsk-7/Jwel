import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

// Accordion component remains the same for smooth animation
const AccordionItem: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-dusty-pink/30 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
        <h4 className="font-body font-semibold text-deep-plum">{title}</h4>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] pt-4' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
};

const Shop = () => {
  const [searchParams] = useSearchParams();
  const { products } = useProducts();

  // State for filters
  const [selectedCollection, setSelectedCollection] = useState(searchParams.get('collection') || 'all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get('category') ? [searchParams.get('category')!] : []);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Dynamically generate filter options from product data
  const allCategories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const allStyles = useMemo(() => [...new Set(products.map(p => p.style))], [products]);
  const allCollections = ['all', 'women', 'men', 'kids', 'unisex'];

  // Sync filters with URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const collectionFromUrl = searchParams.get('collection');
    setSelectedCategories(categoryFromUrl ? [categoryFromUrl] : []);
    setSelectedCollection(collectionFromUrl || 'all');
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesCollection = selectedCollection === 'all' || product.collection === selectedCollection;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(product.style);
      const matchesPrice = product.price <= priceRange;
      return matchesCollection && matchesCategory && matchesStyle && matchesPrice;
    });

    // Sorting logic
    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      default: filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
    }
    return filtered;
  }, [selectedCollection, selectedCategories, selectedStyles, priceRange, sortBy, products]);

  // Handler functions for checkbox filters
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };
  const handleStyleChange = (style: string) => {
    setSelectedStyles(prev => prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]);
  };

  const getPageTitle = () => {
    if (selectedCollection !== 'all') {
      return `${selectedCollection.charAt(0).toUpperCase() + selectedCollection.slice(1)}'s Collection`;
    }
    if (selectedCategories.length === 1) return `Shop ${selectedCategories[0]}s`;
    return "All Jewelry";
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-dusty-pink/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-deep-plum mb-4">{getPageTitle()}</h1>
          <p className="font-body text-lg text-deep-plum/70">Discover our exquisite collection of handcrafted jewelry</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- THIS IS THE CORRECTED PART --- */}
          <aside className={`lg:w-72 lg:block ${showFilters ? 'block fixed inset-0 bg-cream z-50 p-4' : 'hidden'} lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto`}>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
          {/* --- END OF CORRECTED PART --- */}

              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-lg font-semibold text-deep-plum">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="lg:hidden"><X size={20} /></button>
              </div>

              <AccordionItem title="Collection">
                <div className="space-y-2">
                  {allCollections.map(coll => (
                    <label key={coll} className="flex items-center space-x-3 font-body text-deep-plum/90">
                      <input type="radio" name="collection" value={coll} checked={selectedCollection === coll} onChange={(e) => setSelectedCollection(e.target.value)} className="text-rose-gold focus:ring-rose-gold/50"/>
                      <span>{coll.charAt(0).toUpperCase() + coll.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </AccordionItem>

              <AccordionItem title="Category">
                <div className="space-y-2">
                  {allCategories.map(cat => (
                    <label key={cat} className="flex items-center space-x-3 font-body text-deep-plum/90">
                      <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => handleCategoryChange(cat)} className="rounded text-rose-gold focus:ring-rose-gold/50" />
                      <span>{cat}s</span>
                    </label>
                  ))}
                </div>
              </AccordionItem>

              <AccordionItem title="Style / Material">
                <div className="space-y-2">
                  {allStyles.map(style => (
                    <label key={style} className="flex items-center space-x-3 font-body text-deep-plum/90">
                      <input type="checkbox" checked={selectedStyles.includes(style)} onChange={() => handleStyleChange(style)} className="rounded text-rose-gold focus:ring-rose-gold/50" />
                      <span>{style}</span>
                    </label>
                  ))}
                </div>
              </AccordionItem>
              
              <AccordionItem title="Price">
                <div className="pt-2">
                  <input type="range" min="0" max="50000" step="1000" value={priceRange} onChange={(e) => setPriceRange(parseInt(e.target.value))} className="w-full h-2 bg-dusty-pink/50 rounded-lg appearance-none cursor-pointer accent-rose-gold" />
                  <div className="flex justify-between font-body text-sm text-deep-plum"><span>₹0</span><span>₹{priceRange.toLocaleString()}</span></div>
                </div>
              </AccordionItem>
            </div>
          </aside>
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center space-x-2 px-4 py-2 border rounded-lg"><Filter size={18} /><span>Filters</span></button>
              <div className="font-body text-deep-plum hidden sm:block">Showing {filteredProducts.length} products</div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (<ProductCard key={product.id} product={product} />))}
              </div>
            ) : (
              <div className="text-center py-12"><div className="text-6xl mb-4">💎</div><h3 className="font-heading text-xl font-semibold text-deep-plum mb-2">No products found</h3><p className="font-body text-deep-plum/70">Try adjusting your filters to see more products</p></div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;