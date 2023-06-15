import { useState, useEffect, useContext } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../App';
import BasicButton from '../components/BasicButton';

const Profile = ({ navigation }) => {
  const { userData, setUserData } = useContext(AppContext);
  const [cal, setCal] = useState(userData.calGoal);

  const getCal = () => {
    return parseInt((userData.gender === 'männlich' ? 10*userData.weight + 6.25*userData.height - 5*userData.age + 5 : 10*userData.weight + 6.25*userData.height - 5*userData.age - 161) * userData.activity);
  }
  
  const storeUserProfile = async (profile) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(profile));
    } catch (error) {
      console.log('Error storing user profile: ', error);
    }
  };

  useEffect(() => {
    setCal(getCal());
  }, [userData]);

  // const updateCal = () => {
  //   setCal(getCal());
  // }

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify({
        ...userData,
        calGoal: cal
      }));
    } catch (error) {
      console.log('Error storing user profile: ', error);
    }
    setUserData({
      ...userData,
      calGoal: cal
    });
    navigation.navigate('Home');
  };

  const clearData = async() => {
    AsyncStorage.clear();
    resetUserData();
  }

  const resetUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      setUserData(userData != null ? JSON.parse(userData) : {
        calGoal: 2500,
        age: 25,
        gender: 'männlich',
        height: 180,
        weight: 65,
        activity: 1
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container} >
      <Text style={styles.description}>Kalorien: {cal} Kcal</Text>
      <TextInput
        style={styles.input}
        placeholder="Alter"
        keyboardType="numeric"
        value={String(userData.age)}
        onChangeText={(value) => {
          setUserData({
            ...userData,
            age: value
          })
        }}
      />
      <RNPickerSelect
          placeholder={{}}
          value={userData.gender}
          onValueChange={(value) => {
            setUserData({
              ...userData,
              gender: value
            })
          }}
          items={[
              { label: 'Männlich', value: 'männlich' },
              { label: 'Weiblich', value: 'weiblich' }
          ]}
      />
      <TextInput
        style={styles.input}
        value={String(userData.height)}
        placeholder="Größe in cm"
        keyboardType="numeric"
        onChangeText={(value) => {
          setUserData({
            ...userData,
            height: value
          })
        }}
      />
      <TextInput
        style={styles.input}
        value={String(userData.weight)}
        placeholder="Gewicht in kg"
        keyboardType="numeric"
        onChangeText={(value) => {
          setUserData({
            ...userData,
            weight: value
          })
        }}
      />
      <RNPickerSelect
          placeholder={{}}
          value={userData.activity}
          onValueChange={(value) => {
            setUserData({
              ...userData,
              activity: value
            })
          }}
          items={[
              { label: 'Grundumsatz (BMR)', value: 1 },
              { label: 'Geringe Aktivität: minimale oder keine Bewegung', value: 1.2 },
              { label: 'Leicht aktiv: 1-3 Mal pro Woche Sport treiben', value: 1.375 },
              { label: 'Mäßig aktiv: 3–5 Mal pro Woche Sport treiben', value: 1.55 },
              { label: 'Sehr aktiv: 6-7 Mal pro Woche Sport treiben', value: 1.725 },
              { label: 'Besonders aktiv: 6-7 Mal pro Woche sehr anstrengend trainieren', value: 1.9 }
          ]}
      />
      <BasicButton title="Kalorienziel festlegen" onPress={saveData} />
      <BasicButton title="Daten löschen" onPress={clearData} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});
