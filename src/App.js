import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AsyncStorage, LayoutAnimation } from 'react-native'
import { persistStore } from 'redux-persist'
import createEncryptor from 'redux-persist-transform-encrypt'
import DeviceInfo from 'react-native-device-info'
import md5 from 'md5'
import steem from 'steem';

steem.api.setOptions({url : "wss://steemd-int.steemit.com"});
// steem.api.setOptions({url : "wss://steemd.steemitstage.com"});

// For Russia:
// steem.api.setOptions({url : "wss://ws.golos.io"});

import { Splash } from 'components'

import { NoteAround } from './routes'
import { configureStore } from './redux/store'

const store = configureStore()

export class App extends Component {
  state = {
    rehydrated: false
  };

  componentWillMount () {
    const encryptor = createEncryptor({
      secretKey: md5(DeviceInfo.getUniqueID())
    })

    persistStore(
      store,
      { storage: AsyncStorage,transforms: [encryptor] },
      () =>
        this.setState({
          rehydrated: true
        })
    )
  }

  componentWillUpdate () {
    LayoutAnimation.spring()
  }

  render () {
    if (!this.state.rehydrated) {
      return <Splash />
    }

    return (
      <Provider store={store}>
        <NoteAround onNavigationStateChange={null} />
      </Provider>
    )
  }
}
