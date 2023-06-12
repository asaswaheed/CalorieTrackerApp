import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import AppTabs from './AppTabs';
import {NavigationContainer} from '@react-navigation/native';
import MealLogScreen from '../screens/MealLogScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}} // Hide the header for the Welcome screen
        />
        <Stack.Screen
          name="AppTabs"
          component={AppTabs}
          options={{headerShown: false}} // Hide the header for the main app area
        />
        <Stack.Screen
          name="MealLogScreen"
          component={MealLogScreen}
          options={{headerShown: true}}
         />
      </Stack.Navigator>
  );
};

export default AppNavigator;
