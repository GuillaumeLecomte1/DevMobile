import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useWishlist } from '../WishlistContext';
import { TMDB_API_KEY } from '@env';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SearchScreen() {
  const { isDarkMode } = useTheme();
  const { addToWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}`
      );
      const data = await response.json();
      if (data.results) {
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de films :', error);
    }
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Search for Movies</Text>
      
      <TextInput
        style={[styles.searchInput, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Enter movie title"
        placeholderTextColor={isDarkMode ? '#AAA' : '#555'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <Button title="Search" onPress={handleSearch} color="#FFC107" />

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.movieImage}
            />
            <View style={styles.movieDetails}>
              <Text style={[styles.movieTitle, isDarkMode ? styles.darkText : styles.lightText]}>
                {item.title}
              </Text>
              <TouchableOpacity
                style={styles.wishlistButton}
                onPress={() => addToWishlist(item)}
              >
                <Icon name="favorite" size={24} color="#FFC107" />
                <Text style={[styles.wishlistText, isDarkMode ? styles.darkText : styles.lightText]}>Add to Wishlist</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkBackground: {
    backgroundColor: '#000',
  },
  lightBackground: {
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  darkText: {
    color: '#FFC107',
  },
  lightText: {
    color: '#000',
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#FFF',
  },
  lightInput: {
    backgroundColor: '#EEE',
    color: '#000',
  },
  movieItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  movieImage: {
    width: 50,
    height: 75,
    borderRadius: 4,
  },
  movieDetails: {
    flex: 1,
    marginLeft: 10,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  wishlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  wishlistText: {
    marginLeft: 5,
    fontSize: 14,
  },
});
