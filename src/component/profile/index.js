import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class Profile extends Component {
  state = {
    accountName: ''
  };

  changeProfile = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const accountName = this.state.accountName;
    const data = {
      userId,
      accountName,
    };
    try {
      const result = await fetch('http://localhost:3000/users', {
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      const jsonResult = await result.json();
      if (jsonResult.result === 'success') {
        // modal的な
      }
    } catch (err) {
      console.log(err);
    }
  }

  logout = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const data = {
      userId
    };
    try {
      const result = await fetch('http://localhost:3000/users/', {
        mode: 'cors',
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      const jsonResult = await result.json();
      if (jsonResult.result === 'success') {
        // local storageを全削除
        await AsyncStorage.removeItem('userId');
        // entryLoadingへ
        this.props.navigation.navigate('NewUserNavigator');
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          this is a profile screen
        </Text>
        <TextInput
          onChangeText={text => this.setState({ accountName: text })}
        />
        <TouchableOpacity
          onPress={() => this.changeProfile()}
        >
          <Text>change profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.logout()}
        >
          <Text>log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Profile;
