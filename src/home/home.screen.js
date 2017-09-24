import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Text, FlatList, AsyncStorage } from 'react-native'
import steem from 'steem';
import styled from 'styled-components/native';
import { colors } from 'config';

import { LoadingContainer } from 'components';

import { DiscussionComponent } from './discussion.component';

const Container = styled.View`
  padding-vertical: 5;
  background-color: ${colors.primaryDark};
`

const DB_KEY = 'HOME';

export class HomeScreen extends PureComponent {
  state = {
    feed: [],
    error: null,
    fetching: false
  }

  componentWillMount () {
    this.getFeedArray()
  }

  getSavedFeed = async () => {
    try {
      let savedFeed = await AsyncStorage.getItem(DB_KEY);
      if(!savedFeed) return;
      savedFeed = JSON.parse(savedFeed);
      await this.setState({
        fetching: false,
        feed: savedFeed,
        error: null,
      })
    } catch(e) {
      console.log(e);
    }
  }

  saveFeed = async () => {
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(this.state.feed));
  }

  getFeedArray = async () => {
    await this.setState({
      fetching: true
    })
    try {
      await this.getSavedFeed();
      const feed = await await steem.api.getDiscussionsByTrendingAsync({ tag: "", limit: 10 })
      await this.setState({
        feed,
        error:null,
        fetching: false
      })
      await this.saveFeed();
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
      <Container>
        <FlatList
          data={this.state.feed}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <DiscussionComponent discussion={item} navigation={this.props.navigation}/>}
        />
      </Container>
    )
  }
}
