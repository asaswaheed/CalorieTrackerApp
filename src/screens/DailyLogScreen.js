import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MealLogScreen from './MealLogScreen';
import { createStackNavigator } from 'react-navigation/stack';

const DailyLogScreen = ({ navigation }) => {
  const [dailyCalories, setDailyCalories] = useState(2000); //Change with asynce
  const [dailyGoal, setDailyGoal] = useState(2500); //Change with asynce
  const [macronutrients, setMacronutrients] = useState({
    carbs: 150, //Change with asynce
    protein: 100, //Change with asynce
    fat: 60, //Change with asynce
  });
  const caloriesLeft = Math.max(dailyGoal - dailyCalories, 0);
  const [mealLogs, setMealLogs] = useState({
    breakfast: 500, //Change with asynce
    lunch: 800, //Change with asynce
    dinner: 700, //Change with asynce
  });
  const [mealTitle, setMealTitle] = useState('');

  const handleEditMeal = (meal) => {
    setMealTitle(meal);
    navigation.navigate('MealLogScreen', { mealTitle: meal });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapperContainer, { backgroundColor: '#04293A' }]}>
        <View style={styles.summaryContainer}>
          <Text style={styles.headerText}>Gegessen</Text>
          <Text
            style={[
              styles.calorieText,
              { color: dailyGoal - dailyCalories < 0 ? '#a10808' : '#4ecf04' },
            ]}
          >
            {dailyCalories} kcal
          </Text>
          <Text style={styles.goalText}>Ziel: {dailyGoal} kcal</Text>
          <Text style={styles.goalText}>Übrig: {caloriesLeft} kcal</Text>
          <View style={styles.macronutrientContainer}>
            <Text style={styles.macronutrientText}>
              Kohlenhyd.: {macronutrients.carbs} g
            </Text>
            <Text style={styles.macronutrientText}>
              Protein: {macronutrients.protein} g
            </Text>
            <Text style={styles.macronutrientText}>
              Fett: {macronutrients.fat} g
            </Text>
          </View>
        </View>
      </View>

        <View style={[styles.mealContainer, { backgroundColor: '#04293A' }]}>
          <View style={styles.mealItem}>
            <Text style={styles.mealText}>
              Frühstück - {mealLogs.breakfast} kcal
            </Text>
            <TouchableOpacity onPress={() => handleEditMeal('Frühstück')}>
              <Text style={styles.editText}>Bearbeiten</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mealItem}>
            <Text style={styles.mealText}>
              Mittagessen - {mealLogs.lunch} kcal
            </Text>
            <TouchableOpacity onPress={() => handleEditMeal('Mittagessen')}>
              <Text style={styles.editText}>Bearbeiten</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mealItem}>
            <Text style={styles.mealText}>
              Abendessen - {mealLogs.dinner} kcal
            </Text>
            <TouchableOpacity onPress={() => handleEditMeal('Abendessen')}>
              <Text style={styles.editText}>Bearbeiten</Text>
            </TouchableOpacity>
          </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041C32',
  },
  wrapperContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 7,
    borderWidth: 0.5,
    borderColor: '#5e615f',
    borderRadius: 20,
  },
  summaryContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 5,
    fontFamily: 'Rajdhani-Bold',
  },
  calorieText: {
    fontSize: 48,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Rajdhani-Bold',
  },
  goalText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Rajdhani-Bold',
  },
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
  mealContainer: {
    flex: 1.1,
    paddingHorizontal: 5,
    paddingTop: 5,
    margin: 7,
    borderRadius: 20,
    borderColor: '#5e615f',
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: '#ccc',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  mealText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Rajdhani-Bold',
  },
  editText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Rajdhani-Regular',
  },
});

// flex: 1.1,
// justifyContent: 'center',
// alignItems: 'center',
// paddingHorizontal: 2,
// margin: 7,
// borderWidth: 0.5,
// borderColor: '#5e615f',
// borderRadius: 20,

export default DailyLogScreen;
