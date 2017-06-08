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
const SMALL_FONT_SIZE = 15;
const INPUT_WIDTH = width*0.7;
const INPUT_MARGIN = width*0.15;
const DESCRIPTION_MARGIN = width * 0.1;
const HEADER_TOP_POS = height * 0.15;
const FORM_TOP_POS = height * 0.20;
const FBLOGIN_TOP_POS = FORM_TOP_POS + 30;
const SIGNUP_TOP_POS = FBLOGIN_TOP_POS + 15;

var css = StyleSheet.create({
    header: {
    fontFamily: 'Bodoni 72',
    fontSize: 36,
    textAlign: 'center',
    color: COLOR_WHITE,
    backgroundColor: 'transparent'
  },
  headerGroupSignup: {
    top: HEADER_TOP_POS
  },
  headerGroup:{

  },
  logo: {
    marginBottom: -30,
    alignSelf: 'center'
  },
    containerLoginSignup: {//for loginpage.js and signuppage.js
    flex: 1,
    width: null,
    height: null
  },
    containerUserAccordionSurvey:{//for userprofile.js, searchpageaccordion.js, and survey.js
    flex: 1,
    justifyContent: 'center',
    paddingLeft: INPUT_MARGIN,
    paddingRight: INPUT_MARGIN,
    width: null,
    height: null
    },
    container: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'black'
    },
    description: {
    fontFamily: 'Avenir',
    fontSize: SMALL_FONT_SIZE,
    textAlign: 'center',
    color: COLOR_WHITE,
    backgroundColor: 'transparent',
    marginLeft: DESCRIPTION_MARGIN,
    marginRight: DESCRIPTION_MARGIN
  },
  descriptionUser: {//for userprofile.js
    fontFamily: 'Avenir',
    fontSize: SMALL_FONT_SIZE,
    textAlign: 'center',
    color: COLOR_WHITE,
    backgroundColor: 'transparent',
    marginLeft: DESCRIPTION_MARGIN,
    marginRight: DESCRIPTION_MARGIN,
    fontWeight: '700',
    paddingVertical: 10
  },
  descriptionAccordion: {
    fontFamily: 'Avenir',
    fontSize: SMALL_FONT_SIZE,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'transparent',
    marginLeft: DESCRIPTION_MARGIN,
    marginRight: DESCRIPTION_MARGIN
  },
  searchInputLogin: {
    height: 40,
    paddingLeft: SMALL_FONT_SIZE,
    marginRight: INPUT_MARGIN,
    marginLeft: INPUT_MARGIN,
    marginBottom: 10,
    flex: 1,
    width: INPUT_WIDTH,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLOR_WHITE,
    color: COLOR_WHITE,
    backgroundColor: 'rgba(119, 136, 153, 0.9)',
    fontFamily: 'Avenir',
  },
  searchInputSignup: {
    height: 40,
    paddingLeft: SMALL_FONT_SIZE,
    marginRight: INPUT_MARGIN,
    marginLeft: INPUT_MARGIN,
    marginBottom: 10,
    flex: 1,
    width: INPUT_WIDTH,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLOR_WHITE,
    color: COLOR_WHITE,
    backgroundColor: 'rgba(237, 237, 237, 0.15)',
    fontFamily: 'Avenir',
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
    buttonLoginSignup:{
      height: 40,
      flex: 1,
      width: INPUT_WIDTH,
      marginRight: INPUT_MARGIN,
      marginLeft: INPUT_MARGIN,
      borderColor: COLOR_WHITE,
      borderWidth: 1,
      borderBottomWidth: 1,
      backgroundColor: 'rgba(119, 136, 153, 0.9)',
      alignSelf: 'stretch',             
      justifyContent: 'center'
    },
    buttonText: {
      fontFamily: 'Avenir',
      color: 'black',
      alignSelf: 'center',
      fontWeight: '700',
      fontSize: 15
    },
    buttonTextLoginSignup:{
    fontSize: SMALL_FONT_SIZE,
    color: COLOR_WHITE,
    alignSelf: 'center',
    fontFamily: 'Avenir',
    backgroundColor: 'transparent'
  },
  facebookButton: {
    height: 40,
    width: INPUT_WIDTH,
    backgroundColor: '#4267B2',
    marginLeft: INPUT_MARGIN,
    marginRight: INPUT_MARGIN,
    marginBottom: 10
  },
  formGroup: {
    top: FORM_TOP_POS
  },
    loginInfo: {
    justifyContent: 'center',
    top: FBLOGIN_TOP_POS
  },
  signup: {
    top: SIGNUP_TOP_POS
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
    intro: {
    top: -80
  },
  introText: {
    fontFamily: 'Bodoni 72',
    fontSize: 25,
    color: COLOR_WHITE,
    backgroundColor: 'transparent',
    fontWeight: '800',
    justifyContent: 'center',
    textAlign: 'center'
  },
  accordion: {
    top: -50
  },
  header: {
    paddingVertical: 10
  },
  headerText: {
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: SMALL_FONT_SIZE,
    fontWeight: '500'
  },
  headerActive: {
    color: 'black',
    backgroundColor: COLOR_WHITE,
    width: INPUT_WIDTH,
    padding: 10
  },
  headerInactive: {
    color: COLOR_WHITE
  },
  headerInactiveAccordion: {
    color: 'white',
    borderColor: COLOR_WHITE,
    borderWidth: 1,
    width: INPUT_WIDTH,
    backgroundColor: 'rgba(119, 136, 153, 0.8)',
    padding: 5,
  },
  headerActiveAccordion: {
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, .5)',
    padding: 5
  },
  content: {
    flex: 1
  },
  active: {
    backgroundColor: 'transparent'
  },
  inactive: {
    backgroundColor: 'transparent'
  },
  submitButtonView: {
    marginTop: -30
  },
  submitButton: {
    height: 40,
    flex: 1,
    width: INPUT_WIDTH,
    borderColor: COLOR_WHITE,
    backgroundColor: COLOR_WHITE,
    borderWidth: 1,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 0
  },
  signupbutton: {
    height: 40,
    flex: 1,
    borderRadius: 40,
    width: INPUT_WIDTH - 150,
    borderColor: COLOR_WHITE,
    borderWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(119, 136, 153, 1)',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});

module.exports = css;
