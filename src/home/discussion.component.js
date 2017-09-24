import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

export class DiscussionComponent extends PureComponent {
  render() {
    const { discussion } = this.props;
    return (
      <View>
        <Text>{discussion.title}</Text>
      </View>
    )
  }
}