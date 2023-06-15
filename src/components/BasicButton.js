// source: https://docs.expo.dev/tutorial/create-a-modal/
import { View, StyleSheet, Button } from 'react-native';

export default function BasicButton({ style, title, onPress }) {
  return (
    <View style={[style, { margin: 5 }]}>
      <Button title={title} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({

  });