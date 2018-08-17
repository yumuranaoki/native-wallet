import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import OAuthManager from 'react-native-oauth';
import { CLIENT_ID, CLIENT_SECRET } from 'react-native-dotenv';

const config = {
  facebook: {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  }
};

const manager = new OAuthManager('pwallet');
manager.configure(config);

const authorize = () => {
  manager.authorize('facebook')
  .then(res => console.log(res))
  .catch(err => console.log(err));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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

const SignUp = () => (
  <View style={styles.container}>
  <View>
    <Text>
      Sign Up
    </Text>
    <TouchableOpacity onPress={() => authorize()}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          sign up with facebook
        </Text>
      </View>
    </TouchableOpacity>
  </View>
  </View>
);

export default SignUp;
