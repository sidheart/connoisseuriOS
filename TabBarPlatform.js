import React from 'react';
import SearchPage from './SearchPageAccordion';

import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Component,
  NavigatorIOS
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

// <NavigatorIOS
//   {...this.props}
//   style={styles.container}
//     initialRoute={{
//         title : 'SearchPage',
//         component: SearchPage,
//         navigationBarHidden: true
//        }}
// />

// <SearchPage navigator={this.props.navigator}></SearchPage>

class TabBarPlatform extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'search',
      notifCount: 0,
      presses: 0
    };
  }

  _renderContent(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
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
          }}
          >
          <SearchPage {...this.props}></SearchPage>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./Resources/icon_heart.png')}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab'
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./Resources/icon_user.png')}
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab'
            });
          }}>
          {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

module.exports = TabBarPlatform;
