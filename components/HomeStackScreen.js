import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import MovieDetailScreen from './MovieDetailScreen';
import UpcomingMovieDetail from './UpcomingMovieDetail';

const HomeStack = createNativeStackNavigator();
// Ne pas oublier le export default, heuresement tu y as pensé a 5h43 le 06/11/2024 et que tu as corrigé 
// sans avoir utiliser ton téléphone pour voir si c'était la vrai cause du bug mais tu a l'esprit tranquille désormais la vie est apaisé  :)
export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{ title: 'Détails du Film' }}
      />
      <HomeStack.Screen
      name='UpcomingMovieDetail'
        component={UpcomingMovieDetail}
        options={{ title: 'Détails du Film à venir' }}
        />
    </HomeStack.Navigator>
  );
}
