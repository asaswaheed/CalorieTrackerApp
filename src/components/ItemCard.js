import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ItemCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>Carbs: {item.carbs}</Text>
      <Text>Protein: {item.protein}</Text>
      <Text>Fat: {item.fat}</Text>
      <Text>Amount: {item.amount}</Text>
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ItemCard;
