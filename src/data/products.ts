import { Product } from '../context/ProductContext';

export const products: Product[] = [
  // --- WOMEN'S SECTION ---

  // Rings
  { id: 1, name: "Ethereal Rose Gold Ring", price: 4599, image: "https://images.pexels.com/photos/12833539/pexels-photo-12833539.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.8, reviews: 150, category: "Ring", style: "Rose Gold", collection: "women", description: "A delicate ring crafted from pure rose gold, perfect for everyday elegance.", isBestSeller: true, inStock: true, stockCount: 12, images: [] },
  { id: 2, name: "Vintage Heirloom Ring", price: 7899, image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.9, reviews: 95, category: "Ring", style: "Antique", collection: "women", description: "An antique-style ring that tells a story of timeless beauty.", inStock: true, stockCount: 7, images: [] },
  { id: 3, name: "Onyx Statement Ring", price: 3200, image: "https://images.pexels.com/photos/9984333/pexels-photo-9984333.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.7, reviews: 110, category: "Ring", style: "Black Metal", collection: "women", description: "A bold statement ring made from polished black metal.", inStock: true, stockCount: 15, images: [] },
  { id: 4, name: "Classic Silver Band", price: 2500, image: "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.6, reviews: 200, category: "Ring", style: "Silver", collection: "women", description: "A timeless sterling silver band, perfect for stacking.", inStock: true, stockCount: 30, images: [] },

  // Bracelets
  { id: 5, name: "Delicate Rose Gold Bracelet", price: 5500, image: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.8, reviews: 120, category: "Bracelet", style: "Rose Gold", collection: "women", description: "A fine chain bracelet in stunning rose gold.", inStock: true, stockCount: 18, images: [] },
  { id: 6, name: "Golden Replica Charm Bracelet", price: 3800, image: "https://images.pexels.com/photos/248064/pexels-photo-248064.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.5, reviews: 90, category: "Bracelet", style: "Golden Replica", collection: "women", description: "A charming bracelet with golden replica coins and tokens.", isOnSale: true, inStock: true, stockCount: 22, images: [] },

  // Chokers
  { id: 7, name: "Antique Temple Choker", price: 9500, image: "https://images.pexels.com/photos/10371306/pexels-photo-10371306.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.9, reviews: 80, category: "Choker", style: "Antique", collection: "women", description: "An exquisite choker featuring antique temple motifs.", isBestSeller: true, inStock: true, stockCount: 9, images: [] },
  { id: 8, name: "Silver Filigree Choker", price: 6800, image: "https://images.pexels.com/photos/2849743/pexels-photo-2849743.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.8, reviews: 65, category: "Choker", style: "Silver", collection: "women", description: "A beautifully detailed filigree choker in pure silver.", inStock: true, stockCount: 14, images: [] },

  // Harams
  { id: 9, name: "Grand Golden Replica Haram", price: 18500, image: "https://images.pexels.com/photos/9849171/pexels-photo-9849171.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 5.0, reviews: 50, category: "Haram", style: "Golden Replica", collection: "women", description: "A magnificent long necklace in a golden replica design.", inStock: true, stockCount: 4, images: [] },
  { id: 10, name: "Black Metal Peacock Haram", price: 12500, image: "https://images.pexels.com/photos/977935/pexels-photo-977935.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.9, reviews: 70, category: "Haram", style: "Black Metal", collection: "women", description: "A unique haram featuring peacock motifs in black metal.", inStock: true, stockCount: 8, images: [] },

  // Bangles
  { id: 11, name: "Antique Kada Bangles (Set of 2)", price: 6200, image: "https://images.pexels.com/photos/9439163/pexels-photo-9439163.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.7, reviews: 130, category: "Bangle", style: "Antique", collection: "women", description: "A set of two intricately designed antique Kada bangles.", inStock: true, stockCount: 11, images: [] },
  { id: 12, name: "Rose Gold Sleek Bangles", price: 8900, image: "https://images.pexels.com/photos/326119/pexels-photo-326119.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.8, reviews: 115, category: "Bangle", style: "Rose Gold", collection: "women", description: "A pair of modern and sleek bangles in rose gold.", inStock: true, stockCount: 20, images: [] },

  // Hip Chains
  { id: 13, name: "Golden Replica Oddiyanam", price: 7500, image: "https://images.pexels.com/photos/10311910/pexels-photo-10311910.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.9, reviews: 40, category: "Hip Chain", style: "Golden Replica", collection: "women", description: "A traditional golden replica hip chain (Oddiyanam).", inStock: true, stockCount: 6, images: [] },

  // Chains
  { id: 14, name: "Anti-Tarnish Daily Chain", price: 1800, image: "https://images.pexels.com/photos/225383/pexels-photo-225383.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.9, reviews: 300, category: "Chain", style: "Anti Tarnish", collection: "women", description: "A durable, anti-tarnish chain perfect for daily wear.", isBestSeller: true, inStock: true, stockCount: 50, images: [] },

  // Anklets
  { id: 15, name: "Antique Silver Anklets", price: 2800, image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.7, reviews: 180, category: "Anklet", style: "Antique", collection: "women", description: "A pair of beautiful silver anklets with an antique finish.", inStock: true, stockCount: 25, images: [] },

  // Earrings
  { id: 16, name: "Rose Gold Stud Earrings", price: 2999, image: "https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.8, reviews: 212, category: "Earring", style: "Rose Gold", collection: "women", description: "Elegant and simple rose gold stud earrings.", inStock: true, stockCount: 35, images: [] },

  // --- MEN'S SECTION ---
  
  // Chains
  { id: 17, name: "Men's Silver Figaro Chain", price: 4800, image: "https://images.pexels.com/photos/12829878/pexels-photo-12829878.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.8, reviews: 140, category: "Chain", style: "Silver", collection: "men", description: "A classic sterling silver Figaro chain for a sharp look.", isBestSeller: true, inStock: true, stockCount: 25, images: [] },

  // Rings
  { id: 18, name: "Bold Silver Signet Ring", price: 3200, image: "https://images.pexels.com/photos/1464230/pexels-photo-1464230.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.7, reviews: 105, category: "Ring", style: "Silver", collection: "men", description: "A substantial sterling silver signet ring for the modern man.", inStock: true, stockCount: 15, images: [] },
  
  // Bracelets
  { id: 19, name: "Men's Beaded Bracelet", price: 1500, image: "https://images.pexels.com/photos/2849743/pexels-photo-2849743.jpeg?auto=compress&cs=tinysrgb&w=400", rating: 4.9, reviews: 250, category: "Bracelet", style: "Beads", collection: "men", description: "A stylish bracelet made with natural stone beads.", inStock: true, stockCount: 40, images: [] },
];