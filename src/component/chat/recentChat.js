import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
} from 'react-native';
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
      address: this.props.searchedUser.address || '',
    });
    this.props.changeModalState();
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
        justifyContent: 'center',
        alignItems: 'stretch'
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
        borderColor: 'black',
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
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
    });
    
    return (
      <View style={styles.container}>
        <FlatList
          data={recentChatData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recentChatData}
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
          visible={modalVisible}
          transparent={true}
          animationType='slide'
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBackground}>
              <Text>
                {searchedUserWrapper.account_name}
              </Text>
              <TouchableOpacity
                onPress={() => this.changeRelation()}
              >
                <Text>
                  {following ? 'unfollow' : 'follow'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.moveToChat()}
              >
                <Text>
                  chat
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeModalState()}
              >
                <Text>
                  close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default RecentChat;
