import React from 'react';
import css from './CSS';
import RestaurantMenu from './RestaurantMenu';
import Routes from './Routes';

import {
    Image,
    View,
    Text,
    Component,
    MapView,
    TouchableHighlight,
    AsyncStorage,
} from 'react-native';

const COLOR_WHITE = '#EDEDED';

class RestaurantView extends Component {
    constructor(props) {
      super(props);

      this.state = {
        username: "",
        chosenRestaurant: false,
        bookMarkStatus: this.props.bookmarked? 'Bookmarked' : 'Bookmark here',
        token: ""
      }

      AsyncStorage.getItem('user', (error, username) => {
          if (error) {
              console.log("No user data");
          } else {
              this.setState({username: username});
              var tokenName = 'visitedRestaurant' + username;
              AsyncStorage.getItem(tokenName, (error, vrToken) => {
                  if (error) {
                      console.log("No dine-here data");
                  } else {
                      restaurantData = JSON.parse(vrToken);
                      if (restaurantData &&
                          this.props.data.restaurantId === restaurantData.restaurantId)
                          this.setState({chosenRestaurant: true});
                  }
              });
          }
      });

      AsyncStorage.getItem('token', (error, value) => {
        if (error) {
          alert('ERROR, can\'t find item: ' + err);
          console.log('ERROR, can\'t find item: ' + err);
        } else {
          this.setState({token: value});
          console.log('TOKEN IS ' + this.state.token);
        }
      });
    }

    componentWillReceiveProps(nextProps) {
    }

    getLocationData(data) {
        if (data.address === undefined)
            return [];
        return [{
            latitude: data.latitude,
            longitude: data.longitude,
            title: data.name,
            subtitle: data.address
        }];
    }

    getImage(imgPath) {
        return(
            <View style={css.center}>
                <Image style={[css.restaurantImage]} source={{uri: imgPath}} />
            </View>
        )
    }

    getInfo(data, markers) {
        var price = (data.price === undefined) ?
            "No pricing is available for this restaurant" : data.price;
        var phone_number = (data.phone_number === undefined) ?
            "No phone number is available for this restaurant" : data.phone_number;

        // TO-DO: need to see how price works
        return(
            <View style={css.center}>
                <Text style={css.restaurantName}>{data.name}</Text>
                <Text style={css.restaurantSub}>{markers[0].subtitle}</Text>
                <Text style={css.restaurantSub}>{phone_number}     ${price}</Text>
                <Text style={css.restaurantSub}></Text>
            </View>
        );
    }

    _menuPressed(data) {
        this.props.navigator.push({
            title: data.name + ' Menu',
            component: RestaurantMenu,
            passProps: {data: data},
            barTintColor: 'black',
            tintColor: COLOR_WHITE,
            titleTextColor: COLOR_WHITE,
            leftButtonIcon: require('./Resources/icon_left.png'),
            onLeftButtonPress: () => {
              this.props.navigator.pop();
            }
        });
    }

    getMenu(data, mapBool) {
        var buttonSize = mapBool ? "oneTenth" : "oneFourth";
        var text = data.menu ? "Menu" : "No Available Menu";

        return(
            <TouchableHighlight onPress={() => this._menuPressed(data)} underlayColor='#dddddd' style={[css.button]}>
                <View>
                    <Text style={css.buttonText}>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    _pickRestaurant(data) {
        var tokenName = 'visitedRestaurant' + this.state.username;
        var object = {
            restaurantId: data.restaurantId,
            restaurantName: data.name,
            timestamp: new Date().getTime()
        };

        AsyncStorage.setItem(tokenName, JSON.stringify(object), (err) => {
            if (err) {
                console.log(err);
                alert('Dine-here data could not be saved');
            } else {
                this.setState({chosenRestaurant: true});
            }
        });
    }

    _toggleBookMark() {
      console.log('ID IS ' + this.props.data.restaurantId);

      if (this.state.token && this.props.data.restaurantId && this.state.bookMarkStatus === 'Bookmark here') {
        console.log('POSTING SOON!!!');
          var query = Routes.addBookmark;
          var object = {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': this.state.token
              },
              body: JSON.stringify({
                  restaurantId: this.props.data.restaurantId
              })
          };

          fetch(query, object)
              .then((response) => this.setState({bookMarkStatus: 'Bookmarked'}))
              .catch((error) => console.log("Failed to POST bookmark"));
      }

      if (this.state.token && this.props.data.restaurantId && this.state.bookMarkStatus === 'Bookmarked') {
          var query = Routes.removeBookmark;
          var object = {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': this.state.token
              },
              body: JSON.stringify({
                  restaurantId: this.props.data.restaurantId
              })
          };

          fetch(query, object)
              .then((response) => this.setState({bookMarkStatus: 'Bookmark here'}))
              .catch((error) => console.log("Failed to POST bookmark"));
      }
    }

    getDineHere(data, mapBool) {
        // var buttonSize = mapBool ? "oneTenth" : "oneFourth";
        if (! this.state.chosenRestaurant)
            return(
                <TouchableHighlight onPress={() => this._pickRestaurant(data)} style={css.button}>
                        <Text style={css.buttonText}>Dine here!</Text>
                </TouchableHighlight>
            );
        else
            return(
                <View style={css.button}>
                    <Text style={css.buttonText}>Ready to dine!</Text>
                </View>
            );
    }

    getBookMark(data) {
      return(
        <TouchableHighlight onPress={() => this._toggleBookMark()} style={[css.button, css.buttonRight]}>
              <Text style={css.buttonText}>{this.state.bookMarkStatus}</Text>
        </TouchableHighlight>
        )
    }

    getMap(markers) {
        if (markers.length === 0)
            return;

        return (
            <MapView
                style={{marginTop: 20, height: 250}}
                region={{
                    latitude: markers[0].latitude,
                    longitude: markers[0].longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                annotations={markers}
            />
        )
    }

    render() {
        var data = this.props.data;
        // var data = this.state.data;
        var markers = this.getLocationData(data);

        return (
            <View style={[css.container]}>
                {this.getImage(data.imgPath)}
                {this.getInfo(data, markers)}
                <View style={css.row}>
                    {this.getMenu(data, markers.length)}
                </View>
                <View style={[css.row, css.extraPadding]}>
                    {this.getDineHere(data, markers.length)}
                    {this.getBookMark(data)}
                </View>
                {this.getMap(markers)}
            </View>
        );
    }
}

module.exports = RestaurantView;
