import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const SignIn = () => (
  <View style={styles.container}>
    <Text>
      SignIn
    </Text>
  </View>
);

export default SignIn;
