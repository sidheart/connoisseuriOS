import React from 'react';

import SearchPage from './SearchPage';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  Component
} from 'react-native';


var styles = StyleSheet.create({
  /////////////////////////////////////////////////////////////
  // TO-DO: Will need refactoring stylesheets here          ///
  /////////////////////////////////////////////////////////////
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#58595B',
    paddingBottom: 150
  },
  brand: {
    fontFamily: 'Bradley Hand',
    marginTop: 20,
    fontSize: 50,
    fontWeight: '300',
    textAlign: 'center',
    color: 'white'
  },
  description: {
    fontFamily: 'Hiragino Sans',
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'center',
    color: 'white',
    marginBottom: 50
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Hiragino Sans'
  },
  buttonRed: {
    height: 40,
    width: 200,
    padding: 23,
    paddingTop: 28,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F05654',
    marginBottom: 10,
    justifyContent: 'center'
  },
  buttonGreen: {
    height: 40,
    width: 200,
    padding: 23,
    paddingTop: 28,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#7AAB73',
    marginBottom: 10,
    justifyContent: 'center'
  }
});

class WelcomePage extends Component {
  /////////////////////////////////////////////////////////////
  // TO-DO: when Login and SignUp are configured            ///
  // Need to reconsider doing other methods instead of push ///
  /////////////////////////////////////////////////////////////

  _onLoginPressed() {
    this.props.navigator.push({
      title: 'Search',
      component: SearchPage
    });
  }

  _onSignUpPressed() {
    this.props.navigator.push({
      title: 'Search',
      component: SearchPage
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./Resources/search-page-icon.png')} style={styles.image}/>
        <Text style={styles.brand}>
          Connoisseur
        </Text>
        <Text style={styles.description}>
          where we match your taste
        </Text>
        <TouchableHighlight style={styles.buttonRed}
            // as for now both buttons go to search page
            onPress={this._onLoginPressed.bind(this)}
            underlayColor='#D58385'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonGreen}
            // as for now both buttons go to search page
            onPress={this._onSignUpPressed.bind(this)}
            underlayColor='#9FBF9B'>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = WelcomePage;
