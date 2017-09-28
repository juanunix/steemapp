import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableNativeFeedback, Dimensions, ScrollView } from 'react-native'
import styled from 'styled-components/native';
import uuid from 'react-native-uuid';

import { openURLInView } from 'utils';
import { colors } from 'config';
import { HyperLink } from 'components';

const Content = styled.ScrollView`
  padding-vertical: 5;
  padding-horizontal: 10;
  elevation: 4;
  background-color: ${colors.primaryDark};
`

const Title = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: ${colors.white};
`

const Body = styled.Text`
  color: ${colors.white};
`

const Center = styled.View`
  justify-content: center;
  flex: 1;
`

const Link = styled.Text`
  color: ${colors.blue};
`

export class DiscussionScreen extends PureComponent {
  state = {
    bodyArr: []
  }

  componentDidMount() {
    this.parseHtml();
  }

  parseTag = (tagText) => {
    let splitedArr = tagText.substr(1, tagText.length - 2).split(' ');
    let tag = '<' + splitedArr[0] + '>';
    splitedArr = splitedArr.slice(1);
    splitedArr = splitedArr.map(attr => attr.split('='))
    splitedArr = splitedArr.map(attrArr => ({ key: attrArr[0], value: attrArr[1] ? attrArr[1].split('"')[1]: null }))
    return { tag, attrs: splitedArr };
  }

  parseBodyHttp = (text) => {
    kLINK_DETECTION_REGEX = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
    let arrs = [];
    while(text.search(kLINK_DETECTION_REGEX) >= 0) {
      let httpText = text.match(kLINK_DETECTION_REGEX)[0];
      let texts = text.split(httpText)
      arrs.push({
        key: uuid.v4(),
        tag: '<text>',
        text: texts[0]
      })
      arrs.push({
        key: uuid.v4(),
        tag: '<a>',
        attrs: [{ key: 'href', value: httpText }],
        text: httpText
      })
      text = texts.slice(1).join(httpText)
    }
    if(text) {
      arrs.push({
        key: uuid.v4(),
        tag: '<text>',
        text: text
      })
    }
    return arrs;
  }

  parseHtml = () => {
    let { body } = this.props.navigation.state.params.discussion;
    let arr = [];
    while(body.indexOf('<') >= 0) {
      let startOpening = body.indexOf('<')
      let endOpening = body.indexOf('>')
      let tagText = body.substring(startOpening, endOpening + 1)
      let aboveBody = body.substr(0, startOpening)
      body = body.substr(endOpening + 1)
      let startClosing = body.indexOf('<');
      let endClosing = body.indexOf('>');
      let innerText = body.substr(0, startClosing);
      body = body.substr(endClosing + 1);
      arr = [
        ...arr,
        ...this.parseBodyHttp(aboveBody)
      ]
      const { tag, attrs } = this.parseTag(tagText);
      if(tag == '<a>') {
        arr.push({
          key: uuid.v4(),
          tag,
          attrs,
          text: innerText,
        })
      } else {
        arr = [
          ...arr,
          ...this.parseBodyHttp(innerText)
        ]
      }
    }
    this.setState({
      bodyArr: arr
    })
  }

  renderPartialBody = ({ key, tag, text, attrs }) => {
    let { json_metadata } = this.props.navigation.state.params.discussion
    let metadata = JSON.parse(json_metadata);
    if(metadata.image.indexOf(text) >= 0) {
      var {height, width} = Dimensions.get('window');
      return (
        <Center key={key}>
          <Image
            style={{flex:1, height: 170, width: width - 30}}
            source={{uri: text}}
            resizeMode="contain"
          />
        </Center>
      )
    }
    if(tag === '<a>') {
      let url = attrs.filter(a => a.key === 'href')[0];
      return (
        <HyperLink link={url.value} key={key}>{text}</HyperLink>
      )
    }
    return (
      <Body key={key}>{text}</Body>
    )
  }

  render() {
    const { discussion } = this.props.navigation.state.params;
    return (
      <Content>
        <Title>{discussion.title}</Title>
        {this.state.bodyArr.map(this.renderPartialBody)}
      </Content>
    )
  }
}
