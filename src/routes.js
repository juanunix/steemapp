/* eslint-disable react/prop-types */
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation'

// Auth
import { SplashScreen, LoginScreen } from 'auth'

// Home
import { HomeScreen } from 'home'

import { colors } from 'config';

const HomeTabNavigator = TabNavigator({
  New: {
    screen: HomeScreen,
    navigationOptions: {}
  },
  Hot: {
    screen: HomeScreen,
    navigationOptions: {}
  },
  Trending: {
    screen: HomeScreen,
    navigationOptions: {}
  },
  Promoted: {
    screen: HomeScreen,
    navigationOptions: {}
  }
}, {
  initialRouteName: 'Trending',
  tabBarPosition: 'top',
  animationEnabled: false,
  lazy: true,
  swipeEnabled: true,
  tabBarOptions: {
    inactiveTintColor: colors.white,
    activeTintColor: colors.white,
    style: {
      backgroundColor: colors.primaryDark
    },
    indicatorStyle: {
      backgroundColor: colors.lightBlue
    },
    scrollEnabled: true
  },
})

const HomeNavigator = StackNavigator({
  HomeTabs: {
    screen: HomeTabNavigator,
    navigationOptions: {
      headerTitle: 'Home'
    }
  }
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: colors.primaryDark
    },
    headerTitleStyle: {
      color: colors.white
    }
  }
})

const MainDrawer = DrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      drawerLabel: 'Home'
    }
  }
})

export const NoteAround = StackNavigator({
  Main: {
    screen: MainDrawer
  },
  Splash: {
    screen: SplashScreen
  },
  Login: {
    screen: LoginScreen
  }
}, {
  navigationOptions: {
    header: null,
  }
})