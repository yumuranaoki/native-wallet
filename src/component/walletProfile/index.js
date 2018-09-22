import '../../../shim';
import React, { Component } from 'react';
import {
  View, 
  StyleSheet,
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import Wallet from '../../util/wallet';
import Header from '../common/header';
import Card from './card';
import SendModal from './sendModal';
import GetModal from './getModal';
import ERC20Card from './erc20Card';

class WalletProfile extends Component {
  async componentDidMount() {
    if (this.props.wallet) {
      this.props.getBalance(this.props.wallet);
      console.log(this.props.wallet.address);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        
        <View style={styles.cardConteiner}>
          <Card {...this.props} name='Ether' />
        </View>
        <View style={styles.cardConteiner}>
          <ERC20Card {...this.props} name='Other ERC20' />
        </View>        
         
        <SendModal {...this.props} />
        <GetModal {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  cardConteiner: {
    flexDirection: 'row',
  },
});

export default WalletProfile;
