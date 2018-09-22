import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import SInfo from 'react-native-sensitive-info';

class EntryLoading extends Component {
  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const acessToken = await SInfo.getItem('accessToken', {
      sharedPreferencesName: 'pWalletSharedPreference',
      keychainService: 'pWalletKeyChain',
    });
    const mnemonicWord = SInfo.getItem('mnemonicWord', {
      sharedPreferencesName: 'pWalletSharedPreference',
      keychainService: 'pWalletKeyChain',
    });
    
    this.props.navigation.navigate(
      userId && acessToken && mnemonicWord ? 'EnterPasswordConnected' : 'NewUserNavigator'
    );
    
   // this.props.navigation.navigate('NewUserNavigator');
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      }
    });
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          P wallet
        </Text>
      </View>
    );
  }
}

export default EntryLoading;
