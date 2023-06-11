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
      <Text style={styles.title}>Calorie Goal:</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  goal: {
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '40%',
    textAlign: 'center',
    fontSize: 20,
    paddingHorizontal: 5,
  },
});

export default OverviewScreen;