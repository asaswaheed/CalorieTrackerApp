import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchSearchResults } from '../components/searchService';
import {
    storeMealsLog,
    retrieveMealsLog,
  } from '../components/storageService';
import BasicModal from '../components/BasicModal';
import BarCodeScanner from '../components/BarcodeScanner';
import ProductView from '../components/ProductView';

const MealLogScreen = ({ navigation, route }) => {
  const { mealTitle } = route.params;
  const selectedDate = route.params.dateString;
  const [mealCalories, setMealCalories] = useState(0);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [mealsLog, setMealsLog] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [scannedCode, setScannedCode] = useState();
  const [productData, setProductData] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchSearchResults(searchText);
      setSearchResults(results);
    };

    if (searchText.trim() !== '') {
      fetchData();
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchText]);

  useEffect(() => {
    const fetchMealsLog = async () => {
      const log = await retrieveMealsLog();
      setMealsLog(log);
    };
    fetchMealsLog();
  }, []);

  const handleSaveMeal = async () => {
    const meal = { title: mealTitle, calories: mealCalories, items };
    const updatedLog = {
      ...mealsLog,
      [selectedDate]: { ...(mealsLog[selectedDate] || {}), [mealTitle]: meal },
    };
    try {
      await storeMealsLog(updatedLog);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };

  const getProductData = async (code) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
      const json = await response.json();
      setProductData(json);
      setScannedCode(code);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBarcodeScanned = code => {
      getProductData(code);
  };

  const handleAddItem = item => {
    const newItem = { name: item.name, calories: item.calories };
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleSelectItem = item => {
    setSelectedItem(item);
    setSearchText(item.name);
    setShowDropdown(false);
  };

  const renderItem = ({ item }) => {
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
        onPress={() => handleSelectItem(item)}
      >
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
      <Modal visible={showItemDetails} animationType="slide">
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemDetailsTitle}>{selectedItem?.name}</Text>
          <Text style={styles.itemDetailsText}>Calories: {selectedItem?.calories}</Text>
          <Text style={styles.itemDetailsText}>Fat: {selectedItem?.fat}</Text>
          <Text style={styles.itemDetailsText}>Carbs: {selectedItem?.carbs}</Text>
          <Text style={styles.itemDetailsText}>Protein: {selectedItem?.protein}</Text>
          <TouchableOpacity
            style={styles.itemDetailsButton}
            onPress={() => setShowItemDetails(false)}
          >
            <Text style={styles.itemDetailsButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSaveMeal}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{mealTitle}</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholder="Lebensmittel suchen"
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
        />
        {showDropdown && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={searchResults}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        )}
      </View>
      <View style={styles.itemsContainer}>
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setSelectedItem(item);
                setShowItemDetails(true);
              }}
            >
              <Text>{item.name}</Text>
              <Text>{item.calories} kcal</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <BasicModal title="Strichcode einscannen" isVisible={showModal} onClose={() => {
        setShowModal(false);
        setScannedCode();
      }}>
        {scannedCode ? (
          <ProductView product={productData} mealTitle={mealTitle} date={selectedDate} onClose={() => setShowModal(false)} />
        ) : (
          <BarCodeScanner onBarCodeScanned={handleBarcodeScanned}/>
        )}
      </BasicModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#D6E4E5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 200,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  dropdownItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  dropdownItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  dropdownItemCalories: {
    fontSize: 12,
    color: '#888',
  },
  itemsContainer: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDetailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemDetailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
  itemDetailsButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  itemDetailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MealLogScreen;
