import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
} from 'react-native';
import {
  SafeAreaView
} from 'react-navigation';
import Modal from 'react-native-modal';
import 'core-js/es6/map';
import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import 'babel-polyfill';

const { height, width } = Dimensions.get('window');

class RecentChat extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  changeRelation = async () => {
    this.props.changeFollowButtonAbility();
    const followerId = await AsyncStorage.getItem('userId');
    const followedId = this.props.searchedUser.id;
    const data = {
      followerId,
      followedId,
    };
    let jsonResult;
    if (this.props.following) {
      try {
        const result = await fetch('http://localhost:3000/relationships', {
          mode: 'cors',
          method: 'DELETE',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
        });
        jsonResult = await result.json();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const result = await fetch('http://localhost:3000/relationships', {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
        });
        jsonResult = await result.json();
      } catch (err) {
        console.log(err);
      }
    }
    if (jsonResult.result === 'success') {
      this.props.changeRelation();
    }
    this.props.changeFollowButtonAbility();
  }

  moveToChat = () => {
    this.props.navigation.navigate('Chat', {
      id: this.props.searchedUser.id || '',
      accountId: this.props.searchedUser.account_id || '',
      accountName: this.props.searchedUser.account_name,
      address: this.props.searchedUser.address || '',
    });
    this.props.changeModalState();
   console.log(this.props.searchedUser);
  }

  moveToChatFromRecentData = (id, address, partner) => {
    this.props.navigation.navigate('Chat', {
      id,
      address,
      accountName: partner,      
    });
  }

  render() {
    const {
      modalVisible,
      following,
      searchedUser,
      changeModalState,
      recentChatData,
    } = this.props;
    const searchedUserWrapper = searchedUser || { id: '', account_id: '', account_name: '' };
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
      },
      modalBackground: {
        backgroundColor: 'white',
        height: height - 320,
        width: width - 100,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'stretch',
      },
      recentChatData: {
        borderColor: '#ccc',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
      },
      accountName: {
        flex: 1,
        alignItems: 'center'
      },
      lastMessage: {
        flex: 2,
        alignItems: 'center'
      },
      headerText: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '600',
      },
      closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 30,
        borderColor: '#800000',
        borderWidth: 1,
        borderRadius: 10,
      },
      searchedUserName: {
        fontSize: 20,
        fontWeight: '600',
      },
      buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#191970',
        borderWidth: 1,
        borderRadius: 10,
        width: 100,
        height: 40,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: '500',
      },
      closeButtonWrapper: {
        alignItems: 'center',
      }
    });
    
    return (
      <SafeAreaView
        style={styles.container}
      >
        <Text
          style={styles.headerText}
        >
          トーク一覧
        </Text>
        <FlatList
          data={recentChatData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recentChatData}
              onPress={() => this.moveToChatFromRecentData(item.id, item.address, item.partner)}
            >
              <View
                style={styles.accountName}
              >
                <Text>{item.partner}</Text>
              </View>
              <View
                style={styles.lastMessage}
              >
                <Text>{item.lastMessage}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <Modal
          isVisible={modalVisible}
          transparent={true}
          onBackdropPress={() => changeModalState()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBackground}>
              <Text
                style={styles.searchedUserName}
              >
                {searchedUserWrapper.account_name}
              </Text>
              <View
                style={styles.buttons}
              >
                <TouchableOpacity
                  onPress={() => this.changeRelation()}
                  style={styles.button}
                >
                  <Text
                    style={styles.buttonText}
                  >
                    {following ? 'unfollow' : 'follow'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.moveToChat()}
                  style={styles.button}
                >
                  <Text
                    style={styles.buttonText}
                  >
                    chat
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={styles.closeButtonWrapper}
              >
                <TouchableOpacity
                  onPress={() => changeModalState()}
                  style={styles.closeButton}
                >
                  <Text>
                    閉じる
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

export default RecentChat;
