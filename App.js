import { React, useState, useEffect, createContext } from 'react';
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
import { retrieveDayLog, storeDayLog } from './src/components/storageService';

const Stack = createStackNavigator();

export const AppContext = createContext();

const App = () => {
  const [onBoarded, setOnBoarded] = useState();
  const [userData, setUserData] = useState();
  const [dayLogs, setDayLogs] = useState({
    calories: 155, protein: 155, fat: 55, carbs: 25, 
    breakfast: {calories: 5, products: []}, 
    lunch: {calories: 15, products: []}, 
    dinner: {calories: 20, products: []}});
  

  // const testLog = {calories: 155, protein: 155, fat: 55, carbs: 25, 
  //   Frühstück: {kcal: 0, lebensmittel: []}, 
  //   Mittagessen: {kcal: 0, lebensmittel: []}, 
  //   Abendessen: {kcal: 0, lebensmittel: []}};
  
  const appContextValue = {
    onBoarded,
    setOnBoarded,
    userData,
    setUserData,
    dayLogs, 
    setDayLogs
  }

  useEffect(() => {
    getStorage();
  }, []);
  
  const getStorage = async () => {
    console.log("getStorage Called!");
    const today = new Date().toISOString().split('T')[0];
    try {
      const storedDayLogs = await AsyncStorage.getItem(today);
      if(storedDayLogs != null) {
        console.log("Found dayLogs");
        setDayLogs(JSON.parse(storedDayLogs));
        console.log(dayLogs);
      }else {
        await AsyncStorage.setItem(today, JSON.stringify(dayLogs));
        console.log(dayLogs);
      }
      const userData = await AsyncStorage.getItem('userData');
      setUserData(userData != null ? JSON.parse(userData) : {
        calGoal: 2500,
        age: 25,
        gender: 'male',
        height: 180,
        weight: 65,
        activity: 1
      });
      const onBoarded = await AsyncStorage.getItem('onBoarded');
      setOnBoarded(onBoarded != null ? JSON.parse(onBoarded) : false);
    } catch (error) {
      console.log(error);
    }
  };

  // as long as the flag has not been loaded, return null
  if (onBoarded === undefined) {
    return null
  }

  return (
    <AppContext.Provider value={appContextValue}>
      <NavigationContainer>
        <Stack.Navigator>
          {!onBoarded ? (
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
          )}
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
    </AppContext.Provider>
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
