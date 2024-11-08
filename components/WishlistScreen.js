// WishlistScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useWishlist } from '../WishlistContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function WishlistScreen() {
  const { isDarkMode } = useTheme();
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Wishlist</Text>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} />
            <View style={styles.movieDetails}>
              <Text style={[styles.movieTitle, isDarkMode ? styles.darkText : styles.lightText]}>
                {item.title}
              </Text>
              <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
                <Icon name="delete" size={24} color="#FF0000" />
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
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  movieImage: {
    width: 50,
    height: 75,
    borderRadius: 4,
  },
  movieDetails: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
  darkBackground: {
    backgroundColor: '#000',
  },
  lightBackground: {
    backgroundColor: '#FFF',
  },
});
