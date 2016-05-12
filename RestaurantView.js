import React from 'react';

import {
  StyleSheet,
  Image,
  View,
  Text,
  Component,
  MapView,
  RNGeocoder
} from 'react-native';

//import MapView from 'react-native-maps';
//var RNGeocoder = require('react-native-geocoder');

var styles = StyleSheet.create({
    container: {
        marginTop: 65
    },
    separator: {
        height: 1,
        backgroundColor: '#DDDDDD'
    },
    image: {
        width: 400,
        height: 250
    },
    mainText: {
        backgroundColor: '#F8F8F8',
        height: 175,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    supportText: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    fillerText: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    h1: {
        fontSize: 18,
        margin: 2,
        color: '#000000',
    },
    h2: {
        fontSize: 15,
        margin: 1,
        color: '#656565'
    }
});

class RestaurantView extends Component {

    render () {
        var data = this.props.data;
        console.log(data);
        var food_types = "";
        var meals = "";
        var tags = "";
        var lat = 34.020399;
        var long = -118.497316;

        var price = (data.price === undefined) ?
            "No pricing is available for this restaurant" : data.price;
        var address = (data.address === undefined) ?
            "No pricing is available for this restaurant" : data.address;

        if (data.tags[0] !== undefined) {
            for(var propertyName in data.tags[0]) {
                if (data.tags[0][propertyName] === true)
                    tags = tags + propertyName + " ";
            }
        }
        if (data.meals[0] !== undefined) {
            for(var propertyName in data.meals[0]) {
                if (data.meals[0][propertyName] === true)
                    meals = meals + propertyName + " ";
            }
        }
        if (data.food_types[0] !== undefined) {
            for(var propertyName in data.food_types[0]) {
                if (data.food_types[0][propertyName] === true)
                    food_types = food_types + propertyName + " ";
            }
        }

        var markers = [{
            latitude: lat,
            longitude: long,
            title: data.name,
            subtitle: address
        }];

        return (
            <View style={styles.container}>
                <Image source={require('./Resources/restaurant.png')} style={styles.image}/>
                <View style={styles.mainText}>
                    <Text style={styles.title}>{data.name}</Text>
                    <Text style={styles.h2}>{address}</Text>
                    <Text style={styles.h2}>{data.phone_number}</Text>
                    <Text style={styles.h1}>${price}</Text>
                    <View style={styles.separator}/>
                </View>
                {/*<View style={styles.supportText}>
                    <Text style={styles.h1}>{meals}</Text>
                    <View style={styles.separator}/>
                </View>
                <View style={styles.fillerText}>
                    <Text style={styles.h2}>{food_types}</Text>
                    <View style={styles.separator}/>
                    <Text style={styles.h2}>{tags}</Text>
                    <View style={styles.separator}/>
                </View>*/}
                <MapView
                    style={{
                        height: 250
                    }}
                    region={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.4,
                    }}
                    annotations={markers}
                />
            </View>
        );
    }
}

module.exports = RestaurantView;
