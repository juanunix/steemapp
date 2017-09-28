import React, { Component } from 'react'
import { View, Text, Image, TouchableNativeFeedback, TouchableWithoutFeedback, Dimensions } from 'react-native'
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation'
import moment from 'moment';
import removeMarkdown from 'remove-markdown';

import { colors } from 'config';
import { HyperLink } from 'components';

const SCREEN_WIDTH = Dimensions.get('window').width

const Container = styled.View`
  margin-vertical: 5;
  margin-horizontal: 10;
`

const Content = styled.View`
  padding-vertical: 5;
  padding-horizontal: 10;
  elevation: 4;
  background-color: ${colors.black};
`

const Title = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: ${colors.white};
`

const AuthorInfo = styled.View`
  flex-direction: row;
`

const Info = styled.Text`
  color: ${colors.white};
`

const PostImage = styled.Image`
  margin-vertical: 10;
`

const Body = styled.Text`
  color: ${colors.white};
`

export class DiscussionComponent extends Component {
  state = {
    json_metadata: {},
    body: null
  }

  shouldComponentUpdate() {
    return false;
  }
  
  componentWillMount() {
    this.setState({
      json_metadata: JSON.parse(this.props.discussion.json_metadata),
      body: this.parseBody()
    })
  }

  parseBody() {
    let {body} = this.props.discussion
    body = removeMarkdown(body).replace(/\n/g, " ");
    body = body.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    let bodyArray = body.split(' ')
    let i = 0;
    let totallength = 0
    while(i < bodyArray.length && totallength < 100) {
      totallength += bodyArray[i].length
      i++
    }
    completeBody = bodyArray.slice(0, i - 1).join(" ")
    if(i < bodyArray.length) {
      completeBody += ' ...'
    }
    return completeBody
  }

  openDiscussion = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: 'Discussion', params: {discussion: this.props.discussion} })
    )
  }

  render() {
    const { discussion } = this.props;
    return (
      <Container>
        <TouchableWithoutFeedback onPress={this.openDiscussion}>
          <Content>
            <Title>{discussion.title}</Title>
            <AuthorInfo>
              <Info>{moment.utc(discussion.created).fromNow()}</Info>
              <Info> by </Info>
              <HyperLink link={`https://steemit.com/@${discussion.author}`}>{discussion.author}</HyperLink>
              <Info> in </Info>
              <HyperLink link={`https://steemit.com/trending/${discussion.category}`}>{discussion.category}</HyperLink>
            </AuthorInfo>
            {this.state.json_metadata.image && this.state.json_metadata.image.length > 0 && 
              <PostImage style={{width: SCREEN_WIDTH, height: 200}} source={{uri: this.state.json_metadata.image[0] }}/>
            }
            <Body>
              {this.state.body}
            </Body>
          </Content>
        </TouchableWithoutFeedback>
      </Container>
    )
  }
}