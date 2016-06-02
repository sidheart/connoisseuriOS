import React from 'react';
import css from './CSS';
import RestaurantMenu from './RestaurantMenu';

import {
    Image,
    View,
    Text,
    Component,
    MapView,
    TouchableHighlight,
    AsyncStorage,
} from 'react-native';

const COLOR_WHITE = '#EDEDED';

class RestaurantView extends Component {
    constructor(props) {
      super(props);

      this.state = {
        username: "",
        // chosenRestaurant: false
        chosenRestaurant: true,
        data: { _id: '574c75705c1baee60d501410',
            restaurantId: '0',
            name: 'Aestus',
            imgPath: 'https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbVE5Cd0k0M0dzWms',
            location: 'Santa Monica',
            latitude: 34.020399,
            longitude: -118.4973161,
            price: '31-50',
            address: '507 Wilshire Blvd, Santa Monica, CA 90401',
            phone_number: '(424) 268-4433',
            reviews: '4.0/5',
            notes: '',
            website: 'http://www.aestusrestaurant.com/',
            created_at: '2016-05-30T17:16:32.948Z',
            updated_at: '2016-05-30T17:16:32.948Z',
            __v: 0,
            food_types:
             [ { _id: '574c75705c1baee60d501411',
                 vegan: false,
                 thai: false,
                 tapas: false,
                 sushi_bar: false,
                 sushi: false,
                 steakhouse: false,
                 south_american: false,
                 seasonal_or_local: false,
                 seafood: false,
                 pizza: false,
                 middle_eastern: false,
                 mexican: false,
                 korean: false,
                 japanese: false,
                 italian: false,
                 indian: false,
                 greek: false,
                 german: false,
                 fusion: false,
                 french: false,
                 chinese: false,
                 british: false,
                 bakery: false,
                 asian: false,
                 all_american: true } ],
            menu:
             [ { meal: 'Lunch',
                 _id: '574c75705c1baee60d501434',
                 categories:
                  [ { category_name: 'Small Plates',
                      _id: '574c75705c1baee60d501448',
                      dishes:
                       [ { dish_name: 'Marinated Olives',
                           description: 'orange, thyme',
                           _id: '574c75705c1baee60d50144e' },
                         { dish_name: 'Nantes Carrot Soup',
                           description: 'ginger, lemongrass, yogurt, mint',
                           _id: '574c75705c1baee60d50144d' },
                         { dish_name: 'Smoked Salmon Dip',
                           description: 'celery, scallions, aioli',
                           _id: '574c75705c1baee60d50144c' },
                         { dish_name: 'Hamachi Crudo',
                           description: 'kumquat, radish, yuzu kosho, celtuse, wood sorrel',
                           _id: '574c75705c1baee60d50144b' },
                         { dish_name: 'Root Vegertables',
                           description: 'weiser farms carrots, pink turnips, celery root, radish',
                           _id: '574c75705c1baee60d50144a' },
                         { dish_name: 'Charcuterie Board',
                           description: 'selection of house made items',
                           _id: '574c75705c1baee60d501449' } ] },
                    { category_name: 'Sandwiches',
                      _id: '574c75705c1baee60d501442',
                      dishes:
                       [ { dish_name: 'Pulled Chicken Sandwich',
                           description: 'house bbq sauce, slaw, pickle',
                           _id: '574c75705c1baee60d501447' },
                         { dish_name: 'Grilled Cheese',
                           description: 'raclette, gruyere, cheddar, bechamel',
                           _id: '574c75705c1baee60d501446' },
                         { dish_name: 'Steak Sandwich',
                           description: 'shallot marmalade, horseradish, cream, arugula, steak sauce',
                           _id: '574c75705c1baee60d501445' },
                         { dish_name: 'Grass Fed Cheeseburger',
                           description: 'lettuce, tomato, onion, marmalade, 1000 island, fries ',
                           _id: '574c75705c1baee60d501444' },
                         { dish_name: 'Albacore Burger',
                           description: 'sriracha aoili, scallion, ginger, soy, avocado, furikake, sesame bun, fries',
                           _id: '574c75705c1baee60d501443' } ] },
                    { category_name: 'Salads',
                      _id: '574c75705c1baee60d50143c',
                      dishes:
                       [ { dish_name: 'Golden Quinoa Bowl',
                           description: 'roasted fennel, tangerine, almonds',
                           _id: '574c75705c1baee60d501441' },
                         { dish_name: 'Coleman Farms Green Salad',
                           description: 'beets, apple radish, pistachio, tarragon',
                           _id: '574c75705c1baee60d501440' },
                         { dish_name: 'Kale Salad',
                           description: 'red cabbage, carrots, radish, blood orange',
                           _id: '574c75705c1baee60d50143f' },
                         { dish_name: 'Waldorf Salad',
                           description: 'potatoes, grapes, walnuts, mixed greens, herbed buttlermilk',
                           _id: '574c75705c1baee60d50143e' },
                         { dish_name: 'Nicoise',
                           description: 'albacore, egg, olives, beans, tomatoes',
                           _id: '574c75705c1baee60d50143d' } ] },
                    { category_name: 'Mains',
                      _id: '574c75705c1baee60d501438',
                      dishes:
                       [ { dish_name: 'Housemade Tagliatelle',
                           description: 'lamb bolognese, parmesan',
                           _id: '574c75705c1baee60d50143b' },
                         { dish_name: 'Octopus',
                           description: 'salted potatoes, eggplant, aji verde',
                           _id: '574c75705c1baee60d50143a' },
                         { dish_name: 'Omelette',
                           description: 'cheddar, toast, greens',
                           _id: '574c75705c1baee60d501439' } ] },
                    { category_name: 'Sides',
                      _id: '574c75705c1baee60d501435',
                      dishes:
                       [ { dish_name: 'Brussel Sprouts',
                           description: 'oro blanco, pear mostarda',
                           _id: '574c75705c1baee60d501437' },
                         { dish_name: 'Herbed French Fries',
                           description: '',
                           _id: '574c75705c1baee60d501436' } ] } ] },
               { meal: 'Dinner',
                 _id: '574c75705c1baee60d501412',
                 categories:
                  [ { category_name: 'For the Table',
                      _id: '574c75705c1baee60d50142e',
                      dishes:
                       [ { dish_name: 'Marinated Olives',
                           description: 'orange, thyme',
                           _id: '574c75705c1baee60d501433' },
                         { dish_name: 'Eggplant Caponata',
                           description: 'peppers, onions, olives, capers',
                           _id: '574c75705c1baee60d501432' },
                         { dish_name: 'Chicken Fritters',
                           description: 'adoba, black pepper aoili, serrano, pickled green garlic',
                           _id: '574c75705c1baee60d501431' },
                         { dish_name: 'Smoked Salmon Rillettes',
                           description: 'celery, scallions, aioli',
                           _id: '574c75705c1baee60d501430' },
                         { dish_name: 'Charcuterie Board',
                           description: 'selection of house made items',
                           _id: '574c75705c1baee60d50142f' } ] },
                    { category_name: 'Small Plates',
                      _id: '574c75705c1baee60d501425',
                      dishes:
                       [ { dish_name: 'Nantes Carrot Soup',
                           description: 'ginger, lemongrass, yogurt, mint',
                           _id: '574c75705c1baee60d50142d' },
                         { dish_name: 'Golden Quinoa Bowl',
                           description: 'roasted fennel, tangerine, almonds',
                           _id: '574c75705c1baee60d50142c' },
                         { dish_name: 'Coleman Farms Green Salad',
                           description: 'beets, apple radish, pistachio, tarragon',
                           _id: '574c75705c1baee60d50142b' },
                         { dish_name: 'Kale Salad',
                           description: 'red cabbage, carrots, radish, blood orange',
                           _id: '574c75705c1baee60d50142a' },
                         { dish_name: 'English Pea Risotto',
                           description: 'carrots, bacon, meyer lemon, pea tendrils',
                           _id: '574c75705c1baee60d501429' },
                         { dish_name: 'Hamachi Crudo',
                           description: 'kumquat, radish, celtuse, sorrel',
                           _id: '574c75705c1baee60d501428' },
                         { dish_name: 'Octopus',
                           description: 'salted potatoes, eggplant, aji verde',
                           _id: '574c75705c1baee60d501427' },
                         { dish_name: 'Root Vegertables',
                           description: 'weiser farms carrots, pink turnips, celery root, radish',
                           _id: '574c75705c1baee60d501426' } ] },
                    { category_name: 'Main',
                      _id: '574c75705c1baee60d50141d',
                      dishes:
                       [ { dish_name: 'Housemade Fettuccine',
                           description: 'lamb bolognese, parmesan',
                           _id: '574c75705c1baee60d501424' },
                         { dish_name: 'Grilled Branzino',
                           description: 'chermoula, braised escarole, lemon',
                           _id: '574c75705c1baee60d501423' },
                         { dish_name: 'Wood\'s Fishery Shrimp',
                           description: 'romesco, asparagus, aioli, parsley',
                           _id: '574c75705c1baee60d501422' },
                         { dish_name: 'Fire-roasted Chicken',
                           description: 'hummus, cucumber raita, grilled bread',
                           _id: '574c75705c1baee60d501421' },
                         { dish_name: 'Peads & Barnetts Pork Chop',
                           description: 'flageolets ragout, baby carrots, mustardd',
                           _id: '574c75705c1baee60d501420' },
                         { dish_name: 'Steak Frites',
                           description: '8 oz. new york prime, au poivre',
                           _id: '574c75705c1baee60d50141f' },
                         { dish_name: 'Grass Fed Cheeseburger',
                           description: 'lettuce, tomato, onion, marmalade, 1000 island, fries',
                           _id: '574c75705c1baee60d50141e' } ] },
                    { category_name: 'Sides',
                      _id: '574c75705c1baee60d501418',
                      dishes:
                       [ { dish_name: 'Brussel Sprouts',
                           description: 'oro blanco, pear mostarda',
                           _id: '574c75705c1baee60d50141c' },
                         { dish_name: 'Herbed French Fries',
                           description: '',
                           _id: '574c75705c1baee60d50141b' },
                         { dish_name: 'Grilled Sprouted Broccoli',
                           description: 'meyer lemon, basil',
                           _id: '574c75705c1baee60d50141a' },
                         { dish_name: 'Roasted Fingerling Potatoes',
                           description: '',
                           _id: '574c75705c1baee60d501419' } ] },
                    { category_name: 'Desserts',
                      _id: '574c75705c1baee60d501413',
                      dishes:
                       [ { dish_name: 'Chocolate Chip Cookies and Cinnamon Milk',
                           description: '',
                           _id: '574c75705c1baee60d501417' },
                         { dish_name: 'Lemon Posset',
                           description: '',
                           _id: '574c75705c1baee60d501416' },
                         { dish_name: 'Chocolate Cake',
                           description: '',
                           _id: '574c75705c1baee60d501415' },
                         { dish_name: 'Blackberry Cobbler',
                           description: '',
                           _id: '574c75705c1baee60d501414' } ] } ] } ],
            meals:
             [ { _id: '574c75705c1baee60d50144f',
                 lunch: true,
                 happy_hour: false,
                 drinks: false,
                 dinner: true,
                 coffee: false,
                 brunch: false,
                 breakfast: false } ],
            tags:
             [ { _id: '574c75705c1baee60d501450',
                 worth_the_lines: false,
                 wine_bar: false,
                 vegetarian_options: false,
                 vegan_options: false,
                 upscale: false,
                 trendy: true,
                 tasting_menu: false,
                 takes_walk_ins: false,
                 takes_dinner_reservations: false,
                 take_out_options: false,
                 sweet_treat: false,
                 swanky: false,
                 special_occasion: false,
                 snack: false,
                 small_plates: false,
                 shareable: false,
                 share_plates: false,
                 secret: false,
                 seat_yourself: false,
                 scenery: false,
                 rotating_menu: false,
                 romantic: false,
                 quiet: true,
                 private_room: false,
                 prime_location: false,
                 pastries: false,
                 outdoor_seating: false,
                 outdoor_dining: false,
                 organic_beer_and_wine: false,
                 organic: false,
                 order_at_counter: false,
                 open_late: false,
                 no_reservations: false,
                 new_restaurant: false,
                 locals: false,
                 lively_bar_area: false,
                 lively: false,
                 karaoke: false,
                 innovative: false,
                 hotspot: false,
                 hotel_dining: false,
                 hidden_gem: false,
                 healthy_options: false,
                 hard_to_get_a_table: false,
                 happy_hour: false,
                 great_view: false,
                 good_for_parents: false,
                 good_for_lunch: false,
                 good_for_groups: false,
                 good_drinks: true,
                 good_ambiance: false,
                 gluten_free_options: false,
                 gastropub: false,
                 fusion: false,
                 fun: false,
                 foodie_famous: true,
                 first_date: false,
                 farm_to_table: true,
                 fancy: false,
                 famous_chef: false,
                 family_friendly: false,
                 dog_friendly: false,
                 dietary_restriction_friendly: false,
                 date_spot: false,
                 date_night: true,
                 communal_tables: false,
                 classy: false,
                 chef_inventive: false,
                 celeb_spotting: false,
                 casual: false,
                 cafe: false,
                 burgers: false,
                 beer_selection: false,
                 beer_and_wine: false,
                 bar_seating: false,
                 bar_scene: false,
                 bar_area: false,
                 bar: false,
                 baked_goods: false,
                 authentic_takeout: false,
                 authentic: false,
                 afternoon: false } ] }
               }

      // AsyncStorage.getItem('user', (error, username) => {
      //     if (error) {
      //         console.log("No user data");
      //     } else {
      //         this.setState({username: username});
      //         var tokenName = 'visitedRestaurant' + username;
      //         AsyncStorage.getItem(tokenName, (error, vrToken) => {
      //             if (error) {
      //                 console.log("No dine-here data");
      //             } else {
      //                 restaurantData = JSON.parse(vrToken);
      //                 if (restaurantData &&
      //                     this.props.data.restaurantId === restaurantData.restaurantId)
      //                     this.setState({chosenRestaurant: true});
      //             }
      //         });
      //     }
      // });
    }

