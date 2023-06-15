import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import CalorieSummaryContainer from '../components/CalorieSummaryContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveDayLog, storeDayLog } from '../components/storageService';
import { AppContext } from '../../App';


const OverviewScreen = () => {
  const { userData, setUserData, dayLogs, setDayLogs } = useContext(AppContext);
  const [calorieGoal, setCalorieGoal] = useState(userData != null ? userData.calGoal : 2200);
  const [selectedDate, setSelectedDate] = useState(null);

  const [dailyCalories, setDailyCalories] = useState(dayLogs.calories); //Change with asynce
  const [macronutrients, setMacronutrients] = useState({
    carbs: dayLogs.carbs, //Change with asynce
    protein: dayLogs.protein, //Change with asynce
    fat: dayLogs.fat, //Change with asynce
  });
  
  useEffect(() => {
    setCalorieGoal(userData.calGoal);
  }, [userData]);

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
    const dateString = day.dateString; 
    console.log(dateString);
    setSelectedDate(dateString);
    // const testLog = {calories: 155, protein: 155, fat: 55, carbs: 25, 
    //   Frühstück: {kcal: 0, lebensmittel: []}, 
    //   Mittagessen: {kcal: 0, lebensmittel: []}, 
    //   Abendessen: {kcal: 0, lebensmittel: []}};
    // try {
    //   await storeDayLog(dateString, testLog);
    // } catch (error) {
    //   console.log(error);
    // }
    const dayLog = await retrieveDayLog(dateString);
    console.log("Retrieved: " + dayLog);

    if (dayLog) {
      setDailyCalories(dayLog.calories);
      setMacronutrients({
        carbs: dayLog.carbs,
        protein: dayLog.protein,
        fat: dayLog.fat,
      });
    } else {
      setDailyCalories(0);
      setMacronutrients({
        carbs: 0,
        protein: 0,
        fat: 0,
      });
    }
    console.log(dayLog);
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
          <Text style={styles.goal}>{calorieGoal}</Text>
      </View>

      <View style={styles.calendarContainer}>
        <CalorieSummaryContainer
          calories={dailyCalories}
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
