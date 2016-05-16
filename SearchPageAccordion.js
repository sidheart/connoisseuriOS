import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import SearchResults from './SearchResults';

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
    title: 'Today is...',
    identifier: 'day'
  },
  {
    // Time
    title: 'At...',
    identifier: 'time'
  },
  {
    // Food Type
    title: 'I want to have...',
    identifier: 'foodType'
  },
  {
    // Partner
    title: 'With',
    identifier: 'partner'
  },
  {
    // Location
    title: 'In...',
    identifier: 'location'
  },
  {
    // Other Preference
    title: 'I would like...',
    identifier: 'otherPreference'
  },
  {
    // Budget
    title: 'I want to spend...Per Person',
    identifier: 'budget'
  }
];

const AccordionContent = {
  day: {
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  time: {
    options: ['Before 8AM', '8AM', '8:30AM', '9AM', '9:30AM']
  },
  foodType: {
    options: ['Chinese', 'Korean', 'Japanese', 'Asian Fusion', 'Mexican', 'American', 'Italian', 'French']
  },
  partner: {
    options: ['Boss', 'Friend', 'Date', 'Girlfriend/Boyfried', 'Wife/Husband']
  },
  location: {
    options: ['Santa Monica']
  },
  otherPreference: {
    options: ['Reservations Available', 'Good for Family']
  },
  budget: {
    options: ['<20', '20~40', '40~80', '80~150', '150+']
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

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };

    AsyncStorage.getItem('token', (error, value) => {
      if (error) {
        alert('ERROR, can\'t find item: ' + err);
        console.log('ERROR, can\'t find item: ' + err);
      } else {
        alert('Your current token is: ' + value);
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
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }


  _renderContent(section, i, isActive) {
    // TO-DO: onValueChange needs to be added for pickerIOS
    return (
      <Animatable.View duration={400} style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Animatable.View animation={isActive ? 'bounceInLeft' : undefined}>
          <PickerIOS>
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

  render() {
    return (
      <View style={styles.container}>
        <Accordion
          sections={AccordionList}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          duration={300}
        />
      </View>
    );
  }
}

module.exports = SearchPage;
