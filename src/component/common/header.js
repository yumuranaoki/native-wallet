import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Header = () => (
  <View style={styles.rowAlign}>
    <View style={styles.header}>
      <Text style={styles.text}>
        P Wallet
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    alignItems: 'center',
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  }
});

export default Header;
