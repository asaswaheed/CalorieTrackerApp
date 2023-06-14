import { React, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import MealLogScreen from './src/screens/MealLogScreen';
import Profile from './src/screens/Profile';

const Stack = createStackNavigator();

const App = () => {
  const [onboarded, setOnboarded] = useState();
  
  useEffect(() => {
    getStorage();
  }, []);
  
  const getStorage = async () => {
    const onboarded = await AsyncStorage.getItem('ONBOARDED');
    setOnboarded(JSON.parse(onboarded));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={onboarded ? 'Home' : 'Welcome'}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MealLogScreen"
          component={MealLogScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: '#F2D8D8',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
