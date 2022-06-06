import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';

function Counter(props) {
  const counterPlusPlus = () => {
    props.setCounter(v => v + 1);
  };
  return (
    <>
      <Text>次數: {props.counter}</Text>
      <Button onPress={counterPlusPlus} title="Counter++" />
    </>
  );
}

export default function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // console.log('gogo');
    Alert.alert('counter: ' + counter);
    return () => {
      // console.log('clear');
    };
  }, [counter]);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Counter counter={counter} setCounter={setCounter} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
