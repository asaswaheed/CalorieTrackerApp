import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealCard = ({ meal }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meal.id}</Text>
      {meal.items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text>Carbs: {item.carbs}</Text>
          <Text>Protein: {item.protein}</Text>
          <Text>Fat: {item.fat}</Text>
          <Text>Amount: {item.amount}</Text>
        </View>
      ))}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemContainer: {
    marginTop: 5,
  },
  itemName: {
    fontWeight: 'bold',
  },
});

export default MealCard;
