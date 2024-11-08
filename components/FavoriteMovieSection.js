// FavoriteMovieSection.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../ThemeContext';

export default function FavoriteMovieSection({ title, data, onPressItem, onSeeMore }) {
  const { isDarkMode } = useTheme(); // Accès au contexte du thème

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>{title}</Text>
        <TouchableOpacity onPress={onSeeMore}>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        bounces={false}
        horizontal
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressItem(item.id)} style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.movieImage} />
            
            {/* Overlay pour le mot-clé et la notation en bas de l'image */}
            <View style={[styles.bottomOverlay, isDarkMode ? styles.darkOverlay : styles.lightOverlay]}>
              <Text style={[styles.keywordText, isDarkMode ? styles.darkText : styles.lightText]} numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={14} color="#FFC107" />
                <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 32,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Assure que le titre et "See more" sont aux extrémités
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Gilroy-semibold',
  },
  seeMore: {
    color: '#FFC107',
    fontSize: 14,
    fontFamily: 'Gilroy-semibold',
  },
  darkText: {
    color: '#FFF',
  },
  lightText: {
    color: '#000',
  },
  itemContainer: {
    marginRight: 16,
    width: 120,
    position: 'relative',
  },
  movieImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  bottomOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    paddingVertical: 10,
    borderRadius: 4,
  },
  keywordText: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Gilroy-semibold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFC107',
    fontSize: 10,
    marginLeft: 2,
    fontFamily: 'Gilroy-semibold',
 },
});
 