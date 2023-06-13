import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const MealLogScreen = ({navigation, route}) => {
  const {mealTitle} = route.params;
  const [mealCalories, setMealCalories] = useState(0);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemDetails, setShowItemDetails] = useState(false);

  const mockedSearchResults = [
    {id: 1, name: 'Apple', calories: 52, fat: 0.2, carbs: 14, protein: 0.3},
    {id: 2, name: 'Banana', calories: 96, fat: 0.2, carbs: 23, protein: 1},
    {id: 3, name: 'Orange', calories: 43, fat: 0.1, carbs: 9, protein: 0.9},
    {id: 4, name: 'Ananas', calories: 43, fat: 0.1, carbs: 9, protein: 0.9},
    // Add more mocked search results as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      const filteredResults = mockedSearchResults.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setSearchResults(filteredResults);
    };

    if (searchText.trim() !== '') {
      fetchData();
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchText]);

  const handleSaveMeal = () => {
    // Logic to save the meal calories to AsyncStorage or perform any other action
    navigation.goBack();
  };

  const handleScanBarcode = () => {
    navigation.navigate('ScanBarcodeScreen');
  };

  const handleSearch = searchText => {
    // Simulate fetching search results
    const filteredResults = mockedSearchResults.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    if (filteredResults.length === 0) {
      setSearchResults([{id: 0, name: 'Keine Ergebnisse'}]);
    } else {
      setSearchResults(filteredResults);
    }
  };

  const handleAddItem = item => {
    const newItem = {name: item.name, calories: item.calories};
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleSelectItem = item => {
    setSelectedItem(item);
    setSearchText(item.name);
    setShowDropdown(false);
  };

  const renderItem = ({item}) => {
    if (item.id === 0) {
      // Display "Keine Ergebnisse" message
      return (
        <View style={styles.dropdownItem}>
          <Text style={styles.dropdownItemText}>{item.name}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.dropdownItem}
        onPress={() => handleSelectItem(item)}>
        <Text style={styles.dropdownItemText}>{item.name}</Text>
        <View style={styles.dropdownItemDetails}>
          <Text style={styles.dropdownItemCalories}>{item.calories} kcal</Text>
          <TouchableOpacity onPress={() => handleAddItem(item)}>
            <MaterialCommunityIcons name="plus" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

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
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        {/* Scan barcode button */}
        <TouchableOpacity style={styles.scanButton} onPress={handleScanBarcode}>
          <MaterialCommunityIcons name="barcode-scan" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <View style={styles.dropdownContainer}>
          {searchResults.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.dropdownItem}
              onPress={() => handleSelectItem(item)}>
              <Text style={styles.dropdownItemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.labelText}>Kalorien:</Text>
        <Text style={styles.calorieText}>{mealCalories} kcal</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>Hinzufügen</Text>
      </TouchableOpacity>

      {/* Item Details Screen/Modal */}
      <Modal visible={showItemDetails} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          {/* Item details and amount selection */}
          {/* Add button */}
        </View>
      </Modal>
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
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 132,
    left: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: '#fff',
    elevation: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownItemCalories: {
    fontSize: 12,
    color: '#888',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalAddButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalAddButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MealLogScreen;
