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
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  blurBackground: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0, // Ajustez les valeurs pour réduire l'effet
    right: 0, // Ajustez les valeurs pour réduire l'effet
    borderRadius: 20,
  },
  flatList: {
    zIndex: 1, // Assure que la FlatList est rendue au-dessus du BlurView
  },
  flatListContent: {
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeCategoryTab: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  activeCategoryText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});
