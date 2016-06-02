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
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.thumb_url !== r2.thumb_url});

        this.state = {
          listings: "",
          token: "",
          dataSource: dataSource.cloneWithRows([])
        }

        AsyncStorage.getItem('token', (error, value) => {
          if (error) {
            alert('ERROR, can\'t find item: ' + err);
            console.log('ERROR, can\'t find item: ' + err);
          } else {
            this.setState({token: value});
            console.log('TOKEN IS ' + this.state.token);
              this._callBookmarkQuery();
          }
        });
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
      console.log('HAIIII GETTING NEW LIST');
      console.log(json);
      var length = json.message.length;
      var restaurants = new Array();
      for (var i = 0; i < length; i++) {
        restaurants.push(json.message[i].restaurant[0]);
      }
      // console.log(restaurants);

      var dataSource = new ListView.DataSource(
          {rowHasChanged: (r1, r2) => r1.thumb_url !== r2.thumb_url});
      this.setState({dataSource: dataSource.cloneWithRows(restaurants)});
      this.setState({listings: restaurants});
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
