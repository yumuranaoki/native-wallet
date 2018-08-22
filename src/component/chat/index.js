import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const Chat = () => (
  <View style={styles.container}>
    <Text>
      this is a chat screen
    </Text>
  </View>
);

export default Chat;
