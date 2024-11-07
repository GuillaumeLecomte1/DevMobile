import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TMDB_API_KEY, TMDB_ACCESS_TOKEN } from '@env';
import HeroCarousel from './HeroCarousel';
import MovieSection from './MovieSection';
import FavoriteMovieSection from './FavoriteMovieSection';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // L'état de la catégorie sélectionnée est ici

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

  // const handleMoviePress = (movieId) => {
  //   navigation.navigate('HomeTab', {
  //     screen: 'MovieDetail',
  //     params: { movieId },
  //   });
  // };
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
    <ScrollView bounces={false} >
<HeroCarousel selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
<View style={styles.container}>
        <MovieSection
          title={`Popular Movies - ${selectedCategory}`}
          
          data={movies.map((movie) => ({
            id: movie.id, // Ajoutez l'ID ici
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            rating: movie.vote_average,
          }))}
          onPressItem={handleMoviePress} // Passez la fonction ici
        />

        {/* Partie Favorite movies */}
        {/* {favoriteMovies.length > 0 && (
          <MovieSection
            title="My Favorite Movies"
            data={favoriteMovies.map((movie) => ({
              id: movie.id,
              title: movie.title,
              image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              rating: movie.vote_average,
            }))}
            onPressItem={handleMoviePress} // Passez la fonction ici

          />
        )} */}
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

    {/* Ajout de la partie black friday  */}
      <Image source={require('./img/blackfriday.png')} style={styles.blackfriday}/>
      {/* <Image source={{ uri: 'https://ds.static.rtbf.be/article/image/1920x1080/4/a/8/7e185cc0ad0a719c730af5354d7142c1-1599656786.jpg' }} style={styles.heroImage} /> */}
       <Text style={styles.promoText}>Black friday is here!</Text>
      <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta ipsam ex itaque accusantium, nemo facere.</Text>
      <View style={styles.promoBanner}>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Check details</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#fff',
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'semibold',
    marginBottom: 10,
  },
  promoBanner: {
    marginTop: 20,
    backgroundColor: '#FFC107',
    padding: (0, 14),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Gilroy-Regular',
    fontWeight: 'semibold',
  },
  blackfriday: {
    marginBottom: 10,
    marginTop: 20,
  },
});
