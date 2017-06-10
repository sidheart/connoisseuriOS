const no_rating_delay = true;

import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import SearchResults from './SearchResults';
import Routes from './Routes';
import dismissKeyboard from 'dismissKeyboard';
import Ratings from './Ratings';
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
  AlertIOS,
  AsyncStorage,
  TouchableWithoutFeedback
} from 'react-native';


var PickerItemIOS = PickerIOS.Item;


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
                       // Location
                       title: 'We would like to eat near',
                       identifier: 'location'
                       },
                       {
                       // Budget
                       title: 'We want to pay per person',
                       identifier: 'budget'
                       }
                       ];

const AccordionContent = {
time: {
options: ['No preference', 'Breakfast', 'Brunch', 'Lunch', 'Dinnner', 'Coffee', 'Drinks', 'Happy Hour']
},
foodType: {
options: ['No preference', 'All American', 'Asian', 'Bakery', 'British', 'Chinese', 'French', 'Fusion', 'German', 'Greek',
          'Indian', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Middle Eastern', 'Pizza', 'Seafood', 'Seasonal or Local', 'South_american',
          'Steakhouse', 'Sushi', 'Sushi Bar', 'Tapas', 'Thai', 'Vegan']
},
location: {
options: ['No preference', 'Santa Monica', 'West Los Angeles']
},
budget: {
options: ['No preference', '<20', '20~40', '40~80', '80~150', '150+']
}
};



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
    otherPreference: 0,
    username: "",
    chosenRestaurant: false,
    token: "",
    bookmarkIds: []
    };
    AsyncStorage.getItem('token', (error, value) => {
                         if (error) {
                         console.log('ERROR, can\'t find item: ' + err);
                         } else {
                         this.setState({token: value});
                         }
                         });
    
    AsyncStorage.getItem('user', (error, userValue) => {
                         if (error) {
                         console.log("No user data");
                         } else {
                         this.setState({username: userValue});
                         var tokenName = 'visitedRestaurant' + userValue;
                         AsyncStorage.getItem(tokenName, (error, restValue) => {
                                              if (error) {
                                              console.log("No dine-here data");
                                              } else {
                                              var restaurantValue = JSON.parse(restValue);
                                              if (restaurantValue)
                                              this._checkRatings(restaurantValue, tokenName);
                                              }
                                              });
                         }
                         });
  }
  
  _gotoRatings(data, tokenName) {
    this.props.navigator.push({
                              component: Ratings,
                              navigationBarHidden: true,
                              passProps: {visitedRestaurant: data, username: tokenName}
                              });
  }
  
  _checkRatings (data, tokenName) {
    var currentdate = new Date();
    var alertBool = (no_rating_delay)
    ? (currentdate.getTime() - data.timestamp)
    : (Math.floor((currentdate.getTime() - data.timestamp)/3600000));
    
    if (alertBool > 0) {
      AlertIOS.alert(
                     'You have a rating pending for ' + data.restaurantName + '!',
                     null,
                     [{text: 'OK', onPress: () => this._gotoRatings(data, tokenName)}]
                     )
    }
  }
  
  _toggleExpanded() {
    this.setState({collapsed: !this.state.collapsed});
  }
  
  _renderHeader(section, i, isActive) {
    return (
            <Animatable.View duration={600} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
            <Text style={[styles.headerText, isActive? styles.headerActiveAccordion: styles.headerInactiveAccordion]}>{section.title} {this.state[section.identifier] == 0 ? '...' : AccordionContent[section.identifier].options[this.state[section.identifier]]}</Text>
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
    // console.log(query);
    //this.setState( {isLoading: true} );
    
    var object = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
    };
    
    //alert('Your current token is: ' + value);
    // console.log('TOKEN SAVED: ' + value);
    fetch(query, object)
    .then((response) => response.json())
    .then((json) => this._handleQueryResponse(json))
    .catch((error) => {
           console.log(error);
           });
  }
  
  _handleSubmit() {
    var query = Routes.search;
    /*
     var q = [];
     if (this.state.time !== 0) {
     var tempStr = 'meals={"' + AccordionContent['time'].options[this.state.time].toString().toLowerCase().replace(' ', '_') + '":true}';
     q.push(tempStr);
     }
     if (this.state.foodType !== 0) {
     var tempStr = 'food_types={"' + AccordionContent['foodType'].options[this.state.foodType].toString().toLowerCase().replace(' ', '_') + '":true}';
     q.push(tempStr);
     }
     
     if (q.length > 0) {
     query += '?' + q.join('&');
     }
     */
    
    this._executeQuery(query);
    
    //alert('day ' + AccordionContent['day'].options[this.state.day] + '; ' +
    //'time ' + AccordionContent['time'].options[this.state.time] + '; ' +
    //'foodType ' + AccordionContent['foodType'].options[this.state.foodType] + '; ' +
    //'partner ' + AccordionContent['partner'].options[this.state.partner] + '; ' +
    //'location ' + AccordionContent['location'].options[this.state.location] + '; ' +
    //'otherPreference ' + AccordionContent['otherPreference'].options[this.state.otherPreference] + '; ' +
    //'budget ' + AccordionContent['budget'].options[this.state.budget] + ';');
  }
  
  _handleQueryResponse(responses) {
    this.setState({
                  isLoading: false,
                  message: ''
                  });
    
    // console.log('responsehnjerbnfhjs');
    // console.log(response);
    
    if (responses.length > 0) {
      this.props.navigator.push({
                                title: 'Results',
                                component: SearchResults,
                                passProps: {listings: responses, bookmarks: this.state.bookmarkIds},
                                barTintColor: 'black',
                                tintColor: COLOR_WHITE,
                                titleTextColor: COLOR_WHITE,
                                leftButtonIcon: require('./Resources/icon_left.png'),
                                onLeftButtonPress: () => {
                                this.props.navigator.pop();
                                }
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
            <Image source={require('./Resources/home_page.jpg')} style={styles.containerUserAccordionSurvey}>
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
            <Text style={styles.descriptionAccordion}>{this.state.message}</Text>
            </Image>
            </TouchableWithoutFeedback>
            );
  }
}

module.exports = SearchPage;