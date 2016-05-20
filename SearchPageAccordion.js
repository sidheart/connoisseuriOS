import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import SearchResults from './SearchResults';
import Routes from './Routes';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  PickerIOS,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component,
  AlertIOS,
  AsyncStorage
} from 'react-native';

var PickerItemIOS = PickerIOS.Item;

const BACON_IPSUM = 'abc';
const AccordionList = [
  {
    // Day
    title: 'Today is',
    identifier: 'day'
  },
  {
    // Time
    title: 'At',
    identifier: 'time'
  },
  {
    // Food Type
    title: 'I want to have',
    identifier: 'foodType'
  },
  {
    // Partner
    title: 'With',
    identifier: 'partner'
  },
  {
    // Location
    title: 'In',
    identifier: 'location'
  },
  {
    // Other Preference
    title: 'I would like',
    identifier: 'otherPreference'
  },
  {
    // Budget
    title: 'I want to spend per person',
    identifier: 'budget'
  }
];

const AccordionContent = {
  day: {
    options: ['No preference', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  time: {
    options: ['No preference', 'Before 8AM', '8AM', '8:30AM', '9AM', '9:30AM']
  },
  foodType: {
    options: ['No preference', 'Chinese', 'Korean', 'Japanese', 'Asian Fusion', 'Mexican', 'American', 'Italian', 'French']
  },
  partner: {
    options: ['No preference', 'Boss', 'Friend', 'Date', 'Girlfriend/Boyfried', 'Wife/Husband', 'Coworker', 'Client']
  },
  location: {
    options: ['No preference', 'Santa Monica', 'West Los Angeles']
  },
  otherPreference: {
    options: ['No preference', 'Reservations Available', 'Good for Family']
  },
  budget: {
    options: ['No preference', '<20', '20~40', '40~80', '80~150', '150+']
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
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
      day: 0,
      time: 0,
      foodType: 0,
      partner: 0,
      location: 0,
      otherPreference: 0,
      budget: 0
    };
    AsyncStorage.getItem('token', (error, value) => {
      if (error) {
        alert(err);
        console.log('ERROR, can\'t find item: ' + err);
      } else {
        alert(value);
        console.log('TOKEN SAVED: ' + value);
      }
    });
  }

  _toggleExpanded() {
    this.setState({collapsed: !this.state.collapsed});
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Text style={styles.headerText}>{section.title} {AccordionContent[section.identifier].options[this.state[section.identifier]] == 'No preference' ? '...' : AccordionContent[section.identifier].options[this.state[section.identifier]]}</Text>
      </Animatable.View>
    );
  }

  _handlePickerChange(identifier, newValue) {
    this.setState({[identifier]: newValue});
  }

  _renderContent(section, i, isActive) {
    // TO-DO: onValueChange needs to be added for pickerIOS
    var name = section.identifier;
    return (
      <Animatable.View duration={400} style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
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
    var query = urlForQueryAndPage(AccordionContent);
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
        message: 'Location not recognized; please try again.'
      });
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Accordion
          sections={AccordionList}
          renderHeader={this._renderHeader.bind(this)}
          renderContent={this._renderContent.bind(this)}
          duration={300}
        />
        <TouchableHighlight
        onPress={this._handleSubmit.bind(this)}>
          <Text style={{alignSelf: 'center'}}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = SearchPage;
