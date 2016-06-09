import React from 'react';

import css from './CSS';
import Routes from './Routes';

import {
    View,
    Text,
    Component,
    TouchableHighlight,
    AsyncStorage,
    Image
} from 'react-native';

class Ratings extends Component {
    constructor(props) {
      super(props);
      this.state = {
        token: -1,
        restaurantId: this.props.visitedRestaurant.restaurantId,
        restaurantName: this.props.visitedRestaurant.restaurantName
      }

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
                .catch(error => console.log("Failed to POST rating"));
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
                                style={[css.surveyButton]}
                                underlayColor='white'>
                    <Text style={css.buttonText}>{buttonText}</Text>
            </TouchableHighlight>
        );
    }

    getHeader() {
        var name = (this.state.restaurantName) ? this.state.restaurantName : "the restaurant";
        return (
            <View style={css.surveyTitlePosition}>
                <Text style={css.surveyTitle}>How did you feel about {name}?</Text>
            </View>
        );
    }

    render() {
        return (
          <Image style={css.container} source={require('./Resources/landing_background_7.jpg')}>
            <View stylle={css.textContainer}>
              {this.getHeader()}
            </View>
            {this.getButton("Loved it!", "love")}
            {this.getButton("Liked it.", "like")}
            {this.getButton("Didn't like it", "dislike")}
            {this.getButton("Didn't go.", "nogo")}
          </Image>
        )
    }
}

module.exports = Ratings;
