// FavoriteMovieSection.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FavoriteMovieSection({ title, data, onPressItem }) {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
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
            <View style={styles.bottomOverlay}>
              <Text style={styles.keywordText} numberOfLines={1} ellipsizeMode="tail">
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'Gilroy-Regular',
  },
  itemContainer: {
    marginRight: 10,
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
    alignItems: 'left',
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    paddingVertical: 10,
    borderRadius: 4,
  },
  keywordText: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFC107',
    fontSize: 12,
    marginLeft: 2,
    fontWeight: 'bold',
  },
});
