import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SummaryContainer = ({carbs, protein, fat}) => {
  // Calculate total calories based on macronutrient values
  const calculateTotalCalories = () => {
    const carbCalories = carbs * 4;
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;
    return carbCalories + proteinCalories + fatCalories;
  };

  const totalCalories = calculateTotalCalories();

  return (
    <View style={styles.container}>
      <Text style={styles.summaryTotalCalorieText}>
        Gesamtkalorien: {totalCalories}
      </Text>
      <View style={styles.macronutrientContainer}>
        <Text style={styles.macronutrientText}>Kohlenhyd.: {carbs} g</Text>
        <Text style={styles.macronutrientText}>Protein: {protein} g</Text>
        <Text style={styles.macronutrientText}>Fett: {fat} g</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginHorizontal: 7,
    marginBottom: 7,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: 'transparent',
    backgroundColor: '#04293A',
  },
  summaryTotalCalorieText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Rajdhani-Bold',
  },
  macronutrientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  macronutrientText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Rajdhani-Bold',
  },
});

export default SummaryContainer;
