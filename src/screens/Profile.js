import { useState, useEffect } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Profile = ({ navigation }) => {
  const [cal, setCal] = useState();
  const [userData, setUserData] = useState({
    age: 25,
    gender: 'male',
    height: 180,
    weight: 65,
    activity: 1
  });

  const getCal = () => {
    return parseInt((userData.gender === 'male' ? 10*userData.weight + 6.25*userData.height - 5*userData.age + 5 : 10*userData.weight + 6.25*userData.height - 5*userData.age - 161) * userData.activity);
  }

  useEffect(() => {
    console.log(userData);
    setCal(getCal());
  }, [userData]);

  return (
    <View style={styles.container} >
      <Text style={styles.description}>Calories: {cal} kCal</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
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
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' }
          ]}
      />
      <TextInput
        style={styles.input}
        value={String(userData.height)}
        placeholder="Height in cm"
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
        placeholder="Weight in kg"
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
              { label: 'Basal Metabolic Rate (BMR)', value: 1 },
              { label: 'Sedentary: minimal or no exercise', value: 1.2 },
              { label: 'Lightly active: exercise 1-3 times/week', value: 1.375 },
              { label: 'Moderately active: exercise 3-5 times/week', value: 1.55 },
              { label: 'Very active: exercise 6-7 times/week', value: 1.725 },
              { label: 'Extra active: very hard exercise 6-7 times/week', value: 1.9 }
          ]}
      />
      <Button title="Set Calorie Goal" onPress={() => navigation.navigate('Home')} />
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
