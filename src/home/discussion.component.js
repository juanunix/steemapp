import React, { Component } from 'react'
import { View, Text, Image, TouchableNativeFeedback, TouchableWithoutFeedback, Dimensions, Alert, ToastAndroid } from 'react-native'
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation'
import moment from 'moment';
import removeMarkdown from 'remove-markdown';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors } from 'config';
import { openURLInView } from 'utils';
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

const ReputationContainer = styled.View`
  border-color: ${colors.greyLight};
  border-width: 1;
  border-radius: 50;
  margin-left: 4;
  width: 20;
  height: 20;
  justify-content: center;
  align-items: center;
`

const ReputationText = styled.Text`
  color: ${colors.greyLight};
  font-size: 12;
`

const Reputation = ({children}) => (
  <ReputationContainer>
    <ReputationText>
      {children}
    </ReputationText>
  </ReputationContainer>
)

const Info = styled.Text`
  color: ${colors.white};
`

const PostImage = styled.Image`
  margin-vertical: 10;
`

const Body = styled.Text`
  color: ${colors.white};
`
const Metadata = styled.View`
  flex-direction: row;
  margin-vertical :8;
  justify-content: space-between;
`
const LeftMetadata = styled.View`
  flex-direction: row;
`
const RightMetadata = styled(LeftMetadata)``


const Circle = styled.View`
  border-color: ${colors.lightBlue};
  border-width: 1;
  border-radius: 50;
  width: 24;
  height: 24;
  justify-content: center;
  align-items: center;
`

const ArrowUp = styled(Icon)`
  margin-vertical: 4;
  margin-horizontal: 4;
`

const Price = styled.Text`
  margin-left: 12;
  color: ${colors.white};
`

const MetadataText = styled.Text`
  margin-left: 4;
  margin-right: 4;
  color: ${colors.white};
`

const RightComponent = styled.View`
  flex-direction: row;
  margin-right: 4;
`

const RightArrow = ({onPress, ...props}) => (
  <TouchableNativeFeedback onPress={onPress}>
    <Icon color={colors.white} size={16} {...props}/>
  </TouchableNativeFeedback>
)

export class DiscussionComponent extends Component {
  state = {
    json_metadata: {},
    author_reputation: 0,
    body: null
  }

  shouldComponentUpdate() {
    return false;
  }
  
  componentWillMount() {
    this.setState({
      json_metadata: JSON.parse(this.props.discussion.json_metadata),
      body: this.parseBody(),
      author_reputation: this.calculateReputation(),
    })
  }

  calculateReputation = () => {
    return Math.floor(((Math.log10(this.props.discussion.author_reputation) - 9) * 9) + 25)
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

  openComments = () => {
    openURLInView(`https://steemit.com${this.props.discussion.url}#comments`)
  }

  shareDialog = () => {
    Alert.alert(
      'Resteem this post',
      'Are you sure?',
      [
        {text: 'OK', onPress: () => ToastAndroid.show("Login First", ToastAndroid.LONG)},
        {text: 'Cancel', style: 'cancel'}
      ]
    )
  }

  likeDiscussion = () => {
    ToastAndroid.show("Login First", ToastAndroid.LONG);
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
              <Reputation>{this.state.author_reputation}</Reputation>
              <Info> in </Info>
              <HyperLink link={`https://steemit.com/trending/${discussion.category}`}>{discussion.category}</HyperLink>
            </AuthorInfo>
            {this.state.json_metadata.image && this.state.json_metadata.image.length > 0 && 
              <PostImage style={{width: SCREEN_WIDTH, height: 200}} source={{uri: this.state.json_metadata.image[0] }}/>
            }
            <Body>
              {this.state.body}
            </Body>
            <Metadata>
              <LeftMetadata>
                <TouchableNativeFeedback onPress={this.likeDiscussion}>
                  <Circle>
                    <ArrowUp name="keyboard-arrow-up" size={16} color={colors.lightBlue}/>
                  </Circle>
                </TouchableNativeFeedback>
                <Price>$ {discussion.pending_payout_value.split('SBD')[0]}</Price>
                <MetadataText>|</MetadataText>
                <RightArrow name="share" size={18} color={colors.white} onPress={this.shareDialog}/>
              </LeftMetadata>
              <RightMetadata>
                <RightComponent>
                  <RightArrow name="keyboard-arrow-up" />
                  <MetadataText>{discussion.net_votes}</MetadataText>
                  <MetadataText>|</MetadataText>
                </RightComponent>
                <TouchableNativeFeedback onPress={this.openComments}>
                  <RightComponent>
                    <RightArrow name="forum" />
                    <MetadataText>{discussion.children}</MetadataText>
                  </RightComponent>
                </TouchableNativeFeedback>
              </RightMetadata>              
            </Metadata>
          </Content>
        </TouchableWithoutFeedback>
      </Container>
    )
  }
}