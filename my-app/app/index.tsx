import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import { CalculatorButton } from '../components/CalculatorButton';
import { useCalculator } from '../hooks/useCalculator';

export default function CalculatorScreen() {
  const {
    displayValue,
    clearAll,
    inputDigit,
    inputDot,
    toggleSign,
    inputPercent,
    performOperation,
  } = useCalculator();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </View>

      <View style={styles.row}>
        <CalculatorButton text="AC" type="action" onPress={clearAll} />
        <CalculatorButton text="+/-" type="action" onPress={toggleSign} />
        <CalculatorButton text="%" type="action" onPress={inputPercent} />
        <CalculatorButton text="÷" type="operator" onPress={() => performOperation('/')} />
      </View>

      <View style={styles.row}>
        <CalculatorButton text="7" onPress={() => inputDigit('7')} />
        <CalculatorButton text="8" onPress={() => inputDigit('8')} />
        <CalculatorButton text="9" onPress={() => inputDigit('9')} />
        <CalculatorButton text="×" type="operator" onPress={() => performOperation('*')} />
      </View>

      <View style={styles.row}>
        <CalculatorButton text="4" onPress={() => inputDigit('4')} />
        <CalculatorButton text="5" onPress={() => inputDigit('5')} />
        <CalculatorButton text="6" onPress={() => inputDigit('6')} />
        <CalculatorButton text="-" type="operator" onPress={() => performOperation('-')} />
      </View>

      <View style={styles.row}>
        <CalculatorButton text="1" onPress={() => inputDigit('1')} />
        <CalculatorButton text="2" onPress={() => inputDigit('2')} />
        <CalculatorButton text="3" onPress={() => inputDigit('3')} />
        <CalculatorButton text="+" type="operator" onPress={() => performOperation('+')} />
      </View>

      <View style={styles.row}>
        <CalculatorButton text="0" doubleWidth onPress={() => inputDigit('0')} />
        <CalculatorButton text="." onPress={inputDot} />
        <CalculatorButton text="=" type="operator" onPress={() => performOperation('=')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  displayContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  displayText: {
    color: 'white',
    fontSize: 80,
    textAlign: 'right',
    fontWeight: '300',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});