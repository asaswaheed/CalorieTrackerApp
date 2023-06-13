import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import CalorieSummaryContainer from '../components/CalorieSummaryContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveMealsLog } from '../components/storageService';

const OverviewScreen = () => {
  const [calorieGoal, setCalorieGoal] = useState('2000');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [dailyCalories, setDailyCalories] = useState(2000); //Change with asynce
  const [dailyGoal, setDailyGoal] = useState(2500); //Change with asynce
  const [macronutrients, setMacronutrients] = useState({
    carbs: 150, //Change with asynce
    protein: 100, //Change with asynce
    fat: 60, //Change with asynce
  });

  const handleEditGoal = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveGoal = () => {
    setIsEditing(!isEditing);
    // Save the calorie goal locally, e.g., AsyncStorage
  };

  // Utility function to check if two date strings represent the same day
  const isSameDay = (dateString1, dateString2) => {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Utility function to add days to a date
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const handleDayPress = async (day) => {
    setSelectedDate(day.dateString);
    const mealsLog = await retrieveMealsLog();
  
    if (mealsLog && mealsLog[day.dateString]) {
      const selectedData = mealsLog[day.dateString];
      setDailyCalories(selectedData.calories);
      setMacronutrients({
        carbs: selectedData.carbs,
        protein: selectedData.protein,
        fat: selectedData.fat,
      });
    } else {
      setDailyCalories(0);
      setMacronutrients({
        carbs: 0,
        protein: 0,
        fat: 0,
      });
    }
  };

  const renderMarkedDates = () => {
    const markedDates = {};

    if (selectedDate) {
      markedDates[selectedDate] = {selected: true, selectedColor: '#0d58ba'};
    }

    return markedDates;
  };

  return (
    <View style={styles.container}>
      <View style={styles.calorieGoalContainer}>
        <Text style={styles.title}>Kalorienziel:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={calorieGoal}
            onChangeText={setCalorieGoal}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.goal}>{calorieGoal}</Text>
        )}
        <Button
          title={isEditing ? 'Save' : 'Edit'}
          onPress={isEditing ? handleSaveGoal : handleEditGoal}
        />
      </View>

      <View style={styles.calendarContainer}>
        <CalorieSummaryContainer
          carbs={macronutrients.carbs}
          protein={macronutrients.protein}
          fat={macronutrients.fat}
        />

        <Calendar
          onDayPress={handleDayPress}
          markedDates={renderMarkedDates()}
          theme={{
            calendarBackground: '#04293A',
            textSectionTitleColor: 'white',
            selectedDayBackgroundColor: '#205295',
            selectedDayTextColor: 'white',
            todayTextColor: '#205295',
            dayTextColor: 'white',
            textDisabledColor: '#9e9e9e',
            arrowColor: 'white',
            monthTextColor: 'white',
            textMonthFontWeight: 'bold',
            textDayFontSize: 18,
            textMonthFontSize: 20,
          }}
          style={styles.calendar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#041C32',
  },
  calorieGoalContainer: {
    flex: 0.3,
    backgroundColor: '#04293A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 7,
    borderWidth: 0.5,
    borderColor: 'transparent',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Rajdhani-Bold',
  },
  goal: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Rajdhani-Bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    width: '40%',
    textAlign: 'center',
    fontSize: 20,
    paddingHorizontal: 5,
    backgroundColor: '#064663',
    margin: 7,
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
  summaryContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 15,
    marginLeft: 15,
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
  calendarContainer: {
    flex: 1,
    backgroundColor: '#041C32',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
    margin: 7,
    borderRadius: 20,
    paddingLeft: 2,
    paddingRight: 2,
  },
  calendar: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
  },
});

export default OverviewScreen;
