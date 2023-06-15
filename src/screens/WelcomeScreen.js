import { React, useState, useEffect, useContext } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../App';

const WelcomeScreen = ({navigation}) => {
  // access the context

  const { setOnBoarded } = useContext(AppContext);

  const onPressStart = async () => {
    try {
      await AsyncStorage.setItem('onBoarded', 'true');
      setOnBoarded(true);
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/calpal-logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity
        style={[styles.button, styles.buttonPrimary]}
        onPress={onPressStart}>
        <Text style={styles.buttonText}>Loslegen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffdedb',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#000000',
  },
  buttonPrimary: {
    backgroundColor: '#262523',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});

export default WelcomeScreen;
