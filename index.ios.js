import React from 'react-native';

import WelcomePage from './WelcomePage';

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
  }
});

class PropertyFinderApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Login or Sign Up',
          component: WelcomePage,
          navigationBarHidden: true
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('connoisseuriOS', function() { return PropertyFinderApp });
