import React, { PureComponent } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native';

import { openURLInView } from 'utils';
import { colors } from 'config';


const Link = styled.Text`
color: ${colors.lightBlue};
`

export const HyperLink = ({children, link}) => (
  <TouchableWithoutFeedback onPress={() => openURLInView(link)}>
    <Link>{children}</Link>
  </TouchableWithoutFeedback>
)