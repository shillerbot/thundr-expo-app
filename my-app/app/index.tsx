import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'react-native';

const { width } = Dimensions.get('window');
const buttonWidth = (width - 60) / 4;

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [isNewValue, setIsNewValue] = useState(false);

  const handleTap = (type: string, value?: string | number) => {
    if (type === 'number') {
      if (display === '0' || isNewValue) {
        setDisplay(String(value));
        setIsNewValue(false);
      } else {
        setDisplay(display + value);
      }
    }

    if (type === 'clear') {
      setDisplay('0');
      setPrevValue(null);
      setOperator(null);
      setIsNewValue(false);
    }

    if (type === 'posneg') {
      setDisplay(String(parseFloat(display) * -1));
    }

    if (type === 'percentage') {
      setDisplay(String(parseFloat(display) * 0.01));
    }

    if (type === 'operator' && value) {
      setOperator(String(value));
      setPrevValue(display);
      setIsNewValue(true);
    }

    if (type === 'equal') {
      const current = parseFloat(display);
      const previous = parseFloat(prevValue || '0');

      if (operator === '+') setDisplay(String(previous + current));
      if (operator === '-') setDisplay(String(previous - current));
      if (operator === '*') setDisplay(String(previous * current));
      if (operator === '/') setDisplay(String(previous / current));

      setOperator(null);
      setPrevValue(null);
      setIsNewValue(true);
    }
  };

  const Button = ({ text, onPress, type }: any) => (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.button, 
        type === 'double' && styles.buttonDouble
      ]}
    >
      <BlurView intensity={25} tint="light" style={StyleSheet.absoluteFill} />
      <Text style={[
        styles.buttonText,
        (type === 'operator' || type === 'action') && styles.buttonTextAction
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' }} 
      style={styles.container}
    >
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <Button text="AC" onPress={() => handleTap('clear')} type="action" />
          <Button text="+/-" onPress={() => handleTap('posneg')} type="action" />
          <Button text="%" onPress={() => handleTap('percentage')} type="action" />
          <Button text="÷" onPress={() => handleTap('operator', '/')} type="operator" />
        </View>
        <View style={styles.row}>
          <Button text="7" onPress={() => handleTap('number', 7)} />
          <Button text="8" onPress={() => handleTap('number', 8)} />
          <Button text="9" onPress={() => handleTap('number', 9)} />
          <Button text="×" onPress={() => handleTap('operator', '*')} type="operator" />
        </View>
        <View style={styles.row}>
          <Button text="4" onPress={() => handleTap('number', 4)} />
          <Button text="5" onPress={() => handleTap('number', 5)} />
          <Button text="6" onPress={() => handleTap('number', 6)} />
          <Button text="-" onPress={() => handleTap('operator', '-')} type="operator" />
        </View>
        <View style={styles.row}>
          <Button text="1" onPress={() => handleTap('number', 1)} />
          <Button text="2" onPress={() => handleTap('number', 2)} />
          <Button text="3" onPress={() => handleTap('number', 3)} />
          <Button text="+" onPress={() => handleTap('operator', '+')} type="operator" />
        </View>
        <View style={styles.row}>
          <Button text="0" onPress={() => handleTap('number', 0)} type="double" />
          <Button text="." onPress={() => handleTap('number', '.')} />
          <Button text="=" onPress={() => handleTap('equal')} type="operator" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  displayText: {
    color: '#fff',
    fontSize: 80,
    fontWeight: '300',
  },
  buttonsContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: buttonWidth,
    height: buttonWidth,
    borderRadius: buttonWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  buttonDouble: {
    width: buttonWidth * 2 + 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '400',
  },
  buttonTextAction: {
    color: '#00D2FF',
    fontWeight: '600',
  },
});
