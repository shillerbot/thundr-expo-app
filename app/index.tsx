import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = (width - 60) / 4;

const CalculatorScreen = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [waitingForNextValue, setWaitingForNextValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNextValue) {
      setDisplayValue(num);
      setWaitingForNextValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstValue === null) {
      setFirstValue(displayValue);
    } else if (operator) {
      const currentValue = parseFloat(firstValue);
      const newValue = calculate(currentValue, inputValue, operator);
      setFirstValue(String(newValue));
      setDisplayValue(String(newValue));
    }

    setWaitingForNextValue(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string) => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '×': return first * second;
      case '÷': return first / second;
      default: return second;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(displayValue);

    if (operator && firstValue !== null) {
      const result = calculate(parseFloat(firstValue), inputValue, operator);
      setDisplayValue(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForNextValue(false);
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue(null);
    setWaitingForNextValue(false);
  };

  const handlePercent = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value / 100));
  };

  const handleToggleSign = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value * -1));
  };

  const renderButton = (text: string, onPress: () => void, color: 'gray' | 'orange' | 'dark' = 'dark', isDouble = false) => {
    const buttonStyles = [styles.button];
    const textStyles = [styles.buttonText];

    if (color === 'gray') (buttonStyles as any).push(styles.buttonGray);
    if (color === 'orange') (buttonStyles as any).push(styles.buttonOrange);
    if (isDouble) (buttonStyles as any).push(styles.buttonDouble);
    
    if (color === 'gray') (textStyles as any).push(styles.textDark);

    return (
      <TouchableOpacity style={buttonStyles as any} onPress={onPress}>
        <Text style={textStyles as any}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </View>

      <View style={styles.buttonGrid}>
        <View style={styles.row}>
          {renderButton('AC', handleClear, 'gray')}
          {renderButton('+/-', handleToggleSign, 'gray')}
          {renderButton('%', handlePercent, 'gray')}
          {renderButton('÷', () => handleOperator('÷'), 'orange')}
        </View>

        <View style={styles.row}>
          {renderButton('7', () => handleNumber('7'))}
          {renderButton('8', () => handleNumber('8'))}
          {renderButton('9', () => handleNumber('9'))}
          {renderButton('×', () => handleOperator('×'), 'orange')}
        </View>

        <View style={styles.row}>
          {renderButton('4', () => handleNumber('4'))}
          {renderButton('5', () => handleNumber('5'))}
          {renderButton('6', () => handleNumber('6'))}
          {renderButton('-', () => handleOperator('-'), 'orange')}
        </View>

        <View style={styles.row}>
          {renderButton('1', () => handleNumber('1'))}
          {renderButton('2', () => handleNumber('2'))}
          {renderButton('3', () => handleNumber('3'))}
          {renderButton('+', () => handleOperator('+'), 'orange')}
        </View>

        <View style={styles.row}>
          {renderButton('0', () => handleNumber('0'), 'dark', true)}
          {renderButton('.', () => handleNumber('.'))}
          {renderButton('=', handleEqual, 'orange')}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    padding: 20,
    alignItems: 'flex-end',
  },
  displayText: {
    color: '#fff',
    fontSize: 80,
    fontWeight: '300',
  },
  buttonGrid: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonDouble: {
    width: BUTTON_WIDTH * 2 + 15,
    alignItems: 'flex-start',
    paddingLeft: 35,
  },
  buttonGray: {
    backgroundColor: '#A5A5A5',
  },
  buttonOrange: {
    backgroundColor: '#FF9F0A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'center',
  },
  textDark: {
    color: '#000',
  },
});

export default CalculatorScreen;
