// // Screens.tsx
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
// import { useTheme } from '../ThemeContext';

// export function SearchScreen() {
//   const { isDarkMode, toggleDarkMode } = useTheme(); 
//   return (
//     <View style={[styles.screenCenter, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
//       <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Search Screen</Text>
//     </View>
//   );
// }

// export function WishlistScreen() {
//   const { isDarkMode, toggleDarkMode } = useTheme(); 
//   return (
//     <View style={[styles.screenCenter, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
//       <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Wishlist Screen</Text>
//     </View>
//   );
// }

// interface ProfileScreenProps {
//   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
// }
// export function ProfileScreen({ setIsLoggedIn }) {
//   const { isDarkMode, toggleDarkMode } = useTheme(); 

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <View style={[styles.screenCenter, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
//       <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Profile Screen</Text>
      
//       <View style={styles.switchContainer}>
//         <Text style={[styles.switchLabel, isDarkMode ? styles.darkText : styles.lightText]}>Dark Mode</Text>
//         <Switch
//           trackColor={{ false: '#767577', true: '#81b0ff' }}
//           thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
//           ios_backgroundColor="#3e3e3e"
//           onValueChange={toggleDarkMode}
//           value={isDarkMode}
//         />
//       </View>

//       <TouchableOpacity style={[styles.logoutButton, isDarkMode ? styles.darkButton : styles.lightButton]} onPress={handleLogout}>
//         <Text style={[styles.logoutButtonText, isDarkMode ? styles.lightText : styles.darkText]}>Se déconnecter</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screenCenter: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   darkBackground: {
//     backgroundColor: '#000',
//   },
//   lightBackground: {
//     backgroundColor: '#FFF',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   darkText: {
//     color: '#FFC107',
//   },
//   lightText: {
//     color: '#000',
//   },
//   logoutButton: {
//     padding: 10,
//     borderRadius: 8,
//   },
//   darkButton: {
//     backgroundColor: '#FFC107',
//   },
//   lightButton: {
//     backgroundColor: '#333',
//   },
//   logoutButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   switchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   switchLabel: {
//     fontSize: 16,
//     marginRight: 10,
//   },
// });