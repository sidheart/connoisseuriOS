# iOS Front-End

## Setup
To set up the back end:

First you have to clone and run the User and Restaurant servers located at https://github.com/ychennay/DiningApplication and https://github.com/lyjung92/connoisseur-ws-account respectively.
Instructions on running the spring-boot applications above are provided on the respective github pages, but the general idea is to run the apps from Intellij IDEA.

To set up the front end:

```
$ sudo gem install cocoapods
$ npm install -g react-native-cli
$ git clone https://github.com/sidheart/connoisseuriOS.git
$ git pull
$ sudo npm install
$ cd ios
$ pod install
```

## Run
Make sure you have XCode installed and are working on an OSX machine. Running `npm start` from the top level directory will load the
project into XCode. From there, all you have to do is click 'Build' and the application will run on a simulated iOS machine.

## Known issues
When building the project you may experience an error relating to 'RCT_Refresh' which causes the build to fail. Simply double click on 
the error in XCode and comment out the offending lines. This will resolve the error without further issues.
