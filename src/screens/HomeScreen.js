import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import OverviewScreen from './OverviewScreen';
import DailyLogScreen from './DailyLogScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused, color, size) => {
  let iconName;

  if (routeName === 'Übersicht') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === 'Tagebuch') {
    iconName = focused ? 'bar-chart' : 'bar-chart-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitle: () => <Text style={styles.headerText}>CalPal</Text>,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#041C32' },
          tabBarActiveBackgroundColor: '#545B77',
          tabBarInactiveBackgroundColor: '#374259',
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color, size }) =>
            getTabBarIcon(route.name, focused, color, size),
        })}
      >
        <Tab.Screen name="Übersicht" component={OverviewScreen} />
        <Tab.Screen name="Tagebuch" component={DailyLogScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2D8D8',
  },
  headerText: {
    fontSize: 45,
    fontFamily: 'Righteous-Regular',
    color: '#B958A5',
  },
  tabBarLabel: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Rajdhani-Bold',
  },
});

export default HomeScreen;
