import React from 'react';
import SearchPage from './SearchPageAccordion';
import BookMarked from './BookMarked';
import UserProfile from './UserProfile';
import Routes from './Routes';

import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Component,
  NavigatorIOS,
  AsyncStorage,
  Image
} from 'react-native';

const COLOR_RED = '#8C2621';
const COLOR_WHITE = '#EDEDED';

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  container: {
    flex: 1
  }
});

class TabBarPlatform extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'search',
      lastTab: 'search',
      notifCount: 0,
      presses: 0,
      token: "",
      bookmarks: null
    };

    AsyncStorage.getItem('token', (error, value) => {
      if (error) {
        alert('ERROR, can\'t find item: ' + err);
        console.log('ERROR, can\'t find item: ' + err);
      } else {
        this.setState({token: value});
      }
    });
  }

  _handleQueryResponse(json) {
    // console.log('XXXYYYZZZ');
    this.setState({bookmarks: json});
    // console.log(this.state.bookmarks);
    this.props.navigator.push({
      title: 'Bookmarked',
      component: BookMarked,
      passProps: {data: this.state.bookmarks, token: this.state.token},
      barTintColor: 'black',
      tintColor: COLOR_WHITE,
      titleTextColor: COLOR_WHITE,
      leftButtonIcon: require('./Resources/icon_left.png'),
      onLeftButtonPress: () => {
        this.props.navigator.pop();
        this.setState({selectedTab: this.state.lastTab});
      }
    });
  }

  _getBookmarks() {
    var query = Routes.getBookmarks;
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
        .catch((error) => console.log("Failed to GET bookmarks " + error));
  }

  render() {
    return (
      <TabBarIOS
        tintColor={COLOR_RED}
        barTintColor={COLOR_WHITE}>
        <TabBarIOS.Item
          icon={require('./Resources/icon_search.png')}
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search'
            });
          }}>
          <SearchPage {...this.props} token={this.state.token}></SearchPage>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./Resources/icon_heart.png')}
          selected={this.state.selectedTab === 'bookmarked'}
          onPress={() => {
            this._getBookmarks();
            this.setState({
              lastTab: this.state.selectedTab,
              selectedTab: 'bookmarked'
            });
          }}>
          <Image source={require('./Resources/landing_background_4.jpg')}></Image>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./Resources/icon_user.png')}
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.setState({
              selectedTab: 'profile'
            });
          }}>
          <UserProfile {...this.props}></UserProfile>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

module.exports = TabBarPlatform;
