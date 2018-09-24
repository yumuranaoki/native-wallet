import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

class Network extends Component {
  render() {
    const {
      wallet,
      network,
      changeNetwork
    } = this.props;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'stretch',
      },
      network: {
        backgroundColor: 'white'
      },
      selectedNetwrok: {
        backgroundColor: 'blue',
      },
    });

    return (
      <View
        style={styles.container}
      >
        <TouchableWithoutFeedback
          onPress={() => changeNetwork('mainnet', wallet)}
          style={network === 'mainnet' ? styles.selectedNetwork : network}
        >
          <Text>Main Network</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => changeNetwork('ropsten', wallet)}
          style={network === 'ropsten' ? styles.selectedNetwork : network}
        >
          <Text>Ropsten</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => changeNetwork('rinkeby', wallet)}
          style={network === 'rinkeby' ? styles.selectedNetwork : network}
        >
          <Text>Rinkeby</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => changeNetwork('kovan', wallet)}
          style={network === 'kovan' ? styles.selectedNetwork : network}
        >
          <Text>Kovan</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Network;
