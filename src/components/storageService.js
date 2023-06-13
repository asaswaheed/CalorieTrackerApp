import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PROFILE_KEY = '@MyApp:UserProfile';
const MEALS_LOG_KEY = '@MyApp:MealsLog';

export const storeUserProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
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

export const storeMealsLog = async (log) => {
  try {
    await AsyncStorage.setItem(MEALS_LOG_KEY, JSON.stringify(log));
  } catch (error) {
    console.log('Error storing meals log: ', error);
  }
};

export const retrieveMealsLog = async () => {
  try {
    const mealsLog = await AsyncStorage.getItem(MEALS_LOG_KEY);
    if (mealsLog !== null) {
      return JSON.parse(mealsLog);
    }
    return {};
  } catch (error) {
    console.log('Error retrieving meals log: ', error);
    return {};
  }
};
