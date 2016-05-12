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
        alignItems: 'center'
    },
    supportText: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fillerText: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#48BBEC',
        padding: 10
    },
    h1: {
        fontSize: 22,
        margin: 5,
        color: '#000000'
    },
    h2: {
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

        return (
            <View style={styles.container}>
                <Image source={require('./Resources/restaurant.png')} style={styles.image}/>
                <View style={styles.mainText}>
                    <Text style={styles.title}>{data.name}</Text>
                    <Text style={styles.h1}>{data.phone_number}</Text>
                    <Text style={styles.h1}>${price}</Text>
                    <Text style={styles.h1}>{location}</Text>
                    <View style={styles.separator}/>
                </View>
                <View style={styles.supportText}>
                    <Text style={styles.h2}>{meals}</Text>
                    <View style={styles.separator}/>
                </View>
                <View style={styles.fillerText}>
                    <Text style={styles.h2}>{food_types}</Text>
                    <View style={styles.separator}/>
                    <Text style={styles.h2}>{tags}</Text>
                    <View style={styles.separator}/>
                </View>
            </View>
        );
    }
}

module.exports = RestaurantView;
