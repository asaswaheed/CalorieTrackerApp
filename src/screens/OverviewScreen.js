import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const OverviewScreen = () => {
  const [calorieGoal, setCalorieGoal] = useState('2000');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditGoal = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveGoal = () => {
    setIsEditing(!isEditing);
    // Save the calorie goal locally, e.g., AsyncStorage
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#041C32',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Rajdhani-Bold',
  },
  goal: {
    fontSize: 24,
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
    backgroundColor: '#205295',
  },
});

export default OverviewScreen;