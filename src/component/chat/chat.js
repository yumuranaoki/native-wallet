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
  // walletはreduxで管理
  state = {
    userId: null,
    partnerId: null,
    address: null,
    content: '', // TextInputの値
    contents: null
  };

  async componentDidMount() {
    this.firebaseDatabase = firebase.database();
    this.setState({
      partnerId: this.props.navigation.getParam('id'),
      address: this.props.navigation.getParam('address'),
    });
    // userIdを取得
    try {
      const userId = await AsyncStorage.getItem('userId');
      this.setState({ userId: Number(userId) });
    } catch (error) {
      console.log(error);
    }
    this.getChatConent();
    console.log(this.props.navigation.state);
  }

  getChatConent = () => {
    this.firebaseDatabase
    .ref(`${this.state.userId}/${this.state.partnerId}`)
    .on('value', snapshot => {
      const contents = snapshot.val();
      // async awaitでrewrite
      this.setState({ contents });
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
  }

  submitEther = content => {
    if (Number(content)) {
      const value = Number(content);
      const { wallet, balance } = this.props;
      console.log(wallet);
      console.log(balance);
      this.props.sendEther(wallet, balance, this.state.address, value);
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
