import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const DailyLogScreen = ({navigation}) => {
  const dailyCalories = 2000; // Replace with actual value from AsyncStorage
  const dailyGoal = 2500; // Replace with the user's daily calorie goal from AsyncStorage
  const macronutrients = {
    carbs: 150, // Replace with actual macronutrient data from AsyncStorage
    protein: 100,
    fat: 60,
  };
  const caloriesLeft = Math.max(dailyGoal - dailyCalories, 0);
  const mealLogs = {
    breakfast: 500, // Replace with actual meal log data from AsyncStorage
    lunch: 800,
    dinner: 700,
  };

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.headerText}>Daily Calorie Intake</Text>
        <Text style={styles.calorieText}>{dailyCalories} kcal</Text>
        <Text style={styles.goalText}>Goal: {dailyGoal} kcal</Text>
        <Text style={styles.goalText}>Calories Left: {caloriesLeft} kcal</Text>
        <View style={styles.macronutrientContainer}>
          <Text style={styles.macronutrientText}>Carbs: {macronutrients.carbs} g</Text>
          <Text style={styles.macronutrientText}>Protein: {macronutrients.protein} g</Text>
          <Text style={styles.macronutrientText}>Fat: {macronutrients.fat} g</Text>
        </View>
      </View>

      <View style={styles.mealContainer}>
        <View style={styles.mealItem}>
          <Text style={styles.mealText}>Breakfast - {mealLogs.breakfast} kcal</Text>
          <TouchableOpacity onPress={() => navigation.navigate('BreakfastLog')}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mealItem}>
          <Text style={styles.mealText}>Lunch - {mealLogs.lunch} kcal</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LunchLog')}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mealItem}>
          <Text style={styles.mealText}>Dinner - {mealLogs.dinner} kcal</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DinnerLog')}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  summaryContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  calorieText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  goalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  macronutrientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  macronutrientText: {
    fontSize: 18,
    color: '#333',
  },
  mealContainer: {
    flex: 0.75,
    paddingHorizontal: 20,
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 20,
  },
  mealText: {
    fontSize: 20,
    color: '#333',
  },
  editText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default DailyLogScreen;