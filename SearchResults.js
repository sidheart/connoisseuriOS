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

class SearchResults extends Component {

    constructor(props) {
        super(props);
        //console.log('Response: ' + JSON.stringify(this.response.listings));

        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.thumb_url !== r2.thumb_url});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.listings)
        }
    }

    rowPressed(restaurantGUID) {
        var data = this.props.listings.filter(prop => prop.name === restaurantGUID)[0];

        this.props.navigator.push({
            title: 'Restaurant',
            component: RestaurantView,
            passProps: {data: data}
        });
    }

    renderRow(rowData, sectionID, rowID) {
        //console.log(rowData);

        rowData.imgPath = rowData.imgPath.replace("open?", "uc?export=view&");
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.name)} underlayColor='#dddddd'>
                <View>
                    <View style={[css.rowContainer, css.oneFifth]}>
                        <Image style={css.thumb} source={{uri: rowData.imgPath}}/>
                        <View style={[css.textContainer, css.vCenter]}>
                            <Text style={[css.h2, css.skyblue, css.bold]}>{rowData.name}</Text>
                            <Text style={[css.h4]} numberOfLines={1}>{rowData.location}</Text>
                        </View>
                    </View>
                    <View style={css.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
      );
    }
}

module.exports = SearchResults;
