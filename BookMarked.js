import React from 'react';

import css from './CSS';
import RestaurantView from './RestaurantView';
import Routes from './Routes';

import {
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component,
  AsyncStorage
} from 'react-native';

const COLOR_WHITE = '#EDEDED';

class BookMarked extends Component {

    constructor(props) {
      console.log('ASDFJVNJER');
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.thumb_url !== r2.thumb_url});

        var listings = this._retrieveRestaurants(this.props.data);

        this.state = {
          listings: listings,
          token: this.props.token,
          dataSource: dataSource.cloneWithRows(listings),
        }
    }

    _callBookmarkQuery() {
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

    _handleQueryResponse(json) {
      var dataSource = new ListView.DataSource(
          {rowHasChanged: (r1, r2) => r1.thumb_url !== r2.thumb_url});
      var listings = this._retrieveRestaurants(json);
      this.setState({listings: listings, dataSource: dataSource.cloneWithRows(listings)})
    }

    _retrieveRestaurants(json) {
      if (json.message === 'No bookmarks found for this user') {
        return {};
      }
      var length = json.message.length;
      var restaurants = new Array();
      for (var i = 0; i < length; i++) {
        restaurants.push(json.message[i].restaurant[0]);
      }
      return restaurants;
    }

    rowPressed(restaurantGUID) {
        var data = this.state.listings.filter(prop => prop.name === restaurantGUID)[0];

        this.props.navigator.push({
            title: restaurantGUID,
            component: RestaurantView,
            passProps: {data: data, bookmarked: true},
            barTintColor: 'black',
            tintColor: COLOR_WHITE,
            titleTextColor: COLOR_WHITE,
            leftButtonIcon: require('./Resources/icon_left.png'),
            onLeftButtonPress: () => {
              this.props.navigator.pop();
              this._callBookmarkQuery();
            }
        });
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.name)} underlayColor='#dddddd'>
                <View>
                    <View style={css.rowContainer}>
                        <Image style={css.thumb} source={{uri: rowData.imgPath}}/>
                        <View style={[css.textContainer, css.vCenter]}>
                            <Text style={[css.restaurantTitle]}>{rowData.name}</Text>
                            <Text style={[css.restaurantLocation]} numberOfLines={1}>{rowData.location}</Text>
                        </View>
                    </View>
                    <View style={css.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
      return (
        <Image source={require('./Resources/landing_background_4.jpg')} style={css.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}/>
        </Image>
      );
    }
}

module.exports = BookMarked;
