import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';

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
    paddingTop: 20,
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

const SendEther = props => {
  const { navigation } = props;
  const { 
    wallet,
    balance,
    toAddress,
    value,
    onChangeToAddress,
    onChangeValue,
    sendEther
  } = props.screenProps.props;
  const qrcodeAddress = navigation.getParam('address', '');
  const trueToAddress = toAddress || qrcodeAddress;
  return (
    <View style={styles.modalView}>
      <Text style={{ marginTop: 20 }}>here you can input address</Text>
      <TextInput
        style={styles.textInput}
        value={toAddress}
        onChangeText={text => onChangeToAddress(text)}
        defaultValue={qrcodeAddress}      
      />
      <Button
        title='check'
        onPress={() => console.log(trueToAddress)}
      />
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={text => onChangeValue(text)}
      />
      <TouchableOpacity onPress={() => sendEther(wallet, balance, trueToAddress, value)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Send Ether
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SendEther;
