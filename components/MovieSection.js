// MovieSection.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../ThemeContext';
// import { assets } from '../react-native.config';

export default function MovieSection({ title, data, onPressItem, onSeeMore }) {
  const { isDarkMode } = useTheme(); // Accès au contexte du thème pour déterminer le mode

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
            <Text
              style={[styles.movieTitle, isDarkMode ? styles.darkText : styles.lightText]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily:'Gilroy-SemiBold',
  },
  seeMore: {
    color: '#FFC107',
    fontSize: 14,
    marginRight: 5,
    marginBottom: 5,
    fontFamily: 'Gilroy-SemiBold',
  },
  itemContainer: {
    marginRight: 16,
    width: 120,
  },
  movieImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
    marginTop: 5,
  },
  darkText: {
    color: '#FFF', // Texte blanc pour le mode sombre
  },
  lightText: {
    color: '#000', // Texte noir pour le mode clair
  },
});
