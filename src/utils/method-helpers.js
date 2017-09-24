import { Linking } from 'react-native'
import { NavigationActions } from 'react-navigation'

export const openURLInView = url => {
  Linking.openURL(url)
}

export const resetNavigationTo = (routeName: string, navigation: {}) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName })]
  })

  navigation.dispatch(resetAction)
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const delay = (delayed, ms) =>
  Promise.all([delayed, sleep(ms)]).then(([data]) => data)
