import React from 'react';

import css from './CSS';
import RestaurantView from './RestaurantView';

import {
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component
} from 'react-native';

const COLOR_WHITE = '#EDEDED';

class SearchResults extends Component {

    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.thumb_url !== r2.thumb_url});
        this.state = {
            // dataSource: dataSource.cloneWithRows(LISTING)
            dataSource: dataSource.cloneWithRows(this.props.listings)
        }
        // console.log('HEVJBENSM');
        // console.log(this.props.bookmarks);
    }

    rowPressed(restaurantGUID) {
        var data = this.props.listings.filter(prop => prop.name === restaurantGUID)[0];
        var bookmarked = this.props.bookmarks.includes(data._id);
        // console.log('HII' + bookmarked);

        this.props.navigator.push({
            title: restaurantGUID,
            component: RestaurantView,
            passProps: {data: data, bookmarked: bookmarked},
            barTintColor: 'black',
            tintColor: COLOR_WHITE,
            titleTextColor: COLOR_WHITE,
            leftButtonIcon: require('./Resources/icon_left.png'),
            onLeftButtonPress: () => {
              this.props.navigator.pop();
            }
        });
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.name)} underlayColor='#dddddd'>
                <View>
                    <View style={css.rowContainer}>
                        <Image style={css.thumb} source={{uri: rowData.imageUrl}}/>
                        <View style={[css.textContainer]}>
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
        <Image source={require('./Resources/results_page.jpg')} style={css.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}/>
        </Image>
      );
    }
}

module.exports = SearchResults;