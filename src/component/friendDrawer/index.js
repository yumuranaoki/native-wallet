import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  AsyncStorage,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
      followingInLocal,
      unfollowingInLocal,
      onChangeAccountIdText,
      onSubmitAccountId,
    } = this.props;
    const followedsArray = [];
    if (followeds && followeds.followeds_list) {
      followeds.followeds_list.forEach(followed => {
        followedsArray.push(followed);
      });
    }
    if (followingInLocal.length > 0) {
      followingInLocal.forEach(f => {
        followedsArray.push(f);
      });
    }
    const followedsArrayLength = followedsArray.length;
    if (unfollowingInLocal != null) {
      for (let index = 0; index < followedsArrayLength; index++) {
        if (followedsArray[index].id === unfollowingInLocal) {
          followedsArray.splice(index, 1);
          break;
        }
      }
    }
    
    // sort検討

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      },
      topItem: {
        paddingTop: 10,
        height: 70,
        width: 300, 
        alignItems: 'center',
        backgroundColor: '#191970',
        flexDirection: 'row',
      },
      searchBar: {
        backgroundColor: '#e0e0e0',
        width: 300,
        height: 30,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        marginRight: 10,
      },
      searchIcon: {
        padding: 10,
      },
      verge: {
        backgroundColor: '#e0e0e0',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
      },
    });

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topItem}>
          <View
            style={styles.verge}
          >
            <Ionicons
              name='ios-search'
              size={16}
              style={styles.searchIcon}
            />
          </View>
          <TextInput
            style={styles.searchBar}
            value={accountId}
            placeholder='ユーザーIDを入力'
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
      </SafeAreaView>
    );
  }
}

export default FreindDrawer;
