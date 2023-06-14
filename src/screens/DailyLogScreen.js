import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {retrieveUserMeals} from '../services/storageService';
import {UserContext} from '../../App';
import {
  calculateMealLogs,
  calculateMacronutrients,
  calculateEatenCalories,
} from '../helpers/mealHelpers';

const DailyLogScreen = ({navigation}) => {
  const {user, updateUser} = useContext(UserContext);
  const [dailyCalories, setDailyCalories] = useState(0); // Change with async
  const [dailyGoal, setDailyGoal] = useState(0); // Change with async

  const [macronutrients, setMacronutrients] = useState({
    carbs: 0,
    protein: 0,
    fat: 0,
  });

  const caloriesLeft = Math.max(dailyGoal - dailyCalories, 0);
  const [mealLogs, setMealLogs] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
  });
  const [mealTitle, setMealTitle] = useState('');

  useEffect(() => {
    if (user) {
      const fetchMealLogs = async () => {
        const meals = await retrieveUserMeals(getFormattedDate(selectedDate));
        const mealLogs = calculateMealLogs(meals);
        setMealLogs(mealLogs);

        // Calculate macronutrient totals
        const macronutrients = calculateMacronutrients(meals);
        setMacronutrients(macronutrients);

        // Calculate eaten calories
        const eatenCalories = calculateEatenCalories(macronutrients);
        setDailyCalories(eatenCalories);

        // Retrieve daily goal
        setDailyGoal(user.calorieGoal);
      };

      fetchMealLogs();
    }
  }, [user, selectedDate]);

  const handleEditMeal = meal => {
    setMealTitle(meal);
    navigation.navigate('MealLog', {mealTitle: meal, selectedDate});
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

  const [selectedDate, setSelectedDate] = useState(new Date()); // Replace with your initial selected date

  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const handleDatePress = () => {
    const currentDate = new Date();
    setSelectedDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.calendarBar]}>
        <TouchableOpacity onPress={handlePreviousDay}>
          <Icon name="keyboard-arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.dateText} onPress={handleDatePress}>
          {getFormattedDate(selectedDate)}
        </Text>
        <TouchableOpacity onPress={handleNextDay}>
          <Icon name="keyboard-arrow-right" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={[styles.wrapperContainer, {backgroundColor: '#04293A'}]}>
        <View style={styles.summaryContainer}>
          <Text style={styles.headerText}>Gegessen</Text>
          <Text
            style={[
              styles.calorieText,
              {color: dailyGoal - dailyCalories < 0 ? '#a10808' : '#4ecf04'},
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

      <View style={[styles.mealContainer, {backgroundColor: '#04293A'}]}>
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
    color: 'white',
    fontFamily: 'Rajdhani-Bold',
  },
  wrapperContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 7,
    borderWidth: 0.5,
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

export default DailyLogScreen;
