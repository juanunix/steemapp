import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation'


import { colors } from 'config';

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

export class DiscussionComponent extends PureComponent {
  componentDidMount() {
    // console.log(this.props.discussion)
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
        <TouchableNativeFeedback onPress={this.openDiscussion}>
          <Content>
            <Title>{discussion.title}</Title>
          </Content>
        </TouchableNativeFeedback>
      </Container>
    )
  }
}