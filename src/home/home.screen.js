import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Text, FlatList } from 'react-native'
import { LoadingContainer } from 'components';

import { getFeed } from './home.api'
import { DiscussionComponent } from './discussion.component';

export class HomeScreen extends PureComponent {
  state = {
    feed: [],
    error: null,
    fetching: false
  }

  componentWillMount () {
    this.getFeedArray()
  }

  getFeedArray = async () => {
    await this.setState({
      fetching: true
    })
    try {
      const feed = await getFeed()
      await this.setState({
        feed,
        error:null,
        fetching: false
      })
    } catch(e) {
      await this.setState({
        feed: [],
        fetching: false,
        error: e
      })
    }
  }

  render () {
    if(this.state.fetching) return <LoadingContainer />
    return (
      <FlatList
        data={this.state.feed}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <DiscussionComponent discussion={item}/>}
      />
    )
  }
}
