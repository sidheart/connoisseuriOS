import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import LoginPage from './LoginPage';
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
const SIGNUP_TOP_POS = FBLOGIN_TOP_POS + 15;
const INPUT_WIDTH = width*0.7;
const INPUT_MARGIN = width*0.15;
const colorWhite = '#EDEDED';
const SMALL_FONT_SIZE = 15;
const DESCRIPTION_MARGIN = width * 0.1;

var styles = StyleSheet.create({
  header: {
    fontFamily: 'Bodoni 72',
    fontSize: 36,
    textAlign: 'center',
    color: colorWhite,
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
    color: colorWhite,
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
    borderColor: colorWhite,
    color: colorWhite,
    backgroundColor: 'rgba(237, 237, 237, 0.15)',
    fontFamily: 'Avenir',
  },
  buttonText: {
    fontSize: SMALL_FONT_SIZE,
    color: colorWhite,
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
    borderColor: colorWhite,
    borderWidth: 1,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
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
  facebookButton: {
    height: 40,
    width: INPUT_WIDTH,
    backgroundColor: '#4267B2',
    marginLeft: INPUT_MARGIN,
    marginRight: INPUT_MARGIN,
    marginBottom: 10
  }
});

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
    console.log(query);
    this.setState( {isLoading: true} );

    var object = {};
    console.log('FACEBOOK PARAMS ARE ', params);
    if (params === null) {
      console.log('PARAMS ARE NULL');
      console.log(params);
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
      console.log(params);
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
            title: 'Search',
            component: TabBarPlatform,
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
        <Image source={require('./Resources/landing_background_3.jpg')} style={styles.container}>
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
                                onPress={this.onSignupPressed.bind(this)}
                                underlayColor='white'>
              <Text style={styles.buttonText}>sign up</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.loginInfo}>
            <Login
              navigator={this.props.navigator}
              _this={this}/>
            <Text style={styles.description}>{this.state.message}</Text>
          </View>
          <View style={styles.signup}>
            <Text style={styles.buttonText}>already have an account?</Text>
            <TouchableHighlight onPress={this.onLoginPressed.bind(this)}
                                underlayColor='transparent'
                                style={{marginBottom: 10}}>
              <Text style={[styles.buttonText, {fontWeight: '800'}]}>login</Text>
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
