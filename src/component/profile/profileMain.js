import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

class ProfileMain extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
      },
      viewContainer: {
        flex: 1,
      },
      headerText: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '600',
      },
      item: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      itemText: {
        fontSize: 18,
        fontWeight: '400',
      }
    });

    return (
      <SafeAreaView style={styles.container}>
        <Text
          style={styles.headerText}
        >
          Profile
        </Text>
        <View
          style={styles.viewContainer}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MnemonicWord')}
            style={styles.item}
          >
            <Text
              style={styles.itemText}
            >
              ニーモニックワードの確認
            </Text>
            <Entypo
              name={'chevron-small-right'}
              size={16}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Network')}
            style={styles.item}
          >
            <Text
              style={styles.itemText}
            >
              イーサリアムのネットワークを選択
            </Text>
            <Entypo
              name={'chevron-small-right'}
              size={16}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Account')}
            style={styles.item}
          >
            <Text
              style={styles.itemText}
            >
              アカウントの設定
            </Text>
            <Entypo
              name={'chevron-small-right'}
              size={16}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default ProfileMain;
