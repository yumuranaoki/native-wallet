import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Button,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../../util/firebase';

const width = Dimensions.get('window').width;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      partnerId: this.props.navigation.getParam('id'),
      partnerAccountName: this.props.navigation.getParam('accountName'),
      address: this.props.navigation.getParam('address'),
      content: '', // TextInputの値
      contents: null,
      limit: 20,
      allowScrollToEnd: true,
      textInputHeight: 50,
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
    //setTimeOutでfalse
  }

  componentDidUpdate() {
    // renderされたことをここで管理
  }

  getChatConent = () => {
    this.firebaseDatabase
    .ref(`${this.state.userId}/${this.state.partnerId}`).limitToLast(this.state.limit)
    .on('value', snapshot => {
      const contents = snapshot.val();
      if (contents == null) {
        this.registerRoom();
      }
      this.props.setContents(contents);
    });
  };

  getChatConentMore = () => {
    this.setState({ limit: this.state.limit + 10 });
    this.getChatConent();
  }

  scrollToEnd = () => {
    if (this.state.allowScrollToEnd) {
      this.scrollView.scrollToEnd({ animated: false });
    }
    setTimeout(() => this.setState({ allowScrollToEnd: false }), 300);
  }

  registerRoom = () => {
    this.firebaseDatabase
    .ref(`room${this.state.userId}/${this.state.partnerId}`)
    .set({
      partner: this.state.partnerAccountName,
      lastMessage: '',
      address: this.state.address,
      timestamp: Date.now(),
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
      timestamp: Date.now(),
    });
    this.firebaseDatabase
    .ref(`room${this.state.partnerId}/${this.state.userId}`)
    .set({
      partner: this.props.accountName,
      lastMessage: content,
      address: this.props.wallet.address,
      timestamp: Date.now(),
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
      .ref(`room${this.state.userId}/${this.state.partnerId}`)
      .set({
        partner: this.state.partnerAccountName,
        lastMessage: `${Number(content).toString()}Ether送信しました`,
        address: this.state.address,
        timestamp: Date.now(),
      });
      this.firebaseDatabase
      .ref(`room${this.state.partnerId}/${this.state.userId}`)
      .set({
        partner: this.props.accountName,
        lastMessage: `${Number(content).toString()}Ether送信しました`,
        address: this.props.wallet.address,
        timestamp: Date.now(),
      });
    }
  }

  changeTextInputHeight = height => {
    let newHeight;
    if (height < 30) {
      newHeight = 30;
    } else if (height <= 67) {
      newHeight = height + 10;
    } else {
      newHeight = 77;
    }
    this.setState({ textInputHeight: newHeight });
  }

  render() {
    const contentsData = [];
    const {
      contents
    } = this.props;
    const {
      userId,
    } = this.state;

    if (contents) {
      Object.keys(contents).forEach(index => {
        contentsData.push({ content: contents[index].content, userId: contents[index].userId });
      });
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      searchBar: {
        borderRadius: 5,
        backgroundColor: 'white',
        width: 250,
        height: this.state.textInputHeight,
      },
      bottomItem: {
        height: this.state.textInputHeight + 10,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191970',
        flexDirection: 'row',
      },
      sendButton: {
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: 'white',
        width: 30,
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
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
      },
    });

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
          onContentSizeChange={() => this.scrollToEnd()}
          ref={(scrollView) => { this.scrollView = scrollView; }}
          onMomentumScrollBegin={() => this.getChatConentMore()}
        />
        <View style={styles.bottomItem}>
          <TextInput
            style={styles.searchBar}
            value={this.state.content}
            onChangeText={text => this.setState({ content: text })}
            multiline={true}
            onContentSizeChange={event => this.changeTextInputHeight(event.nativeEvent.contentSize.height)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => this.submitContent(this.state.content)}
          >
            <Ionicons
              name='md-send'
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => this.submitEther(this.state.content)}
          >
            <MaterialCommunityIcons
              name='ethereum'
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
 
export default Chat;
