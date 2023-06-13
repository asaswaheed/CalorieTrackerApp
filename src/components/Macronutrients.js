import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Macronutrients = ({macronutrients}) => {
  return (
    <View style={styles.macronutrientContainer}>
      <Text style={styles.macronutrientText}>
        Kohlenhyd.: {macronutrients.carbs} g
      </Text>
      <Text style={styles.macronutrientText}>
        Protein: {macronutrients.protein} g
      </Text>
      <Text style={styles.macronutrientText}>Fett: {macronutrients.fat} g</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    macronutrientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 5,
      },
      macronutrientText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Rajdhani-Bold',
      },
})
