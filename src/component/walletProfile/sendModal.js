import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { createStackNavigator } from 'react-navigation';
import ScanQrcode from './scanQrcode';
import SendEther from './sendEther';

const styles = StyleSheet.create({
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
  button: {
    width: 120,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#00ff99',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const SendModalStackNavigator = createStackNavigator({
  ScanQrcode,
  SendEther,
});

const SendModal = ({ 
    wallet,
    balance,
    toAddress,
    value,
    isSendModalVisible,
    onSendModalSwipe,
    onChangeToAddress,
    onChangeValue,
    sendEther
  }) => (
    <Modal 
      isVisible={isSendModalVisible}
      onSwipe={() => onSendModalSwipe()}
      swipeDirection="down"
      style={styles.modal}
    >
      <SendModalStackNavigator />
    </Modal>
);

export default SendModal;