    getLocationData(data) {
        if (data.address === undefined)
            return [];
        return [{
            latitude: data.latitude,
            longitude: data.longitude,
            title: data.name,
            subtitle: data.address
        }];
    }

    getImage(imgPath) {
        return(
            <View style={css.center}>
                <Image style={[css.restaurantImage]} source={{uri: imgPath}} />
            </View>
        )
    }

    getInfo(data, markers) {
        var price = (data.price === undefined) ?
            "No pricing is available for this restaurant" : data.price;
        var phone_number = (data.phone_number === undefined) ?
            "No phone number is available for this restaurant" : data.phone_number;

        return(
            <View style={css.center}>
                <Text style={css.restaurantName}>{data.name}</Text>
                <Text style={css.restaurantSub}>{markers[0].subtitle}</Text>
                <Text style={css.restaurantSub}>{phone_number}</Text>
                <Text style={[css.h3, css.black]}>${price}</Text>
            </View>
        );
    }

    _menuPressed(data) {
        this.props.navigator.push({
            title: data.name + ' Menu',
            component: RestaurantMenu,
            passProps: {data: data},
            barTintColor: 'black',
            tintColor: COLOR_WHITE,
            titleTextColor: COLOR_WHITE,
            leftButtonIcon: require('./Resources/icon_left.png'),
            onLeftButtonPress: () => {
              this.props.navigator.pop();
            }
        });
    }

