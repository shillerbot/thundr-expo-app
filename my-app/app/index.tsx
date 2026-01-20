import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = (width - 60) / 4;

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstValue === null) {
      setFirstValue(String(inputValue));
    } else if (operator) {
      const result = calculate(parseFloat(firstValue), inputValue, operator);
      setFirstValue(String(result));
      setDisplayValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string) => {
    switch (op) {
      case '÷': return first / second;
      case '×': return first * second;
      case '−': return first - second;
      case '+': return first + second;
      default: return second;
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
    setFirstValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleEqual = () => {
    const inputValue = parseFloat(displayValue);
    if (operator && firstValue !== null) {
      const result = calculate(parseFloat(firstValue), inputValue, operator);
      setDisplayValue(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForOperand(false);
    }
  };

  const CalcButton = ({ label, onPress, type = 'number', doubleWidth = false }: any) => {
    let bgColor = 'rgba(255, 255, 255, 0.1)';
    let textColor = '#fff';

    if (type === 'operator') {
      bgColor = 'rgba(255, 159, 10, 0.8)';
    } else if (type === 'action') {
      bgColor = 'rgba(165, 165, 165, 0.3)';
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          { width: doubleWidth ? (BUTTON_WIDTH * 2) + 20 : BUTTON_WIDTH },
          { backgroundColor: bgColor }
        ]}
      >
        <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Background shapes to show off the blur */}
      <View style={[styles.bgCircle, { top: -50, left: -50, backgroundColor: '#4A90E2' }]} />
      <View style={[styles.bgCircle, { bottom: 100, right: -50, backgroundColor: '#FF2D55' }]} />

      <BlurView intensity={80} tint="dark" style={styles.calculator}>
        <View style={styles.displayContainer}>
          <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
            {displayValue}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.row}>
            <CalcButton label="AC" onPress={handleClear} type="action" />
            <CalcButton label="+/−" type="action" />
            <CalcButton label="%" type="action" />
            <CalcButton label="÷" onPress={() => handleOperator('÷')} type="operator" />
          </View>

          <View style={styles.row}>
            <CalcButton label="7" onPress={() => handleNumber('7')} />
            <CalcButton label="8" onPress={() => handleNumber('8')} />
            <CalcButton label="9" onPress={() => handleNumber('9')} />
            <CalcButton label="×" onPress={() => handleOperator('×')} type="operator" />
          </View>

          <View style={styles.row}>
            <CalcButton label="4" onPress={() => handleNumber('4')} />
            <CalcButton label="5" onPress={() => handleNumber('5')} />
            <CalcButton label="6" onPress={() => handleNumber('6')} />
            <CalcButton label="−" onPress={() => handleOperator('−')} type="operator" />
          </View>

          <View style={styles.row}>
            <CalcButton label="1" onPress={() => handleNumber('1')} />
            <CalcButton label="2" onPress={() => handleNumber('2')} />
            <CalcButton label="3" onPress={() => handleNumber('3')} />
            <CalcButton label="+" onPress={() => handleOperator('+')} type="operator" />
          </View>

          <View style={styles.row}>
            <CalcButton label="0" onPress={() => handleNumber('0')} doubleWidth />
            <CalcButton label="." onPress={() => handleNumber('.')} />
            <CalcButton label="=" onPress={handleEqual} type="operator" />
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.5,
  },
  calculator: {
    width: '90%',
    padding: 20,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  displayContainer: {
    paddingVertical: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 120,
  },
  display: {
    color: '#fff',
    fontSize: 70,
    fontWeight: '300',
  },
  buttonsContainer: {
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '400',
  },
});
