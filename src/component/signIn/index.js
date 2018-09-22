import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

class SignIn extends Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
    });

    const {
      accountId,
      password,
      mnemonicWord,
      onChangegAccountIdTextInSignIn,
      onChangegPasswordTextInSignIn,
      onChangegMnemonicWordTextInSignIn,
      signIn
    } = this.props;
    
    return (
      <View style={styles.container}>
        <Text>
          SignIn
        </Text>
        <TextInput
          placeholder='アカウントID'
          onChangeText={text => onChangegAccountIdTextInSignIn(text)}
        />
        <TextInput
          placeholder='パスワード'
          onChangeText={text => onChangegPasswordTextInSignIn(text)}
        />
        <TextInput
          placeholder='ニーモニックワード'
          onChangeText={text => onChangegMnemonicWordTextInSignIn(text)}
        />
        <TouchableOpacity
          onPress={() => signIn(accountId, password, mnemonicWord)}
        >
          <Text>
            Enter
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignIn;
