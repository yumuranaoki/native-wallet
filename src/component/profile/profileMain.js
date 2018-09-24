import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class ProfileMain extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          this is a profile screen
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('MnemonicWord')}
        >
          <Text>check mnemonic word</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Network')}
        >
          <Text>select ethereum network</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Account')}
        >
          <Text>manage account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ProfileMain;
