import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';
import MealLogScreen from '../screens/MealLogScreen';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ScanBarcode" component={ScanBarcodeScreen} />
      <Tab.Screen name="MealLog" component={MealLogScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;
