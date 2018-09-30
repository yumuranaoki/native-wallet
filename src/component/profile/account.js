import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  SafeAreaView,
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Entypo from 'react-native-vector-icons/Entypo';

class Account extends Component {
  static navigationOptions = {
    header: null,
  }

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
        backgroundColor: 'white',
      },
      headerText: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '600',
      },
      backText: {
        color: 'blue',
        fontSize: 17,
        fontWeight: '300',
      },
      back: {
        marginTop: 10,
        marginLeft: 10,
        height: 40,
      },
      item: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      itemText: {
        fontSize: 18,
        fontWeight: '400',
      }
    });

    return (
      <SafeAreaView
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text
          style={styles.headerText}
        >
          アカウントの設定
        </Text>
        <TouchableOpacity
          onPress={() => this.logout()}
          style={styles.item}
        >
          <Text
            style={styles.itemText}
          >
            log out
          </Text>
          <Entypo
            name={'log-out'}
            size={16}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default Account;
