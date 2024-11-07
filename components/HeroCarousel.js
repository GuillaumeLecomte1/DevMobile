// HeroCarousel.js
import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TMDB_API_KEY } from '@env';
import CategoryTabs from './CategoryTabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function HeroCarousel({  selectedCategory, onCategoryChange}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroImages, setHeroImages] = useState([]);
const navigation = useNavigation();
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
          colors={['transparent', 'rgba(0,0,0,1)']} 
          style={styles.gradient}
          pointerEvents="box-none"
        >
            <View style={styles.listDiscoverContainer}>
            <Text style={styles.listDiscoverText}>My list</Text>
            <Text style={styles.listDiscoverText}>Discover</Text>
          </View>
          
          <View style={styles.heroButtons}>
          <TouchableOpacity style={styles.buttonWishlist}>
          <Icon name="add" size={20} color="#fff" />
          <Text style={styles.buttonTextWishlist}>  Wishlist</Text>
        </TouchableOpacity>
            <TouchableOpacity style={styles.heroButton} onPress={handleDetailsPress}>
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.dotsContainer}>

        {heroImages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

// Styles inchangés...


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
    // marginBottom: 20,
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
    marginBottom: 10,
  },
  listDiscoverText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:'Gilroy-Regular',
    marginBottom: 10,
    // fontStyle:'thin',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 10,
    backgroundColor: 'black',
    // marginTop: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: '#fff',
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
    backgroundColor: '#FFC107',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonWishlist: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#424141',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  
  buttonTextWishlist: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'semibold',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'semibold',
  },
});
