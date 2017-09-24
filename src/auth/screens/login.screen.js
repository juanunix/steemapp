import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import styled from 'styled-components/native'
import I18n from 'locale'

import { colors, normalize } from 'config'
import { ViewContainer } from 'components'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const MiniSection = styled.View`
  flex: 1.5;
  justify-content: center;
  align-items: center;
`

const Logo = styled.Image`
  width: 90;
  height: 90;
`

const ContentSection = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  font-size: ${normalize(20)};
  text-align: center;
  color: ${colors.white};
  margin-top: 45;
  margin-bottom: 15;
`

const SignInButton = props =>
  <Button
    textStyle={SignInButton.buttonText}
    buttonStyle={SignInButton.buttonStyle}
    {...props}
  />

SignInButton.buttonStyle = {
  backgroundColor: colors.transparent,
  borderRadius: 5,
  borderWidth: 2,
  borderColor: colors.white,
  paddingVertical: 10,
  paddingHorizontal: 30,
  shadowColor: 'transparent'
}

SignInButton.buttonText = {
  fontSize: normalize(12)
}

export class LoginScreen extends Component {
  render () {
    return (
      <ViewContainer barColor='light'>
        <Container>
          <MiniSection>
            <Logo source={{ uri: 'https://lorempixel.com/100/100' }} />
          </MiniSection>
          <ContentSection>
            <Title>
              {I18n.t('auth.login.welcomeTitle')}
            </Title>
          </ContentSection>
          <MiniSection>
            <SignInButton title={I18n.t('auth.login.signInButton')} />
          </MiniSection>
        </Container>
      </ViewContainer>
    )
  }
}
