import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import 'core-js/es6/map';
import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import 'babel-polyfill';

const { height, width } = Dimensions.get('window');

class RecentChat extends Component {
  changeRelation = () => {
    this.props.changeRelation();
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
    } = this.props;
    const searchedUserWrapper = searchedUser || { id: '', account_id: '', account_name: '' };
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    });
    
    return (
      <View style={styles.container}>
        <Text>
          This is recent chat
        </Text>

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
        <Button
        title='check'
        onPress={() => console.log(searchedUser)}
        />
      </View>
    );
  }
}

export default RecentChat;
