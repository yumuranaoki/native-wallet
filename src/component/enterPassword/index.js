import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity, 
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

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
        flex: 1,
        height: 50,
        backgroundColor: '#e0e0e0',        
      },
      passwordText: {
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 40,
      },
      passwordInputInline: {
        flexDirection: 'row',
      },
      leftVerge: {
        backgroundColor: '#e0e0e0',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginLeft: 30,
        height: 50,
        width: 10,
      },
      rightVerge: {
        backgroundColor: '#e0e0e0',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        paddingRight: 10,
      },
      image: {
        marginBottom: 50,
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
        <Image
          source={require('../../../assets/image/pwallet-logo.png')}
          style={styles.image}
        />
        <View
          style={styles.passwordInputInline}
        >
          <View
            style={styles.leftVerge}
          />
          <TextInput
            onChangeText={text => onChangePasswordText(text)}
            secureTextEntry={security}
            style={styles.textInput}
            onSubmitEditing={() => enterPassword(password)}
            placeholder='パスワードを入力'
          />
          <View
            style={styles.rightVerge}
          >
            <TouchableOpacity
              onPress={() => changeSecurity()}
            >
              {security ? <Entypo name='eye-with-line' size={16} /> : <Entypo name='eye' size={16} />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default EnterPassword;
