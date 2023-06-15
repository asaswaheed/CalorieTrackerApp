import {useState, useEffect, useContext} from 'react';
import {Button, Text, View, TextInput, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../../App';
import BasicButton from '../components/BasicButton';

const Profile = ({navigation}) => {
  const {userData, setUserData} = useContext(AppContext);
  const [cal, setCal] = useState(userData.calGoal);

  const getCal = () => {
    return parseInt(
      (userData.gender === 'männlich'
        ? 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5
        : 10 * userData.weight +
          6.25 * userData.height -
          5 * userData.age -
          161) * userData.activity,
    );
  };

  const storeUserProfile = async profile => {
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
      calGoal: cal,
    });
    navigation.navigate('Home');
  };

  const clearData = async () => {
    AsyncStorage.clear();
    resetUserData();
  };

  const resetUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      setUserData(
        userData != null
          ? JSON.parse(userData)
          : {
              calGoal: 2500,
              age: 25,
              gender: 'männlich',
              height: 180,
              weight: 65,
              activity: 1,
            },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>Kalorienziel: {cal} Kcal</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Alter</Text>
        <TextInput
          style={styles.input}
          placeholder="Alter"
          keyboardType="numeric"
          value={String(userData.age)}
          onChangeText={value => {
            setUserData({
              ...userData,
              age: value,
            })
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Geschlecht</Text>
        <RNPickerSelect
          placeholder={{}}
          style={pickerStyle}
          value={userData.gender}
          onValueChange={value => {
            setUserData({
              ...userData,
              gender: value
            })
          }}
          items={[
            {label: 'Männlich', value: 'männlich'},
            {label: 'Weiblich', value: 'weiblich'},
          ]}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Größe</Text>
        <TextInput
          style={styles.input}
          value={String(userData.height)}
          placeholder="Größe in cm"
          keyboardType="numeric"
          onChangeText={value => {
            setUserData({
              ...userData,
              height: value,
            })
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gewicht</Text>
        <TextInput
          style={styles.input}
          value={String(userData.weight)}
          placeholder="Gewicht in kg"
          keyboardType="numeric"
          onChangeText={value => {
            setUserData({
              ...userData,
              weight: value,
            })
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Aktivität</Text>
        <RNPickerSelect
          placeholder={{}}
          value={userData.activity}
          style={pickerStyle}
          onValueChange={value => {
            setUserData({
              ...userData,
              activity: value
            })
          }}
          items={[
            {label: 'Grundumsatz (BMR)', value: 1},
            {
              label: 'Geringe Aktivität: minimale oder keine Bewegung',
              value: 1.2,
            },
            {
              label: 'Leicht aktiv: 1-3 Mal pro Woche Sport treiben',
              value: 1.375,
            },
            {
              label: 'Mäßig aktiv: 3–5 Mal pro Woche Sport treiben',
              value: 1.55,
            },
            {
              label: 'Sehr aktiv: 6-7 Mal pro Woche Sport treiben',
              value: 1.725,
            },
            {
              label:
                'Besonders aktiv: 6-7 Mal pro Woche sehr anstrengend trainieren',
              value: 1.9,
            },
          ]}
        />
      </View>
      <BasicButton
        style={styles.button}
        title="Kalorienziel festlegen"
        onPress={saveData}
      />
      <BasicButton
        style={styles.button}
        title="Daten löschen"
        onPress={clearData}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#D6E4E5',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'Rajdhani-Bold',
  },
  inputContainer: {
    color: 'black',
    marginBottom: 15,
    backgroundColor: '#EFF5F5',
    padding: 4,
    marginHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Rajdhani-Bold',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    fontSize: 19,
    width: '50%',
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Rajdhani-Bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#262523', // Updated color
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 15,
    fontFamily: 'Rajdhani-Bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputAndroid: {
    fontSize: 18,
  }
});

const pickerStyle = {
	inputIOS: {
		color: 'black',
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
	},
	inputAndroid: {
    backgroundColor: 'white',
		color: 'black',
    width: '80%',
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'Rajdhani-Bold',
    borderColor: 'black',
    paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
	},
	placeholderColor: 'black',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
    borderRadius: 20,
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};
