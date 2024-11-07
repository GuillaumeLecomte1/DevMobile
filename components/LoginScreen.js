// LoginScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function LoginScreen({ onLogin }) {
  return (
    <ImageBackground
      source={{ uri: 'https://your-background-image-url.com' }} // Remplacez par l'URL de votre image de fond ou utilisez require('./path/to/image.jpg')
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenue !</Text>
        <TextInput
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#ccc"
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover', // Si vous utilisez ImageBackground
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)', // Superposition semi-transparente
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    color: '#FFC107', // Couleur primaire de votre application
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#424141', // Couleurs de votre application
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FFC107', // Couleur primaire de votre application
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000', // Couleur contrastante pour le texte du bouton
    fontSize: 16,
    fontWeight: 'bold',
  },
});
