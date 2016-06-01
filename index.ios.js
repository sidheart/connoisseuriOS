import React from 'react-native';

import LoginPage from './LoginPage';

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

class PropertyFinderApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Login',
          component: LoginPage,
          navigationBarHidden: true
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('connoisseuriOS', function() { return PropertyFinderApp });
