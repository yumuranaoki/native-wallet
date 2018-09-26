import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Button,
} from 'react-native';
import firebase from '../../util/firebase';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    borderColor: 'black',
    borderWidth: 3,
    backgroundColor: '#e0e0e0',
    width: 250,
    height: 30
  },
  bottomItem: {
    height: 40,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7367',
    flexDirection: 'row',
  },
  sendButton: {
    height: 30,
    borderColor: 'black',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#e0e0e0'
  },
  myContent: {
    alignItems: 'flex-end',
    width,
  },
  othersContent: {
    alignItems: 'flex-start',
    width,
  },
  content: {
    width: 180,
    borderColor: 'black',
    borderWidth: 3,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
  },
});

class Chat extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      partnerId: this.props.navigation.getParam('id'),
      partnerAccountName: this.props.navigation.getParam('accountName'),
      address: this.props.navigation.getParam('address'),
      content: '', // TextInputの値
      contents: null
    };

  }

  async componentDidMount() {
    this.firebaseDatabase = firebase.database();
    // userIdを取得
    try {
      const userId = await AsyncStorage.getItem('userId');
      this.setState({ userId: Number(userId) });
    } catch (error) {
      console.log(error);
    }
    this.getChatConent();
  }

  getChatConent = () => {
    this.firebaseDatabase
    .ref(`${this.state.userId}/${this.state.partnerId}`)
    .on('value', snapshot => {
      const contents = snapshot.val();
      if (contents == null) {
        this.registerRoom();
      }
      // async awaitでrewrite
      this.setState({ contents });
    });
  }

  registerRoom = () => {
    this.firebaseDatabase
    .ref(`room${this.state.userId}/${this.state.partnerId}`)
    .set({
      partner: this.state.partnerAccountName,
      lastMessage: '',
      address: this.state.address,
    });
  }

  submitContent = content => {
    this.firebaseDatabase
    .ref(`${this.state.userId}/${this.state.partnerId}`)
    .push({
      userId: this.state.userId,
      content
    });
    this.firebaseDatabase
    .ref(`${this.state.partnerId}/${this.state.userId}`)
    .push({
      userId: this.state.userId,
      content
    });
    this.setState({ content: '' });
    
    this.firebaseDatabase
    .ref(`${this.state.partnerId}/${this.state.userId}`)
    .remove();
    this.firebaseDatabase
    .ref(`room${this.state.partnerId}/${this.state.userId}`)
    .remove();

    // reactのライフサイクルメソッドで適応できる？
    this.firebaseDatabase
    .ref(`room${this.state.userId}/${this.state.partnerId}`)
    .set({
      partner: this.state.partnerAccountName,
      lastMessage: content,
      address: this.state.address,
    });
    this.firebaseDatabase
    .ref(`room${this.state.partnerId}/${this.state.userId}`)
    .set({
      partner: this.props.accountName,
      lastMessage: content,
      address: this.props.wallet.address,
    });
  }

  submitEther = async (content) => {
    if (Number(content)) {
      // send ether
      const value = Number(content);
      const { wallet, balance } = this.props;
      await this.props.sendEther(wallet, balance, this.state.address, value);
      
      // send message 
      this.firebaseDatabase
      .ref(`${this.state.userId}/${this.state.partnerId}`)
      .push({
        userId: this.state.userId,
        content: `${Number(content).toString()}Ether送信しました`,
      });
      this.firebaseDatabase
      .ref(`${this.state.partnerId}/${this.state.userId}`)
      .push({
        userId: this.state.userId,
        content: `${Number(content).toString()}Ether送信しました`,
      });
      this.setState({ content: '' });

      this.firebaseDatabase
      .ref(`${this.state.partnerId}/${this.state.userId}`)
      .remove();
      this.firebaseDatabase
      .ref(`room${this.state.partnerId}/${this.state.userId}`)
      .remove();

      this.firebaseDatabase
      .ref(`room${this.state.userId}/${this.state.partnerId}`)
      .set({
        partner: this.state.partnerAccountName,
        lastMessage: `${Number(content).toString()}Ether送信しました`,
        address: this.state.address,
      });
      this.firebaseDatabase
      .ref(`room${this.state.partnerId}/${this.state.userId}`)
      .set({
        partner: this.props.accountName,
        lastMessage: `${Number(content).toString()}Ether送信しました`,
        address: this.props.wallet.address,
      });
    }
  }

  render() {
    const contentsData = [];
    const {
      contents,
      userId,
    } = this.state;
    if (contents) {
      Object.keys(contents).forEach(index => {
        contentsData.push({ content: contents[index].content, userId: contents[index].userId });
      });
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={contentsData}
          renderItem={({ item }) => {
              const userIdFromDatabase = item.userId;
              const stylesInList =
                userIdFromDatabase === userId ? styles.myContent : styles.othersContent;
              return (
                <View style={stylesInList}>
                  <View style={styles.content}>
                    <Text>{item.content}</Text>
                  </View>
                </View>
              );
            }
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.bottomItem}>
          <TextInput
            style={styles.searchBar}
            value={this.state.content}
            onChangeText={text => this.setState({ content: text })}
            returnKeyType='send'
            onSubmitEditing={() => this.submitContent(this.state.content)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => this.submitContent(this.state.content)}
          >
            <Text>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => this.submitEther(this.state.content)}
          >
            <Text>E</Text>
          </TouchableOpacity>
        </View>
        <Button
          title='check'
          onPress={() => console.log(this.props)}
        />
      </View>
    );
  }
}
 
export default Chat;
