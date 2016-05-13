import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import SearchResults from './SearchResults';
import SearchPage from './SearchPageAccordion';
import FBSDK from 'react-native-fbsdk';
import Routes from './Routes';

const {
    LoginButton,
    GraphRequest,
    GraphRequestManager,
    } = FBSDK;

import {
    StyleSheet,
    Text,
    TextInput,
    View,
    PickerIOS,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component,
    AlertIOS,
    AsyncStorage
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    fontFamily: 'Cochin',
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#275B8A'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Cochin'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#275B8A',
    borderColor: '#275B8A',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 5,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#275B8A',
    borderRadius: 8,
    color: '#275B8A',
    fontFamily: 'Cochin'
  },
  image: {
    width: 217,
    height: 138
  }
});

var Login = React.createClass({

  render: function() {
    return (
        <View>
          <LoginButton
              publishPermissions={["publish_actions"]}
              onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions);
                //console.log(result);
                // Create a graph request asking for user informations with a callback to handle the response.
                var infoRequest = new GraphRequest(
                    '/me',
                    null,
                    this._fbLoginCallback
                );
                new GraphRequestManager().addRequest(infoRequest).start();
              }
            }
          }
              onLogoutFinished={() => alert("User logged out")}/>
        </View>
    );
  },

  _fbLoginCallback(error, result) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Success fetching data: ' + result.id + result.name);
      //console.log(result);

      var loginParams = {
        username: result.id,
        password: result.id
      };
      var query = Routes.addUser;
      this._executeQuery(query, loginParams);
    }
  },

  _handleResponse(response) {
    console.log(response);

    if (response.success) {
      this.setState({
        isLoading: false,
        message: 'Your token is: ' + response
      });

      //this.props.navigator.push({
      //  title: 'Search',
      //  component: SearchPage
      //});
    } else {
      this.setState({
        isLoading: false,
        message: response.message
      });
    }
  },

  _executeQuery(query, params) {
    console.log(params);
    this.setState( {isLoading: true} );

    var object = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: params.username,
        password: params.password
      })
    };

    fetch(query, object)
      .then((response) => response.json())
      .then((json) => this._handleResponse(json))
      .catch((error) => {
        console.log(error);
        alert("User already registered, " + error);
      });
  }

});

class SignupPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameString: '',
      passwordString: '',
      isLoading: false,
      message: ''
    };
  }

  onUsernameTextChanged(event) {
    this.setState({
      usernameString: event.nativeEvent.text
    });
  }

  onPasswordTextChanged(event) {
    this.setState({
      passwordString: event.nativeEvent.text
    });
  }

  _executeQuery(query) {
    console.log(query);
    this.setState( {isLoading: true} );

    var object = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.usernameString,
        password: this.state.passwordString
      })
    };

    fetch(query, object)
        .then((response) => response.json())
        .then((json) => this._handleResponse(json))
        .catch(error => {
          //alert('User already registered! ' + error);
          this.setState({
            isLoading: false,
            message: 'User already registered! ' + error
          })
      });
  }

  _handleResponse(response) {
    console.log(response);

    if (response.success) {
      this.setState({
        isLoading: false,
        message: 'Your token is: ' + response
      });

      //this.props.navigator.push({
      //  title: 'Search',
      //  component: SearchPage
      //});
    } else {
      this.setState({
        isLoading: false,
        message: response.message
      });
    }
  }

  //Create response callback.
  _responseInfoCallback(error, result) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Success fetching data: ' + result.id + result.name);
      //console.log(result);
      AsyncStorage.setItem('token', result.id, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  onSearchPressed() {
    var query = Routes.addUser;
    this._executeQuery(query);

    AsyncStorage.getItem('token', (error, value) => {
      alert('getting item!');
      if (error) {
        console.log('ERROR MESSAGE FOR GETITEM: ' + err);
      } else {
        console.log('ID SAVED MESSAHE AJJJ id saved: ' + value);
      }
    });
  }

  render() {
    var spinner = this.state.isLoading ?
        ( <ActivityIndicatorIOS size='large'/> ) : ( <View/> );

    return (
        <View style={styles.container}>
          <Text style={styles.description}>
            Login with your username and password
          </Text>
          <View style={styles.flowRight}>
            <TextInput
                style={styles.searchInput}
                value={this.state.usernameString}
                onChange={this.onUsernameTextChanged.bind(this)}
                placeholder='Username'/>
            <TextInput
                style={styles.searchInput}
                value={this.state.passwordString}
                onChange={this.onPasswordTextChanged.bind(this)}
                placeholder='Password'/>
            <TouchableHighlight style={styles.button}
                                onPress={this.onSearchPressed.bind(this)}
                                underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableHighlight>
          </View>
          <Login />
          {spinner}
          <Text style={styles.description}>{this.state.message}</Text>
        </View>
    );
  }
}

module.exports = SignupPage;