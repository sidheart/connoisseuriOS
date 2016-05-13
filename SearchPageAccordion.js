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

// var styles = StyleSheet.create({
//   description: {
//     fontFamily: 'Cochin',
//     marginBottom: 20,
//     fontSize: 18,
//     textAlign: 'center',
//     color: '#275B8A'
//   },
//   container: {
//     padding: 30,
//     marginTop: 65,
//     alignItems: 'center'
//   },
//   flowRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'stretch'
//   },
//   buttonText: {
//     fontSize: 18,
//     color: 'white',
//     alignSelf: 'center',
//     fontFamily: 'Cochin'
//   },
//   button: {
//     height: 36,
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#275B8A',
//     borderColor: '#275B8A',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 10,
//     alignSelf: 'stretch',
//     justifyContent: 'center'
//   },
//   searchInput: {
//     height: 36,
//     padding: 5,
//     marginRight: 5,
//     flex: 4,
//     fontSize: 18,
//     borderWidth: 1,
//     borderColor: '#275B8A',
//     borderRadius: 8,
//     color: '#275B8A',
//     fontFamily: 'Cochin'
//   },
//   image: {
//     width: 217,
//     height: 138
//   }
// });
//
// function urlForQueryAndPage(key, value, pageNumber) {
//   var data = {
//     country: 'uk',
//     pretty: '1',
//     encoding: 'json',
//     listing_type: 'buy',
//     action: 'search_listings',
//     page: pageNumber
//   };
//
//   data[key] = value;
//
//   var querystring = Object.keys(data)
//   .map(key => key + '=' + encodeURIComponent(data[key]))
//   .join('&');
//
//   var q = 'name' + '=' + value;
//
//   return 'http://localhost:3000/search?' + q;// + querystring;
// }
//
// class SearchPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchString: '',
//       isLoading: false,
//       message: ''
//     };
//   }
//
//   onSearchTextChanged(event) {
//     this.setState({
//       searchString: event.nativeEvent.text
//     });
//   }
//
//   _executeQuery(query) {
//     console.log(query);
//     this.setState( {isLoading: true} );
//
//     fetch(query, {method: "GET"})
//         .then((response) => response.json())
//         .then((json) => this._handleResponse(json))
//         .catch(error =>
//             this.setState({
//               isLoading: false,
//               message: 'Something bad happened ' + error
//             }));
//
//     /*
//     fetch(query, {method: "GET}"})
//     .then(response => response.json())
//     .then(responseData => this._handleResponse(responseData))
//     .catch(error =>
//       this.setState({
//         isLoading: false,
//         message: 'Something bad happened ' + error
//       }));
//       */
//   }
//
//   _handleResponse(response) {
//     this.setState({
//       isLoading: false,
//       message: ''
//     });
//
//     if (response.length > 0) {
//       this.props.navigator.push({
//         title: 'Results',
//         component: SearchResults,
//         passProps: {listings: response}
//       });
//     } else {
//       this.setState({
//         message: 'Location not recognized; please try again.'
//       });
//     }
//
//   }
//
//   onSearchPressed() {
//     var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
//     this._executeQuery(query);
//   }
//
//   render() {
//     var spinner = this.state.isLoading ?
//         ( <ActivityIndicatorIOS size='large'/> ) : ( <View/> );
//
//     return (
//       <View style={styles.container}>
//         <Image source={require('./Resources/restaurant_1.jpg')} style={styles.image}/>
//         <Text style={styles.description}>
//           Search for the best dining locations in Santa Monica!
//         </Text>
//         <Text style={styles.description}>
//           Search by restaurant name.
//         </Text>
//         <View style={styles.flowRight}>
//           <TextInput
//             style={styles.searchInput}
//             value={this.state.searchString}
//             onChange={this.onSearchTextChanged.bind(this)}
//             placeholder='Search via name or postcode'/>
//           <TouchableHighlight style={styles.button}
//               onPress={this.onSearchPressed.bind(this)}
//               underlayColor='#99d9f4'>
//             <Text style={styles.buttonText}>Go</Text>
//           </TouchableHighlight>
//         </View>
//         {spinner}
//         <Text style={styles.description}>{this.state.message}</Text>
//       </View>
//     );
//   }
// }

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
        console.log('ID SAVED MESSAHE AJJJ id saved: ' + value);
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
