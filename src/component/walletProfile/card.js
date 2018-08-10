import React from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
 } from 'react-native';

const Card = ({ balance, openSendModal, openGetModal, name }) => (
  <View style={styles.etherCard}>
    <View style={{ flexDirection: 'column' }}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.balance}>
        {balance}ETH
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
    justifyContent: 'center',
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
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Card;
