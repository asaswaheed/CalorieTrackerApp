import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { storeUserProfile, calculateCalorieGoal } from '../components/userProfileService';

const CreateProfileScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');

  const handleCreateProfile = async () => {
    const calorieGoal = calculateCalorieGoal(weight, height, gender);
    const profile = {
      weight,
      height,
      gender,
      calorieGoal,
    };
    await storeUserProfile(profile);
    navigation.navigate('Home');
  };

  return (
    <View>
      <TextInput
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        placeholder="Height"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <Button title="Create Profile" onPress={handleCreateProfile} />
    </View>
  );
};

export default CreateProfileScreen;
