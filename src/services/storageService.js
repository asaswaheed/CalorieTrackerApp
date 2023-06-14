import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PROFILE_KEY = '@MyApp:UserProfile';

export const storeUserProfile = async (userProfile) => {
  try {
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile));
  } catch (error) {
    console.log('Error storing user profile: ', error);
  }
};

export const retrieveUserProfile = async () => {
  try {
    const userProfile = await AsyncStorage.getItem(USER_PROFILE_KEY);
    if (userProfile !== null) {
      return JSON.parse(userProfile);
    }
    return null;
  } catch (error) {
    console.log('Error retrieving user profile: ', error);
    return null;
  }
};

export const updateUserProfile = async (updatedProfile) => {
  try {
    const userProfile = await retrieveUserProfile();
    if (userProfile) {
      const updatedUser = { ...userProfile, ...updatedProfile };
      await storeUserProfile(updatedUser);
    }
  } catch (error) {
    console.log('Error updating user profile: ', error);
  }
};

export const addUserMeal = async (mealTitle, mealItems, date) => {
  try {
    const userProfile = await retrieveUserProfile();
    if (userProfile) {
      const meal = { title: mealTitle, items: mealItems, date };
      userProfile.meals.push(meal);
      await storeUserProfile(userProfile);
    }
  } catch (error) {
    console.log('Error adding user meal: ', error);
  }
};


export const retrieveUserMeals = async (date) => {
  try {
    const userProfile = await retrieveUserProfile();
    if (userProfile) {
      const meals = userProfile.meals.filter((meal) => meal.date === date);
      return meals;
    }
    return [];
  } catch (error) {
    console.log('Error retrieving user meals: ', error);
    return [];
  }
};

export const removeUserMeal = async (mealId, date) => {
  try {
    const userProfile = await retrieveUserProfile();
    if (userProfile) {
      const mealIndex = userProfile.meals.findIndex((meal) => meal.id === mealId && meal.date === date);
      if (mealIndex !== -1) {
        userProfile.meals.splice(mealIndex, 1);
        await storeUserProfile(userProfile);
      }
    }
  } catch (error) {
    console.log('Error removing user meal: ', error);
  }
};


export const updateUserMeal = async (mealId, date, updatedMeal) => {
  try {
    const userProfile = await retrieveUserProfile();
    if (userProfile) {
      const mealIndex = userProfile.meals.findIndex((meal) => meal.id === mealId && meal.date === date);
      if (mealIndex !== -1) {
        userProfile.meals[mealIndex] = { ...userProfile.meals[mealIndex], ...updatedMeal };
        await storeUserProfile(userProfile);
      }
    }
  } catch (error) {
    console.log('Error updating user meal: ', error);
  }
};

