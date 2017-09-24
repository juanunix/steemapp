import React, { PureComponent } from 'react'
import styled from 'styled-components/native'
import { colors } from 'config'

const LogoContainer = styled.View`
  background-color: ${colors.white};
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Logo = styled.Image`
  width: 100;
  height: 100;
`

export class Splash extends PureComponent {
  render () {
    return (
      <LogoContainer>
        <Logo source={{ uri: 'https://lorempixel.com/100/100' }} />
      </LogoContainer>
    )
  }
}
