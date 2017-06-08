import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import LoginPage from './LoginPage';
import Survey from './Survey';
import FBSDK from 'react-native-fbsdk';
import Routes from './Routes';
import dismissKeyboard from 'dismissKeyboard';
import styles from './CSS';

const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  } = FBSDK;

import {
  Text,
  TextInput,
  View,
  Dimensions,
  PickerIOS,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component,
  AlertIOS,
  AsyncStorage,
  TouchableWithoutFeedback
} from 'react-native';



class SignupPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameString: '',
      passwordString: '',
      isLoading: false,
      message: ' '
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

  _executeQuery(query, params, handlerFunc) {
    var handler = handler || undefined;
    var params = params || null;
    // console.log(query);
    this.setState( {isLoading: true} );

    var object = {};
    // console.log('FACEBOOK PARAMS ARE ', params);
    if (params === null) {
      // console.log('PARAMS ARE NULL');
      // console.log(params);
      if (this.state.usernameString.length > 0 && this.state.passwordString.length > 0) {
        object = {
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

        AsyncStorage.setItem('user', this.state.usernameString, (err) => {
          if (err) {
            console.log(err);
            alert('username could not be saved');
          }
        });

        fetch(query, object)
          .then((response) => response.json())
          .then((json) => handlerFunc(json, params, this))
          .catch((error) => {
            this.setState({
              isLoading: false,
              message: 'User could not be registered ' + error
            });
          });

      } else {
        this.setState( {
          isLoading: false,
          message: 'Please input a valid username and password'
        } );
      }
    } else {
      console.log('PARAMS ARE NOT NULL');
      // console.log(params);
      object = {
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

      AsyncStorage.setItem('user', params.username, (err) => {
        if (err) {
          console.log(err);
          alert('username could not be saved');
        }
      });

      fetch(query, object)
        .then((response) => response.json())
        .then((json) => handlerFunc(json, params, this))
        .catch(error =>
          this.setState({
            isLoading: false,
            message: 'Something bad happened ' + error
          }));
    }
  }

  _handleRegisterResponse(response, params, _this) {
    var _this = _this || undefined;
    var params = params || null;

    if (response.success) {
      var query = Routes.auth;
      _this._executeQuery(query, params, _this._handleAuthResponse);

    } else {
      _this.setState({
        isLoading: false,
        message: response.message
      });
    }
  }

  _handleAuthResponse(response, params, _this) {
    var _this = _this || undefined;
    var params = params || null;

    if (response.success) {

      _this.setState({
        isLoading: false
      });

      AsyncStorage.setItem('token', response.token, (err) => {
        if (err) {
          console.log(err);
          alert('Access token could not be saved');
        } else {
          // Go to search page, now that you're logged in
          _this.setState({message: ' '});
          _this.props.navigator.push({
            title: 'Profile Survey',
            component: Survey,
            navigationBarHidden: true
          });
        }
      });
    } else {
      _this.setState({
        isLoading: false,
        message: response.message
      });
    }
  }

  onSignupPressed() {
    var query = Routes.addUser;
    this._executeQuery(query, null, this._handleRegisterResponse);
  }

  onLoginPressed() {
    this.props.navigator.pop();
  }

  render() {
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS size='large'/> ) : ( <View/> );

    return (
      <TouchableWithoutFeedback onPress={ () => { dismissKeyboard() } }>
        <Image source={require('./Resources/signup_page.jpg')} style={styles.containerLoginSignup}>
          <View style={styles.headerGroupSignup}>
            <Text style={styles.header}>
              Connoisseur
            </Text>
            <Text style={styles.description}>
              where we match your taste
            </Text>
          </View>
          <View style={styles.formGroup}>
            <TextInput
                style={styles.searchInputSignup}
                value={this.state.usernameString}
                onChange={this.onUsernameTextChanged.bind(this)}
                placeholder='username'
                placeholderTextColor='white'/>
            <TextInput
                secureTextEntry={true}
                style={styles.searchInputSignup}
                value={this.state.passwordString}
                onChange={this.onPasswordTextChanged.bind(this)}
                placeholder='password'
                placeholderTextColor='white'/>
            <TouchableHighlight style={styles.buttonLoginSignup}
                                onPress={this.onSignupPressed.bind(this)}
                                underlayColor='white'>
              <Text style={styles.buttonTextLoginSignup}>sign up</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.loginInfo}>
            <Login
              navigator={this.props.navigator}
              _this={this}/>
            <Text style={styles.description}>{this.state.message}</Text>
          </View>
          <View style={styles.signup}>
            <Text style={styles.buttonTextLoginSignup}>already have an account?</Text>
            <TouchableHighlight onPress={this.onLoginPressed.bind(this)}
                                underlayColor='transparent'
                                style={{marginBottom: 10}}>
              <Text style={[styles.buttonTextLoginSignup, {fontWeight: '800'}]}>login</Text>
            </TouchableHighlight>
            {spinner}
          </View>

        </Image>
      </TouchableWithoutFeedback>
    );
  }
}

var Login = React.createClass({

  render: function() {
    return (
      <View>
        <LoginButton
          style={styles.facebookButton}
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                //alert("Login was successful with permissions: " + result.grantedPermissions);

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
      //alert('Success fetching data: ' + result.id + result.name);
      //console.log(result);

      var query = Routes.addUser;
      var params = {
        username: result.id,
        password: result.id
      };

      this.props._this._executeQuery(query, params, this.props._this._handleRegisterResponse);
    }
  }

});

module.exports = SignupPage;
