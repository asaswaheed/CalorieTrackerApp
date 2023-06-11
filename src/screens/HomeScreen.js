import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OverviewScreen from './OverviewScreen';
import DailyLogScreen from './DailyLogScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Overview" component={OverviewScreen} />
      <Tab.Screen name="Daily Log" component={DailyLogScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;