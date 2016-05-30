import React from 'react';

import css from './CSS';
import Routes from './Routes';

import {
    View,
    Text,
    Component,
    TouchableHighlight,
    StyleSheet,
    AsyncStorage,
    NavigatorIOS
} from 'react-native';

var styles = StyleSheet.create({
    separator: {
        height: 10
    }
});

class Ratings extends Component {
    componentWillMount() {
        this.setState({token: -1});
        this.setState({restaurantId: this.props.visitedRestaurant.restaurantId});
        this.setState({restaurantName: this.props.visitedRestaurant.restaurantName});
        
        AsyncStorage.getItem('token', (error, value) => {
            if (error) {
                alert('ERROR, can\'t find item: ' + err);
                console.log('ERROR, can\'t find item: ' + err);
            } else {
                this.setState({token: value});
            }
        });
    }

    rowPressed(rating) {
        if (this.state.token && this.state.restaurantId && rating !== 'nogo') {
            var query = Routes.addRating;
            var object = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token
                },
                body: JSON.stringify({
                    restaurantId: this.state.restaurantId,
                    rating: rating
                })
            };

            fetch(query, object)
                .catch(error =>
                    this.setState({
                        isLoading: false,
                        message: 'Something bad happened ' + error
                    }));
        }

        AsyncStorage.setItem(this.props.username, JSON.stringify({}), (err) => {
            if (err) {
                console.log(err);
                alert('visitedRestaurant could not be saved');
            }
        });

        this.props.navigator.pop();
    }

    getButton(buttonText, rating) {
        return(
            <TouchableHighlight onPress={() => this.rowPressed(rating)}
                                underlayColor='#dddddd' style={[css.oneSixth]}>
                <View style={[css.oneSixth, css.center, css.bkGray]}>
                    <Text style={[css.h2, css.white, css.bold, css.center]}>{buttonText}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    getHeader() {
        var name = (this.state.restaurantName) ? this.state.restaurantName : "the restaurant";
        return (
            <View style={[css.oneTenth, css.center]}>
                <Text style={[css.h2, css.gray, css.bold]}>How did you feel about {name}?</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={[css.fill, css.lpad]}>
                <View style={styles.separator} />
                <View style={styles.separator} />
                <View style={styles.separator} />
                <View style={styles.separator} />
                <View style={styles.separator} />

                {this.getHeader()}

                <View style={styles.separator} />
                <View style={styles.separator} />
                <View style={styles.separator} />

                {this.getButton("Loved it! 😍😋", "love")}

                <View style={styles.separator} />

                {this.getButton("Liked it. 😄😊", "like")}

                <View style={styles.separator} />

                {this.getButton("Didn't like it... 😔😕", "dislike")}

                <View style={styles.separator} />
                <View style={styles.separator} />
                <View style={styles.separator} />

                {this.getButton("Didn't go. 😬😰", "nogo")}
            </View>
        )
    }
}

module.exports = Ratings;