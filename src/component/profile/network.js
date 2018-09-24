import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

class Network extends Component {
  static navigationOptions = {
    header: null,
  }

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
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10,
      },
      selectedNetwork: {
        backgroundColor: '#191970',
        height: 50,
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10,
      },
      networkText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#696969',
        marginLeft: 20,
      },
      selectedNetworkText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        marginLeft: 20,
      },
      headerText: {
        marginLeft: 10,
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
          Select Network
        </Text>
        <TouchableWithoutFeedback
          onPress={() => changeNetwork('mainnet', wallet)}
        >
          <View
            style={network === 'mainnet' ? styles.selectedNetwork : styles.network}
          >
            <Text
              style={network === 'mainnet' ? styles.selectedNetworkText : styles.networkText}
            >
              Main Network
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => changeNetwork('ropsten', wallet)}
        >
          <View
            style={network === 'ropsten' ? styles.selectedNetwork : styles.network}
          >
            <Text
              style={network === 'ropsten' ? styles.selectedNetworkText : styles.networkText}
            >
              Ropsten
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => changeNetwork('rinkeby', wallet)}
        >
          <View
            style={network === 'rinkeby' ? styles.selectedNetwork : styles.network}
          >
            <Text
              style={network === 'rinkeby' ? styles.selectedNetworkText : styles.networkText}
            >
              Rinkeby
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => changeNetwork('kovan', wallet)}
        >
          <View
            style={network === 'kovan' ? styles.selectedNetwork : styles.network}
          >
            <Text
              style={network === 'kovan' ? styles.selectedNetworkText : styles.networkText}
            >
              Kovan
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export default Network;
