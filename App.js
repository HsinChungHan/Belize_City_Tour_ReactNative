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
import WebsiteScene from './src/scenes/WebsiteScene';

const ICDFToWebsiteNavigator = createStackNavigator(
  {
    ICDF: {
      screen: ICDFScene,
      navigationOptions: () => ({
        header: null
      })
      // navigationOptions: () => ({
      //   title: 'ICDF',
      //   headerBackTitle: null
      // })
    },
    Website: {
      screen: WebsiteScene,
      navigationOptions: () => ({
        title: 'Website',
        headerBackTitle: null
      })
    }
  },
  {
    initialRouteName: 'ICDF',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTitleStyle: 'bold'
    }
  }
);

const projectToWebsiteNavigator = createStackNavigator(
  {
    Project: {
      screen: ProjectScene,
      navigationOptions: () => ({
        header: null
      })
      // navigationOptions: () => ({
      //   title: 'ICDF',
      //   headerBackTitle: null
      // })
    },
    Website: {
      screen: WebsiteScene,
      navigationOptions: () => ({
        title: 'Website',
        headerBackTitle: null
      })
    }
  },
  {
    initialRouteName: 'Project',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTitleStyle: 'bold'
    }
  }
);

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
      screen: projectToWebsiteNavigator
    },
    ICDF: {
      // screen: ICDFScene
      screen: ICDFToWebsiteNavigator
    }
  },
  {
    initialRouteName: 'Project',
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
        return <Image source={iconPath} style={{ width: 30, height: 30 }} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'yellow',
      inactiveTintColor: 'gray'
      // activeBackgroundColor: 'tomato'
    }
  }
);

const App = createAppContainer(tabNavigator);
export default App;
