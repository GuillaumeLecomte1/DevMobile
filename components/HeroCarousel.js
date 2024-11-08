// HeroCarousel.js
import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TMDB_API_KEY } from '@env';
import CategoryTabs from './CategoryTabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../ThemeContext';

export default function HeroCarousel({ selectedCategory, onCategoryChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroImages, setHeroImages] = useState([]);
  const navigation = useNavigation();
  const { isDarkMode } = useTheme(); // Utilisation du contexte de thème

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=fr-FR&region=FR`
        );
        const data = await response.json();
        const images = data.results.slice(0, 5).map(movie => ({
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
          id: movie.id,
        }));
        setHeroImages(images);
      } catch (error) {
        console.error("Erreur lors de la récupération des films à venir :", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages]);

  const handleDetailsPress = () => {
    const selectedMovie = heroImages[currentIndex];
    if (selectedMovie) {
      navigation.navigate('UpcomingMovieDetail', { movieId: selectedMovie.id });
    }
  };
  
  if (!heroImages.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: heroImages[currentIndex].image }} style={styles.heroImage} resizeMode="cover">
        <View style={styles.categoryContainer}>
          <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
        </View>
        <LinearGradient 
          colors={['transparent', isDarkMode ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)']}
          style={styles.gradient}
          pointerEvents="box-none"
        >
          <View style={styles.listDiscoverContainer}>
            <Text style={[styles.listDiscoverText, isDarkMode ? styles.darkText : styles.lightText]}>My list</Text>
            <Text style={[styles.listDiscoverText, isDarkMode ? styles.darkText : styles.lightText]}>Discover</Text>
          </View>
          <View style={styles.heroButtons}>
            <TouchableOpacity style={[styles.buttonWishlist, isDarkMode ? styles.darkButton : styles.lightButton]}>
              <Icon name="add" size={20} color="#fff" paddingRight={12}/>
              <Text style={styles.buttonTextWishlist}>Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.heroButton, isDarkMode ? styles.lightHighlightButton : styles.lightHighlightButton]} onPress={handleDetailsPress}>
              <Text style={[styles.buttonTextDetails, isDarkMode ? styles.darkButtonText : styles.lightButtonText]}>Details</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={[styles.dotsContainer, isDarkMode ? styles.darkDotsBackground : styles.lightDotsBackground]}>
        {heroImages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, isDarkMode ? styles.dotLight : styles.dotDark, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  categoryContainer: {
    position: 'absolute',
    top: 40,
    width: '90%',
    alignItems: 'center',
    zIndex: 2,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
  },
  listDiscoverContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 24,
  },
  listDiscoverText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  darkDotsBackground: {
    backgroundColor: '#000',
  },
  dotLight: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  dotDark: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FFC107',
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    marginLeft: 16,
    height: 48,
    alignItems: 'center',
  },
  darkButton: {
    backgroundColor: '#333333',
  },
  lightHighlightButton: {
    backgroundColor: '#FFC107',
  },
  buttonWishlist: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#424141',
    height: 48,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    
  },
  
  buttonTextWishlist: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gilroy-semibold',
  },
  buttonTextDetails: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Gilroy-semibold',
  },
  darkButtonText: {
    color: '#000',
  },
  lightButtonText: {
    color: '#fff',
  },
});
