import React from 'react';
import css from './CSS';

import {
    View,
    Text,
    Component,
    ListView,
    StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
    c50: { color: '#ECEFF1' },
    bkc50: { backgroundColor: '#ECEFF1' },
    c100: { color: '#CFD8DC' },
    bkc100: { backgroundColor: '#CFD8DC' },
    c200: { color: '#B0BEC5' },
    bkc200: { backgroundColor: '#B0BEC5' },
    c300: { color: '#90A4AE' },
    bkc300: { backgroundColor: '#90A4AE' },
    c400: { color: '#78909C' },
    bkc400: { backgroundColor: '#78909C' },
    c500: { color: '#607D8B' },
    bkc500: { backgroundColor: '#607D8B' },
    c600: { color: '#546E7A' },
    bkc600: { backgroundColor: '#546E7A' },
    c700: { color: '#455A64' },
    bkc700: { backgroundColor: '#455A64' },
    c800: { color: '#37474F' },
    bkc800: { backgroundColor: '#37474F' },
    c900: { color: '#263238' },
    bkc900: { backgroundColor: '#263238' },
});

class RestaurantMenu extends Component {

    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.data.menu)
        }
    }

    /*
     // menu: [{
     //    meal: String,
     //    categories: [{
     //        category_name: String,
     //        dishes: [{
     //            dish_name: String,
     //            description: String,
     //            price: Number
     //        }]
     //    }]
     // }],
     */

    renderDishes(rowData, sectionID, rowID) {
        console.log(rowData);
        return (
            <View style={[css.xspad, css.center, css.bkWhite]}>
                <Text style={[css.h4, styles.c600]}>{rowData.dish_name}</Text>
            </View>
        )
    }

    renderCategoriesHeader() {
        return (
            <View style={[css.spad, css.center, styles.bkc700]}>
                <Text style={[css.h3, css.white]}>{this}</Text>
            </View>
        )
    }

    renderCategories(rowData, sectionID, rowID) {
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2});

        return (
            <ListView
                dataSource={dataSource.cloneWithRows(rowData.dishes)}
                renderHeader={this.renderCategoriesHeader.bind(rowData.category_name)}
                renderRow={this.renderDishes.bind(this)}/>
        );
    }

    renderMealHeader() {
        return (
            <View style={[css.oneTenth, css.center, styles.bkc900]}>
                <Text style={[css.h2, styles.c50, css.bold]}>{this}</Text>
            </View>
        )
    }

    renderMeal(rowData, sectionID, rowID) {
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2});

        return (
            <ListView
                dataSource={dataSource.cloneWithRows(rowData.categories)}
                renderHeader={this.renderMealHeader.bind(rowData.meal)}
                renderRow={this.renderCategories.bind(this)}/>
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMeal.bind(this)}/>
        );
    }
}

module.exports = RestaurantMenu;