# iOS Front-End

## Setup
```
$ git clone https://github.com/tygiacalone/connoisseuriOS.git
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

## Running
```
Make sure your node server is running
$ open -a Xcode ios/connoisseuriOS.xcworkspace/
Proceed to build and run here
```
