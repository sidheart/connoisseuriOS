import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import SearchResults from './SearchResults';
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
  AlertIOS,
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

const AccordionList = [
  {
    // Time
    title: 'I need to find a place for',
    identifier: 'time'
  },
  {
    // Food Type
    title: 'I feel like',
    identifier: 'foodType'
  },
  {
    // Partner
    title: 'I am with',
    identifier: 'partner'
  },
  {
    // Location
    title: 'We would like to eat near',
    identifier: 'location'
  },
  {
    // Budget
    title: 'We want to pay per person',
    identifier: 'budget'
  },
  {
    // Other Preference
    title: 'And it should be somewhere',
    identifier: 'otherPreference'
  }
];

const AccordionContent = {
  time: {
    options: ['No preference', 'Breakfast', 'Brunch', 'Lunch', 'Dinnner']
  },
  foodType: {
    options: ['No preference', 'Open to suggestions', 'All American', 'Asian', 'Bakery', 'British', 'Chinese', 'French', 'Fusion', 'German', 'Greek',
            'Indian', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Middle Eastern', 'Pizza', 'Seafood', 'Seasonal or Local', 'South_american',
            'Steakhouse', 'Sushi', 'Sushi Bar', 'Tapas', 'Thai', 'Vegan']
  },
  partner: {
    options: ['No preference', 'Clients', 'A hot date', 'Friends', 'Children', 'My dog', 'A group of friends', 'A vegan', 'My parents', 'Someone I want to impress']
  },
  location: {
    options: ['No preference', 'Santa Monica', 'West Los Angeles']
  },
  budget: {
    options: ['No preference', '<20', '20~40', '40~80', '80~150', '150+']
  },
  otherPreference: {
    options: ['No preference', 'I can bring my dog', 'Vegetarian friendly', 'With a good happy hour', 'With healthy options', 'With a good review',
              'That takes reservations', 'Good for groups', 'With valet', 'With a patio', 'Where I can see celebrities']
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: INPUT_MARGIN,
    paddingRight: INPUT_MARGIN,
    width: null,
    height: null
  },
  accordion: {
    top: -50
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

function urlForQueryAndPage(AccordionContent) {

  AsyncStorage.getItem('token', (error, value) => {
    if (error) {
      console.log('ERROR, can\'t find item: ' + err);
    } else {
      console.log('TOKEN SAVED: ' + value);
    }
  });

  //var q = 'name' + '=' + value;

  return Routes.search;// + q;// + querystring;
}

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      time: 0,
      foodType: 0,
      partner: 0,
      location: 0,
      budget: 0,
      otherPreference: 0
    };
    AsyncStorage.getItem('token', (error, value) => {
      if (error) {
        // alert(err);
        console.log('ERROR, can\'t find item: ' + err);
      } else {
        // alert(value);
        console.log('TOKEN SAVED: ' + value);
      }
    });
  }

  _toggleExpanded() {
    this.setState({collapsed: !this.state.collapsed});
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={600} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Text style={[styles.headerText, isActive? styles.headerActive : styles.headerInactive]}>{section.title} {AccordionContent[section.identifier].options[this.state[section.identifier]] == 'No preference' ? '...' : AccordionContent[section.identifier].options[this.state[section.identifier]]}</Text>
      </Animatable.View>
    );
  }

  _handlePickerChange(identifier, newValue) {
    this.setState({[identifier]: newValue});
  }

  _renderContent(section, i, isActive) {
    var name = section.identifier;
    return ( // TODO: Can remove slideInLeft animation to make it faster
      <Animatable.View duration={600} style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Animatable.View animation={isActive ? 'slideInLeft' : undefined}>
          <PickerIOS
          selectedValue={this.state[name]}
          onValueChange={this._handlePickerChange.bind(this, section.identifier)}
          >
          {AccordionContent[section.identifier].options.map((valueName, valueIndex) => (
                      <PickerItemIOS
                        style={{color: 'red'}}
                        key={section.identifier + ' ' + valueName}
                        value={valueIndex}
                        label={valueName}
                      />
          ))}
          </PickerIOS>
        </Animatable.View>
      </Animatable.View>
    );
  }

  _executeQuery(query) {
    console.log(query);
    //this.setState( {isLoading: true} );

    var object = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ''
      }
    };

    AsyncStorage.getItem('token', (error, value) => {
      if (error) {
        alert('ERROR, can\'t find item: ' + err);
        console.log('ERROR, can\'t find item: ' + err);
      } else {
        object.headers.Authorization = value;
        //alert('Your current token is: ' + value);
        console.log('TOKEN SAVED: ' + value);
        fetch(query, object)
          .then((response) => response.json())
          .then((json) => this._handleQueryResponse(json))
          .catch((error) => {
            console.log(error);
          });
      }
    });
    console.log(object); console.log(query);

  }

  _handleSubmit() {
    var query;
    console.log('HIIIIIIIIII ' + this.state.foodType);
    if (this.state.foodType !== 0) {
      console.log('whould be herererere!');
      query = Routes.search + '?food_types={"' + AccordionContent['foodType'].options[this.state.foodType].toString().toLowerCase().replace(' ', '_') + '":true}';
    }
    else {
      query = Routes.search;
    }

        // 'time=' + this.state.time + '&foodType=' + this.state.foodType + '&partner=' + this.state.partner +
        //     '&location=' + this.state.location + '&budget=' + this.state.budget + '&otherPreference' + this.state.otherPreference;

    console.log(query);
    this._executeQuery(query);

    //alert('day ' + AccordionContent['day'].options[this.state.day] + '; ' +
    //'time ' + AccordionContent['time'].options[this.state.time] + '; ' +
    //'foodType ' + AccordionContent['foodType'].options[this.state.foodType] + '; ' +
    //'partner ' + AccordionContent['partner'].options[this.state.partner] + '; ' +
    //'location ' + AccordionContent['location'].options[this.state.location] + '; ' +
    //'otherPreference ' + AccordionContent['otherPreference'].options[this.state.otherPreference] + '; ' +
    //'budget ' + AccordionContent['budget'].options[this.state.budget] + ';');
  }

  _handleQueryResponse(response) {
    this.setState({
      isLoading: false,
      message: ''
    });

    if (response.length > 0) {
      this.props.navigator.push({
        title: 'Results',
        component: SearchResults,
        passProps: {listings: response}
      });
    } else {
      this.setState({
        message: 'No results found. Please try a different selection.'
      });
    }

  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={ () => { dismissKeyboard() } }>
        <Image source={require('./Resources/landing_background_3.jpg')} style={styles.container}>
          <View style={styles.accordion}>
            <Accordion
              sections={AccordionList}
              renderHeader={this._renderHeader.bind(this)}
              renderContent={this._renderContent.bind(this)}
              duration={300}
            />
          </View>
          <View style={styles.submitButtonView}>
            <TouchableHighlight
            onPress={this._handleSubmit.bind(this)}
            style={styles.submitButton}>
              <Text style={styles.buttonText}>submit</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.description}>{this.state.message}</Text>
        </Image>
      </TouchableWithoutFeedback>
    );
  }
}

module.exports = SearchPage;
