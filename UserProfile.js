import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import TabBarPlatform from './TabBarPlatform';
import Routes from './Routes';
import dismissKeyboard from 'dismissKeyboard';
import styles from './CSS';
import {
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
        <Image source={require('./Resources/landing_background_5.jpg')} style={styles.containerUserAccordionSurvey}>
          <View style={styles.intro}>
              <Text style={styles.introText}>Everything about you...</Text>
          </View>
          <View>
              <Text style={styles.descriptionUser}>Age - {this.state.age}</Text>
              <Text style={styles.descriptionUser}>Gender - {this.state.gender}</Text>
              <Text style={styles.descriptionUser}>Dietary Preference - {this.state.diet}</Text>
          </View>
        </Image>
      </TouchableWithoutFeedback>
    );
  }
}

module.exports = Survey;
