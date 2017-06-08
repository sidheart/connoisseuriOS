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
  AlertIOS,
  AsyncStorage,
  TouchableWithoutFeedback
} from 'react-native';


var PickerItemIOS = PickerIOS.Item;


const AccordionList = [
  {
    // age
    title: 'Age',
    identifier: 'age'
  },
  {
    // gender
    title: 'Gender',
    identifier: 'gender'
  },
  {
    // Dietary Preference
    title: 'Dietary Preference',
    identifier: 'diet'
  }
];

const AccordionContent = {
  age: {
    options: ['Prefer not to disclose', '20 and under', '21~25', '26~30', '31~35', '36~40', '41~45', '46~50', '51~55', '56~60', '60+']
  },
  gender: {
    options: ['Prefer not to disclose', 'Male', 'Female']
  },
  diet: {
    options: ['Open to All', 'Vegetarian', 'Vegan', 'Gluten Free', 'Organic']
  }
};


function urlForQueryAndPage(AccordionContent) {

  AsyncStorage.getItem('token', (error, value) => {
    if (error) {
      console.log('ERROR, can\'t find item: ' + err);
    } else {
      // console.log('TOKEN SAVED: ' + value);
    }
  });

  //var q = 'name' + '=' + value;

  return Routes.updateUser;// + q;// + querystring;
}

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      age: 0,
      gender: 0,
      diet: 0
    };
    AsyncStorage.getItem('token', (error, value) => {
      if (error) {
        // alert(err);
        console.log('ERROR, can\'t find item: ' + err);
      } else {
        // alert(value);
        // console.log('TOKEN SAVED: ' + value);
      }
    });
  }

  _toggleExpanded() {
    this.setState({collapsed: !this.state.collapsed});
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={600} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Text style={[styles.headerText, isActive? styles.headerActive : styles.headerInactive]}>{section.title} {this.state[section.identifier] == 0 ? '...' : AccordionContent[section.identifier].options[this.state[section.identifier]]}</Text>
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
      method: 'POST',
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
        // console.log('TOKEN SAVED: ' + value);
        fetch(query, object)
          .then((response) => response.json())
          .then((json) => this._handleQueryResponse(json))
          .catch((error) => {
            console.log(error);
          });
      }
    });
    //console.log(object); console.log(query);
  }

  _handleSubmit() {
    var query = Routes.updateUser;
    var q = [];
    if (this.state.age !== 0) {
      var tempStr = 'age=' + AccordionContent['age'].options[this.state.age].toString().toLowerCase().replace(' ', '_');
      q.push(tempStr);
    }
    if (this.state.gender !== 0) {
      var tempStr = 'gender=' + AccordionContent['gender'].options[this.state.gender].toString().toLowerCase().replace(' ', '_');
      q.push(tempStr);
    }
    if (this.state.diet !== 0) {
      var tempStr = 'dietary_preference=' + AccordionContent['diet'].options[this.state.diet].toString().toLowerCase().replace(' ', '_');
      q.push(tempStr);
    }

    if (q.length > 0) {
      query += '?' + q.join('&');
    }

    // console.log(query);
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
    if (response.success) {
      this.props.navigator.push({
        title: 'TabBarPlatform',
        component: TabBarPlatform,
        navigationBarHidden: true
      });
    } else {
      this.setState({
        message: 'Profile Construction Failed: ' + response.message
      });
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={ () => { dismissKeyboard() } }>
        <Image source={require('./Resources/landing_background_5.jpg')} style={styles.containerUserAccordionSurvey}>
          <View style={styles.intro}>
              <Text style={styles.introText}>Allow us to learn more about you...</Text>
          </View>
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
              <Text style={styles.buttonText}>save my info!</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.description}>{this.state.message}</Text>
        </Image>
      </TouchableWithoutFeedback>
    );
  }
}

module.exports = Survey;
