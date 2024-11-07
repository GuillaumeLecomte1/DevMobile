// Screens.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function SearchScreen() {
  return (
    <View style={styles.screenCenter}>
      <Text style={styles.title}>Search Screen</Text>
    </View>
  );
}

export function WishlistScreen() {
  return (
    <View style={styles.screenCenter}>
      <Text style={styles.title}>Wishlist Screen</Text>
    </View>
  );
}

interface ProfileScreenProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProfileScreen({ setIsLoggedIn }: ProfileScreenProps) {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <View style={styles.screenCenter}>
      <Text style={styles.title}>Profile Screen</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    color: '#FFC107',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
