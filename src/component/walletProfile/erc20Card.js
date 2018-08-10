import React from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
 } from 'react-native';

const ERC20Card = ({
  wallet,
  ERC20Balance,
  name,
  ERC20Address,
  openSendModal,
  openGetModal,
  onChangeERC20Address,
  getERC20Info,
}) => (
  <View style={styles.etherCard}>
    <View style={{ flexDirection: 'column' }}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.flexInput}>
        <TextInput
          style={styles.textInput}
          value={ERC20Address}
          onChangeText={text => onChangeERC20Address(text)}
        />
      </View>
      <View style={styles.flexButton}>
        <TouchableOpacity onPress={() => getERC20Info(wallet, ERC20Address)}>
            <View style={styles.enterButton}>
              <Text style={styles.enterButtonText}>
                Enter
              </Text>
            </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.balance}>
        {ERC20Balance}ETH
      </Text>
      <View style={styles.rowAlign}>
        <TouchableOpacity onPress={() => openSendModal()}>
          <View style={styles.sendButton}>
            <Text style={styles.buttonText}>
              Send
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openGetModal()}>
          <View style={styles.getButton}>
            <Text style={styles.buttonText}>
              Recieve
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  etherCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 3,
    paddingRight: 3,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: screenWidth - 50,
    height: 30,
  },
  flexInput: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flexButton: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 24,
    paddingTop: 5,
    paddingLeft: 5,
  },
  balance: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
    paddingLeft: screenWidth - 100,
  },
  getButton: {
    width: 110,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#ff9966',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  sendButton: {
    width: 110,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#00ff99',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  enterButton: {
    width: 80,
    height: 30,
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  enterButtonText: {
    fontSize: 15,
  }
});

export default ERC20Card;
