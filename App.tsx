import React, { useState, useEffect } from 'react';
import randomColor from 'randomcolor';
import { Accelerometer } from 'expo-sensors';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<any>(null);
  const [color, setColor] = useState(randomColor());

  const _susbcribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData: any) => {
        setData(accelerometerData);
      })
    );
  }

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  }

  useEffect(() => {
    _susbcribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;
  useEffect(() => {
    z > 1.1 ? setColor(randomColor()): setColor(color);
    return () => setColor("#fff");
  }, [z]);

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text style={[styles.text, styles.title]}>El color cambiará si se supera 1.1 en el valor z</Text>
      <Text style={styles.text}> x: { x } </Text>
      <Text style={styles.text}> y: { y } </Text>
      <Text style={styles.text}> z: { z } </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
  	marginBottom: 12
  },
  text: {
  	color: "#fff",
  	fontSize: 20,
  	textAlign: "center"
  }
});
