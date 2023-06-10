import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ScanBarcode" component={ScanBarcodeScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;