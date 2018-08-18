import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyButton from '../common/myButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NewUser = ({ navigation }) => (
  <View style={styles.container}>
    <MyButton onPressedFunction={() => navigation.navigate('SignIn')}>
      sign in
    </MyButton>
    <MyButton onPressedFunction={() => navigation.navigate('SignUp')}>
      sign up
    </MyButton>
  </View>
);

export default NewUser;
