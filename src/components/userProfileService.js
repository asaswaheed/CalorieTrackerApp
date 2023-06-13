import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PROFILE_KEY = '@MyApp:UserProfile';

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

export const calculateCalorieGoal = (weight, height, gender) => {
  // ... your logic to calculate the calorie goal based on weight, height, and gender
};
