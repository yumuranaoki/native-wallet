import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const MyButton = ({ onPressedFunction, children }) => {
  const styles = StyleSheet.create({
    button: {
      width: 120,
      height: 50,
      borderRadius: 12,
      backgroundColor: '#305097',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  return (
    <TouchableOpacity onPress={() => onPressedFunction()}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyButton;
  
