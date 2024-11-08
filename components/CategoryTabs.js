import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const categories = ['All', 'Romance', 'Drama', 'Family', 'Horror'];

export default function CategoryTabs({ selectedCategory, onCategoryChange }) {
  const handleCategoryPress = (category) => {
    console.log(`Category pressed: ${category}`);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };
  

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)}>
      <View style={[styles.categoryTab, selectedCategory === item && styles.activeCategoryTab]}>
        <Text style={[styles.categoryText, selectedCategory === item && styles.activeCategoryText]}>
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Le BlurView est rendu en premier, donc en arrière-plan */}
      <BlurView
        style={styles.blurBackground}
        blurType="dark"
        blurAmount={10}
        overlayColor="transparent"
      />
      {/* Les boutons de catégorie sont rendus après, donc au-dessus du BlurView */}
      <FlatList 
        bounces={false}
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.flatListContent}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 20,
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  flatList: {
    zIndex: 1, // Assure que la FlatList est rendue au-dessus du BlurView 
  },
  flatListContent: {
    justifyContent: 'space-around',
  },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeCategoryTab: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50, // Rond comme un cercle
  },
  categoryText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Gilroy-Medium',
  },
  activeCategoryText: {
    color: '#000000',
    fontFamily: 'Gilroy-Bold',
  },
});

