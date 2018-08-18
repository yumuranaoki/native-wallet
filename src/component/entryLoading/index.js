import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import SInfo from 'react-native-sensitive-info';

class Entry extends Component {
  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    const facebookAcessToken = await SInfo.getItem('facebookAccessToken', {});
    this.props.navigation.navigate(
      facebookAcessToken ? 'WalletProfileConnected' : 'NewUserNavigator'
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

export default Entry;
