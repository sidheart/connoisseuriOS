import React from 'react';
import css from './CSS';

import {
    View,
    Text,
    Component,
    ListView,
    Image
} from 'react-native';

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

    renderDishes(rowData) {
        return (
            <View style={css.dish}>
                <Text style={css.dishText}>{rowData.dish_name}</Text>
            </View>
        )
    }

    renderCategoriesHeader() {
        return (
            <View style={css.categoryHeader}>
                <Text style={css.categoryHeaderText}>{this}</Text>
            </View>
        )
    }

    renderCategories(rowData) {
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
            <View style={css.mealHeader}>
                <Text style={css.mealHeaderText}>{this}</Text>
                <View style={css.separator}/>
            </View>
        )
    }

    renderMeal(rowData) {
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
          <Image source={require('./Resources/landing_background_6.jpg')} style={css.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMeal.bind(this)}/>
          </Image>
        );
    }
}

module.exports = RestaurantMenu;
