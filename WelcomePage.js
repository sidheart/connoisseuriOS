import React from 'react';
import SearchPage from './SearchPageAccordion';
import SearchPageOld from './SearchPageOld';
import LoginView from './LoginPage';
import SignupView from './SignupPage';
import * as Animatable from 'react-native-animatable';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  Animated,
  Dimensions,
  Navigator,
  TouchableOpacity,
  Component,
  Modal
} from 'react-native';

var { width, height } = Dimensions.get('window');
const BRAND_TOP_POS = height - 130;
const BRAND_RIGHT_POS = 12;
const BUTTON_WIDTH = width/2;
const BUTTON_HEIGHT = 50;
const BUTTON_TOP_POS = 23;

var styles = StyleSheet.create({
  /////////////////////////////////////////////////////////////
  // TO-DO: Will need refactoring stylesheets here          ///
  /////////////////////////////////////////////////////////////
  container: {
    flex: 1,
    width: null,
    height: null
  },
  brand: {
    fontFamily: 'Bodoni 72',
    fontSize: 30,
    textAlign: 'right',
    color: 'white',
    backgroundColor: 'transparent',
    marginTop: BRAND_TOP_POS,
    marginRight: BRAND_RIGHT_POS
  },
  description: {
    fontFamily: 'Avenir',
    fontSize: 17,
    fontWeight: '200',
    textAlign: 'right',
    backgroundColor: 'transparent',
    color: 'white',
    marginRight: BRAND_RIGHT_POS
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Avenir'
  },
  button: {
    opacity: 0.9,
    height: BUTTON_HEIGHT,
    position: 'absolute',
    justifyContent: 'center',
    marginTop: BUTTON_TOP_POS,
    width: BUTTON_WIDTH,
  },
  buttonGreen: {
    position: 'absolute',
    backgroundColor: '#658248'
  },
  buttonBlack: {
    backgroundColor: 'black',
    marginLeft: BUTTON_WIDTH
  }
});

class WelcomeView extends Component {
  constructor(props) {
     super(props);
   }

   handleLoginPress() {
     this.props.navigator.push({
       title: 'Login',
       component: LoginView
     });
   }

   handleSignUpPress() {
     this.props.navigator.push({
       title: 'Sign Up',
       component: SignupView
     });
   }

   render() {
     return (
         <Image source={require('./Resources/landing_img_3.jpg')} style={styles.container}>

           <Text style={styles.brand}>
             Connoisseur
           </Text>
           <Text style={styles.description}>
             we match your taste
           </Text>
           <TouchableHighlight
           onPress={this.handleLoginPress.bind(this)}
           style={[styles.button, styles.buttonGreen]}>
             <Text style={ styles.buttonText }>login</Text>
           </TouchableHighlight>
           <TouchableHighlight
           onPress={this.handleSignUpPress.bind(this)}
           style={[styles.button, styles.buttonBlack]}>
             <Text style={ styles.buttonText }>signup</Text>
           </TouchableHighlight>
         </Image>
     );
   }

}

class WelcomePage extends Component {
  /////////////////////////////////////////////////////////////
  // TO-DO: when Login and SignUp are configured            ///
  // Need to reconsider doing other methods instead of push ///
  /////////////////////////////////////////////////////////////

  renderScene(route, navigator) {
    return <route.component navigator={navigator} {...route.passProps} />
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.FloatFromBottom
  }

  render() {
    return (
      <Navigator
      configureScene={this.configureScene.bind(this)}
      style={{flex: 1}}
      initialRoute = {{component: WelcomeView}}
      renderScene = {this.renderScene.bind(this)}
      />
    )
  }
}

module.exports = WelcomePage;
