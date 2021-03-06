import React from 'react';

import {
    StyleSheet,
    Dimensions
} from 'react-native';

var { width, height } = Dimensions.get('window');
const header = 70 ;
const containerHeight = height-header;
const COLOR_WHITE = '#EDEDED';
const COLOR_RED = '#8C2621';

var css = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'black'
    },
    fill: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, .5)',
        height: containerHeight*0.2,
        padding: containerHeight*0.04
    },
    thumb: {
        width: containerHeight*0.12,
        height: containerHeight*0.12,
        resizeMode: "stretch",
        borderRadius: 5,
        marginRight: 20
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    restaurantTitle: {
      fontFamily: 'Avenir',
      fontSize: 20,
      fontWeight: '800',
      width: width*0.5,
      color: 'black'
    },
    restaurantLocation: {
      fontFamily: 'Avenir',
      fontSize: 15,
      color: 'black'
    },
    restaurantImage: {
      width: width,
      height: 220,
      marginTop: 65,
      overflow: 'hidden'
    },
    restaurantName: {
      marginTop: 15,
      fontFamily: 'Bodoni 72',
      color: COLOR_WHITE,
      fontSize: 25,
      fontWeight: '800',
      backgroundColor: 'transparent'
    },
    restaurantSub: {
      color: COLOR_WHITE,
      backgroundColor: 'transparent',
      fontFamily: 'Avenir',
      fontSize: 15,
      marginTop: 10,
      paddingHorizontal: width * 0.1,
      textAlign: 'center'
    },
    button: {
      height: 40,
      flex: 1,
      borderColor: COLOR_WHITE,
      backgroundColor: COLOR_WHITE,
      borderWidth: 1,
      borderBottomWidth: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      marginTop: -30
    },
    buttonText: {
      fontFamily: 'Avenir',
      color: 'black',
      alignSelf: 'center',
      fontWeight: '700',
      fontSize: 15
    },
    buttonRight: {
      marginLeft: width*0.05
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: width*0.10,
      marginTop: 20
    },
    extraPadding: {
      marginTop: 40
    },
    mealHeader: {
      backgroundColor: 'transparent',
      height: 40
    },
    mealHeaderText: {
      fontFamily: 'Bodoni 72',
      fontSize: 25,
      color: COLOR_WHITE,
      fontWeight: '800',
      marginLeft: width * 0.1
    },
    categoryHeader: {
      backgroundColor: 'transparent',
      height: 40,
      marginTop: 8
    },
    categoryHeaderText: {
      backgroundColor: 'transparent',
      color: COLOR_WHITE,
      fontFamily: 'Avenir',
      fontSize: 18,
      fontWeight: '800',
      marginLeft: width * 0.1
    },
    dish: {
      backgroundColor: 'transparent',
      marginBottom: 15
    },
    dishText: {
      fontFamily: 'Avenir',
      fontSize: 15,
      color: COLOR_WHITE,
      backgroundColor: 'transparent',
      marginLeft: width * 0.1
    },
    surveyTitlePosition: {
      marginTop: height*0.17
    },
    surveyTitle: {
      fontFamily: 'Bodoni 72',
      fontSize: 25,
      fontWeight: '800',
      color: COLOR_WHITE,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom: 40
    },
    surveyButton: {
      backgroundColor: COLOR_WHITE,
      height: 40,
      paddingVertical: 10,
      marginLeft: width*0.15,
      marginRight: width*0.15,
      marginTop: height* 0.03
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    hCenter: {
        alignItems: 'center'
    },
    separator: {
        height: 2,
        backgroundColor: 'black'
    },
});

module.exports = css;
