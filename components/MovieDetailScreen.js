// MovieDetailScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { TMDB_API_KEY } from '@env';

export default function MovieDetailScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  const fetchMovieDetail = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=fr-FR`
      );
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du film :', error);
    }
  };

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.description}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
  },
  poster: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    margin: 16,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },
});
