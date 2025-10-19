import React, { createContext, useContext, useState, ReactNode } from 'react';
import { products as initialProducts } from '../data/products';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string; 
  style: string;    // This line was missing. I have added it back.
  collection: 'men' | 'women' | 'kids' | 'unisex';
  description: string;
  isOnSale?: boolean;
  isBestSeller?: boolean;
  images: string[];
  inStock: boolean;
  stockCount: number;
}

// Omit 'style' from NewProduct as well, if it's not required upon creation
type NewProduct = Omit<Product, 'id' | 'rating' | 'reviews'>;

interface ProductContextType {
  products: Product[];
  addProduct: (product: NewProduct) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
  getProductsByCollection: (collection: string) => Product[];
  getProductsByCategory: (category: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (newProduct: NewProduct) => {
    const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productWithDefaults: Product = {
      ...newProduct,
      id,
      rating: 4.5,
      reviews: 0,
    };
    setProducts(prev => [...prev, productWithDefaults]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCollection = (collection: string) => {
    return products.filter(product => product.collection === collection);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getProductsByCollection,
      getProductsByCategory,
    }}>
      {children}
    </ProductContext.Provider>
  );
};