import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';
import MealLogScreen from '../screens/MealLogScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MealLogScreen" component={MealLogScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;