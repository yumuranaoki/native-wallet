import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const Profile = () => (
  <View style={styles.container}>
    <Text>
      this is a profile screen
    </Text>
  </View>
);

export default Profile;