    getMenu(data, mapBool) {
        var buttonSize = mapBool ? "oneTenth" : "oneFourth";
        var text = data.menu ? "Menu" : "No Available Menu";

        return(
            <TouchableHighlight onPress={() => this._menuPressed(data)} underlayColor='#dddddd' style={[css.button]}>
                <View>
                    <Text style={css.buttonText}>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    _pickRestaurant(data) {
        var tokenName = 'visitedRestaurant' + this.state.username;
        var object = {
            restaurantId: data.restaurantId,
            restaurantName: data.name,
            timestamp: new Date().getTime()
        };

        AsyncStorage.setItem(tokenName, JSON.stringify(object), (err) => {
            if (err) {
                console.log(err);
                alert('Dine-here data could not be saved');
            } else {
                this.setState({chosenRestaurant: true});
            }
        });
    }

    getDineHere(data, mapBool) {
        // var buttonSize = mapBool ? "oneTenth" : "oneFourth";
        if (! this.state.chosenRestaurant)
            return(
                <TouchableHighlight onPress={() => this._pickRestaurant(data)} style={css.button}>
                        <Text style={css.buttonText}>Dine here!</Text>
                </TouchableHighlight>
            );
        else
            return(
                <View style={css.button}>
                    <Text style={css.buttonText}>Ready to dine!</Text>
                </View>
            );
    }

    getMap(markers) {
        if (markers.length === 0)
            return;

        return (
            <MapView
                style={[css.oneFourth]}
                region={{
                    latitude: markers[0].latitude,
                    longitude: markers[0].longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                annotations={markers}
            />
        )
    }

    getBookMark(data) {
      return(
          <View style={[css.button, css.buttonRight]}>
              <Text style={css.buttonText}>Bookmark here</Text>
          </View>
        )
    }

    render() {
        // var data = this.props.data;
        var data = this.state.data;
        var markers = this.getLocationData(data);

        return (
            <View style={[css.container]}>
                {this.getImage(data.imgPath)}
                {this.getInfo(data, markers)}
                <View style={css.row}>
                    {this.getMenu(data, markers.length)}
                </View>
                <View style={css.row}>
                    {this.getDineHere(data, markers.length)}
                    {this.getBookMark(data)}
                </View>
                {this.getMap(markers)}
            </View>
        );
    }
}

module.exports = RestaurantView;
