/* eslint-disable react/prop-types */
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation'

// Auth
import { SplashScreen, LoginScreen } from 'auth'

// Home
import {
  NewHomeScreen,
  HotHomeScreen,
  TrendingHomeScreen,
  PromotedHomeScreen
} from 'home'
import { DiscussionScreen } from 'discussion'

import { colors } from 'config';

const HomeTabNavigator = TabNavigator({
  New: {
    screen: NewHomeScreen,
    navigationOptions: {}
  },
  Hot: {
    screen: HotHomeScreen,
    navigationOptions: {}
  },
  Trending: {
    screen: TrendingHomeScreen,
    navigationOptions: {}
  },
  Promoted: {
    screen: PromotedHomeScreen,
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
    // screen: TrendingHomeScreen,
    navigationOptions: {
      // headerTitle: 'Home'
      header: null
    }
  },
  Discussion: {
    screen: DiscussionScreen,
    navigationOptions: {
      headerTitle: 'Discussion'
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

// const MainDrawer = DrawerNavigator({
//   Home: {
//     screen: HomeNavigator,
//     navigationOptions: {
//       drawerLabel: 'Home'
//     }
//   }
// })

export const NoteAround = StackNavigator({
  Main: {
    screen: HomeNavigator
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