import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TMDB_API_KEY, TMDB_ACCESS_TOKEN } from '@env';
import HeroCarousel from './HeroCarousel';
import MovieSection from './MovieSection';
import FavoriteMovieSection from './FavoriteMovieSection';
import { useTheme } from '../ThemeContext';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // L'état de la catégorie sélectionnée est ici
  const { isDarkMode } = useTheme(); // Accès au contexte du thème
  
  useEffect(() => {
    fetchMovies();
    fetchFavoriteMovies();
  }, [selectedCategory]); // fetchMovies est appelé lorsque selectedCategory change

  const fetchMovies = async () => {
    try {
      let url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;
      if (selectedCategory !== 'All') {
        const genreId = getGenreId(selectedCategory);
        if (genreId) {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`;
        } else {
          console.error(`Genre ID introuvable pour la catégorie : ${selectedCategory}`);
          return;
        }
      }
      console.log('Fetching movies from URL:', url);
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        console.log(`Fetched ${data.results.length} movies for category ${selectedCategory}`);
        setMovies(data.results);
      } else {
        console.error("Les données reçues ne contiennent pas de résultats.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des films populaires : ", error);
    }
  };  

  const fetchFavoriteMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/account/21612067/favorite/movies`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.results) {
        setFavoriteMovies(data.results);
      } else {
        console.error("Les données de films favoris ne contiennent pas de résultats.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des films favoris : ", error);
    }
  };

  const handleCategoryChange = (category) => {
    console.log(`handleCategoryChange called with category: ${category}`);
    setSelectedCategory(category);
  };

  const handleMoviePress = (movieId) => {
    navigation.push('MovieDetail', { movieId });
  };
  
  const getGenreId = (categoryName) => {
    const genres = {
      Romance: 10749,
      Drama: 18, 
      Family: 10751, 
      Horror: 27,
    };
    const genreId = genres[categoryName];
    console.log(`getGenreId: categoryName=${categoryName}, genreId=${genreId}`);
    return genreId;
  };  

  return (
    <ScrollView bounces={false} style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <HeroCarousel selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <View style={styles.content}>
        <MovieSection
          title={`Popular Movies - ${selectedCategory}`}
          data={movies.map((movie) => ({
            id: movie.id,
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            rating: movie.vote_average,
          }))}
          onPressItem={handleMoviePress}
        />
        
        {favoriteMovies.length > 0 && (
          <FavoriteMovieSection
            title="My Favorite Movies"
            data={favoriteMovies.map((movie) => ({
              id: movie.id,
              title: movie.title,
              image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              rating: movie.vote_average,
            }))}
            onPressItem={handleMoviePress}
          />
        )}

        {/* Black Friday Section */}
        <Image source={require('./img/blackfriday.png')} style={styles.blackfriday} />
        <Text style={[styles.promoText, isDarkMode ? styles.darkText : styles.lightText]}>Black Friday is here!</Text>
        <Text style={[styles.descriptionText, isDarkMode ? styles.darkText : styles.lightText]}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Viverra sociis pulvinar auctor nibh iaculis id.
        </Text>
        <View style={styles.promoBanner}>
          <TouchableOpacity>
            <Text style={[styles.buttonText, isDarkMode ? styles.darkButtonText : styles.lightButtonText]}>Check details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkBackground: {
    backgroundColor: '#000',
  },
  lightBackground: {
    backgroundColor: '#FFF',
  },
  content: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMore: {
    color: '#FFC107',
    fontSize: 16,
    fontWeight: 'bold',
  },  
  heroImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  promoText: {
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 10,
  },
  darkText: {
    color: '#FFF',
  },
  lightText: {
    color: '#000',
  },
  promoBanner: {
    marginTop: 20,
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  darkButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Gilroy-semibold',
    fontWeight: 'bold',
  },
  lightButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gilroy-semibold',
    fontWeight: 'bold',
  },
  blackfriday: {
    marginBottom: 10,
  },
});
