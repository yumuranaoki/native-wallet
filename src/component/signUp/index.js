import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  AsyncStorage,
} from 'react-native';
import Modal from 'react-native-modal';

class SignUp extends Component {
  async componentDidUpdate() {
    if (this.props.isAbleToMoveToSignedInUserScreen) {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        this.props.navigation.navigate('SignedUserNavigator');
      }      
    }
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        width: 120,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#305097',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      textInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 200,
        marginBottom: 30,
        marginTop: 10,
      },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
      },
    });

    const {
      accountName,
      accountId,
      password,
      passwordConfirmation,
      passwordHidden,
      isMnemonicWordModalVisible,
      wallet,
      onChangeAccountNameTextInSignUp,
      onChangeAccountIdTextInSignUp,
      onChangePasswordTextInSignUp,
      onChangePasswordConfirmationTextInSignUp,
      setUpAccount,
      onMnemonicWordModalSwipe,
      onPressConfirmButton
    } = this.props;

    return (
      <View style={styles.container}>
        <Text>
          please set up your account name and accout id
        </Text>
        <TextInput
          style={styles.textInput}
          value={accountName}
          onChangeText={text => onChangeAccountNameTextInSignUp(text)}
          placeholder='アカウント名'
        />
        <TextInput
          style={styles.textInput}
          value={accountId}
          onChangeText={text => onChangeAccountIdTextInSignUp(text)}
          placeholder='アカウントのID'
        />
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={text => onChangePasswordTextInSignUp(text)}
          secureTextEntry={passwordHidden}
          placeholder='パスワード'
        />
        <TextInput
          style={styles.textInput}
          value={passwordConfirmation}
          onChangeText={text => onChangePasswordConfirmationTextInSignUp(text)}
          secureTextEntry={passwordHidden}
          placeholder='パスワードの確認'
        />
        <TouchableOpacity
          onPress={() => setUpAccount(accountName, accountId, password, passwordConfirmation)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              enter
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
          isVisible={isMnemonicWordModalVisible}
          onSwipe={() => onMnemonicWordModalSwipe()}
          swipeDirection="down"
        >
          <View
            style={styles.modalView}
          >
            <Text>
              {wallet ? wallet.mnemonicWord : ''}
            </Text>
            <TouchableOpacity
              onPress={() => onPressConfirmButton()}
            >
              <Text>
                ニーモニックワードを確認しました
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default SignUp;
