import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

class FriendCard extends Component {
  state = {
    following: this.props.following,
    followButtonDisabled: false,
  };

  moveToChat = () => {
    this.props.navigation.navigate('Chat', {
      id: this.props.id,
      accountId: this.props.accountId,
      accountName: this.props.accountName,
      address: this.props.address,
    });
  }

  changeRelation = async () => {
    this.setState({ followButtonDisabled: true });
    const followerId = await AsyncStorage.getItem('userId');
    const followedId = this.props.id;
    const data = {
      followerId,
      followedId,
    };
    let jsonResult;
    if (this.state.following) {
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
      this.setState({ following: !this.state.following });
    }
    this.setState({ followButtonDisabled: false });
  }

  render() {
    const {
      accountName,
    } = this.props;
    const {
      following
    } = this.state;
    const styles = StyleSheet.create({
      card: {
        width: 300,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: 'gray',
      },
      accountNameView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
      },
      accountName: {
        fontSize: 16,
      },
      item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      talkButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#191970',
        borderWidth: 1,
        borderRadius: 10,
        width: 60,
        height: 30,
      },
      followButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#191970',
        borderWidth: 1,
        borderRadius: 10,
        width: 60,
        height: 30,
      }
    });

  return (
    <View
      style={styles.card}
    >
      <View
        style={styles.accountNameView}
      >
        <Text
        style={styles.accountName}
        >
          {accountName}
        </Text>
      </View>
      <View
        style={styles.item}
      >
        <TouchableOpacity
          style={styles.talkButton}
          onPress={() => this.moveToChat()}
        >
          <Text>トーク</Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.item}
      >
        <TouchableOpacity
          style={styles.followButton}
          onPress={() => this.changeRelation()}
          disabled={this.state.followButtonDisabled}
        >
          <Text>{following ? '削除' : '追加'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  }
}

export default FriendCard;
