import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import SignupPage from './SignupPage';
import TabBarPlatform from './TabBarPlatform';
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



class LoginPage extends Component {
  
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
  
  _executeQuery(query, params) {
    var params = params || {};
    var username;
    // console.log(query);
    this.setState( {isLoading: true} );
    
    var object = {};
    if (!params.username || !params.password) {
      username = this.state.usernameString;
      object = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
                           "email": this.state.usernameString,
                           "password": this.state.passwordString
                           })
      };
    } else {
      username = params.username;
      object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
                           "email": params.username,
                           "password": params.password
                           })
      };
    }
    
    fetch(query, object)
    .then((response) => response.json())
    .then((json) => this._handleResponse(json, username))
    .catch(error =>
           this.setState({
                         isLoading: false,
                         message: 'Something bad happened ' + error
                         }));
  }
  
  _handleResponse(response, username) {
    console.log(response);
    
    if (response.token) {
      
      this.setState({
                    isLoading: false
                    });
      
      AsyncStorage.setItem('token', response.token, (err) => {
                           if (err) {
                           console.log(err);
                           alert('Access token could not be saved');
                           } else {
                           this.setState({message: ' '});
                           AsyncStorage.setItem('user', username, (err) => {
                                                if (err) {
                                                console.log(err);
                                                alert('username could not be saved');
                                                } else {
                                                // Go to search page, now that you're logged in
                                                this.props.navigator.push({
                                                                          title: 'Search',
                                                                          component: TabBarPlatform,
                                                                          navigationBarHidden: true
                                                                          });
                                                }
                                                });
                           }
                           });
    } else {
      this.setState({
                    isLoading: false,
                    message: response.message
                    });
    }
  }
  
  onSearchPressed() {
    var query = Routes.auth;
    this._executeQuery(query);
  }
  
  onSignupPressed() {
    this.props.navigator.push({
                              title: 'Sign Up',
                              component: SignupPage,
                              navigationBarHidden: true
                              });
  }
  
  render() {
    var spinner = this.state.isLoading ?
    ( <ActivityIndicatorIOS size='large'/> ) : ( <View/> );
    
    return (
            <TouchableWithoutFeedback onPress={ () => { dismissKeyboard() } }>
            <Image source={require('./Resources/login_page.jpg')} style={styles.containerLoginSignup}>
            <View style={styles.headerGroup}>
            <Image source={require('./Resources/logo.png')} style={styles.logo}></Image>
            </View>
            <View style={styles.formGroup}>
            <TextInput
            style={styles.searchInputLogin}
            value={this.state.usernameString}
            onChange={this.onUsernameTextChanged.bind(this)}
            placeholder='username'
            placeholderTextColor='white'/>
            <TextInput
            secureTextEntry={true}
            style={styles.searchInputLogin}
            value={this.state.passwordString}
            onChange={this.onPasswordTextChanged.bind(this)}
            placeholder='password'
            placeholderTextColor='white'/>
            <TouchableHighlight style={styles.buttonLoginSignup}
            onPress={this.onSearchPressed.bind(this)}
            underlayColor='white'>
            <Text style={styles.buttonTextLoginSignup}>login</Text>
            </TouchableHighlight>
            </View>
            <View style={styles.loginInfo}>
            <Login
            navigator={this.props.navigator}
            _this={this}/>
            <Text style={styles.description}>{this.state.message}</Text>
            </View>
            <View style={styles.signup}>
            <TouchableHighlight onPress={this.onSignupPressed.bind(this)}
            style={styles.signupbutton}>
            <Text style={[styles.buttonTextLoginSignup, {fontWeight: '800'}]}>sign up</Text>
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
                              
                              var query = Routes.auth;
                              var params = {
                              username: result.id,
                              password: result.id
                              };
                              
                              this.props._this._executeQuery(query, params);
                              }
                              }
                              
                              });

module.exports = LoginPage;