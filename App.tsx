import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faMagnifyingGlass, faBookmark, faUser } from '@fortawesome/free-solid-svg-icons';
import HomeStackScreen from './components/HomeStackScreen';
import ProfileScreen from './components/ProfileScreen';
import SearchScreen from './components/SearchScreen';
import WishlistScreen from './components/WishlistScreen';
import LoginScreen from './components/LoginScreen';
import { ThemeProvider, useTheme } from './ThemeContext';
import { WishlistProvider } from './WishlistContext';

const Tab = createBottomTabNavigator();

function AppNavigator({ setIsLoggedIn } : any) {
  const { isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#F2C94C',                 
        tabBarInactiveTintColor: isDarkMode ? 'white' : 'black', 
        tabBarStyle: {
          backgroundColor: isDarkMode ? 'black' : 'white',  
          borderTopWidth: 0,                               
          elevation: 0,                                    
          shadowOpacity: 0,                                 
          height: 60,                                      
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = faUser;
          if (route.name === 'Home') iconName = faHome;
          else if (route.name === 'Search') iconName = faMagnifyingGlass;
          else if (route.name === 'Wishlist') iconName = faBookmark;
          else if (route.name === 'Profile') iconName = faUser;

          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile">
        {() => <ProfileScreen setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider>
      <WishlistProvider>
        <NavigationContainer>
          {isLoggedIn ? (
            <AppNavigator setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginScreen onLogin={handleLogin} />
          )}
        </NavigationContainer>
      </WishlistProvider>
    </ThemeProvider>
  );
}
