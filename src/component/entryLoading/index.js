import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import SInfo from 'react-native-sensitive-info';

class EntryLoading extends Component {
  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    const acessToken = await SInfo.getItem('accessToken', {
      sharedPreferencesName: 'pWalletSharedPreference',
      keychainService: 'pWalletKeyChain',
    });
    
    this.props.navigation.navigate(
      acessToken ? 'WalletProfileConnected' : 'NewUserNavigator'
    );
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
