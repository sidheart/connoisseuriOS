import React from 'react';

import css from './CSS';

import {
    Image,
    View,
    Text,
    Component
} from 'react-native';

class RestaurantMenu extends Component {
    componentDidMount() {
        console.log("RestaurantMenu");
    }

    render() {
        return (<Text>Hello World</Text>);
    }
}

module.exports = RestaurantMenu;
