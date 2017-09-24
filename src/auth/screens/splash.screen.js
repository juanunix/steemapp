import React, { PureComponent } from 'react'

import { Splash } from 'components'
import { resetNavigationTo } from 'utils'

export class SplashScreen extends PureComponent {
  static props: {
    navigation: Object,
  };
  componentWillMount () {
    const { navigation } = this.props
    resetNavigationTo('Home', navigation)
  }
  render () {
    return <Splash />
  }
}
