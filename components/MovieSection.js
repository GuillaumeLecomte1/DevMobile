// MovieSection.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

export default function MovieSection({ title, data, onPressItem, onSeeMore }) {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
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
            <Text style={styles.movieTitle} numberOfLines={1} ellipsizeMode="tail">
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
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
    fontFamily:'Gilroy-Regular',
  },
  seeMore: {
    color: '#FFC107',
    fontSize: 14,
    marginRight: 4,
    fontFamily:'Gilroy-Regular',
  },
  itemContainer: {
    marginRight: 10,
    width: 120,
  },
  movieImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  movieTitle: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
    fontFamily:'Gilroy-Regular',
  },
});
