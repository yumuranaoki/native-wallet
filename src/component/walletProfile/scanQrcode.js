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
    <Text>
      Scan QR code
    </Text>
    <View style={styles.button}>
      <QRCodeScanner
        onRead={() => navigation.navigate('SendEther')}
        topContent={
          <Text>
            Go to wikipedia.org/wiki/QR_code
          </Text>
        }
        bottomContent={
          <TouchableOpacity>
            <Text>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    </View>
  </View>
);

export default ScanQrcode;
