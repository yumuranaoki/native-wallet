import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import OAuthManager from 'react-native-oauth';
import SInfo from 'react-native-sensitive-info';
import { CLIENT_ID, CLIENT_SECRET } from 'react-native-dotenv';

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

const SignUp = ({ navigation }) => {
  const config = {
    facebook: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }
  };
  const manager = new OAuthManager('pwallet');
  manager.configure(config);

  // navigation.navigateはserverへのpostが成功したら
  // oauthでaccountNameとemailも取りたい
  const authorize = async () => {
    try {
      const result = await manager.authorize('facebook');
      console.log(result);
      if (result.status === 'ok') {
        const accessToken = result.response.credentials.accessToken;
        await SInfo.setItem('facebookAccessToken', accessToken, {});
        try {
          const data = {
            accessToken,
            accountName: 'naoki',
            email: 'naoki@example.com'
          }; 
          const fetchResult = await fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          });
          const jsonResult = await fetchResult.json();
          console.log(jsonResult);
          if (jsonResult.message) {
            // error messageをalertかなにかで表示
            console.log(jsonResult.message);
          } else {
            navigation.navigate('NewUser');
          }
        } catch (err) {
          // error messageをalertかなにかで表示
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
};

export default SignUp;
