import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  Button,
  AsyncStorage,
} from 'react-native';
import FriendCard from './friendCard';

class FreindDrawer extends Component {
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    this.props.getFolloweds(userId);
  }

  render() {
    const {
      navigation,
      accountId,
      followeds,
      onChangeAccountIdText,
      onSubmitAccountId,
    } = this.props;
    const followedsArray = [];
    if (followeds && followeds.followeds_list) {
      followeds.followeds_list.forEach(followed => {
        followedsArray.push(followed);
      });
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
      },
      topItem: {
        paddingTop: 20,
        height: 70,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF7367',
      },
      searchBar: {
        borderColor: 'black',
        borderWidth: 3,
        backgroundColor: '#e0e0e0',
        width: 200,
        height: 30
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.topItem}>
          <TextInput
            style={styles.searchBar}
            value={accountId}
            onChangeText={text => onChangeAccountIdText(text)}
            returnKeyType='search'
            onSubmitEditing={() => onSubmitAccountId(accountId)}
          />
        </View>
        <FlatList
          data={followedsArray}
          renderItem={({ item }) => 
            <FriendCard
              id={item.id}
              accountId={item.account_id}
              accountName={item.account_name}
              address={item.address}
              navigation={navigation}
              following={true}
            />
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default FreindDrawer;
