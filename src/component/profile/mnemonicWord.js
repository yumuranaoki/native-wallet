import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

class MnemonicWord extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const {
      wallet
    } = this.props;
    const regex = /\s+/;
    const mnemonicWordArray = wallet.mnemonicWord.split(regex);
    const width = Dimensions.get('window').width;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
      },
      mnemonicWord: {
        margin: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
      },
      eachWord: {
        width: (width / 2) - 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },
      eachWordText: {
        fontSize: 17,
        fontWeight: '500',
      },
      headerText: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: '600',
      },
      backText: {
        color: 'blue',
        fontSize: 17,
        fontWeight: '300',
      },
      back: {
        marginTop: 10,
        marginLeft: 10,
        height: 40,
      }
    });
    
    return (
      <SafeAreaView
        style={styles.container} 
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text
          style={styles.headerText}
        >
          MnemonicWord
        </Text>
        <FlatList
          data={mnemonicWordArray}
          renderItem={({ item, index }) => (
            <View
              style={styles.eachWord}
            >
              <Text style={styles.eachWordText}>{`${index + 1}: ${item}`}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          style={styles.mnemonicWord}
          numColumns={2}
        />
      </SafeAreaView>
    );
  }
}

export default MnemonicWord;
