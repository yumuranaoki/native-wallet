import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

class EnterPassword extends Component {
  componentDidUpdate() {
    if (this.props.navigationAbility) {
      this.props.navigation.navigate('SignedUserNavigator');
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textInput: {
        width: 200,
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      }
    });

    const {
      password,
      security,
      onChangePasswordText,
      changeSecurity,
      enterPassword,
    } = this.props;

    return (
      <View style={styles.container}>
        <Text>パスワードを入力してください</Text>
        <TextInput
          onChangeText={text => onChangePasswordText(text)}
          secureTextEntry={security}
          style={styles.textInput}
        />
        <TouchableHighlight
          onPress={() => changeSecurity()}
        >
          <Text>パスワードを{security ? '' : '非'}表示</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => enterPassword(password)}
        >
          <Text>Enter</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default EnterPassword;
