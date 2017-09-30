import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, FlatList, View, AsyncStorage } from 'react-native'
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

export class HomeScreen extends Component {
  state = {
    feed: [],
    error: null,
    fetching: false,
    refreshing: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.feed.length !== nextState.feed.length) {
      return true;
    } else if(nextState.feed.length > 0 && this.state.feed[0].id !== nextState.feed[0].id) {
      return true
    }
    if(this.state.fetching !== nextState.fetching) {
      return true;
    }
    return false;
  }

  componentWillMount () {
    this.getFeedArray(true)
  }

  getSavedFeed = async () => {
    try {
      let savedFeed = await AsyncStorage.getItem(DB_KEY);
      if(!savedFeed) return;
      savedFeed = JSON.parse(savedFeed);
      console.log(savedFeed[0])
      await this.setState({
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
      refreshing: true,
      fetching: true
    })
    try {
      await this.getSavedFeed();
      const feed = await await steem.api.getDiscussionsByTrendingAsync({ tag: "", limit: 10 })
      await this.setState({
        feed,
        error:null,
        fetching: false,
        refreshing: false
      })
      await this.saveFeed();
    } catch(e) {
      console.log(e)
      await this.setState({
        feed: [],
        fetching: false,
        refreshing: false,
        error: e
      })
    }
  }

  onEndReached = async (info) => {
    if(this.state.fetching) return;
    await this.setState({
      fetching: true
    })
    try {
      const query = {
        tag: "",
        limit: 10,
        start_permlink: this.state.feed[this.state.feed.length - 1].permlink,
        start_author: this.state.feed[this.state.feed.length - 1].author
      }
      const nextFeed = await steem.api.getDiscussionsByTrendingAsync(query)
      console.log(nextFeed)
      this.setState(prevState => ({
        feed: [
          ...prevState.feed,
          ...nextFeed.slice(1),
        ],
        fetching: false,
        error: null
      }))
      // await this.saveFeed();
    } catch(e) {
      await this.setState({
        fetching: false,
        refreshing: false,
        error: e
      })
    }
  }

  render () {
    // if(this.state.fetching) return <LoadingContainer />
    return (
      <Container>
        <FlatList
          removeClippedSubviews={true}
          data={this.state.feed}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <DiscussionComponent discussion={item} navigation={this.props.navigation}/>}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          refreshing={this.state.refreshing}
          onRefresh={this.getFeedArray}
          ListFooterComponent={() => 
            <View>
              {this.state.fetching &&
                <LoadingContainer />
              }
            </View>
          }
        />
      </Container>
    )
  }
}
