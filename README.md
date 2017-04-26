# iOS Front-End

## Setup
```
$ sudo gem install cocoapods
$ npm install -g react-native-cli
$ git clone https://github.com/rayxiaonet/connoisseuriOS.git
$ git pull
$ sudo npm install
$ cd ios
$ pod install

Go to node_modules folder under connoisseuriOS, then > react-native > Libraries > Picker > PickerIOS.ios.js
from line 111 copy and paste the following code -

height: RCTPickerIOSConsts.ComponentHeight,
fontFamily: 'Avenir',
fontSize: 15,
color: '#EDEDED',
borderColor: '#EDEDED',
borderWidth: 1

```

## Run
```
$ npm start
```
