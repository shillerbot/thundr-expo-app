import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const buttonWidth = width / 4 - 20;

interface Props {
  text: string;
  onPress: () => void;
  type?: 'number' | 'operator' | 'action';
  doubleWidth?: boolean;
}

export const CalculatorButton = ({ text, onPress, type = 'number', doubleWidth = false }: Props) => {
  const isOperator = type === 'operator';
  const isAction = type === 'action';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        isOperator && styles.buttonOperator,
        isAction && styles.buttonAction,
        doubleWidth && styles.buttonDouble,
      ]}
    >
      <Text
        style={[
          styles.text,
          isAction && styles.textAction,
          doubleWidth && { textAlign: 'left', paddingLeft: 30 }
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333333',
    flex: 1,
    height: buttonWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: buttonWidth / 2,
    margin: 5,
  },
  buttonDouble: {
    flex: 2.1,
    alignItems: 'flex-start',
  },
  buttonOperator: {
    backgroundColor: '#f09a36',
  },
  buttonAction: {
    backgroundColor: '#a5a5a5',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
  },
  textAction: {
    color: 'black',
  },
});