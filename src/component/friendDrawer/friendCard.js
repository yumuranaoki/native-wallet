import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class FriendCard extends Component {
  state = {
    following: this.props.following,
  };

  moveToChat = () => {
    this.props.navigation.navigate('Chat', {
      id: this.props.id,
      accountId: this.props.accountId,
      accountName: this.props.accountName,
    });
  }

  changeRelation = () => {
    this.setState({ following: !this.state.following });
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
        borderBottomWidth: 1.5,
        borderBottomColor: 'black',
        justifyContent: 'center',
      },
      accountNameView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1.5,
      },
      accountName: {
        fontSize: 16,
      },
      button: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.moveToChat()}
      >
        <Text>chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.changeRelation()}
      >
        <Text>{following ? 'unfollow' : 'follow'}</Text>
      </TouchableOpacity>
    </View>
  );
  }
}

export default FriendCard;
