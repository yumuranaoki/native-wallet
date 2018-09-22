import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

class SignIn extends Component {
  componentDidUpdate() {
    if (this.props.isAbleToMoveToSignedInUser) {
      this.props.navigation.navigate('SignedUserNavigator');
    }
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 200,
        marginBottom: 30,
        marginTop: 10,
      },
      multilineTextInput: {
        borderColor: 'black',
        borderWidth: 1,
        width: 200,
        height: 50,
        marginBottom: 30,
        marginTop: 10,
      },
    });

    const {
      accountId,
      password,
      mnemonicWord,
      onChangeAccountIdTextInSignIn,
      onChangePasswordTextInSignIn,
      onChangeMnemonicWordTextInSignIn,
      signIn
    } = this.props;
    
    return (
      <View style={styles.container}>
        <Text>
          SignIn
        </Text>
        <TextInput
          placeholder='アカウントID'
          onChangeText={text => onChangeAccountIdTextInSignIn(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder='パスワード'
          onChangeText={text => onChangePasswordTextInSignIn(text)}
          secureTextEntry={true}
          style={styles.textInput}
        />
        <TextInput
          placeholder='ニーモニックワード'
          onChangeText={text => onChangeMnemonicWordTextInSignIn(text)}
          multiline={true}
          style={styles.multilineTextInput}
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
