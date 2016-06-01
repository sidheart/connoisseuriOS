import React from 'react';
import css from './CSS';
import RestaurantMenu from './RestaurantMenu';

import {
    Image,
    View,
    Text,
    Component,
    MapView,
    TouchableHighlight,
    AsyncStorage,
} from 'react-native';

class RestaurantView extends Component {
    componentWillMount() {
        this.setState({username: ""});
        this.setState({chosenRestaurant: false});

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
                <Image style={[css.image]} source={{uri: imgPath}} />
            </View>
        )
    }

    getInfo(data, markers) {
        var price = (data.price === undefined) ?
            "No pricing is available for this restaurant" : data.price;
        var phone_number = (data.phone_number === undefined) ?
            "No phone number is available for this restaurant" : data.phone_number;

        return(
            <View style={[css.fill, css.spad, css.center]}>
                <Text style={[css.h1, css.skyblue, css.bold]}>{data.name}</Text>
                <Text style={[css.h4, css.gray]}>{markers[0].subtitle}</Text>
                <Text style={[css.h4, css.gray]}>{phone_number}</Text>
                <Text style={[css.h3, css.black]}>${price}</Text>
            </View>
        );
    }

    _menuPressed(data) {
        this.props.navigator.push({
            title: 'Menu',
            component: RestaurantMenu,
            passProps: {data: data}
        });
    }

    getMenu(data, mapBool) {
        var buttonSize = mapBool ? "oneTenth" : "oneFourth";
        var text = data.menu ? "Menu" : "No Available Menu";

        return(
            <TouchableHighlight onPress={() => this._menuPressed(data)} underlayColor='#dddddd' style={[css[buttonSize], css.oneHalfWidth]}>
                <View style={[css[buttonSize], css.center, css.bkGray,
                        {borderRightWidth: 2, borderRightColor: '#EEEEEE' }]}>
                    <Text style={[css.h2, css.white, css.bold]}>{text}</Text>
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

    getDineHere(data, mapBool) {
        var buttonSize = mapBool ? "oneTenth" : "oneFourth";
        if (! this.state.chosenRestaurant)
            return(
                <TouchableHighlight onPress={() => this._pickRestaurant(data)} underlayColor='#dddddd' style={[css[buttonSize], css.oneHalfWidth]}>
                    <View style={[css[buttonSize], css.center, css.bkGray]}>
                        <Text style={[css.h2, css.white, css.bold]}>Dine here!</Text>
                    </View>
                </TouchableHighlight>
            );
        else
            return(
                <View style={[css[buttonSize], css.center, css.bkSkyblue, css.oneHalfWidth]}>
                    <Text style={[css.h2, css.white, css.bold]}>Ready to dine!</Text>
                </View>
            );
    }

    getMap(markers) {
        if (markers.length === 0)
            return;

        return (
            <MapView
                style={[css.oneFourth]}
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
        var markers = this.getLocationData(data);

        return (
            <View style={[css.container]}>
                {this.getImage(data.imgPath)}
                <View style={css.separator}/>
                {this.getInfo(data, markers)}
                <View style={css.separator}/>
                <View style={css.rowContainer}>
                    {this.getMenu(data, markers.length)}
                    {this.getDineHere(data, markers.length)}
                </View>
                {this.getMap(markers)}
            </View>
        );
    }
}

module.exports = RestaurantView;
