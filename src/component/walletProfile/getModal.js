import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode';

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
});

const GetModal = ({
    wallet,
    isGetModalVisible,
    onGetModalSwipe, 
  }) => (
    <Modal 
      isVisible={isGetModalVisible}
      onSwipe={() => onGetModalSwipe()}
      swipeDirection="down"
    >
      <View style={styles.modalView}>
        <Text
          style={{ 
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          here you can get ether
        </Text>
        <QRCode
          value={wallet == null ? '' : `ethereum:${wallet.address}`}
          size={200}
          bgColor='#ff9966'
          fgColor='white'
        />
      </View>
    </Modal>
);

export default GetModal;

