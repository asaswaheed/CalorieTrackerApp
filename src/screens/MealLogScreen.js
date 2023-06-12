import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const MealLogScreen = ({navigation, route}) => {
  const {mealTitle} = route.params;
  const [mealCalories, setMealCalories] = useState(0);
  const [items, setItems] = useState([]);

  const handleSaveMeal = () => {
    // Logic to save the meal calories to AsyncStorage or perform any other action
    navigation.goBack();
  };

  const handleScanBarcode = () => {
    navigation.navigate('ScanBarcode');
  };

  const handleAddItem = () => {
    if (searchText.trim() != '') {
      const newItem = {name: searchText, calories: mealCalories};
      setItems(prevItems => [...prevItems, newItem]);
      setSearchText('');
      setMealCalories(0);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCalories}>{item.calories} kcal</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{mealTitle}</Text>
      </View>

      <View style={styles.searchContainer}>
        {/* Search bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Lebensmittel suchen"
          placeholderTextColor="#888"
          // Implement search functionality as needed
        />
        {/* Scan barcode button */}
        <TouchableOpacity style={styles.scanButton} onPress={handleScanBarcode}>
          <MaterialCommunityIcons name="barcode-scan" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.labelText}>Kalorien:</Text>
        <Text style={styles.calorieText}>{mealCalories} kcal</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041C32',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#041C32',
    paddingTop: 20,
  },
  backButton: {
    borderRadius: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#041C32',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  scanButton: {
    backgroundColor: '#04293A',
    borderRadius: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#041C32',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  labelText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  calorieText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 10,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
});

export default MealLogScreen;
