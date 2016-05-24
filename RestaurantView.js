import React from 'react';
import css from './CSS';
import RestaurantMenu from './RestaurantMenu';

import {
    Image,
    View,
    Text,
    Component,
    MapView,
    TouchableHighlight
} from 'react-native';

class RestaurantView extends Component {
    getLocationData(data) {
        if (data.address === undefined)
            return [];
        //console.log(data);
        return [{
            latitude: data.latitude,
            longitude: data.longitude,
            title: data.name,
            subtitle: data.address
        }];
    }

    getImage() {
        return(
            <View style={css.center}>
            <Image style={[css.image]} source={require('./Resources/restaurant.png')} />
        </View>
        )
    }

    getInfo(data, markers) {
        var price = (data.price === undefined) ?
            "No pricing is available for this restaurant" : data.price;
        var phone_number = (data.phone_number === undefined) ?
            "No phone number is available for this restaurant" : data.phone_number;

        return(<View style={[css.fill, css.spad, css.center]}>
            <Text style={[css.h1, css.skyblue, css.bold]}>{data.name}</Text>
            <Text style={[css.h4, css.gray]}>{markers[0].subtitle}</Text>
            <Text style={[css.h4, css.gray]}>{phone_number}</Text>
            <Text style={[css.h3, css.black]}>${price}</Text>
        </View>);
    }

    rowPressed(data) {
        this.props.navigator.push({
            title: 'Menu',
            component: RestaurantMenu,
            passProps: {data: data}
        });
    }

    getMenu(data, mapBool) {
        var menuBool = true;
        var menuSize = mapBool ? "oneTenth" : "oneFourth";
        var menuText = menuBool ? "Menu" : "No Available Menu";
            
        return(<TouchableHighlight onPress={() => this.rowPressed(data)} underlayColor='#dddddd' style={css[menuSize]}>
            <View style={[css[menuSize], css.center, css.bkGray]}>
                <Text style={[css.h2, css.white, css.bold]}>{menuText}</Text>
            </View>
        </TouchableHighlight>);
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
                {this.getImage()}
                <View style={css.separator}/>
                {this.getInfo(data, markers)}
                {this.getMenu(data, markers.length)}
                {this.getMap(markers)}
            </View>
        );
    }
}

module.exports = RestaurantView;
