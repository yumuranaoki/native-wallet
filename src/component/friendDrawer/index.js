import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';

class FreindDrawer extends Component {
  async componentDidMount() {
    // async storageからuserIdを取得
    // ということはsignup時にuserIdをasync storageに保存
    const userId = 1;
    this.props.getFolloweds(userId);
  }

  render() {
    const {
      accountId, searchedUser, followeds, onChangeAccountIdText, onSubmitAccountId
    } = this.props;
    const searchedUserWrapper = searchedUser ? searchedUser.account_name : '';
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
        <Text>
          {searchedUserWrapper}
        </Text>
        <FlatList
          data={followedsArray}
          renderItem={({ item }) => <Text key>{item.account_name}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default FreindDrawer;
