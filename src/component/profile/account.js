import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from 'react-native';
import SInfo from 'react-native-sensitive-info';

class Account extends Component {
  state = {
    accountName: ''
  };

  changeProfile = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const accountName = this.state.accountName;
    const data = {
      userId,
      accountName,
    };
    try {
      const result = await fetch('http://localhost:3000/users', {
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      const jsonResult = await result.json();
      if (jsonResult.result === 'success') {
        // modal的な
      }
    } catch (err) {
      console.log(err);
    }
  }

  logout = async () => {
    // local storageを全削除
    await AsyncStorage.removeItem('userId');
    SInfo.deleteItem('accessToken', {
      sharedPreferencesName: 'pWalletSharedPreference',
      keychainService: 'pWalletKeyChain',
    });
    SInfo.deleteItem('mnemonicWord', {
      sharedPreferencesName: 'pWalletSharedPreference',
      keychainService: 'pWalletKeyChain',
    });
    // entryLoadingへ
    this.props.navigation.navigate('NewUserNavigator');
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
    });

    return (
      <View
        style={styles.container}
      >
        <TextInput
          onChangeText={text => this.setState({ accountName: text })}
        />
        <TouchableOpacity
          onPress={() => this.changeProfile()}
        >
          <Text>change profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.logout()}
        >
          <Text>log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Account;
