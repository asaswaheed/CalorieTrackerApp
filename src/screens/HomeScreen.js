import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import OverviewScreen from './OverviewScreen';
import DailyLogScreen from './DailyLogScreen';
import Profile from './Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
      screenOptions={{
        tabBarActiveTintColor: '#222',
      }}
    >
      <Tab.Screen
        name="Übersicht"
        component={OverviewScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Übersicht',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tagebuch"
        component={DailyLogScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Tagebuch',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profile}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
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
