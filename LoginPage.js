import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import SignupPage from './SignupPage';
import TabBarPlatform from './TabBarPlatform';
import FBSDK from 'react-native-fbsdk';
import Routes from './Routes';
import dismissKeyboard from 'dismissKeyboard';

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

var { width, height } = Dimensions.get('window');
const HEADER_TOP_POS = height * 0.15;
const FORM_TOP_POS = height * 0.20;
const FBLOGIN_TOP_POS = FORM_TOP_POS + 30;
const SIGNUP_TOP_POS = FBLOGIN_TOP_POS + 1;
const INPUT_WIDTH = width*0.7;
const INPUT_MARGIN = width*0.15;
const COLOR_WHITE = '#EDEDED';
const COLOR_BLACK = '#000000'
const SMALL_FONT_SIZE = 15;
const DESCRIPTION_MARGIN = width * 0.1;

var styles = StyleSheet.create({
  header: {
    fontFamily: 'Bodoni 72',
    fontSize: 36,
    textAlign: 'center',
    color: COLOR_WHITE,
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1,
    width: null,
    height: null
  },
  description: {
    fontFamily: 'Avenir',
    fontSize: SMALL_FONT_SIZE,
    textAlign: 'center',
    color: COLOR_WHITE,
    backgroundColor: 'transparent',
    marginLeft: DESCRIPTION_MARGIN,
    marginRight: DESCRIPTION_MARGIN
  },
  headerGroup: {
    top: HEADER_TOP_POS
  },
  searchInput: {
    height: 40,
    paddingLeft: SMALL_FONT_SIZE,
    marginRight: INPUT_MARGIN,
    marginLeft: INPUT_MARGIN,
    marginBottom: 10,
    flex: 1,
    width: INPUT_WIDTH,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLOR_WHITE,
    color: COLOR_WHITE,
    backgroundColor: 'rgba(119, 136, 153, 0.9)',
    fontFamily: 'Avenir',
  },
  buttonText: {
    fontSize: SMALL_FONT_SIZE,
    color: COLOR_WHITE,
    alignSelf: 'center',
    fontFamily: 'Avenir',
    backgroundColor: 'transparent'
  },
  button: {
    height: 40,
    flex: 1,
    width: INPUT_WIDTH,
    marginRight: INPUT_MARGIN,
    marginLeft: INPUT_MARGIN,
    borderColor: COLOR_WHITE,
    borderWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(119, 136, 153, 0.9)',
    alignSelf: 'stretch',
                               
    justifyContent: 'center'
  },
  signupbutton: {
    height: 40,
    flex: 1,
    borderRadius: 40,
    width: INPUT_WIDTH - 150,
    borderColor: COLOR_WHITE,
    borderWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(119, 136, 153, 1)',
    alignSelf: 'center',

    justifyContent: 'center'
  },
  formGroup: {
    top: FORM_TOP_POS
  },
  loginInfo: {
    justifyContent: 'center',
    top: FBLOGIN_TOP_POS
  },
  signup: {
    top: SIGNUP_TOP_POS
  },
  logo: {
    alignSelf: 'center'
  },
  facebookButton: {
    height: 40,
    width: INPUT_WIDTH,
    backgroundColor: '#4267B2',
    marginLeft: INPUT_MARGIN,
    marginRight: INPUT_MARGIN,
    marginBottom: 10
  }
});

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
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.usernameString,
          password: this.state.passwordString
        })
      };
    } else {
      username = params.username;
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
    // console.log(response);

    if (response.success) {

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
        <Image source={require('./Resources/login_page.jpg')} style={styles.container}>
          <View style={styles.headerGroup}>
            <Text style={styles.header}>
              Connoisseur
            </Text>
            <Text style={styles.description}>
              where we match your taste
            </Text>
          </View>
          <View style={styles.formGroup}>
            <TextInput
                style={styles.searchInput}
                value={this.state.usernameString}
                onChange={this.onUsernameTextChanged.bind(this)}
                placeholder='username'
                placeholderTextColor='white'/>
            <TextInput
                secureTextEntry={true}
                style={styles.searchInput}
                value={this.state.passwordString}
                onChange={this.onPasswordTextChanged.bind(this)}
                placeholder='password'
                placeholderTextColor='white'/>
            <TouchableHighlight style={styles.button}
                                onPress={this.onSearchPressed.bind(this)}
                                underlayColor='white'>
              <Text style={styles.buttonText}>login</Text>
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
              <Text style={[styles.buttonText, {fontWeight: '800'}]}>sign up</Text>
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
