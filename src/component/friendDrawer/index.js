import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  topItem: {
    paddingTop: 20,
    height: 70,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7367',
  },
  searchBar: {
    borderColor: 'black',
    borderWidth: 3,
    backgroundColor: '#e0e0e0',
    width: 200,
    height: 30
  },
});

const FreindDrawer = () => (
  <View style={styles.container}>
    <View style={styles.topItem}>
      <TextInput
        style={styles.searchBar}
      />
    </View>
    <ScrollView>
      <Text>
        this is drawer
      </Text>
    </ScrollView>
  </View>
);

export default FreindDrawer;
