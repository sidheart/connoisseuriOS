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
  Modal,
  Component
} from 'react-native';

var { width, height } = Dimensions.get('window');
const BRAND_TOP_POS = height - 130;
const BRAND_RIGHT_POS = 12;
const BUTTON_WIDTH = width/2;
const BUTTON_HEIGHT = 50;
const BUTTON_TOP_POS = 23;

// for some reason navigator causes a 1px gap between two buttons
const RIGHT_BUTTON_OFFSET = width/2-1;
const RIGHT_BUTTON_WIDTH = width/2+1;

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
    marginTop: BUTTON_TOP_POS
  },
  buttonGreen: {
    width: BUTTON_WIDTH,
    position: 'absolute',
    backgroundColor: '#658248',
  },
  buttonBlack: {
    width: RIGHT_BUTTON_WIDTH,
    backgroundColor: 'black',
    marginLeft: RIGHT_BUTTON_OFFSET,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

// var LogIn = React.createClass({
//   getInitialState: function() {
//     return { offset: new Animated.Value(height) }
//   },
//   componentDidMount: function() {
//     Animated.timing(this.state.offset, {
//       duration: 200,
//       toValue: 0
//     }).start();
//   },
//   closeModal: function() {
//     Animated.timing(this.state.offset, {
//       duration: 200,
//       toValue: height
//     }).start(this.props.closeModal);
//   },
//   render: function() {
//     return (
//         <Animated.View style={[styles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset}]}]}>
//           <TouchableOpacity onPress={this.closeModal}>
//             <Text style={styles.buttonText}>Close Menu</Text>
//           </TouchableOpacity>
//         </Animated.View>
//     )
//   }
// });
//
// var SignUp = React.createClass({
//   getInitialState: function() {
//     return { offset: new Animated.Value(height) }
//   },
//   componentDidMount: function() {
//     Animated.timing(this.state.offset, {
//       duration: 200,
//       toValue: 0
//     }).start();
//   },
//   closeModal: function() {
//     Animated.timing(this.state.offset, {
//       duration: 200,
//       toValue: height
//     }).start(this.props.closeModal);
//   },
//   render: function() {
//     return (
//         <Animated.View style={[styles.modal, styles.flexCenter, {transform: [{translateY: this.state.offset}]}]}>
//           <TouchableOpacity onPress={this.closeModal}>
//             <Text style={styles.buttonText}>Close Bye</Text>
//           </TouchableOpacity>
//         </Animated.View>
//     )
//   }
// });
//
// var LoginPage = React.createClass({
//     render: function() {
//       return (
//         <View style={styles.flexCenter}>
//           <TouchableOpacity onPress={this.props.openModal}>
//             <Text style={styles.buttonText}>login</Text>
//           </TouchableOpacity>
//         </View>
//       )
//     }
// });
//
// var SignUpPage = React.createClass({
//     render: function() {
//       return (
//         <View style={styles.flexCenter}>
//           <TouchableOpacity onPress={this.props.openModal}>
//             <Text style={styles.buttonText}>sign up</Text>
//           </TouchableOpacity>
//         </View>
//       )
//     }
// });
//
// var LoginRoute = {
//   app: {
//     component: LoginPage
//   }
// }
//
// var SignUpRoute = {
//   app: {
//     component: SignUpPage
//   }
// }

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});


class WelcomePage extends Component {
  /////////////////////////////////////////////////////////////
  // TO-DO: when Login and SignUp are configured            ///
  // Need to reconsider doing other methods instead of push ///
  /////////////////////////////////////////////////////////////

  constructor(props) {
     super(props);
     this.state = {
       loginVisible: false,
       signupVisible: false
     }
   }

   _setLoginVisible(visible) {
     this.setState({loginVisible: visible});
    }

    _setSignupVisible(visible) {
      this.setState({signupVisible: visible});
     }

  render() {
    return (
        <Image source={require('./Resources/landing_img_3.jpg')} style={styles.container}>
          <Modal
          animated={true}
          transparent={true}
          visible={this.state.signupVisible}
          onRequestClose={() => {this._setSignupVisible(false)}}>
            <View style={styles.modal}>
                <TouchableHighlight
                  onPress={this._setSignupVisible.bind(this, false)}>
                  Close
                </TouchableHighlight>
            </View>
          </Modal>

          <Text style={styles.brand}>
            Connoisseur
          </Text>
          <Text style={styles.description}>
            we match your taste
          </Text>
          <Button onPress={this._setSignupVisible.bind(this, true)}>
            PresentTGBHJBJ
          </Button>
        </Image>
    );
  }
}

// <TouchableHighlight
// onPress={this._setLoginVisible.bind(this, true)}
// style={[styles.button, styles.buttonGreen]}>
//   <Text style={ styles.buttonText }>login</Text>
// </TouchableHighlight>
// <TouchableHighlight
// onPress={this._setSignupVisible.bind(this, true)}
// style={[styles.button, styles.buttonBlack]}>
//   <Text style={ styles.buttonText }>sign up</Text>
// </TouchableHighlight>

module.exports = WelcomePage;
