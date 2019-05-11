import React, { Component } from 'react';

import { Image } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import MainScene from './src/scenes/MainScene';
import DetailScene from './src/scenes/DetailScene';
import ICDFScene from './src/scenes/ICDFScene';
import ProjectScene from './src/scenes/ProjectScene';

const mainStackNavi = createStackNavigator(
  {
    Main: {
      screen: MainScene,
      navigationOptions: () => ({
        header: null
      })
    },
    Detail: {
      screen: DetailScene,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    initialRouteName: 'Main'
    // defaultNavigationOptions: {
    //   headerStyle: {
    //     backgroundColor: '#f4511e'
    //   },
    //   headerTitleStyle: 'bold'
    // }
  }
);

const tabNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: mainStackNavi
    },
    Project: {
      screen: ProjectScene
    },
    ICDF: {
      screen: ICDFScene
    }
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconPath;
        if (routeName === 'Main') {
          iconPath = require('./assets/TabBar/main.png');
        } else if (routeName === 'ICDF') {
          iconPath = require('./assets/TabBar/icdf.png');
        } else if (routeName === 'Project') {
          iconPath = require('./assets/TabBar/project.png');
        }

        // You can return any component that you like here!
        return <Image source={iconPath} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray'
      // activeBackgroundColor: 'tomato'
    }
  }
);

const App = createAppContainer(tabNavigator);
export default App;
