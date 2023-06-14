import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserCard = ({ user }) => {
  if (!user) {
    // Display default values or loading state
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading user information...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name || 'Unknown User'}</Text>
      <Text style={styles.info}>Gender: {user.gender || 'MEMALE'}</Text>
      <Text style={styles.info}>Height: {user.height || 170} cm</Text>
      <Text style={styles.info}>Weight: {user.weight || 200} kg</Text>
      <Text style={styles.info}>Calorie Goal: {user.calorieGoal || 1000}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 3,
  },
});

export default UserCard;
