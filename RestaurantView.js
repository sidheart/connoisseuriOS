import React from 'react';

import {
  StyleSheet,
  Image,
  View,
  Text,
  Component
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        marginTop: 65
    },
    heading: {
        backgroundColor: '#F8F8F8',
    },
    separator: {
        height: 1,
        backgroundColor: '#DDDDDD'
    },
    image: {
        width: 400,
        height: 300
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5,
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        margin: 5,
        color: '#656565'
    },
    description: {
        fontSize: 18,
        margin: 5,
        color: '#656565'
    }
});

class RestaurantView extends Component {

    render () {
        var data = this.props.data;
        var food_types = "";
        var meals = "";
        var tags = "";

        var location = (data.location === undefined) ?
            "No location is available for this restaurant" : data.location;
        var price = (data.price === undefined) ?
            "No pricing is available for this restaurant" : data.price;

        if (data.tags[0] !== undefined) {
            for(var propertyName in data.tags[0]) {
                if (data.tags[0] === true)
                    tags += propertyName;
            }
        }

        return (
            <View style={styles.container}>
                <Image source={require('./Resources/restaurant.png')} style={styles.image}/>
                <View style={styles.heading}>
                    <Text style={styles.title}>{data.name}</Text>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.title}>{data.location}</Text>
                    <Text style={styles.title}>{data.phone_number}</Text>
                    <View style={styles.separator}/>
                </View>
            </View>
        );
    }
}

module.exports = RestaurantView;
