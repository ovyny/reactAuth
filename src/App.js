import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Card, CardSection, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBfXzuhhq7Pm7HKlLcHy--1oPKbF4tUu5E',
      authDomain: 'reactauth-b8ef1.firebaseapp.com',
      databaseURL: 'https://reactauth-b8ef1.firebaseio.com',
      projectId: 'reactauth-b8ef1',
      storageBucket: 'reactauth-b8ef1.appspot.com',
      messagingSenderId: '765671133646'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.logOutButtonStyle}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={{ marginTop: 25 }}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View >
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  logOutButtonStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
};

export default App;
