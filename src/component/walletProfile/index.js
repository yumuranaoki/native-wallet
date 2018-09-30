import '../../../shim';
import React, { Component } from 'react';
import {
  View, 
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Wallet from '../../util/wallet';
import Header from '../common/header';
import Card from './card';
import SendModal from './sendModal';
import GetModal from './getModal';
import ERC20Card from './erc20Card';

class WalletProfile extends Component {
  static navigationOptions = {
    header: null,
  }

  async componentDidMount() {
    if (this.props.wallet) {
      this.props.getBalance(this.props.wallet);
      console.log(this.props.wallet.address);
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'stretch',
        paddingTop: 30,
      },
      cardConteiner: {
        flexDirection: 'row',
      },
      headerText: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: '600',
      },
    });
    return (
      <SafeAreaView style={styles.container}>
        <Text
          style={styles.headerText}
        >
          Wallet
        </Text>

        <View style={styles.cardConteiner}>
          <Card {...this.props} name='Ether' />
        </View>
         
        <SendModal {...this.props} />
        <GetModal {...this.props} />
      </SafeAreaView>
    );
  }
}

export default WalletProfile;
