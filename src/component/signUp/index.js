import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

class SignUp extends Component {
  state = {
    accountName: '',
    accountId: '',
    password: '',
    passwordHidden: true,
  };

  setUpProfile = async () => {
    const accessToken = this.props.navigation.getParam('accessToken');
    const data = {
      accessToken,
      accountName: this.state.accountName,
      accountId: this.state.accountId,
      password: this.state.password,
    };
    const result = await fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });
    const jsonResult = await result.json();
    if (jsonResult.message) {
      // alertでerrorを表示
      console.log(jsonResult.message);
    } else {
      // async storageでaccountIdとaccountNameをstore
      this.navigation.navigate('EntryLoading');
    }
    console.log(result);
  };

  render() {
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
      textInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 200,
        marginBottom: 30,
        marginTop: 10,
      },
    });

    return (
      <View style={styles.container}>
        <Text>
          please set up your account name and accout id
        </Text>
        <TextInput
          style={styles.textInput}
          value={this.state.accountName}
          onChangeText={text => this.setState({ accountName: text })}
          placeholder='account name'
        />
        <TextInput
          style={styles.textInput}
          value={this.state.accountId}
          onChangeText={text => this.setState({ accountId: text })}
          placeholder='account id'
        />
        <TextInput
          style={styles.textInput}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry={this.state.passwordHidden}
          placeholder='password'
        />
        <TouchableOpacity onPress={() => this.setUpProfile()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              enter
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignUp;
