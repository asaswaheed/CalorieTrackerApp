import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MealLogScreen from './MealLogScreen';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  retrieveMealsLog,
  retrieveUserProfile,
} from '../components/storageService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveDayLog, storeDayLog } from '../components/storageService';
import { AppContext } from '../../App';

const DailyLogScreen = ({navigation}) => {
  const { userData, setUserData, dayLogs, setDayLogs } = useContext(AppContext);
  const [dailyCalories, setDailyCalories] = useState(dayLogs.calories); // Change with async
  const [dailyGoal, setDailyGoal] = useState(userData != null ? userData.calGoal : 2200); // Change with async
  const [macronutrients, setMacronutrients] = useState({
    carbs: dayLogs.carbs, // Change with async
    protein: dayLogs.protein, // Change with async
    fat: dayLogs.fat, // Change with async
  });
  const caloriesLeft = Math.max(dailyGoal - dailyCalories, 0);
  const [mealLogs, setMealLogs] = useState({
    breakfast: dayLogs.breakfast.calories, // Change with async
    lunch: dayLogs.lunch.calories, // Change with async
    dinner: dayLogs.dinner.calories, // Change with async
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealTitle, setMealTitle] = useState('');

  useEffect(() => {
    setDailyGoal(userData.calGoal);
  }, [userData]);

  const handleEditMeal = meal => {
    setMealTitle(meal);
    navigation.navigate('MealLogScreen', {mealTitle: meal, selectedDate});
  };

  const getFormattedDate = date => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Heute';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Gestern';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Morgen';
    } else {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
  };


  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    getDayLogs(previousDay);
    setSelectedDate(previousDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    getDayLogs(nextDay);
    setSelectedDate(nextDay);
  };

  const handleDatePress = () => {
    const currentDate = new Date();
    getDayLogs(currentDate);
    setSelectedDate(currentDate);
  };

  const getDayLogs = async (date) => {
    const dateString = date.toISOString().split('T')[0];
    try {
      const storedDayLogs = JSON.parse(await AsyncStorage.getItem(dateString));
      
      if(storedDayLogs != null) {
        console.log("Found dayLogs");
        setDailyCalories(storedDayLogs.calories);
        setMacronutrients({
          carbs: storedDayLogs.carbs, // Change with async
          protein: storedDayLogs.protein, // Change with async
          fat: storedDayLogs.fat, // Change with async
        });
        setMealLogs({
          breakfast: storedDayLogs.breakfast.calories,
          lunch: storedDayLogs.lunch.calories, 
          dinner: storedDayLogs.dinner.calories,
        });
        console.log(storedDayLogs);
      }else {
        setDailyCalories(0);
        setMacronutrients({
          carbs: 0, // Change with async
          protein: 0, // Change with async
          fat: 0, // Change with async
        });
        setMealLogs({
          breakfast: 0,
          lunch: 0, 
          dinner: 0,
        });
        console.log(storedDayLogs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.calendarBar]}>
        <TouchableOpacity onPress={handlePreviousDay}>
          <Icon name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.dateText} onPress={handleDatePress}>
          {getFormattedDate(selectedDate)}
        </Text>
        <TouchableOpacity onPress={handleNextDay}>
          <Icon name="keyboard-arrow-right" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={[styles.wrapperContainer, {backgroundColor: '#EFF5F5'}]}>
        <View style={styles.summaryContainer}>
          <Text style={styles.headerText}>Gegessen</Text>
          <Text
            style={[
              styles.calorieText,
              {color: dailyGoal - dailyCalories < 0 ? '#590916' : '#095911'},
            ]}>
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

      <View style={[styles.mealContainer, {backgroundColor: '#EFF5F5'}]}>
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
    backgroundColor: '#D6E4E5',
  },
  calendarBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 7,
    borderRadius: 20,
  },
  dateText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Rajdhani-Bold',
  },
  wrapperContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 7,
    borderWidth: 0.5,
    borderColor: 'transparent',
    borderRadius: 20,
  },
  summaryContainer: {
    flex: 0.25,
    justifyContent: 'center',
    borderColor: 'transparent',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Rajdhani-Bold',
  },
  calorieText: {
    fontSize: 48,
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Rajdhani-Bold',
  },
  goalText: {
    fontSize: 18,
    color: 'black',
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
    color: 'black',
    fontFamily: 'Rajdhani-Bold',
  },
  mealContainer: {
    flex: 1.1,
    paddingHorizontal: 5,
    paddingTop: 5,
    margin: 7,
    borderRadius: 20,
    borderWidth: 0.5,
    justifyContent: 'center',
    borderColor: 'transparent',
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
    color: 'black',
    fontFamily: 'Rajdhani-Bold',
  },
  editText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Rajdhani-Regular',
  },
});

export default DailyLogScreen;
