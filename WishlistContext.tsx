// WishlistContext.tsx
import React, { createContext, useContext, useState } from 'react';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface WishlistContextType {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (movieId: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC = ({ children } : any) => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  const addToWishlist = (movie: Movie) => {
    if (!wishlist.find((item) => item.id === movie.id)) {
      setWishlist([...wishlist, movie]);
    }
  };

  const removeFromWishlist = (movieId: number) => {
    setWishlist(wishlist.filter((movie) => movie.id !== movieId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
