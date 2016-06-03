import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import TabBarPlatform from './TabBarPlatform';
import Routes from './Routes';
import dismissKeyboard from 'dismissKeyboard';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  PickerIOS,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Dimensions,
  Component,
  AsyncStorage,
  TouchableWithoutFeedback
} from 'react-native';


var PickerItemIOS = PickerIOS.Item;
var { width, height } = Dimensions.get('window');
const COLOR_RED = '#8C2621';
const SMALL_FONT_SIZE = 15;
const ACCORDION_TOP = height*0.1;
const COLOR_WHITE = '#EDEDED';
const INPUT_WIDTH = width*0.7;
const INPUT_MARGIN = width*0.15;
const DESCRIPTION_MARGIN = width * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: INPUT_MARGIN,
    paddingRight: INPUT_MARGIN,
    width: null,
    height: null
  },
  intro: {
    top: -80
  },
  introText: {
    fontFamily: 'Bodoni 72',
    fontSize: 25,
    color: COLOR_WHITE,
    backgroundColor: 'transparent',
    fontWeight: '800',
    justifyContent: 'center',
    textAlign: 'center'
  },
  description: {
    fontFamily: 'Avenir',
    fontSize: SMALL_FONT_SIZE,
    textAlign: 'center',
    color: COLOR_WHITE,
    backgroundColor: 'transparent',
    marginLeft: DESCRIPTION_MARGIN,
    marginRight: DESCRIPTION_MARGIN,
    fontWeight: '700',
    paddingVertical: 10
  },
  header: {
    paddingVertical: 10
  },
  headerText: {
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: SMALL_FONT_SIZE,
    fontWeight: '500'
  },
  headerActive: {
    color: 'black',
    backgroundColor: COLOR_WHITE,
    width: INPUT_WIDTH,
    padding: 10
  },
  headerInactive: {
    color: COLOR_WHITE
  },
  content: {
    flex: 1
  },
  active: {
    backgroundColor: 'transparent'
  },
  inactive: {
    backgroundColor: 'transparent'
  },
  submitButtonView: {
    marginTop: -30
  },
  submitButton: {
    height: 40,
    flex: 1,
    width: INPUT_WIDTH,
    borderColor: COLOR_WHITE,
    backgroundColor: COLOR_WHITE,
    borderWidth: 1,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 0
  },
  buttonText: {
    fontFamily: 'Avenir',
    color: 'black',
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: SMALL_FONT_SIZE
  }
});

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      token: "",
      age: 0,
      gender: 0,
      diet: 0
    };
    AsyncStorage.getItem('token', (error, value) => {
      if (error) {
        console.log('ERROR, can\'t find item: ' + err);
      } else {
        this.setState({token: value});
        // console.log('TOKEN IS ' + this.state.token);
          var query = Routes.getUser;
          var object = {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': this.state.token
              }
          };

          fetch(query, object)
            .then((response) => response.json())
            .then((json) => this._handleQueryResponse(json))
            .catch((error) => console.log("Failed to GET user info" + error));
      }
    });
  }

  _handleQueryResponse(response) {
    this.setState({age: response.message[0].age, gender: response.message[0].gender, diet: response.message[0].dietary_preference});
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={ () => { dismissKeyboard() } }>
        <Image source={require('./Resources/landing_background_5.jpg')} style={styles.container}>
          <View style={styles.intro}>
              <Text style={styles.introText}>Everything about you...</Text>
          </View>
          <View>
              <Text style={styles.description}>Age - {this.state.age}</Text>
              <Text style={styles.description}>Gender - {this.state.gender}</Text>
              <Text style={styles.description}>Dietary Preference - {this.state.diet}</Text>
          </View>
        </Image>
      </TouchableWithoutFeedback>
    );
  }
}

module.exports = Survey;
