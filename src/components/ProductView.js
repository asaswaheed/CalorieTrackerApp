import { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveDayLog, storeDayLog } from '../components/storageService';
import { AppContext } from '../../App';

const ProductView = ({ product, mealTitle, date, onClose }) => {
  const { dayLogs, setDayLogs } = useContext(AppContext);
  const [amount, setAmount] = useState('');
  const [calories, setCalories] = useState(0);

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleAddCalories = async () => {
    const productCalories = parseFloat(amount)/100 * productData.calories;
    const dateString = date.toISOString().split('T')[0];
    let meal = "";
    if(mealTitle === "Frühstück") {
      meal = "breakfast";
    }else if(mealTitle === "Mittagessen") {
      meal = "lunch";
    }else {
      meal = "dinner";
    }
    try {
      const storedDayLogs = JSON.parse(await AsyncStorage.getItem(dateString));
      
      if(storedDayLogs != null) {
        console.log("Found dayLogs");
        storedDayLogs.calories += Math.floor(productCalories);
        storedDayLogs.carbs += Math.floor(productData.carbs);
        storedDayLogs.fat += Math.floor(productData.fat);
        storedDayLogs.protein += Math.floor(productData.protein);
        storedDayLogs[meal].calories += Math.floor(productCalories);
        storedDayLogs[meal].products.push(productData);
        await AsyncStorage.setItem(dateString, JSON.stringify(storedDayLogs));
        console.log(storedDayLogs);
      }else {
        const storedDayLogs = {
          calories: 0, protein: 0, fat: 0, carbs: 0, 
          breakfast: {calories: 0, products: []}, 
          lunch: {calories: 0, products: []}, 
          dinner: {calories: 0, products: []}};
        
        storedDayLogs.calories = Math.floor(productCalories);
        storedDayLogs.carbs = Math.floor(productData.carbs);
        storedDayLogs.fat = Math.floor(productData.fat);
        storedDayLogs.protein = Math.floor(productData.protein);
        storedDayLogs[meal].calories = Math.floor(productCalories);
        storedDayLogs[meal].products.push(productData);
        await AsyncStorage.setItem(dateString, JSON.stringify(storedDayLogs));
        console.log(storedDayLogs);
      }
    } catch (error) {
      console.log(error);
    }
    setCalories(productCalories);
    setDayLogs(dayLogs);
    onClose();
  };

  product = product.product;
  const productData = {
    calories: product.nutriments['energy-kcal'],
    protein: product.nutriments['proteins'],
    fat: product.nutriments['fat'],
    carbs: product.nutriments['carbohydrates']
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.product_name_de} (100g)</Text>
      <Text style={styles.description}>Kalorien: {product.nutriments['energy-kcal']} Kcal</Text>
      <Text style={styles.description}>Eiweiß: {product.nutriments['proteins']} g</Text>
      <Text style={styles.description}>Fett: {product.nutriments['fat']} g</Text>
      <Text style={styles.description}>Kohlenhydrate: {product.nutriments['carbohydrates']} g</Text>
      <TextInput
        style={styles.input}
        placeholder="Portionsgröße eingeben (g)"
        keyboardType="numeric"
        value={amount}
        onChangeText={handleAmountChange}
      />
      <Button title="Hinzufügen" onPress={handleAddCalories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  }
});

export default ProductView;
