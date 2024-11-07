// App.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faMagnifyingGlass, faBookBookmark, faUser } from '@fortawesome/free-solid-svg-icons';
import HomeStackScreen from './components/HomeStackScreen';
import { ProfileScreen, SearchScreen, WishlistScreen } from './components/Screens';
import LoginScreen from './components/LoginScreen';

const Tab = createBottomTabNavigator();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#F2C94C',
            tabBarInactiveTintColor: 'gray',
            tabBarActiveBackgroundColor: 'black',
            tabBarInactiveBackgroundColor: 'black',
            tabBarStyle: {
              backgroundColor: 'black', 
              borderTopColor: 'black', 
              borderTopWidth: 0, 
            },
            tabBarIcon: ({ color, size }) => {
              let iconName = faUser;
              if (route.name === 'Home') {
                iconName = faHome;
              } else if (route.name === 'Search') {
                iconName = faMagnifyingGlass;
              } else if (route.name === 'Whishlist') {
                iconName = faBookBookmark;
              } else if (route.name === 'Profile') {
                iconName = faUser;
              }
              return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
            },
          })}
        >
          {/* C'est de la merde en dessous la  */}
          {/* <Tab.Screen name="HomeTab" component={HomeStackScreen} />
          <Tab.Screen name="UpcomingMovieDetail" component={UpcomingMovieDetail} /> */}

          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Whishlist" component={WishlistScreen} />
          <Tab.Screen name="Profile">
            {() => <ProfileScreen setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        // Afficher l'écran de connexion si l'utilisateur n'est pas connecté
        <LoginScreen onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}
