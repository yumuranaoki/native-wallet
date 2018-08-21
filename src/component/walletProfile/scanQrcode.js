import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const styles = StyleSheet.create({
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

const ScanQrcode = ({ navigation }) => (
  <View style={styles.modalView}>
    <View style={styles.button}>
      <QRCodeScanner
        onRead={e => navigation.navigate('SendEther', {
          address: e.data.slice(9, 51)
        })}
        topContent={
          <Text>
            send by scanning QR code
          </Text>
        }
        bottomContent={
          <TouchableOpacity>
            <Text>send by address</Text>
          </TouchableOpacity>
        }
      />
    </View>
  </View>
);

export default ScanQrcode;
