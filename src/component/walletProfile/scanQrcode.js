import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
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
          address: e.data
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

/*
const TestScanQrcode = ({ balance }) => 
  (
  <View>
    <Button
      title='balance'
      onPress={() => console.log(balance)}
    />
  </View>
);
*/

class TestScanQrcode extends React.Component {
  render() {
    return (
      <View>
    <Button
      title='balance'
      onPress={() => console.log(this.props)}
    />
  </View>
    );
  }
}

export default TestScanQrcode;
