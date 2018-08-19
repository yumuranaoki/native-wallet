import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: false
    };
  }

  async componentDidMount() {
    const accessToken = 'hogehoge1';
    try {
      const data = {
        accessToken,
        accountName: 'naoki1',
        email: 'naoki1@example.com'
      }; 
      const fetchResult = await fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      const result = await fetchResult.json();
      console.log(result);
      console.log(result.message);
      if (result.message) {
        console.log(result.message);
        this.setState({ err: true });
      }
    } catch (err) {
      console.log(err);
      this.setState({ err: true });
    }
  }

  render() {
    const App = () => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          App
        </Text>
      </View>
    );

    const Err = () => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Err
        </Text>
      </View>
    );
    return this.state.err ? <Err /> : <App />;
  }
}

export default Test;
